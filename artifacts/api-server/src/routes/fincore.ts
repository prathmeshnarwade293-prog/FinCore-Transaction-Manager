import { Router, type IRouter } from "express";
import {
  CreateAccountBody,
  CreateBudgetBody,
  CreateTransactionBody,
  CreateTransactionResponse,
  GetAnalyticsSummaryResponse,
  GetAuditLogsParams,
  GetAuditLogsResponse,
  GetDashboardSummaryResponse,
  ListAccountsResponse,
  ListBudgetsResponse,
  ListTransactionsQueryParams,
  ListTransactionsResponse,
  SendAdvisorMessageBody,
  SendAdvisorMessageResponse,
  UpdateTransactionBody,
  UpdateTransactionParams,
  UpdateTransactionResponse,
} from "@workspace/api-zod";
import {
  createAccount,
  createBudget,
  createTransaction,
  getAnalyticsSummary,
  getAuditLogs,
  getDashboardSummary,
  listAccounts,
  listBudgets,
  listTransactions,
  updateTransaction,
} from "../lib/fincore-store";

const router: IRouter = Router();

router.get("/dashboard/summary", (_req, res): void => {
  res.json(GetDashboardSummaryResponse.parse(getDashboardSummary()));
});

router.get("/accounts", (_req, res): void => {
  res.json(ListAccountsResponse.parse(listAccounts()));
});

router.post("/accounts", (req, res): void => {
  const parsed = CreateAccountBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  res.status(201).json(ListAccountsResponse.element.parse(createAccount(parsed.data)));
});

router.get("/transactions", (req, res): void => {
  const parsed = ListTransactionsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  res.json(ListTransactionsResponse.parse(listTransactions(parsed.data)));
});

router.post("/transactions", (req, res): void => {
  const parsed = CreateTransactionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const transaction = createTransaction(parsed.data);
  if (!transaction) {
    res.status(404).json({ error: "Account not found" });
    return;
  }
  res.status(201).json(CreateTransactionResponse.parse(transaction));
});

router.patch("/transactions/:id", (req, res): void => {
  const params = UpdateTransactionParams.safeParse(req.params);
  const body = UpdateTransactionBody.safeParse(req.body);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }
  const transaction = updateTransaction(params.data.id, body.data);
  if (!transaction) {
    res.status(404).json({ error: "Transaction not found" });
    return;
  }
  res.json(UpdateTransactionResponse.parse(transaction));
});

router.get("/budgets", (_req, res): void => {
  res.json(ListBudgetsResponse.parse(listBudgets()));
});

router.post("/budgets", (req, res): void => {
  const parsed = CreateBudgetBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  res.status(201).json(ListBudgetsResponse.element.parse(createBudget(parsed.data)));
});

router.get("/analytics/summary", (_req, res): void => {
  res.json(GetAnalyticsSummaryResponse.parse(getAnalyticsSummary()));
});

router.get("/audit-logs/:transactionId", (req, res): void => {
  const parsed = GetAuditLogsParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  res.json(GetAuditLogsResponse.parse(getAuditLogs(parsed.data.transactionId)));
});

router.post("/advisor/message", (req, res): void => {
  const parsed = SendAdvisorMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const message = parsed.data.message.toLowerCase();
  const response = message.includes("software")
    ? "Your software spend is $264.34 this month, or 10.9% above the previous period. The largest recurring tools are AWS, Google Workspace, and Figma."
    : message.includes("save") || message.includes("savings")
      ? "Your current savings rate is healthy. A simple next step is to keep the monthly transfer to Rainy day savings automated and review the two largest variable categories before month end."
      : "I’m tracking your current accounts, recent ledger activity, and category budgets. Ask me about spending, subscriptions, cash flow, or a specific merchant.";
  res.json(SendAdvisorMessageResponse.parse({ message: response, source: "FinCore demo advisor" }));
});

export default router;
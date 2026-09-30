import { randomUUID } from "node:crypto";

export type Account = {
  id: string;
  institution: string;
  name: string;
  type: string;
  maskedNumber: string;
  currency: string;
  balance: number;
  trend: number;
  color: string;
};

export type Transaction = {
  id: string;
  accountId: string;
  accountName: string;
  merchant: string;
  category: string;
  date: string;
  amount: number;
  currency: string;
  status: "COMPLETED" | "PENDING" | "FLAGGED";
  paymentMethod: string;
  recurring: boolean;
  flagged: boolean;
  note: string | null;
};

export type Budget = {
  id: string;
  category: string;
  limit: number;
  spent: number;
  color: string;
};

export type AuditLog = {
  id: string;
  action: string;
  timestamp: string;
  actor: string;
  summary: string;
};

const accounts: Account[] = [
  {
    id: "acc-mercury",
    institution: "Mercury",
    name: "Primary checking",
    type: "CHECKING",
    maskedNumber: "****4821",
    currency: "USD",
    balance: 24780.42,
    trend: 4.8,
    color: "#1b6b5a",
  },
  {
    id: "acc-ally",
    institution: "Ally",
    name: "Rainy day savings",
    type: "SAVINGS",
    maskedNumber: "****0917",
    currency: "USD",
    balance: 11350.0,
    trend: 8.2,
    color: "#c98748",
  },
  {
    id: "acc-amex",
    institution: "American Express",
    name: "Venture card",
    type: "CREDIT_CARD",
    maskedNumber: "****7742",
    currency: "USD",
    balance: -1254.1,
    trend: -2.1,
    color: "#253b59",
  },
];

const transactions: Transaction[] = [
  {
    id: "txn-001",
    accountId: "acc-mercury",
    accountName: "Primary checking",
    merchant: "Stripe",
    category: "Business income",
    date: "2026-09-28",
    amount: 4820.0,
    currency: "USD",
    status: "COMPLETED",
    paymentMethod: "ACH",
    recurring: false,
    flagged: false,
    note: "September client payout",
  },
  {
    id: "txn-002",
    accountId: "acc-mercury",
    accountName: "Primary checking",
    merchant: "Notion",
    category: "Software",
    date: "2026-09-27",
    amount: -18.0,
    currency: "USD",
    status: "COMPLETED",
    paymentMethod: "DEBIT_CARD",
    recurring: true,
    flagged: false,
    note: null,
  },
  {
    id: "txn-003",
    accountId: "acc-amex",
    accountName: "Venture card",
    merchant: "Delta Air Lines",
    category: "Travel",
    date: "2026-09-26",
    amount: -642.8,
    currency: "USD",
    status: "FLAGGED",
    paymentMethod: "CREDIT_CARD",
    recurring: false,
    flagged: true,
    note: "Unusual route for this account",
  },
  {
    id: "txn-004",
    accountId: "acc-mercury",
    accountName: "Primary checking",
    merchant: "Figma",
    category: "Software",
    date: "2026-09-25",
    amount: -15.0,
    currency: "USD",
    status: "COMPLETED",
    paymentMethod: "DEBIT_CARD",
    recurring: true,
    flagged: false,
    note: null,
  },
  {
    id: "txn-005",
    accountId: "acc-mercury",
    accountName: "Primary checking",
    merchant: "Whole Foods Market",
    category: "Groceries",
    date: "2026-09-24",
    amount: -126.4,
    currency: "USD",
    status: "COMPLETED",
    paymentMethod: "DEBIT_CARD",
    recurring: false,
    flagged: false,
    note: null,
  },
  {
    id: "txn-006",
    accountId: "acc-amex",
    accountName: "Venture card",
    merchant: "AWS",
    category: "Software",
    date: "2026-09-22",
    amount: -189.34,
    currency: "USD",
    status: "COMPLETED",
    paymentMethod: "CREDIT_CARD",
    recurring: true,
    flagged: false,
    note: "Monthly infrastructure",
  },
  {
    id: "txn-007",
    accountId: "acc-mercury",
    accountName: "Primary checking",
    merchant: "Loom",
    category: "Software",
    date: "2026-09-21",
    amount: -12.0,
    currency: "USD",
    status: "PENDING",
    paymentMethod: "DEBIT_CARD",
    recurring: true,
    flagged: false,
    note: null,
  },
  {
    id: "txn-008",
    accountId: "acc-mercury",
    accountName: "Primary checking",
    merchant: "Blue Bottle Coffee",
    category: "Dining",
    date: "2026-09-20",
    amount: -24.5,
    currency: "USD",
    status: "COMPLETED",
    paymentMethod: "DEBIT_CARD",
    recurring: false,
    flagged: false,
    note: null,
  },
  {
    id: "txn-009",
    accountId: "acc-ally",
    accountName: "Rainy day savings",
    merchant: "Transfer from Mercury",
    category: "Internal transfer",
    date: "2026-09-19",
    amount: 1000.0,
    currency: "USD",
    status: "COMPLETED",
    paymentMethod: "ACH",
    recurring: false,
    flagged: false,
    note: "Monthly savings move",
  },
  {
    id: "txn-010",
    accountId: "acc-mercury",
    accountName: "Primary checking",
    merchant: "Google Workspace",
    category: "Software",
    date: "2026-09-18",
    amount: -30.0,
    currency: "USD",
    status: "COMPLETED",
    paymentMethod: "DEBIT_CARD",
    recurring: true,
    flagged: false,
    note: null,
  },
];

const budgets: Budget[] = [
  { id: "budget-software", category: "Software", limit: 400, spent: 264.34, color: "#1b6b5a" },
  { id: "budget-groceries", category: "Groceries", limit: 600, spent: 382.16, color: "#c98748" },
  { id: "budget-dining", category: "Dining", limit: 300, spent: 218.4, color: "#d37f68" },
  { id: "budget-travel", category: "Travel", limit: 900, spent: 642.8, color: "#253b59" },
];

const auditLogs = new Map<string, AuditLog[]>();

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export function listAccounts() {
  return accounts;
}

export function createAccount(input: Omit<Account, "id" | "trend" | "color">) {
  const account: Account = { ...input, id: randomUUID(), trend: 0, color: "#1b6b5a" };
  accounts.push(account);
  return account;
}

export function listTransactions(filters: {
  search?: string;
  category?: string;
  accountId?: string;
  status?: Transaction["status"];
}) {
  const search = filters.search?.toLowerCase();
  return transactions.filter((transaction) => {
    if (search && !`${transaction.merchant} ${transaction.category} ${transaction.accountName}`.toLowerCase().includes(search)) return false;
    if (filters.category && transaction.category !== filters.category) return false;
    if (filters.accountId && transaction.accountId !== filters.accountId) return false;
    if (filters.status && transaction.status !== filters.status) return false;
    return true;
  });
}

export function createTransaction(input: {
  accountId: string;
  merchant: string;
  category: string;
  date: string;
  amount: number;
  paymentMethod: string;
  note?: string;
}) {
  const account = accounts.find((item) => item.id === input.accountId);
  if (!account) return null;
  const transaction: Transaction = {
    id: randomUUID(),
    accountId: account.id,
    accountName: account.name,
    merchant: input.merchant,
    category: input.category,
    date: input.date,
    amount: input.amount,
    currency: account.currency,
    status: "COMPLETED",
    paymentMethod: input.paymentMethod,
    recurring: false,
    flagged: false,
    note: input.note ?? null,
  };
  transactions.unshift(transaction);
  account.balance = round(account.balance + input.amount);
  addAudit(transaction.id, "CREATE", `Added ${transaction.merchant} to ${account.name}`);
  return transaction;
}

export function updateTransaction(id: string, input: Partial<Pick<Transaction, "category" | "note" | "status">>) {
  const transaction = transactions.find((item) => item.id === id);
  if (!transaction) return null;
  Object.assign(transaction, input);
  addAudit(transaction.id, "UPDATE", `Updated ${transaction.merchant}`);
  return transaction;
}

export function listBudgets() {
  return budgets;
}

export function createBudget(input: Omit<Budget, "id" | "spent">) {
  const budget: Budget = { ...input, id: randomUUID(), spent: 0 };
  budgets.push(budget);
  return budget;
}

export function getDashboardSummary() {
  const income = transactions.filter((item) => item.amount > 0).reduce((sum, item) => sum + item.amount, 0);
  const expenses = Math.abs(transactions.filter((item) => item.amount < 0).reduce((sum, item) => sum + item.amount, 0));
  const spending = new Map<string, number>();
  transactions.filter((item) => item.amount < 0).forEach((item) => spending.set(item.category, (spending.get(item.category) ?? 0) + Math.abs(item.amount)));
  const colors = ["#1b6b5a", "#c98748", "#d37f68", "#253b59", "#8c7bbd"];
  const spendingByCategory = [...spending.entries()].sort((a, b) => b[1] - a[1]).map(([category, amount], index) => ({ category, amount: round(amount), color: colors[index % colors.length] }));
  return {
    netWorth: round(accounts.reduce((sum, item) => sum + item.balance, 0)),
    netWorthChange: 6.4,
    income: round(income),
    expenses: round(expenses),
    savingsRate: round(((income - expenses) / income) * 100),
    spendingByCategory,
    monthlyCashflow: [
      { month: "Apr", income: 5400, expenses: 2860 },
      { month: "May", income: 6200, expenses: 3510 },
      { month: "Jun", income: 5900, expenses: 2980 },
      { month: "Jul", income: 7100, expenses: 4020 },
      { month: "Aug", income: 6800, expenses: 3320 },
      { month: "Sep", income: round(income), expenses: round(expenses) },
    ],
    alerts: [
      { id: "alert-1", title: "Review one unusual charge", description: "Delta Air Lines is higher than your usual travel spend.", severity: "warning" as const },
      { id: "alert-2", title: "Software budget is on track", description: "You have $135.66 left for this month's recurring tools.", severity: "info" as const },
    ],
    recentTransactions: listTransactions({}).slice(0, 6),
  };
}

export function getAnalyticsSummary() {
  const merchantMap = new Map<string, { amount: number; transactions: number }>();
  transactions.filter((item) => item.amount < 0).forEach((item) => {
    const current = merchantMap.get(item.merchant) ?? { amount: 0, transactions: 0 };
    merchantMap.set(item.merchant, { amount: current.amount + Math.abs(item.amount), transactions: current.transactions + 1 });
  });
  return {
    topMerchants: [...merchantMap.entries()].sort((a, b) => b[1].amount - a[1].amount).slice(0, 5).map(([merchant, data]) => ({ merchant, amount: round(data.amount), transactions: data.transactions })),
    recurringPayments: transactions.filter((item) => item.recurring).slice(0, 5).map((item) => ({ merchant: item.merchant, amount: Math.abs(item.amount), cadence: "Monthly", nextDate: "2026-10-18" })),
    anomalies: transactions.filter((item) => item.flagged).map((item) => ({ id: item.id, merchant: item.merchant, amount: Math.abs(item.amount), reason: item.note ?? "Unusual transaction pattern", severity: "medium" as const })),
    categoryGrowth: [
      { category: "Software", current: 264.34, previous: 238.4, change: 10.9 },
      { category: "Travel", current: 642.8, previous: 410.0, change: 56.8 },
      { category: "Groceries", current: 382.16, previous: 401.2, change: -4.7 },
    ],
  };
}

export function getAuditLogs(transactionId: string) {
  return auditLogs.get(transactionId) ?? [{
    id: `audit-${transactionId}`,
    action: "IMPORT",
    timestamp: "2026-09-18T09:32:00.000Z",
    actor: "FinCore import",
    summary: "Transaction was imported from a connected account.",
  }];
}

function addAudit(transactionId: string, action: string, summary: string) {
  const entries = auditLogs.get(transactionId) ?? [];
  entries.unshift({
    id: randomUUID(),
    action,
    timestamp: new Date().toISOString(),
    actor: "Demo user",
    summary,
  });
  auditLogs.set(transactionId, entries);
}
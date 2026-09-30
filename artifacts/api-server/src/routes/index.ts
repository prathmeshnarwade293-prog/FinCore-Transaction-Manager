import { Router, type IRouter } from "express";
import healthRouter from "./health";
import fincoreRouter from "./fincore";

const router: IRouter = Router();

router.use(healthRouter);
router.use(fincoreRouter);

export default router;

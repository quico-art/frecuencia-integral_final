import { Router, type IRouter } from "express";
import healthRouter from "./health";
import adminRouter from "./admin";
import checkoutRouter from "./checkout";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminRouter);
router.use(checkoutRouter);

export default router;

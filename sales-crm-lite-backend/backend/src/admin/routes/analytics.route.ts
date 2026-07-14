import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { AnalyticsController } from "../controllers/analytics.controller";

const router = Router();

router.use(authMiddleware, roleMiddleware("admin"));
router.get("/overview", AnalyticsController.getOverview);

export default router;

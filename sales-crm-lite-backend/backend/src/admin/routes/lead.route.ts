import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";
import { AdminLeadController } from "../controllers/lead.controller";
import { updateLeadStageValidation } from "../validation/lead.validation";

const router = Router();

router.use(authMiddleware, roleMiddleware("admin"));
router.get("/", AdminLeadController.getLeads);
router.patch("/:id/stage", validateRequest(updateLeadStageValidation), AdminLeadController.updateLeadStage);

export default router;

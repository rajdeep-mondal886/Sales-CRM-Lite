import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";
import { UserLeadController } from "../controllers/lead.controller";
import { createLeadValidation } from "../validations/lead.validation";

const router = Router();

router.use(authMiddleware);
router.get("/", UserLeadController.getMyLeads);
router.post("/", validateRequest(createLeadValidation), UserLeadController.createLead);

export default router;

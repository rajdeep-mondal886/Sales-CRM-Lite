import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";
import { TaskController } from "../controllers/task.controller";
import { createTaskValidation } from "../validations/task.validation";

const router = Router();

router.use(authMiddleware);
router.get("/", TaskController.getMyTasks);
router.post("/", validateRequest(createTaskValidation), TaskController.createTask);

export default router;

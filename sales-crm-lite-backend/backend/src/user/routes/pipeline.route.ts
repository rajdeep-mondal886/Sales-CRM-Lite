import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { PipelineController } from "../controllers/pipeline.controller";

const router = Router();

router.use(authMiddleware);
router.get("/", PipelineController.getPipelines);

export default router;

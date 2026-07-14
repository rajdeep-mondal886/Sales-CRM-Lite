import { Router } from "express";
import { validateRequest } from "../../middlewares/validate.middleware";
import { AuthController } from "../controllers/auth.controller";
import { loginValidation, registerValidation } from "../validations/auth.validation";

const router = Router();

router.post("/register", validateRequest(registerValidation), AuthController.register);
router.post("/login", validateRequest(loginValidation), AuthController.login);

export default router;

import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";
import { AdminUserController } from "../controllers/user.controller";
import { updateUserRoleValidation } from "../validation/user.validation";

const router = Router();

router.use(authMiddleware, roleMiddleware("admin"));
router.get("/", AdminUserController.getUsers);
router.patch("/:id/role", validateRequest(updateUserRoleValidation), AdminUserController.updateRole);

export default router;

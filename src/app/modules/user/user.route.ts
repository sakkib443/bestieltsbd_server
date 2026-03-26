import { Router } from "express";
import { UserController } from "./user.controller";
import { auth, authorize } from "../../middlewares/auth";

const router = Router();

// All user management routes require super-admin
router.get("/", auth, authorize("super-admin"), UserController.getAllUsers);
router.post("/", auth, authorize("super-admin"), UserController.createUser);
router.delete("/:id", auth, authorize("super-admin"), UserController.deleteUser);
router.patch("/:id/role", auth, authorize("super-admin"), UserController.updateRole);

export const UserRoutes = router;

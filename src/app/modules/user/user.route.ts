import { Router } from "express";
import { UserController } from "./user.controller";
import { auth, authorize } from "../../middlewares/auth";

const router = Router();

// All user management routes — admin and super-admin can access
router.get("/", auth, authorize("admin", "super-admin"), UserController.getAllUsers);
router.post("/", auth, authorize("admin", "super-admin"), UserController.createUser);
router.delete("/:id", auth, authorize("admin", "super-admin"), UserController.deleteUser);
router.patch("/:id/role", auth, authorize("admin", "super-admin"), UserController.updateRole);

export const UserRoutes = router;

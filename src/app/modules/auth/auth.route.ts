import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { registerValidation, loginValidation } from "../user/user.validation";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/register", validateRequest(registerValidation), AuthController.register);
router.post("/login", validateRequest(loginValidation), AuthController.login);

// Google OAuth
router.post("/google", AuthController.googleLogin);

// Password reset flow
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/verify-otp", AuthController.verifyOtp);
router.post("/reset-password", AuthController.resetPassword);

router.post("/change-password", auth, AuthController.changePassword);

export const AuthRoutes = router;


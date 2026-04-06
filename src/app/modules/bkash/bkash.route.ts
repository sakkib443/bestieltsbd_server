import { Router } from "express";
import { BkashController } from "./bkash.controller";
import { auth, authorize } from "../../middlewares/auth";

const router = Router();

// Authenticated user — initiate bKash payment
router.post("/create-payment", auth, BkashController.createPayment);

// Public — bKash redirects user here after payment (no auth needed since user is coming from bKash)
router.get("/callback", BkashController.handleCallback);

// Admin — check payment status
router.post("/query-payment", auth, authorize("admin"), BkashController.queryPayment);

export const BkashRoutes = router;

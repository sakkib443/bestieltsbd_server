import { Router } from "express";
import { AffiliateController } from "./affiliate.controller";
import { auth, authorize } from "../../middlewares/auth";

const router = Router();

// =================== PUBLIC ===================
router.get("/track", AffiliateController.trackClick);

// =================== AUTHENTICATED USER ===================
router.post("/register", auth, AffiliateController.register);
router.get("/me", auth, AffiliateController.getMyInfo);
router.get("/me/commissions", auth, AffiliateController.getMyCommissions);
router.get("/me/stats", auth, AffiliateController.getMyStats);
router.post("/me/withdraw", auth, AffiliateController.requestWithdrawal);
router.patch("/me/payment-info", auth, AffiliateController.updatePaymentInfo);
router.patch("/me/custom-code", auth, AffiliateController.setCustomCode);

// =================== ADMIN ===================
router.get("/all", auth, authorize("admin"), AffiliateController.getAllAffiliates);
router.get("/withdrawals", auth, authorize("admin"), AffiliateController.getAllWithdrawals);
router.patch("/withdrawals/:id", auth, authorize("admin"), AffiliateController.processWithdrawal);
router.patch("/:id", auth, authorize("admin"), AffiliateController.updateAffiliate);
router.get("/analytics", auth, authorize("admin"), AffiliateController.getAnalytics);

export const AffiliateRoutes = router;

import { Router } from "express";
import { MockPackageController } from "./mockPackage.controller";
import { auth, authorize } from "../../middlewares/auth";

const router = Router();

// =================== PUBLIC ROUTES ===================
// Get active packages (for store page — no auth needed)
router.get("/packages/active", MockPackageController.getActivePackages);
router.get("/set-limits", MockPackageController.getSetLimits);
router.get("/packages/:id", MockPackageController.getPackageById);

// =================== AUTHENTICATED USER ROUTES ===================
// Check free mock status
router.get("/free-status", auth, MockPackageController.checkFreeMockStatus);
// Claim free mock
router.post("/claim-free", auth, MockPackageController.claimFreeMock);
// Purchase mock
router.post("/purchase", auth, MockPackageController.purchaseMock);
// Get my purchased mocks
router.get("/my-purchases", auth, MockPackageController.getMyPurchases);
// Get payment history
router.get("/payments", auth, MockPackageController.getPaymentHistory);
// Validate coupon
router.post("/validate-coupon", auth, MockPackageController.validateCoupon);

// =================== ADMIN ROUTES ===================
// Package CRUD
router.get("/packages", auth, authorize("admin"), MockPackageController.getAllPackages);
router.post("/packages", auth, authorize("admin"), MockPackageController.createPackage);
router.patch("/packages/:id", auth, authorize("admin"), MockPackageController.updatePackage);
router.delete("/packages/:id", auth, authorize("admin"), MockPackageController.deletePackage);

// All purchases (for Orders page)
router.get("/purchases/all", auth, authorize("admin"), MockPackageController.getAllPurchases);
// Update purchase status (pause, activate, etc.)
router.patch("/purchases/:id/status", auth, authorize("admin"), MockPackageController.updatePurchaseStatus);
// Delete purchase
router.delete("/purchases/:id", auth, authorize("admin"), MockPackageController.deletePurchase);
// Bulk delete purchases
router.post("/purchases/bulk-delete", auth, authorize("admin"), MockPackageController.bulkDeletePurchases);
// Bulk update status
router.post("/purchases/bulk-status", auth, authorize("admin"), MockPackageController.bulkUpdateStatus);

// Analytics
router.get("/analytics", auth, authorize("admin"), MockPackageController.getAnalytics);

// Coupons
router.get("/coupons", auth, authorize("admin"), MockPackageController.getAllCoupons);
router.post("/coupons", auth, authorize("admin"), MockPackageController.createCoupon);
router.delete("/coupons/:id", auth, authorize("admin"), MockPackageController.deleteCoupon);

export const MockPackageRoutes = router;

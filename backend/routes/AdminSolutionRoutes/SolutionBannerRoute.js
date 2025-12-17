const express = require("express");
const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const {
  getSolutionBanners,
  getPublishedSolutionBanner,
  createSolutionBanner,
  updateSolutionBanner,
  deleteSolutionBanner,
} = require("../../controllers/AdminSolutionControllers/SolutionBanner");
const { upload } = require("../../config/cloudinaryConfig");
const router = express.Router();

// ----------------------------------------------------
// ✅ Solution Banner Management Routes (Admin Only)
// BASE PATH: /api/admin/solution-banner
// ----------------------------------------------------

// 1. GET: அனைத்து Solution Banners-களையும் பெறுதல் (List All)
router.get("/solutionbanner-all", AdminAuthProtect, getSolutionBanners);

// 5. GET: UI-க்கு ஆக்டிவாக உள்ள ஒரு பேனரைப் பெறுதல்
// (இதில் AdminAuthProtect தேவையில்லை, ஏனெனில் இது Public Route)
router.get("/solutionbanner-active", getPublishedSolutionBanner);

// 2. POST: புதிய Solution Banner-ஐ உருவாக்குதல்
// Image upload Optional என்பதால், upload.single('image') middleware-ஐப் பயன்படுத்துகிறோம்.
router.post(
  "/solutionbanner-create",
  AdminAuthProtect,
  upload.single("image"),
  createSolutionBanner
);

// 3. PUT: ஒரு Solution Banner-ஐப் புதுப்பித்தல் (ID மூலம்)
router.put(
  "/solutionbanner-update/:id",
  AdminAuthProtect,
  upload.single("image"),
  updateSolutionBanner
);

// 4. DELETE: ஒரு Solution Banner-ஐ நீக்குதல் (ID மூலம்)
router.delete(
  "/solutionbanner-delete/:id",
  AdminAuthProtect,
  deleteSolutionBanner
);

module.exports = router;

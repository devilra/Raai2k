const express = require("express");
const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");

const { upload } = require("../../config/cloudinaryConfig");
const {
  getAboutBanners,
  getPublishedAboutBanner,
  createAboutBanner,
  updateAboutBanner,
  deleteAboutBanner,
} = require("../../controllers/AdminAboutControllers/AboutBanner");
const router = express.Router();

// ----------------------------------------------------
// ✅ Solution Banner Management Routes (Admin Only)
// BASE PATH: /api/admin/solution-banner
// ----------------------------------------------------

// 1. GET: அனைத்து Solution Banners-களையும் பெறுதல் (List All)
router.get("/aboutbanner-all", AdminAuthProtect, getAboutBanners);

// 5. GET: UI-க்கு ஆக்டிவாக உள்ள ஒரு பேனரைப் பெறுதல்
// (இதில் AdminAuthProtect தேவையில்லை, ஏனெனில் இது Public Route)
router.get("/aboutbanner-active", getPublishedAboutBanner);

// 2. POST: புதிய Solution Banner-ஐ உருவாக்குதல்
// Image upload Optional என்பதால், upload.single('image') middleware-ஐப் பயன்படுத்துகிறோம்.
router.post(
  "/aboutbanner-create",
  AdminAuthProtect,
  upload.single("image"),
  createAboutBanner
);

// 3. PUT: ஒரு Solution Banner-ஐப் புதுப்பித்தல் (ID மூலம்)
router.put(
  "/aboutbanner-update/:id",
  AdminAuthProtect,
  upload.single("image"),
  updateAboutBanner
);

// 4. DELETE: ஒரு Solution Banner-ஐ நீக்குதல் (ID மூலம்)
router.delete("/aboutbanner-delete/:id", AdminAuthProtect, deleteAboutBanner);

module.exports = router;

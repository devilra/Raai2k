const express = require("express");
const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const { upload } = require("../../config/cloudinaryConfig");
const {
  getServiceBanners,
  getPublishedServiceBanners,
  createServiceBanner,
  updateServiceBanner,
  deleteServiceBanner,
} = require("../../controllers/AdminServiceControllers/ServiceBannerController");

// Controller-ல் இருந்து புதிய ஃபங்ஷன் பெயர்களை இறக்குமதி செய்தல்

const router = express.Router();

// ----------------------------------------------------
// ✅ Service Banner Management Routes (Admin Only)
// BASE PATH: /api/admin/service-banner
// ----------------------------------------------------

// 1. GET: அனைத்து Service Banners-களையும் பெறுதல் (List All)
router.get("/servicebanner-all", AdminAuthProtect, getServiceBanners);

// 2. GET: UI-க்கு ஆக்டிவாக உள்ள பேனர்களைப் பெறுதல் (Public Route)
router.get("/servicebanner-active", getPublishedServiceBanners);

// 3. POST: புதிய Service Banner-ஐ உருவாக்குதல்
router.post(
  "/servicebanner-create",
  AdminAuthProtect,
  upload.single("image"),
  createServiceBanner
);

// 4. PUT: ஒரு Service Banner-ஐப் புதுப்பித்தல் (ID மூலம்)
router.put(
  "/servicebanner-update/:id",
  AdminAuthProtect,
  upload.single("image"),
  updateServiceBanner
);

// 5. DELETE: ஒரு Service Banner-ஐ நீக்குதல் (ID மூலம்)
router.delete(
  "/servicebanner-delete/:id",
  AdminAuthProtect,
  deleteServiceBanner
);

module.exports = router;

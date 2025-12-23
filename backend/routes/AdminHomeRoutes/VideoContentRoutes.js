const express = require("express");

const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const {
  getActiveVideoContent,
  createVideoContent,
  getAllVideoContent,
  getVideoContentById,
  updateVideoContent,
  deleteVideoContent,
} = require("../../controllers/AdminHomeControllers/VideoContentController");
const router = express.Router();

// -----------------------------------------------------------
// A. PUBLIC ROUTE
// -----------------------------------------------------------

// Active Video Content-ஐ Front-end-க்கு வழங்குகிறது
router.get("/video-active", getActiveVideoContent);

// -----------------------------------------------------------
// B. ADMIN ROUTES (CRUD Operations - Protected)
// -----------------------------------------------------------

// புதிய Video Content-ஐ உருவாக்குதல்
router.post("/video-create", AdminAuthProtect, createVideoContent);

// Admin Listing-க்காக அனைத்து Video Content-களையும் பெறுதல்
router.get("/video-all", AdminAuthProtect, getAllVideoContent);

// ID மூலம் ஒரு Video Content-ஐப் பெறுதல் (Edit Form-க்கு)
router.get("/video-content/:id", AdminAuthProtect, getVideoContentById);

// Video Content-ஐப் புதுப்பித்தல்
router.put("/video-content/:id", AdminAuthProtect, updateVideoContent);

// Video Content-ஐ நீக்குதல்
router.delete("/video-content/:id", AdminAuthProtect, deleteVideoContent);

module.exports = router;

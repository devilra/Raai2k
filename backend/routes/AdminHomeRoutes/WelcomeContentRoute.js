const express = require("express");
const {
  getWelcomeContent,
  createWelcomeContent,
  getAllWelcomeContent,
  updateWelcomeContent,
  getWelcomeContentById,
  deleteWelcomeContent,
} = require("../../controllers/AdminHomeControllers/WelcomeContent");
const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const router = express.Router();

// Active Welcome Content-ஐ Front-end-க்கு வழங்குகிறது
router.get("/welcome-active", getWelcomeContent);

// -----------------------------------------------------------
// B. ADMIN ROUTES (CRUD Operations)
// -----------------------------------------------------------

// புதிய Welcome Content-ஐ உருவாக்குதல்
router.post("/welcome-create", AdminAuthProtect, createWelcomeContent);

// Admin Listing-க்காக அனைத்து Welcome Content-களையும் பெறுதல்
router.get("/welcome-all", AdminAuthProtect, getAllWelcomeContent);

// ID மூலம் ஒரு Welcome Content-ஐப் பெறுதல் (Edit Form-க்கு)
router.get("/welcome-content/:id", AdminAuthProtect, getWelcomeContentById);

// Welcome Content-ஐப் புதுப்பித்தல்
router.put("/welcome-content/:id", AdminAuthProtect, updateWelcomeContent);

// Welcome Content-ஐ நீக்குதல்
router.delete("/welcome-content/:id", AdminAuthProtect, deleteWelcomeContent);

module.exports = router;

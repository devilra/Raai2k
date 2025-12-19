const express = require("express");
const router = express.Router();

// Controllers - Our Approach கண்ட்ரோலரை இம்போர்ட் செய்யவும்

// Middleware - அட்மின் பாதுகாப்பிற்காக
const {
  getPublicOurApproach,
  createOurApproach,
  getAllOurApproaches,
  getOurApproachById,
  updateOurApproach,
  deleteOurApproach,
} = require("../../controllers/AdminAboutControllers/OurApproach");
const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");

// -----------------------------------------------------------
// A. PUBLIC ROUTE (Front-end-க்கு மட்டும்)
// -----------------------------------------------------------

// ஆக்டிவ்வாக இருக்கும் 'Our Approach' தரவைப் பெற
router.get("/approach-active", getPublicOurApproach);

// -----------------------------------------------------------
// B. ADMIN ROUTES (CRUD Operations - Protected)
// -----------------------------------------------------------

// புதிய Approach-ஐ உருவாக்குதல்
router.post("/approach-create", AdminAuthProtect, createOurApproach);

// அட்மின் டேபிளுக்காக அனைத்து பதிவுகளையும் பெறுதல்
router.get("/approach-all", AdminAuthProtect, getAllOurApproaches);

// குறிப்பிட்ட ID கொண்ட பதிவை மட்டும் பெறுதல் (Edit Form-க்காக)
router.get("/approach-single/:id", AdminAuthProtect, getOurApproachById);

// ஏற்கனவே உள்ள பதிவைப் புதுப்பித்தல்
router.put("/approach-update/:id", AdminAuthProtect, updateOurApproach);

// பதிவை நீக்குதல்
router.delete("/approach-delete/:id", AdminAuthProtect, deleteOurApproach);

module.exports = router;

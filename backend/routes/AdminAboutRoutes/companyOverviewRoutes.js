const express = require("express");
const router = express.Router();

// Middleware
const {
  getPublicCompanyOverview,
  createCompanyOverview,
  getAllCompanyOverviews,
  getCompanyOverviewById,
  updateCompanyOverview,
  deleteCompanyOverview,
} = require("../../controllers/AdminAboutControllers/CompanyOverviewController");
const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");

// Controllers

// -----------------------------------------------------------
// A. PUBLIC ROUTE (Front-end-க்கு மட்டும்)
// -----------------------------------------------------------

// ஆக்டிவ்வாக இருக்கும் கம்பெனி ஓவர்வியூ தரவைப் பெற
router.get("/overview-active", getPublicCompanyOverview);

// -----------------------------------------------------------
// B. ADMIN ROUTES (CRUD Operations - Protected)
// -----------------------------------------------------------

// புதிய Company Overview-ஐ உருவாக்குதல்
router.post("/overview-create", AdminAuthProtect, createCompanyOverview);

// அட்மின் டேபிளுக்காக அனைத்து பதிவுகளையும் பெறுதல்
router.get("/overview-all", AdminAuthProtect, getAllCompanyOverviews);

// குறிப்பிட்ட ID கொண்ட பதிவை மட்டும் பெறுதல் (Edit Form-க்காக)
router.get("/overview-single/:id", AdminAuthProtect, getCompanyOverviewById);

// ஏற்கனவே உள்ள பதிவைப் புதுப்பித்தல்
router.put("/overview-update/:id", AdminAuthProtect, updateCompanyOverview);

// பதிவை நீக்குதல்
router.delete("/overview-delete/:id", AdminAuthProtect, deleteCompanyOverview);

module.exports = router;

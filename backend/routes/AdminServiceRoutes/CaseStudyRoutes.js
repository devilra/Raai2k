const express = require("express");
const router = express.Router();

// Controllers

// Middleware
const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const {
  getActiveCaseStudies,
  createCaseStudy,
  getAllCaseStudies,
  getCaseStudyById,
  updateCaseStudy,
  deleteCaseStudy,
} = require("../../controllers/AdminServiceControllers/CaseStudy");

// -----------------------------------------------------------
// A. PUBLIC ROUTE (Frontend-க்கு மட்டும்)
// -----------------------------------------------------------

// வெப்சைட்டில் காட்டப்பட வேண்டிய Active Case Studies-களைப் பெற
router.get("/casestudy-active", getActiveCaseStudies);

// -----------------------------------------------------------
// B. ADMIN ROUTES (CRUD Operations - Protected)
// -----------------------------------------------------------

// 1. புதிய Case Study-ஐ உருவாக்குதல்
router.post("/casestudy-create", AdminAuthProtect, createCaseStudy);

// 2. அட்மின் டேபிளுக்காக அனைத்து பதிவுகளையும் பெறுதல்
router.get("/casestudy-all", AdminAuthProtect, getAllCaseStudies);

// 3. குறிப்பிட்ட ID கொண்ட பதிவை மட்டும் பெறுதல் (Edit Form-க்காக)
router.get("/casestudy-single/:id", AdminAuthProtect, getCaseStudyById);

// 4. ஏற்கனவே உள்ள பதிவைப் புதுப்பித்தல்
router.put("/casestudy-update/:id", AdminAuthProtect, updateCaseStudy);

// 5. பதிவை நீக்குதல்
router.delete("/casestudy-delete/:id", AdminAuthProtect, deleteCaseStudy);

module.exports = router;

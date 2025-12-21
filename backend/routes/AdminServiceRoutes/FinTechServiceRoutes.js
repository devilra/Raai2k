const express = require("express");
const router = express.Router();

// Middlewares
const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const {
  getActiveFinTechServices,
  createFinTechService,
  getAllFinTechServices,
  getFinTechServiceById,
  updateFinTechService,
  deleteFinTechService,
} = require("../../controllers/AdminServiceControllers/FintechServices");

// Controllers

// -----------------------------------------------------------
// A. PUBLIC ROUTES (Frontend - Active Content மட்டும்)
// -----------------------------------------------------------

// வெப்சைட்டில் காட்டப்பட வேண்டிய Active தகவல்களைப் பெற (No Auth Required)
router.get("/fintech-active", getActiveFinTechServices);

// -----------------------------------------------------------
// B. ADMIN ROUTES (CRUD Operations - பாதுகாக்கப்பட்டவை)
// -----------------------------------------------------------

// 1. புதிய "FinTech Service" ஐட்டத்தை உருவாக்க
router.post("/fintech-create", AdminAuthProtect, createFinTechService);

// 2. அட்மின் பேனலில் பட்டியலிட அனைத்து தகவல்களையும் பெற
router.get("/fintech-all", AdminAuthProtect, getAllFinTechServices);

// 3. குறிப்பிட்ட ஒரு தகவலை மட்டும் பெற (Edit செய்யும்போது தேவைப்படும்)
router.get("/fintech-content/:id", AdminAuthProtect, getFinTechServiceById);

// 4. தகவல்களைப் புதுப்பிக்க (Update)
router.put("/fintech-content/:id", AdminAuthProtect, updateFinTechService);

// 5. தகவலை நீக்க (Delete)
router.delete("/fintech-content/:id", AdminAuthProtect, deleteFinTechService);

module.exports = router;

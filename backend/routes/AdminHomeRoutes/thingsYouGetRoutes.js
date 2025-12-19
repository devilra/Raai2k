const express = require("express");
const router = express.Router();

// Controllers

// Middlewares
const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const {
  getActiveThingsYouGet,
  createThingsYouGet,
  getAllThingsYouGet,
  getThingsYouGetById,
  updateThingsYouGet,
  deleteThingsYouGet,
} = require("../../controllers/AdminHomeControllers/thingsYouGetController");

// -----------------------------------------------------------
// A. PUBLIC ROUTES (Frontend - Active Content மட்டும்)
// -----------------------------------------------------------

// வெப்சைட்டில் காட்டப்பட வேண்டிய Active தகவல்களைப் பெற
router.get("/things-active", getActiveThingsYouGet);

// -----------------------------------------------------------
// B. ADMIN ROUTES (CRUD Operations - பாதுகாக்கப்பட்டவை)
// -----------------------------------------------------------

// 1. புதிய "Things You Get" ஐட்டத்தை உருவாக்க
router.post("/things-create", AdminAuthProtect, createThingsYouGet);

// 2. அட்மின் பேனலில் பட்டியலிட அனைத்து தகவல்களையும் பெற
router.get("/things-all", AdminAuthProtect, getAllThingsYouGet);

// 3. குறிப்பிட்ட ஒரு தகவலை மட்டும் பெற (Edit செய்யும்போது தேவைப்படும்)
router.get("/things-content/:id", AdminAuthProtect, getThingsYouGetById);

// 4. தகவல்களைப் புதுப்பிக்க (Update)
router.put("/things-content/:id", AdminAuthProtect, updateThingsYouGet);

// 5. தகவலை நீக்க (Delete)
router.delete("/things-content/:id", AdminAuthProtect, deleteThingsYouGet);

module.exports = router;

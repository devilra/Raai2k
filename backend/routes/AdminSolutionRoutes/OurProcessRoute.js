const express = require("express");

const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const {
  getOurProcess,
  createOurProcess,
  getAllOurProcess,
  getOurProcessById,
  updateOurProcess,
  deleteOurProcess,
} = require("../../controllers/AdminSolutionControllers/OurProcess");

const router = express.Router();

// Active Welcome Content-ஐ Front-end-க்கு வழங்குகிறது
router.get("/ourprocess-active", getOurProcess);

// -----------------------------------------------------------
// B. ADMIN ROUTES (CRUD Operations)
// -----------------------------------------------------------

// புதிய Welcome Content-ஐ உருவாக்குதல்
router.post("/ourprocess-create", AdminAuthProtect, createOurProcess);

// Admin Listing-க்காக அனைத்து Welcome Content-களையும் பெறுதல்
router.get("/ourprocess-all", AdminAuthProtect, getAllOurProcess);

// ID மூலம் ஒரு Welcome Content-ஐப் பெறுதல் (Edit Form-க்கு)
router.get("/ourprocess-single/:id", AdminAuthProtect, getOurProcessById);

// Welcome Content-ஐப் புதுப்பித்தல்
router.put("/ourprocess-update/:id", AdminAuthProtect, updateOurProcess);

// Welcome Content-ஐ நீக்குதல்
router.delete("/ourprocess-delete/:id", AdminAuthProtect, deleteOurProcess);

module.exports = router;

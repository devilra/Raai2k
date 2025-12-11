const express = require("express");
const {
  sendContactForm,
  handleNewsletterSignup,
} = require("../controllers/contactController");
const router = express.Router();

router.post("/contact", sendContactForm);
router.post("/signupEmail", handleNewsletterSignup);

module.exports = router;

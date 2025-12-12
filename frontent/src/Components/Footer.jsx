import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaFacebook, FaGoogle } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { IoLogoYoutube } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io";
// MUI Components for Notifications and Loading
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import api from "../api";
import { useMemo } from "react";

// Custom Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Regex for basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // -------------- VALIDATION LOGIC ------------------
  const isEmailValid = useMemo(() => {
    return emailRegex.test(email);
  }, [email]);

  const isFormComplete = useMemo(() => {
    return isEmailValid; // Only email is required for signup
  }, [isEmailValid]);

  // -------------- HANDLERS ------------------

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // -------------- API SUBMISSION ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormComplete) {
      setSnackbar({
        open: true,
        message: "Please enter a valid email address.",
        severity: "warning",
      });
      return;
    }

    setLoading(true);

    try {
      // Send only the email in the request body
      const response = await api.post("/signupEmail", { email });

      // Success response from backend
      setSnackbar({
        open: true,
        message: response.data.message || "Subscribed successfully!",
        severity: "success",
      });

      // Clear the email input after success
      setEmail("");
    } catch (error) {
      // Handle API errors
      const errorMessage =
        error.response?.data?.message ||
        "Subscription failed. Please try again.";

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#3D4C6F] text-white pt-16">
      {/* ================= TOP SECTION ================= */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Email Signup Box */}
        <div className="bg-[#2a3855] p-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-2">Sign up for email alerts</h2>
          <p className="text-gray-300 mb-6">
            Stay current with our latest insights
          </p>

          <form
            className="flex flex-col sm:flex-row gap-4"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter Email Here"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              className={`flex-1 px-4 py-3 rounded-md bg-white text-gray-800 focus:outline-none 
                ${
                  email && !isEmailValid
                    ? "border-2 border-red-500"
                    : "border-none"
                }
                `}
            />

            <button
              type="submit"
              disabled={!isFormComplete || loading}
              className={`font-semibold px-8 py-3 rounded-md transition 
                ${
                  isFormComplete && !loading
                    ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500" // Active styles
                    : "bg-gray-500 text-gray-200 cursor-not-allowed" // Disabled styles
                }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <CircularProgress size={20} color="inherit" />
                  <span className="ml-2">Submitting...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
            {/* Email Validation Feedback */}
            {/* {email && !isEmailValid && (
              <p className="mt-1 text-sm text-yellow-300">
                Please enter a valid email address.
              </p>
            )} */}
          </form>
        </div>

        {/* Right Links + Socials */}
        <div className="flex justify-between gap-10">
          {/* Internal Links */}
          <div className="space-y-4">
            <Link
              to="/"
              className="block hover:text-yellow-300 transition cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block hover:text-yellow-300 transition cursor-pointer"
            >
              About
            </Link>
            <Link
              to="/service"
              className="block hover:text-yellow-300 transition cursor-pointer"
            >
              Service
            </Link>
            <Link
              to="/solution"
              className="block hover:text-yellow-300 transition cursor-pointer"
            >
              Solutions
            </Link>
            <Link
              to="/contact"
              className="block hover:text-yellow-300 transition cursor-pointer"
            >
              Contact
            </Link>

            <Link
              to="/contact"
              className="block hover:text-yellow-300 transition cursor-pointer"
            >
              FAQ
            </Link>

            {/* <Link
              to="/privacy"
              className="block hover:text-yellow-300 transition cursor-pointer"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-of-use"
              className="block hover:text-yellow-300 transition cursor-pointer"
            >
              Terms of Use
            </Link>

            <Link
              to="/contact"
              className="block hover:text-yellow-300 transition cursor-pointer"
            >
              Global Office
            </Link>

            <Link
              to="/contact"
              className="block hover:text-yellow-300 transition cursor-pointer"
            >
              Local Office
            </Link> */}
          </div>

          {/* Social Icons */}
          <div className="space-y-4">
            <a
              href="https://www.linkedin.com/company/raai2k/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="p-3 bg-[#1f2a41] rounded-md text-xl group-hover:bg-yellow-400 group-hover:text-gray-900 transition">
                <FaLinkedin />
              </div>
              <span className="group-hover:text-yellow-300 transition">
                Linkedin
              </span>
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="p-3 bg-[#1f2a41] rounded-md text-xl group-hover:bg-yellow-400 group-hover:text-gray-900 transition">
                <FaTwitter />
              </div>
              <span className="group-hover:text-yellow-300 transition">
                Twitter
              </span>
            </a>

            {/* <a
              href="https://www.youtube.com/@amigowebster"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="p-3 bg-[#1f2a41] rounded-md text-xl group-hover:bg-yellow-400 group-hover:text-gray-900 transition">
                <IoLogoYoutube />
              </div>
              <span className="group-hover:text-yellow-300 transition">
                Youtube
              </span>
            </a> */}

            <a
              href="https://wa.me/12345?text=Hi%2C%20I%20need%20more%20details!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="p-3 bg-[#1f2a41] rounded-md text-xl group-hover:bg-yellow-400 group-hover:text-gray-900 transition">
                <IoLogoWhatsapp />
              </div>
              <span className="group-hover:text-yellow-300 transition">
                WhatsApp
              </span>
            </a>

            <a
              href="mailto:support@raai2k.com?subject=Support%20Query&body=Hi%20Team,"
              // target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="p-3 bg-[#1f2a41] rounded-md text-xl group-hover:bg-yellow-400 group-hover:text-gray-900 transition">
                <IoMail />
              </div>
              <span className="group-hover:text-yellow-300 transition">
                Email
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="mt-16   bg-[#2a3855] py-6">
        <div className="max-w-7xl mx-auto px-6  text-gray-300 text-sm">
          {/* Left Logo & Copyright */}
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-3 mb-4 md:mb-0">
            <img
              src="/logo4.png"
              alt="logo"
              className=" object-cover h-[45px] w-[150px] filter invert brightness-100 saturate-0  rounded-full"
            />
            <div className="inline-flex gap-5">
              <span className="hidden">
                Designed by{" "}
                <a
                  className="font-bold underline"
                  href="https://amigowebster.com/"
                  target="_blank"
                >
                  amigowebster
                </a>
              </span>
              <span>
                © Copyright {new Date().getFullYear()}{" "}
                <span className="font-bold">raai2K</span>
              </span>
            </div>
          </div>

          {/* Right Credits */}
          {/* <span className="hover:text-yellow-300 transition cursor-pointer">
            Designed by Raai2K Team
          </span> */}
        </div>
      </div>

      {/* ================= MUI SNACKBAR =================== */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </footer>
  );
};

export default Footer;

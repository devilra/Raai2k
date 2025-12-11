import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaGoogle } from "react-icons/fa";
import ServingClients from "./ServingClients";
import Faq from "../FAQ/Faq";
import GlobalPresenceSection from "./GlobalPresenceSection";
import { IoLogoWhatsapp, IoMail } from "react-icons/io5";
// MUI Components for Notifications
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useMemo } from "react";
import api from "../api";

// Custom Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Regex for basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // -------------- HANDLERS ------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  // -------------- VALIDATION LOGIC ------------------

  const isEmailValid = useMemo(() => {
    return emailRegex.test(formData.email);
  }, [formData.email]);

  const isFormComplete = useMemo(() => {
    return (
      formData.name.trim() !== "" &&
      isEmailValid &&
      formData.description.trim() !== ""
    );
  }, [formData, isEmailValid]);

  // -------------- API SUBMISSION ------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check final validation before sending
    if (!isFormComplete) {
      setSnackbar({
        open: true,
        message: "Please fill all fields correctly, especially the email.",
        severity: "warning",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/contact", formData);
      // Success response from backend
      setSnackbar({
        open: true,
        message: response.data.message || "Message sent successfully!",
        severity: "success",
      });

      // Clear the form after success
      setFormData({ name: "", email: "", description: "" });
    } catch (error) {
      // Handle API errors (e.g., 400 or 500 status codes)
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send message. Please try again.";
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
    <div className="bg-[#f5f7fb]">
      {/* ================= BANNER =================== */}
      <section
        className="w-full h-[310px] md:h-[380px] bg-cover bg-center relative flex flex-col justify-center px-10 md:px-20"
        style={{ backgroundImage: "url('/contact/c1.jpg')" }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-[#1f2937]/80 to-[#111827]/30"></div>

        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-wide drop-shadow-xl">
            Contact Us
          </h1>
          {/* <p className="mt-3 text-lg text-gray-200 font-medium">
            We’d love to hear from you — Let’s build something powerful!
          </p> */}
        </div>
      </section>

      {/* ================= OFFICE CARDS =================== */}
      <section className="py-20 bg-[#f5f7fb]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Melbourne */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-semibold   text-[#2A3855] mb-4">
              {" "}
              Head office
            </h3>
            <h3 className="text-xl font-semibold  text-[#2A3855] mb-1">
              {" "}
              Chennai,{" "}
            </h3>
            <p className="text-gray-600 leading-relaxed">India (South)</p>
          </div>

          {/* Sydney */}
          {/* <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-[#2A3855] mb-4">
              Sydney Office
            </h3>
            <p className="text-gray-600 leading-relaxed">
              62 Collins Street West, <br /> Sydney 3000, <br /> Australia
            </p>
          </div> */}

          {/* Social Icons */}
          <div className="bg-linear-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-[#2A3855] mb-4">
              Social
            </h3>

            <div className="flex gap-4 text-2xl text-[#2A3855]">
              <a
                href="https://www.linkedin.com/company/raai2k/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition cursor-pointer"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 rounded-full hover:bg-blue-200 hover:text-blue-500 transition cursor-pointer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://wa.me/12345?text=Hi%2C%20I%20need%20more%20details!"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 rounded-full hover:bg-blue-200 hover:text-blue-700 transition cursor-pointer"
              >
                <IoLogoWhatsapp />
              </a>
              <a
                href="mailto:support@raai2k.com?subject=Support%20Query&body=Hi%20Team,"
                // target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 rounded-full hover:bg-red-200 hover:text-red-600 transition cursor-pointer"
              >
                <IoMail />
              </a>
            </div>
          </div>
        </div>

        {/* ================= MAP =================== */}
        {/* <div className="max-w-7xl mx-auto px-6 mt-14">
          <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497511.2310708575!2d79.87899949645977!3d13.04798594062866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1764400376747!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div> */}
      </section>
      {/* 
      <section>
        <ServingClients />
      </section> */}

      <section>
        <GlobalPresenceSection />
      </section>

      {/* ================= CONTACT FORM =================== */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-xl p-10 border border-gray-100">
            <h2 className="text-3xl font-bold text-[#2A3855] mb-8">
              Write to us
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Your Name"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-[#2A3855] focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full border rounded-md px-4 py-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-[#2A3855] focus:outline-none ${
                  formData.email && !isEmailValid
                    ? "border-red-500 ring-red-200"
                    : "border-gray-300"
                }`}
              />
              {/* Email Validation Error Message */}
              {formData.email && !isEmailValid && (
                <p className="mt-1 text-sm text-red-500">
                  Please enter a valid email address.
                </p>
              )}
              <textarea
                rows="8"
                name="description"
                placeholder="Enter your descriptions here..."
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-[#2A3855] focus:outline-none"
              ></textarea>

              <button
                type="submit"
                disabled={!isFormComplete || loading}
                className={`mt-4 w-44 font-semibold py-3 rounded-md transition shadow-lg 
                  ${
                    isFormComplete && !loading
                      ? "bg-[#2A3855] hover:bg-[#18263f] text-white hover:shadow-xl" // Active styles
                      : "bg-gray-400 text-gray-700 cursor-not-allowed" // Disabled styles
                  }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <CircularProgress size={20} color="inherit" />
                    <span className="ml-2">Sending...</span>
                  </div>
                ) : (
                  "Send Now"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="w-full">
        <Faq />
      </section>

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
    </div>
  );
};

export default ContactPage;

import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaFacebook, FaGoogle } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { IoLogoYoutube } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-[#2d3b59] text-white pt-16">
      {/* ================= TOP SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Email Signup Box */}
        <div className="bg-[#1f2a41] p-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-2">Sign up for email alerts</h2>
          <p className="text-gray-300 mb-6">
            Stay current with our latest insights
          </p>

          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter Email Here"
              required
              className="flex-1 px-4 py-3 rounded-md bg-white text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-gray-900 font-semibold px-8 py-3 rounded-md hover:bg-yellow-500 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Links + Socials */}
        <div className="flex justify-between gap-10">
          {/* Internal Links */}
          <div className="space-y-4">
            <Link
              to="/contact"
              className="block hover:text-yellow-300 transition cursor-pointer"
            >
              Contact Us
            </Link>

            <Link
              to="/contact"
              className="block hover:text-yellow-300 transition cursor-pointer"
            >
              FAQ
            </Link>

            <Link
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
            </Link>
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
      <div className="mt-16 border-t border-gray-600 py-6">
        <div className="max-w-7xl mx-auto px-6  text-gray-300 text-sm">
          {/* Left Logo & Copyright */}
          <div className="flex items-center justify-between gap-3 mb-4 md:mb-0">
            <img
              src="/logo3.png"
              alt="logo"
              className=" object-cover h-[45px] w-[100px] filter invert brightness-100 saturate-0  rounded-full"
            />
            <div className="inline-flex gap-5">
              <span className="">
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
                <span className="font-bold">Raai2K Inc.</span>
              </span>
            </div>
          </div>

          {/* Right Credits */}
          {/* <span className="hover:text-yellow-300 transition cursor-pointer">
            Designed by Raai2K Team
          </span> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

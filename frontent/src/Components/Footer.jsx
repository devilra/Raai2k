import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1f2937] text-gray-300 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* LEFT — LOGO + SHORT TEXT */}
        <div className="flex flex-col gap-5">
          <img
            src="/logo.jpeg"
            alt="logo"
            className="h-16 w-56 rounded-[14px] shadow-md"
          />

          <p className="text-sm leading-relaxed">
            RAai 2K-powered by{" "}
            <span className="text-yellow-400 font-semibold">amigowebster</span>,
            helps you build modern, scalable and creative digital experiences.
            We focus on clean UI, performance and user-friendly design.
          </p>
        </div>

        {/* MIDDLE — QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Services</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
            <li className="hover:text-white cursor-pointer">About</li>
          </ul>
        </div>

        {/* RIGHT — CONTACT INFO */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>

          <div className="flex items-center gap-3 mb-3">
            <FaPhoneAlt className="text-yellow-400" />
            <p>+91 98765 43210</p>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <FaEnvelope className="text-yellow-400" />
            <p>support@raai2k.com</p>
          </div>

          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-yellow-400 mt-1" />
            <p>
              #101, Tech Park,
              <br />
              Chennai, India
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="mt-10 border-t border-gray-600 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} RAaI 2K-Designed by
        <a
          href="https://amigowebster.com"
          target="_blank"
          className="text-yellow-400 font-semibold"
        >
          {" "}
          amigowebster
        </a>
        . All Rights Reserved.
      </div>
    </footer>
  );
}

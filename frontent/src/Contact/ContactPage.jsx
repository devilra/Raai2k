import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaGoogle } from "react-icons/fa";
import ServingClients from "./ServingClients";
import Faq from "../FAQ/Faq";
import GlobalPresenceSection from "./GlobalPresenceSection";

const ContactPage = () => {
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
            <h3 className="text-xl font-semibold text-center  text-[#2A3855] mb-4">
              {" "}
              Head office
            </h3>
            <h3 className="text-xl font-semibold  text-[#2A3855] mb-4">
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
              <div className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition cursor-pointer">
                <FaLinkedin />
              </div>
              <div className="p-3 bg-gray-100 rounded-full hover:bg-blue-200 hover:text-blue-500 transition cursor-pointer">
                <FaTwitter />
              </div>
              <div className="p-3 bg-gray-100 rounded-full hover:bg-blue-200 hover:text-blue-700 transition cursor-pointer">
                <FaFacebook />
              </div>
              <div className="p-3 bg-gray-100 rounded-full hover:bg-red-200 hover:text-red-600 transition cursor-pointer">
                <FaGoogle />
              </div>
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

            <form className="flex flex-col gap-6">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-[#2A3855] focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-[#2A3855] focus:outline-none"
              />
              <textarea
                rows="8"
                placeholder="Enter your descriptions here..."
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-[#2A3855] focus:outline-none"
              ></textarea>

              <button
                type="submit"
                className="mt-4 w-44 bg-[#2A3855] hover:bg-[#18263f] text-white font-semibold py-3 rounded-md transition shadow-lg hover:shadow-xl"
              >
                Send Now
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="w-full">
        <Faq />
      </section>
    </div>
  );
};

export default ContactPage;

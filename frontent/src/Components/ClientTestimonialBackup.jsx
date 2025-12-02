import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    quote:
      "They handled everything — from product flow to MVP and compliance. Perfect for early-stage fintech.",
    author: "Founder, Wallet Startup",
  },
  {
    quote:
      "Their fintech expertise is unmatched — they not only built our payments platform but helped us navigate compliance.",
    author: "CFO, Digital Banking Startup",
  },
  {
    quote:
      "Thanks to their architecture and risk modeling, our lending system is both scalable and secure.",
    author: "CEO, Peer-to-Peer Lending Company",
  },
];

const ClientTestimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2A3855]">
          Client Testimonials
        </h2>

        {/* Stylish Divider */}
        <div className="flex justify-center items-center gap-2 mt-4 mb-14">
          <span className="h-2 w-2 bg-[#2A3855] rounded-full"></span>
          <span className="h-[3px] w-24 bg-[#2A3855] rounded-full"></span>
          <span className="h-2 w-2 bg-[#2A3855] rounded-full"></span>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative bg-white p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              {/* Quote icon */}
              <div className="absolute -top-6 left-6 p-3 bg-[#2A3855] text-white rounded-xl shadow-md">
                <FaQuoteLeft size={18} />
              </div>

              {/* Quote text */}
              <p className="text-gray-700 text-[16px] leading-relaxed mt-6">
                “{item.quote}”
              </p>

              {/* Author */}
              <p className="mt-5 font-semibold text-[#2A3855]">{item.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;

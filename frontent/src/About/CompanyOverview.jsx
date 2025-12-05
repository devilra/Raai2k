import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaRocket } from "react-icons/fa";

const iconSize =
  window.innerWidth < 480 ? 38 : window.innerWidth < 768 ? 28 : 26;

const CompanyOverview = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* PAGE TITLE */}
        <h2 className="text-[28px] md:text-[37px] font-bold text-center text-[#2A3855]">
          Company Overview
        </h2>
        <div className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-10"></div>

        {/* MAIN CARD */}
        <div className="bg-white p-10 md:p-14 rounded-2xl shadow-sm">
          {/* TOP TITLE */}
          <h3 className="text-[21px] md:text-[18px] font-bold text-[#2A3855] mb-4">
            Build Fast. Scale Smart. Launch Confidently.
          </h3>

          {/* FIRST PARAGRAPH */}
          <p className="text-gray-600 text-[16px] mb-8">
            At Raai2k, we help startups turn ideas into scalable, investor-ready
            technology. From MVP development to cloud architecture and AI
            automation, we provide end-to-end IT consulting built for speed,
            quality, and affordability.
          </p>

          {/* QUOTE LINE */}
          <div className="flex items-start gap-2 mb-10">
            <FaQuoteLeft size={iconSize} className="text-4xl text-gray-300 " />
            <p className="text-[21px] md:text-[18px] font-bold text-[#2A3855] leading-relaxed">
              We turn complex fintech ideas into scalable, secure, and
              future-ready digital solutions.
            </p>
          </div>

          {/* TWO COLUMN PARAGRAPHS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-600 leading-relaxed text-[15.5px]">
            <p>
              <span className="text-3xl font-bold text-[#2A3855]">W</span>
              <span className="text-gray-600 text-[16px]">
                e are a technology consulting firm helping organizations turn
                ideas into robust, scalable, and efficient software systems.
              </span>
            </p>
            <p className="py-2 text-gray-600 text-[16px]">
              {" "}
              We are specializing in fintech transformation. Our team brings
              together deep experience in banking systems, digital payments,
              regulatory compliance, blockchain, data security, and financial
              product engineering.
            </p>
            <p className="py-2 text-gray-600 text-[16px]">
              Whether you’re a startup launching a digital wallet or an
              established bank modernizing legacy infrastructure, we partner
              closely with you to design and deliver robust, future-ready
              systems.
            </p>

            <p className="text-gray-600 text-[16px]">
              Our team brings deep expertise in architecture, engineering,
              cloud, DevOps, and product strategy—enabling you to innovate
              quickly while reducing cost and risk.
            </p>
            <p className="text-gray-600 text-[16px]">
              We partner with startups, SMBs, and enterprises to modernize
              legacy systems, launch digital products, optimize performance, and
              achieve operational excellence.
            </p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* TITLE */}
          <h2 className="text-[28px] md:text-[37px] font-bold text-[#2A3855] text-center">
            Our Approach
          </h2>
          <div className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-12"></div>

          {/* GRID SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* =================== 1. UNDERSTAND • ENGINEER • DELIVER =================== */}
            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-[21px] md:text-[18px] font-bold text-[#2A3855] mb-4">
                How We Work
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <FaCheckCircle size={15} className="text-gray-500 mt-1" />
                  Understand the business
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle size={15} className="text-gray-500 mt-1" />
                  Engineer the right solution
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle size={15} className="text-gray-500 mt-1" />
                  Deliver measurable outcomes
                </li>
              </ul>
            </div>

            {/* =================== 2. OUR MISSION =================== */}
            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-[21px] md:text-[18px] font-bold text-[#2A3855] mb-4">
                Our Mission
              </h3>
              <ul className="space-y-3  text-gray-700">
                <li className="flex items-start gap-2">
                  <FaCheckCircle size={15} className="text-gray-500 mt-1" />
                  Bridge technology and finance
                </li>
                <li className="flex items-start w-full  gap-2">
                  <FaCheckCircle size={17} className="text-gray-500 " />
                  Deliver compliant, secure fintech solutions
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle size={15} className="text-gray-500 mt-1" />
                  Accelerate time-to-market
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle size={15} className="text-gray-500 mt-1" />
                  Enable sustainable growth
                </li>
              </ul>
            </div>

            {/* =================== 3. WE UNDERSTAND STARTUPS =================== */}
            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-[#2A3855] mb-4">
                We Understand Startups
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <FaCheckCircle size={15} className="text-gray-500 mt-1" />
                  Move fast
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle size={15} className="text-gray-500 mt-1" />
                  Keep costs predictable
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle size={15} className="text-gray-500 mt-1" />
                  Stay secure & compliant
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle size={15} className="text-gray-500 mt-1" />
                  Build only what matters for launch
                </li>
              </ul>
            </div>
          </div>

          {/* BOTTOM STATEMENT */}
          <div className="text-center mt-14 max-w-3xl mx-auto">
            <p className="text-[21px] md:text-[18px] text-[#2A3855] font-medium leading-relaxed">
              We become your extended tech partner - so you can focus on users,
              funding, and growth while we handle the engineering.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CompanyOverview;

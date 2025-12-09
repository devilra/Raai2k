import React from "react";
import { FaQuoteLeft, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const CompanyOverview = () => {
  // Icon size (optional – you can also hardcode)
  const iconSize = 28;

  // === SAME FADE-UP EFFECT FOR ALL DEVICES ===
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemEffect = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="py-20 bg-gray-50"
    >
      {/* MAIN WRAPPER */}
      <motion.div variants={itemEffect} className="max-w-6xl mx-auto px-6">
        {/* PAGE TITLE */}
        <motion.h2
          variants={itemEffect}
          className="text-[28px] md:text-[37px] font-bold text-center text-[#2A3855]"
        >
          Company Overview
        </motion.h2>

        <motion.div
          variants={itemEffect}
          className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-10"
        ></motion.div>

        {/* CARD */}
        <motion.div
          variants={itemEffect}
          className="bg-white p-10 md:p-14 rounded-2xl shadow-sm"
        >
          {/* Heading */}
          <motion.h3
            variants={itemEffect}
            className="text-[21px] md:text-[18px] font-bold text-[#2A3855] mb-4"
          >
            Build Fast. Scale Smart. Launch Confidently.
          </motion.h3>

          {/* Paragraph */}
          <motion.p
            variants={itemEffect}
            className="text-gray-600 text-[16px] mb-8"
          >
            At Raai2k, we help startups turn ideas into scalable, investor-ready
            technology...
          </motion.p>

          {/* Quote */}
          <motion.div
            variants={itemEffect}
            className="flex items-start gap-2 mb-10"
          >
            <FaQuoteLeft size={iconSize} className="text-4xl text-gray-300" />
            <p className="text-[21px] md:text-[18px] font-bold text-[#2A3855] leading-relaxed">
              We turn complex fintech ideas into scalable, secure, and
              future-ready digital solutions.
            </p>
          </motion.div>

          {/* GRID CONTENT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-600 leading-relaxed text-[15.5px]">
            {[
              "W e are a technology consulting firm helping organizations turn ideas into robust, scalable systems.",
              "We specialize in fintech transformation... banking systems, compliance, blockchain...",
              "Whether you're a startup launching a wallet or a bank modernizing systems...",
              "Deep expertise in architecture, engineering, cloud, DevOps...",
              "We help startups, SMBs, enterprises optimize performance...",
            ].map((text, index) => (
              <motion.p key={index} variants={itemEffect}>
                {index === 0 && (
                  <span className="text-3xl font-bold text-[#2A3855]">W</span>
                )}
                {index === 0 ? text.slice(1) : text}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* SECOND SECTION */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="pt-10 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* TITLE */}
          <motion.h2
            variants={itemEffect}
            className="text-[28px] md:text-[37px] font-bold text-[#2A3855] text-center"
          >
            Our Approach
          </motion.h2>

          <motion.div
            variants={itemEffect}
            className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-12"
          ></motion.div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "How We Work",
                points: [
                  "Understand the business",
                  "Engineer the right solution",
                  "Deliver measurable outcomes",
                ],
              },
              {
                title: "Our Mission",
                points: [
                  "Bridge technology and finance",
                  "Deliver secure fintech systems",
                  "Accelerate time-to-market",
                ],
              },
              {
                title: "We Understand Startups",
                points: [
                  "Move fast",
                  "Keep costs predictable",
                  "Stay compliant",
                ],
              },
            ].map((section, i) => (
              <motion.div
                key={i}
                variants={itemEffect}
                className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-[21px] md:text-[18px] font-bold text-[#2A3855] mb-4">
                  {section.title}
                </h3>

                <ul className="space-y-3 text-gray-700">
                  {section.points.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <FaCheckCircle size={15} className="text-gray-500 mt-1" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* FOOTER TEXT */}
          <motion.p
            variants={itemEffect}
            className="text-center mt-14 max-w-3xl mx-auto text-[21px] md:text-[18px] text-[#2A3855] font-medium leading-relaxed"
          >
            We become your extended tech partner — so you focus on users,
            funding, and growth.
          </motion.p>
        </div>
      </motion.section>
    </motion.section>
  );
};

export default CompanyOverview;

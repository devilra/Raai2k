import React from "react";
import { motion } from "framer-motion";
import {
  MdSearch,
  MdArchitecture,
  MdOutlineDesignServices,
  MdSecurity,
} from "react-icons/md";
import { FaCloudUploadAlt, FaRocket } from "react-icons/fa";

const steps = [
  {
    icon: <MdSearch size={28} className="text-white" />,
    title: "Discovery & Regulatory Assessment",
    desc: "We define goals and compliance needs such as KYC, AML, GDPR to set a solid foundation.",
  },
  {
    icon: <MdArchitecture size={28} className="text-white" />,
    title: "Architectural Blueprint & Risk Modeling",
    desc: "We design secure system architecture with data flow diagrams and threat models.",
  },
  {
    icon: <MdOutlineDesignServices size={28} className="text-white" />,
    title: "Product Design & MVP Phase",
    desc: "We design wireframes, user flows and build the MVP with essential fintech features.",
  },
  {
    icon: <MdSecurity size={28} className="text-white" />,
    title: "Development, Testing & Compliance",
    desc: "Agile development with continuous testing — security, performance, audit validation.",
  },
  {
    icon: <FaCloudUploadAlt size={28} className="text-white" />,
    title: "Deployment & Secure Launch",
    desc: "Deployed on compliant infra with CI/CD, monitoring, logs, and disaster recovery.",
  },
  {
    icon: <FaRocket size={28} className="text-white" />,
    title: "Post-Launch Support & Scaling",
    desc: "Ongoing maintenance, regulatory reporting, fraud monitoring, scaling & optimization.",
  },
];

// NORMAL fade-in
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const ProcessWorkflow = () => {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="pt-10 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          variants={fadeIn}
          className="text-3xl md:text-4xl font-bold text-center text-[#2A3855]"
        >
          Our Process
        </motion.h2>

        <motion.div
          variants={fadeIn}
          className="flex justify-center items-center gap-2 mt-3 mb-14"
        >
          <span className="h-[3px] w-20 bg-[#2A3855] rounded-full"></span>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={fadeIn}
          className="relative border-l-4 border-gray-300 ml-4 md:ml-10"
        >
          {steps.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="mb-16 ml-6 relative"
            >
              {/* Dot */}
              <div className="absolute -left-10 top-1 h-6 w-6 rounded-full border-4 border-[#2A3855] bg-[#b0bbd2]"></div>

              {/* Content */}
              <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition bg-white border-l-4 border-[#2A3855]">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-[#2A3855] rounded-lg shadow">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#2A3855]">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-700 text-[15.5px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProcessWorkflow;

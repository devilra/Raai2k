import React from "react";
import { motion } from "framer-motion";
import { PiBankFill } from "react-icons/pi";
import { MdPayment } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiLineChartFill } from "react-icons/ri";

const solutions = [
  {
    icon: <PiBankFill size={28} className="text-white" />,
    title: "Neobanking",
    desc: "Modern digital banks built with secure architecture, compliant onboarding, and seamless user journeys.",
  },
  {
    icon: <GiReceiveMoney size={28} className="text-white" />,
    title: "Digital Lending & Credit",
    desc: "We design and build lending stacks that minimize risk, maximize automation, and stay audit-ready.",
  },
  {
    icon: <MdPayment size={28} className="text-white" />,
    title: "Payments, Cards & Wallets",
    desc: "We build fast, reliable, compliant payment systems with deep integration logic.",
  },
  {
    icon: <RiLineChartFill size={28} className="text-white" />,
    title: "Wealth & Investment Platforms",
    desc: "Trusted, compliant wealth platforms designed for clarity, security, and long-term engagement.",
  },
];

// ANIMATION
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const SolutionsList = ({ activeOurSolutions }) => {
  const getIcons = (index) => {
    const icons = [
      <PiBankFill size={28} className="text-white" />,
      <GiReceiveMoney size={28} className="text-white" />,
      <MdPayment size={28} className="text-white" />,
      <RiLineChartFill size={28} className="text-white" />,
    ];

    return icons[index % icons.length];
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="pt-10 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          variants={fadeIn}
          className="text-[28px] md:text-[37px] font-bold text-center text-[#2A3855]"
        >
          Our Solutions
        </motion.h2>

        {/* Underline */}
        <motion.div
          variants={fadeIn}
          className="flex justify-center items-center gap-2 mt-4 mb-14"
        >
          <span className="h-[3px] w-20 bg-[#2A3855] rounded-full"></span>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {activeOurSolutions?.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="p-4 bg-[#2A3855] rounded-xl shadow-md mb-4 w-fit">
                {getIcons(i)}
              </div>

              <h3 className="text-[21px] md:text-[18px] truncate font-bold text-[#2A3855] mb-3">
                {item.mainHeading}
              </h3>

              <p className="text-gray-700 text-[15.5px] leading-relaxed">
                {item.subText}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SolutionsList;

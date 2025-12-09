import React from "react";
import { motion } from "framer-motion";

import { PiBankBold } from "react-icons/pi";
import { MdPayments } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaShieldAlt } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import { SiBlockchaindotcom } from "react-icons/si";
import { LuMonitorCog } from "react-icons/lu";

// DATA
const industries = [
  {
    id: 1,
    icon: <PiBankBold size={28} className="text-[#2A3855]" />,
    title: "Retail Banking & Neobanks",
    desc: "Next-gen digital banking platforms with seamless onboarding, secure transactions, and modern UX.",
  },
  {
    id: 2,
    icon: <MdPayments size={28} className="text-[#2A3855]" />,
    title: "Payments & Digital Wallets",
    desc: "High-speed, compliant payment and wallet systems built for reliability and instant settlements.",
  },
  {
    id: 3,
    icon: <GiReceiveMoney size={28} className="text-[#2A3855]" />,
    title: "Peer-to-Peer Lending & Microlending",
    desc: "Automated credit workflows, risk checks, scoring engines, and lending lifecycle management.",
  },
  {
    id: 4,
    icon: <FaShieldAlt size={28} className="text-[#2A3855]" />,
    title: "Insurtech",
    desc: "Digital insurance platforms powered by claims automation, risk modeling, and customer analytics.",
  },
  {
    id: 5,
    icon: <MdShowChart size={28} className="text-[#2A3855]" />,
    title: "Wealthtech & Robo-Advisory",
    desc: "Investment engines with portfolios, market data, advisory automation, and seamless user experiences.",
  },
  {
    id: 6,
    icon: <SiBlockchaindotcom size={28} className="text-[#2A3855]" />,
    title: "Cryptocurrency & Digital Assets",
    desc: "Blockchain-backed asset platforms with secure custody, tokenization, and compliant digital transactions.",
  },
  {
    id: 7,
    icon: <LuMonitorCog size={35} className="text-[#2A3855]" />,
    title: "RegTech & Compliance Firms",
    desc: "KYC, AML, and regulatory workflow automation with advanced monitoring and reporting systems.",
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

const itemEffect = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const IndustriesWeServe = () => {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          variants={itemEffect}
          className="text-3xl md:text-4xl font-bold text-center text-[#2A3855]"
        >
          Industries We Serve
        </motion.h2>

        <motion.div
          variants={itemEffect}
          className="flex justify-center items-center gap-2 mt-3 mb-14"
        >
          <span className="h-[3px] w-20 bg-[#2A3855] rounded-full"></span>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemEffect}
              className="p-6 rounded-xl border border-gray-300 shadow-xl
                         bg-white transition duration-300 
                         hover:shadow-2xl hover:border-red-500 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                {/* Number circle */}
                <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#dadee5]">
                  <span className="text-lg font-bold text-[#2A3855]">
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-[21px] md:text-[18px] font-bold text-[#2A3855]">
                  {item.title}
                </h3>
              </div>

              <p className="text-gray-600 text-[15px] leading-relaxed border-l-4 border-gray-100 pl-4 py-1">
                {item.desc}
              </p>

              <div className="mt-4 flex justify-end">{item.icon}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default IndustriesWeServe;

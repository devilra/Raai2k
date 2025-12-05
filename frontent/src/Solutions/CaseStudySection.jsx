import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BsWallet2 } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { MdOutlinePayments } from "react-icons/md";
import { TbChartInfographic } from "react-icons/tb";
import { PiCubeTransparentLight } from "react-icons/pi";

const caseStudies = [
  {
    icon: <BsWallet2 size={28} className="text-white" />,
    title: "Digital Wallet for a Neobank",
    points: [
      "Built a mobile/web wallet with real-time peer-to-peer payments.",
      "Integrated KYC onboarding and biometric identity verification.",
      "Achieved a 30% increase in active users within six months.",
    ],
  },
  {
    icon: <GiReceiveMoney size={28} className="text-white" />,
    title: "Lending Platform for a Fintech Startup",
    points: [
      "Developed a credit underwriting engine with AI-based risk scoring.",
      "Automated loan disbursal and repayment workflows.",
      "Reduced manual loan-processing time by 70%.",
    ],
  },
  {
    icon: <MdOutlinePayments size={28} className="text-white" />,
    title: "BNPL (Buy Now Pay Later) Prototype",
    points: [
      "Built credit scoring model + lending flow.",
      "Lightweight risk engine.",
      "Helped founders pitch to investors with a working demo.",
    ],
  },
  {
    icon: <TbChartInfographic size={28} className="text-white" />,
    title: "Investment App Proof of Concept",
    points: [
      "Portfolio view, orders, alerts.",
      "Integrated brokerage API.",
      "Delivered in 4 weeks for demo day.",
    ],
  },
  {
    icon: <PiCubeTransparentLight size={28} className="text-white" />,
    title: "Blockchain-Enabled Asset Platform",
    points: [
      "Created a tokenization system for real-world assets.",
      "Designed smart contract-based custody and transaction modules.",
      "Enabled compliant digital asset transactions under regulatory constraints.",
    ],
  },
];

const CaseStudySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-[28px] md:text-[37px] font-bold text-[#2A3855] text-center">
          Case Studies
        </h2>
        <div className="w-24 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-12"></div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {caseStudies.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition group"
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-[#2A3855] rounded-xl shadow">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#2A3855]">
                  {item.title}
                </h3>
              </div>

              {/* Points */}
              <ul className="space-y-3 list-disc text-gray-700 w-full">
                {item.points.map((point, i) => (
                  // <li key={i} className="flex gap-2">
                  //   <FaCheckCircle className="text-gray-500 hidden md:hidden lg:block mt-1" />
                  //   {point}
                  // </li>
                  <li key={i} className="flex items-center gap-4 mb-6">
                    <div className="">
                      <FaCheckCircle className="text-gray-500 " />
                    </div>

                    <h3 className="  text-[#2A3855]">{point}</h3>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;

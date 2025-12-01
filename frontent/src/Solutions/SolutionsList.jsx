import React from "react";
import { PiBankFill } from "react-icons/pi";
import { MdPayment } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiLineChartFill } from "react-icons/ri";

const solutions = [
  {
    icon: <PiBankFill size={42} className="text-blue-600" />,
    title: "Neobanking",
    desc: "Modern digital banks built with secure architecture, compliant onboarding, and seamless user journeys.",
    bg: "bg-blue-50",
    border: "border-blue-300",
  },
  {
    icon: <GiReceiveMoney size={42} className="text-green-600" />,
    title: "Digital Lending & Credit",
    desc: "We design and build lending stacks that minimize risk, maximize automation, and stay audit-ready.",
    bg: "bg-green-50",
    border: "border-green-300",
  },
  {
    icon: <MdPayment size={42} className="text-purple-600" />,
    title: "Payments, Cards & Wallets",
    desc: "We build fast, reliable, compliant payment systems with deep integration logic.",
    bg: "bg-purple-50",
    border: "border-purple-300",
  },
  {
    icon: <RiLineChartFill size={42} className="text-yellow-600" />,
    title: "Wealth & Investment Platforms",
    desc: "Trusted, compliant wealth platforms designed for clarity, security, and long-term engagement.",
    bg: "bg-yellow-50",
    border: "border-yellow-300",
  },
];

const SolutionsList = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2A3855]">
          Our Solutions
        </h2>

        {/* Fancy Underline */}
        <div className="flex justify-center items-center gap-2 mt-4 mb-14">
          <span className="h-[3px] w-20 bg-[#2A3855] rounded-full"></span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {solutions.map((item, i) => (
            <div
              key={i}
              className={`${item.bg} border ${item.border} p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}
            >
              <div className="p-4 bg-white rounded-xl shadow mb-4 w-fit">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-[#2A3855] mb-3">
                {item.title}
              </h3>

              <p className="text-gray-700 text-[15.5px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsList;

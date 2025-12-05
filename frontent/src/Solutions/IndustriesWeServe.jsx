import React from "react";
import { PiBankBold } from "react-icons/pi";
import { MdPayments } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaShieldAlt } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import { SiBlockchaindotcom } from "react-icons/si";
import { LuMonitorCog } from "react-icons/lu";

// Icon-ன் வண்ணத்தை data-ல் வைத்திருக்கிறேன்
const industries = [
  {
    id: 1,
    icon: <PiBankBold size={28} className="text-[#2A3855]" />,
    color: "text-blue-600",
    title: "Retail Banking & Neobanks",
    desc: "Next-gen digital banking platforms with seamless onboarding, secure transactions, and modern UX.",
  },
  {
    id: 2,
    icon: <MdPayments size={28} className="text-[#2A3855]" />,
    color: "text-purple-600",
    title: "Payments & Digital Wallets",
    desc: "High-speed, compliant payment and wallet systems built for reliability and instant settlements.",
  },
  {
    id: 3,
    icon: <GiReceiveMoney size={28} className="text-[#2A3855]" />,
    color: "text-green-600",
    title: "Peer-to-Peer Lending & Microlending",
    desc: "Automated credit workflows, risk checks, scoring engines, and lending lifecycle management.",
  },
  {
    id: 4,
    icon: <FaShieldAlt size={28} className="text-[#2A3855]" />,
    color: "text-orange-600",
    title: "Insurtech",
    desc: "Digital insurance platforms powered by claims automation, risk modeling, and customer analytics.",
  },
  {
    id: 5,
    icon: <MdShowChart size={28} className="text-[#2A3855]" />,
    color: "text-yellow-600",
    title: "Wealthtech & Robo-Advisory",
    desc: "Investment engines with portfolios, market data, advisory automation, and seamless user experiences.",
  },
  {
    id: 6,
    icon: <SiBlockchaindotcom size={28} className="text-[#2A3855]" />,
    color: "text-teal-600",
    title: "Cryptocurrency & Digital Assets",
    desc: "Blockchain-backed asset platforms with secure custody, tokenization, and compliant digital transactions.",
  },
  {
    id: 7,
    icon: <LuMonitorCog size={35} className="text-[#2A3855]" />,
    color: "text-red-600",
    title: "RegTech & Compliance Firms",
    desc: "KYC, AML, and regulatory workflow automation with advanced monitoring and reporting systems.",
  },
];

const IndustriesWeServe = () => {
  return (
    // Tailwind Gradient Background சேர்க்கப்பட்டுள்ளது
    <section className="py-24 bg-linear-to-br from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2A3855]">
          Industries We Serve
        </h2>

        <div className="flex justify-center items-center gap-2 mt-3 mb-14">
          <span className="h-[3px] w-20 bg-[#2A3855] rounded-full"></span>
        </div>

        {/* Outline Grid with Numbers (3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((item, index) => (
            <div
              key={item.id}
              className={`
                p-6 rounded-xl border border-gray-300 shadow-xl transition duration-300 bg-white
                hover:shadow-2xl hover:border-red-500 transform hover:-translate-y-1
              `}
            >
              <div className="flex items-center gap-4 mb-4">
                {/* 1. Numbered Icon Container */}
                <div
                  className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-full border-2 ${item.color} border-gray-300`}
                >
                  <span className={`text-lg font-bold ${item.color}`}>
                    {index + 1}
                  </span>
                </div>

                {/* 2. Title */}
                <h3 className="text-xl font-extrabold text-[#2A3855]">
                  {item.title}
                </h3>
              </div>

              {/* 3. Description */}
              <p className="text-gray-600 text-[15px] leading-relaxed border-l-4 border-gray-100 pl-4 py-1">
                {item.desc}
              </p>

              {/* Optional: Actual Icon below description, if needed */}
              <div className="mt-4 flex justify-end opacity-70">
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;

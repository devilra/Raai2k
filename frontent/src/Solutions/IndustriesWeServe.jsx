import React from "react";
import { PiBankBold } from "react-icons/pi";
import { MdPayments } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaShieldAlt } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import { SiBlockchaindotcom } from "react-icons/si";

const industries = [
  {
    icon: <PiBankBold size={40} className="text-blue-600" />,
    title: "Retail Banking & Neobanks",
    bg: "from-blue-50 to-white",
    desc: "Next-gen digital banking platforms with seamless onboarding, secure transactions, and modern UX.",
  },
  {
    icon: <MdPayments size={40} className="text-purple-600" />,
    title: "Payments & Digital Wallets",
    bg: "from-purple-50 to-white",
    desc: "High-speed, compliant payment and wallet systems built for reliability and instant settlements.",
  },
  {
    icon: <GiReceiveMoney size={40} className="text-green-600" />,
    title: "Peer-to-Peer Lending & Microlending",
    bg: "from-green-50 to-white",
    desc: "Automated credit workflows, risk checks, scoring engines, and lending lifecycle management.",
  },
  {
    icon: <FaShieldAlt size={40} className="text-orange-600" />,
    title: "Insurtech",
    bg: "from-orange-100 to-white",
    desc: "Digital insurance platforms powered by claims automation, risk modeling, and customer analytics.",
  },
  {
    icon: <MdShowChart size={40} className="text-yellow-600" />,
    title: "Wealthtech & Robo-Advisory",
    bg: "from-yellow-50 to-white",
    desc: "Investment engines with portfolios, market data, advisory automation, and seamless user experiences.",
  },
  {
    icon: <SiBlockchaindotcom size={40} className="text-teal-600" />,
    title: "Cryptocurrency & Digital Assets",
    bg: "from-teal-50 to-white",
    desc: "Blockchain-backed asset platforms with secure custody, tokenization, and compliant digital transactions.",
  },
  {
    icon: <FaShieldAlt size={40} className="text-red-600" />,
    title: "RegTech & Compliance Firms",
    bg: "from-red-50 to-white",
    desc: "KYC, AML, and regulatory workflow automation with advanced monitoring and reporting systems.",
  },
];

const IndustriesWeServe = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2A3855]">
          Industries We Serve
        </h2>

        <div className="flex justify-center items-center gap-2 mt-3 mb-14">
          <span className="h-[3px] w-20 bg-[#2A3855] rounded-full"></span>
        </div>

        {/* Unique Zig-Zag Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {industries.map((item, index) => (
            <div
              key={index}
              className={`
                p-8 rounded-2xl shadow-md hover:shadow-2xl transition 
                bg-linear-to-br ${item.bg} border border-gray-200
                transform hover:-translate-y-2 duration-300
              `}
            >
              {/* Icon Section */}
              <div className="p-4 bg-white rounded-xl shadow mb-5 w-fit">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-[#2A3855] mb-3">
                {item.title}
              </h3>

              {/* Arrow line indicator */}
              <div className="h-[3px] w-16 bg-[#2A3855] rounded-full mb-3"></div>

              {/* Optional description */}
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

export default IndustriesWeServe;

import { MdPayment } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiBankCardLine } from "react-icons/ri";
import { GiChart } from "react-icons/gi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { LuLaptop } from "react-icons/lu";
import { Link } from "react-router-dom";

const items = [
  {
    icon: <MdPayment size={38} className="text-[#2A3855]" />,
    title: "Wallets & Payments",
    desc: "UPI, cards, payment gateways, merchant APIs.",
  },
  {
    icon: <GiReceiveMoney size={38} className="text-[#2A3855]" />,
    title: "Lending & BNPL Apps",
    desc: "Credit scoring, workflows, risk checks.",
  },
  {
    icon: <RiBankCardLine size={38} className="text-[#2A3855]" />,
    title: "Neobanking MVPs",
    desc: "Accounts, onboarding, transaction engines.",
  },
  {
    icon: <GiChart size={38} className="text-[#2A3855]" />,
    title: "Investment & Wealth Apps",
    desc: "Portfolio, orders, data feeds, analytics.",
  },
  {
    icon: <HiOutlineLightBulb size={38} className="text-[#2A3855]" />,
    title: "Custom Fintech Products",
    desc: "Any fintech idea. Any scale",
  },
  {
    icon: <LuLaptop size={38} className="text-[#2A3855]" />,
    title: "CTO-as-a-Service",
    desc: "Architecture, tech decisions, roadmap, hiring",
  },
];

export default function ThingsYouGet() {
  return (
    <section className="w-full py-20 bg-white">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2A3855]">
          Things You Get
        </h2>
        <div className="w-24 h-[3px] bg-[#2A3855] mx-auto mt-5"></div>
      </div>

      {/* Grid Items */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {items.map((item, index) => (
          <div key={index} className="text-center flex flex-col items-center">
            {/* Icon */}
            <div className="mb-5">{item.icon}</div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[#2A3855] mb-3">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

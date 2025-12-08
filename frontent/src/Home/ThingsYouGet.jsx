import { MdPayment } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiBankCardLine } from "react-icons/ri";
import { GiChart } from "react-icons/gi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { LuLaptop } from "react-icons/lu";
import { Link } from "react-router-dom";

const items = [
  {
    icon: <MdPayment size={28} className="text-[#2A3855]" />,
    title: "Fintech Product Strategy",
    desc: "MVP scope, product roadmap, user flows, competitive insights.",
  },
  {
    icon: <GiReceiveMoney size={28} className="text-[#2A3855]" />,
    title: "Technology & Architecture",
    desc: `Core banking, payments, lending stack, microservices, cloud architecture.`,
  },
  {
    icon: <RiBankCardLine size={28} className="text-[#2A3855]" />,
    title: "Compliance & Risk Advisory",
    desc: `RBI, KYC/AML, digital lending, PCI-DSS, security frameworks.`,
  },
  {
    icon: <GiChart size={28} className="text-[#2A3855]" />,
    title: "MVP Build & Engineering Delivery",
    desc: `UX/UI, frontend, backend, DevOps, QA, production deployment.`,
  },
  {
    icon: <HiOutlineLightBulb size={28} className="text-[#2A3855]" />,
    title: "Fractional CTO",
    desc: `Senior leadership for startups without full-time tech heads.`,
  },
  {
    icon: <LuLaptop size={28} className="text-[#2A3855]" />,
    title: "GTM & Growth",
    desc: `Pricing, analytics, activation, retention, growth experiments`,
  },
];

export default function ThingsYouGet() {
  return (
    <section className="w-full py-10 bg-white">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-[28px] md:text-[37px] font-bold text-[#2A3855]">
          Things You Get
        </h2>
        <div className="w-24 h-[3px] bg-[#2A3855] mx-auto mt-5"></div>
      </div>

      {/* Grid Items */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {items.map((item, index) => (
          <div key={index} className="text-center flex flex-col items-center">
            {/* Icon */}
            <div className="mb-5">{item.icon}</div>

            {/* Title */}
            <h3 className="text-[21px] md:text-[18px] font-bold text-[#2A3855] mb-3">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-[16px] max-w-xs mx-auto">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

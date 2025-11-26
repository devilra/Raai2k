import { LuBrainCircuit } from "react-icons/lu";
import { LuMail } from "react-icons/lu";
import { PiTargetBold } from "react-icons/pi";
import { SlGlobeAlt } from "react-icons/sl";
import { PiBankBold } from "react-icons/pi";
import { IoStatsChartSharp } from "react-icons/io5";

const items = [
  {
    icon: <LuBrainCircuit size={38} className="text-[#2A3855]" />,
    title: "Creative Support",
    desc: "We transform brands, grow businesses, and tell brand and product stories in a most creative way.",
  },
  {
    icon: <LuMail size={38} className="text-[#2A3855]" />,
    title: "Creating Experiences",
    desc: "We cover a large range of creative platforms and digital projects with one purpose: to create experiences.",
  },
  {
    icon: <PiTargetBold size={38} className="text-[#2A3855]" />,
    title: "Product Consulting",
    desc: "We guide you through the pipelines that generate new products with higher potential and lower risk.",
  },
  {
    icon: <SlGlobeAlt size={38} className="text-[#2A3855]" />,
    title: "Business Boosting",
    desc: "We provide energy-efficient and environmentally conservative solutions to our clients to boost their business.",
  },
  {
    icon: <PiBankBold size={38} className="text-[#2A3855]" />,
    title: "Strategic Approach",
    desc: "Based on solid strategic framework and relevant research, we create prototypes, not presentations.",
  },
  {
    icon: <IoStatsChartSharp size={38} className="text-[#2A3855]" />,
    title: "Logistic Consulting",
    desc: "We work buy side and sell side to give our clients answers and focus hard on best opportunities.",
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

import React from "react";
import { MdArchitecture } from "react-icons/md";
import { FaLaptopCode } from "react-icons/fa";
import { RiCloudLine } from "react-icons/ri";
import { MdUpdate } from "react-icons/md";
import { FiLayers } from "react-icons/fi";
import { MdManageAccounts } from "react-icons/md";

const expertise = [
  {
    icon: <MdArchitecture size={40} className="text-blue-600" />,
    bg: "bg-blue-50",
    border: "border-blue-300",
    title: "Software Architecture & Technical Strategy",
    desc: "Design modern, scalable, secure architecture that supports long-term growth.",
  },
  {
    icon: <FaLaptopCode size={38} className="text-green-600" />,
    bg: "bg-green-50",
    border: "border-green-300",
    title: "Custom Software Development",
    desc: "End-to-end development for web, mobile, and enterprise applications.",
  },
  {
    icon: <RiCloudLine size={40} className="text-purple-600" />,
    bg: "bg-purple-50",
    border: "border-purple-300",
    title: "Cloud & DevOps Consulting",
    desc: "Migrate, optimize, and automate your infrastructure.",
  },
  {
    icon: <MdUpdate size={40} className="text-orange-600" />,
    bg: "bg-orange-50",
    border: "border-orange-300",
    title: "Legacy Modernization",
    desc: "Transform old systems into fast, flexible, API-driven platforms.",
  },
  {
    icon: <FiLayers size={38} className="text-yellow-600" />,
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    title: "Digital Product Consulting",
    desc: "Turn your idea into a validated, launch-ready digital product.",
  },
  {
    icon: <MdManageAccounts size={40} className="text-red-600" />,
    bg: "bg-red-50",
    border: "border-red-300",
    title: "IT Strategy & CTO-as-a-Service",
    desc: "Get leadership-level guidance without full-time costs.",
  },
];

const ExpertiseSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2A3855]">
          Expertise
        </h2>

        {/* Styled underline */}
        <div className="flex justify-center items-center gap-2 mt-3 mb-14">
          <span className="h-[3px] w-20 bg-[#2A3855] rounded-full"></span>
        </div>

        {/* Expertise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {expertise.map((item, i) => (
            <div
              key={i}
              className={`${item.bg} border ${item.border} p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300`}
            >
              <div className="p-4 bg-white rounded-xl shadow w-fit mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-[#2A3855] mb-3">
                {item.title}
              </h3>

              <p className="text-gray-700 leading-relaxed text-[15.5px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;

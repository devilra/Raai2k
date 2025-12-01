import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiStackLine } from "react-icons/ri";
import { PiPlugsConnectedLight } from "react-icons/pi";
import { FiCheckCircle } from "react-icons/fi";

const blogCategories = [
  {
    icon: <HiOutlineLightBulb size={40} className="text-yellow-500" />,
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    checkColor: "text-yellow-600",
    title: "Fintech Product Strategy",
    articles: [
      "How to Validate a Fintech Idea in 7 Days (Without Writing Code)",
      "The Fintech MVP Playbook: What to Build First vs Later",
      "Product Mistakes Most Fintech Startups Make — And How to Avoid Them",
      "Designing Trust: UX Patterns That Improve Conversion in Fintech Apps",
      "Why 90% of Fintech Apps Fail to Onboard Users — and the Fix",
    ],
  },

  {
    icon: <RiStackLine size={40} className="text-blue-500" />,
    bg: "bg-blue-50",
    border: "border-blue-300",
    checkColor: "text-blue-600",
    title: "Fintech Technology & Architecture",
    articles: [
      "Choosing the Right BaaS Provider in India — 2025 Comparison",
      "How to Architect a Secure, Scalable Fintech Backend on a Budget",
      "API-First Fintech: Why Your Startup Should Go Modular",
      "UPI Tech Architecture: Deep Dive for Founders",
      "Building for High Reliability in Payments: Patterns That Work",
    ],
  },

  {
    icon: <PiPlugsConnectedLight size={40} className="text-green-500" />,
    bg: "bg-green-50",
    border: "border-green-300",
    checkColor: "text-green-600",
    title: "Integrations & Platforms",
    articles: [
      "Top KYC/AML API Providers in India — Feature Comparison",
      "How to Integrate a Payment Gateway the Right Way (Tech + UX)",
      "When to Build vs Buy: Lending Engine Edition",
      "How Wealth/Robo-Advisory Integrations Actually Work (CAS, RTA, KYC)",
      "The Future of BaaS in India: Trends, Risks, and Opportunities",
    ],
  },
];

const BlogsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2A3855]">
          Blogs <span className="text-neutral-300 text-4xl">/</span> Insights
        </h2>
        <div className="w-24 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-14"></div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogCategories.map((item, index) => (
            <div
              key={index}
              className={`${item.bg} border ${item.border} p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition transform duration-300`}
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white shadow rounded-xl">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold text-[#2A3855]">
                  {item.title} <span className="text-yellow-500"></span>
                </h3>
              </div>

              {/* Articles */}
              <ul className="space-y-4  text-gray-700 text-[15.5px] leading-relaxed ">
                {item.articles.map((article, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div>
                      <FiCheckCircle
                        size={14}
                        className={`${item.checkColor} mt-2 `}
                      />
                    </div>
                    <span>{article}</span>
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

export default BlogsSection;

import React from "react";
// Icons தேவை இல்லை, ஆனால் தேவைப்பட்டால் பயன்படுத்திக் கொள்ளலாம்.

// Data Structure (மாற்றப்படவில்லை)
const expertise = [
  {
    imageUrl: "/solution/s.jpg", // Architecture Image
    color: "text-blue-600",
    bg: "bg-blue-50",
    title: "Software Architecture & Technical Strategy",
    desc: "Design modern, scalable, secure architecture that supports long-term growth. We ensure the system foundation is robust and scalable for future demands.",
  },
  {
    imageUrl: "/solution/cu.jpg", // Development Image
    color: "text-green-600",
    bg: "bg-green-50",
    title: "Custom Software Development",
    desc: "End-to-end development for web, mobile, and enterprise applications. Bringing your unique vision to life with reliable, modern codebases.",
  },
  {
    imageUrl: "/solution/d.png", // Cloud Image
    color: "text-purple-600",
    bg: "bg-purple-50",
    title: "Cloud & DevOps Consulting",
    desc: "Migrate, optimize, and automate your infrastructure. Achieve faster deployments, higher uptime, and reduced operational costs with expert guidance.",
  },
  {
    imageUrl: "/solution/l.png", // Modernization Image
    color: "text-orange-600",
    bg: "bg-orange-50",
    title: "Legacy Modernization",
    desc: "Transform old systems into fast, flexible, API-driven platforms. Renewing outdated systems to meet today's performance and security standards.",
  },
  {
    imageUrl: "/solution/di.webp", // Product Consulting Image
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    title: "Digital Product Consulting",
    desc: "Turn your idea into a validated, launch-ready digital product. Focusing on user needs, market fit, and a clear product roadmap for success.",
  },
  {
    imageUrl: "/solution/ct.png", // Strategy/CTO Image
    color: "text-red-600",
    bg: "bg-red-50",
    title: "IT Strategy & CTO-as-a-Service",
    desc: "Get leadership-level guidance without full-time costs. Strategic planning, technology roadmapping, and team mentoring from experienced leaders.",
  },
];

const ExpertiseSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-[#2A3855]">
          Expertise
        </h2>

        {/* Styled underline */}
        <div className="flex justify-center items-center gap-2 mt-3 mb-16">
          <span className="h-[3px] w-24 bg-[#2A3855] rounded-full"></span>
        </div>

        {/* Alternating Feature Layout */}
        <div className="space-y-20">
          {expertise.map((item, i) => {
            // Index-ஐப் பொறுத்து, படத்தையும் Text-உம் மாற்றி அமைக்கிறோம்
            const isImageLeft = i % 2 === 0;

            return (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-center gap-12 p-4 md:p-0 ${
                  isImageLeft ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* 1. Image Block (மாறி வரும் வரிசை) */}
                <div className="md:w-1/2 w-full flex justify-center">
                  <div
                    className={`p-8 ${item.bg} rounded-3xl shadow-2xl transition duration-300 hover:shadow-2xl`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      // படத்தை இன்னும் பெரியதாக மாற்றப்பட்டுள்ளது
                      className="w-full md:w-[200px] rounded-2xl md:h-[200px] max-w-sm h-auto object-cover"
                    />
                  </div>
                </div>

                {/* 2. Text Content Block */}
                <div className="md:w-1/2 w-full">
                  {/* <p className={`text-lg font-semibold mb-2 ${item.color}`}>
                    Service #{i + 1}
                  </p> */}
                  <h3 className="text-3xl font-extrabold text-[#2A3855] mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-700 text-lg leading-relaxed border-l-4 border-red-500 pl-4">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;

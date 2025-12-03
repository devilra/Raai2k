import React from "react";

const leaders = [
  {
    name: "Reenal Scott",
    role: "COO (Strategy & Ops)",
    img: "/about/r.jpg",
    desc: "Ensures operational excellence across teams, enabling consistent, compliant, high-performance execution.",
  },
  {
    name: "Lily Anderson",
    role: "B2B (Partnership & Acquisition)",
    img: "/about/l.jpg",
    desc: " Identifies, negotiates and closes strategic deals towards mutual win-win scenario.",
  },
  {
    name: "Legartha Mantana",
    role: "Business Analyst (Banking, Payments, Lending)",
    img: "/about/le.jpg",
    desc: "Translates business needs into clear, actionable requirements that drive accuracy, alignment, and delivery excellence",
  },
  {
    name: "Thomas Anderson",
    role: "Solution Architect (OOTB, Custom)",
    img: "/about/t.jpg",
    desc: "Designs scalable, secure, and future-ready financial architectures that align technology with business strategy.",
  },

  {
    name: "John Snow",
    role: "Integration Expert (3rd party, APIs)",
    img: "/about/j.jpg",
    desc: "Ensures seamless, compliant, and high-reliability integrations across banking systems, APIs, and enterprise platforms.",
  },
  {
    name: "Ragner Lothbrok",
    role: "Design (UI/UX)",
    img: "/about/ra.jpg",
    desc: "Designs clean, intuitive experiences that make money easier for everyone.",
  },
];

const LeadershipSection = () => {
  return (
    <section className="py-20 bg-white">
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2A3855]">
        Global Leadership
      </h2>
      <div className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-4 mb-16"></div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {leaders.map((leader, i) => (
          <div
            key={i}
            className="
              flex flex-col bg-white p-4 rounded-xl 
              transition-all duration-300
              hover:shadow-xl hover:-translate-y-2
              cursor-pointer
            "
          >
            {/* Image */}
            <img
              src={leader.img}
              alt={leader.name}
              className="w-full h-[230px] object-cover rounded-lg"
            />

            {/* Name + Role */}
            <h3 className="mt-4 text-xl font-semibold text-[#2A3855]">
              {leader.name}
            </h3>
            <p className="text-gray-500 text-sm">{leader.role}</p>

            {/* Description */}
            <p className="mt-3 text-gray-600 text-[15px] leading-relaxed">
              {leader.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeadershipSection;

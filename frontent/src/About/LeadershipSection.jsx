import React from "react";

const leaders = [
  {
    name: "Reenal Scott",
    role: "Chief Executive Officer",
    img: "/about/r.jpg",
    desc: "Reenal leads Raai2K with a mission to help startups build fast, scale smart, and adopt modern technology without complexity or heavy cost.",
  },
  {
    name: "Lily Anderson",
    role: "Head of Operations",
    img: "/about/l.jpg",
    desc: "Lily ensures projects at Raai2K run smoothly by managing delivery, quality, and client operations across global time zones.",
  },
  {
    name: "Thomas Anderson",
    role: "Chief Technology Officer",
    img: "/about/t.jpg",
    desc: "Thomas drives Raai2K’s technical vision—specializing in cloud, AI automation, and scalable architectures for fast-growing startups.",
  },
  {
    name: "Legartha Mantana",
    role: "Head of Strategy & Branding",
    img: "/about/le.jpg",
    desc: "Legartha helps brands craft strong digital identities, ensuring each startup we support stands out with clarity and purpose.",
  },
  {
    name: "John Snow",
    role: "Lead Solutions Architect",
    img: "/about/j.jpg",
    desc: "John builds scalable technical solutions, guiding founders on infrastructure, product planning, and long-term technology strategy.",
  },
  {
    name: "Ragner Lothbrok",
    role: "VP of Engineering",
    img: "/about/ra.jpg",
    desc: "Ragner leads engineering teams at Raai2K, ensuring every product we build is reliable, high-performance, and future-ready.",
  },
];

const LeadershipSection = () => {
  return (
    <section className="py-20 bg-white">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2A3855]">
        Global Leadership
      </h2>
      <div className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-16"></div>

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

import { motion } from "framer-motion";
import { FaHospitalUser, FaBuilding, FaStore } from "react-icons/fa";
import { MdCastForEducation } from "react-icons/md";
import { GiBank, GiTruck } from "react-icons/gi";

// ஒவ்வொரு கார்டுக்கும் தனிப்பயன் நிறங்கள்
const industryColors = [
  "text-blue-600 bg-blue-100",
  "text-green-600 bg-green-100",
  "text-orange-600 bg-orange-100",
  "text-red-600 bg-red-100",
  "text-purple-600 bg-purple-100",
  "text-pink-600 bg-pink-100",
];

// NORMAL FADE-IN EFFECT (all devices)
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // one by one animate
    },
  },
};

const itemEffect = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

export const IndustriesWeServe = () => {
  const industries = [
    {
      icon: <GiBank size={28} />,
      title: "FinTech & Banking",
      desc: "Digital banking, loan platforms, payments, wallets & compliance systems.",
    },
    {
      icon: <FaHospitalUser size={28} />,
      title: "Healthcare",
      desc: "Appointment systems, telemedicine, EMR/EHR solutions & health automation.",
    },
    {
      icon: <FaStore size={28} />,
      title: "E-Commerce",
      desc: "Full-fledged marketplaces, inventory, delivery, and order management.",
    },
    {
      icon: <MdCastForEducation size={28} />,
      title: "EdTech",
      desc: "Learning platforms, course management, video delivery & live classes.",
    },
    {
      icon: <GiTruck size={28} />,
      title: "Logistics",
      desc: "Fleet tracking, delivery routing, warehouse automation & ERP systems.",
    },
    {
      icon: <FaBuilding size={28} />,
      title: "Enterprise SaaS",
      desc: "CRM, workflow automation, HR tech, cloud apps & large-scale platforms.",
    },
  ];

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="pt-10 bg-[#F2F2F2]"
    >
      {/* Section Title */}
      <motion.h2
        variants={itemEffect}
        className="text-[28px] md:text-[37px] font-bold text-center text-[#2A3855]"
      >
        Industries We Transform
      </motion.h2>

      <motion.div
        variants={itemEffect}
        className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-7"
      ></motion.div>

      <motion.p
        variants={itemEffect}
        className="text-center text-gray-600 text-[16px] mb-16 max-w-3xl mx-auto"
      >
        We deliver custom digital solutions across diverse sectors,
        understanding the unique challenges of each industry.
      </motion.p>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {industries.map((ind, i) => (
          <motion.div
            key={i}
            variants={itemEffect}
            className={`relative p-8 rounded-xl shadow-lg transform hover:scale-[1.03] 
                        transition-all duration-300 group bg-white 
                        border-b-4 border-l-4 border-neutral-300 border-opacity-20 hover:shadow-2xl`}
          >
            {/* Icon + Title */}
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 
                            ${industryColors[i % industryColors.length]}
                            shadow-inner group-hover:shadow-xl transition-shadow duration-300`}
              >
                {ind.icon}
              </div>

              <h3 className="text-[21px] md:text-[18px] font-bold text-[#2A3855] mb-2">
                {ind.title}
              </h3>
            </div>

            <p className="text-gray-600 text-[16px] mt-2">{ind.desc}</p>

            {/* Bottom Accent */}
            <div
              className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full 
                          transition-all duration-500 rounded-full
                          ${industryColors[i % industryColors.length]
                            .replace("bg-", "bg-")
                            .replace("100", "500")
                            .replace("text-", "")}`}
            ></div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

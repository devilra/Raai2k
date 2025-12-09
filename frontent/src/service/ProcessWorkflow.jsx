import { motion } from "framer-motion";
import { FaSearch, FaPenNib, FaCode, FaBug, FaRocket } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemEffect = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export const ProcessWorkflow = () => {
  const steps = [
    {
      icon: <FaSearch size={15} />,
      title: "Discovery & Research",
      desc: "We understand your idea, requirements, goals and target users before starting.",
    },
    {
      icon: <MdDesignServices size={15} />,
      title: "UI/UX Wireframe",
      desc: "We create clean, intuitive wireframes & prototypes for smooth user journey.",
    },
    {
      icon: <FaPenNib size={15} />,
      title: "Architecture Planning",
      desc: "Choosing the right tech stack, database and scalable system architecture.",
    },
    {
      icon: <FaCode size={15} />,
      title: "Development",
      desc: "Frontend + backend + API development with clean code & best practices.",
    },
    {
      icon: <FaBug size={15} />,
      title: "Testing & QA",
      desc: "Multiple rounds of QA, security testing and performance optimization.",
    },
    {
      icon: <FaRocket size={15} />,
      title: "Launch & Support",
      desc: "Deployment, monitoring, support & future enhancements.",
    },
  ];

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="py-20 bg-gray-50"
    >
      {/* Heading */}
      <motion.h2
        variants={itemEffect}
        className="text-[28px] md:text-[37px] font-bold text-center text-[#2A3855]"
      >
        Our Development Process
      </motion.h2>

      <motion.div
        variants={itemEffect}
        className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-7"
      ></motion.div>

      <motion.p
        variants={itemEffect}
        className="text-center text-[16px] text-[#2A3855] mb-16"
      >
        A structured approach for high-quality product delivery.
      </motion.p>

      {/* Workflow Cards */}
      <motion.div
        variants={container}
        className="max-w-4xl mx-auto px-6 space-y-12"
      >
        {steps.map((s, i) => (
          <motion.div
            key={i}
            variants={itemEffect}
            className="flex items-start group"
          >
            {/* Left Icon + Line */}
            <div className="flex flex-col items-center mr-4 sm:mr-8">
              <div
                className={`w-12 h-12 rounded-full bg-[#2A3855] flex items-center justify-center text-white shadow-lg 
                transition-all duration-300 transform group-hover:scale-110`}
              >
                {s.icon}
              </div>

              {i <= steps.length - 1 && (
                <div className="w-1 bg-gray-300 h-20 group-hover:bg-gray-400 transition-colors duration-300" />
              )}
            </div>

            {/* Right Content */}
            <div className="flex-1 mt-1 p-6 bg-white rounded-xl shadow-md border-t-4 border-l-4 border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <span className="text-sm font-bold uppercase text-[#2A3855] opacity-80">
                Step {i + 1}
              </span>
              <h3 className="text-[21px] md:text-[18px] font-bold text-[#2A3855] mt-1 mb-2">
                {s.title}
              </h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

import { motion } from "framer-motion";
import { FaHandshake, FaUserTie, FaClock } from "react-icons/fa";

// Fade Animation
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

export const EngagementModels = () => {
  const models = [
    {
      icon: <FaHandshake size={28} />,
      title: "Fixed Cost Model",
      desc: "Clear scope, fixed timeline and fixed price. Best for well-defined projects.",
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: <FaUserTie size={22} />,
      title: "Dedicated Team Model",
      desc: "Hire a dedicated team or developers who act as your extended tech team.",
      color: "from-purple-500 to-purple-700",
    },
    {
      icon: <FaClock size={22} />,
      title: "Time & Material Model",
      desc: "Pay based on hours spent. Best for long-term or evolving projects.",
      color: "from-pink-500 to-pink-700",
    },
  ];

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="py-20 bg-linear-to-br bg-gray-50"
    >
      {/* Heading */}
      <motion.h2
        variants={itemEffect}
        className="text-[28px] md:text-[37px] font-bold text-center text-[#2A3855] drop-shadow-sm"
      >
        Choose Your Perfect Engagement Model
      </motion.h2>

      <motion.div
        variants={itemEffect}
        className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-7"
      ></motion.div>

      <motion.p
        variants={itemEffect}
        className="text-center text-[16px] text-[#2A3855] mb-16 max-w-2xl mx-auto"
      >
        We offer flexible partnership models designed to fit your project's
        unique requirements and budget.
      </motion.p>

      {/* Cards Grid */}
      <motion.div
        variants={container}
        className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {models.map((m, i) => (
          <motion.div
            key={i}
            variants={itemEffect}
            className={`
              relative p-8 rounded-3xl shadow-xl transform hover:-translate-y-2 
              transition-all duration-300 bg-linear-to-br
              from-[#2A3855] to-[#1e293d] text-white overflow-hidden
            `}
          >
            {/* Background Shapes */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <div className="mb-3">{m.icon}</div>
                <h3 className="text-[21px] md:text-[18px] font-bold mb-3">
                  {m.title}
                </h3>
              </div>

              <p className="text-gray-100 opacity-90 text-[16px]">{m.desc}</p>

              <button
                className="mt-6 inline-flex items-center px-6 py-3 border border-white 
                text-white rounded-full font-semibold text-[16px] 
                hover:bg-white hover:text-gray-900 transition-colors duration-300 shadow-md"
              >
                Learn More
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

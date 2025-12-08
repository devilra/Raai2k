import { FaUsers } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa6";
import { IoFlashOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { MdOutlineArchitecture } from "react-icons/md";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const itemEffect = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 2,
    },
  },
};

const features = [
  {
    icon: <VscWorkspaceTrusted size={28} className="text-[#2A3855]" />,
    title: "Trusted Security",
    desc: "We ensure enterprise-grade protection with continuous monitoring, secure architecture, and fully compliant workflows.",
  },
  {
    icon: <MdOutlineArchitecture size={28} className="text-[#2A3855]" />,
    title: "Scalable Architecture",
    desc: "Your systems grow as your business grows, powered by highly optimized, cloud-ready architecture.",
  },
  {
    icon: <IoFlashOutline size={28} className="text-[#2A3855]" />,
    title: "Faster Performance",
    desc: "We develop a systematic well-ordered process of analysis, from concept through implementation.",
  },
];

const VideoSection = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <section className="w-full py-10 md:py-12 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          {/* IMAGE + PLAY BUTTON */}
          <div className="relative w-full  rounded-2xl overflow-hidden shadow-sm">
            <img
              src="/video/v1.jpg"
              alt="video"
              className="w-full h-full object-cover"
            />

            {/* Play Button centered */}
            {/* Play Button centered */}
            <button
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
            >
              <FaPlay size={20} />
            </button>
          </div>

          {/* FEATURES */}
          <div className="mt-16 flex flex-col md:flex-row justify-between gap-5 md:gap-2">
            {features.map((item, index) => (
              <motion.div
                variants={itemEffect}
                key={index}
                className="border p-2 md:p-3 border-neutral-400/30 shadow-md rounded-lg"
              >
                <div className="flex flex-col  items-start gap-4">
                  {/* Text */}
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="text-[#2A3855]  ">{item.icon}</div>
                    <h3 className="text-[21px]  md:text-[18px] font-bold text-[#2A3855]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-[16px]  max-w-xs ">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default VideoSection;

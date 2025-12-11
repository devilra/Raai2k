import { FaComments } from "react-icons/fa6";
import { GiTimeTrap } from "react-icons/gi";
import { MdCreateNewFolder } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Data
const items = [
  {
    icon: <FaComments size={28} className="text-[#2A3855]" />,
    desc: "Deep Domain Knowledge: Experienced in financial regulations, banking operations, and risk management",
  },
  {
    icon: <MdCreateNewFolder size={28} className="text-[#2A3855]" />,
    desc: "Agile & Flexible Engagements: Choose from advisory, MVP build, or long-term tech partnership",
  },
  {
    icon: <GiTimeTrap size={28} className="text-[#2A3855]" />,
    desc: "Proven Track Record: Delivered fintech systems for banks, startups, and regulated financial firms",
  },
];

// Detect lg device
const isLargeScreen = window.innerWidth >= 1024;

// Animations
const fadeLeft = {
  hidden: { opacity: 0, x: isLargeScreen ? -60 : 0 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: isLargeScreen ? 60 : 0 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// Mobile + Tablet fadeUp fallback
const fadeUp = {
  hidden: { opacity: 0, y: isLargeScreen ? 0 : 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export default function WhyChooseElixir() {
  return (
    <section className="w-full bg-white pt-20">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-[28px] md:text-[37px] font-bold text-[#2A3855]">
          Why Choose raai2k
        </h2>
        <div className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-5 flex flex-col lg:flex-row lg:items-center gap-12 md:gap-16 items-start">
        {/* Left Image */}
        <motion.div
          variants={isLargeScreen ? fadeLeft : fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full lg:w-[400px]"
        >
          <img
            src="/service/s1.jpg"
            className="rounded-xl shadow-md w-full object-cover"
            alt="Choose RAai2k"
          />
        </motion.div>

        {/* Right Items */}
        <motion.div
          variants={isLargeScreen ? fadeRight : fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full lg:w-1/2 flex flex-col gap-10"
        >
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div>{item.icon}</div>
              <div>
                <p className="text-gray-600 text-[16px]">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* CTA Box */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full pt-30"
      >
        {/* FULL WIDTH BLUE BACKGROUND */}
        <div className="w-full bg-[#2A3855] shadow-xl py-10">
          {/* CENTERED CONTENT ONLY */}
          <div
            className="max-w-6xl mx-auto px-6 lg:px-10 
                    flex flex-col md:flex-row items-center justify-between gap-6 text-white"
          >
            <h3 className="text-xl md:text-2xl font-semibold leading-relaxed text-center md:text-left">
              Ready to transform your financial platform ?? Talk to our team,
              now..
            </h3>

            <Link
              to="/contact"
              className="bg-white text-[#2A3855] font-semibold px-8 py-3 rounded-full 
                   hover:bg-gray-200 transition whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

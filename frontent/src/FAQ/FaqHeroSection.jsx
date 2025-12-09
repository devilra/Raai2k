import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMobileAlt,
  FaUserShield,
  FaMoneyCheckAlt,
  FaCogs,
  FaCodeBranch,
  FaUsers,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

// NORMAL FADE-IN VARIANTS
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

// FAQ DATA (same as yours)
const faqData = [
  {
    category: "About Our Services",
    icon: <FaUsers className="text-blue-700 text-xl" />,
    questions: [
      {
        q: "What exactly do you do for fintech startups?",
        a: "We help founders and teams build, launch, and scale fintech products—covering product strategy, UX, technology, compliance, integrations, and GTM execution.",
      },
      {
        q: "Do you only work with fintech companies?",
        a: "Yes. We specialize 100% in fintech: neobanking, lending, payments, UPI apps, wealth/robo-advisory, P2P, BNPL, insuretech, and more.",
      },
      {
        q: "Can you work with very early-stage founders?",
        a: "Absolutely. Many clients come with just an idea or pitch deck. We help validate feasibility, scope the MVP, and plan the product roadmap.",
      },
      {
        q: "Do you take on long-term product/tech ownership?",
        a: "Yes — we offer fractional CTO, product leadership, and ongoing advisory retained engagements.",
      },
    ],
  },
  {
    category: "Product & Technology",
    icon: <FaCogs className="text-blue-700 text-xl" />,
    questions: [
      {
        q: "Can you build our MVP end-to-end?",
        a: "Yes. We handle product design, UX, system architecture, engineering, QA, and deployment.",
      },
      {
        q: "What tech stacks do you support?",
        a: "React/Next, Flutter, Node, Java/Spring, Go, Python, microservices, serverless, and major cloud providers (AWS/GCP/Azure).",
      },
      {
        q: "Do you integrate with fintech APIs?",
        a: "Yes — including banking-as-a-service providers, UPI/QR/AEPS rails, KYC/AML APIs, payments gateways, wealth platforms, credit bureaus, and lending engines.",
      },
      {
        q: "Can you audit our existing code or product?",
        a: "Yes — we offer product audits, code reviews, architecture assessments, and security/compliance gap analysis.",
      },
    ],
  },
  {
    category: "Pricing & Engagement",
    icon: <FaMoneyCheckAlt className="text-blue-700 text-xl" />,
    questions: [
      {
        q: "How do you structure your pricing?",
        a: "Flexible — fixed-cost MVPs, sprint-based pricing, monthly retainers, or long-term fractional roles.",
      },
      {
        q: "Is there a minimum engagement?",
        a: "Typically 4–6 weeks, but we also offer short engagement strategy workshops for early-stage teams.",
      },
      {
        q: "Do you offer free consultations?",
        a: "Yes — a 30-minute discovery call to understand your product, challenges, and roadmap.",
      },
    ],
  },
  {
    category: "Timelines & Delivery",
    icon: <FaCodeBranch className="text-blue-700 text-xl" />,
    questions: [
      {
        q: "How long does an MVP take?",
        a: "Most fintech MVPs are delivered within 6–12 weeks, depending on complexity and integrations.",
      },
      {
        q: "Can you accelerate delivery for investor deadlines?",
        a: "Yes — we often support time-sensitive fundraising, PoCs, and pitch-based MVPs.",
      },
    ],
  },
  {
    category: "Working With Your Team",
    icon: <FaUserShield className="text-blue-700 text-xl" />,
    questions: [
      {
        q: "Can you collaborate with our existing developers or designers?",
        a: "Yes — we frequently co-build with in-house teams to boost velocity and strengthen architecture/product quality.",
      },
      {
        q: "Do you offer ongoing support after launch?",
        a: "Yes — including maintenance, performance monitoring, feature updates, and compliance enhancements.",
      },
    ],
  },
  {
    category: "Trust & Credentials",
    icon: <FaMobileAlt className="text-blue-700 text-xl" />,
    questions: [
      {
        q: "Have you worked with regulated institutions?",
        a: "Yes — we’ve collaborated with banks, NBFCs, P2P lenders, payment providers, wealth advisors, and fintech BaaS partners across India and international markets.",
      },
    ],
  },
];

const FaqHeroSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (categoryData) => {
    setSelectedCategory(categoryData);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full bg-[#F4F6F8] py-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <motion.h2
          variants={fadeIn}
          className="text-[28px] md:text-[37px] bg-[#F2F2F2] p-5 font-bold text-center text-[#1A2E47] mb-12 tracking-wide"
        >
          FAQs
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {faqData.map((section, idx) => (
            <motion.div
              key={idx}
              variants={fadeIn}
              className="bg-white p-7 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-3">
                {section.icon}
                <h3 className="text-lg font-bold text-gray-800">
                  {section.category}
                </h3>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                {section.questions[0].q}
              </p>

              <button
                onClick={() => openModal(section)}
                className="font-semibold bg-[#1A2E47] cursor-pointer text-white px-5 py-2 text-sm rounded-lg hover:bg-[#102033] transition"
              >
                VIEW ARTICLES
              </button>
            </motion.div>
          ))}
        </div>

        {/* Animated Modal */}
        <AnimatePresence>
          {isModalOpen && selectedCategory && (
            <motion.div
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { duration: 0.3 } },
              }}
              className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-white rounded-xl w-full max-w-3xl px-6 pb-6 relative overflow-y-auto max-h-[80vh]"
              >
                {/* Close Button */}
                <div className="flex justify-end sticky top-0 z-50">
                  <button
                    onClick={closeModal}
                    className="text-2xl text-gray-700 cursor-pointer bg-white/80 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white"
                  >
                    <IoClose />
                  </button>
                </div>

                <h3 className="text-2xl font-bold text-[#1A2E47] underline mb-6">
                  {selectedCategory.category}
                </h3>

                {/* Questions */}
                <div className="space-y-6 pr-2">
                  {selectedCategory.questions.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={fadeIn}
                      className="border-b pb-4"
                    >
                      <h4 className="font-semibold text-lg text-gray-900">
                        {item.q}
                      </h4>
                      <p className="text-gray-600 mt-2 text-[15px]">{item.a}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default FaqHeroSection;

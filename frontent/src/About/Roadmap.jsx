import React from "react";
import { Chrono } from "react-chrono";
import { motion } from "framer-motion";
import { FaFlag } from "react-icons/fa";

const milestones = [
  {
    title: "1999",
    cardTitle: "Initial Foundation",
    cardDetailedText: "Company started with core fintech solutions.",
    timelineContent: <FaFlag className="text-white text-lg" />,
    color: "#F7B500",
  },
  {
    title: "2002",
    cardTitle: "Product Launch",
    cardDetailedText: "First digital product for startups released.",
    timelineContent: <FaFlag className="text-white text-lg" />,
    color: "#6B21A8",
  },
  {
    title: "2014",
    cardTitle: "Global Expansion",
    cardDetailedText: "Expanded operations to 5+ countries.",
    timelineContent: <FaFlag className="text-white text-lg" />,
    color: "#2563EB",
  },
  {
    title: "2019",
    cardTitle: "Acquisition & Growth",
    cardDetailedText: "Major acquisition helped growth to scale.",
    timelineContent: <FaFlag className="text-white text-lg" />,
    color: "#16A34A",
  },
];

const Roadmap = () => {
  return (
    <section className="bg-gray-50 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-12 text-[#1A2E47]"
      >
        Company Milestones
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <Chrono
          items={milestones}
          mode="VERTICAL"
          scrollable={true}
          allowDynamicUpdate
          cardHeight={160}
          theme={{
            primary: "#1A2E47",
            secondary: "#ffffff",
            titleColor: "#1A2E47",
            cardDetailsColor: "#555",
          }}
          cardClassName="rounded-xl shadow-lg border border-gray-100"
          disableAutoScrollOnClick={false}
        />
      </motion.div>
    </section>
  );
};

export default Roadmap;

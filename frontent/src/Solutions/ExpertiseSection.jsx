import React from "react";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import { IoChatbox, IoCall } from "react-icons/io5";
import { TfiNewWindow } from "react-icons/tfi";
import { Link } from "react-router-dom";

// Detect LG device
const isLargeScreen = window.innerWidth >= 1024;

// Same animation system as OUR SERVICES
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

const fadeUp = {
  hidden: { opacity: 0, y: isLargeScreen ? 0 : 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const services = [
  {
    id: 1,
    imageUrl: "/solution/s.jpg",
    title: "Software Architecture & Technical Strategy",
    desc: "Design modern, scalable, secure architecture that supports long-term growth.",
    reverse: false,
  },
  {
    id: 2,
    imageUrl: "/solution/cu.jpg",
    title: "Custom Software Development",
    desc: "End-to-end development for web, mobile, and enterprise applications.",
    reverse: true,
  },
  {
    id: 3,
    imageUrl: "/solution/d.png",
    title: "Cloud & DevOps Consulting",
    desc: "Optimize infrastructure, automate deployments, improve uptime.",
    reverse: false,
  },
  {
    id: 4,
    imageUrl: "/solution/l.png",
    title: "Legacy Modernization",
    desc: "Transform outdated systems into fast, flexible platforms.",
    reverse: true,
  },
  {
    id: 5,
    imageUrl: "/solution/di.webp",
    title: "Digital Product Consulting",
    desc: "Turn your idea into a validated, launch-ready product.",
    reverse: false,
  },
  {
    id: 6,
    imageUrl: "/solution/ct.png",
    title: "IT Strategy & CTO-as-a-Service",
    desc: "Strategic planning, tech roadmaps, and leadership.",
    reverse: true,
  },
];

const ExpertiseSection = () => {
  return (
    <section className="w-full py-10 md:pt-10 mt-14">
      <div className="max-w-6xl mx-auto px-5">
        {/* Title */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center text-[28px] md:text-[37px] font-bold text-[#2A3855]"
        >
          Expertise
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-4 mb-12"
        ></motion.div>

        {/* Expertise Blocks */}
        <div className="flex flex-col gap-5 md:gap-10 lg:gap-0">
          {services.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col ${
                item.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } bg-white overflow-hidden w-full`}
            >
              {/* IMAGE BLOCK */}
              <motion.div
                variants={item.reverse ? fadeRight : fadeLeft}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="w-full lg:w-1/2 h-[350px] md:h-[300px]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* TEXT BLOCK */}
              <motion.div
                variants={item.reverse ? fadeLeft : fadeRight}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-10"
              >
                <h3 className="text-[21px] md:text-[18px] font-bold text-[#2A3855] mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-[16px] border-l-4 pl-4 border-red-500 mb-6">
                  {item.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;

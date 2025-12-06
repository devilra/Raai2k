"use client"; // This must be at the top for Hooks like useRef to work

import { motion } from "framer-motion";
import React, { RefObject, useEffect, useId, useState, useRef } from "react";
// Assuming you have a utility function for Tailwind class merging
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- 1. ANIMATED BEAM COMPONENT (No changes needed here for UI/clipping fixes) ---

export const AnimatedBeam = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#7C3AED",
  gradientStopColor = "#FBBF24",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      };

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        const controlY = startY - curvature;
        const d = `M ${startX},${startY} Q ${
          (startX + endX) / 2
        },${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updatePath();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    updatePath();

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute top-0 left-0 transform-gpu stroke-2",
        className
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      {/* Base Path (faint line) */}
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      {/* Animated Gradient Path (The beam) */}
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits={"userSpaceOnUse"}
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1], // easeOutExpo
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  );
};

// --- 2. MAIN COMPONENT INTEGRATION ---

const differentiators = [
  "Assets & Accelerator’s", // 0: Top Left
  "Optimal App Performance", // 1: Top Right
  "User Experience (Priority 1st)", // 2: Middle Right
  "Scratch Implementation", // 3: Bottom Right
  "OOTB Best Practices & Coding Standards", // 4: Bottom Center
  "Establish Process & Aid PROJECT Roadmap", // 5: Bottom Left
  "Global Support & Training", // 6: Middle Left
  "System (Health) Check & Recommendations", // 7: Top Center
];

// Reusable Card Component with Mobile text size adjustment
const DifferentiatorCard = ({ children, index, className = "", cardRef }) => {
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`relative overflow-hidden bg-[#111] border border-[#333] 
        rounded-xl p-4 sm:p-6 text-white shadow-lg 
        hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] 
        hover:border-[#555] transition max-w-[200px] sm:max-w-[280px] ${className}`} // Adjusted max-w for mobile
    >
      <div className="relative z-20">{children}</div>
    </motion.div>
  );
};

export default function DifferentiatorsSection() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const cardRefs = differentiators.map(() => useRef(null));

  // Adjusted cardPositions for better spacing and to avoid left-side clipping
  const cardPositions = [
    "top-[5%] left-[70%] ", // 0: Top Left - Shifted right
    "top-[3%] left-[40%] ", // 1: Top Right - Shifted left
    "-top-[10%] -right-[10%] ", // 2: Middle Right (Keep close to right edge)
    "bottom-[5%] right-[10%] ", // 3: Bottom Right - Shifted left
    "bottom-[2%] left-1/2 ", // 4: Bottom Center
    "bottom-[5%] left-[10%] ", // 5: Bottom Left - Shifted right
    "-top-1/2  -right-[75%] ", // 6: Middle Left (Keep close to left edge)
    "-top-1/2  ", // 7: Top Center
  ];

  // Offsets adjusted slightly to accommodate card shift and maintain connection
  const offsets = [
    { startX: -40, startY: -40, endX: 40, endY: 40 }, // 0: Top Left
    { startX: 40, startY: -40, endX: -40, endY: 40 }, // 1: Top Right
    { startX: 50, startY: 0, endX: -50, endY: 0 }, // 2: Middle Right
    { startX: 40, startY: 40, endX: -40, endY: -40 }, // 3: Bottom Right
    { startX: 0, startY: 50, endX: 0, endY: -50 }, // 4: Bottom Center
    { startX: -40, startY: 40, endX: 40, endY: -40 }, // 5: Bottom Left
    { startX: -50, startY: 0, endX: 50, endY: 0 }, // 6: Middle Left
    { startX: 0, startY: -50, endX: 0, endY: 50 }, // 7: Top Center
  ];

  return (
    // Responsive height and padding for better visibility on all screens
    <section className="relative py-16 md:py-40 bg-black overflow-hidden h-[900px] flex items-center justify-center">
      {/* MAIN CONTAINER FOR THE MIND-MAP LAYOUT */}
      <div
        ref={containerRef}
        // max-w-full use panni, parent section padding-a use panni spacing maintain pannalam
        className="relative w-full h-[900px] max-h-[900px] px-4 sm:px-8"
      >
        {/* ANIMATED BEAMS (SVG Connections) */}
        <div className="absolute inset-0 z-10">
          {differentiators.map((_, idx) => (
            <AnimatedBeam
              key={`beam-${idx}`}
              containerRef={containerRef}
              fromRef={centerRef}
              toRef={cardRefs[idx]}
              duration={3 + Math.random() * 2}
              curvature={20}
              pathColor="#4F46E5"
              gradientStartColor="#9333ea"
              gradientStopColor="#6366f1"
              startXOffset={offsets[idx].startX}
              startYOffset={offsets[idx].startY}
              endXOffset={offsets[idx].endX}
              endYOffset={offsets[idx].endY}
            />
          ))}
        </div>

        {/* CENTER CHIP TITLE (MAIN DIFFERENTIATOR) - Responsive text size */}
        <motion.div
          ref={centerRef}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 z-30 
                    w-fit px-6 py-3 md:px-10 md:py-4 rounded-full bg-[#1A1A1A] text-white text-base md:text-2xl font-bold 
                    border border-indigo-500 shadow-[0_0_30px_6px_rgba(99,102,241,0.5)] cursor-pointer"
        >
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 to-white">
            Our Core Differentiators
          </span>
        </motion.div>

        {/* DIFFERENTIATOR CARDS (Z-20) - Responsive text size in Card content */}
        {differentiators.map((text, idx) => (
          <DifferentiatorCard
            key={idx}
            index={idx}
            cardRef={cardRefs[idx]}
            className={`absolute z-20 ${cardPositions[idx]}`}
          >
            <h3 className="text-sm sm:text-base font-bold mb-1 sm:mb-2 text-transparent bg-clip-text bg-linear-to-r from-white to-gray-300">
              {text}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Unique approach ensures quality.
            </p>
          </DifferentiatorCard>
        ))}
      </div>
    </section>
  );
}

import React, { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";

const Counter = ({ from, to, start }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    if (start) {
      const controls = animate(count, to, { duration: 2 });
      return controls.stop;
    }
  }, [start]);

  return <motion.span>{rounded}</motion.span>;
};

const StatsSection = () => {
  const ref = useRef(null);

  // 🔥 Section visible ah varum pothu trigger aagum
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative w-full py-24 bg-cover bg-center"
      style={{ backgroundImage: "url('/about/a2.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#1f2937]/70"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
        {/* Heading */}
        <div className="flex flex-col justify-center items-center mb-10">
          {/* Icon + First Line */}
          <div className="flex items-center gap-4">
            <span className="p-2 rounded-full border-4 border-yellow-400 flex items-center justify-center">
              <FaCheckCircle className="text-yellow-400 text-3xl" />
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400">
              Take the right step,
            </h2>
          </div>

          {/* Second Line */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3">
            do the big things.
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-20">
          {/* 1 */}
          <div>
            <h3 className="text-5xl font-bold text-white">
              <Counter from={0} to={70} start={isInView} />%
            </h3>
            <p className="mt-2 text-lg opacity-90">Certified</p>
          </div>

          {/* 2 */}
          <div>
            <h3 className="text-5xl font-bold text-white">
              <Counter from={0} to={60} start={isInView} />
              ++
            </h3>
            <p className="mt-2 text-lg opacity-90">Projects</p>
          </div>

          {/* 3 */}
          <div>
            <h3 className="text-5xl font-bold text-white">
              <Counter from={0} to={8} start={isInView} />
              ++
            </h3>
            <p className="mt-2 text-lg opacity-90">Geographies</p>
          </div>

          {/* 4 */}
          <div>
            <h3 className="text-5xl font-bold text-white">
              <Counter from={0} to={100} start={isInView} />
            </h3>
            <p className="mt-2 text-lg opacity-90">Satisfied Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

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
        <div className="flex justify-center items-center gap-3 mb-6">
          <FaCheckCircle className="text-yellow-400 text-4xl" />
          <h2 className="text-4xl md:text-5xl font-bold">
            Take the right step,
            <br /> do the big things.
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-10">
          {/* 1 */}
          <div>
            <h3 className="text-5xl font-bold text-white">
              <Counter from={0} to={120} start={isInView} />
            </h3>
            <p className="mt-2 text-lg opacity-90">Projects Delivered</p>
          </div>

          {/* 2 */}
          <div>
            <h3 className="text-5xl font-bold text-white">
              <Counter from={0} to={40} start={isInView} />
            </h3>
            <p className="mt-2 text-lg opacity-90">Skilled Engineers</p>
          </div>

          {/* 3 */}
          <div>
            <h3 className="text-5xl font-bold text-white">
              <Counter from={0} to={6} start={isInView} />
            </h3>
            <p className="mt-2 text-lg opacity-90">Countries Served</p>
          </div>

          {/* 4 */}
          <div>
            <h3 className="text-5xl font-bold text-white">
              <Counter from={0} to={50} start={isInView} />
            </h3>
            <p className="mt-2 text-lg opacity-90">Happy Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

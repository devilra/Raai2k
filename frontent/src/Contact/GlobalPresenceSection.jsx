import React from "react";
import { motion } from "framer-motion";

const mapFade = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const GlobalPresenceSection = () => {
  return (
    <section className="w-full py-20 bg-white">
      {/* Heading */}
      <motion.h2
        variants={mapFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="text-[28px] md:text-[37px] font-bold text-center text-[#2A3855]"
      >
        Our Client base
      </motion.h2>

      <motion.div
        variants={mapFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-10"
      ></motion.div>

      {/* MAP IMAGE */}
      <motion.div
        variants={mapFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        className="w-full flex justify-center"
      >
        <img
          src="/map/map.jpeg"
          alt="Global Coverage Map"
          className="
            w-full 
            max-w-[1400px] 
            mx-auto 
            object-contain 
            md:h-[550px] 
            h-[280px]
          "
        />
      </motion.div>

      {/* Description */}
      {/* <motion.p
        variants={mapFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mt-10 max-w-3xl mx-auto text-gray-700 text-[17px] leading-relaxed"
      >
        Serving clients across North America, Europe, Africa, Middle East, and
        Asia — delivering secure, scalable & modern digital solutions globally.
      </motion.p> */}
    </section>
  );
};

export default GlobalPresenceSection;

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./mapStyles.css"; // Add CSS file

const ServingClients = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://public.flourish.studio/resources/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <motion.div
      className="max-w-6xl mx-auto rounded-lg px-4 flex justify-center items-center my-12"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }} // animate only once on scroll
    >
      <div
        className="flourish-embed flourish-map"
        data-src="visualisation/26674415"
        style={{
          width: "100%",
          maxWidth: "1400px",
          height: "80vh", // full height feel
        }}
      ></div>
    </motion.div>
  );
};

export default ServingClients;

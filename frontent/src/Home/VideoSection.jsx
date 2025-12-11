import { IoFlashOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { MdOutlineArchitecture } from "react-icons/md";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import VideoJS from "./VideoJS";
import "videojs-youtube"; // ⭐ IMPORTANT — YouTube plugin

const container = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
};

const itemEffect = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};

const features = [
  {
    icon: <VscWorkspaceTrusted size={28} className="text-[#2A3855]" />,
    title: "Trusted Security",
    desc: "We ensure enterprise-grade protection with secure architecture.",
  },
  {
    icon: <MdOutlineArchitecture size={28} className="text-[#2A3855]" />,
    title: "Scalable Architecture",
    desc: "Your systems grow as your business grows.",
  },
  {
    icon: <IoFlashOutline size={28} className="text-[#2A3855]" />,
    title: "Faster Performance",
    desc: "We build optimized engineered systems.",
  },
];

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // -------------------------------------------------------
  // ⭐ OLD MP4 VIDEO - COMMENTED & HIGHLIGHTED
  // -------------------------------------------------------
  // const videoJsOptions = {
  //   autoplay: true,
  //   controls: true,
  //   muted: true,
  //   responsive: true,
  //   fluid: true,
  //   loop: true,
  //   sources: [
  //     { src: "/video/v.mp4", type: "video/mp4" },
  //   ],
  // };
  // -------------------------------------------------------

  // ⭐ NEW YOUTUBE VIDEO OPTIONS
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    muted: false,
    responsive: true,
    fluid: true,
    techOrder: ["youtube"],
    sources: [
      {
        src: "https://www.youtube.com/watch?v=THLgA1uBlHU",
        type: "video/youtube",
      },
    ],
  };

  const handlePlayerReady = () => {
    console.log("YouTube Video Ready!");
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <section className="w-full pt-10 md:pt-12 lg:pt-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          {/* IMAGE + PLAY BUTTON */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-sm">
            <img
              src="/video/v2.png"
              alt="video"
              className="w-full h-full object-cover"
            />

            <button
              onClick={() => setIsPlaying(true)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              bg-white w-20 h-20 rounded-full flex items-center justify-center
              shadow-xl hover:scale-110 transition"
            >
              <FaPlay size={22} className="text-black" />
            </button>
          </div>

          {/* VIDEO POPUP */}
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 px-4"
              onClick={() => setIsPlaying(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-4xl rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setIsPlaying(false)}
                  className="absolute -top-12 right-0 text-white text-4xl z-50"
                >
                  <IoClose />
                </button>

                {/* VIDEO JS PLAYER */}
                <div className="relative pt-[56.25%]">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <VideoJS
                      options={videoJsOptions}
                      onReady={handlePlayerReady}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* FEATURES */}
          <div className="mt-16 flex flex-col md:flex-row justify-between gap-5">
            {features.map((item, index) => (
              <motion.div
                key={index}
                variants={itemEffect}
                className="border p-3 shadow-md rounded-lg border-neutral-400/30"
              >
                <div className="flex items-start gap-4">
                  <div className="text-[#2A3855]">{item.icon}</div>
                  <div>
                    <h3 className="text-[21px] md:text-[18px] font-bold text-[#2A3855]">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-[16px] mt-2 max-w-xs">
                      {item.desc}
                    </p>
                  </div>
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

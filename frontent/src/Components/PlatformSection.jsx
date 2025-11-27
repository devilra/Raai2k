import React from "react";
import { FaAws } from "react-icons/fa";
import { SiAdobe, SiSap, SiAngular, SiMulesoft } from "react-icons/si";
import {
  FaSalesforce,
  FaJava,
  FaJs,
  FaNode,
  FaPhp,
  FaShopify,
  FaReact,
} from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";
import { IoLogoTableau } from "react-icons/io5";
import { VscAzure } from "react-icons/vsc";
import { FaPython, FaWordpress } from "react-icons/fa";

const PlatformSection = () => {
  const tech = [
    {
      pos: "top-[10%] left-1/2 -translate-x-1/2",
      icon: <FaAws size={56} className="text-gray-700" />,
    },
    {
      pos: "top-[25%] left-[15%]",
      icon: <SiAdobe size={56} className="text-red-500" />,
    },
    {
      pos: "top-[25%] right-[15%]",
      icon: <FaSalesforce size={56} className="text-sky-500" />,
    },

    {
      pos: "top-1/2 left-[5%] -translate-y-1/2",
      icon: <SiSap size={56} className="text-blue-600" />,
    },
    {
      pos: "top-1/2 right-[5%] -translate-y-1/2",
      icon: <IoLogoTableau size={56} className="text-orange-500" />,
    },

    {
      pos: "bottom-[25%] left-[15%]",
      icon: <VscAzure size={56} className="text-blue-500" />,
    },
    {
      pos: "bottom-[25%] right-[15%]",
      icon: <FaJava size={56} className="text-orange-700" />,
    },

    {
      pos: "bottom-[10%] left-1/2 -translate-x-1/2",
      icon: <IoLogoAndroid size={56} className="text-green-500" />,
    },

    {
      pos: "top-[55%] left-[25%]",
      icon: <FaJs size={56} className="text-yellow-500" />,
    },
    {
      pos: "top-[55%] right-[25%]",
      icon: <FaNode size={56} className="text-green-600" />,
    },

    {
      pos: "top-[40%] left-[40%]",
      icon: <FaPhp size={56} className="text-indigo-700" />,
    },
    {
      pos: "top-[40%] right-[40%]",
      icon: <FaShopify size={56} className="text-green-600" />,
    },

    {
      pos: "bottom-[70%] left-[30%]",
      icon: <FaReact size={56} className="text-blue-400" />,
    },
    {
      pos: "top-[10%] right-[30%]",
      icon: <SiAngular size={56} className="text-red-600" />,
    },

    {
      pos: "bottom-[18%] left-[30%]",
      icon: <SiMulesoft size={56} className="text-sky-700" />,
    },
    {
      pos: "bottom-[18%] right-[30%]",
      icon: <FaPython size={56} className="text-blue-400" />,
    },
    {
      pos: "bottom-[5%] left-[10%]",
      icon: <FaWordpress size={56} className="text-blue-400" />,
    },

    {
      pos: "bottom-[3%] right-1/4 translate-x-1/2",
      icon: (
        <img
          src="/ibm.webp"
          alt="ibm"
          className="h-10 w-auto rounded-full object-contain"
        />
      ),
    },
  ];

  return (
    <section className="w-full flex justify-center py-20 bg-white">
      <div className="relative w-[1100px] h-[500px] border-4 border-blue-400/15 rounded-3xl flex justify-center items-center">
        {/* 🖼 CENTER IMAGE */}
        {/* <img
          src="/video-banner.jpg"
          alt="Tech"
          className="w-[650px] h-[380px] rounded-3xl object-cover shadow-lg"
        /> */}

        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-semibold px-6 py-1 rounded-full shadow-md">
          PLATFORM TOOLS
        </div>

        {/* 🎯 ABSOLUTE ICONS AROUND BORDER */}
        {tech.map((item, i) => (
          <div
            key={i}
            className={`absolute ${item.pos} hover:scale-125 transition-all cursor-pointer`}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlatformSection;

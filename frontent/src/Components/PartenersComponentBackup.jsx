import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import {
  FaMicrosoft,
  FaFacebook,
  FaGoogle,
  FaAmazon,
  FaApple,
  FaLinkedin,
  FaAws,
} from "react-icons/fa";

import { FaMeta } from "react-icons/fa6";
import { SiCisco } from "react-icons/si";

// ⭐ Trusted Partners List
const partners = [
  {
    name: "Microsoft",
    icon: <FaMicrosoft size={50} className="text-blue-600" />,
  },
  { name: "Meta", icon: <FaMeta size={50} className="text-blue-500" /> },
  { name: "Amazon", icon: <FaAmazon size={50} className="text-orange-500" /> },
  { name: "Google", icon: <FaGoogle size={50} className="text-red-500" /> },
  { name: "Cisco", icon: <SiCisco size={50} className="text-blue-700" /> },
];

const NextArrow = ({ onClick }) => (
  <div
    className="absolute  lg:block -right-3 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-md cursor-pointer hidden md:block"
    onClick={onClick}
  >
    <FaChevronRight className="text-[#2A3855]" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-0 top-1/2 lg:block -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-md cursor-pointer hidden md:block"
    onClick={onClick}
  >
    <FaChevronLeft className="text-[#2A3855]" />
  </div>
);

const PartnersComponent = () => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1800,
    speed: 600,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true,

    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <section className="py-20 bg-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2A3855]">
          Trusted Partners
        </h2>

        <div className=" w-24 h-[3px] bg-[#2A3855] mx-auto  mt-3 mb-12"></div>

        {/* Carousel */}
        <div className="relative">
          <Slider {...settings}>
            {partners.map((item, i) => (
              <div key={i} className="px-3 my-5">
                <div
                  className="
                    bg-white/15 backdrop-blur-2xl border border-gray-200 shadow-md rounded-2xl 
                    flex flex-col items-center justify-center gap-3
                    py-8 hover:shadow-xl hover:-translate-y-2 
                    transition-all duration-300 cursor-pointer
                  "
                >
                  {item.icon}
                  <p className="text-[#2A3855] font-semibold text-sm">
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default PartnersComponent;

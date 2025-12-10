import React from "react";
import Slider from "react-slick";
import {
  FaAws,
  FaSalesforce,
  FaJava,
  FaJs,
  FaNode,
  FaPhp,
  FaShopify,
  FaReact,
  FaPython,
  FaWordpress,
} from "react-icons/fa";
import {
  SiAdobe,
  SiSap,
  SiAngular,
  SiMulesoft,
  SiBlockchaindotcom,
} from "react-icons/si";
import { IoLogoAndroid, IoLogoTableau } from "react-icons/io5";
import { VscAzure } from "react-icons/vsc";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

// const tools = [
//   { name: "AWS", icon: <FaAws size={50} className="text-gray-700" /> },
//   { name: "Adobe", icon: <SiAdobe size={50} className="text-red-500" /> },
//   {
//     name: "Salesforce",
//     icon: <FaSalesforce size={50} className="text-sky-500" />,
//   },
//   { name: "SAP", icon: <SiSap size={50} className="text-blue-600" /> },
//   {
//     name: "Tableau",
//     icon: <IoLogoTableau size={50} className="text-orange-500" />,
//   },
//   { name: "Azure", icon: <VscAzure size={50} className="text-blue-500" /> },
//   { name: "Java", icon: <FaJava size={50} className="text-orange-700" /> },
//   {
//     name: "Android",
//     icon: <IoLogoAndroid size={50} className="text-green-500" />,
//   },
//   { name: "JavaScript", icon: <FaJs size={50} className="text-yellow-500" /> },
//   { name: "Node.js", icon: <FaNode size={50} className="text-green-600" /> },
//   { name: "PHP", icon: <FaPhp size={50} className="text-indigo-700" /> },
//   { name: "Shopify", icon: <FaShopify size={50} className="text-green-600" /> },
//   { name: "React", icon: <FaReact size={50} className="text-blue-400" /> },
//   { name: "Angular", icon: <SiAngular size={50} className="text-red-600" /> },
//   { name: "Mulesoft", icon: <SiMulesoft size={50} className="text-sky-700" /> },
//   { name: "Python", icon: <FaPython size={50} className="text-blue-400" /> },
//   {
//     name: "WordPress",
//     icon: <FaWordpress size={50} className="text-blue-400" />,
//   },
//   {
//     name: "Blockchain",
//     icon: <SiBlockchaindotcom size={50} className="text-teal-600" />,
//   },
// ];

const tools = [
  { name: "AWS", icon: <FaAws size={50} className="text-gray-500" /> },
  { name: "Adobe", icon: <SiAdobe size={50} className="text-gray-500" /> },
  {
    name: "Salesforce",
    icon: <FaSalesforce size={50} className="text-gray-500" />,
  },
  { name: "SAP", icon: <SiSap size={50} className="text-gray-500" /> },
  {
    name: "Tableau",
    icon: <IoLogoTableau size={50} className="text-gray-500" />,
  },
  { name: "Azure", icon: <VscAzure size={50} className="text-gray-500" /> },
  { name: "Java", icon: <FaJava size={50} className="text-gray-500" /> },
  {
    name: "Android",
    icon: <IoLogoAndroid size={50} className="text-gray-500" />,
  },
  { name: "JavaScript", icon: <FaJs size={50} className="text-gray-500" /> },
  { name: "Node.js", icon: <FaNode size={50} className="text-gray-500" /> },
  { name: "PHP", icon: <FaPhp size={50} className="text-gray-500" /> },
  { name: "Shopify", icon: <FaShopify size={50} className="text-gray-500" /> },
  { name: "React", icon: <FaReact size={50} className="text-gray-500" /> },
  { name: "Angular", icon: <SiAngular size={50} className="text-gray-500" /> },
  {
    name: "Mulesoft",
    icon: <SiMulesoft size={50} className="text-gray-500" />,
  },
  { name: "Python", icon: <FaPython size={50} className="text-gray-500" /> },
  {
    name: "WordPress",
    icon: <FaWordpress size={50} className="text-gray-500" />,
  },
  {
    name: "Blockchain",
    icon: <SiBlockchaindotcom size={50} className="text-gray-500" />,
  },
];

const NextArrow = ({ onClick }) => (
  <div
    className="absolute hidden md:hidden lg:block -right-3 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-md cursor-pointer"
    onClick={onClick}
  >
    <FaChevronRight className="text-[#2A3855]" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute hidden md:hidden lg:block left-0 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-md cursor-pointer"
    onClick={onClick}
  >
    <FaChevronLeft className="text-[#2A3855]" />
  </div>
);

const PlatformSection = () => {
  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 600,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true,

    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <section className="py-10 bg-[#F2F2F2]">
      <div className="max-w-7xl  mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#2A3855] mb-5">
          Platform Tools
        </h2>
        <div className="w-16 h-[3px] bg-[#2A3855] mx-auto mt-4"></div>
        <div className="relative hidden md:block">
          <Slider {...settings}>
            {tools.map((item, i) => (
              <div key={i} className="px-3 mb-5">
                <div
                  //   className="
                  //   bg-white border border-gray-200 shadow-md rounded-2xl
                  //   flex flex-col items-center justify-center gap-3
                  //   py-8 hover:shadow-xl hover:-translate-y-2
                  //   transition-all duration-300 cursor-pointer
                  // "
                  className="
                     
                  flex flex-col items-center justify-center gap-3
                  py-8  
                  transition-all duration-300 
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
        <div className="relative md:hidden">
          <Slider {...settings} slidesToShow={3}>
            {tools.map((item, i) => (
              <div key={i} className="px-3 mb-5">
                <div
                  //   className="
                  //   bg-white border border-gray-200 shadow-md rounded-2xl
                  //   flex flex-col items-center justify-center gap-3
                  //   py-8 hover:shadow-xl hover:-translate-y-2
                  //   transition-all duration-300 cursor-pointer
                  // "
                  className="
                     
                  flex flex-col items-center justify-center gap-3
                  py-8  
                  transition-all duration-300 
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

export default PlatformSection;

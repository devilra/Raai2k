import { BiBarChartAlt2 } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LuLightbulb } from "react-icons/lu";
import { FiHeadphones } from "react-icons/fi";

const features = [
  {
    icon: <BiBarChartAlt2 size={40} className="text-[#2A3855]" />,
    title: "Business Consulting",
    desc: "Solution for every business related problems, readily and skillfully.",
  },
  {
    icon: <IoIosNotificationsOutline size={40} className="text-[#2A3855]" />,
    title: "Risk Management",
    desc: "Calculate every possible risk in your business, take control over them.",
  },
  {
    icon: <LuLightbulb size={40} className="text-[#2A3855]" />,
    title: "Market Research",
    desc: "Know the market before taking any step, reduce risks before you go.",
  },
  {
    icon: <FiHeadphones size={40} className="text-[#2A3855]" />,
    title: "Quality Services",
    desc: "Experience unparalleled service, from beginning to final construction.",
  },
];

const WelcomeSection = () => {
  return (
    <div>
      <section className="py-10 md:py-12 lg:py-20 bg-white w-full">
        <div className="max-w-6xl mx-auto text-center px-6">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-[#2A3855]">
            Welcome to the{" "}
            <span className="text-orange-400 font-mono text-4xl">RAai2K</span>
          </h2>
          {/* Sub text */}
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Get expert consultancy and support with Elixir, an advisory firm
            that stand by your side always.
          </p>
          {/* Center line */}
          <div className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-6"></div>

          {/* Features */}

          <div className="mt-12 md:mt-16 lg:mt-24 flex flex-col md:flex-row gap-12 md:gap-6 lg:gap-10 justify-between md:items-center items-center">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex flex-col  items-center text-center max-w-xs"
              >
                {/* Icon circle */}
                <div className="w-20 h-20 flex items-center justify-center rounded-full font-bold bg-[#f7f7f7] border border-gray-200 mb-6">
                  {item.icon}
                </div>
                {/* Title */}
                <h3 className="text-md font-bold text-[#2A3855] mb-3">
                  {item.title}
                </h3>
                {/* Description */}
                <p className="text-gray-600 md:text-[13px] lg:text-lg text-center">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomeSection;

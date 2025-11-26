import { FaRegComments } from "react-icons/fa6";
import { GiSandsOfTime } from "react-icons/gi";
import { MdCreateNewFolder } from "react-icons/md";

const items = [
  {
    icon: <FaRegComments size={26} className="text-[#2A3855]" />,
    title: "We Are Professional",
    desc: "We resource, train, speak, mentor and encourage; marketplace leaders, business owners and career professionals to be effective in the workplace.",
  },
  {
    icon: <MdCreateNewFolder size={26} className="text-[#2A3855]" />,
    title: "We Are Creative",
    desc: "With so many factors to consider when deciding how to characterize your company, wouldn’t it be great to have a group of forward-thinking, well-informed individuals on board who know what they’re doing?",
  },
  {
    icon: <GiSandsOfTime size={26} className="text-[#2A3855]" />,
    title: "24/7 Great Support",
    desc: "Design clever and compelling marketing strategies, improve product positioning, and drive conversion rates, Elixir is all time available to guide you.",
  },
];

export default function WhyChooseElixir() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2A3855]">
          Why Choose{" "}
          <span className="text-orange-400 font-mono text-4xl">RAai2K</span>
        </h2>
        <div className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-col lg:flex-row gap-12 md:gap-16 items-start">
        {/* Left Image */}
        <div className="w-full lg:w-1/2">
          <img
            src="/service/s1.jpg"
            className="rounded-xl shadow-md w-full object-cover"
            alt="Choose RAai 2k"
          />
        </div>

        {/* Right Items */}
        <div className="w-full lg:w-1/2 flex flex-col gap-10">
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div>{item.icon}</div>

              <div>
                <h3 className="text-xl font-bold text-[#2A3855] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-[#2A3855] text-white mt-20 py-10 flex flex-col lg:flex-row px-5 justify-between items-center gap-5">
        <h3 className="text-center text-xl md:text-2xl font-semibold">
          If you have any query related investment... we are available 24/7
        </h3>

        <button className="bg-white text-[#2A3855] font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition">
          Contact Us
        </button>
      </div>
    </section>
  );
}

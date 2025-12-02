import { FaRegComments } from "react-icons/fa6";
import { GiSandsOfTime } from "react-icons/gi";
import { MdCreateNewFolder } from "react-icons/md";
import { Link } from "react-router-dom";

const items = [
  {
    icon: <FaRegComments size={26} className="text-[#2A3855]" />,
    //title: "We Are Professional",
    desc: "Deep Domain Knowledge: Experienced in financial regulations, banking operations, and risk management",
  },
  {
    icon: <MdCreateNewFolder size={26} className="text-[#2A3855]" />,
    // title: "We Are Creative",
    desc: "Agile & Flexible Engagements: Choose from advisory, MVP build, or long-term tech partnership",
  },
  {
    icon: <GiSandsOfTime size={26} className="text-[#2A3855]" />,
    //title: "24/7 Great Support",
    desc: "Proven Track Record: Delivered fintech systems for banks, startups, and regulated financial firms",
  },
];

export default function WhyChooseElixir() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2A3855]">
          Why Choose <span className="text-orange-400  text-4xl">RAai2K</span>
        </h2>
        <div className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-col lg:flex-row gap-12 md:gap-16 items-start">
        {/* Left Image */}
        <div className="w-full lg:w-[400px]">
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
                {/* <h3 className="text-xl font-bold text-[#2A3855] mb-2">
                  {item.title}
                </h3> */}
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}

      <div className="w-full flex justify-center mt-20 px-4">
        <div className="max-w-5xl w-full bg-[#2A3855] text-white rounded-2xl shadow-xl px-8 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <h3 className="text-center text-xl md:text-2xl font-semibold leading-relaxed">
            If you have any query related to investment... <br /> we are
            available 24/7
          </h3>

          <Link
            to="/contact"
            className="bg-white text-[#2A3855] font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

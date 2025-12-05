import { FaComments, FaRegComments } from "react-icons/fa6";
import { GiSandsOfTime, GiTimeTrap } from "react-icons/gi";
import { MdCreateNewFolder } from "react-icons/md";
import { Link } from "react-router-dom";

const items = [
  {
    icon: <FaComments size={28} className="text-[#2A3855]" />,
    //title: "We Are Professional",
    desc: "Deep Domain Knowledge: Experienced in financial regulations, banking operations, and risk management",
  },
  {
    icon: <MdCreateNewFolder size={28} className="text-[#2A3855]" />,
    // title: "We Are Creative",
    desc: "Agile & Flexible Engagements: Choose from advisory, MVP build, or long-term tech partnership",
  },
  {
    icon: <GiTimeTrap size={28} className="text-[#2A3855]" />,
    //title: "24/7 Great Support",
    desc: "Proven Track Record: Delivered fintech systems for banks, startups, and regulated financial firms",
  },
];

export default function WhyChooseElixir() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-[28px] md:text-[37px] font-bold text-[#2A3855]">
          Why Choose raai2k
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
                <p className="text-gray-600 text-[16px]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}

      <div className="w-full flex justify-center mt-20 ">
        <div className=" w-full bg-[#2A3855] text-white  shadow-xl px-8 py-10 flex flex-col md:flex-row items-center lg:items-center lg:justify-center justify-between gap-6">
          <h3 className=" max-w-4xl mx-auto text-xl md:text-2xl font-semibold leading-relaxed">
            Ready to transform the financial platform ? Talk to our fintech
            consulting team ..
          </h3>

          <Link
            to="/contact"
            className="bg-white text-[#2A3855] font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition whitespace-nowrap"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

import { FaArrowRightLong } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import { IoChatbox } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { TfiNewWindow } from "react-icons/tfi";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Wallets & Payments",
    desc: "UPI, cards, payment gateways, merchant APIs.",
    img: "/ourService/w.jpg",
    reverse: false, // image left, text right
  },
  {
    id: 2,
    title: "Lending & BNPL Apps",
    desc: "Credit scoring, workflows, risk checks.",
    img: "/ourService/l.jpg",
    reverse: true, // image right, text left
  },
  {
    id: 3,
    title: "Neobanking MVPs",
    desc: "Accounts, onboarding, transaction engines.",
    img: "/ourService/n.jpg",
    reverse: false, // image right, text left
  },
  {
    id: 4,
    title: "Investment & Wealth Apps",
    desc: "Portfolio, orders, data feeds, analytics.",
    img: "/ourService/i.jpg",
    reverse: true, // image right, text left
  },
  {
    id: 5,
    title: "Custom Fintech Products",
    desc: "Any fintech idea. Any scale",
    img: "/ourService/cu.jpg",
    reverse: false, // image right, text left
  },
  {
    id: 6,
    title: "CTO-as-a-Service",
    desc: "Architecture, tech decisions, roadmap, hiring",
    img: "/ourService/ct.jpg",
    reverse: true, // image right, text left
  },
];

const features = [
  {
    icon: <CiCreditCard1 size={28} className="text-[#2A3855]" />,
    title: "Special financing",
    desc: "Apply for special financial support and earn exclusive rewards.",
  },
  {
    icon: <IoChatbox size={28} className="text-[#2A3855]" />,
    title: "Chat with team",
    desc: (
      <div className="text-gray-600">
        Have a question? Chat online with an expert.
        <span className="text-[#2A3855] flex items-center gap-1 font-bold mt-1 cursor-pointer hover:underline">
          Start chatting <TfiNewWindow size={30} className="px-2" />
        </span>
      </div>
    ),
  },
  {
    icon: <IoCall size={28} className="text-[#2A3855]" />,
    title: "Call a specialist",
    desc: "Our 24/7 support team is ready for you at",
  },
];

const OurServices = () => {
  return (
    <div>
      <section className="w-full py-20 mt-14 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-5">
          {/* Section Title */}
          <h2 className="text-center text-4xl md:text-5xl font-bold text-[#2A3855]">
            Our Services
          </h2>
          <div className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-4 mb-12"></div>

          {/* Service Blocks */}
          <div className="flex flex-col gap-5 md:gap-10 lg:gap-0">
            {services.map((item) => (
              <div
                key={item.id}
                className={`
    flex flex-col 
    ${item.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} 
    bg-white overflow-hidden 
    w-full
  `}
              >
                {/* IMAGE BLOCK */}
                <div className="w-full lg:w-1/2 h-[350px]  md:h-[300px]">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover border  border-gray-100"
                  />
                </div>

                {/* TEXT BLOCK */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#2A3855] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                  <Link
                    to="/service"
                    className="flex items-center gap-2 text-[#2A3855] font-semibold hover:gap-3 transition-all duration-200"
                  >
                    Learn More <FaArrowRightLong />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-16 md:mt-20 
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
  gap-10"
          >
            {features.map((item, index) => (
              <div key={index} className=" p-6 rounded-xl  transition ">
                {/* Icon + Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-[#2A3855]">{item.icon}</div>
                  <h3 className="text-lg font-bold text-[#2A3855]">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-[15px] leading-relaxed">
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

export default OurServices;

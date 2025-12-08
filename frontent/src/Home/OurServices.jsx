import { FaArrowRightLong } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import { IoChatbox } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { TfiNewWindow } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { BsFillCreditCardFill } from "react-icons/bs";
import { motion } from "framer-motion";

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const itemEffect = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 2,
    },
  },
};

const services = [
  {
    id: 1,
    title: "Wallets & Payments",
    desc: "UPI, cards, payment gateways, merchant APIs.",
    img: "/ourService/wal.jpg",
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
    img: "/ourService/cus.jpg",
    reverse: false, // image right, text left
  },
  {
    id: 6,
    title: "CTO-as-a-Service",
    desc: "Architecture, tech decisions, roadmap, hiring",
    img: "/ourService/cto.jpg",
    reverse: true, // image right, text left
  },
];

const features = [
  {
    icon: <BsFillCreditCardFill size={28} className="text-[#2A3855]" />,
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
      <section className="w-full pt-10 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-5">
          {/* Section Title */}
          <h2 className="text-center text-[28px] md:text-[37px] md:text-5xl font-bold text-[#2A3855]">
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
                <motion.div
                  variants={item.reverse ? fadeRight : fadeLeft}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="w-full lg:w-1/2 h-[350px]  md:h-[300px]"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover border  border-gray-100"
                  />
                </motion.div>

                {/* TEXT BLOCK */}
                <motion.div
                  variants={item.reverse ? fadeLeft : fadeRight}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-10"
                >
                  <h3 className="text-[21px] md:text-[18px] font-bold text-[#2A3855] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-[16px] md:text-[] mb-6">
                    {item.desc}
                  </p>
                  <Link
                    to="/service"
                    className="flex text-[16px]  items-center gap-2 text-[#2A3855] font-semibold hover:gap-3 transition-all duration-200"
                  >
                    Learn More <FaArrowRightLong />
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>

          <motion.div
            variants={itemEffect}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-16 md:mt-20 
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
  gap-10"
          >
            {features.map((item, index) => (
              <div key={index} className=" p-6 rounded-xl  transition ">
                {/* Icon + Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-[#2A3855]">{item.icon}</div>
                  <h3 className="text-[21px] md:text-[18px] font-bold text-[#2A3855]">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-[16px] ">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OurServices;

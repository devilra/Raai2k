import { BiBarChartAlt2 } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { TbShieldLock } from "react-icons/tb";
import { PiCubeTransparentLight } from "react-icons/pi";
import { AiOutlineLineChart } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoIosChatbubbles } from "react-icons/io";

const features = [
  {
    icon: <BiBarChartAlt2 size={40} className="text-[#2A3855]" />,
    title: "Core Banking & Digital Banking Systems",
    desc: "Secure and scalable digital banking systems built for modern financial operations.",
  },
  {
    icon: <AiOutlineLineChart size={40} className="text-[#2A3855]" />,
    title: "Data Analytics, AI & Machine Learning",
    desc: "AI/ML analytics that unlock insights and automate decisions.",
  },

  {
    icon: <GiReceiveMoney size={40} className="text-[#2A3855]" />,
    title: "Lending, Credit & Risk Systems",
    desc: "Automated lending with fast, compliant risk checks.",
  },
  {
    icon: <TbShieldLock size={40} className="text-[#2A3855]" />,
    title: "RegTech & Compliance Engineering",
    desc: "Automated KYC, AML, and compliance workflows.",
  },
  {
    icon: <PiCubeTransparentLight size={40} className="text-[#2A3855]" />,
    title: "Blockchain & Distributed Ledger",
    desc: "Secure, transparent, tamper-proof blockchain solutions.",
  },
  {
    icon: <MdPayment size={40} className="text-[#2A3855]" />,
    title: "Payments & Wallets",
    desc: "Secure, real-time payment and wallet systems.",
  },
  {
    icon: <HiOutlineUserGroup size={40} className="text-[#2A3855]" />,
    title: "Awesome Team",
    desc: "Before talking destination, we shine a spotlight across your organizationto fully understand it.",
  },
  {
    icon: <IoIosChatbubbles size={40} className="text-[#2A3855]" />,
    title: "Excellent Support",
    desc: "If you face any trouble, you can always let our dedicated support team help you. They are ready for you 24/7.",
  },
];

const WelcomeSection = () => {
  return (
    <div>
      <section className="py-10 md:py-12 lg:py-20 bg-white w-full">
        <div className="max-w-6xl mx-auto text-center px-6">
          {/* Heading */}
          <h2 className="text-[28px] md:text-[37px] font-bold text-[#2A3855]">
            Welcome to the raai2k
          </h2>
          {/* Sub text */}
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-[16px] ">
            Core banking, payments, lending, compliance, blockchain, and AI/ML
            together power a secure and scalable modern fintech ecosystem.
          </p>
          {/* Center line */}
          <div className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-6"></div>

          {/* Features */}

          {/* Features Grid */}
          <div
            className="mt-12 md:mt-16 lg:mt-24 
  grid 
  grid-cols-1 
  sm:grid-cols-2 
  md:grid-cols-3 
  lg:grid-cols-4 
  gap-12 md:gap-6 lg:gap-12 
  items-start"
          >
            {features.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center h-full"
              >
                {/* Icon circle */}
                <div className="w-20 h-20 flex items-center justify-center rounded-full font-bold bg-[#f7f7f7] border border-gray-200 mb-6">
                  {item.icon}
                </div>
                {/* Title */}
                <h3 className="text-[21px] md:text-[18px] font-bold text-[#2A3855] mb-3 ">
                  {item.title}
                </h3>
                {/* Description */}
                <p className="text-gray-600 text-[16px]  text-center">
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

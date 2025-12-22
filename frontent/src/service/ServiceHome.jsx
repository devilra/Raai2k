import {
  FaRocket,
  FaTools,
  FaCloud,
  FaRobot,
  FaUserTie,
  FaLifeRing,
} from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { ImUserTie } from "react-icons/im";
import { MdGavel } from "react-icons/md";
import { RiToolsFill } from "react-icons/ri";
import { GiBank } from "react-icons/gi";
import { LiaArchwaySolid } from "react-icons/lia";
import { FaArchway } from "react-icons/fa6";
import IndustriesWeServe from "../Solutions/IndustriesWeServe";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

// Animation Variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemEffect = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export default function ServiceHome() {
  const { activeServiceBanners } = useSelector((state) => state.serviceBanner);
  const { activeServices } = useSelector((state) => state.finTech); // FinTech slice-ல் 'services' என இருந்தால் அதை மாற்றிக்கொள்ளவும்

  //console.log(activeServices);

  // முதல் டேட்டாவை மட்டும் எடுக்கிறோம்
  const bannerData =
    activeServiceBanners && activeServiceBanners.length > 0
      ? activeServiceBanners[0]
      : null;

  const getIcon = (index) => {
    const icons = [
      <IoStatsChart size={28} />,
      <FaArchway size={24} />,
      <MdGavel size={24} />,
      <FaRobot size={24} />,
    ];

    return icons[index % icons.length];
  };

  const fintechDisplayTitle =
    activeServices && activeServices.length > 0
      ? activeServices[0].pageTitle
      : "FinTech Services";

  return (
    <div>
      <section
        className="w-full h-[310px] md:h-[380px] bg-cover bg-center relative flex flex-col justify-center px-10 md:px-20"
        style={{
          backgroundImage: `url(${
            bannerData?.image || "/service/service.jpg"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-[#1f2937]/80 to-[#111827]/30"></div>

        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-wide drop-shadow-xl">
            {bannerData?.title || "Our Services"}
          </h1>
          <p className=" text-white  max-w-2xl pt-5 text-[20px] mb-16">
            {bannerData?.description ||
              "We help startups, enterprises and fintech companies build modern, scalable and secure digital products."}
          </p>
        </div>
      </section>

      <div>
        <IndustriesWeServe />
      </div>

      <div className="py-2 px-6 lg:px-20 bg-gray-50">
        {/* MAIN TITLE */}
        {/* <h1 className="text-5xl font-bold text-center text-[#2A3855] mb-4">
        Our Services
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
        We help startups, enterprises and fintech companies build modern,
        scalable and secure digital products.
      </p> */}

        {/* ================= FINTECH SERVICES ================= */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-10 pt-10"
        >
          <motion.h2
            variants={itemEffect}
            className="text-[28px] md:text-[37px] text-center font-bold text-[#2A3855] "
          >
            {fintechDisplayTitle}
          </motion.h2>

          <motion.div
            variants={itemEffect}
            className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-12"
          ></motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeServices.map((s, i) => (
              <motion.div
                variants={itemEffect}
                key={i}
                className="p-8 bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className="text-[#2A3855] mb-4">{getIcon(i)}</div>
                  <h3 className="text-[21px] md:text-[18px] truncate font-bold text-[#2A3855] mb-2">
                    {s.heading}
                  </h3>
                </div>
                <p className="text-gray-600 text-[16px]">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ================= GENERAL SERVICES ================= */}
        {/* <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20"
        >
          <motion.h2
            variants={itemEffect}
            className="text-[28px] md:text-[37px] text-center font-bold text-[#2A3855] "
          >
            General Services
          </motion.h2>
          <motion.div
            variants={itemEffect}
            className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-12"
          ></motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "MVP Development",
                desc: "Launch your MVP in weeks with modern, scalable architecture.",
                icon: <FaRocket size={28} />,
              },
              {
                title: "Custom Software Development",
                desc: "Web, mobile & backend development for any business model.",
                icon: <FaTools size={28} />,
              },
              {
                title: "Cloud & DevOps",
                desc: "CI/CD, cloud deployment, infra automation & monitoring.",
                icon: <FaCloud size={28} />,
              },
              // {
              //   title: "AI & Automation",
              //   desc: "AI chatbots, process automation, document workflows & more.",
              //   icon: <FaRobot size={28} />,
              // },
              // {
              //   title: "CTO-as-a-Service",
              //   desc: "Technical leadership for startups & growing companies.",
              //   icon: <FaUserTie size={28} />,
              // },
              // {
              //   title: "IT Support & Maintenance",
              //   desc: "Product upgrades, security patches and 24/7 monitoring.",
              //   icon: <FaLifeRing size={28} />,
              // },
            ].map((s, i) => (
              <motion.div
                variants={itemEffect}
                key={i}
                className="p-7 bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className="text-[#2A3855] mb-4">{s.icon}</div>
                  <h3 className="text-[21px] md:text-[18px] truncate text-[#2A3855] font-bold mb-2">
                    {s.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-[16px]">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section> */}

        {/* ================= SOLUTIONS ================= */}
        {/* <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={itemEffect}
            className="text-[28px] md:text-[37px] font-bold text-center text-[#2A3855] "
          >
            Solutions
          </motion.h2>
          <motion.div
            variants={itemEffect}
            className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-12"
          ></motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Banking Technology Solutions",
                desc: "Digital onboarding, lending, API banking & more.",
                icon: <GiBank size={28} />,
              },
              {
                title: "Startup Fintech Solutions",
                desc: "All-in-one fintech starter package for new startups.",
                icon: <FaRocket size={28} />,
              },
              {
                title: "Enterprise Fintech Solutions",
                desc: "Secure enterprise architecture for large institutions.",
                icon: <FaChartLine size={28} />,
              },
            ].map((s, i) => (
              <motion.div
                variants={itemEffect}
                key={i}
                className="p-8 bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className="text-[#2A3855]  mb-4">{s.icon}</div>
                  <h3 className="text-[21px] md:text-[18px] truncate text-[#2A3855]  font-bold mb-2">
                    {s.title}
                  </h3>
                </div>
                <p className="text-gray-600">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section> */}
      </div>
    </div>
  );
}

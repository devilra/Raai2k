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

export default function ServiceHome() {
  return (
    <>
      <section
        className="w-full h-[310px] md:h-[380px] bg-cover bg-center relative flex flex-col justify-center px-10 md:px-20"
        style={{ backgroundImage: "url('/service/service.jpg')" }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-[#1f2937]/80 to-[#111827]/30"></div>

        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-wide drop-shadow-xl">
            Our Services
          </h1>
          <p className=" text-white  max-w-2xl pt-5 text-[20px] mb-16">
            We help startups, enterprises and fintech companies build modern,
            scalable and secure digital products.
          </p>
        </div>
      </section>

      <div>
        <IndustriesWeServe />
      </div>

      <div className="py-20 px-6 lg:px-20 bg-gray-50">
        {/* MAIN TITLE */}
        {/* <h1 className="text-5xl font-bold text-center text-[#2A3855] mb-4">
        Our Services
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
        We help startups, enterprises and fintech companies build modern,
        scalable and secure digital products.
      </p> */}

        {/* ================= FINTECH SERVICES ================= */}
        <section className="mb-20">
          <h2 className="text-[28px] md:text-[37px] text-center font-bold text-[#2A3855] ">
            FinTech Services
          </h2>

          <div className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Fintech Product Strategy",
                desc: "MVP scope, product roadmap, user flows, competitive insights.",
                icon: <IoStatsChart size={28} />,
              },
              {
                title: "Technology & Architecture",
                desc: "Core banking, payments, lending stack, microservices, cloud architecture.",
                icon: <FaArchway size={28} />,
              },
              {
                title: "Compliance & Risk Advisory",
                desc: "RBI, KYC/AML, digital lending, PCI-DSS, security frameworks.",
                icon: <MdGavel size={28} />,
              },
              {
                title: "AI & Automation",
                desc: "AI chatbots, process automation, document workflows & more.",
                icon: <FaRobot size={28} />,
              },
              // {
              //   title: "MVP Build & Engineering Delivery",
              //   desc: "UX/UI, frontend, backend, DevOps, QA, production deployment.",
              //   icon: <RiToolsFill size={28} />,
              // },
              // {
              //   title: "Fractional CTO",
              //   desc: "Senior leadership for startups without full-time tech heads.",
              //   icon: <ImUserTie size={28} />,
              // },
              // {
              //   title: "GTM & Growth",
              //   desc: "Pricing, analytics, activation, retention, growth experiments",
              //   icon: <FaChartPie size={28} />,
              // },
            ].map((s, i) => (
              <div
                key={i}
                className="p-8 bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className="text-[#2A3855] mb-4">{s.icon}</div>
                  <h3 className="text-[21px] md:text-[18px] truncate font-bold text-[#2A3855] mb-2">
                    {s.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-[16px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= GENERAL SERVICES ================= */}
        <section className="mb-20">
          <h2 className="text-[28px] md:text-[37px] text-center font-bold text-[#2A3855] ">
            General Services
          </h2>
          <div className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-12"></div>

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
              <div
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
              </div>
            ))}
          </div>
        </section>

        {/* ================= SOLUTIONS ================= */}
        <section>
          <h2 className="text-[28px] md:text-[37px] font-bold text-center text-[#2A3855] ">
            Solutions
          </h2>
          <div className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-12"></div>

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
              <div
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
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

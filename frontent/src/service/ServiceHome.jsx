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
          <p className=" text-white  max-w-2xl pt-5 mb-16">
            We help startups, enterprises and fintech companies build modern,
            scalable and secure digital products.
          </p>
        </div>
      </section>

      <div className="py-20 px-6 lg:px-20 bg-gray-50">
        {/* MAIN TITLE */}
        {/* <h1 className="text-5xl font-bold text-center text-[#2A3855] mb-4">
        Our Services
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
        We help startups, enterprises and fintech companies build modern,
        scalable and secure digital products.
      </p> */}

        {/* ================= GENERAL SERVICES ================= */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#2A3855] mb-8">
            General Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "MVP Development",
                desc: "Launch your MVP in weeks with modern, scalable architecture.",
                icon: <FaRocket size={30} />,
              },
              {
                title: "Custom Software Development",
                desc: "Web, mobile & backend development for any business model.",
                icon: <FaTools size={30} />,
              },
              {
                title: "Cloud & DevOps",
                desc: "CI/CD, cloud deployment, infra automation & monitoring.",
                icon: <FaCloud size={30} />,
              },
              {
                title: "AI & Automation",
                desc: "AI chatbots, process automation, document workflows & more.",
                icon: <FaRobot size={30} />,
              },
              {
                title: "CTO-as-a-Service",
                desc: "Technical leadership for startups & growing companies.",
                icon: <FaUserTie size={30} />,
              },
              {
                title: "IT Support & Maintenance",
                desc: "Product upgrades, security patches and 24/7 monitoring.",
                icon: <FaLifeRing size={30} />,
              },
            ].map((s, i) => (
              <div
                key={i}
                className="p-8 bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <div className="text-blue-600 mb-4">{s.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FINTECH SERVICES ================= */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#2A3855] mb-8">
            FinTech Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Fintech Product Strategy",
                desc: "MVP scope, product roadmap, user flows, competitive insights.",
                icon: <IoStatsChart size={30} />, // Strategy-focused icon
              },
              {
                title: "Technology & Architecture",
                desc: "Core banking, payments, lending stack, microservices, cloud architecture.",
                icon: <LiaArchwaySolid size={30} />, // Tech architecture icon
              },
              {
                title: "Compliance & Risk Advisory",
                desc: "RBI, KYC/AML, digital lending, PCI-DSS, security frameworks.",
                icon: <MdGavel size={30} />, // Perfect for legal & compliance
              },
              {
                title: "MVP Build & Engineering Delivery",
                desc: "UX/UI, frontend, backend, DevOps, QA, production deployment.",
                icon: <RiToolsFill size={30} />, // Engineering tools icon
              },
              {
                title: "Fractional CTO",
                desc: "Senior leadership for startups without full-time tech heads.",
                icon: <ImUserTie size={30} />, // CTO / leadership icon
              },
              {
                title: "GTM & Growth",
                desc: "Pricing, analytics, activation, retention, growth experiments",
                icon: <FaChartPie size={30} />, // Growth / analytics icon
              },
            ].map((s, i) => (
              <div
                key={i}
                className="p-8 bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <div className="text-yellow-600 mb-4">{s.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SOLUTIONS ================= */}
        <section>
          <h2 className="text-3xl font-bold text-[#2A3855] mb-8">Solutions</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Banking Technology Solutions",
                desc: "Digital onboarding, lending, API banking & more.",
                icon: <GiBank size={30} />,
              },
              {
                title: "Startup Fintech Solutions",
                desc: "All-in-one fintech starter package for new startups.",
                icon: <FaRocket size={30} />,
              },
              {
                title: "Enterprise Fintech Solutions",
                desc: "Secure enterprise architecture for large institutions.",
                icon: <FaChartLine size={30} />,
              },
            ].map((s, i) => (
              <div
                key={i}
                className="p-8 bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <div className="text-green-600 mb-4">{s.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

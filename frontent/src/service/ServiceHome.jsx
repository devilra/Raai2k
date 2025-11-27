import {
  FaRocket,
  FaTools,
  FaCloud,
  FaRobot,
  FaUserTie,
  FaLifeRing,
} from "react-icons/fa";
import { FaCreditCard, FaBuilding, FaChartLine } from "react-icons/fa";
import { MdOutlinePayment, MdOutlineSecurity } from "react-icons/md";
import { GiBank } from "react-icons/gi";

export default function ServiceHome() {
  return (
    <div className="py-20 px-6 lg:px-20 bg-gray-50">
      {/* MAIN TITLE */}
      <h1 className="text-5xl font-bold text-center text-[#2A3855] mb-4">
        Our Services
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
        We help startups, enterprises and fintech companies build modern,
        scalable and secure digital products.
      </p>

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
              title: "Fintech Product Development",
              desc: "Highly secure, scalable fintech application development.",
              icon: <FaCreditCard size={30} />,
            },
            {
              title: "Payments Engineering",
              desc: "UPI, wallets, payouts, settlement systems & integrations.",
              icon: <MdOutlinePayment size={30} />,
            },
            {
              title: "Core Banking Integrations",
              desc: "Temenos, Mambu, Finacle, Oracle Flexcube & more.",
              icon: <GiBank size={30} />,
            },
            {
              title: "AI & Automation for Fintech",
              desc: "Fraud detection, KYC automation, risk scoring tools.",
              icon: <FaRobot size={30} />,
            },
            {
              title: "Cloud & DevSecOps for Finance",
              desc: "Secure infra setup for high-risk finance environments.",
              icon: <MdOutlineSecurity size={30} />,
            },
            {
              title: "RegTech & Compliance",
              desc: "AML, KYC, PCI-DSS, SOC2 & RBI compliance automation.",
              icon: <FaBuilding size={30} />,
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
  );
}

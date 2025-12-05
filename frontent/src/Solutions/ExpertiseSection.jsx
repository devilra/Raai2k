import { FaArrowRightLong } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import { IoChatbox } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { TfiNewWindow } from "react-icons/tfi";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    imageUrl: "/solution/s.jpg", // Architecture Image
    color: "text-blue-600",
    bg: "bg-blue-50",
    title: "Software Architecture & Technical Strategy",
    desc: "Design modern, scalable, secure architecture that supports long-term growth. We ensure the system foundation is robust and scalable for future demands.",
    reverse: false, // image left, text right
  },
  {
    id: 2,
    imageUrl: "/solution/cu.jpg", // Development Image
    color: "text-green-600",
    bg: "bg-green-50",
    title: "Custom Software Development",
    desc: "End-to-end development for web, mobile, and enterprise applications. Bringing your unique vision to life with reliable, modern codebases.",
    reverse: true, // image right, text left
  },
  {
    id: 3,
    imageUrl: "/solution/d.png", // Cloud Image
    color: "text-purple-600",
    bg: "bg-purple-50",
    title: "Cloud & DevOps Consulting",
    desc: "Migrate, optimize, and automate your infrastructure. Achieve faster deployments, higher uptime, and reduced operational costs with expert guidance.",
    reverse: false, // image right, text left
  },
  {
    id: 4,
    imageUrl: "/solution/l.png", // Modernization Image
    color: "text-orange-600",
    bg: "bg-orange-50",
    title: "Legacy Modernization",
    desc: "Transform old systems into fast, flexible, API-driven platforms. Renewing outdated systems to meet today's performance and security standards.",
    reverse: true, // image right, text left
  },
  {
    id: 5,
    imageUrl: "/solution/di.webp", // Product Consulting Image
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    title: "Digital Product Consulting",
    desc: "Turn your idea into a validated, launch-ready digital product. Focusing on user needs, market fit, and a clear product roadmap for success.",
    reverse: false, // image right, text left
  },
  {
    id: 6,
    imageUrl: "/solution/ct.png", // Strategy/CTO Image
    color: "text-red-600",
    bg: "bg-red-50",
    title: "IT Strategy & CTO-as-a-Service",
    desc: "Get leadership-level guidance without full-time costs. Strategic planning, technology roadmapping, and team mentoring from experienced leaders.",
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

const ExpertiseSection = () => {
  return (
    <div>
      <section className="w-full py-20 mt-14">
        <div className="max-w-6xl mx-auto px-5">
          {/* Section Title */}
          <h2 className="text-center text-4xl md:text-5xl font-bold text-[#2A3855]">
            Expertise
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
                <div className="w-full lg:w-1/2 h-[350px] md:h-[300px]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* TEXT BLOCK */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-10">
                  <h3 className="text-[21px] md:text-[18px] font-bold text-[#2A3855] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-[16px] border-l-4 pl-4 border-red-500 mb-6">
                    {item.desc}
                  </p>
                  {/* <Link
                    to="/service"
                    className="flex items-center gap-2 text-[#2A3855] font-semibold hover:gap-3 transition-all duration-200"
                  >
                    Learn More <FaArrowRightLong />
                  </Link> */}
                </div>
              </div>
            ))}
          </div>

          {/* <div
            className="mt-16 md:mt-20 
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
  gap-10"
          >
            {features.map((item, index) => (
              <div key={index} className=" p-6 rounded-xl  transition ">
               
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-[#2A3855]">{item.icon}</div>
                  <h3 className="text-lg font-bold text-[#2A3855]">
                    {item.title}
                  </h3>
                </div>

              
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default ExpertiseSection;

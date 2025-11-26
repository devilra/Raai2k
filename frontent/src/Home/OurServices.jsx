import { FaArrowRightLong } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import { IoChatbox } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { TfiNewWindow } from "react-icons/tfi";

const services = [
  {
    id: 1,
    title: "Business Consulting",
    desc: `As one of the world’s largest accountancy networks, elixir helps a diverse 
    range of clients with a diverse range of needs. This is especially true of 
    our Advisory Practice, which provides corporate finance and transaction 
    services, business restructuring.`,
    img: "/ourService/s1.jpg",
    reverse: false, // image left, text right
  },
  {
    id: 2,
    title: "Tax Consulting",
    desc: `Elixir serves clients across the country and around the world as they 
    navigate an increasingly complex tax landscape. Our tax professionals draw 
    on deep experience and industry-specific knowledge to deliver clients the 
    insights and innovation they need.`,
    img: "/ourService/s2.jpg",
    reverse: true, // image right, text left
  },
  {
    id: 3,
    title: "Tax Consulting",
    desc: `Elixir serves clients across the country and around the world as they 
    navigate an increasingly complex tax landscape. Our tax professionals draw 
    on deep experience and industry-specific knowledge to deliver clients the 
    insights and innovation they need.`,
    img: "/ourService/s3.jpg",
    reverse: false, // image right, text left
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
                className={`flex flex-col md:flex-col ${
                  item.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-10 bg-white rounded-xl overflow-hidden`}
              >
                <div className="w-full lg:w-1/2">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center p-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#2A3855] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                  <button className="flex items-center gap-2 text-[#2A3855] font-semibold hover:gap-3 transition-all duration-200">
                    Learn More <FaArrowRightLong />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 md:mt-20 flex flex-col md:flex-row md:flex-wrap justify-between gap-10 md:gap-10">
            {features.map((item, index) => (
              <div key={index} className="">
                <div className="flex flex-col  items-start gap-2">
                  {/* Text */}
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="text-[#2A3855]  ">{item.icon}</div>
                    <h3 className="text-md md:text-lg font-bold text-[#2A3855]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-[14px] md:text-[15px] max-w-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurServices;

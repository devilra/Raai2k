import { FaUsers } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa6";
import { IoFlashOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

const features = [
  {
    icon: <FaUsers size={28} className="text-[#2A3855]" />,
    title: "Awesome Team",
    desc: "Before talking destination, we shine a spotlight across your organization to fully understand it.",
  },
  {
    icon: <FaRegComments size={28} className="text-[#2A3855]" />,
    title: "Excellent Support",
    desc: "If you face any trouble, you can always let our dedicated support team help you. They are ready for you 24/7.",
  },
  {
    icon: <IoFlashOutline size={28} className="text-[#2A3855]" />,
    title: "Faster Performance",
    desc: "We develop a systematic well-ordered process of analysis, from concept through implementation.",
  },
];

const VideoSection = () => {
  return (
    <div>
      <section className="w-full py-10 md:py-12 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          {/* IMAGE + PLAY BUTTON */}
          <div className="relative w-full  rounded-2xl overflow-hidden shadow-sm">
            <img
              src="/video/v1.jpg"
              alt="video"
              className="w-full h-full object-cover"
            />

            {/* Play Button centered */}
            {/* Play Button centered */}
            <button
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
            >
              <FaPlay size={20} />
            </button>
          </div>

          {/* FEATURES */}
          <div className="mt-16 flex flex-col md:flex-row justify-between gap-5 md:gap-2">
            {features.map((item, index) => (
              <div
                key={index}
                className="border p-2 md:p-3 border-neutral-400/30 shadow-md rounded-lg"
              >
                <div className="flex flex-col  items-start gap-4">
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

export default VideoSection;

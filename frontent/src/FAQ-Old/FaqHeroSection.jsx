import Typewriter from "typewriter-effect";

const FaqHeroSection = () => {
  return (
    <div
      className="w-full h-[420px] md:h-[460px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "url('/faq/f.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="w-full h-full bg-[#F2F2F2]/80 flex flex-col items-center justify-center text-center px-6">
        {/* --- MAIN FAQ TITLE (STATIC) --- */}
        <h2 className="text-[#2A3855] text-3xl md:text-5xl font-extrabold mb-10 tracking-wide">
          Frequently Asked Questions
        </h2>

        {/* --- TYPEWRITER QUESTIONS (DYNAMIC) --- */}
        <h1 className="text-[#2A3855] text-xl md:text-3xl font-semibold mb-4">
          <Typewriter
            options={{
              strings: [
                "What services does RAai2K offer?",
                "How does the fintech consulting process work?",
                "What is the timeline for development?",
                "Is my data secure with RAai2K?",
                "Do you offer support & maintenance?",
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 35,
              delay: 40,
            }}
          />
        </h1>

        {/* Subtitle */}
        <p className="text-gray-700 max-w-2xl text-[15px] md:text-lg leading-relaxed mt-2">
          Find answers to the most common questions about our consulting,
          development, cloud, and fintech solutions.
        </p>
      </div>
    </div>
  );
};

export default FaqHeroSection;

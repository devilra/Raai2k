const leaders = [
  {
    name: "Karthi Nat",
    role: "Founder",
    desc: `Fintech is changing faster than we could imagine — and we're here 
    to bridge that gap. Our mission is to help teams build innovative products 
    the right way: faster, safer, and with clarity. Most founders don’t fail 
    because their idea is weak, but because the financial ecosystem is complex.`,
    img: "/global/f.png", // Change path if required
  },
  {
    name: "Senthil",
    role: "Founder",
    desc: `We help teams build future-proof solutions with reduced dependency 
    and minimized risks. Through headless (omni-channel) implementations and 
    deep OOTB/SAAS expertise, we deliver scalable systems at unmatched pricing 
    — without middlemen or commission layers.`,
    img: "/global/m.jpg", // Change path if required
  },
];

export default function GlobalLeadership() {
  return (
    <section className="w-full py-20 bg-white">
      {/* TITLE */}
      <div className="text-center mb-10">
        <h2 className="text-[28px] md:text-[37px] font-bold text-[#2A3855]">
          Leadership
        </h2>

        <div className="flex justify-center items-center gap-2 mt-3">
          <span className="h-[3px] w-20 bg-[#2A3855] rounded-full"></span>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {leaders.map((leader, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden text-center"
          >
            {/* IMAGE */}
            <img
              src={leader.img}
              alt={leader.name}
              className="w-full h-[200px] object-contain "
            />

            {/* CONTENT */}
            <div className="p-6">
              <h3 className="text-[21px] md:text-[18px] font-bold text-[#2A3855] mb-1">
                {leader.name}
              </h3>

              <p className="text-sm text-gray-400 mb-3">{leader.role}</p>

              <p className="text-gray-600 text-[16px]">{leader.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

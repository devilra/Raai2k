const leaders = [
  {
    name: "Reenal Scott",
    role: "Advertising Consultant",
    desc: "Reenal Scott is the Founder and CEO of Elixir, which he started from his dorm room in 2013 with 3 people only.",
    img: "/global/r.jpg",
  },
  {
    name: "Lily Anderson",
    role: "Activation Consultant",
    desc: "Lily leads Elixir UK and oversees the company’s Customer Operations teams supporting millions of users.",
    img: "/global/l.jpg",
  },
  {
    name: "Thomas Anderson",
    role: "Change Management Consultant",
    desc: "As the VP of People, Thomas’s focus lies in the development and optimization of talent retention.",
    img: "/global/t.jpg",
  },
  {
    name: "Legartha Mantana",
    role: "Brand Management Consultant",
    desc: "As General Counsel of Elixir, Tony oversees global legal activities and policies across all aspects.",
    img: "/global/le.jpg",
  },
  {
    name: "John Snow",
    role: "Business Analyst",
    desc: "John has overseen the meteoric growth while protecting scaling its uniquely creative and culture.",
    img: "/global/j.jpg",
  },
  {
    name: "Ragner Lothbrok",
    role: "Business Consultant",
    desc: "Ragner, SVP of Engineering, oversees Elixir’s vast engineering organization which drives the core programming.",
    img: "/global/ra.jpg",
  },
];

export default function GlobalLeadership() {
  return (
    <section className="w-full py-20 bg-white">
      {/* TITLE */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#2A3855]">Global leadership</h2>
        <div className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3"></div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {leaders.map((leader, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow overflow-hidden text-center"
          >
            {/* IMAGE */}
            <img
              src={leader.img}
              alt={leader.name}
              className="w-full h-56 object-cover"
            />

            {/* CONTENT */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#2A3855] mb-1">
                {leader.name}
              </h3>

              <p className="text-sm text-gray-400  mb-3">{leader.role}</p>

              <p className="text-gray-600 leading-relaxed">{leader.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

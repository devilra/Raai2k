import { Link } from "react-router-dom";

const newsData = [
  {
    id: 1,
    title: "Tax impacts of lease mean accounting change",
    author: "Paul O'Sullivan",
    desc: "HMRC released a consultation document to flag some potential tax impacts that a forthcoming change...",
    img: "/latest/l1.jpg",
  },
  {
    id: 2,
    title: "What brexit means for data protection law",
    author: "Enrico Ambrosi",
    desc: "Assuming that the referendum is not ignored completely, there are two possible futures for the UK...",
    img: "/latest/l2.jpg",
  },
  {
    id: 3,
    title: "The growing menace of social engineering fraud",
    author: "Robson",
    desc: "Social engineering involves the collection of information from various sources about a target...",
    img: "/latest/l3.jpg",
  },
];

const LatestNewsHome = () => {
  return (
    <section className="py-20 ">
      {/* Title */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2A3855]">
          Latest News
        </h2>
        <div className="w-16 h-[3px] bg-[#2A3855] mx-auto mt-4"></div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {newsData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-56 object-cover"
            />

            {/* Content */}
            <div className="p-8">
              <Link
                to="/news"
                className="text-xl font-bold text-[#2A3855] leading-snug mb-2"
              >
                {item.title}
              </Link>

              <p className="text-gray-500 text-sm mb-4">By {item.author}</p>

              <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
                {item.desc}
              </p>

              <Link
                to="/news"
                className="text-[#2A3855] font-semibold flex items-center gap-2 hover:gap-4 transition-all"
              >
                Learn More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestNewsHome;

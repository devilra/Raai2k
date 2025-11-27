import { FaHandshake, FaUserTie, FaClock } from "react-icons/fa";

export const EngagementModels = () => {
  const models = [
    {
      icon: <FaHandshake size={32} />,
      title: "Fixed Cost Model",
      desc: "Clear scope, fixed timeline and fixed price. Best for well-defined projects.",
      color: "from-blue-500 to-blue-700", // Gradient for this card
    },
    {
      icon: <FaUserTie size={32} />,
      title: "Dedicated Team Model",
      desc: "Hire a dedicated team or developers who act as your extended tech team.",
      color: "from-purple-500 to-purple-700", // Gradient for this card
    },
    {
      icon: <FaClock size={32} />,
      title: "Time & Material Model",
      desc: "Pay based on hours spent. Best for long-term or evolving projects.",
      color: "from-pink-500 to-pink-700", // Gradient for this card
    },
  ];

  return (
    <section className="py-20 bg-linear-to-br from-indigo-50 via-white to-purple-50">
      <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-6 drop-shadow-sm">
        Choose Your Perfect{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
          Engagement
        </span>{" "}
        Model
      </h2>
      <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
        We offer flexible partnership models designed to fit your project's
        unique requirements and budget.
      </p>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {models.map((m, i) => (
          <div
            key={i}
            className={`relative p-8 rounded-3xl shadow-xl transform hover:-translate-y-2 transition-all duration-300
                       bg-linear-to-br ${m.color} text-white overflow-hidden`}
          >
            {/* Background elements for visual flair */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10">
              {" "}
              {/* Ensure content is above background elements */}
              <div className="mb-6">{m.icon}</div>
              <h3 className="text-3xl font-bold mb-3 leading-tight">
                {m.title}
              </h3>
              <p className="text-gray-100 opacity-90 text-lg">{m.desc}</p>
              <button
                className="mt-6 inline-flex items-center px-6 py-3 border border-white text-white rounded-full font-semibold text-md 
                                 hover:bg-white hover:text-gray-900 transition-colors duration-300 shadow-md"
              >
                Learn More
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

import { useParams } from "react-router-dom";

const newsData = [
  {
    id: 1,
    title: "Tax impacts of lease mean accounting change",
    author: "Paul O'Sullivan",
    desc: "HMRC released a consultation document to flag some potential tax impacts that a forthcoming change...",
    full: "Full article content here... You can write or expand this fully.",
    img: "/latest/l1.jpg",
  },
  {
    id: 2,
    title: "What brexit means for data protection law",
    author: "Enrico Ambrosi",
    desc: "Assuming that the referendum is not ignored completely, there are two possible futures...",
    full: "Full detailed article for brexit data protection law...",
    img: "/latest/l2.jpg",
  },
  {
    id: 3,
    title: "The growing menace of social engineering fraud",
    author: "Robson",
    desc: "Social engineering involves the collection of information...",
    full: "Full detailed article content for social engineering fraud...",
    img: "/latest/l3.jpg",
  },
  {
    id: 4,
    title: "How AI is transforming financial services in 2025",
    author: "Sarah Mitchell",
    desc: "AI-driven automation and predictive analytics are reshaping lending, compliance, and customer experience in the fintech world...",
    img: "/latest/l4.jpg",
  },
];

const NewsDetails = () => {
  const { id } = useParams();
  const news = newsData.find((item) => item.id === parseInt(id));

  if (!news) return <h2 className="text-center mt-20">News not found</h2>;

  return (
    <div className="max-w-5xl mx-auto px-5 py-20">
      <img
        src={news.img}
        alt={news.title}
        className="w-full h-[350px] md:h-[450px] object-cover rounded-xl mb-8"
      />

      <h1 className="text-3xl md:text-4xl font-bold text-[#2A3855] mb-4">
        {news.title}
      </h1>

      <p className="text-gray-500 mb-6 text-lg">By {news.author}</p>

      <p className="text-gray-700 text-[17px] leading-relaxed">{news.desc}</p>
    </div>
  );
};

export default NewsDetails;

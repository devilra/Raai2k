import { motion } from "framer-motion";

export default function CircleMindMap() {
  const items = [
    "Assets & Accelerator’s",
    "Optimal app performance",
    "User Experience (Priority 1st)",
    "Scratch implementation",
    "OOTB Best Practices & Coding Standards",
    "Establish Process & Aid PROJECT Roadmap",
    "Global Support & Training",
    "System (Health) check & Recommendations",
  ];

  // PERFECT RADIAL POSITIONS (Matches reference image)
  const positions = [
    { top: "10%", left: "38%" },
    { top: "20%", left: "50%" }, // top-right
    { top: "22%", left: "72%" }, // mid-right 1
    { top: "40%", left: "75%" }, // mid-right 2
    { top: "62%", left: "65%" }, // bottom-right center
    { top: "72%", left: "45%" }, // bottom
    { top: "60%", left: "25%" }, // bottom-left
    { top: "35%", left: "22%" }, // mid-left
  ];

  return (
    <section className="relative w-full h-[500px] bg-white overflow-hidden rounded-3xl">
      {/* CENTER BIG CIRCLE - EXACT REFERENCE */}
      <div
        className="absolute top-[45%] left-[38%] -translate-x-1/2 -translate-y-1/2 
         w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-[#DDEAFF] rounded-full flex items-center justify-center 
          border-[7px] border-white shadow-xl"
      >
        <h1 className="text-[#0A2B7A] font-bold text-[12px] p-10 md:text-md text-center">
          OUR DIFFERENTIATORS
        </h1>
      </div>

      {/* SMALL CIRCLES */}
      {/* {items.map((item, i) => (
        <div
          key={i}
          className="absolute transition-all"
          style={{
            top: positions[i].top,
            left: positions[i].left,
          }}
        >
          
          <div className="relative w-[150px] h-[150px] bg-[#E9F2FF] rounded-full border-[5px] border-white shadow-md flex items-center justify-center">
            <div className="text-center px-3">
              <h3 className="text-[#0A2B7A] font-semibold text-sm leading-tight">
                {item}
              </h3>
              <p className="text-gray-500 text-xs mt-1 text-center">
                Unique approach ensures quality.
              </p>
            </div>
          </div>

    
          <div
            className="absolute w-[3px] bg-[#4B8BFF]"
            style={{
              height: "90px",
              left: "50%",
              top: "-88px",
              transform: "translateX(-50%)",
            }}
          ></div>
        </div>
      ))} */}

      {/* RIGHT SIDE EXACT TEXT LIST */}
      <div>
        {/* <h2 className="text-[#0A2B7A] text-3xl font-bold mb-5">
          Our Differentiators
        </h2> */}

        {/* <ul className="space-y-4 text-[17px]">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2 items-start">
              <span className="text-[#4B8BFF] text-xl">✔</span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul> */}
      </div>
    </section>
  );
}

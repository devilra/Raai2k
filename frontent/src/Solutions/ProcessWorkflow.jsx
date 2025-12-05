import React from "react";
import {
  MdSearch,
  MdArchitecture,
  MdOutlineDesignServices,
  MdSecurity,
} from "react-icons/md";
import { FaCloudUploadAlt, FaRocket } from "react-icons/fa";

const steps = [
  {
    icon: <MdSearch size={28} className="text-white" />,
    title: "Discovery & Regulatory Assessment",
    desc: "We define goals and compliance needs such as KYC, AML, GDPR to set a solid foundation.",
    color: "border-blue-400 bg-blue-50",
  },
  {
    icon: <MdArchitecture size={28} className="text-white" />,
    title: "Architectural Blueprint & Risk Modeling",
    desc: "We design secure system architecture with data flow diagrams and threat models.",
    color: "border-purple-400 bg-purple-50",
  },
  {
    icon: <MdOutlineDesignServices size={28} className="text-white" />,
    title: "Product Design & MVP Phase",
    desc: "We design wireframes, user flows and build the MVP with essential fintech features.",
    color: "border-green-400 bg-green-50",
  },
  {
    icon: <MdSecurity size={28} className="text-white" />,
    title: "Development, Testing & Compliance",
    desc: "Agile development with continuous testing — security, performance, audit validation.",
    color: "border-orange-400 bg-orange-50",
  },
  {
    icon: <FaCloudUploadAlt size={28} className="text-white" />,
    title: "Deployment & Secure Launch",
    desc: "Deployed on compliant infra with CI/CD, monitoring, logs, and disaster recovery.",
    color: "border-red-400 bg-red-50",
  },
  {
    icon: <FaRocket size={28} className="text-white" />,
    title: "Post-Launch Support & Scaling",
    desc: "Ongoing maintenance, regulatory reporting, fraud monitoring, scaling & optimization.",
    color: "border-teal-400 bg-teal-50",
  },
];

const ProcessWorkflow = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2A3855]">
          Our Process
        </h2>
        <div className="flex justify-center items-center gap-2 mt-3 mb-14">
          <span className="h-[3px] w-20 bg-[#2A3855] rounded-full"></span>
        </div>

        {/* Timeline */}
        <div className="relative border-l-4 border-gray-300 ml-4 md:ml-10">
          {steps.map((item, index) => (
            <div key={index} className="mb-16 ml-6 relative">
              {/* Connector Dot */}
              {/* <div
                className={`absolute -left-10 top-1 h-6 w-6 rounded-full border-4 ${item.color}`}
              ></div> */}
              <div
                className={`absolute -left-10 top-1 h-6 w-6 rounded-full border-4 border-[#2A3855] bg-[#b0bbd2]`}
              ></div>

              {/* Content Box */}
              <div
                // className={`p-6 rounded-xl shadow-md hover:shadow-xl transition bg-white border-l-4 ${item.color}`}
                className={`p-6 rounded-xl shadow-md hover:shadow-xl transition bg-white border-l-4 border-[#2A3855] `}
              >
                {/* Icon + Title */}
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className="p-3 bg-[#2A3855]  rounded-lg shadow"
                    // style={{ color: "white" }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#2A3855]">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-[15.5px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessWorkflow;

import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const CompanyOverview = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* PAGE TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2A3855]">
          Company Overview
        </h2>
        <div className="w-20 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-10"></div>

        {/* MAIN CARD */}
        <div className="bg-white p-10 md:p-14 rounded-2xl shadow-sm">
          {/* TOP TITLE */}
          <h3 className="text-xl font-semibold text-[#2A3855] mb-4">
            Build Fast. Scale Smart. Launch Confidently.
          </h3>

          {/* FIRST PARAGRAPH */}
          <p className="text-gray-600 leading-relaxed mb-8">
            At Raai2k, we help startups turn ideas into scalable, investor-ready
            technology. From MVP development to cloud architecture and AI
            automation, we provide end-to-end IT consulting built for speed,
            quality, and affordability.
          </p>

          {/* QUOTE LINE */}
          <div className="flex items-start gap-4 mb-10">
            <FaQuoteLeft className="text-4xl text-gray-300 mt-1" />
            <p className="text-xl font-semibold text-[#2A3855] leading-relaxed">
              “We don’t just build software — we help founders turn concepts
              into successful, scalable companies.”
            </p>
          </div>

          {/* TWO COLUMN PARAGRAPHS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-600 leading-relaxed text-[15.5px]">
            <p>
              <span className="text-3xl font-bold text-[#2A3855]">W</span>e’re a
              startup-centric IT consulting team helping founders move from
              concept to product with clarity and speed. Whether you're building
              an MVP, optimizing your tech stack, or preparing for scale, Raai2k
              brings deep technical expertise, hands-on execution, and a
              founder-friendly approach designed to remove confusion and
              accelerate progress.
              <br />
              <br />
              Our mission is simple: to help early-stage companies build
              smarter, faster, and without unnecessary cost — while ensuring
              every decision supports long-term growth and technical excellence.
            </p>

            <p>
              Raai2k’s engineering and strategy teams specialize in delivering
              scalable software architecture, clean UI/UX, and cloud-first
              infrastructure that grows with your business.
              <br />
              <br />
              We work closely with founders to validate ideas, reduce
              time-to-market, implement modern development standards, and ensure
              your product is ready for customers, investors, and real-world
              scale. Our structured process helps you avoid technical debt,
              expensive rewrites, and unclear product direction.
              <br />
              <br />
              From startups to emerging enterprises, Raai2k is dedicated to
              building technology that performs, scales, and drives real
              business outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;

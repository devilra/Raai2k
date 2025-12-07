import { useState, useEffect, useRef } from "react";

const FaqContentLayout = () => {
  // -------------------------------------
  // ✅ FULL FAQ DATA with IMAGE FIELD
  // -------------------------------------
  const data = [
    // About Our Services
    {
      id: "services-1",
      category: "About Our Services",
      question: "What exactly do you do for fintech startups?",
      answer:
        "We help founders and teams build, launch, and scale fintech products—covering product strategy, UX, technology, compliance, integrations, and GTM execution.",
      image: "/faq/f1.jpg",
    },
    {
      id: "services-2",
      category: "About Our Services",
      question: "Do you only work with fintech companies?",
      answer:
        "Yes. We specialize 100% in fintech: neobanking, lending, payments, UPI apps, wealth/robo-advisory, P2P, BNPL, insuretech, and more.",
      image: "/faq/f2.jpg",
    },
    {
      id: "services-3",
      category: "About Our Services",
      question: "Can you work with very early-stage founders?",
      answer:
        "Absolutely. Many clients come with just an idea or pitch deck. We help validate feasibility, scope the MVP, and plan the product roadmap.",
      image: "/faq/f3.jpg",
    },
    {
      id: "services-4",
      category: "About Our Services",
      question: "Do you take on long-term product/tech ownership?",
      answer:
        "Yes — we offer fractional CTO, product leadership, and ongoing advisory retained engagements.",
      image: "/faq/f4.jpg",
    },

    // Product & Technology
    {
      id: "tech-5",
      category: "Product & Technology",
      question: "Can you build our MVP end-to-end?",
      answer:
        "Yes. We handle product design, UX, system architecture, engineering, QA, and deployment.",
      image: "/faq/f5.jpg",
    },
    {
      id: "tech-6",
      category: "Product & Technology",
      question: "What tech stacks do you support?",
      answer:
        "React/Next, Flutter, Node, Java/Spring, Go, Python, microservices, serverless, and AWS/GCP/Azure.",
      image: "/faq/f6.jpg",
    },
    {
      id: "tech-7",
      category: "Product & Technology",
      question: "Do you integrate with fintech APIs?",
      answer:
        "Yes — including BaaS providers, UPI/QR/AEPS rails, KYC/AML APIs, payment gateways, wealth platforms, credit bureaus, and lending engines.",
      image: "/faq/f7.jpg",
    },
    {
      id: "tech-8",
      category: "Product & Technology",
      question: "Can you audit our existing code or product?",
      answer:
        "Yes — we offer product audits, code reviews, architecture assessments, and security/compliance gap analysis.",
      image: "/faq/f8.jpg",
    },

    // Pricing & Engagement
    {
      id: "pricing-13",
      category: "Pricing & Engagement",
      question: "How do you structure your pricing?",
      answer:
        "Flexible — fixed-cost MVPs, sprint-based pricing, monthly retainers, or long-term fractional roles.",
      image: "/faq/f13.jpg",
    },
    {
      id: "pricing-14",
      category: "Pricing & Engagement",
      question: "Is there a minimum engagement?",
      answer:
        "Typically 4–6 weeks, but we also offer short strategy workshops for early teams.",
      image: "/faq/f14.jpg",
    },
    {
      id: "pricing-15",
      category: "Pricing & Engagement",
      question: "Do you offer free consultations?",
      answer:
        "Yes — a 30-minute discovery call to understand your product, challenges, and roadmap.",
      image: "/faq/f15.jpg",
    },

    // Timelines
    {
      id: "timeline-16",
      category: "Timelines & Delivery",
      question: "How long does an MVP take?",
      answer:
        "Most fintech MVPs take 6–12 weeks depending on complexity and integrations.",
      image: "/faq/f16.jpg",
    },
    {
      id: "timeline-17",
      category: "Timelines & Delivery",
      question: "Can you accelerate delivery for investor deadlines?",
      answer:
        "Yes — we often support time-sensitive fundraising, PoCs, and pitch-based MVPs.",
      image: "/faq/f17.jpg",
    },

    // Working With Your Team
    {
      id: "team-18",
      category: "Working With Your Team",
      question: "Can you collaborate with our developers or designers?",
      answer:
        "Yes — we frequently co-build with in-house teams to boost velocity and strengthen architecture.",
      image: "/faq/f18.jpg",
    },
    {
      id: "team-19",
      category: "Working With Your Team",
      question: "Do you offer ongoing support after launch?",
      answer:
        "Yes — maintenance, performance monitoring, feature updates, and compliance enhancements.",
      image: "/faq/f19.png",
    },

    // Trust & Credentials
    {
      id: "trust-20",
      category: "Trust & Credentials",
      question: "Have you worked with regulated institutions?",
      answer:
        "Yes — banks, NBFCs, P2P lenders, payment providers, wealth advisors, and fintech BaaS partners.",
      image: "/faq/f20.jpg",
    },
  ];

  // -------------------------------------
  // ACTIVE SECTION + INTERSECTION OBSERVER
  // -------------------------------------
  // The state will hold the ID of the currently active question
  const [active, setActive] = useState(data[0].id);
  // Ref to hold all the DOM nodes of the FAQ sections
  const sectionRefs = useRef({});
  // Ref to track the elements currently in the viewport (intersecting)
  const intersectingIds = useRef(new Set());

  useEffect(() => {
    // 1. Logic to set the 'active' ID based on intersection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add ID to the set of intersecting elements
            intersectingIds.current.add(entry.target.id);
          } else {
            // Remove ID from the set if it's no longer intersecting
            intersectingIds.current.delete(entry.target.id);
          }

          // **Crucial Step:** When an element enters the main intersection zone
          // we set it as active. This logic ensures we pick the element whose
          // top edge is closest to the top of the viewport.
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            // Also keep the transition animation for the content
            entry.target.classList.remove("opacity-0", "translate-y-6");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
          // Note: When an element leaves the intersection, we DON'T set the active state
          // to prevent jumpy behavior. The next intersecting element will handle it.
        });

        // 2. Fallback/Cleanup Logic: If multiple elements are intersecting (e.g., in the middle of a large section),
        // we check which one is the highest up on the screen and set that as active.
        if (intersectingIds.current.size > 1) {
          const sortedEntries = Array.from(intersectingIds.current)
            .map((id) => sectionRefs.current[id])
            .filter((el) => el) // filter out nulls/undefined
            .sort(
              (a, b) =>
                a.getBoundingClientRect().top - b.getBoundingClientRect().top
            );

          if (sortedEntries.length > 0) {
            // Set the top-most visible element as active
            setActive(sortedEntries[0].id);
          }
        } else if (intersectingIds.current.size === 1) {
          // If only one is intersecting, set that as active (it's already done above, but for completeness)
          setActive(Array.from(intersectingIds.current)[0]);
        }
      },
      // ✅ Use rootMargin to define the intersection zone for highlighting
      // This sets the intersection zone to the top 20% of the viewport (the root)
      { rootMargin: "-20% 0px -80% 0px", threshold: 0 }
    );

    // Observe all the FAQ sections
    Object.values(sectionRefs.current).forEach((el) => {
      if (el && el.nodeType === 1) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []); // Run only once on mount

  // Scroll function to smoothly move to the section when the left menu is clicked
  const handleClick = (id) => {
    // Set active immediately for fast feedback on click
    setActive(id);
    const sec = document.getElementById(id);
    if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // -------------------------------------
  // UI
  // -------------------------------------
  return (
    <div className="mb-72">
      <div className="max-w-7xl  mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* LEFT SIDE MENU */}
        <div className="hidden md:block sticky top-24 h-[80vh]   pr-6">
          {data.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.id)}
              // Check if the current item's ID matches the active state ID
              className={`block py-3 cursor-pointer text-[15px] transition-all ${
                active === item.id
                  ? "text-blue-600 font-semibold border-l-4 border-blue-600 pl-3 bg-blue-50"
                  : "text-gray-700 hover:text-blue-500 pl-3"
              }`}
            >
              {item.question}
            </div>
          ))}
        </div>

        {/* RIGHT SIDE ANSWERS */}
        <div className="col-span-2">
          {data.map((item) => (
            <div
              key={item.id}
              id={item.id}
              // Assign the element to the ref object using its ID
              ref={(el) => (sectionRefs.current[item.id] = el)}
              className="opacity-0 translate-y-6 transition-all duration-700 mb-20 scroll-mt-32"
            >
              <h2 className="text-3xl font-bold text-[#2A3855] mb-4">
                {item.question}
              </h2>

              <p className="text-gray-700 text-[17px] leading-relaxed mb-8">
                {item.answer}
              </p>

              <img
                src={item.image}
                className="w-full rounded-xl shadow-md object-cover"
                alt="faq"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqContentLayout;

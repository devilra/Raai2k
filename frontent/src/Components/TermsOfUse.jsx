import React from "react";

const TermsOfUse = () => {
  const lastUpdated = new Date().toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 text-[#2A3855] leading-relaxed">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Use</h1>

      <p className="text-gray-600 mb-6">
        Welcome to RAai2K. These Terms of Use (“Terms”) govern your access to
        and use of our website and services. By accessing or using our platform,
        you agree to comply with these Terms. If you do not agree, please
        discontinue using the website immediately.
      </p>

      {/* 1 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        1. Acceptance of Terms
      </h2>
      <p className="text-gray-600">
        RAai2K may update these Terms at any time. The updated version will be
        posted on this page. Continued use of the website after changes means
        you accept the updated Terms.
      </p>

      {/* 2 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        2. Description of Services
      </h2>
      <p className="text-gray-600">
        RAai2K provides fintech consulting, custom software development, cloud &
        DevOps solutions, digital product strategy, and modernization services.
        Any new features or updates added to our platform are also governed by
        these Terms.
      </p>

      {/* 3 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        3. Personal and Non-Commercial Use
      </h2>
      <p className="text-gray-600">
        All content on this website is for personal and informational purposes
        only. You may not copy, distribute, reproduce, modify, or commercially
        use our content without written permission.
      </p>

      {/* 4 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        4. Privacy & Data Protection
      </h2>
      <p className="text-gray-600">
        To understand how we collect, use, and safeguard your personal data,
        please read our Privacy Policy.
      </p>

      {/* 5 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        5. Intellectual Property
      </h2>
      <p className="text-gray-600">
        All logos, content, graphics, code, and brand assets belong to RAai2K.
        Unauthorized reproduction or distribution is strictly prohibited.
      </p>

      {/* 6 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        6. User Responsibilities
      </h2>
      <ul className="ml-6 list-disc text-gray-600 space-y-2">
        <li>Do not engage in hacking, scraping, or reverse engineering.</li>
        <li>Do not upload malware, harmful files, or illegal content.</li>
        <li>Do not impersonate others or provide false information.</li>
        <li>Do not misuse our services for unlawful purposes.</li>
      </ul>

      {/* 7 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">7. Third-Party Links</h2>
      <p className="text-gray-600">
        Our website may link to third-party services. RAai2K is not responsible
        for the content or policies of these external sites.
      </p>

      {/* 8 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        8. Limitation of Liability
      </h2>
      <p className="text-gray-600">
        RAai2K is not liable for service interruptions, data loss, errors,
        third-party failures, or any indirect damages. The service is provided
        “as is” without warranties.
      </p>

      {/* 9 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        9. Changes to the Terms
      </h2>
      <p className="text-gray-600">
        We may update these Terms from time to time. Please review this page
        periodically for changes.
      </p>

      {/* 10 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">10. Governing Law</h2>
      <p className="text-gray-600">
        These Terms are governed by the laws of India (Tamil Nadu jurisdiction).
      </p>

      {/* 11 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        11. Contact Information
      </h2>
      <p className="text-gray-600 mb-2">
        For questions about this Terms of Use page, you may contact us:
      </p>

      <a
        href="mailto:support@raai2k.com"
        className="text-[#2A3855] font-semibold underline hover:text-blue-600 transition"
      >
        support@raai2k.com
      </a>

      <p className="text-gray-500 mt-10">Last Updated: {lastUpdated}</p>
    </div>
  );
};

export default TermsOfUse;

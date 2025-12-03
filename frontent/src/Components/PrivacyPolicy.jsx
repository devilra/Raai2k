const PrivacyPolicy = () => {
  return (
    <>
      <section
        className="w-full h-[310px] md:h-[380px] bg-cover bg-center relative flex flex-col justify-center px-10 md:px-20"
        style={{ backgroundImage: "url('/privacy/privacy.jpg')" }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-[#1f2937]/80 to-[#111827]/30"></div>

        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-wide drop-shadow-xl">
            Privacy Policy
          </h1>
          {/* <p className="mt-3 text-lg text-gray-200 font-medium">
            We’d love to hear from you — Let’s build something powerful!
          </p> */}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-20 text-[#2A3855] leading-relaxed">
        {/* <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1> */}

        <p className="text-gray-600 mb-6">
          At RAai2K, we are committed to protecting your privacy and ensuring
          the security of your personal information. This Privacy Policy
          explains how we collect, use, store, and safeguard your data when you
          interact with our website, products, and services.
        </p>

        {/* Section 1 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">
          1. Information We Collect
        </h2>
        <p className="text-gray-600 mb-3">
          We may collect the following types of information:
        </p>

        <ul className="list-disc ml-6 text-gray-600 space-y-2">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, company name.
          </li>
          <li>
            <strong>Technical Information:</strong> IP address, browser type,
            device details, location data.
          </li>
          <li>
            <strong>Usage Data:</strong> Pages visited, actions taken on the
            website, time spent on sections.
          </li>
          <li>
            <strong>Cookies:</strong> To enhance your browsing experience and
            optimize website performance.
          </li>
        </ul>

        {/* Section 2 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">
          2. How We Use Your Information
        </h2>

        <ul className="list-disc ml-6 text-gray-600 space-y-2">
          <li>To provide, maintain, and improve our services.</li>
          <li>To respond to your inquiries or support requests.</li>
          <li>To send updates, newsletters, or promotional communication.</li>
          <li>To analyze website usage and enhance user experience.</li>
          <li>To ensure security, prevent fraud, and protect our platform.</li>
        </ul>

        {/* Section 3 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">
          3. Sharing of Information
        </h2>
        <p className="text-gray-600 mb-3">
          We do not sell or rent your personal information. We may share
          information only under the following conditions:
        </p>

        <ul className="list-disc ml-6 text-gray-600 space-y-2">
          <li>With trusted service providers who support our operations.</li>
          <li>
            To comply with legal requirements, court orders, or government
            requests.
          </li>
          <li>
            To protect the rights, property, or safety of RAai2K and its users.
          </li>
        </ul>

        {/* Section 4 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">
          4. Cookies & Tracking Technologies
        </h2>
        <p className="text-gray-600">
          We use cookies to store user preferences, improve navigation, analyze
          trends, and personalize content. You can disable cookies in your
          browser settings, but some website features may not function properly.
        </p>

        {/* Section 5 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">5. Data Security</h2>
        <p className="text-gray-600">
          We implement industry-standard security measures to protect your data
          from unauthorized access, alteration, or misuse. However, no method of
          transmission over the internet is 100% secure.
        </p>

        {/* Section 6 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">
          6. Third-Party Links
        </h2>
        <p className="text-gray-600">
          Our website may contain links to third-party services. We are not
          responsible for their content or privacy practices. We encourage you
          to review their privacy policies.
        </p>

        {/* Section 7 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">7. Your Rights</h2>
        <p className="text-gray-600 mb-3">
          Depending on your region, you may have the following rights:
        </p>

        <ul className="list-disc ml-6 text-gray-600 space-y-2">
          <li>Access to your data</li>
          <li>Correction or deletion of personal data</li>
          <li>Opt-out from marketing communication</li>
          <li>Request a copy of your information</li>
        </ul>

        {/* Section 8 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">
          8. Updates to This Policy
        </h2>
        <p className="text-gray-600">
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with an updated “Last Updated” date.
        </p>

        {/* Section 9 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">9. Contact Us</h2>
        <p className="text-gray-600">
          If you have questions about this Privacy Policy or wish to exercise
          your rights, please contact us at:
        </p>

        <a
          href="mailto:support@raai2k.com"
          className="text-gray-700 font-semibold mt-2 underline hover:text-blue-600 transition"
        >
          support@raai2k.com
        </a>

        <p className="text-gray-500 mt-10">
          Last Updated:{" "}
          {new Date().toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;

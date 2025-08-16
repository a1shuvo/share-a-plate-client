const Privacy = () => {
  return (
    <div className="bg-base-100 min-h-screen py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary text-center mb-6">
          Privacy Policy
        </h1>
        <p className="text-center text-lg md:text-xl text-gray-600 mb-12">
          Your privacy is important to us. This policy explains how ShareAPlate
          collects, uses, and protects your personal information.
        </p>

        {/* Section: Information Collection */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-3">
            Information We Collect
          </h2>
          <p className="text-gray-700 mb-2">
            When you use ShareAPlate, we may collect:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              Personal information you provide when registering or contacting us
              (name, email, phone number).
            </li>
            <li>Donation and request details when using our platform.</li>
            <li>
              Usage data like IP address, browser type, and activity on the
              site.
            </li>
          </ul>
        </section>

        {/* Section: Use of Information */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-3">
            How We Use Your Information
          </h2>
          <p className="text-gray-700 space-y-2">We use your information to:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Provide and improve our services.</li>
            <li>Respond to inquiries and support requests.</li>
            <li>Send updates, newsletters, and relevant notifications.</li>
            <li>Ensure security and prevent fraud or abuse.</li>
          </ul>
        </section>

        {/* Section: Information Sharing */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-3">
            Information Sharing
          </h2>
          <p className="text-gray-700">
            We respect your privacy. We do not sell or trade your personal
            information. We may share information only:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
            <li>
              With trusted service providers to help us operate the platform.
            </li>
            <li>To comply with legal obligations or protect rights.</li>
            <li>During mergers, acquisitions, or business transfers.</li>
          </ul>
        </section>

        {/* Section: Security */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-3">
            Security
          </h2>
          <p className="text-gray-700">
            We implement appropriate technical and organizational measures to
            protect your personal information from unauthorized access,
            disclosure, alteration, or destruction.
          </p>
        </section>

        {/* Section: Cookies */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-3">
            Cookies
          </h2>
          <p className="text-gray-700">
            Our website uses cookies and similar technologies to enhance user
            experience, analyze trends, and improve functionality. You can
            manage your cookie preferences in your browser settings.
          </p>
        </section>

        {/* Section: Your Rights */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-3">
            Your Rights
          </h2>
          <p className="text-gray-700">
            You have the right to access, correct, or delete your personal
            information stored on ShareAPlate. You can also opt-out of marketing
            communications at any time.
          </p>
        </section>

        {/* Section: Updates */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-3">
            Updates to This Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated effective date.
          </p>
        </section>

        {/* Section: Contact */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-3">
            Contact Us
          </h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy or your personal
            data, please contact us at:
            <br />
            <span className="text-primary font-semibold">
              support@shareaplate.com
            </span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;

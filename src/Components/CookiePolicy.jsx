import React from "react";

const CookiePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            1. What Are Cookies?
          </h2>
          <p className="prose text-gray-600">
            Cookies are small text files stored on your device to enhance your
            experience on our website. They help us remember your preferences
            and improve our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            2. How We Use Cookies
          </h2>
          <div className="prose text-gray-600">
            <p className="mb-4">We use cookies for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>To remember your preferences and settings</li>
              <li>To analyze website usage and improve functionality</li>
              <li>To personalize content and ads</li>
              <li>To ensure secure access to our services</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            3. Managing Cookies
          </h2>
          <p className="prose text-gray-600">
            You can control and manage cookies through your browser settings.
            Disabling cookies may affect the functionality of some features on
            our website.
          </p>
        </section>

        <div className="text-sm text-gray-500 pt-8 border-t">
          Last updated: January 7, 2025
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;

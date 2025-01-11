import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            1. Information We Collect
          </h2>
          <div className="prose text-gray-600">
            <p className="mb-4">
              When you use our services, we may collect the following types of
              information:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Personal information (name, email address, phone number)</li>
              <li>Delivery address and billing information</li>
              <li>Order history and preferences</li>
              <li>Device information and IP address</li>
              <li>Location data when using our delivery services</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            2. How We Use Your Information
          </h2>
          <div className="prose text-gray-600">
            <p className="mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Processing and delivering your orders</li>
              <li>Communicating about your orders and promotions</li>
              <li>Improving our services and user experience</li>
              <li>Protecting against fraudulent activities</li>
              <li>Complying with legal obligations</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            3. Information Sharing
          </h2>
          <div className="prose text-gray-600">
            <p className="mb-4">We may share your information with:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Delivery partners to fulfill your orders</li>
              <li>Payment processors for transactions</li>
              <li>Service providers who assist our operations</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            4. Your Rights
          </h2>
          <div className="prose text-gray-600">
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Lodge a complaint with supervisory authorities</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            5. Contact Us
          </h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact
            us at:
            <br />
            Email: privacy@restaurant.com
            <br />
            Phone: (555) 123-4567
          </p>
        </section>

        <div className="text-sm text-gray-500 pt-8 border-t">
          Last updated: January 7, 2025
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

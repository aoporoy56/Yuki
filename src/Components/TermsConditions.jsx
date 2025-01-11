import React from "react";

const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Terms & Conditions
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            1. Acceptance of Terms
          </h2>
          <div className="prose text-gray-600">
            <p className="mb-4">
              By accessing and placing an order with Restaurant, you confirm
              that you are in agreement with and bound by the terms and
              conditions contained in the Terms Of Use outlined below.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            2. Ordering & Payment
          </h2>
          <div className="prose text-gray-600">
            <p className="mb-4">When placing an order, you agree to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide accurate and complete payment information</li>
              <li>
                Pay the full amount for your order including delivery fees
              </li>
              <li>Verify your delivery address is correct</li>
              <li>
                Be present at the delivery location during delivery window
              </li>
              <li>Have valid ID for orders containing age-restricted items</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            3. Delivery Policy
          </h2>
          <div className="prose text-gray-600">
            <p className="mb-4">Our delivery service is subject to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Available delivery zones and times</li>
              <li>Minimum order requirements</li>
              <li>Weather and traffic conditions</li>
              <li>Restaurant capacity and staff availability</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            4. Refund & Cancellation
          </h2>
          <div className="prose text-gray-600">
            <p className="mb-4">Our refund policy includes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Full refunds for incorrect or missing items</li>
              <li>Order cancellation before preparation begins</li>
              <li>Store credit for quality issues reported within 24 hours</li>
              <li>No refunds for correctly prepared orders</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            5. User Conduct
          </h2>
          <div className="prose text-gray-600">
            <p className="mb-4">Users must not:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Abuse or harass delivery personnel</li>
              <li>Provide false information</li>
              <li>Attempt to defraud the service</li>
              <li>Share accounts or discount codes</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            6. Contact Information
          </h2>
          <p className="text-gray-600">
            For questions about these Terms & Conditions, please contact us at:
            <br />
            Email: legal@restaurant.com
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

export default TermsConditions;

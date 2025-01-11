import React from "react";

const CopyrightPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Copyright Policy
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            1. Ownership of Content
          </h2>
          <p className="prose text-gray-600">
            All content on this website, including text, images, and graphics,
            is owned by Yuki or its licensors and is protected by copyright
            laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            2. Use of Content
          </h2>
          <p className="prose text-gray-600">
            You may not reproduce, distribute, or display our content without
            prior written consent, except as permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            3. Reporting Copyright Infringement
          </h2>
          <p className="prose text-gray-600">
            If you believe your copyrighted work has been used without
            authorization, please contact us with the following information:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Your contact information</li>
            <li>Details of the copyrighted work</li>
            <li>Location of the alleged infringement</li>
          </ul>
        </section>

        <div className="text-sm text-gray-500 pt-8 border-t">
          Last updated: January 7, 2025
        </div>
      </div>
    </div>
  );
};

export default CopyrightPolicy;

/* eslint-disable react/prop-types */
import React from "react";
import Hero from "./Hero";
import Footer from "./Footer";
import heroImg from "/img/hero.jpg";
import img from "/img/img1.jpg";
import team1img from "/img/team1.jpg";

const Button = ({ children, className = "" }) => (
  <button
    className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 ${className}`}
  >
    {children}
  </button>
);

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      {/* Hero component placeholder */}
      <Hero img={heroImg} text={"About Us"} />

      {/* Main content section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative h-[400px] lg:h-[600px]">
            <img
              src={img}
              alt="About Us"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
            <p className="text-lg text-gray-600">
              We're passionate about creating exceptional experiences that
              transform how people interact with technology. Our journey began
              with a simple idea: to make digital solutions more accessible and
              intuitive for everyone.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="ml-3 text-gray-600">
                  Over 10 years of industry experience delivering innovative
                  solutions
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="ml-3 text-gray-600">
                  Dedicated team of experts committed to your success
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="ml-3 text-gray-600">
                  Customer satisfaction rate of 98% across all projects
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="ml-3 text-gray-600">
                  Global reach with local expertise in multiple markets
                </span>
              </li>
            </ul>

            <Button className="mt-8">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Centered section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-8">
            We strive to empower businesses with cutting-edge technology
            solutions that drive growth and innovation. Our commitment to
            excellence and customer satisfaction sets us apart in the industry.
          </p>
          <Button>Join Our Team</Button>
        </div>
      </section>

      {/* Values section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-white shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-gray-600">
              Constantly pushing boundaries to create better solutions
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-white shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
            <p className="text-gray-600">
              Working together to achieve exceptional results
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-white shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Excellence</h3>
            <p className="text-gray-600">
              Delivering the highest quality in everything we do
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

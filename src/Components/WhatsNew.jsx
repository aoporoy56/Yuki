import React from "react";
import { ArrowRight } from "lucide-react";
import img from "/img/img1.jpg";
import Footer from "./Footer";
import Hero from "./Hero";
import heroImg from "/img/hero.jpg";

const WhatsNew = () => {
  return (
    <>
      <Hero img={heroImg} text={"What's New at Our Restaurant"} />
      <div className="text-center max-w-3xl mx-auto px-4 pt-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Latest Culinary Delights & Features
        </h2>
        <p className="text-xl text-gray-600">
          Discover our newest dishes and improvements designed to enhance your
          dining experience
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
        {/* First row - Enhanced with badge and list */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <img
                src={img}
                alt="Dish 1"
                className="rounded-2xl object-cover w-full h-[500px] shadow-xl"
              />
              <span className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                New Dish
              </span>
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="text-red-600 font-semibold">Chef's Special</span>
            <h3 className="text-4xl font-bold tracking-tight">
              Gourmet Delight One
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              Savor our latest culinary creation that brings a fusion of flavors
              to your palate. Crafted with the finest ingredients, this dish
              offers a delightful dining experience.
            </p>
            <ul className="space-y-3">
              {[
                "Exquisite taste",
                "Artistic presentation",
                "Locally sourced ingredients",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all hover:scale-105">
              Learn more <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Second row - Added gradient background */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent rounded-3xl -z-10" />
          <div className="w-full lg:w-1/2">
            <img
              src={img}
              alt="Dish 2"
              className="rounded-2xl object-cover w-full h-[500px] shadow-xl"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="text-red-600 font-semibold">Chef's Special</span>
            <h3 className="text-4xl font-bold tracking-tight">
              Gourmet Delight Two
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              Transform your dining experience with our revolutionary dish. This
              exquisite creation sets new standards for taste and presentation,
              making your meal unforgettable.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all hover:scale-105">
              Discover more <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Third row - Enhanced cards */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Enhanced Card 1 */}
          <div className="group hover:shadow-xl transition-all duration-300 rounded-2xl p-6 border border-gray-100">
            <div className="space-y-6">
              <div className="relative">
                <img
                  src={img}
                  alt="Dish 3"
                  className="rounded-xl object-cover w-full h-[300px]"
                />
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-sm font-semibold">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                Gourmet Delight Three
              </h3>
              <p className="text-gray-600">
                Unlock new flavors with our enhanced culinary offerings. This
                dish brings a symphony of tastes right to your table.
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Get started <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 2 with similar enhancements */}
          <div className="group hover:shadow-xl transition-all duration-300 rounded-2xl p-6 border border-gray-100">
            <div className="space-y-6">
              <div className="relative">
                <img
                  src={img}
                  alt="Dish 4"
                  className="rounded-xl object-cover w-full h-[300px]"
                />
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-sm font-semibold">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                Gourmet Delight Four
              </h3>
              <p className="text-gray-600">
                Elevate your dining experience with our latest addition.
                Designed to tantalize your taste buds with more flavor and
                creativity.
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Explore now <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsNew;

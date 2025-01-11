import React from "react";
import { ArrowRight } from "lucide-react";
import img from "/img/img1.jpg";
import Footer from "./Footer";
import Hero from "./Hero";
import heroImg from "/img/hero.jpg";

const WhatsNew = () => {
  return (
    <>
      <Hero img={heroImg} text={"What's New"} />
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        {/* First row - Image left, content right */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2">
            <img
              src={img}
              alt="Feature 1"
              className="rounded-2xl object-cover w-full h-[400px]"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-4">
            <h3 className="text-3xl font-bold tracking-tight">
              New Feature One
            </h3>
            <p className="text-lg text-gray-600">
              Experience our latest innovation that brings unprecedented
              capabilities to your workflow. Designed with user experience in
              mind, this feature streamlines complex processes into simple,
              intuitive actions.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Learn more <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Second row - Content left, image right */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
          <div className="w-full lg:w-1/2 space-y-4">
            <h3 className="text-3xl font-bold tracking-tight">
              New Feature Two
            </h3>
            <p className="text-lg text-gray-600">
              Transform your experience with our revolutionary update. This
              groundbreaking feature sets new standards for efficiency and
              effectiveness, making your work easier than ever before.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Discover more <ArrowRight size={16} />
            </button>
          </div>
          <div className="w-full lg:w-1/2">
            <img
              src={img}
              alt="Feature 2"
              className="rounded-2xl object-cover w-full h-[400px]"
            />
          </div>
        </div>

        {/* Third row - Two cards side by side */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="space-y-4">
            <img
              src={img}
              alt="Feature 3"
              className="rounded-2xl object-cover w-full h-[300px]"
            />
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tight">
                New Feature Three
              </h3>
              <p className="text-gray-600">
                Unlock new possibilities with our enhanced capabilities. This
                feature brings powerful tools right to your fingertips.
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get started <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="space-y-4">
            <img
              src={img}
              alt="Feature 4"
              className="rounded-2xl object-cover w-full h-[300px]"
            />
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tight">
                New Feature Four
              </h3>
              <p className="text-gray-600">
                Take your experience to the next level with our latest addition.
                Designed to empower you with more control and flexibility.
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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

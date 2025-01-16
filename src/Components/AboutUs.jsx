/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Hero from "./Hero";

import InfiniteSlider from "./InfiniteSlider";
import heroImg from "/img/hero.jpg";
import img from "/img/img1.jpg";
import team1img from "/img/team1.jpg";
import restaurantImg1 from "/img/food1.jpg";
import restaurantImg2 from "/img/food2.jpg";
import restaurantImg3 from "/img/food3.jpg";
import restaurantImg4 from "/img/food4.jpg";
import restaurantImg5 from "/img/food5.jpg";

const Button = ({ to, children, className = "" }) => (
  <Link
    to={to}
    className={`relative inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-md transition-all duration-300 group ${className} overflow-hidden`}
  >
    <span className="absolute inset-0 w-0 bg-red-700 transition-all duration-300 ease-out group-hover:w-full rounded-md"></span>
    <span className="relative font-medium">{children}</span>
  </Link>
);

const AboutUs = () => {
  const [, setState] = useState({});
  const restaurantImages = [
    restaurantImg1,
    restaurantImg2,
    restaurantImg3,
    restaurantImg4,
    restaurantImg5,
  ];

  useEffect(() => {
    const handleResize = () => {
      // Force a re-render on window resize
      // This ensures the InfiniteSlider updates its dimensions
      setState({});
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero img={heroImg} text="About Our Restaurant Chain" />

      <section className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] lg:h-[600px]">
            <img
              src={img || "/placeholder.svg"}
              alt="Our Restaurant"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
            <p className="text-lg text-gray-600">
              Founded in 1985, our restaurant chain has grown from a single
              family-owned diner to a beloved national brand. We're passionate
              about serving delicious, high-quality food and creating memorable
              dining experiences for our customers.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="ml-3 text-gray-600">
                  Over 500 locations across the country
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="ml-3 text-gray-600">
                  Locally sourced ingredients for the freshest flavors
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="ml-3 text-gray-600">
                  Award-winning customer service
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="ml-3 text-gray-600">
                  Commitment to sustainability and eco-friendly practices
                </span>
              </li>
            </ul>
            <Button className="mt-8" to="/menu">
              Check out our menu
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Restaurants
          </h2>
          <p className="text-lg text-gray-600 mb-8 px-6">
            Experience the warmth and flavor of our restaurants across the
            nation. Each location offers a unique atmosphere while maintaining
            our commitment to quality and service.
          </p>
        </div>
        <InfiniteSlider images={restaurantImages} />
      </section>

      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-white shadow-lg">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🍽️</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Quality</h3>
            <p className="text-gray-600">
              We use only the finest ingredients to create memorable meals
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-white shadow-lg">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Community</h3>
            <p className="text-gray-600">
              Supporting local communities through partnerships and initiatives
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-white shadow-lg">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">♻️</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
            <p className="text-gray-600">
              Committed to eco-friendly practices in all our operations
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

import React from "react";
import { ChevronRight, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import img from "/img/hero.jpg";
import img1 from "/img/img1.jpg";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src={img}
            alt="Japanese cuisine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        </div>
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Yuki Japanese Cuisine
            </h1>
            <p className="text-2xl mb-12 text-gray-200">
              Experience authentic Japanese flavors
            </p>
            <Link
              to="/delivery"
              className="hidden md:inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-md min-w-[200px] transition-all duration-300 hover:px-8 hover:scale-110 group"
            >
              <span className="font-medium">Order Delivery</span>
              <ChevronRight
                size={20}
                className="transition-transform duration-300 "
              />
            </Link>
          </div>
        </div>
      </section>

      {/* New Management Banner */}
      <section className="bg-gradient-to-r from-red-600 to-red-500 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl font-medium tracking-wide">
            Under New Management | 15% discount on orders over €20
          </p>
        </div>
      </section>

      {/* Traditional Flavors Section - Removed diagonal styling for tablet/mobile */}
      <section className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative">
            {/* Diagonal background - only visible on large screens */}
            <div className="absolute -inset-4 bg-white shadow-xl transform z-0 rounded-3xl hidden lg:block"></div>

            {/* Content */}
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center p-6 bg-white lg:bg-transparent rounded-3xl lg:rounded-none shadow-xl lg:shadow-none">
              <div className="p-6">
                <h2 className="text-4xl font-bold mb-8 text-gray-800">
                  Traditional Japanese Flavors
                </h2>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                  Freshly prepared and cooked on the day, everyday to bring out
                  the authentic taste and flavour of Japanese cuisine.
                </p>
                {/* Fixed bullet points for consistent sizing */}
                <ul className="space-y-6">
                  {[
                    "Authentic Japanese recipes",
                    "Fresh ingredients daily",
                    "Expert chefs with 20+ years experience",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-4">
                      <span className="w-3 h-3 bg-red-600 rounded-full shrink-0 mt-2"></span>
                      <span className="text-lg text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-[500px] lg:h-[600px] ">
                <img
                  src={img1}
                  alt="Chef preparing sushi"
                  className="rounded-3xl shadow-2xl w-full h-full object-cover transform hover:scale-105 transition-transform duration-500  "
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Popular Dishes
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                name: "Signature Sushi Set",
                price: "€24.99",
                image: "/img/food1.jpg",
              },
              {
                name: "Ramen Collection",
                price: "€16.99",
                image: "/img/food2.jpg",
              },
              {
                name: "Tempura Platter",
                price: "€19.99",
                image: "/img/food3.jpg",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl 
                  transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="h-72 relative overflow-hidden ">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-red-600 text-xl font-bold">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
              Opening Hours
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              {[
                {
                  title: "Dine-in",
                  hours: [
                    { days: "Monday - Friday", time: "12:00 - 22:00" },
                    { days: "Saturday - Sunday", time: "13:00 - 23:00" },
                  ],
                },
                {
                  title: "Takeaway",
                  hours: [
                    { days: "Monday - Friday", time: "11:30 - 21:30" },
                    { days: "Saturday - Sunday", time: "12:30 - 22:30" },
                  ],
                },
              ].map((section, index) => (
                <div key={index} className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.hours.map((hour, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-200"
                      >
                        <span className="text-lg text-gray-600">
                          {hour.days}
                        </span>
                        <span className="text-lg font-semibold text-gray-800">
                          {hour.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

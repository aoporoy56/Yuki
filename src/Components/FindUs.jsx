import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Footer from "./Footer";
import Hero from "./Hero";
import heroImg from "/img/hero.jpg";

const FindUs = () => {
  const locations = [
    {
      name: "Downtown Restaurant",
      address: "123 Main Street, Downtown, City, 12345",
      phone: "(555) 123-4567",
      hours: "Mon-Sun: 11AM - 10PM",
      email: "downtown@restaurant.com",
    },
    {
      name: "Westside Location",
      address: "456 West Avenue, Westside, City, 12345",
      phone: "(555) 234-5678",
      hours: "Mon-Sun: 11AM - 11PM",
      email: "westside@restaurant.com",
    },
  ];

  return (
    <>
      <Hero img={heroImg} text={"Find Us"} />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Main content */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Us</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Visit us at our convenient locations. We're here to serve you with
              the best dining experience.
            </p>
          </div>

          {/* Location Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {locations.map((location, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Map Placeholder - Replace with actual map integration */}
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-gray-400" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {location.name}
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-6 w-6 text-red-600 mt-1" />
                      <p className="text-gray-600">{location.address}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="h-6 w-6 text-red-600" />
                      <p className="text-gray-600">{location.phone}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="h-6 w-6 text-red-600" />
                      <p className="text-gray-600">{location.email}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="h-6 w-6 text-red-600" />
                      <p className="text-gray-600">{location.hours}</p>
                    </div>
                  </div>

                  <button className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Parking Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Downtown Location
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Free street parking available after 6 PM</li>
                  <li>• Public parking garage one block away</li>
                  <li>• Valet parking available on weekends</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Westside Location
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Free parking available in our private lot</li>
                  <li>• Additional street parking available</li>
                  <li>• Accessible parking spots near entrance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindUs;

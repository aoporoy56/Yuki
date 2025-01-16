import React, { useState } from "react";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const ContactUs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const locations = [
    {
      name: "Yuki Restaurants",
      address: "123 Markhouse Rd, London E17 8DQ",
      phone: "020 3340 6841",
      hours: "7 Days a Week: 3:00 PM - 11:00 PM",
      email: "info@yukirestaurants.com",
    },
  ];

  const faqs = [
    {
      question: "What are your opening hours?",
      answer: "We're open seven days a week from 3:00 PM to 11:00 PM.",
    },
    {
      question: "Do you offer vegetarian options?",
      answer:
        "Yes, we have an extensive vegetarian menu including salads, noodle dishes, and specialty rolls.",
    },
    {
      question: "How can I make a reservation?",
      answer:
        "Reservations can be made through our website, by phone, or through our mobile app. For large groups (8+), please call us directly.",
    },
    {
      question: "What's your delivery radius?",
      answer:
        "We deliver within a 5-mile radius of our restaurant. Delivery times may vary based on distance and current order volume.",
    },
    {
      question: "Do you cater for events?",
      answer:
        "Yes, we offer catering services for events of all sizes. Please contact us at least 48 hours in advance for catering requests.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch with us for reservations,
            catering requests, or any questions you might have.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Google Maps Component */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-[1.02]">
            <div className="w-full h-full min-h-[600px] lg:min-h-[400px]">
              <div className="relative w-full h-full">
                <iframe
                  className="absolute top-0 left-0 w-full h-full border-0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2479.880226766239!2d-0.03223677670280005!3d51.57666027181897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761daedf917931%3A0xd62c71ffd9b25d0a!2sYuki%20Restaurants!5e0!3m2!1sen!2suk!4v1705340391344!5m2!1sen!2suk"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Location Card */}
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-[1.02]"
            >
              <div className="h-48 bg-gradient-to-r from-red-500 to-red-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-16 w-16 text-white/80" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {location.name}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Address</p>
                      <p className="text-gray-900">{location.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Phone</p>
                      <p className="text-gray-900">{location.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Email</p>
                      <p className="text-gray-900">{location.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Hours</p>
                      <p className="text-gray-900 whitespace-pre-line">
                        {location.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Send Us a Message
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02]"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-200 hover:shadow-xl"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

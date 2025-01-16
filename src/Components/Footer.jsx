import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import logo from "/img/yuki_white_bgremove.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    window.scrollTo(0, 0); // Scroll to top when navigating
    navigate(path);
  };

  return (
    <footer className="bg-gray-900 text-gray-100">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo Column */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-48 h-48 bg-gray-900 rounded-full flex items-center justify-center mb-6">
              <img
                src={logo}
                alt="Restaurant Logo"
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>

          {/* Stores and Food Column */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text">
              Stores and Food
            </h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => handleNavigation("/whats-new")}
                  className="hover:text-red-400 transition-colors inline-block"
                >
                  What's New
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/menu")}
                  className="hover:text-red-400 transition-colors inline-block"
                >
                  Our Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/delivery")}
                  className="hover:text-red-400 transition-colors inline-block"
                >
                  Order Delivery
                </button>
              </li>
            </ul>
          </div>

          {/* About Us Column */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text">
              About Us
            </h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="hover:text-red-600 transition-colors inline-block"
                >
                  Contact + FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/about")}
                  className="hover:text-red-600 transition-colors inline-block"
                >
                  Our Story
                </button>
              </li>
            </ul>
          </div>

          {/* Social Media Column */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text">
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-start gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-400 transition-colors transform hover:-translate-y-1"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600 transition-colors transform hover:-translate-y-1"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-400 transition-colors transform hover:-translate-y-1"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600 transition-colors transform hover:-translate-y-1"
              >
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 text-sm text-gray-400">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Yuki. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <button
              onClick={() => handleNavigation("/privacy")}
              className="hover:text-gray-100 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleNavigation("/terms")}
              className="hover:text-gray-100 transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => handleNavigation("/cookies")}
              className="hover:text-gray-100 transition-colors"
            >
              Cookie Policy
            </button>
            <button
              onClick={() => handleNavigation("/copyright")}
              className="hover:text-gray-100 transition-colors"
            >
              Copyright Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

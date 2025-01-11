import React, { useState } from "react";
import {
  MapPin,
  Clock,
  ChevronRight,
  ExternalLink,
  Package,
  Bike,
  X,
} from "lucide-react";
import { useCart } from "../Context/CartContext";
import Toast, { useToast } from "../Context/ToastContext";
import { Link } from "react-router-dom";

const DeliveryOption = ({
  title,
  logo,
  estimatedTime,
  fee,
  onClick,
  isSelected,
}) => (
  <button
    onClick={onClick}
    className={`w-full p-3 md:p-4 rounded-lg border-2 transition-all ${
      isSelected
        ? "border-blue-500 bg-blue-50"
        : "border-gray-200 hover:border-blue-200"
    } mb-3 md:mb-4`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-lg flex items-center justify-center">
          {logo}
        </div>
        <div className="text-left">
          <h3 className="font-semibold text-base md:text-lg">{title}</h3>
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-gray-600 text-xs md:text-sm">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{estimatedTime} min</span>
            </div>
            <span className="hidden md:inline mx-2">•</span>
            <span>${fee} delivery fee</span>
          </div>
        </div>
      </div>
      <ChevronRight
        className={`transition-colors ${
          isSelected ? "text-blue-500" : "text-gray-400"
        } w-4 h-4 md:w-6 md:h-6`}
      />
    </div>
  </button>
);

const CartSummary = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [tip, setTip] = useState(0);

  const subtotal = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return total + price * item.quantity;
  }, 0);

  const deliveryFee = 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax + tip;

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            to="/menu"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md mb-8">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center border rounded-lg bg-gray-50">
                  <button
                    onClick={() => updateQuantity(item.name, item.quantity - 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.name, item.quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.price}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.name)}
                className="text-red-500 hover:text-red-600 p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold mb-4">Add Tip</h3>
          <div className="flex gap-2 flex-wrap">
            {[0, 5, 10, 15, 20].map((percentage) => (
              <button
                key={percentage}
                onClick={() => setTip((subtotal * percentage) / 100)}
                className={`px-6 py-2 rounded-lg border font-medium transition-all
                  ${
                    tip === (subtotal * percentage) / 100
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-200 text-gray-700"
                  }`}
              >
                {percentage}%
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 text-sm border-t pt-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-medium">${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (8%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tip</span>
            <span className="font-medium">${tip.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-3 border-t">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50 border-t">
        <button
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          onClick={() => {
            // Handle checkout logic here
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

const OrderDelivery = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [address, setAddress] = useState("");
  const [showLocationAlert, setShowLocationAlert] = useState(true);

  const deliveryServices = [
    {
      id: "uber-eats",
      title: "Uber Eats",
      logo: (
        <svg
          className="w-6 h-6 md:w-10 md:h-10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M12 4L4 8l8 4 8-4-8-4zM4 12l8 4 8-4M4 16l8 4 8-4" />
        </svg>
      ),
      estimatedTime: "30-45",
      fee: 4.99,
    },
    {
      id: "doordash",
      title: "DoorDash",
      logo: <Package className="w-6 h-6 md:w-10 md:h-10" />,
      estimatedTime: "35-50",
      fee: 5.99,
    },
    {
      id: "grubhub",
      title: "Grubhub",
      logo: <Bike className="w-6 h-6 md:w-10 md:h-10" />,
      estimatedTime: "40-55",
      fee: 4.49,
    },
  ];

  const handleLocationAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setShowLocationAlert(false);
          setAddress("Current Location");
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">Order Delivery</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Get our delicious meals delivered right to your door
        </p>
      </div>

      {showLocationAlert && (
        <div className="mb-4 md:mb-6 bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />
            <h3 className="font-semibold text-base md:text-lg">
              Enable Location Services
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-gray-600 text-sm md:text-base">
              Allow location access for accurate delivery estimates
            </p>
            <button
              onClick={handleLocationAccess}
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm md:text-base"
            >
              Enable
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md mb-6 md:mb-8">
        <div className="p-4 md:p-6 border-b">
          <h2 className="text-lg md:text-xl font-semibold mb-1">
            Delivery Address
          </h2>
          <p className="text-gray-600 text-xs md:text-sm">
            Enter your delivery location or use current location
          </p>
        </div>
        <div className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <input
              type="text"
              placeholder="Enter your delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            />
            <button
              onClick={handleLocationAccess}
              className="w-full sm:w-auto px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <MapPin size={18} />
              <span>Use My Location</span>
            </button>
          </div>
        </div>
      </div>
      <CartSummary />
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 md:p-6 border-b">
          <h2 className="text-lg md:text-xl font-semibold mb-1">
            Choose Delivery Service
          </h2>
          <p className="text-gray-600 text-xs md:text-sm">
            Select your preferred delivery partner
          </p>
        </div>
        <div className="p-4 md:p-6">
          {deliveryServices.map((service) => (
            <DeliveryOption
              key={service.id}
              {...service}
              isSelected={selectedService === service.id}
              onClick={() => handleServiceSelect(service.id)}
            />
          ))}
        </div>
        <div className="p-4 md:p-6 border-t bg-gray-50">
          <p className="text-xs md:text-sm text-gray-500 mb-4">
            * Delivery times and fees may vary based on location and demand
          </p>
          {selectedService && (
            <button
              onClick={() => window.open("#", "_blank")}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
            >
              Continue with{" "}
              {deliveryServices.find((s) => s.id === selectedService)?.title}
              <ExternalLink size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 md:mt-8">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          About Our Delivery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 md:p-6 border-b">
              <h3 className="text-base md:text-lg font-semibold">
                Delivery Hours
              </h3>
            </div>
            <div className="p-4 md:p-6">
              <div className="space-y-2 text-sm md:text-base">
                <p className="flex flex-col sm:flex-row justify-between">
                  <span>Monday - Thursday</span>
                  <span className="text-gray-600">11:00 AM - 9:00 PM</span>
                </p>
                <p className="flex flex-col sm:flex-row justify-between">
                  <span>Friday - Saturday</span>
                  <span className="text-gray-600">11:00 AM - 10:00 PM</span>
                </p>
                <p className="flex flex-col sm:flex-row justify-between">
                  <span>Sunday</span>
                  <span className="text-gray-600">12:00 PM - 8:00 PM</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 md:p-6 border-b">
              <h3 className="text-base md:text-lg font-semibold">
                Delivery Zone
              </h3>
            </div>
            <div className="p-4 md:p-6">
              <p className="text-gray-600 text-sm md:text-base">
                We currently deliver within a 5-mile radius of our restaurant
                locations. Delivery fees and minimums may vary based on
                distance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDelivery;

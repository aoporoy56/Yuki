import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  ChevronRight,
  ExternalLink,
  Package,
  Bike,
  X,
  FileText,
  Ticket,
} from "lucide-react";
import { useCart } from "../Context/CartContext";
import { useToast } from "../Context/ToastContext";
import { Link } from "react-router-dom";
import { createOrder, auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const CartSummary = ({ address, name, phone, instructions, couponCode }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [tip, setTip] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Simple coupon logic - you might want to validate this against a database
    if (couponCode === "WELCOME10") {
      setDiscount(10);
    } else if (couponCode === "SPECIAL20") {
      setDiscount(20);
    } else {
      setDiscount(0);
    }
  }, [couponCode]);

  const subtotal = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return total + price * item.quantity;
  }, 0);

  const discountAmount = (subtotal * discount) / 100;
  const deliveryFee = 4.99;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const tax = subtotalAfterDiscount * 0.08;
  const total = subtotalAfterDiscount + deliveryFee + tax + tip;

  const handleCheckout = async () => {
    if (!address || !name || !phone) {
      showToast("Please fill in all delivery details", "error");
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        items: cart,
        address,
        name,
        phone,
        instructions,
        couponCode,
        deliveryFee,
        subtotal,
        discount: discountAmount,
        tax,
        tip,
        total,
      };

      const orderId = await createOrder(orderData);
      clearCart();
      showToast("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      showToast("Failed to place order. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  // Rest of the CartSummary component remains the same, but add discount to the summary
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
      {/* Existing cart items section */}
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
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({discount}%)</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
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

      {/* Existing checkout button section */}
      <div className="p-6 bg-gray-50 border-t">
        <button
          className={`w-full bg-red-500 text-white py-3 rounded-lg 
            ${
              isProcessing
                ? "opacity-75 cursor-not-allowed"
                : "hover:bg-red-600"
            } 
            transition-colors font-medium flex items-center justify-center gap-2`}
          onClick={handleCheckout}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </>
          ) : (
            "Proceed to Checkout"
          )}
        </button>
      </div>
    </div>
  );
};

const OrderDelivery = () => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [instructions, setInstructions] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isCouponValid, setIsCouponValid] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const loadUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.fullName || "");
          setPhone(userData.phone || "");
          setAddress(userData.address || "");
        }
      }
    };
    loadUserProfile();
  }, []);

  const handleCouponValidation = () => {
    // Simple validation - you might want to check against a database
    if (["WELCOME10", "SPECIAL20"].includes(couponCode.toUpperCase())) {
      setIsCouponValid(true);
      showToast("Coupon applied successfully!", "success");
    } else {
      setIsCouponValid(false);
      showToast("Invalid coupon code", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">Order Delivery</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Get our delicious meals delivered right to your door
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md mb-6 md:mb-8">
        <div className="p-4 md:p-6 border-b">
          <h2 className="text-lg md:text-xl font-semibold mb-1">
            Delivery Details
          </h2>
          <p className="text-gray-600 text-xs md:text-sm">
            Enter your contact information and delivery location
          </p>
        </div>

        <div className="p-4 md:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Enter your delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            />

            <textarea
              placeholder="Special instructions for delivery (optional)"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base min-h-[100px] resize-none"
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Ticket className="w-5 h-5 mr-2" />
              Have a coupon?
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
              <button
                onClick={handleCouponValidation}
                className={`px-6 py-2 rounded-md transition-colors ${
                  isCouponValid
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {isCouponValid ? "Applied" : "Apply"}
              </button>
            </div>
            {isCouponValid && (
              <p className="text-green-600 text-sm mt-2">
                Coupon applied successfully!
              </p>
            )}
          </div>
        </div>
      </div>

      <CartSummary
        address={address}
        name={name}
        phone={phone}
        instructions={instructions}
        couponCode={isCouponValid ? couponCode : ""}
      />
    </div>
  );
};

export default OrderDelivery;

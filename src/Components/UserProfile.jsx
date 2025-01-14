import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "../firebase";
import { User, LogOut, Mail, Clock, ShoppingBag } from "lucide-react";

const UserProfile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-6">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gray-200"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-gray-200">
              <User className="w-12 h-12 text-blue-600" />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.displayName || "User"}
            </h1>
            <p className="text-gray-600 flex items-center mt-1">
              <Mail className="w-4 h-4 mr-2" />
              {user?.email}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              <Clock className="w-4 h-4 inline mr-2" />
              Member since {user?.metadata.creationTime.slice(0, 10)}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg flex items-center hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </button>
        </div>
      </div>

      {/* Order History Section Placeholder */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <ShoppingBag className="w-5 h-5 mr-2" />
          Order History
        </h2>
        <div className="text-gray-500 text-center py-8">
          <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>No orders yet</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

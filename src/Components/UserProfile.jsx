import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  User,
  LogOut,
  Mail,
  Clock,
  ShoppingBag,
  MapPin,
  Phone,
} from "lucide-react";

const UserProfile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setProfileData(userDoc.data());
        }
      }
    };
    fetchUserProfile();
  }, [user]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      await setDoc(doc(db, "users", user.uid), profileData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
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
            <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center border-4 border-gray-200">
              <User className="w-12 h-12 text-red-600" />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.displayName || profileData.fullName || "User"}
            </h1>
            <p className="text-gray-600 flex items-center mt-1">
              <Mail className="w-4 h-4 mr-2" />
              {user?.email}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              <Clock className="w-4 h-4 inline mr-2" />
              Member since {user?.metadata.creationTime?.slice(0, 10)}
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

      {/* Profile Details */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Delivery Information</h2>
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
              isEditing
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-red-50 text-red-600 hover:bg-red-100"
            }`}
            disabled={isSaving}
          >
            {isSaving
              ? "Saving..."
              : isEditing
              ? "Save Changes"
              : "Edit Details"}
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) =>
                  setProfileData({ ...profileData, fullName: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Enter your full name"
              />
            ) : (
              <p className="p-3 bg-gray-50 rounded-lg">
                {profileData.fullName || "Not set"}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Enter your phone number"
              />
            ) : (
              <p className="p-3 bg-gray-50 rounded-lg">
                {profileData.phone || "Not set"}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Delivery Address
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.address}
                onChange={(e) =>
                  setProfileData({ ...profileData, address: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Enter your delivery address"
              />
            ) : (
              <p className="p-3 bg-gray-50 rounded-lg">
                {profileData.address || "Not set"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Order History Section */}
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

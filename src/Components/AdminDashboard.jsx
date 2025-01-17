import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Clock, Package, DollarSign } from "lucide-react";
import { Orders } from "./Admin_Orders";
import { ContactMessages } from "./Admin_ContactMessages";
import { resetAllOrders } from "../firebase";

// Component for displaying statistics
const StatsCard = ({ title, value, icon: Icon }) => (
  <div className="bg-red-50 rounded-lg p-4 shadow">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-red-900">{title}</h3>
      <Icon className="h-4 w-4 text-red-700" />
    </div>
    <p className="text-2xl font-bold text-red-900">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "orders"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const getTodayRevenue = () => {
    const today = new Date();
    return orders
      .filter((order) => {
        if (!order.createdAt || !order.createdAt.toDate) return false;
        const orderDate = order.createdAt.toDate();
        return (
          orderDate.toDateString() === today.toDateString() &&
          order.status !== "cancelled"
        );
      })
      .reduce((acc, order) => acc + (order.total || 0), 0)
      .toFixed(2);
  };

  const getActiveOrders = () => {
    return orders.filter(
      (order) => order.status !== "delivered" && order.status !== "cancelled"
    ).length;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-900">Admin Dashboard</h1>
        <button
          onClick={() => setShowResetConfirm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Reset All Orders
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard title="Total Orders" value={orders.length} icon={Package} />
        <StatsCard
          title="Active Orders"
          value={getActiveOrders()}
          icon={Clock}
        />
        <StatsCard
          title="Today's Revenue"
          value={`£${getTodayRevenue()}`}
          icon={DollarSign}
        />
      </div>

      <div className="mb-6">
        <div className="border-b border-red-200">
          <nav className="-mb-px flex space-x-8">
            {["orders", "contact"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:border-red-300 hover:text-red-700"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab === "orders" ? "Orders" : "Contact Messages"}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-red-900 mb-4">
              Confirm Reset
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to reset all orders? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await resetAllOrders();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Reset All Orders
              </button>
            </div>
          </div>
        </div>
      )}

      {error ? (
        <div className="text-center py-12 text-red-600">
          <p>Error loading dashboard: {error}</p>
        </div>
      ) : loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto" />
        </div>
      ) : activeTab === "orders" ? (
        <Orders orders={orders} />
      ) : (
        <ContactMessages />
      )}
    </div>
  );
};

export default AdminDashboard;

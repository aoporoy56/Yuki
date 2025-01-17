import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import {
  db,
  archiveContactSubmission,
  deleteContactSubmission,
} from "../firebase";
import {
  Clock,
  Package,
  Menu as MenuIcon,
  DollarSign,
  Archive,
  Trash2,
  Mail,
} from "lucide-react";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(true);
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [archivedSubmissions, setArchivedSubmissions] = useState([]);

  useEffect(() => {
    // Fetch orders
    const ordersQuery = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    // Fetch active contact submissions
    const activeSubmissionsQuery = query(
      collection(db, "contact-submissions"),
      where("archived", "==", false),
      orderBy("createdAt", "desc")
    );

    // Fetch archived contact submissions
    const archivedSubmissionsQuery = query(
      collection(db, "contact-submissions"),
      where("archived", "==", true),
      orderBy("createdAt", "desc")
    );

    const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
      setLoading(false);
    });

    const unsubscribeActiveSubmissions = onSnapshot(
      activeSubmissionsQuery,
      (snapshot) => {
        const submissionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContactSubmissions(submissionsData);
      }
    );

    const unsubscribeArchivedSubmissions = onSnapshot(
      archivedSubmissionsQuery,
      (snapshot) => {
        const archivedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArchivedSubmissions(archivedData);
      }
    );

    return () => {
      unsubscribeOrders();
      unsubscribeActiveSubmissions();
      unsubscribeArchivedSubmissions();
    };
  }, []);

  const archivedSubmissionsQuery = query(
    collection(db, "contact-submissions"),
    where("archived", "==", true),
    orderBy("archivedAt", "desc")
  );

  const unsubscribeArchivedSubmissions = onSnapshot(
    archivedSubmissionsQuery,
    (snapshot) => {
      const archivedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArchivedSubmissions(archivedData);
    }
  );

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      preparing: "bg-blue-100 text-blue-800",
      "out-for-delivery": "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const handleArchiveSubmission = async (submissionId) => {
    try {
      await archiveContactSubmission(submissionId);
    } catch (error) {
      console.error("Error archiving submission:", error);
    }
  };

  const handleDeleteSubmission = async (submissionId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this message? This action cannot be undone."
      )
    ) {
      try {
        await deleteContactSubmission(submissionId);
      } catch (error) {
        console.error("Error deleting submission:", error);
      }
    }
  };

  const Stats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-red-50 rounded-lg p-4 shadow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-red-900">Total Orders</h3>
          <Package className="h-4 w-4 text-red-700" />
        </div>
        <p className="text-2xl font-bold text-red-900">{orders.length}</p>
      </div>

      <div className="bg-red-50 rounded-lg p-4 shadow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-red-900">Active Orders</h3>
          <Clock className="h-4 w-4 text-red-700" />
        </div>
        <p className="text-2xl font-bold text-red-900">
          {
            orders.filter(
              (order) =>
                order.status !== "delivered" && order.status !== "cancelled"
            ).length
          }
        </p>
      </div>

      <div className="bg-red-50 rounded-lg p-4 shadow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-red-900">Today's Revenue</h3>
          <DollarSign className="h-4 w-4 text-red-700" />
        </div>
        <p className="text-2xl font-bold text-red-900">
          £
          {orders
            .filter((order) => {
              const today = new Date();
              const orderDate = order.createdAt.toDate();
              return orderDate.toDateString() === today.toDateString();
            })
            .reduce((acc, order) => acc + order.total, 0)
            .toFixed(2)}
        </p>
      </div>
    </div>
  );

  const ContactSubmissions = () => (
    <div className="space-y-8">
      {/* Active Submissions */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <Mail className="h-6 w-6 text-red-700" />
          <h2 className="text-2xl font-bold text-red-900">
            Contact Submissions
          </h2>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-red-100">
          {contactSubmissions.length === 0 ? (
            <p className="p-8 text-gray-500 text-center text-lg">
              No new messages
            </p>
          ) : (
            <div className="divide-y divide-red-100">
              {contactSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="p-6 hover:bg-red-50 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-3 flex-1">
                      <h3 className="font-semibold text-lg text-red-900">
                        {submission.firstName} {submission.lastName}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">
                        {submission.email}
                      </p>
                      <p className="text-base text-gray-800 mt-2 leading-relaxed">
                        {submission.message}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        {submission.createdAt.toDate().toLocaleString()}
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleArchiveSubmission(submission.id)}
                        className="p-2.5 text-gray-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200"
                        title="Archive message"
                      >
                        <Archive className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSubmission(submission.id)}
                        className="p-2.5 text-gray-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200"
                        title="Delete message"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Archived Submissions */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <Archive className="h-6 w-6 text-gray-600" />
          <h2 className="text-2xl font-bold text-gray-700">
            Archived Messages
          </h2>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          {archivedSubmissions.length === 0 ? (
            <p className="p-8 text-gray-500 text-center text-lg">
              No archived messages
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {archivedSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-3 flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {submission.firstName} {submission.lastName}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">
                        {submission.email}
                      </p>
                      <p className="text-base text-gray-800 mt-2 leading-relaxed">
                        {submission.message}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        Archived:{" "}
                        {submission.archivedAt.toDate().toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteSubmission(submission.id)}
                      className="p-2.5 text-gray-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200"
                      title="Delete message"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-red-900 mb-6">Admin Dashboard</h1>

      <Stats />

      <div className="mb-6">
        <div className="border-b border-red-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("orders")}
              className={`${
                activeTab === "orders"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:border-red-300 hover:text-red-700"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`${
                activeTab === "contact"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:border-red-300 hover:text-red-700"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Contact Messages
            </button>
          </nav>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto"></div>
        </div>
      ) : activeTab === "orders" ? (
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-red-200">
              <thead className="bg-red-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-900 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-900 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-900 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-900 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-red-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customer.name}
                      <br />
                      <span className="text-gray-500">
                        {order.customer.phone}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <ul>
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.quantity}x {item.name}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      £{order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select
                        className="mt-1 block w-full py-2 px-3 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        value={order.status}
                        onChange={(e) =>
                          handleStatusUpdate(order.id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="out-for-delivery">
                          Out for Delivery
                        </option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <ContactSubmissions />
      )}
    </div>
  );
};

export default AdminDashboard;

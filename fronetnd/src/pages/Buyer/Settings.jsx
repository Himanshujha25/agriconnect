import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CreditCard,
  Shield,
  Save,
  PlusCircle,
  Trash2,
  X,
  Globe,
} from "lucide-react";

// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// Reusable Toggle Switch Component
const ToggleSwitch = ({ label, description, enabled, setEnabled }) => (
  <div className="flex justify-between items-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
    <div>
      <h4 className="font-semibold text-gray-800">{label}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
        enabled ? "bg-green-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState("notifications");
  const [showCardModal, setShowCardModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [notifications, setNotifications] = useState({
    promotions: true,
    orderUpdates: true,
    reminders: false,
  });

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "notifications" && (
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-4 border-b">
                Notifications
              </h2>
              <div className="space-y-2 divide-y">
                <ToggleSwitch
                  label="Promotions & Offers"
                  description="Receive updates on special deals and new products."
                  enabled={notifications.promotions}
                  setEnabled={(val) =>
                    setNotifications({ ...notifications, promotions: val })
                  }
                />
                <ToggleSwitch
                  label="Order Updates"
                  description="Get real-time updates on your order status."
                  enabled={notifications.orderUpdates}
                  setEnabled={(val) =>
                    setNotifications({ ...notifications, orderUpdates: val })
                  }
                />
                <ToggleSwitch
                  label="Shopping Reminders"
                  description="Get reminders about items left in your cart."
                  enabled={notifications.reminders}
                  setEnabled={(val) =>
                    setNotifications({ ...notifications, reminders: val })
                  }
                />
              </div>
            </div>
          )}
          {activeTab === "payment" && (
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h2 className="text-2xl font-bold text-gray-800">
                  Payment Methods
                </h2>
                <button
                  onClick={() => setShowCardModal(true)}
                  className="flex items-center text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors px-4 py-2 rounded-lg shadow-sm"
                >
                  <PlusCircle className="mr-2" size={16} />
                  Add New Card
                </button>
              </div>
              <div className="space-y-4">
                <div className="border p-4 rounded-lg flex justify-between items-center hover:border-green-400 hover:bg-green-50 transition-all duration-300">
                  <div className="flex items-center">
                    <img
                      src="https://placehold.co/40x24/2563eb/white?text=VISA"
                      alt="Visa"
                      className="w-10 h-6 mr-4 rounded-sm"
                    />
                    <div>
                      <p className="font-semibold">
                        Visa ending in 1234{" "}
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-2">
                          Primary
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">Expires 08/2025</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="border p-4 rounded-lg flex justify-between items-center hover:border-green-400 hover:bg-green-50 transition-all duration-300">
                  <div className="flex items-center">
                    <img
                      src="https://placehold.co/40x24/f97316/white?text=MC"
                      alt="Mastercard"
                      className="w-10 h-6 mr-4 rounded-sm"
                    />
                    <div>
                      <p className="font-semibold">Mastercard ending in 5678</p>
                      <p className="text-sm text-gray-500">Expires 11/2026</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "preferences" && (
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">
                Preferences
              </h2>
              <div className="space-y-6 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Language
                  </label>
                  <select className="mt-1 w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-green-500">
                    <option>English (United States)</option>
                    <option>Español</option>
                    <option>Français</option>
                    <option>Hindi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Currency
                  </label>
                  <select className="mt-1 w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-green-500">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>Rupees</option>
                  </select>
                </div>
                <div className="text-right">
                  <button className="bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-green-700 transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "account" && (
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">
                Account Actions
              </h2>
              <div className="space-y-6">
                <div className="border border-red-300 bg-red-50 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-red-800">
                      Delete Account
                    </h3>
                    <p className="text-sm text-red-700 mt-1">
                      Permanently delete your account and all data. This action
                      cannot be undone.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-6 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Settings
          </h1>
          <p className="mt-1 text-gray-600">
            Manage your notifications, payments, and account preferences.
          </p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar Navigation */}
          <motion.aside
            variants={itemVariants}
            className="lg:col-span-1 mb-6 lg:mb-0"
          >
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-semibold transition-all duration-300 ${
                    activeTab === "notifications"
                      ? "bg-green-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  <Bell className="mr-3" size={20} /> Notifications
                </button>
                <button
                  onClick={() => setActiveTab("payment")}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-semibold transition-all duration-300 ${
                    activeTab === "payment"
                      ? "bg-green-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  <CreditCard className="mr-3" size={20} /> Payment
                </button>
                <button
                  onClick={() => setActiveTab("preferences")}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-semibold transition-all duration-300 ${
                    activeTab === "preferences"
                      ? "bg-green-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  <Globe className="mr-3" size={20} /> Preferences
                </button>
                <button
                  onClick={() => setActiveTab("account")}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-semibold transition-all duration-300 ${
                    activeTab === "account"
                      ? "bg-green-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  <Shield className="mr-3" size={20} /> Account
                </button>
              </nav>
            </div>
          </motion.aside>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </motion.div>

      {/* Add Card Modal */}
      <AnimatePresence>
        {showCardModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCardModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Add New Card</h2>
                <button
                  onClick={() => setShowCardModal(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="Name on Card"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t rounded-b-2xl text-right">
                <button
                  onClick={() => setShowCardModal(false)}
                  className="bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Card
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Account Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto bg-red-100 w-16 h-16 rounded-full flex items-center justify-center">
                <Trash2 size={32} className="text-red-600" />
              </div>
              <h2 className="text-2xl font-bold mt-4">Delete Account</h2>
              <p className="text-gray-600 mt-2">
                Are you sure you want to delete your account? All of your data
                will be permanently removed. This action cannot be undone.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-gray-200 text-gray-800 font-bold py-2.5 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-red-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

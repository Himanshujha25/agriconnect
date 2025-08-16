import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, FileText, Shield, Save, LogOut, X, PlusCircle, Trash2, Truck, Banknote } from 'lucide-react';

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
      type: 'spring',
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
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${enabled ? 'bg-green-600' : 'bg-gray-200'}`}
        >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);


export default function App() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notifications, setNotifications] = useState({
      newOrders: true,
      productReviews: true,
      lowStockAlerts: false,
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
                {activeTab === 'notifications' && (
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-4 border-b">Notifications</h2>
                    <div className="space-y-2 divide-y">
                        <ToggleSwitch 
                            label="New Orders"
                            description="Receive a notification for every new order."
                            enabled={notifications.newOrders}
                            setEnabled={(val) => setNotifications({...notifications, newOrders: val})}
                        />
                        <ToggleSwitch 
                            label="New Product Reviews"
                            description="Get notified when a customer reviews your product."
                            enabled={notifications.productReviews}
                            setEnabled={(val) => setNotifications({...notifications, productReviews: val})}
                        />
                        <ToggleSwitch 
                            label="Low Stock Alerts"
                            description="Receive an alert when a product's stock is low."
                            enabled={notifications.lowStockAlerts}
                            setEnabled={(val) => setNotifications({...notifications, lowStockAlerts: val})}
                        />
                    </div>
                  </div>
                )}
                {activeTab === 'policies' && (
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                     <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Store Policies</h2>
                     <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Return Policy</label>
                            <textarea placeholder="Clearly state your policy on returns and refunds..." rows="5" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"></textarea>
                        </div>
                         <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Shipping Information</label>
                            <textarea placeholder="Provide details about your shipping methods, costs, and timelines..." rows="5" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"></textarea>
                        </div>
                     </div>
                      <div className="text-right mt-8 border-t pt-6">
                        <button className="bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center ml-auto">
                            <Save size={16} className="mr-2"/> Save Policies
                        </button>
                    </div>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                     <div className="flex justify-between items-center mb-6 pb-4 border-b">
                      <h2 className="text-2xl font-bold text-gray-800">Shipping Profiles</h2>
                      <button className="flex items-center text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors px-4 py-2 rounded-lg shadow-sm">
                        <PlusCircle className="mr-2" size={16} />
                        Create Profile
                      </button>
                    </div>
                    <div className="space-y-4">
                        <div className="border p-4 rounded-lg flex justify-between items-center hover:border-green-400 hover:bg-green-50 transition-all duration-300">
                            <div>
                                <p className="font-semibold">Standard Shipping <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-2">Default</span></p>
                                <p className="text-gray-600 text-sm">₹50 Flat Rate | 3-5 business days</p>
                            </div>
                            <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-100 rounded-full"><Edit3 size={18}/></button>
                        </div>
                        <div className="border p-4 rounded-lg flex justify-between items-center hover:border-green-400 hover:bg-green-50 transition-all duration-300">
                            <div>
                                <p className="font-semibold">Free Shipping (Orders over ₹1000)</p>
                                <p className="text-gray-600 text-sm">Free | 3-5 business days</p>
                            </div>
                            <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-100 rounded-full"><Edit3 size={18}/></button>
                        </div>
                    </div>
                  </div>
                )}
                {activeTab === 'account' && (
                   <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Account Actions</h2>
                    <div className="space-y-6">
                        <div className="border border-red-300 bg-red-50 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-red-800">Delete Account</h3>
                                <p className="text-sm text-red-700 mt-1">Permanently delete your account and all data. This action cannot be undone.</p>
                            </div>
                            <button onClick={() => setShowDeleteModal(true)} className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm">
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Seller Settings</h1>
            <p className="mt-1 text-gray-600">Manage your store policies, notifications, and account actions.</p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Sidebar Navigation */}
            <motion.aside variants={itemVariants} className="lg:col-span-1 mb-6 lg:mb-0">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                    <nav className="space-y-1">
                        <button onClick={() => setActiveTab('notifications')} className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-semibold transition-all duration-300 ${activeTab === 'notifications' ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                            <Bell className="mr-3" size={20}/> Notifications
                        </button>
                        <button onClick={() => setActiveTab('policies')} className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-semibold transition-all duration-300 ${activeTab === 'policies' ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                            <FileText className="mr-3" size={20}/> Store Policies
                        </button>
                         <button onClick={() => setActiveTab('shipping')} className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-semibold transition-all duration-300 ${activeTab === 'shipping' ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                            <Truck className="mr-3" size={20}/> Shipping
                        </button>
                        <button onClick={() => setActiveTab('account')} className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-semibold transition-all duration-300 ${activeTab === 'account' ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                            <Shield className="mr-3" size={20}/> Account
                        </button>
                    </nav>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
                {renderContent()}
            </div>
        </div>
      </motion.div>

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
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="mx-auto bg-red-100 w-16 h-16 rounded-full flex items-center justify-center">
                        <Trash2 size={32} className="text-red-600"/>
                    </div>
                    <h2 className="text-2xl font-bold mt-4">Delete Account</h2>
                    <p className="text-gray-600 mt-2">Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.</p>
                    <div className="mt-6 flex justify-center gap-4">
                        <button onClick={() => setShowDeleteModal(false)} className="bg-gray-200 text-gray-800 font-bold py-2.5 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                            Cancel
                        </button>
                        <button onClick={() => setShowDeleteModal(false)} className="bg-red-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-red-700 transition-colors">
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

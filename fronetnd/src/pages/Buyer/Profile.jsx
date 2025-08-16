import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Shield, Edit3, Save, PlusCircle, Trash2, Bell, X, CheckCircle, ShoppingCart, CreditCard, Star } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  
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
                {activeTab === 'profile' && (
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b">
                      <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                      <button 
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                        className="flex items-center text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors px-4 py-2 rounded-lg shadow-sm"
                      >
                        {isEditingProfile ? <Save className="mr-2" size={16} /> : <Edit3 className="mr-2" size={16} />}
                        {isEditingProfile ? 'Save' : 'Edit'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Full Name</label>
                        <input type="text" defaultValue="Jane Doe" disabled={!isEditingProfile} className="mt-1 w-full p-3 border rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-green-500 transition"/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Email Address</label>
                        <input type="email" defaultValue="jane.doe@example.com" disabled className="mt-1 w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed"/>
                      </div>
                       <div>
                        <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                        <input type="tel" defaultValue="+1 (555) 123-4567" disabled={!isEditingProfile} className="mt-1 w-full p-3 border rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-green-500 transition"/>
                      </div>
                       <div>
                        <label className="block text-sm font-medium text-gray-500">Joined On</label>
                        <input type="text" defaultValue="October 15, 2023" disabled className="mt-1 w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed"/>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'addresses' && (
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                     <div className="flex justify-between items-center mb-6 pb-4 border-b">
                      <h2 className="text-2xl font-bold text-gray-800">Saved Addresses</h2>
                      <button onClick={() => setShowAddressModal(true)} className="flex items-center text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors px-4 py-2 rounded-lg shadow-sm">
                        <PlusCircle className="mr-2" size={16} />
                        Add New
                      </button>
                    </div>
                    <div className="space-y-4">
                        <div className="border p-4 rounded-lg flex justify-between items-start hover:border-green-400 hover:bg-green-50 transition-all duration-300">
                            <div>
                                <p className="font-semibold">Home <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-2">Default</span></p>
                                <p className="text-gray-600">123 Green St, Harvestville, AG 54321</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-100 rounded-full"><Edit3 size={18}/></button>
                                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full"><Trash2 size={18}/></button>
                            </div>
                        </div>
                         <div className="border p-4 rounded-lg flex justify-between items-start hover:border-green-400 hover:bg-green-50 transition-all duration-300">
                            <div>
                                <p className="font-semibold">Work</p>
                                <p className="text-gray-600">456 Market Ave, Downtown, AG 54322</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-100 rounded-full"><Edit3 size={18}/></button>
                                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full"><Trash2 size={18}/></button>
                            </div>
                        </div>
                    </div>
                  </div>
                )}
                {activeTab === 'notifications' && (
                   <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-4 border-b">Notifications</h2>
                    <div className="space-y-2 divide-y">
                        <ToggleSwitch 
                            label="Promotions & Offers"
                            description="Receive updates on special deals and new products."
                            enabled={notifications.promotions}
                            setEnabled={(val) => setNotifications({...notifications, promotions: val})}
                        />
                        <ToggleSwitch 
                            label="Order Updates"
                            description="Get real-time updates on your order status."
                            enabled={notifications.orderUpdates}
                            setEnabled={(val) => setNotifications({...notifications, orderUpdates: val})}
                        />
                        <ToggleSwitch 
                            label="Shopping Reminders"
                            description="Get reminders about items left in your cart."
                            enabled={notifications.reminders}
                            setEnabled={(val) => setNotifications({...notifications, reminders: val})}
                        />
                    </div>
                   </div>
                )}
                {activeTab === 'security' && (
                   <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Account Security</h2>
                    <div className="space-y-6 max-w-md">
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Current Password</label>
                            <input type="password" className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">New Password</label>
                            <input type="password" className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                            <input type="password" className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"/>
                        </div>
                        <div className="text-right">
                            <button className="bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-green-700 transition-colors">
                                Update Password
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
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="relative group">
                <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop" 
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <label htmlFor="profile-upload" className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Edit3 size={24} className="text-white" />
                    <input id="profile-upload" type="file" className="hidden" />
                </label>
            </div>
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Jane Doe's Profile</h1>
                <p className="mt-1 text-gray-600">Manage your profile, addresses, and account settings.</p>
            </div>
        </motion.div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Sidebar Navigation */}
            <motion.aside variants={itemVariants} className="lg:col-span-1 mb-6 lg:mb-0">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                    <nav className="space-y-1">
                        <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-semibold transition-all duration-300 ${activeTab === 'profile' ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                            <User className="mr-3" size={20}/> Profile
                        </button>
                        <button onClick={() => setActiveTab('addresses')} className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-semibold transition-all duration-300 ${activeTab === 'addresses' ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                            <MapPin className="mr-3" size={20}/> Addresses
                        </button>
                        <button onClick={() => setActiveTab('notifications')} className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-semibold transition-all duration-300 ${activeTab === 'notifications' ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                            <Bell className="mr-3" size={20}/> Notifications
                        </button>
                        <button onClick={() => setActiveTab('security')} className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-semibold transition-all duration-300 ${activeTab === 'security' ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                            <Shield className="mr-3" size={20}/> Security
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

      {/* Add Address Modal */}
      <AnimatePresence>
        {showAddressModal && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
                onClick={() => setShowAddressModal(false)}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="text-xl font-bold">Add New Address</h2>
                        <button onClick={() => setShowAddressModal(false)} className="p-1 rounded-full hover:bg-gray-100"><X size={20}/></button>
                    </div>
                    <div className="p-6 space-y-4">
                        <input type="text" placeholder="Full Address" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"/>
                        <input type="text" placeholder="Apartment, Suite, etc. (optional)" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"/>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="City" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"/>
                            <input type="text" placeholder="Pincode" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"/>
                        </div>
                        <div className="flex items-center">
                            <input id="default-address" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                            <label htmlFor="default-address" className="ml-2 block text-sm text-gray-900">Set as default address</label>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 border-t rounded-b-2xl text-right">
                        <button onClick={() => setShowAddressModal(false)} className="bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-green-700 transition-colors">
                            Save Address
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

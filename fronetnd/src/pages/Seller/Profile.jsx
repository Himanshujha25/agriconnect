import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Shield, Banknote, Edit3, Save, MapPin, Sun, Star, X } from 'lucide-react';

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

export default function App() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=2874&auto=format&fit=crop");

  const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
          setProfileImage(URL.createObjectURL(file));
      }
  };

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
                      <h2 className="text-2xl font-bold text-gray-800">Farm Profile</h2>
                      <button 
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                        className="flex items-center text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors px-4 py-2 rounded-lg shadow-sm"
                      >
                        {isEditingProfile ? <Save className="mr-2" size={16} /> : <Edit3 className="mr-2" size={16} />}
                        {isEditingProfile ? 'Save' : 'Edit'}
                      </button>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Farm Name</label>
                        <input type="text" defaultValue="Green Valley Farms" disabled={!isEditingProfile} className="mt-1 w-full p-3 border rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-green-500 transition"/>
                      </div>
                       <div>
                        <label className="block text-sm font-medium text-gray-500">Farm Location</label>
                        <input type="text" defaultValue="Harvestville, AG 54321" disabled={!isEditingProfile} className="mt-1 w-full p-3 border rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-green-500 transition"/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Farm Description</label>
                        <textarea defaultValue="Specializing in organic, sun-ripened vegetables and fresh dairy. Committed to sustainable farming practices." rows="4" disabled={!isEditingProfile} className="mt-1 w-full p-3 border rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-green-500 transition"></textarea>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'account' && (
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Account Settings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" defaultValue="John Farmer" className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Email Address</label>
                            <input type="email" defaultValue="john.farmer@example.com" disabled className="mt-1 w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">New Password</label>
                            <input type="password" placeholder="Enter new password" className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input type="password" placeholder="Confirm new password" className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"/>
                        </div>
                    </div>
                     <div className="text-right mt-6 border-t pt-6">
                        <button className="bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-green-700 transition-colors">
                            Update Account
                        </button>
                    </div>
                  </div>
                )}
                {activeTab === 'payouts' && (
                   <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Payout Details</h2>
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-800">Bank Account</h3>
                        <p className="text-sm text-blue-700 mt-1">This is the account where your earnings will be deposited.</p>
                        <div className="mt-4 p-4 bg-white rounded-md flex justify-between items-center">
                            <div>
                                <p className="font-semibold">Harvest National Bank</p>
                                <p className="text-gray-600 text-sm">Account ending in **** 5678</p>
                            </div>
                            <button className="text-sm font-semibold text-green-600 hover:text-green-700">Change</button>
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
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group">
                    <img 
                        src={profileImage}
                        alt="Farm Profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <label htmlFor="profile-upload" className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Edit3 size={24} className="text-white" />
                        <input id="profile-upload" type="file" className="hidden" onChange={handleImageUpload} accept="image/*"/>
                    </label>
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Green Valley Farms</h1>
                    <p className="mt-1 text-gray-600 flex items-center justify-center sm:justify-start gap-2"><MapPin size={16}/> Harvestville, AG</p>
                    <div className="mt-2 flex items-center justify-center sm:justify-start gap-1 text-yellow-500">
                        <Star size={18} className="fill-current"/>
                        <Star size={18} className="fill-current"/>
                        <Star size={18} className="fill-current"/>
                        <Star size={18} className="fill-current"/>
                        <Star size={18} className="fill-current"/>
                        <span className="text-gray-600 font-semibold ml-2">5.0 (120 Reviews)</span>
                    </div>
                </div>
            </div>
        </motion.div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Sidebar Navigation */}
            <motion.aside variants={itemVariants} className="lg:col-span-1 mb-6 lg:mb-0">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                    <nav className="space-y-1">
                        <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-semibold transition-all duration-300 ${activeTab === 'profile' ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                            <Sun className="mr-3" size={20}/> Farm Profile
                        </button>
                        <button onClick={() => setActiveTab('account')} className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-semibold transition-all duration-300 ${activeTab === 'account' ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                            <User className="mr-3" size={20}/> Account Settings
                        </button>
                        <button onClick={() => setActiveTab('payouts')} className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-semibold transition-all duration-300 ${activeTab === 'payouts' ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                            <Banknote className="mr-3" size={20}/> Payout Details
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
    </div>
  );
}

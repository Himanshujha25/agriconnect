import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Home, MapPin } from 'lucide-react';

// A reusable Link component placeholder
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>{children}</a>
);

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-0">
        
        {/* Form Section */}
        <motion.div 
          className="bg-white p-8 sm:p-12 rounded-l-2xl shadow-2xl z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-left mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-2">Become a Seller</h1>
            <p className="text-gray-600">Join our network of farmers and start selling your produce directly to consumers.</p>
          </div>

          <form className="space-y-6">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
              />
            </div>
             <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
              />
            </div>
             <div className="relative">
              <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Farm Name" 
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
              />
            </div>
             <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Location / Address" 
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
              />
            </div>
            
            <button className="w-full bg-green-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 duration-300 flex items-center justify-center group">
              Complete Registration
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="font-medium text-green-600 hover:underline">Login</Link>
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div 
            className="hidden lg:block relative rounded-r-2xl overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2940&auto=format&fit=crop" 
            alt="A farmer's hands holding fresh soil" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
           <div className="absolute bottom-10 left-10 text-white">
                <h2 className="text-3xl font-bold">Grow With Us</h2>
                <p className="mt-2 max-w-md">Reach a wider audience and share the fruits of your labor with a community that cares.</p>
            </div>
        </motion.div>

      </div>
    </div>
  );
}

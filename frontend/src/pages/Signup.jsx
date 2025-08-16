import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, ShoppingBag, Store } from 'lucide-react';

const Link = ({ to, children, className }) => (
  <a href={to} className={className}>{children}</a>
);

export default function Signup() {
  const [userType, setUserType] = useState('buyer');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user type to localStorage
    localStorage.setItem('registeredUser', JSON.stringify({
      fullName,
      email,
      password,
      userType
    }));

    // Redirect to login page
    navigate('/login');
  };

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
            <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-2">Create an Account</h1>
            <p className="text-gray-600">Join our community of fresh food lovers and local farmers.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Register as a:</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setUserType('buyer')}
                  className={`flex items-center justify-center p-4 border rounded-lg transition-all duration-300 ${userType === 'buyer' ? 'bg-green-600 text-white border-green-600 shadow-lg' : 'bg-gray-50 hover:bg-gray-100'}`}
                >
                  <ShoppingBag className="mr-2" size={20} />
                  <span className="font-semibold">Buyer</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setUserType('seller')}
                  className={`flex items-center justify-center p-4 border rounded-lg transition-all duration-300 ${userType === 'seller' ? 'bg-green-600 text-white border-green-600 shadow-lg' : 'bg-gray-50 hover:bg-gray-100'}`}
                >
                  <Store className="mr-2" size={20} />
                  <span className="font-semibold">Seller</span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="email" 
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
              />
            </div>
            
            {/* Submit */}
            <button 
              type="submit"
              className="w-full bg-green-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 duration-300 flex items-center justify-center group"
            >
              Create Account
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
            src="https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=2874&auto=format&fit=crop" 
            alt="Happy farmer holding a crate of fresh vegetables" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-10 left-10 text-white">
            <h2 className="text-3xl font-bold">Join the Movement</h2>
            <p className="mt-2 max-w-md">Become part of a system that's better for you, better for farmers, and better for the planet.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

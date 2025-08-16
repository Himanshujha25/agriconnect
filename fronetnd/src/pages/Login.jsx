import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
 import { useNavigate } from "react-router-dom";
import { useState } from "react";

// A reusable Link component placeholder
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>{children}</a>
);

// Google Icon SVG
const GoogleIcon = (props) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="1em" width="1em" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);


export default function App() {
 

// inside App() or your Login component
const navigate = useNavigate();
const [role, setRole] = useState("buyer"); // or "seller"

function handleLogin(e) {
  e.preventDefault();
  if (role === "buyer") {
    navigate("/buyer/dashboard");
  } else {
    navigate("/seller/dashboard");
  }
}

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
          <div className="text-left mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-2">Welcome Back!</h1>
            <p className="text-gray-600">Login to continue your journey with Agriconnect.</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
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
             <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-green-600 hover:underline">Forgot Password?</Link>
            </div>
            <button className="w-full bg-green-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 duration-300 flex items-center justify-center group">
              Login
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <GoogleIcon className="h-6 w-6 mr-2" />
                Login with Google
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don’t have an account? <Link to="/signup" className="font-medium text-green-600 hover:underline">Sign up</Link>
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
            src="https://images.unsplash.com/photo-1623211268529-69c56e303312?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGluZGlhbiUyMGZhcm1lcnxlbnwwfHwwfHx8MA%3D%3D" 
            alt="Farmer in a field" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
           <div className="absolute bottom-10 left-10 text-white">
                <h2 className="text-3xl font-bold">Connecting Fields & Families</h2>
                <p className="mt-2 max-w-md">The freshest produce is just a click away. Join a community that values quality and sustainability.</p>
            </div>
        </motion.div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Send, Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';

// A reusable Link component placeholder
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>{children}</a>
);

export default function App() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="pb-8 xl:grid xl:grid-cols-5 xl:gap-8">
          {/* Branding and Newsletter Section */}
          <div className="space-y-8 xl:col-span-2">
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-2 bg-green-800 rounded-lg">
                <Leaf size={28} className="text-zinc-300"/>
              </div>
              <span className="text-3xl font-bold text-zinc-300">Agriconnect</span>
            </Link>
            <p className="text-gray-400 text-base">
              Connecting local farmers directly with consumers for a fresher, fairer food system.
            </p>
            <form onSubmit={handleSubscribe} className="mt-6 sm:flex sm:max-w-md relative">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="appearance-none min-w-0 w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-base text-zinc-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-green-600 flex items-center justify-center border border-transparent rounded-md py-3 px-5 text-base font-medium text-zinc-300 hover:bg-green-700 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
             {subscribed && <p className="text-green-400 text-sm mt-2">Thank you for subscribing!</p>}
          </div>

          {/* Links Section */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-3 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-zinc-300 tracking-wider uppercase">For Buyers</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/buyer/orders" className="text-base text-gray-400 hover:text-white">My Orders</Link></li>
                <li><Link to="/how-it-works" className="text-base text-gray-400 hover:text-white">How It Works</Link></li>
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h3 className="text-sm font-semibold text-zinc-300 tracking-wider uppercase">For Sellers</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/seller/dashboard" className="text-base text-gray-400 hover:text-white">Dashboard</Link></li>
                <li><Link to="/seller/add-product" className="text-base text-gray-400 hover:text-white">Add Product</Link></li>
                <li><Link to="/for-sellers" className="text-base text-gray-400 hover:text-white">Seller Guide</Link></li>
              </ul>
            </div>
             <div className="mt-12 md:mt-0">
              <h3 className="text-sm font-semibold text-zinc-300 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/about" className="text-base text-gray-400 hover:text-white">About</Link></li>
                <li><Link to="/contact" className="text-base text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link to="/careers" className="text-base text-gray-400 hover:text-white">Careers</Link></li>
                <li><Link to="/privacy" className="text-base text-gray-400 hover:text-white">Privacy</Link></li>
                <li><Link to="/terms" className="text-base text-gray-400 hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} Agriconnect. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <Link to="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </Link>
             <Link to="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

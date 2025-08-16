import React, { useState, useEffect } from 'react';
import { Leaf, Menu, X, Bell } from 'lucide-react';

// Mock Link component - replace with your actual routing
const Link = ({ to, children, className, onClick }) => (
  <a href={to} className={className} onClick={onClick}>{children}</a>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className={`bg-white shadow-lg w-full fixed top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-xl backdrop-blur-sm bg-white/95' : 'shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Branding */}
          <div className="flex-shrink-0 group">
            <Link to="/" className="flex items-center space-x-3 text-green-700 transition-transform duration-300 group-hover:scale-105">
              <div className="p-2 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors duration-300">
                <Leaf size={28} className="text-green-600" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                  Agriconnect
                </span>
                <div className="text-xs text-gray-500 font-medium -mt-1">Farm to Future</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-4 py-2 text-gray-700 hover:text-green-700 font-medium rounded-lg hover:bg-green-50 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 bg-green-100 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
          

            {/* Login/Signup Buttons */}
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-6 py-2.5 text-green-700 font-medium rounded-xl border-2 border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2.5 text-white bg-gradient-to-r from-green-600 to-green-700 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium relative overflow-hidden group"
              >
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <Menu 
                  size={24} 
                  className={`absolute transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                  }`} 
                />
                <X 
                  size={24} 
                  className={`absolute transition-all duration-300 ${
                    isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-white shadow-2xl rounded-b-3xl mx-4 mt-2 overflow-hidden animate-in slide-in-from-top-4 duration-300">
            <div className="px-6 py-6 space-y-1">
              {/* Mobile Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-gray-700 hover:bg-green-50 hover:text-green-700 block px-4 py-4 rounded-xl text-base font-medium transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Action Buttons */}
              <div className="pt-6 mt-6 border-t border-gray-100 space-y-3">
                <Link
                  to="/login"
                  className="text-green-700 bg-green-50 hover:bg-green-100 border-2 border-green-200 block px-4 py-4 rounded-xl text-base font-medium text-center transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 block px-4 py-4 rounded-xl text-base font-medium text-center transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">Sign Up Free</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

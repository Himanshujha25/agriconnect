import React, { useState, useRef } from 'react';
import { User, Mail, MessageSquare, Phone, MapPin, Send, CheckCircle, AlertCircle, Clock, Users, Headphones } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      formRef.current?.reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: ["123 Green Valley Road", "Farm District, Agriculture City", "AG 54321, United States"],
      color: "text-green-600"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["General: hello@agriconnect.com", "Support: support@agriconnect.com", "Business: partnerships@agriconnect.com"],
      color: "text-blue-600"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["Main: +1 (555) 123-4567", "Support: +1 (555) 123-4568", "Emergency: +1 (555) 123-4569"],
      color: "text-purple-600"
    }
  ];

  const quickStats = [
    { icon: Users, number: "500+", label: "Partner Farmers" },
    { icon: Headphones, number: "24/7", label: "Customer Support" },
    { icon: Clock, number: "<2hrs", label: "Response Time" },
    { icon: CheckCircle, number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageSquare className="h-4 w-4" />
            <span>Get in Touch</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            We'd Love to 
            <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Hear From You
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Have questions about our platform? Need support? Want to partner with us? 
            Our team is here to help you every step of the way.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <Icon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="lg:grid lg:grid-cols-5">
              
              {/* Contact Info Section */}
              <div className="lg:col-span-2 bg-gradient-to-br from-green-600 to-emerald-600 text-white p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-12 translate-y-12"></div>
                
                <div className="relative">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-8">Contact Information</h2>
                  
                  <div className="space-y-8">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      return (
                        <div key={index} className="group">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                              <Icon className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                              {info.details.map((detail, idx) => (
                                <p key={idx} className="text-green-100 text-sm leading-relaxed">
                                  {detail}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-12 pt-8 border-t border-green-400">
                    <h3 className="font-semibold text-lg mb-4">Office Hours</h3>
                    <div className="space-y-2 text-green-100">
                      <p className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Saturday:</span>
                        <span>10:00 AM - 4:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Sunday:</span>
                        <span>Closed</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="lg:col-span-3 p-8 lg:p-12">
                <div className="max-w-2xl">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                  <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

                  {/* Success/Error Messages */}
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <p className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <p className="text-red-800 font-medium">Failed to send message. Please try again.</p>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Full Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full p-4 pl-12 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                            errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                        />
                      </div>
                      {errors.name && <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.name}</span>
                      </p>}
                    </div>

                    {/* Email Field */}
                    <div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="email"
                          name="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full p-4 pl-12 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                            errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.email}</span>
                      </p>}
                    </div>

                    {/* Subject Field */}
                    <div>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="subject"
                          placeholder="Subject of your message"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className={`w-full p-4 pl-12 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                            errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                        />
                      </div>
                      {errors.subject && <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.subject}</span>
                      </p>}
                    </div>

                    {/* Message Field */}
                    <div>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-6 text-gray-400" size={20} />
                        <textarea
                          name="message"
                          placeholder="Tell us more about how we can help you..."
                          rows="6"
                          value={formData.message}
                          onChange={handleInputChange}
                          className={`w-full p-4 pl-12 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none ${
                            errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                        ></textarea>
                      </div>
                      {errors.message && <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.message}</span>
                      </p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Quick Answers</h2>
          <p className="text-xl text-gray-600 mb-12">
            Looking for immediate help? Check out these common questions
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-bold text-gray-900 mb-3">How do I become a partner farmer?</h3>
              <p className="text-gray-600">Simply reach out through our contact form or call us directly. We'll guide you through our simple onboarding process.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-bold text-gray-900 mb-3">What areas do you deliver to?</h3>
              <p className="text-gray-600">We currently serve 50+ cities with plans to expand. Contact us to check if we deliver to your area.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-bold text-gray-900 mb-3">How fresh is the produce?</h3>
              <p className="text-gray-600">All produce is harvested within 24-48 hours of delivery, ensuring maximum freshness and nutrition.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-bold text-gray-900 mb-3">Do you offer bulk pricing?</h3>
              <p className="text-gray-600">Yes! We offer special pricing for restaurants, schools, and large orders. Contact us for custom quotes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
import React, { useState } from 'react';
import { Leaf, ShoppingCart, Heart, Star, Shield, Truck, ChevronDown } from 'lucide-react';

export default function App() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Home Chef & Mother",
      text: "Agriconnect has transformed how I feed my family. The produce is incredibly fresh, and knowing I'm supporting local farmers makes every meal more meaningful.",
      rating: 5
    },
    {
      name: "David Chen", 
      role: "Restaurant Owner",
      text: "As a restaurant owner, quality is everything. Agriconnect delivers consistently fresh ingredients that my customers notice in every dish.",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      role: "Fitness Enthusiast", 
      text: "The organic produce from Agriconnect perfectly supports my healthy lifestyle. Fresh, nutritious, and delivered right to my door!",
      rating: 5
    }
  ];

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop')"}}></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
            Fresh from the Farm,
            <span className="block text-green-200">Straight to You.</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 text-green-50 leading-relaxed">
            Connect with local farmers, enjoy premium fresh produce, and support sustainable agriculture in your community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="bg-white text-green-600 font-bold text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Shop Now</span>
            </button>
            <button className="border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-green-200">Local Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-green-200">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-green-200">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-green-200">Fresh Delivery</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-white" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-green-600">Agriconnect</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of farm-to-table commerce with our innovative platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors duration-300">
                <Leaf className="h-8 w-8 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Farm Fresh</h3>
              <p className="text-gray-600">Harvested within 24 hours and delivered to ensure maximum freshness and nutrition</p>
            </div>

            <div className="group text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors duration-300">
                <Shield className="h-8 w-8 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">100% Organic</h3>
              <p className="text-gray-600">Certified organic produce with no harmful pesticides or chemicals</p>
            </div>

            <div className="group text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors duration-300">
                <Truck className="h-8 w-8 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery available in most areas with eco-friendly packaging</p>
            </div>

            <div className="group text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors duration-300">
                <Heart className="h-8 w-8 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Support Local</h3>
              <p className="text-gray-600">Direct support to local farmers ensuring fair prices and community growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600">Get fresh produce in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center relative">
              <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Browse & Select</h3>
              <p className="text-gray-600 text-lg">Explore fresh produce from verified local farms in your area with detailed information about each farmer</p>
              {/* Connection line for desktop */}
              <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-green-200 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="text-center relative">
              <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Place Order</h3>
              <p className="text-gray-600 text-lg">Add items to your cart, choose delivery or pickup, and select your preferred time slot with secure payment</p>
              <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-green-200 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="text-center">
              <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Enjoy Fresh</h3>
              <p className="text-gray-600 text-lg">Receive your fresh produce at your doorstep or pickup location, perfectly packed and ready to enjoy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">What Our Community Says</h2>
            <p className="text-xl text-gray-600">Real feedback from real customers who love fresh produce</p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 lg:p-12 text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-lg lg:text-2xl text-gray-700 italic mb-8 leading-relaxed font-medium">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl">
                  {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</p>
                  <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-green-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
            Ready to Taste the Difference?
          </h2>
          <p className="text-lg lg:text-xl mb-10 text-green-100 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who have made the switch to fresh, local, sustainable produce
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-green-600 font-bold text-lg px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Start Shopping</span>
            </button>
            <button className="border-2 border-white text-white font-bold text-lg px-10 py-4 rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
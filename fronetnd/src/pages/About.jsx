import React, { useState, useEffect } from 'react';
import { Users, Target, Leaf, Award, Globe, TrendingUp, Heart, CheckCircle } from 'lucide-react';

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { number: "500+", label: "Partner Farmers", icon: Users },
    { number: "10,000+", label: "Happy Customers", icon: Heart },
    { number: "50+", label: "Cities Served", icon: Globe },
    { number: "98%", label: "Satisfaction Rate", icon: Award }
  ];

  const values = [
    {
      icon: Leaf,
      title: "Sustainability First",
      description: "We promote eco-friendly farming practices that protect our environment while delivering the freshest produce to your table."
    },
    {
      icon: Target,
      title: "Fair Trade Always",
      description: "Our platform ensures farmers receive fair compensation for their hard work, creating a sustainable livelihood for agricultural communities."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "We build meaningful connections between local farmers and consumers, strengthening communities one harvest at a time."
    },
    {
      icon: TrendingUp,
      title: "Innovation Focus",
      description: "Leveraging technology to create transparent, efficient supply chains that benefit both farmers and consumers."
    }
  ];

  const achievements = [
    "Direct partnerships with over 500+ local farms",
    "Zero-waste packaging initiative reducing plastic by 80%",
    "24/7 quality assurance and freshness guarantee",
    "Supporting farmer education and sustainable practices",
    "Carbon-neutral delivery in 25+ major cities"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const statInterval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(statInterval);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10"></div>
        <div className={`max-w-6xl mx-auto text-center relative transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Leaf className="h-4 w-4" />
            <span>About Agriconnect</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Empowering Farmers,
            <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Nourishing Communities
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            We're revolutionizing the way fresh produce reaches your table by creating direct connections between local farmers and conscious consumers.
          </p>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className={`bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105 ${
                    currentStat === index ? 'ring-4 ring-green-200 shadow-2xl' : ''
                  }`}
                >
                  <Icon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-8 lg:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-100 rounded-full transform -translate-x-12 translate-y-12"></div>
            
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">Our Mission</h2>
              
              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <p className="text-lg lg:text-xl leading-relaxed">
                  Agriconnect is a revolutionary platform dedicated to bridging the gap between local farmers and conscious consumers. We believe that everyone deserves access to fresh, sustainable produce while ensuring farmers receive fair compensation for their dedication and hard work.
                </p>
                
                <p className="text-lg lg:text-xl leading-relaxed">
                  By eliminating unnecessary middlemen, we create a transparent, efficient ecosystem that reduces food waste, lowers costs, and builds stronger communities. Our technology-driven approach ensures that every stakeholder in the food supply chain benefits from this direct connection.
                </p>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl mt-8">
                  <p className="text-lg font-medium text-green-800 text-center italic">
                    "We're not just connecting farmers with consumers—we're cultivating a healthier, more sustainable future for everyone."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every relationship we build
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="group p-8 rounded-2xl border border-gray-100 hover:shadow-2xl hover:border-green-200 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                      <Icon className="h-8 w-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Impact</h2>
            <p className="text-xl text-gray-600">
              Real results from our commitment to sustainable agriculture
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full transform translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full transform -translate-x-16 translate-y-16"></div>
            
            <div className="relative">
              <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-center">What We've Accomplished</h3>
              
              <div className="grid gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-lg font-medium">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to Join the Revolution?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Whether you're a farmer looking to reach new customers or a consumer seeking fresh, local produce, Agriconnect is your gateway to a better food future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-green-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Join as Farmer</span>
            </button>
            <button className="bg-white border-2 border-green-600 text-green-600 font-bold text-lg px-8 py-4 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Start Shopping
            </button>
          </div>
        </div>
      </section>

      {/* Footer Credit */}
      <footer className="py-8 px-4 text-center bg-gray-50">
        <p className="text-gray-500 text-sm">
          Built with  by <span className="font-semibold text-green-700">controlctrlaltelite</span>
        </p>
      </footer>
    </div>
  );
}
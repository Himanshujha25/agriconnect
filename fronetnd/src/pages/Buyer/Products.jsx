import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, ShoppingCart, Heart, Filter, X, ChevronDown, Zap } from 'lucide-react';

// A reusable Link component placeholder
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>{children}</a>
);

// Mock Data
const products = [
    { id: 1, name: 'Organic Tomatoes', farmer: 'Green Valley Farms', price: 3.99, rating: 4.5, category: 'Vegetables', image: 'https://images.unsplash.com/photo-1588694853939-a8f543a19074?q=80&w=2842&auto=format&fit=crop', description: 'Fresh, sun-ripened organic tomatoes, perfect for salads and sauces.' },
    { id: 2, name: 'Fresh Strawberries', farmer: 'Sunny Acres', price: 5.00, rating: 5, category: 'Fruits', image: 'https://images.unsplash.com/photo-1587393855524-087f83d95c9f?q=80&w=2864&auto=format&fit=crop', description: 'Juicy and sweet strawberries, picked at the peak of freshness.' },
    { id: 3, name: 'Artisanal Cheese', farmer: 'Happy Cow Dairy', price: 12.50, rating: 4.8, category: 'Dairy', image: 'https://images.unsplash.com/photo-1618164436245-4b7b3238d3f3?q=80&w=2940&auto=format&fit=crop', description: 'Aged cheddar with a sharp, nutty flavor. Made with milk from grass-fed cows.' },
    { id: 4, name: 'Organic Apples', farmer: 'Orchard Hill', price: 2.50, rating: 4.2, category: 'Fruits', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=2874&auto=format&fit=crop', description: 'Crisp and sweet Honeycrisp apples, grown without pesticides.' },
    { id: 5, name: 'Whole Wheat Bread', farmer: 'Bakery Barn', price: 4.50, rating: 4.9, category: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2940&auto=format&fit=crop', description: 'Hearty and delicious whole wheat bread, baked fresh daily.' },
    { id: 6, name: 'Fresh Carrots', farmer: 'Green Valley Farms', price: 1.99, rating: 4.6, category: 'Vegetables', image: 'https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?q=80&w=2787&auto=format&fit=crop', description: 'Sweet and crunchy carrots, perfect for snacking or cooking.' },
    { id: 7, name: 'Organic Milk', farmer: 'Happy Cow Dairy', price: 6.00, rating: 4.7, category: 'Dairy', image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?q=80&w=2864&auto=format&fit=crop', description: 'Creamy and wholesome organic milk from pasture-raised cows.' },
    { id: 8, name: 'Free-range Eggs', farmer: 'Sunny Acres', price: 4.00, rating: 5, category: 'Dairy', image: 'https://images.unsplash.com/photo-1598965675045-45c5b9208782?q=80&w=2942&auto=format&fit=crop', description: 'Farm-fresh eggs from happy, free-roaming chickens.' },
];

const categories = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Bakery'];

// Star Rating Component
const StarRating = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
        ))}
        <span className="ml-2 text-sm text-gray-600 font-semibold">{rating.toFixed(1)}</span>
    </div>
);


export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.farmer.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
      .sort((a, b) => {
          if (sortBy === 'price-asc') return a.price - b.price;
          if (sortBy === 'price-desc') return b.price - a.price;
          if (sortBy === 'rating') return b.rating - a.rating;
          return 0;
      });
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Filters Sidebar */}
        <aside className={`w-72 bg-white p-6 fixed lg:relative lg:translate-x-0 h-screen lg:h-auto transition-transform duration-300 z-40 shadow-lg lg:shadow-none ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="lg:hidden p-1 rounded-full hover:bg-gray-100"><X /></button>
            </div>
            <div>
                <h3 className="font-semibold mb-4 text-gray-700">Category</h3>
                <ul className="space-y-2">
                    {categories.map(cat => (
                        <li key={cat}>
                            <button 
                                onClick={() => setSelectedCategory(cat)}
                                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 text-sm font-medium ${selectedCategory === cat ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}
                            >
                                {cat}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Marketplace</h1>
                    <p className="mt-1 text-gray-600">Discover the freshest produce from local farms.</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            className="w-full md:w-72 p-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 bg-white"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                     <div className="relative">
                        <select 
                            onChange={(e) => setSortBy(e.target.value)}
                            value={sortBy}
                            className="appearance-none w-full md:w-48 p-3 pr-10 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-green-500"
                        >
                            <option value="rating">Sort by Rating</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>
            </div>
            
            <button onClick={() => setIsFilterOpen(true)} className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2 bg-white border rounded-lg shadow-sm">
                <Filter size={16} /> Filters
            </button>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence>
                {filteredAndSortedProducts.map(product => (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        key={product.id} 
                        className="bg-white rounded-2xl shadow-md overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                    >
                        <div className="relative">
                            <img src={product.image} alt={product.name} className="w-full h-56 object-cover"/>
                             <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:scale-110">
                                <Heart className="text-red-500" />
                            </div>
                             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                                <h3 className="text-xl font-bold text-white">{product.name}</h3>
                                <p className="text-sm text-green-200">{product.farmer}</p>
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-center">
                                <p className="text-2xl font-bold text-green-700">${product.price.toFixed(2)}</p>
                                <StarRating rating={product.rating} />
                            </div>
                            <div className="flex gap-3 mt-4">
                                <button onClick={() => setSelectedProduct(product)} className="w-1/2 bg-gray-100 text-gray-800 font-bold py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                                    Quick View
                                </button>
                                <button className="w-1/2 bg-green-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                                    <ShoppingCart className="mr-2" size={18} /> Add
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
                </AnimatePresence>
            </div>
             {filteredAndSortedProducts.length === 0 && (
                <div className="text-center py-20 col-span-full">
                    <Zap size={48} className="mx-auto text-gray-300" />
                    <h3 className="mt-4 text-2xl font-semibold text-gray-700">No Products Found</h3>
                    <p className="mt-2 text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                </div>
            )}
        </main>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={() => setSelectedProduct(null)}
            >
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full md:w-1/2 h-64 md:h-auto object-cover"/>
                    <div className="p-8 flex flex-col flex-1 overflow-y-auto">
                        <div>
                            <p className="text-sm font-semibold text-green-600">{selectedProduct.category}</p>
                            <h2 className="text-3xl font-bold text-gray-900 mt-1">{selectedProduct.name}</h2>
                            <p className="text-md text-gray-500 mt-1">from <span className="font-semibold text-gray-700">{selectedProduct.farmer}</span></p>
                            <div className="my-4">
                                <StarRating rating={selectedProduct.rating} />
                            </div>
                            <p className="text-gray-700 leading-relaxed">{selectedProduct.description}</p>
                        </div>
                        <div className="mt-auto pt-6">
                            <p className="text-4xl font-extrabold text-green-700">${selectedProduct.price.toFixed(2)}</p>
                            <button className="w-full mt-4 bg-green-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-green-700 transition-transform transform hover:scale-105 duration-300 flex items-center justify-center text-lg">
                                <ShoppingCart className="mr-3" size={22} /> Add to Cart
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  Heart,
  Star,
  ChevronRight,
  Filter,
  User,
  Menu,
  X,
  TrendingUp,
  Package,
  Clock,
  MapPin,
  Eye,
  Plus,
  Minus,
  Grid,
  List,
  SortAsc,
  Calendar,
  Zap
} from 'lucide-react';

// Mock Data
const categories = [
    { id: 1, name: 'Vegetables', image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=2940&auto=format&fit=crop', count: 124, trending: true },
    { id: 2, name: 'Fruits', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2864&auto=format&fit=crop', count: 89, trending: false },
    { id: 3, name: 'Dairy', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=2803&auto=format&fit=crop', count: 45, trending: false },
    { id: 4, name: 'Grains', image: 'https://images.unsplash.com/photo-1503442233022-1e0a1b1185b1?q=80&w=2940&auto=format&fit=crop', count: 67, trending: true },
    { id: 5, name: 'Herbs', image: 'https://images.unsplash.com/photo-1515586838455-8b938928ebc4?q=80&w=2940&auto=format&fit=crop', count: 32, trending: false },
    { id: 6, name: 'Meat', image: 'https://images.unsplash.com/photo-1588766768315-f6454c8d4fd6?q=80&w=2940&auto=format&fit=crop', count: 28, trending: false },
    { id: 7, name: 'Spices', image: 'https://images.unsplash.com/photo-1599557717858-dbd5a415b472?q=80&w=2940&auto=format&fit=crop', count: 55, trending: false },
    { id: 8, name: 'Bakery', image: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2857?q=80&w=2874&auto=format&fit=crop', count: 42, trending: true },
];

const products = [
    { id: 1, name: 'Organic Roma Tomatoes', farmer: 'Green Valley Farms', location: 'Punjab, India', price: 299, originalPrice: 349, unit: '/kg', rating: 4.8, reviews: 127, image: 'https://images.unsplash.com/photo-1588694853939-a8f543a19074?q=80&w=2842&auto=format&fit=crop', badge: 'Organic', inStock: true, quantity: 0, category: 'Vegetables', description: 'Fresh, sun-ripened organic tomatoes, perfect for salads and sauces.' },
    { id: 2, name: 'Fresh Strawberries', farmer: 'Sunny Acres Farm', location: 'Himachal Pradesh', price: 599, originalPrice: null, unit: '/500g', rating: 4.9, reviews: 89, image: 'https://images.unsplash.com/photo-1587393855524-087f83d95c9f?q=80&w=2864&auto=format&fit=crop', badge: 'Fresh', inStock: true, quantity: 0, category: 'Fruits', description: 'Juicy and sweet strawberries, picked at the peak of freshness.' },
    { id: 3, name: 'Artisanal Goat Cheese', farmer: 'Happy Cow Dairy Co.', location: 'Rajasthan, India', price: 899, originalPrice: null, unit: '/250g', rating: 4.7, reviews: 234, image: 'https://images.unsplash.com/photo-1618164436245-4b7b3238d3f3?q=80&w=2940&auto=format&fit=crop', badge: 'Premium', inStock: true, quantity: 0, category: 'Dairy', description: 'Aged cheddar with a sharp, nutty flavor. Made with milk from grass-fed cows.' },
    { id: 4, name: 'Organic Basmati Rice', farmer: 'Heritage Grains', location: 'Haryana, India', price: 450, originalPrice: 500, unit: '/kg', rating: 4.6, reviews: 156, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2940&auto=format&fit=crop', badge: 'Organic', inStock: true, quantity: 0, category: 'Grains', description: 'Long-grain aromatic basmati rice, perfect for biryani and pulao.' },
    { id: 5, name: 'Fresh Mint Leaves', farmer: 'Herb Garden Co.', location: 'Kerala, India', price: 120, originalPrice: null, unit: '/100g', rating: 4.5, reviews: 78, image: 'https://images.unsplash.com/photo-1628176503652-9b72d0d1a7dd?q=80&w=2940&auto=format&fit=crop', badge: 'Fresh', inStock: true, quantity: 0, category: 'Herbs', description: 'Aromatic mint leaves, ideal for chutneys, teas, and garnishes.' },
    { id: 6, name: 'Free Range Chicken', farmer: 'Natural Farms', location: 'Punjab, India', price: 320, originalPrice: 380, unit: '/kg', rating: 4.8, reviews: 92, image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=2940&auto=format&fit=crop', badge: 'Premium', inStock: true, quantity: 0, category: 'Meat', description: 'Tender and flavorful chicken from free-roaming birds.' },
    { id: 7, name: 'Fresh Spinach (Palak)', farmer: 'Green Valley Farms', location: 'Punjab, India', price: 80, originalPrice: 100, unit: '/bunch', rating: 4.7, reviews: 112, image: 'https://images.unsplash.com/photo-1576045057995-568f588f2f84?q=80&w=2940&auto=format&fit=crop', badge: 'Organic', inStock: true, quantity: 0, category: 'Vegetables', description: 'Nutrient-rich organic spinach, perfect for curries and salads.' },
    { id: 8, name: 'Farm Fresh Potatoes', farmer: 'Soil Brothers', location: 'Uttar Pradesh, India', price: 50, originalPrice: null, unit: '/kg', rating: 4.6, reviews: 250, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=2940&auto=format&fit=crop', badge: 'Fresh', inStock: true, quantity: 0, category: 'Vegetables', description: 'Versatile and delicious potatoes, sourced directly from local farms.' },
    { id: 9, name: 'Crisp Cauliflower', farmer: 'Green Valley Farms', location: 'Punjab, India', price: 75, originalPrice: null, unit: '/piece', rating: 4.5, reviews: 98, image: 'https://images.unsplash.com/photo-1598512752271-33f913a5af13?q=80&w=2940&auto=format&fit=crop', badge: 'Fresh', inStock: true, quantity: 0, category: 'Vegetables', description: 'Fresh and crunchy cauliflower, great for roasting or curries.' },
    { id: 10, name: 'Sweet Corn', farmer: 'Sunny Acres Farm', location: 'Himachal Pradesh', price: 90, originalPrice: 110, unit: '/pack of 2', rating: 4.9, reviews: 130, image: 'https://images.unsplash.com/photo-1551754478-5c4c941a6bda?q=80&w=2940&auto=format&fit=crop', badge: 'Fresh', inStock: true, quantity: 0, category: 'Vegetables', description: 'Sweet and juicy corn on the cob, perfect for grilling.' },
];

const StarRating = ({ rating }) => (
    <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} />
        ))}
        <span className="ml-1 text-slate-600 text-sm font-medium">{rating}</span>
    </div>
);

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [productsState, setProductsState] = useState(products);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const displayedCategories = showAllCategories ? categories : categories.slice(0, 6);

  const filteredProducts = useMemo(() => {
    let filtered = productsState;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-low':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case 'name':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [productsState, selectedCategory, searchQuery, sortBy]);

  const addToCart = (productId, quantity = 1) => {
    const product = productsState.find(p => p.id === productId);
    if (!product) return;

    setCart(prev => {
      const existingItem = prev.find(item => item.id === productId);
      if (existingItem) {
        return prev.map(item =>
          item.id === productId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateProductQuantity = (productId, change) => {
    setProductsState(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, quantity: Math.max(0, product.quantity + change) }
          : product
      )
    );
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                  FarmFresh
                </h1>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <ShoppingCart className="text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer" size={22} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-3 cursor-pointer group">
                <div className="w-9 h-9 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <User size={18} className="text-white" />
                </div>
                <div className="hidden lg:block">
                  <span className="text-sm font-semibold text-slate-700">Himanshu Kisan</span>
                  <p className="text-xs text-slate-500">Premium Member</p>
                </div>
              </div>
            </div>

            <button 
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-3 leading-tight">
                Your Marketplace, Himanshu Kisan! 
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Discover fresh, premium produce from trusted local farmers across India
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 lg:w-auto w-full">
              <div className="relative flex-1 lg:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, farms, or categories..." 
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm text-slate-700" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Shop by Category</h2>
            <button onClick={() => setShowAllCategories(!showAllCategories)} className="flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group">
              {showAllCategories ? 'Show Less' : 'View All'}
              <ChevronRight size={20} className={`ml-1 group-hover:translate-x-1 transition-transform ${showAllCategories ? 'rotate-90' : ''}`} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {displayedCategories.map((category) => (
              <div 
                key={category.id} 
                onClick={() => setSelectedCategory(selectedCategory === category.name ? 'all' : category.name)}
                className={`group cursor-pointer transition-all duration-300 ${
                  selectedCategory === category.name ? 'scale-105' : 'hover:scale-102'
                }`}
              >
                <div className={`relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
                  selectedCategory === category.name ? 'ring-2 ring-emerald-500 shadow-emerald-200' : ''
                }`}>
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  {category.trending && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Trending
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                    <p className="text-white/90 text-sm">{category.count} items</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-slate-900">
              {selectedCategory === 'all' ? 'All Products' : selectedCategory}
            </h2>
            <span className="text-slate-500 bg-slate-100 px-3 py-1 rounded-full text-sm">
              {filteredProducts.length} products
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-slate-700"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
            </select>
            
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600'}`}
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600'}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={`grid gap-6 mb-12 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={`group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
              viewMode === 'list' ? 'flex' : ''
            }`}>
              <div className={`relative overflow-hidden ${
                viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
              }`}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium text-white ${
                    product.badge === 'Organic' ? 'bg-emerald-500' : 
                    product.badge === 'Premium' ? 'bg-purple-500' : 'bg-blue-500'
                  }`}>
                    {product.badge}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                >
                  <Heart 
                    className={`${wishlist.has(product.id) ? 'text-red-500 fill-current' : 'text-slate-700'} hover:text-red-500`} 
                    size={20} 
                  />
                </button>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-emerald-600 text-sm font-medium">{product.farmer}</p>
                    <MapPin className="text-slate-400" size={12} />
                    <p className="text-slate-500 text-xs">{product.location}</p>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-slate-900">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-slate-500 line-through text-lg">₹{product.originalPrice}</span>
                      )}
                      <span className="text-slate-600 text-sm">{product.unit}</span>
                    </div>
                    <StarRating rating={product.rating} />
                  </div>
                </div>
                
                <div className="mt-auto flex items-center justify-between">
                  {product.quantity > 0 ? (
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateProductQuantity(product.id, -1)}
                        className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-semibold text-lg">{product.quantity}</span>
                      <button 
                        onClick={() => updateProductQuantity(product.id, 1)}
                        className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center hover:bg-emerald-200 transition-colors"
                      >
                        <Plus size={14} className="text-emerald-600" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => {
                        updateProductQuantity(product.id, 1);
                      }}
                      className="flex-1 bg-slate-100 text-slate-800 font-semibold py-3 px-4 rounded-xl hover:bg-slate-200 transition-all duration-200 flex items-center justify-center"
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Add
                    </button>
                  )}
                  
                  {product.quantity > 0 && (
                    <button 
                      onClick={() => addToCart(product.id, product.quantity)}
                      className="ml-3 bg-emerald-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    Package, 
    DollarSign, 
    Tag, 
    FileText, 
    UploadCloud, 
    ArrowLeft, 
    CheckCircle, 
    X, 
    Info, 
    Sparkles,
    LayoutGrid,
    ShoppingCart,
    BarChart,
    Settings,
    LogOut
} from 'lucide-react';

// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function SellerAddProductPage() {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (indexToRemove) => {
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && currentTag) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag('');
    }
  };
  
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="flex">
        {/* Seller Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-md hidden lg:block">
            <div className="p-6">
                 <Link to="/seller/dashboard" className="flex items-center space-x-2 text-green-700">
                    <LayoutGrid size={28} />
                    <span className="text-2xl font-bold">Dashboard</span>
                </Link>
            </div>
            <nav className="mt-6">
                <Link to="/seller/dashboard" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"><LayoutGrid className="mr-3" /> Overview</Link>
                <Link to="/seller/products" className="flex items-center px-6 py-3 text-gray-700 bg-gray-100 font-semibold"><Package className="mr-3" /> Products</Link>
                <Link to="/seller/orders" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"><ShoppingCart className="mr-3" /> Orders</Link>
                <Link to="/seller/settings" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"><Settings className="mr-3" /> Settings</Link>
            </nav>
            <div className="absolute bottom-0 w-64">
                 <Link to="#" className="flex items-center px-6 py-4 text-gray-600 hover:bg-gray-50 border-t"><LogOut className="mr-3" /> Logout</Link>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <Link to="/seller/products" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-800 mb-4">
                <ArrowLeft size={16} className="mr-2" />
                Back to Products
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Add a New Product</h1>
              <p className="mt-1 text-gray-600">Fill out the details below to list a new item in the marketplace.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
                {/* Basic Information Card */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Basic Information</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                            <input type="text" placeholder="e.g., Organic Honeycrisp Apples" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Product Description</label>
                            <textarea placeholder="Describe your product, its quality, and origin..." rows="5" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"></textarea>
                        </div>
                    </div>
                </div>

                {/* Pricing & Inventory Card */}
                 <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Pricing & Inventory</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Price</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input type="number" placeholder="0.00" className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-green-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Unit</label>
                             <select className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-green-500">
                                <option>per kg</option>
                                <option>per piece</option>
                                <option>per dozen</option>
                                <option>per liter</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Stock Quantity</label>
                            <input type="number" placeholder="e.g., 100" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500" />
                        </div>
                    </div>
                </div>
                
                {/* Categorization Card */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Categorization</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                            <select className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-green-500">
                                <option>Vegetables</option>
                                <option>Fruits</option>
                                <option>Dairy</option>
                                <option>Bakery</option>
                                <option>Grains</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Tags</label>
                            <div className="p-2 border rounded-lg flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-green-500">
                                {tags.map(tag => (
                                    <span key={tag} className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-md flex items-center">
                                        {tag}
                                        <button onClick={() => removeTag(tag)} className="ml-1.5"><X size={14}/></button>
                                    </span>
                                ))}
                                <input 
                                    type="text" 
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    onKeyDown={handleTagKeyDown}
                                    placeholder="Add tags..." 
                                    className="flex-1 p-1 outline-none bg-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </div>
              </motion.div>

              {/* Right Column */}
              <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Product Images</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <UploadCloud size={48} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">Drag & drop or click to upload</p>
                    <input type="file" id="image-upload" className="hidden" onChange={handleImageChange} accept="image/*" multiple />
                    <label htmlFor="image-upload" className="cursor-pointer text-sm font-semibold text-green-600 hover:text-green-700">
                      Choose files
                    </label>
                  </div>
                  <AnimatePresence>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                        {imagePreviews.map((src, index) => (
                            <motion.div 
                                key={src} 
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="relative group"
                            >
                                <img src={src} alt={`Preview ${index}`} className="w-full h-20 object-cover rounded-md"/>
                                <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X size={12}/>
                                </button>
                            </motion.div>
                        ))}
                    </div>
                  </AnimatePresence>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Publishing</h3>
                    <div className="space-y-4">
                        <button type="button" className="w-full bg-gray-100 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                            Save as Draft
                        </button>
                        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                            <CheckCircle size={18} className="mr-2"/> Publish Product
                        </button>
                    </div>
                </div>

              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

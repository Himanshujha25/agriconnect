import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Edit, Trash2, PlusCircle, Filter, Eye, ToggleLeft, ToggleRight, X, Package, DollarSign, ChevronDown, Zap } from 'lucide-react';

// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

// Mock Data
const sellerProducts = [
    { id: 1, name: 'Organic Tomatoes', price: 3.99, stock: 150, status: 'Active', category: 'Vegetables', image: 'https://images.unsplash.com/photo-1588694853939-a8f543a19074?q=80&w=2842&auto=format&fit=crop' },
    { id: 2, name: 'Fresh Strawberries', price: 5.00, stock: 80, status: 'Active', category: 'Fruits', image: 'https://images.unsplash.com/photo-1587393855524-087f83d95c9f?q=80&w=2864&auto=format&fit=crop' },
    { id: 3, name: 'Artisanal Cheese', price: 12.50, stock: 30, status: 'Active', category: 'Dairy', image: 'https://images.unsplash.com/photo-1618164436245-4b7b3238d3f3?q=80&w=2940&auto=format&fit=crop' },
    { id: 4, name: 'Organic Apples', price: 2.50, stock: 0, status: 'Out of Stock', category: 'Fruits', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=2874&auto=format&fit=crop' },
    { id: 5, name: 'Whole Wheat Bread', price: 4.50, stock: 45, status: 'Active', category: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2940&auto=format&fit=crop' },
    { id: 6, name: 'Fresh Carrots', price: 1.99, stock: 200, status: 'Inactive', category: 'Vegetables', image: 'https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?q=80&w=2787&auto=format&fit=crop' },
];

const statusMap = {
    'Active': { color: 'bg-green-100 text-green-800', label: 'Active' },
    'Inactive': { color: 'bg-gray-100 text-gray-800', label: 'Inactive' },
    'Out of Stock': { color: 'bg-red-100 text-red-800', label: 'Out of Stock' }
};

export default function App() {
  const [products, setProducts] = useState(sellerProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('stock-desc');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(p => filterStatus === 'All' || p.status === filterStatus)
      .sort((a, b) => {
          switch (sortBy) {
              case 'price-asc': return a.price - b.price;
              case 'price-desc': return b.price - a.price;
              case 'stock-asc': return a.stock - b.stock;
              case 'stock-desc': return b.stock - a.stock;
              default: return 0;
          }
      });
  }, [searchTerm, filterStatus, sortBy, products]);

  const handleToggleStatus = (productId) => {
      setProducts(products.map(p => {
          if (p.id === productId && p.status !== 'Out of Stock') {
              return { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' };
          }
          return p;
      }));
  };
  
  const openEditModal = (product) => {
      setSelectedProduct(product);
      setEditModalOpen(true);
  };

  const openDeleteModal = (product) => {
      setSelectedProduct(product);
      setDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-6 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Products</h1>
            <p className="mt-1 text-gray-600">Manage your inventory and product listings.</p>
          </div>
          <Link to="/seller/add-product" className="flex items-center bg-green-600 text-white font-bold py-3 px-5 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 duration-300">
            <PlusCircle className="mr-2" />
            Add New Product
          </Link>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div variants={itemVariants} className="mb-6 bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search by product name..." 
                    className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative w-1/2 md:w-auto">
                    <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                    <select 
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="appearance-none w-full p-3 pl-10 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                </div>
                 <div className="relative w-1/2 md:w-auto">
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                    <select 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none w-full p-3 pr-10 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500"
                    >
                        <option value="stock-desc">Stock: High to Low</option>
                        <option value="stock-asc">Stock: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="price-asc">Price: Low to High</option>
                    </select>
                </div>
            </div>
        </motion.div>
        
        {/* Products Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence>
                {filteredAndSortedProducts.map(product => (
                    <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        key={product.id} 
                        className="bg-white rounded-2xl shadow-md overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                    >
                        <div className="relative">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover"/>
                            <div className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-semibold ${statusMap[product.status].color}`}>
                                {statusMap[product.status].label}
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-gray-800 truncate">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.category}</p>
                            <div className="flex justify-between items-center mt-3">
                                <p className="text-xl font-bold text-green-700">${product.price.toFixed(2)}</p>
                                <p className="text-md font-semibold text-gray-700">{product.stock} <span className="text-sm font-normal text-gray-500">in stock</span></p>
                            </div>
                            <div className="mt-4 border-t pt-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-sm mr-2">Status:</span>
                                    <button onClick={() => handleToggleStatus(product.id)} disabled={product.status === 'Out of Stock'} className="disabled:opacity-50 disabled:cursor-not-allowed">
                                        {product.status === 'Active' ? <ToggleRight size={24} className="text-green-600"/> : <ToggleLeft size={24} className="text-gray-400"/>}
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => openEditModal(product)} className="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-100 rounded-full"><Edit size={18}/></button>
                                    <button onClick={() => openDeleteModal(product)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full"><Trash2 size={18}/></button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
        {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-20 col-span-full">
                <Zap size={48} className="mx-auto text-gray-300" />
                <h3 className="mt-4 text-2xl font-semibold text-gray-700">No Products Found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
        )}
      </motion.div>

      {/* Quick Edit Modal */}
      <AnimatePresence>
        {editModalOpen && selectedProduct && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
                onClick={() => setEditModalOpen(false)}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="text-xl font-bold">Edit Product</h2>
                        <button onClick={() => setEditModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100"><X size={20}/></button>
                    </div>
                    <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                        <input type="text" defaultValue={selectedProduct.name} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"/>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="number" defaultValue={selectedProduct.price} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"/>
                            <input type="number" defaultValue={selectedProduct.stock} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"/>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 border-t rounded-b-2xl text-right">
                        <button onClick={() => setEditModalOpen(false)} className="bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-green-700 transition-colors">
                            Save Changes
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

       {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalOpen && selectedProduct && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
                onClick={() => setDeleteModalOpen(false)}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="mx-auto bg-red-100 w-16 h-16 rounded-full flex items-center justify-center">
                        <Trash2 size={32} className="text-red-600"/>
                    </div>
                    <h2 className="text-2xl font-bold mt-4">Delete Product</h2>
                    <p className="text-gray-600 mt-2">Are you sure you want to delete "{selectedProduct.name}"? This action cannot be undone.</p>
                    <div className="mt-6 flex justify-center gap-4">
                        <button onClick={() => setDeleteModalOpen(false)} className="bg-gray-200 text-gray-800 font-bold py-2.5 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                            Cancel
                        </button>
                        <button onClick={() => setDeleteModalOpen(false)} className="bg-red-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-red-700 transition-colors">
                            Delete
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

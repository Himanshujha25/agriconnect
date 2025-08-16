import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, Package, Truck, CheckCircle, XCircle, ChevronDown, Eye, Edit, Trash2, X, DollarSign, User, Calendar, Info, PlusCircle } from 'lucide-react';

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

// Mock Data
const sellerOrders = [
    { id: 'ORD-001', customer: 'Jane Doe', date: '2023-10-28', total: 45.50, status: 'Shipped', items: [{name: 'Organic Tomatoes', qty: 2}, {name: 'Fresh Basil', qty: 1}] },
    { id: 'ORD-002', customer: 'John Smith', date: '2023-10-28', total: 120.00, status: 'Processing', items: [{name: 'Whole Wheat Bread', qty: 3}] },
    { id: 'ORD-003', customer: 'Emily White', date: '2023-10-27', total: 75.25, status: 'Shipped', items: [{name: 'Artisanal Cheese', qty: 1}] },
    { id: 'ORD-004', customer: 'Michael Brown', date: '2023-10-26', total: 32.00, status: 'Processing', items: [{name: 'Organic Apples', qty: 4}] },
    { id: 'ORD-005', customer: 'Sarah Wilson', date: '2023-10-25', total: 98.50, status: 'Cancelled', items: [{name: 'Free-range Eggs', qty: 2}] },
    { id: 'ORD-006', customer: 'David Lee', date: '2023-10-24', total: 64.75, status: 'Delivered', items: [{name: 'Fresh Carrots', qty: 3}] },
];

const statusMap = {
    'Processing': { icon: Package, color: 'bg-blue-100 text-blue-800' },
    'Shipped': { icon: Truck, color: 'bg-yellow-100 text-yellow-800' },
    'Delivered': { icon: CheckCircle, color: 'bg-green-100 text-green-800' },
    'Cancelled': { icon: XCircle, color: 'bg-red-100 text-red-800' }
};

export default function App() {
  const [orders, setOrders] = useState(sellerOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders
      .filter(o => o.customer.toLowerCase().includes(searchTerm.toLowerCase()) || o.id.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(o => filterStatus === 'All' || o.status === filterStatus);
  }, [searchTerm, filterStatus, orders]);

  const openDetailsModal = (order) => {
      setSelectedOrder(order);
      setDetailsModalOpen(true);
  };
  
  const updateOrderStatus = (orderId, newStatus) => {
      setOrders(orders.map(o => o.id === orderId ? {...o, status: newStatus} : o));
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Manage Orders</h1>
            <p className="mt-1 text-gray-600">View and process your customer orders.</p>
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
                    placeholder="Search by Order ID or Customer..." 
                    className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500"/>
                <select 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500"
                >
                    <option value="All">All Statuses</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>
        </motion.div>
        
        {/* Orders Table */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 font-semibold">Order ID</th>
                            <th className="p-4 font-semibold">Customer</th>
                            <th className="p-4 font-semibold">Date</th>
                            <th className="p-4 font-semibold">Total</th>
                            <th className="p-4 font-semibold text-center">Status</th>
                            <th className="p-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => {
                            const StatusIcon = statusMap[order.status]?.icon || Package;
                            const statusColor = statusMap[order.status]?.color || 'bg-gray-100 text-gray-800';
                            return (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-semibold text-gray-800">{order.id}</td>
                                    <td className="p-4">{order.customer}</td>
                                    <td className="p-4 text-gray-600">{order.date}</td>
                                    <td className="p-4 font-bold text-green-700">${order.total.toFixed(2)}</td>
                                    <td className="p-4 text-center">
                                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${statusColor}`}>
                                            <StatusIcon size={16} className="mr-2" />
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button onClick={() => openDetailsModal(order)} className="text-green-600 font-semibold hover:text-green-700 flex items-center">
                                            <Eye size={16} className="mr-1"/> View
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
             {filteredOrders.length === 0 && (
                <div className="text-center py-16">
                    <Search size={48} className="mx-auto text-gray-400" />
                    <h3 className="mt-4 text-xl font-semibold">No Orders Found</h3>
                    <p className="mt-2 text-gray-500">Try adjusting your search or filters.</p>
                </div>
            )}
        </motion.div>
      </motion.div>

       {/* Order Details Modal */}
      <AnimatePresence>
        {detailsModalOpen && selectedOrder && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
                onClick={() => setDetailsModalOpen(false)}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="text-xl font-bold">Order Details</h2>
                        <button onClick={() => setDetailsModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100"><X size={20}/></button>
                    </div>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-gray-500 font-semibold">Order ID</p>
                                <p className="font-bold text-gray-800">{selectedOrder.id}</p>
                            </div>
                             <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-gray-500 font-semibold">Order Date</p>
                                <p className="font-bold text-gray-800">{selectedOrder.date}</p>
                            </div>
                             <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-gray-500 font-semibold">Customer</p>
                                <p className="font-bold text-gray-800">{selectedOrder.customer}</p>
                            </div>
                             <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-gray-500 font-semibold">Total Amount</p>
                                <p className="font-bold text-green-700">${selectedOrder.total.toFixed(2)}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">Items</h3>
                            <div className="space-y-2">
                                {selectedOrder.items.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                                        <span>{item.name} (x{item.qty})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">Update Status</h3>
                            <div className="flex gap-2">
                                {['Processing', 'Shipped', 'Delivered'].map(status => (
                                    <button 
                                        key={status}
                                        onClick={() => updateOrderStatus(selectedOrder.id, status)}
                                        className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${selectedOrder.status === status ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 border-t rounded-b-2xl text-right">
                        <button onClick={() => setDetailsModalOpen(false)} className="bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-green-700 transition-colors">
                            Done
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

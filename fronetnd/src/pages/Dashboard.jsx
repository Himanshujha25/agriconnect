import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutGrid,
  DollarSign,
  Package,
  ShoppingCart,
  PlusCircle,
  MoreVertical,
  BarChart,
  Settings,
  LogOut
} from 'lucide-react';

// A reusable Link component placeholder
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>{children}</a>
);

// Framer Motion variants for animations
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
const stats = [
    { name: 'Total Revenue', value: '$12,450', icon: DollarSign, change: '+12.5%' },
    { name: 'Active Listings', value: '32', icon: Package, change: '+2' },
    { name: 'Pending Orders', value: '8', icon: ShoppingCart, change: '-1' },
    { name: 'Analytics', value: 'View', icon: BarChart, change: '' },
];

const recentOrders = [
    { id: 'ORD-001', customer: 'Jane Doe', amount: '$45.50', status: 'Shipped' },
    { id: 'ORD-002', customer: 'John Smith', amount: '$120.00', status: 'Processing' },
    { id: 'ORD-003', customer: 'Emily White', amount: '$75.25', status: 'Shipped' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="flex">
        {/* Sidebar - could be made collapsible in a real app */}
        <aside className="w-64 bg-white shadow-md hidden lg:block">
            <div className="p-6">
                 <Link to="/" className="flex items-center space-x-2 text-green-700">
                    <LayoutGrid size={28} />
                    <span className="text-2xl font-bold">Dashboard</span>
                </Link>
            </div>
            <nav className="mt-6">
                <Link to="#" className="flex items-center px-6 py-3 text-gray-700 bg-gray-100 font-semibold"><LayoutGrid className="mr-3" /> Overview</Link>
                <Link to="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"><Package className="mr-3" /> Products</Link>
                <Link to="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"><ShoppingCart className="mr-3" /> Orders</Link>
                <Link to="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"><BarChart className="mr-3" /> Analytics</Link>
                <Link to="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"><Settings className="mr-3" /> Settings</Link>
            </nav>
            <div className="absolute bottom-0 w-64">
                 <Link to="#" className="flex items-center px-6 py-4 text-gray-600 hover:bg-gray-50 border-t"><LogOut className="mr-3" /> Logout</Link>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Welcome, Farmer John!</h1>
                <p className="mt-2 text-gray-600">Here's what's happening with your farm today.</p>
              </div>
              <button className="mt-4 sm:mt-0 flex items-center bg-green-600 text-white font-bold py-3 px-5 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 duration-300">
                <PlusCircle className="mr-2" />
                Add New Product
              </button>
            </motion.div>

            {/* Stats Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-between items-start">
                    <stat.icon className="h-8 w-8 text-green-600" />
                    <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{stat.change}</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-gray-500">{stat.name}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Recent Orders Table */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                <th className="p-4 font-semibold">Order ID</th>
                                <th className="p-4 font-semibold">Customer</th>
                                <th className="p-4 font-semibold">Amount</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map(order => (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{order.id}</td>
                                    <td className="p-4">{order.customer}</td>
                                    <td className="p-4 font-medium">{order.amount}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === 'Shipped' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4"><button><MoreVertical size={20} className="text-gray-500" /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  DollarSign,
  Package,
  ShoppingCart,
  PlusCircle,
  BarChart,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck
} from 'lucide-react';

// Ek reusable Link component placeholder
const Link = ({ to, children, className, onClick }) => (
  <a href={to} className={className} onClick={onClick}>{children}</a>
);

// Enhanced Mock Data
const generateMockStats = () => [
  { 
    name: 'Kul Aay (Total Revenue)', 
    value: '₹2,45,800', 
    icon: DollarSign, 
    change: '+18.2%', 
    changeType: 'positive',
    description: 'pichhle mahine se'
  },
  { 
    name: 'Active Listings', 
    value: '47', 
    icon: Package, 
    change: '+5', 
    changeType: 'positive',
    description: 'products listed'
  },
  { 
    name: 'Pending Orders', 
    value: '12', 
    icon: ShoppingCart, 
    change: '-3', 
    changeType: 'negative',
    description: 'dhyan dene ki zarurat'
  },
  { 
    name: 'Kul Grahak (Total Customers)', 
    value: '1,284', 
    icon: Users, 
    change: '+12.5%', 
    changeType: 'positive',
    description: 'active khareedar'
  },
];

const generateMockOrders = () => [
  { 
    id: 'ORD-1001', 
    customer: 'Sarah Johnson', 
    customerEmail: 'sarah.j@email.com',
    amount: '₹14,550', 
    status: 'Shipped', 
    product: 'Organic Tomatoes (5kg)',
    orderDate: '2024-01-15',
    priority: 'high'
  },
  { 
    id: 'ORD-1002', 
    customer: 'Michael Chen', 
    customerEmail: 'm.chen@email.com',
    amount: '₹32,000', 
    status: 'Processing', 
    product: 'Premium Wheat (25kg)',
    orderDate: '2024-01-14',
    priority: 'medium'
  },
  { 
    id: 'ORD-1003', 
    customer: 'Emily Rodriguez', 
    customerEmail: 'emily.r@email.com',
    amount: '₹8,725', 
    status: 'Shipped', 
    product: 'Fresh Lettuce Bundle',
    orderDate: '2024-01-13',
    priority: 'low'
  },
  { 
    id: 'ORD-1004', 
    customer: 'David Wilson', 
    customerEmail: 'd.wilson@email.com',
    amount: '₹21,075', 
    status: 'Pending', 
    product: 'Organic Vegetables Mix',
    orderDate: '2024-01-12',
    priority: 'high'
  },
  { 
    id: 'ORD-1005', 
    customer: 'Lisa Anderson', 
    customerEmail: 'l.anderson@email.com',
    amount: '₹9,630', 
    status: 'Processing', 
    product: 'Farm Fresh Eggs (2 dozens)',
    orderDate: '2024-01-11',
    priority: 'medium'
  },
  { 
    id: 'ORD-1006', 
    customer: 'James Thompson', 
    customerEmail: 'j.thompson@email.com',
    amount: '₹17,890', 
    status: 'Delivered', 
    product: 'Seasonal Fruit Box',
    orderDate: '2024-01-10',
    priority: 'low'
  }
];

const generateMockProducts = () => [
  { id: 1, name: 'Organic Tomatoes', stock: 150, price: '₹550/kg', status: 'In Stock' },
  { id: 2, name: 'Premium Wheat', stock: 75, price: '₹320/kg', status: 'Low Stock' },
  { id: 3, name: 'Fresh Lettuce', stock: 200, price: '₹280/bunch', status: 'In Stock' },
  { id: 4, name: 'Farm Eggs', stock: 45, price: '₹450/dozen', status: 'Low Stock' },
  { id: 5, name: 'Organic Carrots', stock: 0, price: '₹375/kg', status: 'Out of Stock' },
];

const sidebarItems = [
  { icon: LayoutGrid, label: 'Overview', href: '#overview', active: true },
  { icon: Package, label: 'Products', href: '#products', active: false },
  { icon: ShoppingCart, label: 'Orders', href: '#orders', active: false },
  { icon: BarChart, label: 'Analytics', href: '#analytics', active: false },
  { icon: Settings, label: 'Settings', href: '#settings', active: false },
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  // Data aur real-time clock ko initialize karein
  useEffect(() => {
    setStats(generateMockStats());
    setOrders(generateMockOrders());
    setProducts(generateMockProducts());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: `Naya Product ${products.length + 1}`,
      stock: Math.floor(Math.random() * 200) + 50,
      price: `₹${(Math.random() * 1000 + 200).toFixed(2)}/kg`,
      status: 'In Stock'
    };
    setProducts([...products, newProduct]);
    alert(`Naya product "${newProduct.name}" safaltapoorvak joda gaya!`);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    alert(`Order Details:\n\nOrder ID: ${order.id}\nGrahak: ${order.customer}\nEmail: ${order.customerEmail}\nProduct: ${order.product}\nAmount: ${order.amount}\nStatus: ${order.status}\nTarikh: ${order.orderDate}`);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    alert(`Order ${orderId} ka status update ho gaya hai: ${newStatus}`);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('⚠️Kya aap sach mein logout karna chahte hain?');
    if (confirmLogout) {
      alert('Alvida! Logout ho raha hai...');
      // Real app mein: window.location.href = '/login'
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Shipped': return <Truck size={16} />;
      case 'Delivered': return <CheckCircle size={16} />;
      case 'Processing': return <Clock size={16} />;
      case 'Pending': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 transition-transform duration-300 ease-in-out
        `}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Link to="/" className="flex items-center space-x-3 text-green-700 group">
              <div className="p-2 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors duration-300">
                <LayoutGrid size={24} className="text-green-600" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                  Dashboard
                </span>
                <div className="text-xs text-gray-500 font-medium -mt-1">Seller Panel</div>
              </div>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Live Clock */}
          <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="text-center">
              <div className="text-sm text-gray-600 font-medium">Abhi ka Samay</div>
              <div className="text-lg font-bold text-green-700 font-mono">
                {formatTime(currentTime)}
              </div>
              <div className="text-xs text-gray-500">
                {currentTime.toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-4 space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveTab(item.label.toLowerCase());
                  setSidebarOpen(false);
                  alert(`📂 ${item.label} section par ja rahe hain...`);
                }}
                className={`
                  flex items-center w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 group text-left
                  ${item.active 
                    ? 'bg-green-50 text-green-700 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon size={20} className={`mr-3 transition-colors duration-300 ${
                  item.active ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                {item.label}
                {item.active && (
                  <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button 
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition-all duration-300 group"
            >
              <LogOut size={20} className="mr-3 text-gray-400 group-hover:text-red-500 transition-colors duration-300" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Top Bar */}
          <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu size={20} />
                </button>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-semibold text-gray-900">Seller Dashboard</h1>
                  <p className="text-sm text-gray-500">Apne farm business ko manage karein</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden md:block text-right">
                  <p className="text-sm text-gray-500">Swagat hai,</p>
                  <p className="font-semibold text-gray-900">Kisan John 👨‍🌾</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                  KJ
                </div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div className="mb-6 lg:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Swagat hai, Kisan John! 👋
                </h1>
                <p className="text-lg text-gray-600">Aapke farm par aaj kya ho raha hai, yahan dekhein.</p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    System Online
                  </div>
                  <div className="text-sm text-gray-500">
                    Last updated: {formatTime(currentTime)}
                  </div>
                </div>
              </div>
              <button 
                onClick={handleAddProduct}
                className="flex items-center bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 group"
              >
                <PlusCircle size={20} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Naya Product Jodein
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group cursor-pointer"
                  onClick={() => alert(`📊 ${stat.name} Details:\n\nValue: ${stat.value}\nBadlav: ${stat.change}\n${stat.description}`)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl group-hover:from-green-100 group-hover:to-green-200 transition-all duration-300">
                      <stat.icon size={24} className="text-green-600" />
                    </div>
                    {stat.change && (
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-sm font-semibold ${
                        stat.changeType === 'positive' 
                          ? 'text-green-700 bg-green-100' 
                          : stat.changeType === 'negative'
                          ? 'text-red-700 bg-red-100'
                          : 'text-gray-700 bg-gray-100'
                      }`}>
                        {stat.changeType === 'positive' && <TrendingUp size={16} />}
                        {stat.changeType === 'negative' && <TrendingDown size={16} />}
                        <span>{stat.change}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-gray-600 font-medium">{stat.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Haal ke Orders</h2>
                    <p className="text-sm text-gray-500 mt-1">{orders.length} kul orders</p>
                  </div>
                  <button 
                    onClick={() => alert(`📋 Sabhi Orders:\n\nKul: ${orders.length}\nShipped: ${orders.filter(o => o.status === 'Shipped').length}\nProcessing: ${orders.filter(o => o.status === 'Processing').length}\nPending: ${orders.filter(o => o.status === 'Pending').length}`)}
                    className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center space-x-1 hover:underline transition-colors duration-300"
                  >
                    <Eye size={16} />
                    <span>Sabhi Dekhein</span>
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left p-4 font-semibold text-gray-700">Order ID</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Grahak</th>
                      <th className="text-left p-4 font-semibold text-gray-700 hidden lg:table-cell">Product</th>
                      <th className="text-left p-4 font-semibold text-gray-700 hidden sm:table-cell">Tarikh</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Rashi</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr 
                        key={order.id} 
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 group"
                      >
                        <td className="p-4">
                          <span className="font-mono text-sm font-semibold text-gray-900">{order.id}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {order.customer.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <span className="font-medium text-gray-900 block">{order.customer}</span>
                              <span className="text-xs text-gray-500">{order.customerEmail}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <span className="text-gray-600 text-sm">{order.product}</span>
                        </td>
                        <td className="p-4 hidden sm:table-cell">
                          <span className="text-gray-600 text-sm">{order.orderDate}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-gray-900">{order.amount}</span>
                        </td>
                        <td className="p-4">
                          <span className={`
                            px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center
                            ${getStatusColor(order.status)}
                          `}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1">{order.status}</span>
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleViewOrder(order)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                              title="Order Dekhein"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={() => {
                                const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
                                const currentIndex = statuses.indexOf(order.status);
                                const nextStatus = statuses[currentIndex + 1] || statuses[0];
                                handleUpdateOrderStatus(order.id, nextStatus);
                              }}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                              title="Status Update Karein"
                            >
                              <CheckCircle size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{orders.length} orders dikhaye ja rahe hain</span>
                  <button 
                    onClick={() => alert('🔄 Orders refresh ho rahe hain...')}
                    className="text-green-600 hover:text-green-700 font-medium hover:underline"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Quick Add Product</h3>
                <p className="text-green-100 text-sm mb-4">Apne inventory mein naye products jodein</p>
                <button 
                  onClick={handleAddProduct}
                  className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors"
                >
                  Product Jodein
                </button>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Analytics Dekhein</h3>
                <p className="text-blue-100 text-sm mb-4">Apne sales performance ko check karein</p>
                <button 
                  onClick={() => alert('📈 Analytics: Is mahine sales 25% badhi hai!')}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Stats Dekhein
                </button>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Inventory Manage Karein</h3>
                <p className="text-purple-100 text-sm mb-4">Stock aur pricing update karein</p>
                <button 
                  onClick={() => alert(`📦 Inventory Summary:\n\n${products.map(p => `${p.name}: ${p.stock} units (${p.status})`).join('\n')}`)}
                  className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                >
                  Stock Manage Karein
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import {
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  FileText,
  Search,
  Filter,
  Calendar,
  Download,
  Eye,
  RotateCcw,
  MapPin,
  Clock,
  Star,
  ChevronDown,
  ChevronRight,
  Phone,
  MessageCircle,
  CreditCard,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  User,
  Menu,
  X
} from 'lucide-react';

// Mock Data
const allOrders = [
  {
    id: 'ORD-1008',
    date: '2024-08-16',
    orderTime: '14:30',
    total: 1820,
    status: 'Out for Delivery',
    estimatedDelivery: '2024-08-17',
    deliverySlot: '10:00 AM - 12:00 PM',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    items: [
      {name: 'Fresh Strawberries', qty: 2, price: 599, image: 'https://images.unsplash.com/photo-1587393855524-087f83d95c9f?w=100&h=100&fit=crop', farmer: 'Sunny Acres'},
      {name: 'Organic Milk', qty: 1, price: 85, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100&h=100&fit=crop', farmer: 'Happy Cow Dairy'},
      {name: 'Artisanal Cheese', qty: 1, price: 450, image: 'https://images.unsplash.com/photo-1618164436245-4b7b3238d3f3?w=100&h=100&fit=crop', farmer: 'Alpine Dairy'}
    ],
    deliveryAddress: 'House No. 123, Sector 15, Ghaziabad, UP - 201001',
    driverInfo: { name: 'Rajesh Kumar', phone: '+91 98765 43210', vehicle: 'DL-01-AB-1234' },
    trackingSteps: [
      { status: 'Order Placed', time: '2024-08-16 14:30', completed: true },
      { status: 'Order Confirmed', time: '2024-08-16 14:45', completed: true },
      { status: 'Preparing', time: '2024-08-16 15:30', completed: true },
      { status: 'Out for Delivery', time: '2024-08-17 09:15', completed: true },
      { status: 'Delivered', time: '', completed: false }
    ]
  },
  {
    id: 'ORD-1007',
    date: '2024-08-15',
    orderTime: '11:15',
    total: 1247,
    status: 'Delivered',
    deliveredAt: '2024-08-15 18:30',
    deliverySlot: '06:00 PM - 08:00 PM',
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    rating: 5,
    items: [
      {name: 'Organic Tomatoes', qty: 3, price: 299, image: 'https://images.unsplash.com/photo-1588694853939-a8f543a19074?w=100&h=100&fit=crop', farmer: 'Green Valley'},
      {name: 'Whole Wheat Bread', qty: 1, price: 65, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop', farmer: 'Artisan Bakery'},
      {name: 'Fresh Basil', qty: 1, price: 120, image: 'https://images.unsplash.com/photo-1628176503652-9b72d0d1a7dd?w=100&h=100&fit=crop', farmer: 'Herb Garden'}
    ],
    deliveryAddress: 'House No. 123, Sector 15, Ghaziabad, UP - 201001',
    canReorder: true,
    canRate: false
  },
  {
    id: 'ORD-1006',
    date: '2024-08-14',
    orderTime: '16:45',
    total: 685,
    status: 'Delivered',
    deliveredAt: '2024-08-14 20:15',
    deliverySlot: '08:00 PM - 10:00 PM',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Paid',
    rating: 4,
    items: [
      {name: 'Artisanal Goat Cheese', qty: 1, price: 685, image: 'https://images.unsplash.com/photo-1618164436245-4b7b3238d3f3?w=100&h=100&fit=crop', farmer: 'Mountain Dairy'}
    ],
    deliveryAddress: 'House No. 123, Sector 15, Ghaziabad, UP - 201001',
    canReorder: true,
    canRate: false
  },
  {
    id: 'ORD-1005',
    date: '2024-08-12',
    orderTime: '09:30',
    total: 2440,
    status: 'Cancelled',
    cancelledAt: '2024-08-12 10:15',
    cancelReason: 'Items out of stock',
    paymentMethod: 'UPI',
    paymentStatus: 'Refunded',
    refundAmount: 2440,
    items: [
      {name: 'Free-range Eggs', qty: 2, price: 180, image: 'https://images.unsplash.com/photo-1581781870027-04fa5dd1c68c?w=100&h=100&fit=crop', farmer: 'Natural Farms'},
      {name: 'Assorted Vegetables Box', qty: 1, price: 850, image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=100&h=100&fit=crop', farmer: 'Fresh Farm Co'},
      {name: 'Organic Rice', qty: 2, price: 450, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop', farmer: 'Heritage Grains'}
    ],
    deliveryAddress: 'House No. 123, Sector 15, Ghaziabad, UP - 201001'
  },
  {
    id: 'ORD-1004',
    date: '2024-08-10',
    orderTime: '12:20',
    total: 1476,
    status: 'Processing',
    estimatedDelivery: '2024-08-18',
    deliverySlot: '02:00 PM - 04:00 PM',
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    items: [
      {name: 'Organic Apples', qty: 5, price: 199, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100&h=100&fit=crop', farmer: 'Hill Orchards'},
      {name: 'Local Honey', qty: 1, price: 380, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=100&h=100&fit=crop', farmer: 'Bee Happy'}
    ],
    deliveryAddress: 'House No. 123, Sector 15, Ghaziabad, UP - 201001',
    trackingSteps: [
      { status: 'Order Placed', time: '2024-08-10 12:20', completed: true },
      { status: 'Order Confirmed', time: '2024-08-10 12:35', completed: true },
      { status: 'Preparing', time: '', completed: false },
      { status: 'Out for Delivery', time: '', completed: false },
      { status: 'Delivered', time: '', completed: false }
    ]
  }
];

const statusConfig = {
  'Processing': { icon: Package, color: 'bg-blue-50 text-blue-700 border-blue-200', dotColor: 'bg-blue-500' },
  'Out for Delivery': { icon: Truck, color: 'bg-orange-50 text-orange-700 border-orange-200', dotColor: 'bg-orange-500' },
  'Delivered': { icon: CheckCircle, color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dotColor: 'bg-emerald-500' },
  'Cancelled': { icon: XCircle, color: 'bg-red-50 text-red-700 border-red-200', dotColor: 'bg-red-500' }
};

export default function OrdersPage() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dateRange, setDateRange] = useState('all');

  const filterCounts = useMemo(() => {
    const counts = { All: allOrders.length };
    allOrders.forEach(order => {
      counts[order.status] = (counts[order.status] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredOrders = useMemo(() => {
    let filtered = allOrders;
    
    if (filter !== 'All') {
      filtered = filtered.filter(order => order.status === filter);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.farmer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    if (dateRange !== 'all') {
      const now = new Date();
      const days = parseInt(dateRange);
      const cutoff = new Date(new Date().setDate(now.getDate() - days));
      filtered = filtered.filter(order => new Date(order.date) >= cutoff);
    }
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date + ' ' + b.orderTime) - new Date(a.date + ' ' + a.orderTime);
        case 'date-asc':
          return new Date(a.date + ' ' + a.orderTime) - new Date(b.date + ' ' + b.orderTime);
        case 'amount-desc':
          return b.total - a.total;
        case 'amount-asc':
          return a.total - b.total;
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });
  }, [filter, searchQuery, sortBy, dateRange]);

  const reorderItems = (orderId) => {
    const order = allOrders.find(o => o.id === orderId);
    if (order) {
      alert(`Added ${order.items.length} items to cart from order ${orderId}`);
    }
  };

  const downloadInvoice = (orderId) => {
    alert(`Downloading invoice for order ${orderId}`);
  };

  const trackOrder = (order) => {
    setSelectedOrder(order);
  };

  const rateOrder = (orderId) => {
    alert(`Opening rating dialog for order ${orderId}`);
  };

  const cancelOrder = (orderId) => {
    if (confirm('Are you sure you want to cancel this order?')) {
      alert(`Order ${orderId} has been cancelled`);
    }
  };

  const contactSupport = (orderId) => {
    alert(`Opening support chat for order ${orderId}`);
  };

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Orders
              </button>
              <h1 className="text-xl font-bold text-slate-900">Track Order {selectedOrder.id}</h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Order {selectedOrder.id}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    Placed on {selectedOrder.date} at {selectedOrder.orderTime}
                  </div>
                  <div className="flex items-center">
                    <CreditCard size={16} className="mr-1" />
                    {selectedOrder.paymentMethod} - {selectedOrder.paymentStatus}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-slate-900">₹{selectedOrder.total}</p>
                <p className="text-slate-600">{selectedOrder.items.length} items</p>
              </div>
            </div>
          </div>

          {selectedOrder.trackingSteps && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Order Timeline</h3>
              <div className="space-y-6">
                {selectedOrder.trackingSteps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-4 flex-shrink-0 ${
                      step.completed ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold ${step.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                          {step.status}
                        </h4>
                        {step.time && (
                          <span className="text-sm text-slate-500">{step.time}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedOrder.status === 'Out for Delivery' && selectedOrder.driverInfo && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Delivery Partner</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{selectedOrder.driverInfo.name}</p>
                    <p className="text-sm text-slate-600">{selectedOrder.driverInfo.vehicle}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="p-3 bg-emerald-100 text-emerald-600 rounded-xl hover:bg-emerald-200 transition-colors">
                    <Phone size={18} />
                  </button>
                  <button className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors">
                    <MessageCircle size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Delivery Address</h3>
            <div className="flex items-start">
              <MapPin className="text-slate-400 mt-1 mr-3 flex-shrink-0" size={20} />
              <p className="text-slate-700">{selectedOrder.deliveryAddress}</p>
            </div>
            {selectedOrder.deliverySlot && (
              <div className="flex items-center mt-4">
                <Clock className="text-slate-400 mr-3" size={20} />
                <p className="text-slate-700">
                  Delivery Slot: {selectedOrder.deliverySlot}
                  {selectedOrder.estimatedDelivery && (
                    <span className="ml-2 text-emerald-600">
                      ({selectedOrder.estimatedDelivery})
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Order Items</h3>
            <div className="space-y-4">
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.name}</h4>
                      <p className="text-sm text-emerald-600">{item.farmer}</p>
                      <p className="text-sm text-slate-600">Quantity: {item.qty}</p>
                    </div>
                  </div>
                  <p className="font-bold text-slate-900">₹{item.price * item.qty}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t border-slate-200 mt-6 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-slate-900">Total Amount</span>
                <span className="text-2xl font-bold text-emerald-600">₹{selectedOrder.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                FarmFresh
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-3 cursor-pointer group">
                <div className="w-9 h-9 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <User size={18} className="text-white" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-slate-700">Jane Cooper</span>
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
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-3">My Orders</h1>
          <p className="text-slate-600 text-lg">Track and manage all your orders in one place</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders by ID, items, or farmer..." 
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200" 
              />
            </div>

            <div className="flex gap-3">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white min-w-[160px]"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Highest Amount</option>
                <option value="amount-asc">Lowest Amount</option>
                <option value="status">By Status</option>
              </select>

              <select 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white min-w-[120px]"
              >
                <option value="all">All Time</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 3 months</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {['All', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'].map(status => (
              <button 
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 ${
                  filter === status 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{status}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  filter === status 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {filterCounts[status] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredOrders.length > 0 ? filteredOrders.map(order => {
            const StatusIcon = statusConfig[order.status]?.icon || Package;
            const statusStyle = statusConfig[order.status]?.color || 'bg-slate-50 text-slate-700 border-slate-200';
            
            return (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <span className={`inline-flex px-3 py-2 rounded-xl text-sm font-semibold border ${statusStyle}`}>
                          <StatusIcon className="mr-2" size={16} />
                          {order.status}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Order {order.id}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-slate-600">
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {order.date} at {order.orderTime}
                          </span>
                          <span>{order.items.length} items</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">₹{order.total}</p>
                      <p className="text-sm text-slate-600">{order.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {order.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900 truncate">{item.name}</p>
                          <p className="text-sm text-emerald-600">{item.farmer}</p>
                          <p className="text-sm text-slate-600">Qty: {item.qty}</p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="flex items-center justify-center p-3 bg-slate-50 rounded-xl">
                        <span className="text-slate-600 font-medium">+{order.items.length - 3} more items</span>
                      </div>
                    )}
                  </div>

                  {order.status === 'Delivered' && order.deliveredAt && (
                    <div className="bg-emerald-50 border-l-4 border-emerald-400 text-emerald-800 p-4 rounded-r-lg mb-6">
                      <div className="flex items-center">
                        <CheckCircle2 size={20} className="mr-3" />
                        <p>Delivered on {new Date(order.deliveredAt).toLocaleDateString()} at {new Date(order.deliveredAt).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  )}

                  {order.status === 'Cancelled' && order.cancelledAt && (
                    <div className="bg-red-50 border-l-4 border-red-400 text-red-800 p-4 rounded-r-lg mb-6">
                       <div className="flex items-center">
                        <AlertCircle size={20} className="mr-3" />
                        <div>
                          <p>Cancelled on {new Date(order.cancelledAt).toLocaleDateString()}</p>
                          <p className="text-sm">Reason: {order.cancelReason}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => trackOrder(order)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold flex items-center space-x-2 hover:bg-emerald-700 transition-colors">
                      <Eye size={16} />
                      <span>Track Order</span>
                    </button>
                    <button onClick={() => downloadInvoice(order.id)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold flex items-center space-x-2 hover:bg-slate-50 transition-colors">
                      <Download size={16} />
                      <span>Invoice</span>
                    </button>
                    {order.canReorder && (
                      <button onClick={() => reorderItems(order.id)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold flex items-center space-x-2 hover:bg-slate-50 transition-colors">
                        <RefreshCw size={16} />
                        <span>Reorder</span>
                      </button>
                    )}
                     {order.canRate && (
                      <button onClick={() => rateOrder(order.id)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold flex items-center space-x-2 hover:bg-slate-50 transition-colors">
                        <Star size={16} />
                        <span>Rate Order</span>
                      </button>
                    )}
                     {order.status === 'Processing' && (
                      <button onClick={() => cancelOrder(order.id)} className="px-4 py-2 bg-red-50 text-red-700 rounded-lg font-semibold flex items-center space-x-2 hover:bg-red-100 transition-colors">
                        <XCircle size={16} />
                        <span>Cancel Order</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          }) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
              <Search size={56} className="mx-auto text-slate-300" />
              <h3 className="mt-6 text-2xl font-bold text-slate-800">No Orders Found</h3>
              <p className="mt-2 text-slate-500">Your search and filter combination did not return any results.</p>
              <button onClick={() => { setSearchQuery(''); setFilter('All'); }} className="mt-6 px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold flex items-center space-x-2 mx-auto hover:bg-emerald-700 transition-colors">
                <RotateCcw size={16} />
                <span>Clear Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

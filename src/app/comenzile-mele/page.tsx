'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import { useAuth } from '@/lib/authContext';
import { getUserOrders, getOrderById, cancelOrder, OrderStatus } from '@/lib/api/orders';
import Link from 'next/link';
import Image from 'next/image';

// Custom PageHeader wrapper
const OrdersPageHeader = () => {
  return (
    <div className="relative py-20 bg-[#f0efed]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-[#404040] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Comenzile Mele
          </motion.h1>
          
          <motion.p 
            className="text-xl text-[#696969]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Istoricul și detaliile comenzilor tale
          </motion.p>
        </div>
      </div>
    </div>
  );
};

const OrdersPage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
  
  // Fetch orders when component mounts
  useEffect(() => {
    // Only fetch if user is logged in
    if (user) {
      fetchOrders();
    } else if (!isLoading && !user) {
      // Redirect to login if not logged in
      router.push('/cont');
    }
  }, [user, isLoading, router]);
  
  // Fetch orders
  const fetchOrders = async () => {
    try {
      const data = await getUserOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get status color and label
  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          label: 'În așteptare'
        };
      case 'processing':
        return {
          color: 'bg-blue-100 text-blue-800',
          label: 'În procesare'
        };
      case 'shipped':
        return {
          color: 'bg-indigo-100 text-indigo-800',
          label: 'Expediat'
        };
      case 'delivered':
        return {
          color: 'bg-green-100 text-green-800',
          label: 'Livrat'
        };
      case 'cancelled':
        return {
          color: 'bg-red-100 text-red-800',
          label: 'Anulat'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          label: 'Necunoscut'
        };
    }
  };
  
  // View order details
  const handleViewOrder = async (id: string) => {
    try {
      const orderDetails = await getOrderById(id);
      setSelectedOrder(orderDetails);
      setIsOrderModalOpen(true);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };
  
  // Cancel order
  const handleCancelOrder = async () => {
    if (!orderToCancel) return;
    
    setIsCancelling(true);
    
    try {
      await cancelOrder(orderToCancel);
      
      // Update local state
      setOrders(prev => 
        prev.map(order => 
          order.id === orderToCancel 
            ? { ...order, status: 'cancelled' } 
            : order
        )
      );
      
      // If the cancelled order is currently open in modal, update it
      if (selectedOrder && selectedOrder.id === orderToCancel) {
        setSelectedOrder({ ...selectedOrder, status: 'cancelled' });
      }
      
      // Reset state
      setOrderToCancel(null);
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Nu se poate anula comanda. Este posibil să fie deja expediată sau livrată.');
    } finally {
      setIsCancelling(false);
    }
  };
  
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-[#f8f8f6]">
        <Navbar />
        
        <OrdersPageHeader />
        
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#404040]">Istoricul Comenzilor</h2>
            </div>
            
            {orders.length === 0 ? (
              <GlassCard className="p-8 text-center">
                <p className="text-[#696969] mb-4">Nu ai nicio comandă în istoric.</p>
                <Link 
                  href="/produse"
                  className="px-6 py-2 bg-[#8a7d65] text-white rounded-full hover:bg-[#8a7d65]/90 transition-colors inline-flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Comenzi acum
                </Link>
              </GlassCard>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const { color, label } = getStatusInfo(order.status as OrderStatus);
                  return (
                    <GlassCard key={order.id} className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-bold text-[#404040]">Comanda #{order.id.substring(0, 8)}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
                              {label}
                            </span>
                          </div>
                          
                          <p className="text-[#696969] text-sm mt-1">
                            {formatDate(order.created_at)}
                          </p>
                          
                          <p className="font-medium text-[#404040] mt-2">
                            {order.total_amount.toFixed(2)} lei
                          </p>
                          
                          <p className="text-sm text-[#696969] mt-1">
                            {order.order_items ? `${order.order_items.length} produse` : '0 produse'}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <button 
                            onClick={() => handleViewOrder(order.id)}
                            className="px-4 py-2 border border-[#8a7d65] text-[#8a7d65] rounded-full hover:bg-[#8a7d65]/10 transition-colors text-sm"
                          >
                            Vezi detalii
                          </button>
                          
                          {(order.status === 'pending' || order.status === 'processing') && (
                            <button 
                              onClick={() => setOrderToCancel(order.id)}
                              className="px-4 py-2 border border-red-300 text-red-500 rounded-full hover:bg-red-50 transition-colors text-sm"
                            >
                              Anulează
                            </button>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            )}
          </div>
        </section>
        
        {/* Navigation back to account */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            <Link 
              href="/cont"
              className="inline-flex items-center text-[#8a7d65] hover:underline"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Înapoi la contul meu
            </Link>
          </div>
        </section>
        
        {/* Order Details Modal */}
        {isOrderModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-[#404040]">
                    Detalii Comandă #{selectedOrder.id.substring(0, 8)}
                  </h3>
                  
                  <button 
                    onClick={() => setIsOrderModalOpen(false)}
                    className="text-[#696969] hover:text-[#404040]"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(selectedOrder.status as OrderStatus).color}`}>
                    {getStatusInfo(selectedOrder.status as OrderStatus).label}
                  </span>
                  
                  <span className="text-[#696969]">
                    Data: {formatDate(selectedOrder.created_at)}
                  </span>
                </div>
                
                {/* Order Items */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-[#404040] mb-4">Produse comandate</h4>
                  
                  <div className="space-y-4">
                    {selectedOrder.order_items && selectedOrder.order_items.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 border border-[#e6e5e3] rounded-lg">
                        <div className="w-16 h-16 bg-[#f0efed] rounded overflow-hidden relative flex-shrink-0">
                          {item.product_image ? (
                            <Image
                              src={item.product_image}
                              alt={item.product_name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-8 h-8 text-[#c3beb4]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-grow">
                          <h5 className="font-medium text-[#404040]">{item.product_name}</h5>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm text-[#696969]">
                              {item.quantity} x {item.unit_price.toFixed(2)} lei
                            </span>
                            <span className="font-medium text-[#404040]">
                              {item.total_price.toFixed(2)} lei
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Order Addresses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Shipping Address */}
                  {selectedOrder.shipping_address && (
                    <div>
                      <h4 className="text-lg font-bold text-[#404040] mb-2">Adresa de livrare</h4>
                      <div className="p-4 border border-[#e6e5e3] rounded-lg">
                        <p className="font-medium">{selectedOrder.shipping_address.name}</p>
                        <p>{selectedOrder.shipping_address.address_line1}</p>
                        {selectedOrder.shipping_address.address_line2 && (
                          <p>{selectedOrder.shipping_address.address_line2}</p>
                        )}
                        <p>{selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.county}</p>
                        <p>{selectedOrder.shipping_address.postal_code}</p>
                        <p>{selectedOrder.shipping_address.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Billing Address */}
                  {selectedOrder.billing_address && (
                    <div>
                      <h4 className="text-lg font-bold text-[#404040] mb-2">Adresa de facturare</h4>
                      <div className="p-4 border border-[#e6e5e3] rounded-lg">
                        <p className="font-medium">{selectedOrder.billing_address.name}</p>
                        <p>{selectedOrder.billing_address.address_line1}</p>
                        {selectedOrder.billing_address.address_line2 && (
                          <p>{selectedOrder.billing_address.address_line2}</p>
                        )}
                        <p>{selectedOrder.billing_address.city}, {selectedOrder.billing_address.county}</p>
                        <p>{selectedOrder.billing_address.postal_code}</p>
                        <p>{selectedOrder.billing_address.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Order Summary */}
                <div className="border-t border-[#e6e5e3] pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#696969]">Subtotal:</span>
                    <span className="text-[#404040]">
                      {(selectedOrder.total_amount - selectedOrder.shipping_cost).toFixed(2)} lei
                    </span>
                  </div>
                  
                  <div className="flex justify-between mb-4">
                    <span className="text-[#696969]">Cost livrare:</span>
                    <span className="text-[#404040]">
                      {selectedOrder.shipping_cost.toFixed(2)} lei
                    </span>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{selectedOrder.total_amount.toFixed(2)} lei</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="mt-8 flex justify-end gap-4">
                  <button
                    onClick={() => setIsOrderModalOpen(false)}
                    className="px-6 py-2 border border-[#e6e5e3] text-[#696969] rounded-full hover:bg-[#f0efed] transition-colors"
                  >
                    Închide
                  </button>
                  
                  {(selectedOrder.status === 'pending' || selectedOrder.status === 'processing') && (
                    <button
                      onClick={() => {
                        setOrderToCancel(selectedOrder.id);
                        setIsOrderModalOpen(false);
                      }}
                      className="px-6 py-2 border border-red-300 text-red-500 rounded-full hover:bg-red-50 transition-colors"
                    >
                      Anulează comanda
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Cancel Confirmation Modal */}
        {orderToCancel && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-[#404040] mb-4">Confirmă anularea</h3>
              
              <p className="text-[#696969] mb-6">
                Ești sigur că vrei să anulezi această comandă? Această acțiune nu poate fi anulată.
              </p>
              
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setOrderToCancel(null)}
                  className="px-6 py-2 border border-[#e6e5e3] text-[#696969] rounded-full hover:bg-[#f0efed] transition-colors"
                  disabled={isCancelling}
                >
                  Nu
                </button>
                
                <button
                  onClick={handleCancelOrder}
                  disabled={isCancelling}
                  className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  {isCancelling ? 'Se anulează...' : 'Da, anulează'}
                </button>
              </div>
            </div>
          </div>
        )}
        
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
};

export default OrdersPage; 
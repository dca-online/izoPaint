'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaArrowRight, FaShoppingBag, FaLock } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import { fadeIn } from '@/utils/motion';
import BackgroundVideo from '@/components/BackgroundVideo';

// Mock cart items
type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

// Mobile Navigation Pills
const MobileNavPills = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show pills when scrolled down past the hero section
      if (window.scrollY > window.innerHeight * 0.7) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 sm:hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20,
        pointerEvents: isVisible ? 'auto' : 'none' 
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex space-x-3 bg-white/80 backdrop-blur-lg p-2 rounded-full shadow-lg border border-[#e6e5e3]">
        <Link href="/cont" className="px-4 py-2 bg-[#e6e5e3] text-[#404040] rounded-full text-sm font-medium">
          Cont
        </Link>
        <Link href="/cos" className="px-4 py-2 bg-[#8a7d65] text-white rounded-full text-sm font-medium">
          Coș
        </Link>
      </div>
    </motion.div>
  );
};

// Custom PageHeader wrapper with vertically flipped video
const VerticallyFlippedVideoHeader = () => {
  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <BackgroundVideo 
          videoSrc="/videos/paint.mp4" 
          verticalFlip={typeof window !== 'undefined' && window.innerWidth < 768}
        />
        {/* Adding bottom washout effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8f8f6]/30 to-[#f8f8f6]" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#404040] mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Coșul Meu
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-[#8a7d65] max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Revizuiește și finalizează comanda
        </motion.p>
        
        {/* Decorative elements */}
        <motion.div 
          className="w-20 h-1 bg-[#8a7d65] mt-8"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 80 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="w-8 h-12 rounded-full border-2 border-[#8a7d65] flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            className="w-1 h-3 bg-[#8a7d65] rounded-full mt-2"
            animate={{ 
              y: [0, 6, 0],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

const CartPage = () => {
  // Cart items state - in production would use context/Redux
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'vopsea-decorativa-1',
      name: 'Vopsea decorativă sidefată',
      price: 189.99,
      image: '/images/product-1.jpg',
      quantity: 2
    },
    {
      id: 'izolatie-termica-1',
      name: 'Sistem izolație termică premium',
      price: 289.99,
      image: '/images/product-5.jpg',
      quantity: 1
    },
    {
      id: 'accesorii-1',
      name: 'Set pensule premium',
      price: 89.99,
      image: '/images/product-8.jpg',
      quantity: 3
    }
  ]);
  
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  
  // Calculate cart totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 500 ? 0 : 25;
  const discount = promoApplied ? promoDiscount : 0;
  const total = subtotal + shipping - discount;
  
  // Update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  
  // Apply promo code
  const applyPromoCode = () => {
    // Mock promo code validation
    if (promoCode === 'PROMO20') {
      setPromoApplied(true);
      setPromoDiscount(calculateSubtotal() * 0.2);
      setPromoCode('');
    }
  };
  
  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setPromoApplied(false);
    setPromoDiscount(0);
  };
  
  // Mock related products
  const relatedProducts = [
    {
      id: 'related-1',
      name: 'Vopsea decorativă metalică',
      price: 219.99,
      image: '/images/product-2.jpg'
    },
    {
      id: 'related-2',
      name: 'Vopsea ecologică mată',
      price: 159.99,
      image: '/images/product-3.jpg'
    },
    {
      id: 'related-3',
      name: 'Panouri izolație fonică',
      price: 249.99,
      image: '/images/product-6.jpg'
    }
  ];
  
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-[#f8f8f6] overflow-hidden">
        <Navbar />
        
        <VerticallyFlippedVideoHeader />
        
        {/* Content Background Overlay */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#f8f8f6] opacity-90 z-0"></div>
          
          {/* Cart Content Section */}
          <section className="py-16 md:py-24 px-4 relative z-10">
            <div className="absolute inset-0 z-0">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#8a7d65] opacity-5 blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-[#c3beb4] opacity-5 blur-3xl"></div>
            </div>
            
            <div className="container mx-auto relative z-10">
              {cartItems.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Cart Items */}
                  <div className="lg:col-span-2">
                    <GlassCard accent="gold" className="mb-8">
                      <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-[#404040]">Produse ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</h2>
                        <button 
                          onClick={clearCart}
                          className="text-[#8a7d65] hover:text-[#8a7d65]/80 text-sm flex items-center transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6H5H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Golește coșul
                        </button>
                      </div>
                      
                      {/* Cart Item List */}
                      <div className="space-y-6">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex flex-col sm:flex-row border-b border-[#e6e5e3] pb-6">
                            {/* Product Image */}
                            <div className="w-full sm:w-24 h-24 bg-[#f5f5f5] rounded-lg overflow-hidden mb-4 sm:mb-0 sm:mr-4 relative">
                              <Image 
                                src={item.image} 
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="96px"
                                onError={(e) => {
                                  // Replace with cart placeholder
                                  const parent = e.currentTarget.parentElement;
                                  if (parent) {
                                    // Hide the image
                                    e.currentTarget.style.display = 'none';
                                    
                                    // Create a placeholder with shopping bag icon
                                    const placeholder = document.createElement('div');
                                    placeholder.className = 'absolute inset-0 flex items-center justify-center bg-[#f5f5f5] text-[#8a7d65]';
                                    placeholder.innerHTML = `
                                      <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                      </svg>
                                    `;
                                    parent.appendChild(placeholder);
                                  }
                                }}
                              />
                            </div>
                            
                            {/* Product Info */}
                            <div className="flex-grow flex flex-col sm:flex-row justify-between">
                              <div>
                                <h3 className="text-lg font-semibold text-[#404040] mb-1">{item.name}</h3>
                                <p className="text-[#8a7d65] font-bold mb-2">{item.price.toFixed(2)} RON</p>
                              </div>
                              
                              <div className="flex items-center justify-between sm:justify-end sm:space-x-6">
                                {/* Quantity Controls */}
                                <div className="flex items-center">
                                  <button 
                                    className="w-8 h-8 rounded-full bg-[#e6e5e3] flex items-center justify-center text-[#404040] hover:bg-[#8a7d65]/20"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </button>
                                  <span className="w-10 text-center text-[#404040]">{item.quantity}</span>
                                  <button 
                                    className="w-8 h-8 rounded-full bg-[#e6e5e3] flex items-center justify-center text-[#404040] hover:bg-[#8a7d65]/20"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </button>
                                </div>
                                
                                {/* Remove Button */}
                                <button 
                                  className="text-[#696969] hover:text-[#8a7d65] transition-colors"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                    
                    {/* Related Products */}
                    <div className="mt-8">
                      <h2 className="text-2xl font-bold text-[#404040] mb-6">Ai putea fi interesat și de</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {relatedProducts.map((product) => (
                          <GlassCard key={product.id} className="relative group">
                            <div className="aspect-square w-full relative overflow-hidden rounded-lg mb-3">
                              <div className="absolute inset-0 w-full h-full bg-[#333]">
                                <Image 
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  onError={(e) => {
                                    // Fallback for missing images
                                    e.currentTarget.style.opacity = '0';
                                  }}
                                />
                              </div>
                            </div>
                            <h3 className="text-[#404040] font-medium text-base mb-1">{product.name}</h3>
                            <p className="text-[#8a7d65] font-bold">{product.price.toFixed(2)} RON</p>
                            <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#8a7d65] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </GlassCard>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Summary */}
                  <div className="lg:col-span-1">
                    <GlassCard accent="light" className="sticky top-24">
                      <h2 className="text-2xl font-bold text-[#404040] mb-6">Sumar Comandă</h2>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-[#404040]">
                          <span>Subtotal</span>
                          <span>{subtotal.toFixed(2)} RON</span>
                        </div>
                        <div className="flex justify-between text-[#404040]">
                          <span>Livrare</span>
                          <span>{shipping === 0 ? 'GRATUIT' : `${shipping.toFixed(2)} RON`}</span>
                        </div>
                        {promoApplied && (
                          <div className="flex justify-between text-[#8a7d65]">
                            <span>Discount ({promoDiscount}%)</span>
                            <span>-{discount.toFixed(2)} RON</span>
                          </div>
                        )}
                        
                        <div className="pt-4 border-t border-[#e6e5e3] flex justify-between font-bold">
                          <span className="text-[#404040]">Total</span>
                          <span className="text-[#8a7d65] text-xl">{total.toFixed(2)} RON</span>
                        </div>
                      </div>
                      
                      {/* Promo Code */}
                      <div className="mb-6">
                        <label className="block text-[#404040] text-sm mb-2">Cod promoțional</label>
                        <div className="flex">
                          <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-grow px-3 py-2 rounded-l-lg bg-[#f5f5f3] border border-[#e6e5e3] text-[#404040] focus:outline-none focus:ring-1 focus:ring-[#8a7d65]"
                            placeholder="Introdu codul"
                          />
                          <button
                            onClick={applyPromoCode}
                            className="px-4 py-2 bg-[#8a7d65] text-white rounded-r-lg hover:bg-[#8a7d65]/80 transition-colors"
                          >
                            Aplică
                          </button>
                        </div>
                        {promoApplied && (
                          <div className="mt-2 text-[#8a7d65] text-sm flex items-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mr-1" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Cod promoțional aplicat cu succes!
                          </div>
                        )}
                      </div>
                      
                      {/* Checkout Buttons */}
                      <div className="space-y-3">
                        <button className="w-full py-3 bg-[#8a7d65] text-white rounded-full hover:bg-[#8a7d65]/90 transition-colors text-lg font-medium">
                          Finalizează Comanda
                        </button>
                        <Link href="/produse" className="block w-full py-3 text-center border border-[#e6e5e3] text-[#404040] rounded-full hover:bg-[#e6e5e3]/50 transition-colors text-base">
                          Continuă Cumpărăturile
                        </Link>
                      </div>
                      
                      {/* Secure Checkout */}
                      <div className="mt-6 flex items-center justify-center text-[#696969] text-sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mr-2" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 11H5V21H19V11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M17 9V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Plată securizată garantată
                      </div>
                    </GlassCard>
                  </div>
                </div>
              ) : (
                // Empty Cart State
                <GlassCard className="max-w-2xl mx-auto text-center py-12">
                  <div className="mb-6 inline-block p-4 bg-[#f5f5f3] rounded-full">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-[#404040] mb-3">Coșul tău este gol</h2>
                  <p className="text-[#696969] mb-6 max-w-md mx-auto">Se pare că nu ai adăugat încă niciun produs în coș. Descoperă gama noastră de produse premium.</p>
                  <Link href="/produse" className="inline-block px-8 py-3 bg-[#8a7d65] text-white rounded-full hover:bg-[#8a7d65]/90 transition-colors text-lg font-medium">
                    Vezi Produse
                  </Link>
                </GlassCard>
              )}
            </div>
          </section>
          
          <Footer />
        </div>
        
        {/* Mobile Navigation Pills */}
        <MobileNavPills />
      </main>
    </SmoothScrollProvider>
  );
};

export default CartPage; 
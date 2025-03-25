'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Remove unused icon imports
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// Remove unused PageHeader import
import GlassCard from '@/components/GlassCard';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
// Remove unused fadeIn import
import BackgroundVideo from '@/components/BackgroundVideo';
import ErrorFallbackImage from '@/components/ErrorFallbackImage';
import { useCart } from '@/lib/context/CartContext';

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
          verticalFlip={false}
          horizontalFlip={false}
        />
        {/* Adding bottom washout effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f8f6]/70 via-[#f8f8f6]/50 to-[#f8f8f6]" />
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
  // Use cart context for real cart functionality
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate shipping cost (could be more complex in a real app)
  const shippingCost = items.length > 0 ? 15 : 0;
  
  // Calculate final amount
  const finalAmount = totalPrice + shippingCost - promoDiscount;
  
  // Apply promo code
  const applyPromoCode = () => {
    // Example promo code logic
    if (promoCode.toUpperCase() === 'WELCOME10') {
      const discount = totalPrice * 0.1; // 10% discount
      setPromoDiscount(discount);
      setPromoError('');
    } else {
      setPromoError('Cod promoțional invalid');
      setPromoDiscount(0);
    }
  };
  
  // Proceed to checkout
  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      alert('Checkout functionality would be integrated here!');
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-[#f8f8f6] overflow-hidden">
        <Navbar />
        <MobileNavPills />
        
        <VerticallyFlippedVideoHeader />
        
        {/* Cart Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Cart Items */}
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold text-[#404040] mb-6">Produse în coș</h2>
                  
                  {items.length === 0 ? (
                    <GlassCard className="p-8 text-center">
                      <p className="text-[#696969] mb-6">Coșul tău este gol.</p>
                      <Link 
                        href="/produse"
                        className="inline-block px-6 py-3 bg-[#8a7d65] text-white rounded-full hover:bg-[#8a7d65]/90 transition-colors text-lg"
                      >
                        Continuă cumpărăturile
                      </Link>
                    </GlassCard>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <GlassCard key={`${item.productId}-${item.variant}`} className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="w-full sm:w-24 h-24 bg-[#f0efed] rounded-lg overflow-hidden relative flex-shrink-0">
                              {item.image ? (
                                <ErrorFallbackImage
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <svg className="w-8 h-8 text-[#c3beb4]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                                    <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M21 15L15 9L3 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-grow">
                              <div className="flex flex-col sm:flex-row sm:justify-between">
                                <div>
                                  <h3 className="text-lg font-bold text-[#404040]">{item.title}</h3>
                                  <p className="text-[#696969]">Varianta: {item.variant}</p>
                                </div>
                                <div className="text-right mt-2 sm:mt-0">
                                  <p className="font-bold text-[#404040]">{item.price.toFixed(2)} lei</p>
                                  <p className="text-sm text-[#696969]">({item.price.toFixed(2)} lei/buc)</p>
                                </div>
                              </div>
                              
                              <div className="mt-4 flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <button 
                                    onClick={() => updateQuantity(item.productId, item.variant, item.quantity - 1)}
                                    className="w-8 h-8 rounded-full bg-[#f0efed] flex items-center justify-center text-[#696969]"
                                  >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.productId, item.variant, item.quantity + 1)}
                                    className="w-8 h-8 rounded-full bg-[#f0efed] flex items-center justify-center text-[#696969]"
                                  >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </button>
                                </div>
                                <button 
                                  onClick={() => removeFromCart(item.productId, item.variant)}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </GlassCard>
                      ))}
                      
                      <div className="flex justify-between mt-4">
                        <Link 
                          href="/produse"
                          className="text-[#8a7d65] hover:underline flex items-center"
                        >
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Continuă cumpărăturile
                        </Link>
                        
                        <button 
                          onClick={() => clearCart()}
                          className="text-red-500 hover:underline flex items-center"
                        >
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Golește coș
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Order Summary */}
                <div className="md:w-1/3">
                  <h2 className="text-2xl font-bold text-[#404040] mb-6">Sumarul comenzii</h2>
                  
                  <GlassCard className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-[#696969]">Subtotal</span>
                        <span className="font-medium">{totalPrice.toFixed(2)} lei</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-[#696969]">Transport</span>
                        <span className="font-medium">{shippingCost.toFixed(2)} lei</span>
                      </div>
                      
                      {promoDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount promoțional</span>
                          <span>-{promoDiscount.toFixed(2)} lei</span>
                        </div>
                      )}
                      
                      <div className="border-t border-[#e6e5e3] pt-4 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{finalAmount.toFixed(2)} lei</span>
                      </div>
                      
                      {/* Promo code input */}
                      <div className="pt-4">
                        <label htmlFor="promo-code" className="block text-sm text-[#696969] mb-2">
                          Cod promoțional
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            id="promo-code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-grow px-4 py-2 border border-[#e6e5e3] rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#8a7d65]"
                            placeholder="Introdu codul"
                          />
                          <button
                            onClick={applyPromoCode}
                            className="px-4 py-2 bg-[#8a7d65] text-white rounded-r-lg hover:bg-[#8a7d65]/90 transition-colors"
                          >
                            Aplică
                          </button>
                        </div>
                        {promoError && <p className="text-red-500 text-sm mt-1">{promoError}</p>}
                        {promoDiscount > 0 && <p className="text-green-600 text-sm mt-1">Cod aplicat cu succes!</p>}
                      </div>
                      
                      <button 
                        onClick={handleCheckout}
                        disabled={items.length === 0 || isProcessing}
                        className={`w-full py-3 rounded-full text-white text-lg font-medium transition-colors ${
                          items.length === 0 
                            ? 'bg-[#c3beb4] cursor-not-allowed' 
                            : 'bg-[#8a7d65] hover:bg-[#8a7d65]/90'
                        }`}
                      >
                        {isProcessing ? 'Se procesează...' : 'Finalizează comanda'}
                      </button>
                      
                      <p className="text-center text-sm text-[#696969] mt-2">
                        Transport gratuit pentru comenzi peste 500 lei
                      </p>
                    </div>
                  </GlassCard>
                  
                  {/* Secure payment info */}
                  <div className="mt-6 p-4 border border-[#e6e5e3] rounded-lg bg-white/50">
                    <div className="flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-[#8a7d65] mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="font-medium text-[#404040]">Plată sigură</span>
                    </div>
                    <p className="text-sm text-center text-[#696969]">
                      Toate tranzacțiile sunt securizate și criptate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
};

export default CartPage; 
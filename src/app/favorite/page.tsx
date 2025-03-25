'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import { useAuth } from '@/lib/authContext';
import { getUserFavorites, removeFromFavorites } from '@/lib/api/favorites';
import Link from 'next/link';
import Image from 'next/image';

// Custom PageHeader wrapper
const FavoritesPageHeader = () => {
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
            Produse Favorite
          </motion.h1>
          
          <motion.p 
            className="text-xl text-[#696969]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Colecția ta personală de produse preferate
          </motion.p>
        </div>
      </div>
    </div>
  );
};

const FavoritesPage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isRemoving, setIsRemoving] = useState<Record<string, boolean>>({});
  
  // Fetch favorites when component mounts
  useEffect(() => {
    // Only fetch if user is logged in
    if (user) {
      fetchFavorites();
    } else if (!isLoading && !user) {
      // Redirect to login if not logged in
      router.push('/cont');
    }
  }, [user, isLoading, router]);
  
  // Fetch favorites
  const fetchFavorites = async () => {
    try {
      const data = await getUserFavorites();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };
  
  // Remove from favorites
  const handleRemoveFromFavorites = async (productId: string) => {
    setIsRemoving(prev => ({ ...prev, [productId]: true }));
    
    try {
      await removeFromFavorites(productId);
      
      // Update local state
      setFavorites(prev => prev.filter(item => item.product_id !== productId));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    } finally {
      setIsRemoving(prev => ({ ...prev, [productId]: false }));
    }
  };
  
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-[#f8f8f6]">
        <Navbar />
        
        <FavoritesPageHeader />
        
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#404040]">Produsele Tale Favorite</h2>
              
              <Link 
                href="/produse"
                className="px-6 py-2 bg-[#8a7d65] text-white rounded-full hover:bg-[#8a7d65]/90 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Toate produsele
              </Link>
            </div>
            
            {favorites.length === 0 ? (
              <GlassCard className="p-8 text-center">
                <p className="text-[#696969] mb-4">Nu ai niciun produs favorit.</p>
                <Link 
                  href="/produse"
                  className="px-6 py-2 bg-[#8a7d65] text-white rounded-full hover:bg-[#8a7d65]/90 transition-colors inline-flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Descoperă produse
                </Link>
              </GlassCard>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((favorite) => {
                  const product = favorite.products || {};
                  return (
                    <GlassCard key={favorite.id} className="p-0 overflow-hidden flex flex-col">
                      {/* Product Image */}
                      <div className="relative h-48 w-full bg-[#f0efed] overflow-hidden">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-[#f0efed]">
                            <svg className="w-12 h-12 text-[#c3beb4]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                              <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="2"/>
                              <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        )}
                        
                        {/* Remove button */}
                        <button 
                          onClick={() => handleRemoveFromFavorites(favorite.product_id)}
                          disabled={isRemoving[favorite.product_id]}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-red-500 hover:bg-white transition-colors"
                        >
                          {isRemoving[favorite.product_id] ? (
                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"/>
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </button>
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-4 flex-grow flex flex-col">
                        <h3 className="text-lg font-bold text-[#404040] mb-1">{product.name || 'Produs'}</h3>
                        
                        <p className="text-[#696969] text-sm line-clamp-2 mb-3">
                          {product.description || 'Fără descriere'}
                        </p>
                        
                        {product.category && (
                          <span className="text-xs bg-[#f0efed] text-[#696969] px-2 py-1 rounded-full inline-block mb-3">
                            {product.category}
                          </span>
                        )}
                        
                        <div className="flex justify-between items-center mt-auto pt-3 border-t border-[#e6e5e3]">
                          <span className="font-bold text-[#404040]">
                            {product.price ? `${product.price.toFixed(2)} lei` : 'Preț indisponibil'}
                          </span>
                          
                          <Link
                            href={`/produs/${product.id}`}
                            className="text-[#8a7d65] hover:underline text-sm flex items-center"
                          >
                            <span>Vezi detalii</span>
                            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Link>
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
        
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
};

export default FavoritesPage; 
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Image from 'next/image';
import Link from 'next/link';

// Product types
type ProductCategory = 'vopsele' | 'izolatie' | 'accesorii';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  badge?: string;
  rating?: number;
  inStock: boolean;
};

// Products data
const products: Product[] = [
  {
    id: 'vopsea-decorativa-1',
    name: 'Vopsea decorativă sidefată',
    description: 'Vopsea decorativă premium cu efect satinat pentru un finisaj elegant în orice încăpere.',
    price: 189.99,
    image: '/images/product-1.jpg',
    category: 'vopsele',
    badge: 'Popular',
    rating: 4.8,
    inStock: true
  },
  {
    id: 'vopsea-decorativa-2',
    name: 'Vopsea decorativă metalică',
    description: 'Vopsea cu efect metalic pentru accent și strălucire distinctivă care transformă orice perete.',
    price: 219.99,
    image: '/images/product-2.jpg',
    category: 'vopsele',
    rating: 4.7,
    inStock: true
  },
  {
    id: 'vopsea-eco-1',
    name: 'Vopsea ecologică mată',
    description: 'Vopsea eco-friendly, fără COV, ideală pentru dormitoare și camere pentru copii.',
    price: 159.99,
    image: '/images/product-3.jpg',
    category: 'vopsele',
    badge: 'Eco',
    rating: 4.9,
    inStock: true
  },
  {
    id: 'vopsea-eco-2',
    name: 'Vopsea ecologică lavabilă',
    description: 'Vopsea lavabilă premium, rezistentă la pete și murdărie, perfect pentru spații cu trafic intens.',
    price: 179.99,
    image: '/images/product-4.jpg',
    category: 'vopsele',
    rating: 4.6,
    inStock: true
  },
  {
    id: 'izolatie-termica-1',
    name: 'Sistem izolație termică premium',
    description: 'Sistem complet de izolație termică pentru fațade, include adeziv, polistiren și plasă de armare.',
    price: 289.99,
    image: '/images/product-5.jpg',
    category: 'izolatie',
    badge: 'Eficient',
    rating: 4.9,
    inStock: true
  },
  {
    id: 'izolatie-fonica-1',
    name: 'Panouri izolație fonică',
    description: 'Panouri fonoabsorbante premium pentru reducerea zgomotului și îmbunătățirea acusticii.',
    price: 249.99,
    image: '/images/product-6.jpg',
    category: 'izolatie',
    rating: 4.7,
    inStock: true
  },
  {
    id: 'izolatie-hidro-1',
    name: 'Membrană Hidroizolație',
    description: 'Membrană premium pentru hidroizolații, ideală pentru terase, băi și fundații.',
    price: 199.99,
    image: '/images/product-7.jpg',
    category: 'izolatie',
    rating: 4.8,
    inStock: true
  },
  {
    id: 'accesorii-1',
    name: 'Set Pensule Premium',
    description: 'Set complet de pensule profesionale pentru aplicarea perfectă a vopselelor decorative.',
    price: 89.99,
    image: '/images/product-8.jpg',
    category: 'accesorii',
    rating: 4.6,
    inStock: false
  },
];

// Filter categories
const categories = [
  { id: 'toate', label: 'Toate Produsele' },
  { id: 'vopsele', label: 'Vopsele' },
  { id: 'izolatie', label: 'Izolație' },
  { id: 'accesorii', label: 'Accesorii' },
];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState('toate');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter products based on active category and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'toate' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-[#1A1A1A] overflow-hidden">
        <Navbar />
        
        <PageHeader 
          title="Produse premium"
          subtitle="Materiale de înaltă calitate pentru finisaje impecabile"
          videoSrc="/videos/paint.mp4"
        />
        
        {/* Filters and Search */}
        <section className="py-16 px-4 relative">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-[#B99C4B] text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Caută produse..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#B99C4B]/50"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40">
                  <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17A8 8 0 109 1a8 8 0 000 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    layout
                  >
                    <GlassCard className="h-full flex flex-col" accent={product.category === 'vopsele' ? 'gold' : 'light'}>
                      {/* Product Image */}
                      <div className="aspect-square w-full relative overflow-hidden rounded-lg mb-4 group">
                        <div className="absolute inset-0 w-full h-full bg-[#333]">
                          <Image 
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            onError={(e) => {
                              // Fallback for missing images
                              e.currentTarget.style.opacity = '0';
                            }}
                          />
                          {/* Product badge if exists */}
                          {product.badge && (
                            <div className="absolute top-2 right-2 bg-[#B99C4B] text-white text-xs px-3 py-1 rounded-full">
                              {product.badge}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                        <p className="text-white/70 text-sm mb-4 line-clamp-2">{product.description}</p>
                        
                        {/* Rating */}
                        {product.rating && (
                          <div className="flex items-center mb-3">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i} 
                                  width="16" 
                                  height="16" 
                                  fill={i < Math.floor(product.rating || 0) ? "#F0E4B2" : "none"} 
                                  stroke={i < Math.floor(product.rating || 0) ? "#F0E4B2" : "#F0E4B2"}
                                  className="mr-1"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              ))}
                            </div>
                            <span className="text-white/60 text-xs ml-2">{product.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Price and Add to Cart */}
                      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                        <div className="text-[#F0E4B2] text-xl font-bold">{product.price.toFixed(2)} RON</div>
                        <button 
                          className={`px-3 py-2 rounded-full text-sm flex items-center ${
                            product.inStock 
                              ? 'bg-[#B99C4B] text-white hover:bg-[#B99C4B]/80' 
                              : 'bg-white/10 text-white/40 cursor-not-allowed'
                          } transition-colors`}
                          disabled={!product.inStock}
                        >
                          <svg width="16" height="16" className="mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {product.inStock ? 'Adaugă în coș' : 'Stoc epuizat'}
                        </button>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Empty state when no products match filter */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-white/60 text-lg">Niciun produs găsit. Încercați alte criterii de căutare.</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Product Benefits */}
        <section className="py-16 px-4 bg-[#333333]/30 relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-[#B99C4B] opacity-5 blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-[#F0E4B2] opacity-5 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">De ce să alegi produsele noastre</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Oferim materiale premium, selecționate cu grijă pentru durabilitate și rezultate excepționale.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#B99C4B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16V12" stroke="#F0E4B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8H12.01" stroke="#F0E4B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: 'Calitate Premium',
                  description: 'Materiale de cea mai înaltă calitate, testate și certificate pentru performanță superioară.'
                },
                {
                  icon: (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 14C19 18.4183 15.4183 22 11 22C6.58172 22 3 18.4183 3 14C3 9.58172 6.58172 6 11 6" stroke="#B99C4B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 10L11 14L22 3" stroke="#F0E4B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: 'Garanție Extinsă',
                  description: 'Toate produsele beneficiază de garanție extinsă și suport tehnic pentru aplicare.'
                },
                {
                  icon: (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 3V7M3 5H7M6 17V21M4 19H8M13 3L15.2857 9.85714L21 12L15.2857 14.1429L13 21L10.7143 14.1429L5 12L10.7143 9.85714L13 3Z" stroke="#B99C4B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: 'Rezultate Excepționale',
                  description: 'Finisaje impecabile și durabile ce transformă orice spațiu într-un mediu elegant.'
                },
                {
                  icon: (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 8L21 12M21 12L17 16M21 12H3" stroke="#B99C4B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: 'Livrare Rapidă',
                  description: 'Comandă acum și primește produsele în 24-48 de ore, oriunde în țară.'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard>
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4">{benefit.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                      <p className="text-white/70">{benefit.description}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 px-4 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 opacity-30">
            <video 
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              src="/videos/paintbrush.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-transparent to-[#1A1A1A]"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Nu Știi Ce Produse Să Alegi?
              </motion.h2>
              <motion.p 
                className="text-lg text-white/80 mb-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Experții noștri îți stau la dispoziție pentru recomandări personalizate și sfaturi profesionale.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link href="/contact" className="px-8 py-4 bg-[#B99C4B] text-white rounded-full text-lg font-medium hover:bg-[#B99C4B]/80 transition-colors">
                  Contactează-ne
                </Link>
                <Link href="/servicii" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-medium hover:bg-white/10 transition-colors">
                  Vezi Serviciile Noastre
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
};

export default ProductsPage; 
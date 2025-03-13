'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Space_Grotesk } from 'next/font/google';
import { Product } from '@/types/product';
import { useRouter, useSearchParams } from 'next/navigation';
import CategoryOverlay from '@/components/CategoryOverlay';
import CategoryDropdown from '@/components/CategoryDropdown';

// Using the same font as in other components
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

// In a real application, this would be fetched from an API
const fetchProducts = async (): Promise<Product[]> => {
  // For demo purposes, we'll just fetch each product individually
  const slugs = ['vopsea-decorativa-premium', 'izolatie-termica-exterior', 'vopsea-lavabila-interior', 'illusion-crystal'];
  
  const productsPromises = slugs.map(async (slug) => {
    const response = await fetch(`/api/products/${slug}`);
    if (!response.ok) return null;
    return response.json();
  });
  
  const products = await Promise.all(productsPromises);
  return products.filter(Boolean) as Product[];
};

// Add a mock database reference for generating product URLs
const productsDatabase: Record<string, { id: string }> = {
  'vopsea-decorativa-premium': { id: '1' },
  'izolatie-termica-exterior': { id: '2' },
  'vopsea-lavabila-interior': { id: '3' },
  'illusion-crystal': { id: '4' },
};

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('categorie');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam || 'toate');
  const [mainCategory, setMainCategory] = useState<'vopsele' | 'izolatii' | null>(
    categoryParam === 'vopsele' ? 'vopsele' :
    categoryParam === 'izolații' ? 'izolatii' : null
  );
  const [categories, setCategories] = useState<string[]>(['toate']);
  const [showCategoryOverlay, setShowCategoryOverlay] = useState(!categoryParam && !mainCategory);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        
        // When a main category is selected, only show relevant subcategories
        updateSubcategories(data, mainCategory);
        
      } catch (error) {
        // Replace console.error with more production-friendly error handling
        setError('Eroare la încărcarea produselor. Încercați din nou mai târziu.');
        // console.error('Error loading products:', error);
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    };

    loadProducts();
  }, [mainCategory]);

  // Update the subcategories based on the main category selection
  const updateSubcategories = (productsData: Product[], category: 'vopsele' | 'izolatii' | null) => {
    const uniqueCategories = new Set<string>();
    
    // Always include "toate" (all) category
    uniqueCategories.add('toate');
    
    // Filter products by main category first
    const filteredProducts = category 
      ? productsData.filter(product => {
          if (category === 'vopsele') {
            return product.categorii.includes('vopsele') || 
                   product.categorii.includes('vopsea') ||
                   !product.categorii.some(cat => cat.includes('izolat'));
          } else if (category === 'izolatii') {
            return product.categorii.includes('izolații') || 
                   product.categorii.includes('izolatie') ||
                   product.categorii.includes('termic') ||
                   product.categorii.some(cat => cat.includes('izolat'));
          }
          return true;
        })
      : productsData;
      
    // Add subcategories from filtered products
    filteredProducts.forEach(product => {
      product.categorii.forEach(cat => {
        // Only include category-specific subcategories
        if (category === 'vopsele') {
          if (!cat.includes('izolat') && cat !== 'izolații') {
            uniqueCategories.add(cat);
          }
        } else if (category === 'izolatii') {
          if (cat !== 'vopsele' && !cat.includes('vopsea')) {
            uniqueCategories.add(cat);
          }
        } else {
          uniqueCategories.add(cat);
        }
      });
    });
    
    setCategories(Array.from(uniqueCategories));
  };

  // Handle category selection from the overlay
  const handleCategorySelect = (category: 'vopsele' | 'izolatii') => {
    setShowCategoryOverlay(false);
    
    if (category === 'vopsele') {
      setMainCategory('vopsele');
      setActiveCategory('vopsele');
      router.push('/produse?categorie=vopsele');
    } else {
      setMainCategory('izolatii');
      setActiveCategory('izolații');
      router.push('/produse?categorie=izolații');
    }
  };

  // Handle subcategory selection
  const handleSubcategorySelect = (category: string) => {
    setActiveCategory(category);
    if (category === 'toate') {
      if (mainCategory === 'vopsele') {
        router.push('/produse?categorie=vopsele');
      } else if (mainCategory === 'izolatii') {
        router.push('/produse?categorie=izolații');
      } else {
        router.push('/produse');
      }
    } else {
      router.push(`/produse?categorie=${category}`);
    }
  };

  // Filter products by selected category and main category
  const filteredProducts = products.filter(product => {
    // First filter by main category if set
    if (mainCategory) {
      if (mainCategory === 'vopsele') {
        if (product.categorii.some(cat => cat.includes('izolat')) || 
            product.categorii.includes('izolații')) {
          return false;
        }
      } else if (mainCategory === 'izolatii') {
        if (product.categorii.includes('vopsele') || 
            product.categorii.some(cat => cat.includes('vopsea'))) {
          return false;
        }
      }
    }
    
    // Then filter by active subcategory
    return activeCategory === 'toate'
      ? true
      : product.categorii.includes(activeCategory);
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f8f6]">
        <div className="relative w-24 h-24">
          <div className="absolute w-full h-full border-4 border-[#8a7d65]/20 rounded-full animate-ping"></div>
          <div className="absolute w-full h-full border-4 border-t-[#8a7d65] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen relative bg-[#f8f8f6]">
        <Navbar />
        
      {/* Category Overlay - only show on initial load when no category selected */}
      {isInitialLoad && (
        <CategoryOverlay 
          isOpen={showCategoryOverlay}
          onClose={() => setShowCategoryOverlay(false)}
          onSelectCategory={handleCategorySelect}
        />
      )}
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-full h-full opacity-5">
            <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-[#8a7d65] blur-3xl" />
            <div className="absolute bottom-20 left-20 w-[500px] h-[500px] rounded-full bg-[#c3beb4] blur-3xl" />
          </div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl lg:text-6xl text-[#404040] mb-6`}>
              {activeCategory === 'toate' 
                ? mainCategory === 'vopsele'
                  ? 'Vopsele Decorative'
                  : mainCategory === 'izolatii'
                    ? 'Izolații Termice'
                    : 'Produsele Noastre'
                : activeCategory === 'vopsele' 
                  ? 'Vopsele Decorative' 
                  : activeCategory === 'izolații' 
                    ? 'Izolații Termice' 
                    : `Categoria: ${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`}
            </h1>
            <p className="text-lg text-[#696969] mb-8 max-w-2xl">
              {activeCategory === 'toate' 
                ? mainCategory === 'vopsele'
                  ? 'Colecția noastră de vopsele decorative premium oferă finisaje unice și efecte spectaculoase pentru pereții tăi.'
                  : mainCategory === 'izolatii'
                    ? 'Soluțiile noastre de izolație termică asigură eficiență energetică și confort termic pentru casa ta.'
                    : 'Descoperă gama noastră de vopsele premium și soluții de izolație eco-friendly, create pentru a transforma spațiul tău într-un mediu frumos, confortabil și eficient energetic.'
                : activeCategory === 'vopsele' || activeCategory.includes('vopsea')
                  ? 'Colecția noastră de vopsele decorative premium oferă finisaje unice și efecte spectaculoase pentru pereții tăi.'
                  : activeCategory === 'izolații' || activeCategory.includes('izolatie')
                    ? 'Soluțiile noastre de izolație termică asigură eficiență energetică și confort termic pentru casa ta.'
                    : `Produse din categoria ${activeCategory}, selectate pentru calitate și performanță.`}
            </p>
            
            {/* Category selection - use dropdown when already on Produse page */}
            <CategoryDropdown 
              currentCategory={mainCategory === 'vopsele' ? 'vopsele' : mainCategory === 'izolatii' ? 'izolații' : 'toate'}
              onCategoryChange={handleCategorySelect}
            />
          </motion.div>
          
          {/* Subcategory Filter - only show relevant subcategories */}
          <div className="flex flex-wrap items-center gap-3 mb-12 mt-8">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category 
                    ? 'bg-[#8a7d65] text-white shadow-md' 
                    : 'bg-white text-[#404040] hover:bg-[#e6e5e3]/50'
                }`}
                onClick={() => handleSubcategorySelect(category)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
              </div>
            </div>
          </section>
          
          {/* Products Grid */}
      <section className="py-12 px-4 sm:px-8 lg:px-16">
            <div className="container mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl text-[#404040] mb-4">Nu am găsit produse în această categorie</h2>
              <p className="text-[#696969]">Te rugăm să încerci o altă categorie sau contactează-ne pentru asistență.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all group"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
                >
                  <Link href={`/produs/${Object.keys(productsDatabase).find(key => productsDatabase[key].id === product.id) || product.id}`}>
                    <div className="relative h-64">
                      <Image
                        src={product.linkImagine || '/images/product-placeholder.svg'}
                        alt={product.titlu}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.categorii.includes('premium') && (
                        <div className="absolute top-4 left-4 bg-[#8a7d65] text-white px-4 py-1 rounded-full text-sm font-medium z-10">
                          Premium
                            </div>
                          )}
                      {product.categorii.includes('eco') && (
                        <div className="absolute top-4 right-4 bg-[#4D724D] text-white px-4 py-1 rounded-full text-sm font-medium z-10">
                          Eco
                            </div>
                          )}
                        </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#404040] mb-2">{product.titlu}</h3>
                      <p className="text-[#696969] text-sm mb-4 line-clamp-2">{product.descriereScurta}</p>
                      <div className="flex items-baseline mb-4">
                        <span className="text-lg font-bold text-[#404040]">
                          {product.variante[0].pret.minim} - {product.variante[0].pret.maxim} RON
                        </span>
                        <span className="ml-2 text-xs text-[#696969]">/ {product.variante[0].cantitatePachet}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                          {product.categorii.slice(0, 2).map(cat => (
                            <span key={cat} className="text-xs px-2 py-1 bg-[#f8f8f6] text-[#696969] rounded-full">
                              {cat}
                            </span>
                          ))}
                        </div>
                        <span className="text-[#8a7d65] font-medium group-hover:underline">
                          Vezi detalii
                        </span>
                      </div>
                    </div>
                  </Link>
                    </motion.div>
                  ))}
              </div>
          )}
            </div>
          </section>
          
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-8 lg:px-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-[#8a7d65] blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-[#c3beb4] blur-3xl" />
              </div>
              
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`${spaceGrotesk.className} text-3xl md:text-4xl text-[#404040] mb-6`}>
              Nu găsești ce cauți?
            </h2>
            <p className="text-[#696969] mb-8">
              Contactează-ne pentru soluții personalizate sau pentru a afla mai multe detalii despre produsele noastre.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-[#8a7d65] text-white rounded-full text-lg font-medium hover:bg-[#8a7d65]/80 transition-colors">
                Solicită o ofertă
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-[#404040] text-[#404040] rounded-full text-lg font-medium hover:bg-[#404040]/10 transition-colors">
                Contactează-ne
              </button>
                      </div>
              </div>
            </div>
          </section>
          
      {/* Footer would be included here */}
      <footer className="py-12 px-4 md:px-8 lg:px-16 bg-transparent relative z-10">
        <div className="absolute inset-0 bg-[#f8f8f6]/80 backdrop-blur-xl border-t border-[#e6e5e3] z-0"
          style={{
            boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)'
          }}
        ></div>
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-[#404040] mb-2">
                <span className="text-[#8a7d65]">Vopsele</span> & <span className="text-[#696969]">Izolații</span>
              </h3>
              <p className="text-[#1A1A1A] text-sm">
                Soluții complete pentru spații moderne
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <Link href="/" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                Acasă
              </Link>
              <Link href="/produse" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                Produse
              </Link>
              <Link href="/servicii" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                Servicii
              </Link>
              <Link href="/despre" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                Despre Noi
                  </Link>
              <Link href="/contact" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                Contact
                  </Link>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-[#696969]">
            © 2025 Vopsele & Izolații. Toate drepturile rezervate.
          </div>
        </div>
      </footer>
      </main>
  );
} 
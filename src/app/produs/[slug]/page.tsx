'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Space_Grotesk } from 'next/font/google';
import { Product } from '@/types/product';
import Link from 'next/link';

// Using the same font as in the VideoHeader component
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

// Fetch product data from our API
const fetchProductData = async (slug: string): Promise<Product> => {
  const response = await fetch(`/api/products/${slug}`);
  
  if (!response.ok) {
    throw new Error('Produsul nu a fost găsit');
  }
  
  return response.json();
};

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'descriere' | 'specificatii'>('descriere');
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${params.slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Produsul nu a fost găsit.');
            return;
          }
          throw new Error(`Eroare la încărcarea produsului: ${response.status}`);
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        // Replace console.error with more production-friendly error handling
        setError('Eroare la încărcarea produsului. Încercați din nou mai târziu.');
        // console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

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

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f8f6] px-4">
        <h1 className={`${spaceGrotesk.className} text-3xl md:text-4xl text-[#404040] mb-4 text-center`}>
          Produsul nu a fost găsit
        </h1>
        <p className="text-[#696969] mb-8 text-center">
          Ne pare rău, dar produsul pe care îl cauți nu există sau a fost eliminat.
        </p>
        <Link 
          href="/"
          className="px-8 py-3 bg-[#8a7d65] text-white rounded-full text-lg font-medium hover:bg-[#8a7d65]/80 transition-colors"
        >
          Înapoi la pagina principală
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <main className="min-h-screen relative bg-[#f8f8f6]">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="pt-28 pb-4 px-4 sm:px-8 lg:px-16 container mx-auto">
        <div className="text-[#696969] text-sm">
          <Link href="/" className="hover:text-[#8a7d65] transition-colors">Acasă</Link>
          <span className="mx-2">/</span>
          <Link href="/produse" className="hover:text-[#8a7d65] transition-colors">Produse</Link>
          <span className="mx-2">/</span>
          {product.categorii[0] === 'vopsele' || product.categorii.some(cat => cat.includes('vopsea')) ? (
            <Link href="/produse?categorie=vopsele" className="hover:text-[#8a7d65] transition-colors capitalize">
              Vopsele
            </Link>
          ) : product.categorii[0] === 'izolații' || product.categorii.some(cat => cat.includes('izolatie')) ? (
            <Link href="/produse?categorie=izolații" className="hover:text-[#8a7d65] transition-colors capitalize">
              Izolații
            </Link>
          ) : (
            <Link href={`/produse?categorie=${product.categorii[0]}`} className="hover:text-[#8a7d65] transition-colors capitalize">
              {product.categorii[0]}
            </Link>
          )}
          <span className="mx-2">/</span>
          <span className="text-[#8a7d65]">{product.titlu}</span>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-6 px-4 sm:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div 
              className="relative rounded-3xl overflow-hidden bg-white shadow-lg h-[400px] sm:h-[500px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`absolute inset-0 flex items-center justify-center bg-white transition-opacity duration-300 ${isImageLoaded ? 'opacity-0' : 'opacity-100'}`}>
                <div className="w-16 h-16 border-4 border-t-[#8a7d65] border-[#8a7d65]/20 rounded-full animate-spin"></div>
              </div>
              <Image
                src={product.linkImagine || '/images/product-placeholder.svg'}
                alt={product.titlu}
                fill
                className={`object-contain transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoadingComplete={() => setIsImageLoaded(true)}
                priority
              />
              {/* Product labels/badges */}
              {product.categorii.includes('premium') && (
                <div className="absolute top-4 left-4 bg-[#8a7d65] text-white px-4 py-1 rounded-full text-sm font-medium z-10">
                  Premium
                </div>
              )}
              {product.categorii.includes('eco') && (
                <div className="absolute top-4 left-28 bg-[#4D724D] text-white px-4 py-1 rounded-full text-sm font-medium z-10">
                  Eco
                </div>
              )}
            </motion.div>

            {/* Product Details */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className={`${spaceGrotesk.className} text-3xl md:text-4xl text-[#404040] mb-4`}>
                {product.titlu}
              </h1>
              
              <div className="mb-6">
                <p className="text-[#696969] mb-6">{product.descriereScurta}</p>
                
                {/* Price Range */}
                <div className="flex items-baseline mb-2">
                  <span className="text-2xl font-bold text-[#404040]">
                    {product.variante[selectedVariant].pret.minim} - {product.variante[selectedVariant].pret.maxim} RON
                  </span>
                  <span className="ml-2 text-sm text-[#696969]">/ {product.variante[selectedVariant].cantitatePachet}</span>
                </div>
                <p className="text-sm text-[#696969] italic">
                  *Prețul final depinde de suprafața de acoperit și cerințele specifice.
                </p>
              </div>
              
              {/* Variant Selector */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-[#404040] mb-3">Variante disponibile:</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variante.map((variant, idx) => (
                    <button
                      key={idx}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        selectedVariant === idx 
                          ? 'bg-[#8a7d65] text-white shadow-md' 
                          : variant.disponibil 
                            ? 'bg-white border border-[#e6e5e3] text-[#404040] hover:border-[#8a7d65]/50' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() => variant.disponibil && setSelectedVariant(idx)}
                      disabled={!variant.disponibil}
                    >
                      {variant.variantaProdus}
                      {!variant.disponibil && ' (Indisponibil)'}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-[#404040] mb-3">Cantitate:</h3>
                <div className="flex items-center">
                  <button 
                    className="w-10 h-10 rounded-full bg-white border border-[#e6e5e3] flex items-center justify-center text-[#404040] hover:border-[#8a7d65]/50 transition-colors"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <span>-</span>
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 h-10 mx-2 border border-[#e6e5e3] rounded-lg text-center text-[#404040] bg-white focus:outline-none focus:ring-2 focus:ring-[#8a7d65]/30"
                  />
                  <button 
                    className="w-10 h-10 rounded-full bg-white border border-[#e6e5e3] flex items-center justify-center text-[#404040] hover:border-[#8a7d65]/50 transition-colors"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <span>+</span>
                  </button>
                  <span className="ml-4 text-sm text-[#696969]">
                    {product.variante[selectedVariant].cantitatePachet}
                  </span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* Add to Cart Button with Glassmorphism */}
                <button 
                  className="px-6 py-3 rounded-full text-white font-medium transition-all flex-1 relative overflow-hidden group"
                  style={{ 
                    backgroundColor: 'rgba(138, 125, 101, 0.9)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#8a7d65]/80 to-[#8a7d65] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Adaugă în coș
                  </span>
                </button>
                
                {/* Wishlist Button */}
                <button 
                  className="px-4 py-3 rounded-full font-medium transition-all bg-white border border-[#e6e5e3] text-[#404040] hover:border-[#8a7d65]/50 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Adaugă la dorințe
                </button>
              </div>
              
              {/* Technical Sheet Button */}
              <a 
                href={product.foaieTehnica}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#8a7d65] hover:text-[#8a7d65]/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descarcă foaia tehnică
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Product Details Tabs */}
      <section className="py-12 px-4 sm:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <div className="mb-8 border-b border-[#e6e5e3]">
            <div className="flex flex-wrap -mb-px">
              <button
                className={`inline-block py-4 px-6 border-b-2 font-medium text-lg transition-colors ${
                  activeTab === 'descriere' 
                    ? 'border-[#8a7d65] text-[#8a7d65]' 
                    : 'border-transparent text-[#696969] hover:text-[#404040]'
                }`}
                onClick={() => setActiveTab('descriere')}
              >
                Descriere
              </button>
              <button
                className={`inline-block py-4 px-6 border-b-2 font-medium text-lg transition-colors ${
                  activeTab === 'specificatii' 
                    ? 'border-[#8a7d65] text-[#8a7d65]' 
                    : 'border-transparent text-[#696969] hover:text-[#404040]'
                }`}
                onClick={() => setActiveTab('specificatii')}
              >
                Specificații
              </button>
            </div>
          </div>
          
          {activeTab === 'descriere' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="prose max-w-none text-[#404040]"
            >
              <p className="mb-4">
                {product.descriere}
              </p>
              
              {product.categorii.includes('vopsele') ? (
                <>
                  <p className="mb-4">
                    Vopseaua decorativă premium este o soluție ideală pentru cei care doresc să aducă un plus de eleganță și rafinament în casa lor. Această vopsea se distinge prin:
                  </p>
                  <ul className="list-disc pl-5 mb-4 mt-4">
                    <li className="mb-2">Rezistență ridicată la spălare și uzură</li>
                    <li className="mb-2">Acoperire excelentă, chiar și pe suprafețe problematice</li>
                    <li className="mb-2">Produs ecologic, fără mirosuri persistente</li>
                    <li className="mb-2">Efect decorativ sofisticat care adaugă profunzime și textură pereților</li>
                    <li>Durabilitate îndelungată, menținându-și aspectul proaspăt ani de zile</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="mb-4">
                    Sistemul nostru de izolație termică exterioară oferă beneficii semnificative pentru orice clădire:
                  </p>
                  <ul className="list-disc pl-5 mb-4 mt-4">
                    <li className="mb-2">Reducerea consumului de energie pentru încălzire și răcire</li>
                    <li className="mb-2">Eliminarea punților termice și prevenirea condensului</li>
                    <li className="mb-2">Protecție împotriva intemperiilor și factorilor externi</li>
                    <li className="mb-2">Îmbunătățirea confortului termic în interior</li>
                    <li>Aspect estetic modern și uniform</li>
                  </ul>
                </>
              )}
              
              <p>
                {product.categorii.includes('vopsele') 
                  ? 'Aplicarea se realizează ușor, iar rezultatele sunt spectaculoase. Pentru cele mai bune rezultate, recomandăm pregătirea corespunzătoare a suprafeței și aplicarea unui strat de amorsă înainte de vopsea.'
                  : 'Montajul este realizat de specialiști certificați, cu materiale de cea mai bună calitate, pentru a asigura o instalare perfectă și o durabilitate maximă.'}
              </p>
            </motion.div>
          )}
          
          {activeTab === 'specificatii' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                {Object.entries(product.specificatii).map(([key, value]) => (
                  <div key={key} className="border-b border-[#e6e5e3] pb-4">
                    <h3 className="text-sm font-medium text-[#696969] mb-1">{key}</h3>
                    <p className="text-[#404040]">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Related Products */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-[#f8f8f6]">
        <div className="container mx-auto">
          <h2 className={`${spaceGrotesk.className} text-2xl md:text-3xl text-[#404040] mb-8`}>
            Produse similare
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would be dynamically populated with related products */}
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
              >
                <div className="relative h-48">
                  <Image
                    src="/images/product-placeholder.svg"
                    alt="Produs similar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-[#404040] font-medium mb-2">
                    {product.categorii.includes('vopsele') 
                      ? `Vopsea Decorativă ${item}` 
                      : `Izolație Termică ${item}`}
                  </h3>
                  <p className="text-[#696969] text-sm mb-3">
                    De la {150 + (item * 10)} RON
                  </p>
                  <a 
                    href={`/produs/${product.categorii.includes('vopsele') 
                      ? 'vopsea-lavabila-interior' 
                      : 'izolatie-termica-exterior'}`}
                    className="text-[#8a7d65] text-sm font-medium hover:text-[#8a7d65]/80 transition-colors"
                  >
                    Vezi detalii
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-[#8a7d65] blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-[#c3beb4] blur-3xl" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`${spaceGrotesk.className} text-3xl md:text-4xl text-[#404040] mb-6`}>
              Ai nevoie de ajutor pentru alegerea produsului potrivit?
            </h2>
            <p className="text-[#696969] mb-8">
              Echipa noastră de experți îți stă la dispoziție pentru a te ajuta să alegi soluția perfectă pentru proiectul tău.
            </p>
            <button className="px-8 py-4 bg-[#8a7d65] text-white rounded-full text-lg font-medium hover:bg-[#8a7d65]/80 transition-colors">
              Contactează-ne
            </button>
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
              <a href="#" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                Acasă
              </a>
              <a href="#" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                Servicii
              </a>
              <a href="#" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                Portofoliu
              </a>
              <a href="#" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                Despre Noi
              </a>
              <a href="#" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                Contact
              </a>
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
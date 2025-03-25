'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Space_Grotesk } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { Product } from '@/types/product';
import { useCart } from '@/lib/context/CartContext';
import { Suspense } from 'react';

// This gives us that modern, architectural feel
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const Tabs = {
  DESCRIERE: 'descriere' as const,
  SPECIFICATII: 'specificatii' as const,
};

type Tab = typeof Tabs[keyof typeof Tabs];

// Client component that uses useParams
function ProductDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<Tab>(Tabs.DESCRIERE);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0, percX: 0, percY: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [zoomScale, setZoomScale] = useState(2.5);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  // State for storing actual image dimensions
  const [imageRect, setImageRect] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const actualImageRef = useRef<HTMLImageElement>(null);

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

  // Handle quantity changes with proper validation
  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  // Handle adding product to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart(
      product,
      product.variante[selectedVariant],
      quantity
    );
  };

  // Handle zoom effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    
    const containerRect = imageContainerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to container
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;
    
    // Simple percentage calculation for uniform zooming
    const percX = (mouseX / containerRect.width) * 100;
    const percY = (mouseY / containerRect.height) * 100;
    
    setZoomPosition({ 
      x: mouseX, 
      y: mouseY,
      percX: percX,
      percY: percY
    });
  };

  // Handle mouse enter and leave
  const handleMouseEnter = () => {
    setShowZoom(true);
  };
  
  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  // Navigate between images
  const goToPreviousImage = () => {
    if (!product?.imagini) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.imagini!.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    if (!product?.imagini) return;
    setCurrentImageIndex((prev) => 
      prev === product.imagini!.length - 1 ? 0 : prev + 1
    );
  };

  // Open lightbox with specific image
  const openImageLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setOpenLightbox(true);
  };

  // Helper function to convert subcategory to URL parameter
  const getSubcategoryUrlParam = (subcategory: string | undefined): string => {
    if (!subcategory) return '';
    
    // Map each subcategory to its URL parameter
    switch (subcategory) {
      // Vopsele subcategories
      case 'ELF Decor':
        return 'elf-decor';
      case 'Vopsele interior':
        return 'vopsele-interior';
      case 'Amorse interior':
        return 'amorse-interior';
      case 'Vopsele & Amorse exterior':
        return 'vopsele-exterior';
      case 'Tencuieli/Amorse exterior':
        return 'tencuieli-amorse-exterior';
      case 'Vopsele epoxidice':
        return 'vopsele-epoxidice';
      case 'Vopsele pentru lemn/metal':
        return 'vopsele-lemn-metal';
      case 'Protectia lemnului':
        return 'protectia-lemnului';
        
      // Izolatii subcategories
      case 'IZOLATII ECO-FRIENDLY':
        return 'izolatii-eco-friendly';
      case 'MATERIALE HIDROIZOLANTE':
        return 'materiale-hidroizolante';
      case 'ADEZIVI&CHITURI':
        return 'adezivi-chituri';
        
      default:
        // Fallback to standard URL conversion
        return subcategory.replace(/\s+/g, '-').toLowerCase();
    }
  };

  // Zoom control handlers
  const handleZoomIncrease = () => {
    if (zoomScale < 5) {
      setZoomScale(Math.min(zoomScale + 0.5, 5));
    }
  };
  
  const handleZoomDecrease = () => {
    if (zoomScale > 1.5) {
      setZoomScale(Math.max(zoomScale - 0.5, 1.5));
    }
  };

  // Helper function to get Feerie base type
  const getFeerieBazaType = (variantaProdus: string): string => {
    const parts = variantaProdus.split(' ');
    if (parts[0] === 'Transparent') {
      return 'Transparent';
    } else if (parts[0] === 'White') {
      return `${parts[0]} ${parts[1]}`;
    }
    return '';
  };

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

  // Use original jpg files that have different content instead of duplicated png copies
  let productImages: string[] = [];
  if (product.imagini && product.imagini.length > 0) {
    // Check if we're dealing with Illusion Crystal product
    if (product.id === 'illusion-crystal') {
      // Use proper image mix with PNG as first image as requested
      productImages = [
        '/images/vopsele/elf-decor/illusion-crystal/illusionCrystal.png', 
        '/images/vopsele/elf-decor/illusion-crystal/illusionCrystal1.jpg',
        '/images/vopsele/elf-decor/illusion-crystal/illusionCrystal2.jpg',
        '/images/vopsele/elf-decor/illusion-crystal/illusionCrystalBase.jpg',
        '/images/vopsele/elf-decor/illusion-crystal/illusionCrystal3.jpg',
        '/images/vopsele/elf-decor/illusion-crystal/illusionCrystal4.jpg',
      ];
    } else {
      productImages = product.imagini;
    }
  } else {
    productImages = [product.linkImagine];
  }
  
  const currentImage = productImages[currentImageIndex];

  return (
    <>
      {/* Breadcrumb Navigation */}
      <nav className="py-4 px-4 sm:px-8 lg:px-16">
        <div className="container mx-auto">
          <ol className="flex flex-wrap text-sm text-[#696969]">
            <li className="flex items-center">
              <Link href="/" className="hover:text-[#8a7d65] transition-colors">
                Acasă
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link href="/produse" className="hover:text-[#8a7d65] transition-colors">
                Produse
              </Link>
              <span className="mx-2">/</span>
            </li>
            
            {/* Main Category - Vopsele or Izolații */}
            {product.categorii.some(cat => 
              cat === 'ELF Decor' || 
              cat === 'Vopsele interior' || 
              cat === 'Amorse interior' || 
              cat === 'Vopsele & Amorse exterior' || 
              cat === 'Tencuieli/Amorse exterior' || 
              cat === 'Vopsele epoxidice' || 
              cat === 'Vopsele pentru lemn/metal' || 
              cat === 'Protectia lemnului') ? (
              <>
                <li className="flex items-center">
                  <Link href="/produse?categorie=vopsele" className="hover:text-[#8a7d65] transition-colors">
                    Vopsele
                  </Link>
                  <span className="mx-2">/</span>
                </li>
                
                {/* Find the appropriate subcategory */}
                {product.categorii.find(cat => 
                  cat === 'ELF Decor' || 
                  cat === 'Vopsele interior' || 
                  cat === 'Amorse interior' || 
                  cat === 'Vopsele & Amorse exterior' || 
                  cat === 'Tencuieli/Amorse exterior' || 
                  cat === 'Vopsele epoxidice' || 
                  cat === 'Vopsele pentru lemn/metal' || 
                  cat === 'Protectia lemnului') && (
                  <li className="flex items-center">
                    <Link 
                      href={`/produse?categorie=vopsele&subcategorie=${getSubcategoryUrlParam(
                        product.categorii.find(cat => 
                          cat === 'ELF Decor' || 
                          cat === 'Vopsele interior' || 
                          cat === 'Amorse interior' || 
                          cat === 'Vopsele & Amorse exterior' || 
                          cat === 'Tencuieli/Amorse exterior' || 
                          cat === 'Vopsele epoxidice' || 
                          cat === 'Vopsele pentru lemn/metal' || 
                          cat === 'Protectia lemnului') || '')}`} 
                      className="hover:text-[#8a7d65] transition-colors"
                    >
                      {product.categorii.find(cat => 
                        cat === 'ELF Decor' || 
                        cat === 'Vopsele interior' || 
                        cat === 'Amorse interior' || 
                        cat === 'Vopsele & Amorse exterior' || 
                        cat === 'Tencuieli/Amorse exterior' || 
                        cat === 'Vopsele epoxidice' || 
                        cat === 'Vopsele pentru lemn/metal' || 
                        cat === 'Protectia lemnului')}
                    </Link>
                    <span className="mx-2">/</span>
                  </li>
                )}
              </>
            ) : product.categorii.includes('izolații') || product.categorii.some(cat => cat.includes('izolatie')) ? (
              <>
                <li className="flex items-center">
                  <Link href="/produse?categorie=izolatii" className="hover:text-[#8a7d65] transition-colors">
                    Izolații
                  </Link>
                  <span className="mx-2">/</span>
                </li>
                
                {/* Show subcategory for Izolații if it exists */}
                {product.categorii.find(cat => 
                  cat === 'IZOLATII ECO-FRIENDLY' || 
                  cat === 'MATERIALE HIDROIZOLANTE' || 
                  cat === 'ADEZIVI&CHITURI') && (
                  <li className="flex items-center">
                    <Link 
                      href={`/produse?categorie=izolatii&subcategorie=${getSubcategoryUrlParam(
                        product.categorii.find(cat => 
                          cat === 'IZOLATII ECO-FRIENDLY' || 
                          cat === 'MATERIALE HIDROIZOLANTE' || 
                          cat === 'ADEZIVI&CHITURI') || '')}`} 
                      className="hover:text-[#8a7d65] transition-colors"
                    >
                      {product.categorii.find(cat => 
                        cat === 'IZOLATII ECO-FRIENDLY' || 
                        cat === 'MATERIALE HIDROIZOLANTE' || 
                        cat === 'ADEZIVI&CHITURI')}
                    </Link>
                    <span className="mx-2">/</span>
                  </li>
                )}
              </>
            ) : (
              product.categorii[0] && (
                <li className="flex items-center">
                  <Link href={`/produse?categorie=${encodeURIComponent(product.categorii[0])}`} className="hover:text-[#8a7d65] transition-colors">
                    {product.categorii[0]}
                  </Link>
                  <span className="mx-2">/</span>
                </li>
              )
            )}
            
            <li className="text-[#8a7d65] font-medium">
              {product.titlu}
            </li>
          </ol>
        </div>
      </nav>
      
      {/* Product Detail Section */}
      <section className="py-6 px-4 sm:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image with Carousel and Zoom Effect */}
            <motion.div 
              className="flex flex-col space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main Image with Zoom Effect */}
              <div 
                className="relative rounded-3xl overflow-hidden bg-white shadow-lg h-[400px] sm:h-[500px]"
                ref={imageContainerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => openImageLightbox(currentImageIndex)}
              >
                <div className={`absolute inset-0 flex items-center justify-center bg-white transition-opacity duration-300 ${isImageLoaded ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="w-16 h-16 border-4 border-t-[#8a7d65] border-[#8a7d65]/20 rounded-full animate-spin"></div>
                </div>
                
                {/* Regular Image */}
                <div className="relative h-full w-full">
                  <Image
                    ref={actualImageRef}
                    src={currentImage}
                    alt={product.titlu}
                    fill
                    className={`object-contain transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoadingComplete={() => setIsImageLoaded(true)}
                    priority
                  />
                  
                  {/* Simple Magnifier */}
                  {showZoom && isImageLoaded && (
                    <div 
                      className="absolute pointer-events-none"
                      style={{
                        width: '180px',
                        height: '180px',
                        borderRadius: '50%',
                        border: '2px solid #8a7d65',
                        overflow: 'hidden',
                        position: 'absolute',
                        left: `${zoomPosition.x}px`,
                        top: `${zoomPosition.y}px`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
                      }}
                    >
                      {/* Use direct inline styles instead of styled-jsx */}
                      <div
                        style={{
                          backgroundImage: `url(${currentImage})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          backgroundSize: 'contain',
                          position: 'absolute',
                          width: `${300 * zoomScale}%`,
                          height: `${300 * zoomScale}%`,
                          top: '50%',
                          left: '50%',
                          transform: `translate(-50%, -50%) translate(${-(zoomPosition.percX - 50) * 2}px, ${-(zoomPosition.percY - 50) * 2}px)`
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Zoom controls - only show on desktop */}
                  <div className="absolute bottom-4 right-4 z-20 hidden sm:flex space-x-2">
                    <button
                      className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[#404040] hover:bg-white transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleZoomDecrease();
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                    <button
                      className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[#404040] hover:bg-white transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleZoomIncrease();
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Navigation arrows */}
                  <button 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-[#404040] hover:bg-white transition-colors z-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPreviousImage();
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-[#404040] hover:bg-white transition-colors z-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNextImage();
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                
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
              </div>
              
              {/* Thumbnail Carousel */}
              {productImages.length > 1 && (
                <div className="relative">
                  <div className="overflow-x-auto hide-scrollbar">
                    <div className="flex space-x-3 py-2">
                      {productImages.map((img, index) => (
                        <button
                          key={index}
                          className={`relative rounded-lg overflow-hidden min-w-[70px] h-[70px] border-2 transition-colors ${
                            currentImageIndex === index 
                              ? 'border-[#8a7d65]' 
                              : 'border-transparent hover:border-[#8a7d65]/50'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <Image 
                            src={img} 
                            alt={`${product.titlu} - imagine ${index + 1}`} 
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
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
                    {product.variante[selectedVariant].pret.minim === product.variante[selectedVariant].pret.maxim
                      ? `${product.variante[selectedVariant].pret.minim} RON`
                      : `${product.variante[selectedVariant].pret.minim} - ${product.variante[selectedVariant].pret.maxim} RON`
                    }
                  </span>
                  <span className="ml-2 text-sm text-[#696969]">
                    {product.variante[selectedVariant].cantitatePachet === '1KG' ? '/ kg' : ''}
                  </span>
                </div>
                <p className="text-sm text-[#696969] italic">
                  *Prețul final depinde de suprafața de acoperit și cerințele specifice.
                </p>
              </div>
              
              {/* Variant Selector */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-[#404040] mb-3">Variante disponibile:</h3>
                {/* For ELF Decor products (except Illusion Crystal), show variant selectors */}
                {product.categorii.includes('ELF Decor') && product.id !== 'illusion-crystal' ? (
                  <div className="flex flex-col space-y-6">
                    {/* Display base type selection for FEERIE as pills */}
                    {product.id === 'feerie' && (
                      <div>
                        <label className="block text-sm font-medium text-[#404040] mb-3">Bază:</label>
                        <div className="flex flex-wrap gap-3">
                          {Array.from(new Set(product.variante.map(v => getFeerieBazaType(v.variantaProdus)))).map(baseType => (
                            <button
                              key={baseType}
                              className={`px-4 py-2 rounded-full text-sm transition-all ${
                                getFeerieBazaType(product.variante[selectedVariant].variantaProdus) === baseType
                                  ? 'bg-[#8a7d65] text-white shadow-md' 
                                  : 'bg-white border border-[#e6e5e3] text-[#404040] hover:border-[#8a7d65]/50'
                              }`}
                              onClick={() => {
                                const size = product.variante[selectedVariant].cantitatePachet;
                                const newVariantIndex = product.variante.findIndex(v => 
                                  getFeerieBazaType(v.variantaProdus) === baseType && v.cantitatePachet === size
                                );
                                if (newVariantIndex !== -1) setSelectedVariant(newVariantIndex);
                              }}
                            >
                              {baseType}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Display color selection for Persia and Sahara as pills */}
                    {(product.id === 'persia' || product.id === 'sahara') && (
                      <div>
                        <label className="block text-sm font-medium text-[#404040] mb-3">Culoare:</label>
                        <div className="flex flex-wrap gap-3">
                          {product.id === 'persia' ? (
                            Array.from(new Set(product.variante.map(v => {
                              // Extract just the color part (e.g., "ALB PERLAT", "ALB SIDEFAT", "AURIU")
                              const parts = v.variantaProdus.split(' ');
                              if (parts[0] === 'ALB' || parts[0] === 'WHITE') {
                                return `${parts[0]} ${parts[1]}`;
                              }
                              return parts[0]; // For "AURIU"
                            }))).map(colorType => {
                              // Get current color from selected variant
                              const currentParts = product.variante[selectedVariant].variantaProdus.split(' ');
                              const currentColor = currentParts[0] === 'ALB' || currentParts[0] === 'WHITE' 
                                ? `${currentParts[0]} ${currentParts[1]}`
                                : currentParts[0];
                                
                              return (
                                <button
                                  key={colorType}
                                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                                    currentColor === colorType
                                      ? 'bg-[#8a7d65] text-white shadow-md' 
                                      : 'bg-white border border-[#e6e5e3] text-[#404040] hover:border-[#8a7d65]/50'
                                  }`}
                                  onClick={() => {
                                    const size = product.variante[selectedVariant].cantitatePachet;
                                    const newVariantIndex = product.variante.findIndex(v => {
                                      const parts = v.variantaProdus.split(' ');
                                      let variantColorName = '';
                                      
                                      if (parts[0] === 'ALB' || parts[0] === 'WHITE') {
                                        variantColorName = `${parts[0]} ${parts[1]}`;
                                      } else {
                                        variantColorName = parts[0]; // For "AURIU"
                                      }
                                      
                                      return variantColorName === colorType && v.cantitatePachet === size;
                                    });
                                    
                                    if (newVariantIndex !== -1) setSelectedVariant(newVariantIndex);
                                  }}
                                >
                                  {colorType}
                                </button>
                              );
                            })
                          ) : (
                            Array.from(new Set(product.variante.map(v => v.variantaProdus.split(' ')[0]))).map(colorType => (
                              <button
                                key={colorType}
                                className={`px-4 py-2 rounded-full text-sm transition-all ${
                                  product.variante[selectedVariant].variantaProdus.split(' ')[0] === colorType
                                    ? 'bg-[#8a7d65] text-white shadow-md' 
                                    : 'bg-white border border-[#e6e5e3] text-[#404040] hover:border-[#8a7d65]/50'
                                }`}
                                onClick={() => {
                                  const size = product.variante[selectedVariant].cantitatePachet;
                                  const newVariantIndex = product.variante.findIndex(v => 
                                    v.variantaProdus.split(' ')[0] === colorType && v.cantitatePachet === size
                                  );
                                  if (newVariantIndex !== -1) setSelectedVariant(newVariantIndex);
                                }}
                              >
                                {colorType}
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Package size selector (1KG or 5KG) as pills */}
                    <div>
                      <label className="block text-sm font-medium text-[#404040] mb-3">Ambalaj:</label>
                      <div className="flex flex-wrap gap-3">
                        <button
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            product.variante[selectedVariant].cantitatePachet === '1KG'
                              ? 'bg-[#8a7d65] text-white shadow-md' 
                              : 'bg-white border border-[#e6e5e3] text-[#404040] hover:border-[#8a7d65]/50'
                          }`}
                          onClick={() => {
                            let baseOrColorType = '';
                            
                            // Extract the appropriate type value from the current variant
                            if (product.id === 'feerie') {
                              baseOrColorType = getFeerieBazaType(product.variante[selectedVariant].variantaProdus);
                            } else if (product.id === 'persia') {
                              // For Persia, get the color type (e.g., ALB PERLAT, ALB SIDEFAT, AURIU)
                              const parts = product.variante[selectedVariant].variantaProdus.split(' ');
                              if (parts[0] === 'ALB' || parts[0] === 'WHITE') {
                                baseOrColorType = `${parts[0]} ${parts[1]}`;
                              } else {
                                baseOrColorType = parts[0]; // For "AURIU"
                              }
                            } else if (product.id === 'sahara') {
                              // For Sahara, get just the color (ARGINTIU or AURIU)
                              baseOrColorType = product.variante[selectedVariant].variantaProdus.split(' ')[0];
                            }
                            
                            // Find the matching variant
                            let newVariantIndex;
                            if (baseOrColorType) {
                              newVariantIndex = product.variante.findIndex(v => 
                                v.variantaProdus.includes(baseOrColorType) && v.cantitatePachet === '1KG'
                              );
                            } else {
                              newVariantIndex = product.variante.findIndex(v => 
                                v.cantitatePachet === '1KG'
                              );
                            }
                            
                            if (newVariantIndex !== -1) setSelectedVariant(newVariantIndex);
                          }}
                        >
                          1 kg
                        </button>
                        <button
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            product.variante[selectedVariant].cantitatePachet === '5KG'
                              ? 'bg-[#8a7d65] text-white shadow-md' 
                              : 'bg-white border border-[#e6e5e3] text-[#404040] hover:border-[#8a7d65]/50'
                          }`}
                          onClick={() => {
                            let baseOrColorType = '';
                            
                            // Extract the appropriate type value from the current variant
                            if (product.id === 'feerie') {
                              baseOrColorType = getFeerieBazaType(product.variante[selectedVariant].variantaProdus);
                            } else if (product.id === 'persia') {
                              // For Persia, get the color type (e.g., ALB PERLAT, ALB SIDEFAT, AURIU)
                              const parts = product.variante[selectedVariant].variantaProdus.split(' ');
                              if (parts[0] === 'ALB' || parts[0] === 'WHITE') {
                                baseOrColorType = `${parts[0]} ${parts[1]}`;
                              } else {
                                baseOrColorType = parts[0]; // For "AURIU"
                              }
                            } else if (product.id === 'sahara') {
                              // For Sahara, get just the color (ARGINTIU or AURIU)
                              baseOrColorType = product.variante[selectedVariant].variantaProdus.split(' ')[0];
                            }
                            
                            // Find the matching variant
                            let newVariantIndex;
                            if (baseOrColorType) {
                              newVariantIndex = product.variante.findIndex(v => 
                                v.variantaProdus.includes(baseOrColorType) && v.cantitatePachet === '5KG'
                              );
                            } else {
                              newVariantIndex = product.variante.findIndex(v => 
                                v.cantitatePachet === '5KG'
                              );
                            }
                            
                            if (newVariantIndex !== -1) setSelectedVariant(newVariantIndex);
                          }}
                        >
                          5 kg
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Original variant buttons for non-ELF Decor products or Illusion Crystal
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
                )}
                
                {/* Help text for ELF Decor products */}
                {product.categorii.includes('ELF Decor') && product.id !== 'illusion-crystal' && (
                  <p className="mt-3 text-sm text-[#696969] italic">
                    Selectați ambalajul dorit pentru a vizualiza prețul corespunzător.
                  </p>
                )}
              </div>
              
              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-[#404040] mb-3">Cantitate (număr de ambalaje):</h3>
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
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  className="px-6 py-3 bg-[#8a7d65] text-white rounded-full flex items-center hover:bg-[#8a7d65]/90 transition-colors"
                  onClick={handleAddToCart}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M16 8h-2V6a4 4 0 00-8 0v2H4a1 1 0 00-1 1v10a3 3 0 003 3h10a3 3 0 003-3V9a1 1 0 00-1-1zm-8-2a2 2 0 014 0v2H8V6zm9 13a1 1 0 01-1 1H6a1 1 0 01-1-1V10h2v2a1 1 0 002 0v-2h4v2a1 1 0 002 0v-2h2v9z" fill="currentColor"/>
                  </svg>
                  Adaugă în coș
                </button>
                
                <button
                  className="px-6 py-3 border border-[#e6e5e3] text-[#404040] rounded-full flex items-center hover:border-[#8a7d65]/50 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M12 20.25a1 1 0 01-.67-.26l-8-7.2a5.23 5.23 0 01-1.8-3.95 5.22 5.22 0 013.4-4.92 5.16 5.16 0 015.32 1l1.75 1.6 1.72-1.57a5.19 5.19 0 015.33-1 5.22 5.22 0 013.4 4.92 5.23 5.23 0 01-1.81 3.93l-8 7.2a1 1 0 01-.64.25z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                  Adaugă la favorite
                </button>
              </div>
              
              {/* Additional Product Info */}
              <div className="bg-[#f0efed] p-4 rounded-lg">
                <h3 className="text-sm font-medium text-[#404040] mb-2">Informații livrare:</h3>
                <div className="flex items-center mb-2 text-sm text-[#696969]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M22 16.5h-1.88c-.3-1.17-1.4-2-2.62-2s-2.32.83-2.62 2H8.12c-.3-1.17-1.4-2-2.62-2s-2.32.83-2.62 2H1v-5h16v-9H3v9h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.5 18.5a2 2 0 100-4 2 2 0 000 4zM17.5 18.5a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Livrare în 1-3 zile lucrătoare</span>
                </div>
                <div className="flex items-center text-sm text-[#696969]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Comandă acum pentru a primi produsul cât mai repede</span>
                </div>
              </div>
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
                  activeTab === Tabs.DESCRIERE 
                    ? 'border-[#8a7d65] text-[#8a7d65]' 
                    : 'border-transparent text-[#696969] hover:text-[#404040]'
                }`}
                onClick={() => setActiveTab(Tabs.DESCRIERE)}
              >
                Descriere
              </button>
              <button
                className={`inline-block py-4 px-6 border-b-2 font-medium text-lg transition-colors ${
                  activeTab === Tabs.SPECIFICATII 
                    ? 'border-[#8a7d65] text-[#8a7d65]' 
                    : 'border-transparent text-[#696969] hover:text-[#404040]'
                }`}
                onClick={() => setActiveTab(Tabs.SPECIFICATII)}
              >
                Specificații
              </button>
            </div>
          </div>
          
          {activeTab === Tabs.DESCRIERE && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="prose max-w-none text-[#404040]"
            >
              {product.descriere.split('\n').map((paragraph, idx) => (
                <p key={idx} className={idx === 0 ? 'text-lg' : ''}>
                  {paragraph}
                </p>
              ))}
              
              {product.foaieTehnica && (
                <div className="mt-8">
                  <a 
                    href={product.foaieTehnica} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#8a7d65] hover:underline"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M14 3v4a1 1 0 001 1h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 9h1M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Descarcă fișa tehnică
                  </a>
                </div>
              )}
            </motion.div>
          )}
          
          {activeTab === Tabs.SPECIFICATII && (
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
      
      {/* Lightbox */}
      <AnimatePresence>
        {openLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setOpenLightbox(false)}
          >
            <div 
              className="relative max-w-6xl w-full h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={productImages[lightboxImageIndex]}
                alt={product.titlu}
                fill
                className="object-contain"
              />
              
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImageIndex(prev => 
                    prev === 0 ? productImages.length - 1 : prev - 1
                  );
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImageIndex(prev => 
                    prev === productImages.length - 1 ? 0 : prev + 1
                  );
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              
              <button 
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                onClick={() => setOpenLightbox(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              
              {/* Thumbnails */}
              {productImages.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="flex space-x-2 bg-black/50 rounded-full px-4 py-2">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          lightboxImageIndex === index ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
                        }`}
                        onClick={() => setLightboxImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Global styles for the component */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}

// Main component that wraps the client component in Suspense
export default function ProductPage() {
  return (
    <main className="min-h-screen relative bg-[#f8f8f6]">
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f8f8f6]">
          <div className="relative w-24 h-24">
            <div className="absolute w-full h-full border-4 border-[#8a7d65]/20 rounded-full animate-ping"></div>
            <div className="absolute w-full h-full border-4 border-t-[#8a7d65] rounded-full animate-spin"></div>
          </div>
        </div>
      }>
        <div className="pt-28">
          <ProductDetailContent />
        </div>
      </Suspense>
    </main>
  );
} 
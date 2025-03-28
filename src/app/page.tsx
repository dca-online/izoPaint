'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ServiceCard from '@/components/ServiceCard';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import VideoHeader from '@/components/VideoHeader';
import BackgroundVideo from '@/components/BackgroundVideo';
import HomeServiceScroller from '@/components/HomeServiceScroller';
import Footer from '@/components/Footer';
import styles from '@/components/FullPageSections.module.css';

// Our showcase of beautiful paint and insulation services
const paintServices = [
  {
    title: 'Vopsele decorative premium',
    description: 'Transformă-ți spațiul cu vopsele decorative de înaltă calitate, cu efecte unice și finisaje elegante.',
    icon: '/icons/paint.svg',
    link: '/servicii',
    imageSrc: '/images/product-placeholder.svg'
  },
  {
    title: 'Vopsele ecologice',
    description: 'Soluții eco-friendly pentru interior, fără compuși organici volatili, ideale pentru dormitoare și camere de copii.',
    icon: '/icons/eco.svg',
    link: '/servicii',
    imageSrc: '/images/product-placeholder.svg'
  },
  {
    title: 'Finisaje speciale',
    description: 'Efecte decorative premium care adaugă textură, strălucire și personalitate oricărui perete.',
    icon: '/icons/quality.svg',
    link: '/servicii',
    imageSrc: '/images/product-placeholder.svg'
  }
];

const insulationServices = [
  {
    title: 'Izolație termică exterioară',
    description: 'Sisteme complete de izolație termică pentru fațade, care reduc semnificativ pierderile de căldură.',
    icon: '/icons/thermal.svg',
    link: '/servicii#izolatie',
    imageSrc: '/images/service-placeholder.svg'
  },
  {
    title: 'Izolație fonică',
    description: 'Soluții profesionale pentru reducerea zgomotului și îmbunătățirea confortului acustic în orice spațiu.',
    icon: '/icons/eco.svg',
    link: '/servicii#izolatie',
    imageSrc: '/images/service-placeholder.svg'
  },
  {
    title: 'Hidroizolații',
    description: 'Sisteme de impermeabilizare pentru protecția clădirilor împotriva infiltrațiilor și umezelii.',
    icon: '/icons/warranty.svg',
    link: '/servicii#izolatie',
    imageSrc: '/images/service-placeholder.svg'
  }
];

// Paint color options for the color showcase section
const paintColors = [
  {
    id: "color-101",
    name: "Vopsea Mătăsoasă",
    colorCode: "#d9c8ba",
    description: "O nuanță caldă și rafinată, inspirată din textura mătăsii naturale, aduce eleganță și confort în orice spațiu.",
    number: "101",
    complementaryColors: [
      { name: "Alb Crem", code: "#eae3d9" },
      { name: "Cafeniu Vintage", code: "#8a7d65" }
    ]
  },
  {
    id: "color-102",
    name: "Verde Oxid",
    colorCode: "#636f68",
    description: "Un verde profund cu subtile tonuri de gri, inspirat din oxidul natural. Creează o atmosferă sofisticată și liniștitoare.",
    number: "102",
    complementaryColors: [
      { name: "Vopsea Mătăsoasă", code: "#d9c8ba" },
      { name: "Alb Crem", code: "#eae3d9" }
    ],
    isDark: true
  },
  {
    id: "color-103",
    name: "Bleu Serenity",
    colorCode: "#a8c3d2",
    description: "Un albastru calmant, inspirat din azurul cerului senin, ideal pentru dormitoare și spații de relaxare.",
    number: "103",
    complementaryColors: [
      { name: "Alb Pur", code: "#ffffff" },
      { name: "Gri Perlat", code: "#e5e5e5" }
    ]
  },
  {
    id: "color-104",
    name: "Terra Nova",
    colorCode: "#a86a3f",
    description: "Un maro cald, bogat și pământos care aduce căldură și profunzime spațiilor contemporane.",
    number: "104",
    complementaryColors: [
      { name: "Bej Natural", code: "#e8d9c5" },
      { name: "Verde Salvie", code: "#b5bfa1" }
    ],
    isDark: true
  },
  {
    id: "color-105",
    name: "Gri Nordic",
    colorCode: "#d6d6d6",
    description: "Un gri elegant, neutru, ce aduce un aer scandinav minimalist și se adaptează oricărui stil interior.",
    number: "105",
    complementaryColors: [
      { name: "Alb Arctic", code: "#f8f8f8" },
      { name: "Negru Mat", code: "#333333" }
    ]
  },
  {
    id: "color-106",
    name: "Roz Quartz",
    colorCode: "#e8cdd7",
    description: "Un roz delicat, subtil și contemporan, perfect pentru a adăuga o nuanță tinerească spațiilor moderne.",
    number: "106",
    complementaryColors: [
      { name: "Gri Perlat", code: "#e5e5e5" },
      { name: "Bleu Serenity", code: "#a8c3d2" }
    ]
  },
  {
    id: "color-107",
    name: "Negru Elegant",
    colorCode: "#212121",
    description: "Un negru sofisticat și intens, ideal pentru accentuarea elementelor arhitecturale și crearea contrastelor dramatice.",
    number: "107",
    complementaryColors: [
      { name: "Alb Pur", code: "#ffffff" },
      { name: "Auriu", code: "#d4af37" }
    ],
    isDark: true
  }
];

export default function Home() {
  const [useSimpleVersion, setUseSimpleVersion] = useState(false);
  const [activeBgColor, setActiveBgColor] = useState('#f5f3ee'); // Default to intro section color
  
  // Add effect to hide address bar on mobile
  useEffect(() => {
    const hideAddressBar = () => {
      // Get the header section element
      const headerSection = document.getElementById('header-section');
      
      // Don't do any scrolling if we're at or near the video header
      if (!headerSection) return;
      
      // Check header visibility - more comprehensive check
      const headerRect = headerSection.getBoundingClientRect();
      const isHeaderVisible = headerRect.top >= -100 && headerRect.top <= 100;
      
      // Skip address bar hiding completely if header is visible
      if (isHeaderVisible) return;
      
      // Only force a scroll if we're nowhere near the header
      if (typeof window !== 'undefined' && !isHeaderVisible) {
        window.scrollTo(0, 1);
      }
    };
    
    // Set CSS variable for viewport height
    const setVhVariable = () => {
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        // Get the actual viewport height
        const vh = window.innerHeight * 0.01;
        // Set the value as a CSS variable
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
    };
    
    // Attempt to hide address bar after page loads
    if (typeof window !== 'undefined') {
      // Apply vh variable immediately
      setVhVariable();
      
      // When checking if address bar should be hidden, respect the video header
      window.addEventListener('load', () => {
        const headerSection = document.getElementById('header-section');
        if (!headerSection) return;
        
        // Check if we're at or near the header
        const headerRect = headerSection.getBoundingClientRect();
        const isHeaderVisible = headerRect.top >= -100 && headerRect.top <= 100;
        
        // Only proceed if we're nowhere near the header
        if (!isHeaderVisible) {
          hideAddressBar();
        }
      });
      
      // Listen for scroll events to prevent auto-scroll when near header
      window.addEventListener('scroll', () => {
        const headerSection = document.getElementById('header-section');
        if (!headerSection) return;
        
        // Mark that we're near the header in a data attribute
        const headerRect = headerSection.getBoundingClientRect();
        const isHeaderVisible = headerRect.top >= -100 && headerRect.top <= 100;
        
        // Set a flag on document body to indicate header visibility
        document.body.setAttribute('data-header-visible', isHeaderVisible.toString());
      }, { passive: true });
      
      window.addEventListener('resize', setVhVariable);
      window.addEventListener('orientationchange', setVhVariable);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', hideAddressBar);
        window.removeEventListener('resize', setVhVariable);
        window.removeEventListener('orientationchange', setVhVariable);
        window.removeEventListener('scroll', () => {});
      }
    };
  }, []);

  // If we encounter errors with the Panorama component, fall back to the simple version
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('CSSStyleDeclaration') || 
          event.message.includes('Panorama') || 
          event.message.includes('Failed to set')) {
        console.log('Detected Panorama error, using simple version');
        setUseSimpleVersion(true);
      }
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Dynamic background color transition effect
  useEffect(() => {
    // Observer for changing background color when card content is 30% visible
    const colorObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const element = entry.target as HTMLElement;
            const sectionColor = element.getAttribute('data-color');
            if (sectionColor) {
              setActiveBgColor(sectionColor);
            } else if (element.classList.contains('intro-section')) {
              setActiveBgColor('#f5f3ee'); // Reset to intro color
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    // Observe paint color content sections
    setTimeout(() => {
      const colorSections = document.querySelectorAll('.paint-color-content');
      colorSections.forEach(section => {
        colorObserver.observe(section);
      });
    }, 500); // Small delay to ensure DOM is ready

    return () => {
      colorObserver.disconnect();
    };
  }, []);

  // Simple section snapping for paint color sections ONLY - DISABLED
  useEffect(() => {
    // Disable section snapping completely
    return;
    
    // Original code below is never reached - everything is disabled
    
    // Only apply on mobile
    if (typeof window === 'undefined' || window.innerWidth >= 768) {
      // Desktop implementation remains the same but also disabled
      return;
    }
    
    // MOBILE IMPLEMENTATION - completely disabled
  }, []);

  // Fix for setting section heights after hydration to avoid mismatch
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <SmoothScrollProvider>
      <BackgroundVideo 
        videoSrc="/videos/paint.mp4" 
        verticalFlip={typeof window !== 'undefined' && window.innerWidth < 768}
      />
      
      <Navbar />
      
      <main className="relative min-h-screen">
        {/* Hero Section with VideoHeader */}
        <section id="hero" className="relative">
          <VideoHeader />
        </section>
        
        {/* Services Section - First Standalone Section */}
        <section id="services" className="relative w-full py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Desktop version */}
              <h2 className="hidden md:block text-4xl md:text-6xl font-bold text-[#404040] max-w-5xl text-left mb-2">
                Vopsele moderne & Izolații eco-friendly
              </h2>
              
              {/* Mobile version - stacked with gold ampersand */}
              <div className="flex md:hidden items-start mb-2">
                <div className="flex flex-col">
                  <h2 className="text-3xl font-bold text-[#404040] leading-tight">
                    Vopsele moderne
                  </h2>
                  <h2 className="text-3xl font-bold text-[#404040] leading-tight">
                    Izolații eco-friendly
                  </h2>
                </div>
                <span className="text-8xl font-['Bebas_Neue'] text-[#8a7d65] ml-3 flex items-center justify-center" style={{ height: '90%', alignSelf: 'stretch', lineHeight: '0.8', marginTop: '-1px' }}>&</span>
              </div>
              
              {/* Mobile text aligned with heading */}
              <div className="md:hidden">
                <p className="text-lg text-[#1A1A1A] max-w-2xl mb-4">
                  Oferim soluții complete pentru transformarea spațiilor, de la vopsele decorative premium la sisteme de izolație eco-friendly.
                </p>
              </div>
              
              {/* Desktop text aligned left with heading */}
              <p className="hidden md:block text-lg text-[#1A1A1A] max-w-2xl text-left">
                Oferim soluții complete pentru transformarea spațiilor, de la vopsele decorative premium la sisteme de izolație eco-friendly.
              </p>
            </motion.div>
          </div>
            
          {/* Vopsele Section with Horizontal Scroller - Full width outside container */}
          <div className="mb-20 w-full overflow-x-hidden">
            <HomeServiceScroller 
              services={paintServices}
              categoryType="vopsele"
              title="Vopsele Moderne"
            />
          </div>
          
          {/* Izolații Section with Horizontal Scroller - Full width outside container */}
          <div className="pt-12 w-full overflow-x-hidden">
            <HomeServiceScroller 
              services={insulationServices}
              categoryType="izolatii"
              title="Izolații Eco-Friendly"
            />
          </div>
        </section>
        
        {/* Paint Colors Showcase - Second Standalone Section */}
        <section 
          id="paint-colors" 
          className="relative w-full overflow-hidden"
          style={{ 
            backgroundColor: activeBgColor,
            transition: 'background-color 0.8s ease'
          }}
        >
          {/* Paint Color Showcase - Introduction */}
          <div className="relative w-full flex flex-col items-center justify-center paint-color-section"
              style={{ 
                height: isMounted && typeof window !== 'undefined' ? 
                  `${window.visualViewport?.height || window.innerHeight}px` : '100vh',
                maxHeight: isMounted && typeof window !== 'undefined' ? 
                  `${window.visualViewport?.height || window.innerHeight}px` : '100vh',
                padding: '0',
                boxSizing: 'border-box',
                overflow: 'hidden'
              }}>
            {/* Top washout effect */}
            <div className="absolute top-0 left-0 w-full h-[250px] bg-gradient-to-b from-white via-white/90 to-[#f5f3ee]/0 z-10 pointer-events-none"></div>
            <div className="w-full px-4 md:px-8 py-8 paint-color-content intro-section">
              {/* Desktop intro */}
              <div className="hidden md:flex items-stretch w-full max-w-full mx-auto">
                <div className="w-1/2 pl-16 pr-12 flex flex-col justify-center">
                  <h2 className="text-6xl font-bold mb-8 text-[#333] tracking-tight leading-tight">
                    Descoperă noile noastre nuanțe premium
                  </h2>
                  <p className="text-2xl text-[#666] mb-10 leading-relaxed max-w-2xl">
                    Aceste nuanțe sofisticate celebrează, iluminează și îmbogățesc spațiul de zi cu zi. Extraordinarul în ordinar.
                  </p>
                  <div className="mt-10">
                    <button className="px-10 py-5 bg-[#8a7d65] text-white rounded-full text-xl hover:bg-[#6d624f] transition-all duration-300">
                      Explorează colecția
                    </button>
                  </div>
                </div>
                <div className="w-1/2 pl-4">
                  <div className={`h-full rounded-none ${styles.paintImage}`}>
                    <div className="w-full h-full bg-[#8a7d65]/20 flex items-center justify-center">
                      {/* Simple decorative shape */}
                      <svg width="60%" height="60%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <rect x="40" y="40" width="120" height="120" fill="#8a7d65" opacity="0.5" />
                        <circle cx="100" cy="100" r="50" fill="#8a7d65" opacity="0.7" />
                        <path d="M60,60 L140,140 M60,140 L140,60" stroke="#ffffff" strokeWidth="6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile intro */}
              <div className="md:hidden flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold mb-6 text-[#333] tracking-tight">
                Descoperă noile noastre nuanțe premium
              </h2>
                <p className="text-base text-[#666] mb-8">
                Aceste nuanțe sofisticate celebrează, iluminează și îmbogățesc spațiul de zi cu zi. Extraordinarul în ordinar.
              </p>
                <div className="mt-4 w-full">
                  <button className="w-full px-8 py-3 bg-[#8a7d65] text-white rounded-full hover:bg-[#6d624f] transition-all duration-300">
                  Explorează colecția
                </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Paint Color Sections */}
          {paintColors.map((color, index) => (
            <div 
              key={color.id}
              className={`relative w-full flex flex-col items-center justify-center overflow-hidden paint-color-section ${styles.paintColorSection}`}
              style={{ 
                height: isMounted && typeof window !== 'undefined' ? 
                  `${window.visualViewport?.height || window.innerHeight}px` : '100vh',
                maxHeight: isMounted && typeof window !== 'undefined' ? 
                  `${window.visualViewport?.height || window.innerHeight}px` : '100vh',
                padding: '0',
                boxSizing: 'border-box',
                ...(index === paintColors.length - 1 ? {
                  marginBottom: '-20px',
                  zIndex: 1
                } : {})
              }}
            >
              {/* Subtle section separator */}
              {index > 0 && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 max-w-4xl">
                  <div className="w-full h-[2px] bg-white/30"></div>
                </div>
              )}
              
              {/* Bottom blending effect for last section */}
              {index === paintColors.length - 1 && (
                <div className="absolute bottom-0 left-0 w-full h-[160px] bg-gradient-to-t from-[#1a1a1a] via-[#212121]/90 to-transparent z-10"></div>
              )}
              
              {/* Counter-rounded corners effect for the last section */}
              {index === paintColors.length - 1 && (
                <div className="absolute -bottom-1 left-0 w-full z-20 pointer-events-none">
                  <div className="relative h-[40px] overflow-hidden">
                    <div className="absolute top-0 left-[20px] right-[20px] h-[80px] bg-[#1a1a1a] rounded-t-[40px]"></div>
                  </div>
                </div>
              )}
              <div 
                className="w-full px-4 md:px-8 paint-color-content"
                data-color={color.colorCode}
                style={{
                  paddingTop: isMounted && typeof window !== 'undefined' ? 
                    `${window.innerWidth >= 768 ? window.innerHeight * 0.05 : window.innerHeight * 0.03}px` : '3rem',
                  paddingBottom: isMounted && typeof window !== 'undefined' ? 
                    `${window.innerWidth >= 768 ? window.innerHeight * 0.05 : window.innerHeight * 0.03}px` : '3rem'
                }}
              >
                {/* Desktop design - clean 50/50 split */}
                <div className="hidden md:flex items-stretch w-full max-w-full mx-auto">
                  {/* For odd indices: Left images, right text */}
                  {index % 2 === 0 ? (
                    <>
                      {/* Left side - Images (full height, edge to edge) */}
                      <div className="w-1/2 pr-4">
                        <div className={`h-full rounded-none ${styles.paintImage}`}>
                          <div className="w-full h-full bg-[#8a7d65]/20 flex items-center justify-center">
                            {/* Simple decorative shape with color accent */}
                            <svg width="50%" height="50%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                              <rect x="30" y="30" width="140" height="140" fill={color.colorCode} opacity="0.5" />
                              <circle cx="100" cy="100" r="60" fill={color.colorCode} opacity="0.7" />
                              <path d="M70,70 L130,130 M70,130 L130,70" stroke="#ffffff" strokeWidth="8" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right side - Content (full width) */}
                      <div className="w-1/2 pl-12 pr-16 flex flex-col justify-center">
                        {/* Color swatch */}
                        <div className="flex gap-6 mb-10">
                          <div className={`w-32 h-32 rounded-sm ${styles.colorSwatch}`} style={{ backgroundColor: color.colorCode }}></div>
                          {color.complementaryColors.map((comp, i) => (
                            <div key={i} className={`w-32 h-32 rounded-sm ${styles.colorSwatch}`} style={{ backgroundColor: comp.code }}></div>
                          ))}
                        </div>
                        
                        {/* Color name and info */}
                        <h2 className={`text-6xl font-bold mb-3 tracking-tight ${color.isDark ? 'text-white' : 'text-[#333]'}`}>{color.name}</h2>
                        <p className={`text-2xl mb-6 ${color.isDark ? 'text-[#f0f0f0]/80' : 'text-[#555]/80'}`}>No. {color.number}</p>
                        
                        {/* Description */}
                        <p className={`text-xl mb-10 leading-relaxed max-w-2xl ${color.isDark ? 'text-[#f0f0f0]' : 'text-[#555]'}`}>
                          {color.description}
                        </p>
                        
                        {/* Buttons */}
                        <div className={`flex gap-6 mb-10 ${index % 2 === 0 ? 'order-1' : ''}`}>
                          <button className={`px-10 py-5 rounded-full transition-all text-lg ${
                            color.isDark 
                              ? 'bg-[#333] text-white hover:bg-[#444]' 
                              : 'bg-[#333] text-white hover:bg-[#444]'
                          }`}>
                            Descoperă {color.name}
                          </button>
                          <button className="px-10 py-5 rounded-full border-2 border-current hover:opacity-70 transition-all text-lg">
                            Comandă mostre
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Left side - Content (full width) */}
                      <div className="w-1/2 pl-16 pr-12 flex flex-col justify-center">
                        {/* Color swatch */}
                        <div className="flex gap-6 mb-10">
                          <div className={`w-32 h-32 rounded-sm ${styles.colorSwatch}`} style={{ backgroundColor: color.colorCode }}></div>
                          {color.complementaryColors.map((comp, i) => (
                            <div key={i} className={`w-32 h-32 rounded-sm ${styles.colorSwatch}`} style={{ backgroundColor: comp.code }}></div>
                          ))}
                        </div>
                        
                        {/* Color name and info */}
                        <h2 className={`text-6xl font-bold mb-3 tracking-tight ${color.isDark ? 'text-white' : 'text-[#333]'}`}>{color.name}</h2>
                        <p className={`text-2xl mb-6 ${color.isDark ? 'text-[#f0f0f0]/80' : 'text-[#555]/80'}`}>No. {color.number}</p>
                        
                        {/* Description */}
                        <p className={`text-xl mb-10 leading-relaxed max-w-2xl ${color.isDark ? 'text-[#f0f0f0]' : 'text-[#555]'}`}>
                    {color.description}
                  </p>
                        
                        {/* Buttons */}
                        <div className={`flex gap-6 mb-10 ${index % 2 === 1 ? 'order-1' : ''}`}>
                          <button className={`px-10 py-5 rounded-full transition-all text-lg ${
                            color.isDark 
                              ? 'bg-[#333] text-white hover:bg-[#444]' 
                              : 'bg-[#333] text-white hover:bg-[#444]'
                          }`}>
                            Descoperă {color.name}
                          </button>
                          <button className="px-10 py-5 rounded-full border-2 border-current hover:opacity-70 transition-all text-lg">
                            Comandă mostre
                          </button>
                        </div>
                      </div>
                      
                      {/* Right side - Images (full height, edge to edge) */}
                      <div className="w-1/2 pl-4">
                        <div className={`h-full rounded-none ${styles.paintImage}`}>
                          <div className="w-full h-full bg-[#8a7d65]/20 flex items-center justify-center">
                            {/* Simple decorative shape with color accent */}
                            <svg width="50%" height="50%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                              <rect x="30" y="30" width="140" height="140" fill={color.colorCode} opacity="0.5" />
                              <circle cx="100" cy="100" r="60" fill={color.colorCode} opacity="0.7" />
                              <path d="M70,70 L130,130 M70,130 L130,70" stroke="#ffffff" strokeWidth="8" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Mobile design with improved dynamic sizing */}
                <div className="md:hidden flex flex-col items-center justify-between h-full py-3" 
                  style={{ 
                    maxHeight: isMounted && typeof window !== 'undefined' ? 
                      `${window.visualViewport?.height || window.innerHeight}px` : '100vh' 
                  }}>
                  <div className="w-full flex flex-col items-center" style={{ flex: '1 1 auto' }}>
                    {/* Color information on top */}
                    <div className="w-full mb-2 text-center">
                      <h2 className={`text-5xl font-extrabold mb-1 tracking-tight leading-none ${color.isDark ? 'text-white' : 'text-[#333]'}`}>{color.name}</h2>
                      <p className={`text-base mb-1 ${color.isDark ? 'text-[#f0f0f0]/80' : 'text-[#555]/80'}`}>No. {color.number}</p>
                    </div>
                    
                    {/* Color swatches */}
                    <div className="flex gap-3 mb-2 justify-center">
                      <div className={`w-12 h-12 rounded-sm ${styles.colorSwatch}`} style={{ backgroundColor: color.colorCode }}></div>
                      {color.complementaryColors.map((comp, i) => (
                        <div key={i} className={`w-12 h-12 rounded-sm ${styles.colorSwatch}`} style={{ backgroundColor: comp.code }}></div>
                      ))}
                    </div>
                    
                    {/* Description */}
                    <p className={`text-center text-base mb-3 max-w-md ${color.isDark ? 'text-[#f0f0f0]' : 'text-[#555]'}`} style={{ fontSize: '0.9rem' }}>
                      {color.description}
                    </p>
                    
                    {/* Image with calculated height */}
                    <div className={`w-full rounded-sm overflow-hidden mb-3 ${styles.paintImage}`} 
                      style={{ 
                        height: isMounted && typeof window !== 'undefined' ? 
                          `${(window.visualViewport?.height || window.innerHeight) * 0.35}px` : '35vh',
                        minHeight: '150px',
                        maxHeight: '260px'
                      }}>
                      <div className="w-full h-full bg-[#8a7d65]/20 flex items-center justify-center">
                        {/* Simple decorative shape with color accent */}
                        <svg width="60%" height="60%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                          <rect x="40" y="40" width="120" height="120" fill={color.colorCode} opacity="0.5" />
                          <circle cx="100" cy="100" r="50" fill={color.colorCode} opacity="0.7" />
                          <path d="M80,80 L120,120 M80,120 L120,80" stroke="#ffffff" strokeWidth="4" />
                        </svg>
                      </div>
                  </div>
                    
                    {/* Buttons */}
                    <div className="flex flex-col w-full gap-2">
                      <button className={`w-full px-4 py-4 text-base rounded-full transition-all ${
                      color.isDark 
                          ? 'bg-[#333] text-white hover:bg-[#444]' 
                          : 'bg-[#333] text-white hover:bg-[#444]'
                    }`}>
                      Descoperă {color.name}
                    </button>
                      <button className="w-full px-4 py-4 text-base rounded-full border border-current hover:opacity-70 transition-all">
                      Comandă mostre
                    </button>
                  </div>
                </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
      
      <Footer />
    </SmoothScrollProvider>
  );
}

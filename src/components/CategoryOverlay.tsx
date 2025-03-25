'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Space_Grotesk, Bebas_Neue } from 'next/font/google';
import { AiOutlineClose } from 'react-icons/ai';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

// Bebas Neue font configuration
const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

interface CategoryOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: 'vopsele' | 'izolatii') => void;
  preserveBackground?: boolean; // Indicates if background should be preserved
}

const CategoryOverlay: React.FC<CategoryOverlayProps> = ({ 
  isOpen, 
  onClose, 
  onSelectCategory, 
  preserveBackground = false
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<'vopsele' | 'izolatii' | null>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Detect mobile device
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Reset animation state when overlay closes
  useEffect(() => {
    if (!isOpen) {
      setAnimationComplete(false);
    }
  }, [isOpen]);
  
  // Handle scroll locking based on context
  useEffect(() => {
    if (!isOpen) return;

    // Save the current scroll position
    const scrollY = window.scrollY;
    
    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Add overlay-open class to body to prevent scrolling
    document.body.classList.add('overlay-open');
    
    // Apply padding right to prevent layout shift from scrollbar disappearing
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    
    // If we're not preserving background, store the scroll position
    if (!preserveBackground) {
      document.body.setAttribute('data-scroll-position', scrollY.toString());
    }
    
    return () => {
      // Remove the overlay-open class
      document.body.classList.remove('overlay-open');
      
      // Restore padding
      document.body.style.paddingRight = '';
      
      // Only restore scroll position if we're not preserving background
      if (!preserveBackground) {
        const storedPosition = document.body.getAttribute('data-scroll-position');
        if (storedPosition) {
          window.scrollTo(0, parseInt(storedPosition, 10));
          document.body.removeAttribute('data-scroll-position');
        }
      }
    };
  }, [isOpen, preserveBackground]);

  // Motion variants for animations
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: isMobile ? '100%' : '-100%' // Direction control based on device type
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1], // Custom easing function
        onComplete: () => {
          setAnimationComplete(true);
        }
      }
    },
    exit: { 
      opacity: 1, // Maintains visibility during exit animation
      scale: 0.98,
      y: isMobile ? '100%' : '-100%', // Exit direction based on device type
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Width calculation function for responsive layout
  const getDesktopWidth = (category: 'vopsele' | 'izolatii') => {
    if (!hoveredCategory) return '50%';
    return category === hoveredCategory ? '60%' : '40%';
  };

  // Only allow mouse interactions with categories after animation completes or on mobile
  const handleMouseEnter = (category: 'vopsele' | 'izolatii') => {
    if (animationComplete || isMobile) {
      setHoveredCategory(category);
    }
  };
  
  // Handle category selection to maintain context
  const handleCategorySelect = (category: string) => {
    console.log(`Category selected from overlay: ${category}`);
    
    try {
      // First update local state to prevent stale data
      if (onSelectCategory) {
        onSelectCategory(category as 'vopsele' | 'izolatii');
      }
      
      // Force browser to recognize a navigation event by using full URL
      const params = new URLSearchParams();
      params.set('categorie', category);
      
      const url = `/produse?${params.toString()}`;
      console.log(`Navigating to: ${url}`);
      
      // Use replace instead of push for a cleaner navigation history
      window.location.href = url;
    } catch (error) {
      console.error('Error in CategoryOverlay handleCategorySelect:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
        >
          {/* Dynamic backdrop with context-aware styling */}
          <div 
            className="absolute inset-0"
            onClick={onClose}
            style={{
              background: preserveBackground ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
              backdropFilter: isMobile || preserveBackground ? 'blur(10px)' : 'none',
              WebkitBackdropFilter: isMobile || preserveBackground ? 'blur(10px)' : 'none',
            }}
          />
          
          {/* Main container - Block pointer events until animation completes */}
          <motion.div 
            className={`relative w-[95%] h-[85%] max-w-7xl overflow-hidden rounded-3xl ${!animationComplete && !isMobile ? 'pointer-events-none' : ''}`}
            variants={containerVariants}
            onAnimationComplete={() => setAnimationComplete(true)}
          >
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 md:top-5 md:right-5 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white/90 hover:bg-white/10 transition-all duration-300"
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            >
              <AiOutlineClose className="md:w-5 md:h-5" />
            </button>
            
            {/* Title element - desktop only */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
              <motion.h1 
                className={`${spaceGrotesk.className} text-white/90 text-2xl font-medium tracking-tight px-6 py-2 rounded-full`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ 
                  opacity: hoveredCategory === null ? 1 : 0,
                  y: 0,
                  x: '0%'
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                }}
              >
                Alege o categorie
              </motion.h1>
            </div>
            
            {/* Categories container with layout adaptation */}
            <div className="flex flex-col md:flex-row h-full">
              {/* VOPSELE category section */}
              <div 
                className="relative overflow-hidden md:transition-all md:duration-500 md:ease-out"
                style={{ 
                  width: '100%', 
                  height: isMobile ? '50%' : '100%', 
                  flex: 'none',
                  ...(isMobile ? {} : { width: getDesktopWidth('vopsele') })
                }}
                onMouseEnter={() => handleMouseEnter('vopsele')}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Background card element */}
                <div 
                  className="absolute inset-2 md:inset-4 rounded-2xl"
                  style={{
                    background: 'rgba(163, 145, 120, 0.7)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: 'none', // No shadow on edges
                    transition: 'all 0.4s ease'
                  }}
                >
                  {/* Noise texture overlay */}
                  <div className="absolute inset-0 opacity-5 mix-blend-overlay rounded-2xl" 
                    style={{ 
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                      backgroundRepeat: 'repeat',
                      backgroundSize: '200px 200px'
                    }} 
                  />
                </div>

                {/* Hover state overlay */}
                <motion.div 
                  className="absolute inset-2 md:inset-4 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCategory === 'vopsele' ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    background: 'rgba(163, 145, 120, 0.1)',
                    boxShadow: 'none' // No shadow on edges
                  }}
                />
                
                {/* Content container */}
                <div 
                  className="relative h-full flex flex-col items-center justify-center text-white p-8 cursor-pointer"
                  onClick={() => handleCategorySelect('vopsele')}
                >
                  <motion.div
                    className="flex flex-col items-center"
                    animate={{
                      scale: hoveredCategory === 'vopsele' ? 1.05 : 1,
                      y: hoveredCategory === 'vopsele' ? -10 : 0
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h2 className={`${bebasNeue.className} text-5xl md:text-8xl font-normal mb-3 md:mb-4 tracking-wide text-white/95`}>VOPSELE</h2>
                    <p className={`${spaceGrotesk.className} text-lg md:text-2xl font-light text-white/80 mb-4 md:mb-6`}>tencuieli și produse decorative.</p>
                    
                    {/* Divider element */}
                    <div className="w-24 md:w-32 h-px bg-white/30 rounded-full mb-6 md:mb-8" />
                    
                    <p className={`${spaceGrotesk.className} max-w-md md:max-w-lg text-center text-white/80 text-base md:text-xl font-light`}>
                      Descoperă gama noastră de vopsele decorative premium
                    </p>
                    
                    {/* Call-to-action button with conditional visibility */}
                    <motion.button
                      className={`${spaceGrotesk.className} mt-8 md:mt-10 px-6 md:px-8 py-3 md:py-4 rounded-full text-white/90 font-medium text-base md:text-lg transition-all hover:bg-white/10`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: hoveredCategory === 'vopsele' || isMobile ? 1 : 0,
                        y: hoveredCategory === 'vopsele' || isMobile ? 0 : 20
                      }}
                      transition={{ duration: 0.5 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategorySelect('vopsele');
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      Explorează vopsele
                    </motion.button>
                  </motion.div>
                </div>
              </div>
              
              {/* IZOLATII category section */}
              <div 
                className="relative overflow-hidden md:transition-all md:duration-500 md:ease-out"
                style={{ 
                  width: '100%', 
                  height: isMobile ? '50%' : '100%', 
                  flex: 'none',
                  ...(isMobile ? {} : { width: getDesktopWidth('izolatii') })
                }}
                onMouseEnter={() => handleMouseEnter('izolatii')}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Background card element */}
                <div 
                  className="absolute inset-2 md:inset-4 rounded-2xl"
                  style={{
                    background: 'rgba(64, 64, 64, 0.7)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: 'none', // No shadow on edges
                    transition: 'all 0.4s ease'
                  }}
                >
                  {/* Noise texture overlay */}
                  <div className="absolute inset-0 opacity-5 mix-blend-overlay rounded-2xl" 
                    style={{ 
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                      backgroundRepeat: 'repeat',
                      backgroundSize: '200px 200px'
                    }} 
                  />
                </div>
                
                {/* Hover state overlay */}
                <motion.div 
                  className="absolute inset-2 md:inset-4 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCategory === 'izolatii' ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    background: 'rgba(64, 64, 64, 0.1)',
                    boxShadow: 'none' // No shadow on edges
                  }}
                />
                
                {/* Content container */}
                <div 
                  className="relative h-full flex flex-col items-center justify-center text-white p-8 cursor-pointer"
                  onClick={() => handleCategorySelect('izolatii')}
                >
                  <motion.div
                    className="flex flex-col items-center"
                    animate={{
                      scale: hoveredCategory === 'izolatii' ? 1.05 : 1,
                      y: hoveredCategory === 'izolatii' ? -10 : 0
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h2 className={`${bebasNeue.className} text-5xl md:text-8xl font-normal mb-3 md:mb-4 tracking-wide text-white/95`}>IZOLAȚII</h2>
                    <p className={`${spaceGrotesk.className} text-lg md:text-2xl font-light text-white/80 mb-4 md:mb-6`}>adezivi, chituri și hidroizolanți.</p>
                    
                    {/* Divider element */}
                    <div className="w-24 md:w-32 h-px bg-white/30 rounded-full mb-6 md:mb-8" />
                    
                    <p className={`${spaceGrotesk.className} max-w-md md:max-w-lg text-center text-white/80 text-base md:text-xl font-light`}>
                      Soluții complete de izolație pentru eficiență energetică
                    </p>
                    
                    {/* Call-to-action button with conditional visibility */}
                    <motion.button
                      className={`${spaceGrotesk.className} mt-8 md:mt-10 px-6 md:px-8 py-3 md:py-4 rounded-full text-white/90 font-medium text-base md:text-lg transition-all hover:bg-white/10`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: hoveredCategory === 'izolatii' || isMobile ? 1 : 0,
                        y: hoveredCategory === 'izolatii' || isMobile ? 0 : 20
                      }}
                      transition={{ duration: 0.5 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategorySelect('izolatii');
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      Explorează izolații
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CategoryOverlay; 
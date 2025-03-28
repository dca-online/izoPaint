'use client';
import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Space_Grotesk, Bebas_Neue } from 'next/font/google';
import ErrorFallbackImage from '@/components/ErrorFallbackImage';
import Link from 'next/link';
import { 
  ScrollMenu, 
  VisibilityContext
} from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

// Initialize font variables
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

interface Service {
  title: string;
  description: string;
  icon: string;
  link: string;
  imageSrc?: string;
}

interface HomeServiceScrollerProps {
  services: Service[];
  categoryType: 'vopsele' | 'izolatii';
  title: string;
  id?: string;
}

// Get category-specific styles
const getCategoryStyles = (category: string) => {
  if (category === 'vopsele') {
    return {
      primaryColor: '#8a7d65',
      secondaryColor: '#5d5448',
      gradient: 'from-[#8a7d65]/30 via-transparent to-[#8a7d65]/60',
      buttonBg: 'bg-[#8a7d65]/10',
      buttonHoverBg: 'hover:bg-[#8a7d65]/20',
      buttonBorder: 'border-[#8a7d65]/20',
      textColor: 'text-[#8a7d65]',
      cardGradient: 'linear-gradient(135deg, rgba(138, 125, 101, 0.7) 0%, rgba(138, 125, 101, 0.6) 100%)',
      glowColor: 'rgba(138, 125, 101, 0.4)',
      borderColor: 'rgba(138, 125, 101, 0.6)',
      categoryColor: '#8a7d65',
      cardBgColor: 'rgba(138, 125, 101, 0.35)',
      tagLabel: 'VOPSELE MODERNE'
    };
  } else {
    return {
      primaryColor: '#4A6741',
      secondaryColor: '#34492E',
      gradient: 'from-[#4A6741]/30 via-transparent to-[#4A6741]/60',
      buttonBg: 'bg-[#4A6741]/10',
      buttonHoverBg: 'hover:bg-[#4A6741]/20',
      buttonBorder: 'border-[#4A6741]/20',
      textColor: 'text-[#4A6741]',
      cardGradient: 'linear-gradient(135deg, rgba(105, 105, 105, 0.7) 0%, rgba(105, 105, 105, 0.6) 100%)',
      glowColor: 'rgba(105, 105, 105, 0.4)',
      borderColor: 'rgba(105, 105, 105, 0.6)',
      categoryColor: '#696969',
      cardBgColor: 'rgba(105, 105, 105, 0.35)',
      tagLabel: 'IZOLAȚII ECO-FRIENDLY'
    };
  }
};

// Left navigation arrow component
function LeftArrow({ categoryType }: { categoryType: string }) {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);
  const categoryStyles = getCategoryStyles(categoryType);
  
  return (
    <div className="absolute top-1/2 left-8 -translate-y-1/2 z-10">
      <button 
        className={`w-12 h-12 rounded-full ${categoryStyles.buttonBg} shadow-lg flex items-center justify-center backdrop-blur-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={() => scrollPrev()}
        disabled={isFirstItemVisible}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${categoryStyles.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
}

// Right navigation arrow component
function RightArrow({ categoryType }: { categoryType: string }) {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);
  const categoryStyles = getCategoryStyles(categoryType);
  
  return (
    <div className="absolute top-1/2 right-8 -translate-y-1/2 z-10">
      <button 
        className={`w-12 h-12 rounded-full ${categoryStyles.buttonBg} shadow-lg flex items-center justify-center backdrop-blur-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={() => scrollNext()}
        disabled={isLastItemVisible}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${categoryStyles.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// Service card component
function Card({ 
  service,
  categoryType,
  itemId,
  index
}: { 
  service: Service,
  categoryType: string,
  itemId: string,
  index: number
}) {
  const categoryStyles = getCategoryStyles(categoryType);
  
  return (
    <div className="flex-shrink-0 w-[95vw] sm:w-[80vw] md:w-[65vw] lg:w-[50vw] px-3">
      <motion.div 
        className="relative min-h-[600px] sm:min-h-[550px] w-full rounded-2xl overflow-hidden shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 0.98 }}
      >
        {/* Background gradient layer */}
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{ background: categoryStyles.cardGradient }}
        ></div>
        
        {/* Background image with overlay */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <ErrorFallbackImage 
            src={service.imageSrc || "/images/product-placeholder.svg"}
            alt={service.title}
            fill
            className="object-cover opacity-80 rounded-2xl"
            sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 35vw"
          />
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90"
            style={{ 
              backgroundColor: categoryType === 'vopsele' 
                ? 'rgba(138, 125, 101, 0.1)' 
                : 'rgba(74, 103, 65, 0.1)'
            }}
          />
        </div>

        {/* Card content */}
        <div className="relative z-10 w-full h-full p-6 sm:p-8">
          {/* Top content */}
          <div>
            <motion.div 
              className="inline-block mb-4 px-3 py-1 rounded-full text-sm font-medium text-white backdrop-blur-sm"
              style={{ 
                backgroundColor: 'rgba(64, 64, 64, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              #{categoryType === 'izolatii' ? 'IZOLAȚII' : 'VOPSELE'}
            </motion.div>
            
            <h3 className={`${bebasNeue.className} text-4xl sm:text-5xl text-white mb-3`}>
              {service.title}
            </h3>
            
            <p className={`${spaceGrotesk.className} text-lg text-white/90 max-w-lg`}>
              {service.description}
            </p>
          </div>
        </div>
        
        {/* Button - positioned directly at bottom with large negative margin */}
        <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center sm:justify-start sm:left-8 px-6 sm:px-0">
          <Link 
            href={service.link}
            className="inline-flex items-center group/link"
          >
            <motion.button
              className={`group px-6 py-3 ${categoryStyles.buttonBg} backdrop-blur-sm border ${categoryStyles.buttonBorder} rounded-full text-white font-medium ${categoryStyles.buttonHoverBg} transition-all flex items-center space-x-2`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Află mai multe</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </Link>
        </div>
        
        {/* Card number indicator - positioned directly at bottom right */}
        <div className="absolute bottom-6 right-6 sm:right-8 z-10">
          <span className={`${bebasNeue.className} text-7xl sm:text-8xl font-bold text-white/30`}>
            {(index + 1).toString().padStart(2, '0')}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// Main component
const HomeServiceScroller: React.FC<HomeServiceScrollerProps> = ({ 
  services, 
  categoryType,
  title,
  id = categoryType
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const categoryStyles = getCategoryStyles(categoryType);
  const containerRef = useRef<HTMLDivElement>(null);

  // Prepare items for ScrollMenu
  const items = services.map((service, index) => ({
    ...service,
    id: `${id}-${index}`
  }));

  // Handle visibility changes
  const handleScroll = useCallback((apiObj: any) => {
    if (!apiObj) return;
    
    // Get all visible items
    const visibleIds = Object.keys(apiObj.visibleItems || {});
    
    if (visibleIds.length > 0) {
      // Use the middle visible item as the active one
      const middleIndex = Math.floor(visibleIds.length / 2);
      const itemId = visibleIds[middleIndex];
      const index = parseInt(itemId.split('-')[1]) || 0;
      setActiveIndex(index);
    }
  }, []);

  return (
    <div ref={containerRef} className="relative my-16">
      <div className="mb-12 container mx-auto px-4">
        <h2 className={`text-4xl md:text-6xl font-bold mb-2 ${categoryStyles.textColor} text-left`}>
          {title}
        </h2>
        <p className="text-lg text-[#1A1A1A] max-w-2xl text-left mb-6">
          {categoryType === 'vopsele' 
            ? 'Transformă-ți spațiul cu vopsele decorative de înaltă calitate, cu efecte unice și finisaje elegante.'
            : 'Transformă-ți spațiul cu soluții complete pentru o casă frumoasă, confortabilă și eficientă energetic'
          }
        </p>
      </div>
      
      <div className="relative w-screen ml-[calc(-50vw+50%)] overflow-visible py-8 px-4">
        <ScrollMenu
          LeftArrow={<LeftArrow categoryType={categoryType} />}
          RightArrow={<RightArrow categoryType={categoryType} />}
          onScroll={handleScroll}
        >
          {items.map((item, index) => (
            <Card
              key={item.id}
              itemId={item.id}
              service={item}
              categoryType={categoryType}
              index={index}
            />
          ))}
        </ScrollMenu>
      </div>
      
      {/* Indicator dots */}
      <div className="mt-8 flex justify-center space-x-2 container mx-auto px-4">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              activeIndex === index
                ? 'bg-gray-700 w-6'
                : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <style jsx global>{`
        .react-horizontal-scrolling-menu--scroll-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
        }
        
        .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
          display: none;
        }
        
        .react-horizontal-scrolling-menu--item {
          display: inline-flex;
        }
      `}</style>
    </div>
  );
};

export default HomeServiceScroller; 
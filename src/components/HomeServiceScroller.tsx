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
    <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
      <button 
        className={`w-10 h-10 rounded-full ${categoryStyles.buttonBg} shadow-lg flex items-center justify-center backdrop-blur-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={() => scrollPrev()}
        disabled={isFirstItemVisible}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${categoryStyles.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
      <button 
        className={`w-10 h-10 rounded-full ${categoryStyles.buttonBg} shadow-lg flex items-center justify-center backdrop-blur-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={() => scrollNext()}
        disabled={isLastItemVisible}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${categoryStyles.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// Service card component with animation and styling
function Card({ 
  service,
  categoryType,
  itemId,
  index,
  isFirstOrLast,
  allServicesLength
}: { 
  service: Service,
  categoryType: string,
  itemId: string,
  index: number,
  isFirstOrLast: boolean,
  allServicesLength: number
}) {
  const visibility = useContext(VisibilityContext);
  const isVisible = visibility.isItemVisible(itemId);
  const categoryStyles = getCategoryStyles(categoryType);
  
  // Determine card position for margin adjustments
  const isFirst = index === 0;
  const isLast = index === allServicesLength - 1;

  // Card container class based on position
  const containerClasses = `flex-shrink-0 w-[85vw] md:w-[80vw] xl:w-[75vw] 2xl:w-[70vw] px-4 ${
    isFirst ? 'sm:ml-0 ml-10' : ''
  }`;

  return (
    <div className={containerClasses}>
      <motion.div 
        className="relative h-[70vh] w-full rounded-2xl overflow-hidden shadow-xl cursor-grab active:cursor-grabbing"
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90"
            style={{ 
              backgroundColor: categoryType === 'vopsele' 
                ? 'rgba(138, 125, 101, 0.1)' // #8a7d65 with 0.1 opacity 
                : 'rgba(74, 103, 65, 0.1)'   // #4A6741 with 0.1 opacity
            }}
          />
        </div>

        {/* Card content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-10">
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
            
            <h3 className={`${bebasNeue.className} text-4xl sm:text-5xl md:text-6xl text-white mb-3`}>
              {service.title}
            </h3>
          </div>
          
          <div>
            <p className={`${spaceGrotesk.className} text-lg md:text-xl text-white/90 mb-8 max-w-lg`}>
              {service.description}
            </p>
            
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
        </div>
        
        {/* Card number indicator */}
        <div className="absolute bottom-8 right-10 z-10">
          <span className={`${bebasNeue.className} text-8xl md:text-9xl font-bold text-white/30`}>
            {(index + 1).toString().padStart(2, '0')}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// Custom hook for mouse drag functionality
function useDrag() {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const onMouseDown = React.useCallback(
    ({ clientX, clientY }: React.MouseEvent) => {
      setDragStart({ x: clientX, y: clientY });
      setIsDragging(true);
    },
    []
  );
  
  const onMouseMove = React.useCallback(
    ({ clientX, scrollContainer }: { clientX: number; scrollContainer: HTMLElement | null }) => {
      if (isDragging && scrollContainer) {
        scrollContainer.scrollLeft += dragStart.x - clientX;
        setDragStart({ x: clientX, y: dragStart.y });
      }
    },
    [isDragging, dragStart]
  );
  
  const onMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const onMouseLeave = React.useCallback(() => {
    setIsDragging(false);
  }, []);
  
  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    isDragging
  };
}

// Global set to track wheel events across multiple scrollers
const processedEvents = new Set<number>();

const HomeServiceScroller: React.FC<HomeServiceScrollerProps> = ({ 
  services, 
  categoryType,
  title,
  id = categoryType
}) => {
  // Refs and state initialization
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardsAreaRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  // Unique identifier for this scroller instance
  const scrollerId = `home-service-scroller-${id}`;

  const categoryStyles = getCategoryStyles(categoryType);
  
  // Initialize mouse drag functionality
  const {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    isDragging
  } = useDrag();
  
  // Track most central visible item and update active index
  const onScroll = (api: any) => {
    if (!cardsAreaRef.current) return;
    
    const visibleItems = api.visibleItemsWithoutSeparators;
    if (!visibleItems || visibleItems.length === 0) return;
    
    // Find the most central visible item
    const centerItem = visibleItems[Math.floor(visibleItems.length / 2)];
    const centerItemIndex = services.findIndex(item => `${item.title}-${item.link}` === centerItem);
    
    if (centerItemIndex !== -1 && centerItemIndex !== activeIndex) {
      setActiveIndex(centerItemIndex);
      setScrollPercentage((centerItemIndex / (services.length - 1)) * 100);
    }
  };

  // Mouse enter/leave event handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  // Add and clean up mouse enter/leave event listeners
  useEffect(() => {
    const cardsArea = cardsAreaRef.current;
    if (cardsArea) {
      cardsArea.addEventListener('mouseenter', handleMouseEnter);
      cardsArea.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (cardsArea) {
        cardsArea.removeEventListener('mouseenter', handleMouseEnter);
        cardsArea.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [handleMouseEnter, handleMouseLeave]);
  
  // Implement scroll locking when scroller is in viewport center
  useEffect(() => {
    const cardsArea = cardsAreaRef.current;
    if (!cardsArea) return;
    
    // Track if scroller is currently in center-lock mode
    let isCenterLocked = false;
    
    // Check if the middle of the cards is precisely aligned with viewport center
    const isCardsCentered = () => {
      if (!cardsArea) return false;
      
      // Get the scroll container to find the visible cards
      const scrollContainer = cardsArea.querySelector('.react-horizontal-scrolling-menu--scroll-container') as HTMLElement;
      if (!scrollContainer) return false;
      
      // Get all visible cards
      const cards = scrollContainer.querySelectorAll('.react-horizontal-scrolling-menu--item');
      if (cards.length === 0) return false;
      
      // Find the middle card
      const middleCard = cards[Math.floor(cards.length / 2)];
      if (!middleCard) return false;
      
      // Get the middle card's position
      const cardRect = middleCard.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate the exact center of the middle card
      const cardCenter = cardRect.top + (cardRect.height / 2);
      const viewportCenter = viewportHeight / 2;
      
      // Ultra-strict threshold - exactly center aligned
      const threshold = 2; // 2px threshold for perfect center alignment
      
      // Check for exact vertical center alignment of the middle card
      return Math.abs(cardCenter - viewportCenter) < threshold;
    };
    
    // Check if mouse is in cards area
    const isMouseInCardsArea = (event: MouseEvent) => {
      if (!cardsArea) return false;
      
      const rect = cardsArea.getBoundingClientRect();
      return (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      );
    };
    
    // Handle wheel events with strict condition order
    const lockScroll = (event: WheelEvent) => {
      // Create unique event identifier
      const eventId = event.timeStamp;
      
      // Skip if already processed by another scroller
      if (processedEvents.has(eventId)) {
        return;
      }
      
      // FIRST CONDITION: Check if cards are precisely centered
      const cardsCentered = isCardsCentered();
      if (!cardsCentered) {
        // If not centered, ensure we're not locked
        if (isCenterLocked) {
          cardsArea.removeAttribute('data-center-locked');
          isCenterLocked = false;
        }
        return;
      }
      
      // SECOND CONDITION: Check if mouse is over cards
      if (!isMouseInCardsArea(event)) {
        // If mouse not over cards, ensure we're not locked
        if (isCenterLocked) {
          cardsArea.removeAttribute('data-center-locked');
          isCenterLocked = false;
        }
        return;
      }
      
      // Both conditions met - lock scrolling
      if (!isCenterLocked) {
        // Apply visual indicator for first center lock
        cardsArea.setAttribute('data-center-locked', 'true');
        isCenterLocked = true;
        
        // Force scroll position to maintain center alignment
        const rect = cardsArea.getBoundingClientRect();
        const scrollOffset = rect.top + window.scrollY - (window.innerHeight / 2) + (rect.height / 2);
        window.scrollTo({
          top: scrollOffset,
          behavior: 'auto'
        });
      }
      
      // Get this scroller's container
      const scrollContainer = cardsArea.querySelector('.react-horizontal-scrolling-menu--scroll-container') as HTMLElement;
      if (!scrollContainer) return;
      
      // Check if at beginning or end of scrollable content
      const isAtBeginning = scrollContainer.scrollLeft <= 10;
      const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10;
      
      // Determine scroll direction
      const isScrollingUp = event.deltaY < 0;
      const isScrollingDown = event.deltaY > 0;
      
      // Allow vertical scrolling at boundaries
      if ((isAtBeginning && isScrollingUp) || (isAtEnd && isScrollingDown)) {
        // Let default vertical scroll happen
        isCenterLocked = false;
        cardsArea.removeAttribute('data-center-locked');
        return;
      }
      
      // Mark as processed for other scrollers
      processedEvents.add(eventId);
      
      // Clean up processed events
      setTimeout(() => {
        processedEvents.delete(eventId);
      }, 100);
      
      // Prevent default vertical scrolling
      event.preventDefault();
      event.stopPropagation();
      
      // Adjust scroll amount based on wheel delta
      const scrollAmount = Math.abs(event.deltaY) > 50 ? 300 : 150;
      
      // Apply horizontal scrolling
      if (isScrollingDown) {
        // Immediate scrolling to prevent overshooting viewport center
        scrollContainer.scrollBy({
          left: scrollAmount,
          behavior: 'auto'
        });
      } else if (isScrollingUp) {
        // Immediate scrolling to prevent overshooting viewport center
        scrollContainer.scrollBy({
          left: -scrollAmount,
          behavior: 'auto'
        });
      }
      
      return false;
    };
    
    // Add wheel event listener with capture for early interception
    document.addEventListener('wheel', lockScroll, { passive: false, capture: true });
    
    // Track scroller position relative to viewport
    const checkPosition = () => {
      if (!cardsArea) return;
      
      // Check if cards are centered
      const cardsCentered = isCardsCentered();
      
      // Apply visual indicator only if both conditions are met
      if (cardsCentered && isCenterLocked) {
        cardsArea.setAttribute('data-center-locked', 'true');
      } else {
        cardsArea.removeAttribute('data-center-locked');
        isCenterLocked = false;
      }
      
      // Track general visibility
      const rect = cardsArea.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      setIsInView(isVisible);
    };
    
    // Add scroll and resize listeners for position tracking
    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', checkPosition);
    
    // Check position on mount
    checkPosition();
    
    // Clean up all event listeners
    return () => {
      document.removeEventListener('wheel', lockScroll, { capture: true });
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('resize', checkPosition);
      if (cardsArea) {
        cardsArea.removeAttribute('data-center-locked');
      }
    };
  }, []);

  // Add styles for visual feedback when center-locked
  useEffect(() => {
    // Add styles to indicate when scroller is center-locked
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      [data-center-locked="true"] {
        outline: 2px solid rgba(255, 255, 255, 0.5);
        outline-offset: -2px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        transition: outline 0.3s ease, box-shadow 0.3s ease;
      }
    `;
    document.head.appendChild(styleTag);
    
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  // Don't render if no services
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <div 
      className="relative w-screen overflow-hidden mb-16" 
      style={{ marginLeft: 'calc(-50vw + 50%)', width: '100vw' }}
      ref={scrollerRef}
      id={scrollerId}
    >
      {/* Section title with progress indicator */}
      <div className="flex justify-between items-center mb-6 px-4 max-w-screen-2xl mx-auto">
        <motion.h3 
          className={`${spaceGrotesk.className} text-2xl font-bold ${categoryType === 'vopsele' ? 'text-[#8a7d65]' : 'text-[#696969]'}`}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h3>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full"
              style={{ 
                width: `${scrollPercentage}%`,
                backgroundColor: categoryStyles.primaryColor
              }}
            />
          </div>
          
          <div className="text-[#696969] font-medium">
            {activeIndex + 1}/{services.length}
          </div>
        </div>
      </div>
      
      {/* Horizontal scrolling menu */}
      <div 
        className="w-full pb-8"
        ref={cardsAreaRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={onMouseDown}
      >
        <ScrollMenu
          LeftArrow={<LeftArrow categoryType={categoryType} />}
          RightArrow={<RightArrow categoryType={categoryType} />}
          onWheel={(apiObj, ev) => {
            // Global wheel handler used instead
          }}
          onScroll={onScroll}
          options={{
            ratio: 0.9,
            threshold: [0.1, 0.5, 0.9],
            rootMargin: '0px'
          }}
          scrollContainerClassName={`hide-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          {services.map((service, index) => (
            <Card
              service={service}
              categoryType={categoryType}
              itemId={`${service.title}-${service.link}`}
              key={`${service.title}-${service.link}`}
              index={index}
              isFirstOrLast={index === 0 || index === services.length - 1}
              allServicesLength={services.length}
            />
          ))}
        </ScrollMenu>
      </div>
      
      {/* Mobile navigation dots */}
      <div className="flex justify-center space-x-2 mt-4 md:hidden">
        {services.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full ${
              index === activeIndex 
                ? categoryType === 'vopsele' ? 'bg-[#8a7d65]' : 'bg-[#4A6741]'
                : 'bg-gray-300'
            }`}
            onClick={() => {
              setActiveIndex(index);
            }}
          />
        ))}
      </div>
      
      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .react-horizontal-scrolling-menu--scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
          display: none;
        }
        .react-horizontal-scrolling-menu--inner-wrapper {
          display: flex;
          width: 100%;
          justify-content: center;
        }
        .react-horizontal-scrolling-menu--scroll-container {
          width: 100%;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
        }
        .react-horizontal-scrolling-menu--item {
          scroll-snap-align: center;
          display: flex;
          justify-content: center;
        }
        /* Snap alignment for first and last items */
        .react-horizontal-scrolling-menu--item:first-child {
          scroll-snap-align: start;
        }
        .react-horizontal-scrolling-menu--item:last-child {
          scroll-snap-align: end;
        }
      `}</style>
    </div>
  );
};

export default HomeServiceScroller; 
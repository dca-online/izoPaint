'use client';
import React, { useState, useContext, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Space_Grotesk, Bebas_Neue } from 'next/font/google';
import ErrorFallbackImage from '@/components/ErrorFallbackImage';
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

interface SubcategoryCard {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

interface SubcategoryScrollerProps {
  subcategories: SubcategoryCard[];
  onSelectSubcategory: (id: string) => void;
  activeCategory: string;
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
      textColor: 'text-[#8a7d65]'
    };
  } else {
    return {
      primaryColor: '#4A6741',
      secondaryColor: '#34492E',
      gradient: 'from-[#4A6741]/30 via-transparent to-[#4A6741]/60',
      buttonBg: 'bg-[#4A6741]/10',
      buttonHoverBg: 'hover:bg-[#4A6741]/20',
      buttonBorder: 'border-[#4A6741]/20',
      textColor: 'text-[#4A6741]'
    };
  }
};

// Left navigation arrow component
function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);
  const categoryStyles = getCategoryStyles('vopsele');
  
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
function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);
  const categoryStyles = getCategoryStyles('vopsele');
  
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

// Subcategory card component
function Card({ 
  subcategory,
  activeCategory,
  itemId,
  index,
  onClick,
  isFirstOrLast,
}: { 
  subcategory: SubcategoryCard,
  activeCategory: string,
  itemId: string,
  index: number,
  onClick: (itemId: string) => void,
  isFirstOrLast: boolean,
}) {
  const visibility = useContext(VisibilityContext);
  const isVisible = visibility.isItemVisible(itemId);
  const categoryStyles = getCategoryStyles(activeCategory);

  return (
    <div className="flex-shrink-0 w-[85vw] md:w-[80vw] xl:w-[75vw] 2xl:w-[70vw] px-4">
      <motion.div
        className="relative h-[70vh] w-full rounded-2xl overflow-hidden shadow-xl cursor-grab active:cursor-grabbing"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 0.98 }}
      >
        {/* Background media container */}
        <div className="absolute inset-0 w-full h-full">
          {subcategory.title === 'ELF Decor' ? (
            // Video background for ELF Decor subcategory
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/ED-2.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
            </div>
          ) : (
            // Image background for other subcategories
            <>
              <ErrorFallbackImage
                src={
                  // Use custom image or fallback to category-specific background
                  subcategory.image !== '/images/subcategory-placeholder.svg' 
                    ? subcategory.image 
                    : activeCategory === 'vopsele'
                      ? `/images/vopsele-bg/vopsele-bg-${(index % 3) + 1}.jpg`
                      : `/images/izolatii-bg/izolatii-bg-${(index % 3) + 1}.jpg`
                }
                fallbackSrc={
                  // Default placeholder if specific images unavailable
                  activeCategory === 'vopsele'
                    ? '/images/category-placeholder.svg'
                    : '/images/category-placeholder.svg'
                }
                alt={subcategory.title}
                fill
                type="subcategory"
                className="object-cover"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90"
                style={{ 
                  backgroundColor: activeCategory === 'vopsele' 
                    ? 'rgba(138, 125, 101, 0.1)' 
                    : 'rgba(74, 103, 65, 0.1)'
                }}
              />
            </>
          )}
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
              #{activeCategory === 'izolatii' ? 'IZOLAȚII' : activeCategory}
            </motion.div>
            
            <h3 className={`${bebasNeue.className} text-4xl sm:text-5xl md:text-6xl text-white mb-3`}>
              {subcategory.title}
            </h3>
            
            <p className={`${spaceGrotesk.className} text-lg text-white/90 mb-8 max-w-lg`}>
              {subcategory.description}
            </p>
          </div>
          
          <motion.button 
            className={`px-6 py-3 ${activeCategory === 'vopsele' ? 'bg-[#8a7d65]' : 'bg-[#4A6741]'} hover:bg-opacity-90 text-white rounded-full inline-flex items-center space-x-2 font-medium w-auto self-center sm:self-start`}
            onClick={() => onClick(subcategory.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Explorează produse</span>
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
        </div>
        
        {/* Card number indicator */}
        <div className="absolute top-8 right-10 z-10">
          <span className={`${bebasNeue.className} text-9xl font-bold text-white/10 leading-none`}>
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

const SubcategoryScroller: React.FC<SubcategoryScrollerProps> = ({ 
  subcategories, 
  onSelectSubcategory,
  activeCategory
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsAreaRef = useRef<HTMLDivElement>(null);
  const scrollContainerElement = useRef<HTMLElement | null>(null);
  
  const categoryStyles = getCategoryStyles(activeCategory);
  
  // Mouse drag functionality
  const {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    isDragging
  } = useDrag();
  
  // Store scroll container element when it's available
  useEffect(() => {
    const scrollContainer = document.querySelector('.react-horizontal-scrolling-menu--scroll-container');
    if (scrollContainer) {
      scrollContainerElement.current = scrollContainer as HTMLElement;
    }
  }, []);
  
  // Handle mouse events for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      onMouseMove({ 
        clientX: e.clientX, 
        scrollContainer: scrollContainerElement.current 
      });
    };
    
    const handleMouseUp = () => {
      onMouseUp();
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onMouseMove, onMouseUp]);
  
  // Handle item selection
  const handleItemClick = (id: string) => {
    onSelectSubcategory(id);
  };
  
  // Update active index based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      
      // Calculate percentage scrolled
      const percentage = (scrollLeft / scrollWidth) * 100;
      setScrollPercentage(percentage);
      
      // Estimate which item is most visible
      const itemWidth = container.scrollWidth / subcategories.length;
      const estimatedIndex = Math.round(scrollLeft / itemWidth);
      const boundedIndex = Math.min(
        Math.max(0, estimatedIndex),
        subcategories.length - 1
      );
      
      setActiveIndex(boundedIndex);
    };
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [subcategories.length]);

  // Handle mouse hover events for the cards area specifically
  const handleCardsAreaMouseEnter = () => {
    setIsHovering(true);
  };

  const handleCardsAreaMouseLeave = () => {
    setIsHovering(false);
  };

  // Lock page scrolling only when hovering over the cards area
  useEffect(() => {
    // Check if cards area is in view
    const checkInView = () => {
      if (!cardsAreaRef.current) return;
      
      const rect = cardsAreaRef.current.getBoundingClientRect();
      const isVisible = 
        rect.top < window.innerHeight &&
        rect.bottom > 0;
      
      setIsInView(isVisible);
    };

    // Lock scroll function - only when mouse is inside cards area or cards area is in view
    const lockScroll = (e: WheelEvent) => {
      if (!cardsAreaRef.current) return;
      
      const rect = cardsAreaRef.current.getBoundingClientRect();
      
      // Check if the mouse event is within the cards area bounds
      const isMouseInCardsArea = 
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      
      // Only prevent default if mouse is in the cards area
      if (isMouseInCardsArea && isInView) {
        e.preventDefault();
      }
    };
    
    window.addEventListener('scroll', checkInView);
    window.addEventListener('resize', checkInView);
    window.addEventListener('wheel', lockScroll, { passive: false });
    
    // Initial check
    checkInView();
    
    return () => {
      window.removeEventListener('scroll', checkInView);
      window.removeEventListener('resize', checkInView);
      window.removeEventListener('wheel', lockScroll);
    };
  }, [isInView]);

  // Center snap function to align cards to center on scroll end
  const onScroll = (api: any) => {
    if (!cardsAreaRef.current) return;
    
    const visibleItems = api.visibleItemsWithoutSeparators;
    if (!visibleItems || visibleItems.length === 0) return;
    
    // Find the most central visible item
    const centerItem = visibleItems[Math.floor(visibleItems.length / 2)];
    const centerItemIndex = subcategories.findIndex(item => item.id === centerItem);
    
    if (centerItemIndex !== -1 && centerItemIndex !== activeIndex) {
      setActiveIndex(centerItemIndex);
      setScrollPercentage((centerItemIndex / (subcategories.length - 1)) * 100);
    }
  };

  return (
    <div 
      className="relative w-full overflow-hidden" 
      style={{ width: '100%' }}
      ref={containerRef}
    >
      {/* Section title with progress indicator */}
      <div className="flex justify-between items-center mb-6 px-4 max-w-screen-2xl mx-auto">
        <h2 className={`${spaceGrotesk.className} text-3xl md:text-4xl text-[#404040]`}>
          {activeCategory === 'vopsele' ? 'SUBCATEGORII VOPSELE' : 'SUBCATEGORII IZOLAȚII'}
        </h2>
        
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
            {activeIndex + 1}/{subcategories.length}
          </div>
        </div>
      </div>
      
      {/* React Horizontal Scrolling Menu with center alignment */}
      <div 
        className="w-full pb-8"
        ref={cardsAreaRef}
        onMouseEnter={handleCardsAreaMouseEnter}
        onMouseLeave={handleCardsAreaMouseLeave}
        onMouseDown={onMouseDown}
      >
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          onWheel={(apiObj, ev) => {
            // Only prevent default when mouse is in the cards area
            if (isHovering) {
              ev.preventDefault();
              
              // Use deltaY for horizontal scrolling
              const isThouchpad = Math.abs(ev.deltaX) !== 0;
              
              if (isThouchpad) {
                ev.stopPropagation();
                return;
              }
              
              if (ev.deltaY < 0) {
                apiObj.scrollPrev();
              } else if (ev.deltaY > 0) {
                apiObj.scrollNext();
              }
            }
          }}
          onScroll={onScroll}
          options={{
            ratio: 0.9,
            threshold: [0.1, 0.5, 0.9],
            rootMargin: '0px'
          }}
          scrollContainerClassName={`hide-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          {subcategories.map((subcategory, index) => (
            <Card
              subcategory={subcategory}
              activeCategory={activeCategory}
              itemId={subcategory.id}
              key={subcategory.id}
              index={index}
              onClick={handleItemClick}
              isFirstOrLast={index === 0 || index === subcategories.length - 1}
            />
          ))}
        </ScrollMenu>
      </div>
      
      {/* Dot indicators for mobile */}
      <div className="flex justify-center space-x-2 mt-4 md:hidden">
        {subcategories.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full ${
              index === activeIndex 
                ? activeCategory === 'vopsele' ? 'bg-[#8a7d65]' : 'bg-[#4A6741]'
                : 'bg-gray-300'
            }`}
            onClick={() => {
              setActiveIndex(index);
              // This won't actually scroll since we need the ScrollMenu API
            }}
          />
        ))}
      </div>
      
      {/* Custom styles for react-horizontal-scrolling-menu */}
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          width: 0 !important;
          height: 0 !important;
          background: transparent !important;
        }
        .react-horizontal-scrolling-menu--scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
          width: 0 !important;
          height: 0 !important;
          background: transparent !important;
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
        /* First and last items should be aligned to start/end */
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

export default SubcategoryScroller; 
'use client';
import React, { useState, useContext, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Space_Grotesk, Bebas_Neue } from 'next/font/google';
import ErrorFallbackImage from '@/components/ErrorFallbackImage';
import Link from 'next/link';
import { Product } from '@/types/product';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { 
  ScrollMenu, 
  VisibilityContext
} from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { useRouter } from 'next/navigation';

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

interface ProductScrollerProps {
  products: Product[];
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

// Product card component with animations and interactions
function Card({ 
  product,
  activeCategory,
  itemId,
  index,
  isFirstOrLast,
  allProductsLength
}: { 
  product: Product,
  activeCategory: string,
  itemId: string,
  index: number,
  isFirstOrLast: boolean,
  allProductsLength: number
}) {
  const visibility = useContext(VisibilityContext);
  const isVisible = visibility.isItemVisible(itemId);
  const categoryStyles = getCategoryStyles(activeCategory);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Detect mobile devices for interaction handling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navigate to product page on mobile
  const handleCardClick = () => {
    if (isMobile) {
      router.push(`/produs/${product.id}`);
    }
  };

  // Determine card position for styling
  const isFirst = index === 0;
  const isLast = index === allProductsLength - 1;
  
  // Card container class based on position
  const containerClasses = `flex-shrink-0 w-[350px] md:w-[380px] lg:w-[400px] px-4 ${
    isFirst ? 'sm:ml-0 ml-10' : ''
  }`;

  return (
    <div className={containerClasses}>
      <motion.div
        className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-xl cursor-grab active:cursor-grabbing bg-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 0.98 }}
        onClick={handleCardClick}
      >
        {/* Product image with fallback */}
        <div className="relative h-48 bg-gray-100 z-10">
          {product.linkImagine ? (
            <ErrorFallbackImage
              src={product.linkImagine}
              alt={product.titlu}
              fill
              type="product"
              className="object-contain p-2"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <PhotoIcon className="h-12 w-12" />
            </div>
          )}
          
          {/* Subcategory tag */}
          {product.subcategorii && product.subcategorii.length > 0 && (
            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm z-20">
              {product.subcategorii[0]}
            </div>
          )}
        </div>
        
        {/* Product details with position-based padding */}
        <div className={`p-6 flex-grow flex flex-col h-[calc(450px-12rem)] ${
          isFirst ? 'pl-10 md:pl-14' : isLast ? 'pr-10 md:pr-14' : ''
        }`}>
          <h3 className={`${bebasNeue.className} text-2xl sm:text-3xl text-[#404040] mb-3 line-clamp-2`}>
            {product.titlu}
          </h3>
          
          <p className={`${spaceGrotesk.className} text-sm text-[#696969] mb-6 line-clamp-4 flex-grow`}>
            {product.descriereScurta}
          </p>
          
          <div className="mt-auto">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-[#404040]">
                {product.variante && product.variante.length > 0
                  ? `${product.variante[0].pret.minim.toFixed(2)} lei${
                      product.variante[0].cantitatePachet === 'kg' ? ' / kg' : ''
                    }`
                  : 'Preț la cerere'}
              </span>
              
              <Link 
                href={`/produs/${product.id}`}
                className="inline-flex items-center group"
              >
                <motion.div
                  className={`group px-4 py-2 ${categoryStyles.buttonBg} backdrop-blur-sm border ${categoryStyles.buttonBorder} rounded-full text-[#404040] font-medium ${categoryStyles.buttonHoverBg} transition-all flex items-center`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Detalii</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Product index indicator */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className={`text-lg font-bold ${activeCategory === 'vopsele' ? 'text-[#6d6046]' : 'text-[#2c4023]'}`}>
            {(index + 1).toString().padStart(2, '0')}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// Custom useDrag hook for mouse dragging
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

const ProductScroller: React.FC<ProductScrollerProps> = ({ 
  products, 
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
      const itemWidth = container.scrollWidth / products.length;
      const estimatedIndex = Math.round(scrollLeft / itemWidth);
      const boundedIndex = Math.min(
        Math.max(0, estimatedIndex),
        products.length - 1
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
  }, [products.length]);

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

    // Lock scroll function - only when mouse is inside cards area
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
    const centerItemIndex = products.findIndex(item => item.id === centerItem);
    
    if (centerItemIndex !== -1 && centerItemIndex !== activeIndex) {
      setActiveIndex(centerItemIndex);
      setScrollPercentage((centerItemIndex / (products.length - 1)) * 100);
    }
  };

  // Don't render if there are no products
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div 
      className="relative w-screen overflow-hidden" 
      style={{ marginLeft: 'calc(-50vw + 50%)', width: '100vw' }}
      ref={containerRef}
    >
      {/* Section title with progress indicator */}
      <div className="flex justify-between items-center mb-6 px-4 max-w-screen-2xl mx-auto">
        <h2 className={`${spaceGrotesk.className} text-3xl md:text-4xl text-[#404040]`}>
          {activeCategory === 'vopsele' ? 'PRODUSE VOPSELE' : 'PRODUSE IZOLAȚII'}
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
            {activeIndex + 1}/{products.length}
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
          {products.map((product, index) => (
            <Card
              product={product}
              activeCategory={activeCategory}
              itemId={product.id}
              key={product.id}
              index={index}
              isFirstOrLast={index === 0 || index === products.length - 1}
              allProductsLength={products.length}
            />
          ))}
        </ScrollMenu>
      </div>
      
      {/* Dot indicators for mobile */}
      <div className="flex justify-center space-x-2 mt-4 md:hidden">
        {products.map((_, index) => (
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

export default ProductScroller; 
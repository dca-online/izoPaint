'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Panorama } from 'panoramajs';
import styles from './FullPageSections.module.css';

interface FullPageSectionsProps {
  children: React.ReactNode[];
  startAfterAnimation?: boolean;
  topOffset?: number;
  showIndicators?: boolean;
  animationDuration?: number;
  wheelDebounce?: number;
}

const FullPageSections: React.FC<FullPageSectionsProps> = ({
  children,
  startAfterAnimation = true,
  topOffset = 80,
  showIndicators = true,
  animationDuration = 800,
  wheelDebounce = 400
}) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(!startAfterAnimation);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const panoramaRef = useRef(null);
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);

  // Update refs array when children count changes
  useEffect(() => {
    sectionsRef.current = sectionsRef.current.slice(0, React.Children.count(children));
  }, [children]);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen for the VideoHeader animation completion
  useEffect(() => {
    if (!startAfterAnimation) return;
    
    const handleScroll = () => {
      // When user scrolls past the video animation
      const scrollThreshold = isMobile ? window.innerHeight * 0.15 : window.innerHeight * 0.3;
      
      if (window.scrollY > scrollThreshold && !isAnimationComplete) {
        setIsAnimationComplete(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [startAfterAnimation, isAnimationComplete, isMobile]);

  // Handle clicking on indicator dots
  const scrollToSection = (index: number) => {
    if (panoramaRef.current) {
      // @ts-expect-error Panorama's type definition is incomplete, but scrollTo exists
      panoramaRef.current.scrollTo(index);
      setActiveIndex(index);
    }
  };

  // Set ref for each section
  const setSectionRef = (el: HTMLElement | null, index: number) => {
    sectionsRef.current[index] = el;
  };

  // Create a custom easing function
  const customEasing = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  // If animation is not complete, render a placeholder
  if (!isAnimationComplete) {
    return (
      <div className={styles.fullPageContainer}>
        {children}
      </div>
    );
  }

  return (
    <div className={styles.fullPageContainer}>
      <div className={styles.panoramaWrapper}>
        <Panorama
          ref={panoramaRef}
          animation={animationDuration} // Animation duration in ms
          throttle={wheelDebounce} // Throttle scroll events
          easing={customEasing}
          onScroll={(data: { index: number }) => {
            // Extract the index from the data object
            const index = typeof data === 'object' ? data.index : 0;
            setActiveIndex(index);
          }}
        >
          {React.Children.map(children, (child, index) => (
            <section
              ref={(el) => setSectionRef(el, index)}
              className={`${styles.section} ${activeIndex === index ? styles.active : ''}`}
              style={{ 
                minHeight: `calc(100vh - ${topOffset}px)`,
                paddingTop: `${topOffset}px`
              }}
              key={`section-${index}`}
              data-section-index={index}
            >
              <div className={styles.sectionContent}>
                {child}
              </div>
            </section>
          ))}
        </Panorama>
      </div>
      
      {/* Section indicator dots */}
      {showIndicators && !isMobile && React.Children.count(children) > 1 && (
        <div className={styles.sectionIndicator}>
          {React.Children.map(children, (_, index) => (
            <div 
              className={`${styles.sectionDot} ${index === activeIndex ? styles.active : ''}`}
              onClick={() => scrollToSection(index)}
              key={`dot-${index}`}
              aria-label={`Go to section ${index + 1}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollToSection(index);
                }
              }}
            />
          ))}
        </div>
      )}
      
      {/* Subtle hint to scroll down on first section */}
      {activeIndex === 0 && !isMobile && (
        <div className={styles.scrollHint}>
          <div className={styles.scrollHintIcon}></div>
          <span className={styles.scrollHintText}>Scroll down</span>
        </div>
      )}
    </div>
  );
};

export default FullPageSections; 
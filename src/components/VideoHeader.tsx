'use client';
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Space_Grotesk } from 'next/font/google';
import Image from 'next/image';

// This edgy, modern font gives us that architectural feel
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

gsap.registerPlugin(ScrollTrigger);

const VideoHeader = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  // Add a state to control initial door positioning
  const [doorsReady, setDoorsReady] = useState(false);
  
  // We need to know if we're on a phone to make adjustments
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Client-side only initializer that runs before React rendering
  // This completely avoids the hydration mismatch
  useLayoutEffect(() => {
    // Position doors before any React rendering happens
    if (leftDoorRef.current && rightDoorRef.current) {
      leftDoorRef.current.style.transform = 'translateX(0)';
      leftDoorRef.current.style.width = 'calc(50% + 1px)';
      rightDoorRef.current.style.transform = 'translateX(0)';
    }
    
    // Proper way to set CSS variables on client only
    if (typeof document !== 'undefined') {
      // This won't cause hydration mismatch since useLayoutEffect only runs client-side
      document.documentElement.style.setProperty('--door-fix', 'applied');
    }
    
    // Enable door positioning state
    setDoorsReady(true);
  }, []);
  
  // Handle visibility changes (tab switching, etc.)
  useEffect(() => {
    // Reset on visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && leftDoorRef.current && rightDoorRef.current) {
        leftDoorRef.current.style.transform = 'translateX(0)';
        leftDoorRef.current.style.width = 'calc(50% + 1px)';
        rightDoorRef.current.style.transform = 'translateX(0)';
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);
  
  useEffect(() => {
    // Time for the magic - GSAP brings our header to life
    const header = headerRef.current;
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const tagline = taglineRef.current;
    const leftDoor = leftDoorRef.current;
    const rightDoor = rightDoorRef.current;
    
    if (!header || !heading || !subtitle || !cta || !tagline || !leftDoor || !rightDoor) return;

    // Immediate reset of door positions to ensure they're completely closed
    // We use a 1px overlap to ensure no gap is visible
    gsap.set(leftDoor, { 
      x: '0%', 
      width: 'calc(50% + 1px)', // Add 1px overlap
      clearProps: 'none' 
    });
    
    gsap.set(rightDoor, { 
      x: '0%', 
      clearProps: 'none' 
    });
    
    // Force initial header opacity
    gsap.set(header, { opacity: 1, clearProps: 'none' });

    // Let's fade in all those beautiful text elements first
    const initialAnimation = gsap.fromTo(
      [heading, subtitle, tagline, cta],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 1, delay: 0.5 }
    );

    // Here comes the cool part - the doors splitting apart as you scroll
    const isMobileDevice = window.innerWidth < 768;
    
    // The doors need to move differently depending on your device
    const doorDuration = isMobileDevice ? 1.2 : 1.5;
    
    // Create a more precise control for door positioning
    const updateDoorPositions = (progress: number) => {
      // When progress is 0, doors are fully closed
      // When progress is 1, doors are fully open
      
      // Ensure doors are perfectly closed at progress 0
      if (progress <= 0.001) {
        gsap.set(leftDoor, { 
          x: '0%', 
          width: 'calc(50% + 1px)',
          clearProps: 'opacity'
        });
        gsap.set(rightDoor, { 
          x: '0%',
          clearProps: 'opacity'
        });
        gsap.set(header, { 
          opacity: 1,
          clearProps: 'opacity'
        });
        return;
      }
      
      // Calculate positions based on progress
      const leftPos = -100 * progress;
      const rightPos = 100 * progress;
      
      // Set left door position and width with smoother transition
      gsap.set(leftDoor, { 
        x: `${leftPos}%`,
        width: progress < 0.05 ? 'calc(50% + 1px)' : '50%',
      });
      
      // Set right door position
      gsap.set(rightDoor, { x: `${rightPos}%` });
      
      // Ensure header stays fully opaque
      gsap.set(header, { 
        opacity: 1,
        clearProps: 'opacity'
      });
    };
    
    // Create a simpler timeline approach
    ScrollTrigger.create({
      trigger: header,
      start: 'top top', // Remove the offset to prevent initial scroll issues
      end: isMobileDevice ? '100% top' : '100% top',
      scrub: 0.2, // Smaller value for even smoother animation
      preventOverlaps: true,
      fastScrollEnd: true,
      onUpdate: (self) => {
        // Use the ScrollTrigger progress to directly update door positions
        const progress = self.progress;
        updateDoorPositions(progress);
      },
      onLeave: () => {
        // When scrolling past the header, keep it fully split
        updateDoorPositions(1);
      },
      onEnterBack: () => {
        // When scrolling back into view, start closing animation
        const scrollProgress = window.scrollY / window.innerHeight;
        const progress = Math.min(1, scrollProgress);
        
        // Always update positions when entering back, but maintain split state if scrolled
        updateDoorPositions(progress);
      },
      onLeaveBack: () => {
        // Only force-close if actually at the top
        if (window.scrollY === 0) {
          updateDoorPositions(0);
        }
      }
    });

    // Force initial positions without blocking animation
    const forceInitialPosition = () => {
      // Always set initial position on load, regardless of scroll position
      updateDoorPositions(0);
    };
    
    // Apply on load to ensure correct initial state
    forceInitialPosition();
    window.addEventListener('load', forceInitialPosition);

    // When we're done with the page, we clean up our GSAP magic
    return () => {
      initialAnimation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('load', forceInitialPosition);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden" id="header-section">
      {/* The full-screen canvas for our header spectacle */}
      <div 
        ref={headerRef}
        className="relative w-full h-screen z-20 transition-opacity duration-500 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full relative overflow-hidden">
          {/* The left-side door that slides away */}
          <div 
            ref={leftDoorRef}
            className="w-1/2 h-full relative overflow-hidden door-reset left-door-fix"
            style={{ 
              transformOrigin: 'left center',
              // Add 1px extra width to ensure no gap is visible
              width: 'calc(50% + 1px)',
              // Ensure transform is set at the JSX level
              transform: 'translateX(0)',
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0
            }}
          >
            {/* This half gets the texture that matches perfectly with the right side */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="relative h-full w-[200%]">
                <Image 
                  src="/images/whiteTexture.jpeg"
                  alt="Texture background - left half"
                  fill
                  className="object-cover opacity-80 transform scale-y-[-1]"
                  style={{ 
                    objectPosition: isMobile ? '50% center' : '0% center',
                    transform: !isMobile ? 'scaleY(1)' : undefined
                  }}
                  priority
                />
                {/* A soft veil of white to help our text pop */}
                <div className="absolute inset-0 bg-white/40"></div>
              </div>
            </div>
          </div>
          
          {/* The right-side door that slides away */}
          <div 
            ref={rightDoorRef}
            className="w-1/2 h-full relative overflow-hidden door-reset right-door-fix"
            style={{ 
              transformOrigin: 'right center', 
              // Ensure transform is set at the JSX level
              transform: 'translateX(0)',
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0
            }}
          >
            {/* The right side texture that creates our seamless background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="relative h-full w-[200%] right-full">
                <Image 
                  src="/images/whiteTexture.jpeg"
                  alt="Texture background - right half"
                  fill
                  className="object-cover opacity-80 transform scale-y-[-1]"
                  style={{ 
                    objectPosition: isMobile ? '50% center' : '100% center',
                    transform: !isMobile ? 'scaleY(1)' : undefined
                  }}
                  priority
                />
                {/* That same dreamy white overlay for visual consistency */}
                <div className="absolute inset-0 bg-white/40"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Header Content - Centered over both doors */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20 pointer-events-none"
        >
          {/* Desktop heading with layered text design */}
          <div className="hidden sm:block relative mb-40 pointer-events-auto" style={{ maxWidth: "700px" }}>
            {/* Glassmorphic circle background - using brand accent color with extreme transparency */}
            <div 
              className="absolute rounded-full z-0"
              style={{ 
                background: 'rgba(138, 125, 101, 0.08)',
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)',
                boxShadow: '0 8px 32px rgba(138, 125, 101, 0.04)',
                border: '1px solid rgba(138, 125, 101, 0.12)',
                width: '130%',
                height: '140%',
                top: '-20%',
                left: '-15%',
                zIndex: -1,
              }}
            ></div>
            
            {/* Background "DE" text above - positioned to be tangent to pill */}
            <div className="absolute w-full text-center top-[-120px] left-[-25%]">
              <div 
                className={`flex justify-start text-7xl md:text-8xl font-bold ${spaceGrotesk.className}`}
                style={{ 
                  color: 'rgba(180, 175, 160, 0.5)',
                  textShadow: '0 2px 15px rgba(0,0,0,0.15)',
                  fontWeight: '700',
                  zIndex: -1,
                  textTransform: 'uppercase',
                  marginLeft: '100px'
                }}
              >
                <span>DE</span>
              </div>
            </div>
            
            {/* Main text "Esența formelor" - perfectly centered */}
            <h1 
              ref={headingRef}
              className={`relative text-5xl md:text-6xl lg:text-7xl font-bold ${spaceGrotesk.className}`}
              style={{ 
                fontWeight: '700',
                color: '#2e2e2e',
                lineHeight: '1',
                textTransform: 'uppercase',
                zIndex: 10
              }}
            >
              <div className="flex justify-center">
                <span>ESENȚA</span>
              </div>
              <div className="flex justify-center mt-0">
                <span>FORMELOR</span>
              </div>
            </h1>
            
            {/* Background "FOND" text below - aligned to the right */}
            <div className="absolute w-full text-center bottom-[-120px] left-[15%]">
              <div 
                className={`flex justify-end text-7xl md:text-8xl font-bold ${spaceGrotesk.className}`}
                style={{ 
                  color: 'rgba(180, 175, 160, 0.5)',
                  textShadow: '0 2px 15px rgba(0,0,0,0.15)',
                  fontWeight: '700',
                  zIndex: -1,
                  textTransform: 'uppercase',
                  marginRight: '20px'
                }}
              >
                <span>FOND</span>
              </div>
            </div>
          </div>
          
          {/* Mobile heading with layered text design */}
          <div className={`sm:hidden flex flex-col items-center justify-center pointer-events-auto mb-36 w-full`} style={{ paddingTop: '20px' }}>
            <div className="relative flex flex-col items-center" style={{ maxWidth: '340px' }}>
              {/* Glassmorphic circle background - scaled for mobile */}
              <div 
                className="absolute rounded-full z-0"
                style={{ 
                  background: 'rgba(138, 125, 101, 0.08)',
                  backdropFilter: 'blur(25px)',
                  WebkitBackdropFilter: 'blur(25px)',
                  boxShadow: '0 8px 32px rgba(138, 125, 101, 0.04)',
                  border: '1px solid rgba(138, 125, 101, 0.12)',
                  width: '130%',
                  height: '140%',
                  top: '-20%',
                  left: '-15%',
                  zIndex: -1,
                }}
              ></div>
              
              {/* Background "DE" text above - positioned to be tangent to pill */}
              <div className="absolute w-full text-center top-[-60px] left-[-20%]">
                <div 
                  className={`flex justify-start text-[55px] font-bold ${spaceGrotesk.className}`}
                  style={{ 
                    color: 'rgba(180, 175, 160, 0.5)',
                    textShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    fontWeight: '700',
                    zIndex: -1,
                    textTransform: 'uppercase',
                    marginLeft: '50px',
                    marginTop: '-25px !important'
                  }}
                >
                  <span>DE</span>
                </div>
              </div>
              
              {/* Main text container */}
              <div className="relative w-full flex flex-col items-center z-10">
                <div className="relative z-10 py-3 w-full">
                  {/* Main text "Esența formelor" - perfectly centered */}
                  <h1 
                    className={`relative text-4xl font-bold ${spaceGrotesk.className}`}
                    style={{ 
                      fontWeight: '700',
                      color: '#2e2e2e',
                      lineHeight: '1',
                      textTransform: 'uppercase',
                      zIndex: 10
                    }}
                  >
                    <div className="flex justify-center">
                      <span>ESENȚA</span>
                    </div>
                    <div className="flex justify-center mt-0">
                      <span>FORMELOR</span>
                    </div>
                  </h1>
                </div>
              </div>
              
              {/* Background "FOND" text below - aligned to the right */}
              <div className="absolute w-full text-center bottom-[-60px] left-[10%]">
                <div 
                  className={`flex justify-end text-[55px] font-bold ${spaceGrotesk.className}`}
                  style={{ 
                    color: 'rgba(180, 175, 160, 0.5)',
                    textShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    fontWeight: '700',
                    zIndex: -1,
                    textTransform: 'uppercase',
                    marginRight: '10px',
                    marginBottom: '-30px !important'
                  }}
                >
                  <span>FOND</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tagline on a single line */}
          <div 
            ref={taglineRef}
            className="mb-8 text-lg sm:text-xl md:text-2xl tracking-wider font-medium pointer-events-auto flex justify-center items-center w-full py-4"
            style={{
              transform: 'translateY(0)',
              transition: 'transform 0.5s ease-in-out',
              minHeight: '4rem',
              height: 'auto'
            }}
          >
            <div className="flex items-center justify-center w-full px-6 py-2">
              <div className="flex flex-wrap sm:flex-nowrap justify-center items-center max-w-full gap-3 sm:gap-6">
                <span className={`text-[#8a7d65] text-sm xs:text-base sm:text-lg md:text-xl whitespace-nowrap ${spaceGrotesk.className}`} 
                  style={{ 
                    display: 'inline-block', 
                    position: 'relative',
                    padding: '0.5rem 0'
                  }}
                >
                  Vopsele moderne
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8a7d65] opacity-60" style={{ animation: 'expandWidth 3s ease-in-out infinite' }}></span>
                </span>
                <span className="mx-3 sm:mx-6 text-gray-300">|</span>
                <span className={`text-[#696969] text-sm xs:text-base sm:text-lg md:text-xl whitespace-nowrap ${spaceGrotesk.className}`} 
                  style={{ 
                    display: 'inline-block', 
                    position: 'relative',
                    padding: '0.5rem 0'
                  }}
                >
                  izolații eco-friendly
                  <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#696969] opacity-60" style={{ animation: 'expandWidth 3s ease-in-out infinite 1.5s' }}></span>
                </span>
              </div>
            </div>
          </div>
          
          <p 
            ref={subtitleRef}
            className={`text-sm sm:text-base md:text-lg text-[#333333] mb-12 max-w-2xl font-medium pointer-events-auto ${spaceGrotesk.className}`}
            style={{ 
              letterSpacing: '0.05em',
              maxWidth: '90%',
              lineHeight: '1.5'
            }}
          >
            Transformă-ți spațiul cu soluții complete pentru o casă frumoasă, confortabilă și eficientă energetic
          </p>
          
          <div 
            ref={ctaRef}
            className="flex items-center justify-center space-x-0 pointer-events-auto"
            style={{ position: 'relative' }}
          >
            {/* Container to ensure buttons are split by center point */}
            <div className="flex w-full justify-center" style={{ position: 'relative' }}>
              {/* Left button - positioned to end exactly at center */}
              <div className="flex justify-end pr-2" style={{ width: '50%' }}>
                <button 
                  className={`px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 tracking-wide whitespace-nowrap w-[160px] sm:w-[200px] ${spaceGrotesk.className}`}
                  style={{ 
                    maxWidth: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    color: '#404040',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                    transform: 'translateY(0)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
                  }}
                >
                  Solicită ofertă
                </button>
              </div>
              
              {/* Right button - positioned to start exactly at center */}
              <div className="flex justify-start pl-2" style={{ width: '50%' }}>
                <button 
                  className={`px-3 sm:px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 tracking-wide whitespace-nowrap text-center w-[160px] sm:w-[200px] flex items-center justify-center ${spaceGrotesk.className}`}
                  style={{ 
                    maxWidth: '100%',
                    backgroundColor: 'rgba(138, 125, 101, 0.3)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    color: '#404040',
                    border: '1px solid rgba(138, 125, 101, 0.25)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                    transform: 'translateY(0)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
                    e.currentTarget.style.backgroundColor = 'rgba(138, 125, 101, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.backgroundColor = 'rgba(138, 125, 101, 0.3)';
                  }}
                >
                  <span className="mx-auto">Descoperă proiecte</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20" style={{marginBottom: '30px !important' }}>
          <div className="w-6 h-10 border border-[#404040] rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-[#404040] rounded-full animate-bounce mt-2" />
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-24 right-[10%] w-20 h-20 border border-[#8a7d65]/20 rounded-full opacity-50 z-20"></div>
        <div className="absolute bottom-24 left-[10%] w-16 h-16 border border-[#696969]/20 rounded-full opacity-50 z-20"></div>
      </div>
      
      {/* Add keyframes for the underline animation */}
      <style jsx global>{`
        @keyframes expandWidth {
          0% { width: 0; left: 0; right: auto; }
          50% { width: 100%; left: 0; right: auto; }
          51% { width: 100%; right: 0; left: auto; }
          100% { width: 0; right: 0; left: auto; }
        }
        
        /* Initial state class - removed !important flags to allow animation */
        .door-reset {
          transform: translateX(0);
          transition: none;
        }
        
        /* Set initial position but allow GSAP to override */
        .left-door-fix {
          width: calc(50% + 1px);
          left: 0;
        }
        
        /* Set initial position but allow GSAP to override */
        .right-door-fix {
          right: 0;
        }
      `}</style>
    </div>
  );
};

export default VideoHeader; 
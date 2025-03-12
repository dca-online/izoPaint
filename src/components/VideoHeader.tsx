'use client';
import React, { useEffect, useRef, useState } from 'react';
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
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // We need to know if we're on a phone to make adjustments
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

    // Let's fade in all those beautiful text elements first
    gsap.fromTo(
      [heading, subtitle, tagline, cta],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 1, delay: 0.5 }
    );

    // Here comes the cool part - the doors splitting apart as you scroll
    const isMobileDevice = window.innerWidth < 768;
    
    const doorTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: '30% top',
        scrub: isMobileDevice ? 1 : 2, // Phones need less resistance for smoother scrolling
        onUpdate: (self) => {
          // Once we're mostly done with the animation, let's hide some elements
          if (self.progress > 0.8) {
            setAnimationCompleted(true);
          } else {
            setAnimationCompleted(false);
          }
        }
      }
    });

    // The doors need to move differently depending on your device
    const easingType = isMobileDevice ? 'power1.out' : 'power1.out';
    const doorDelay = isMobileDevice ? 0.1 : 0.05;
    const doorDuration = isMobileDevice ? 1.2 : 1.5; // A bit quicker on phones feels better
    
    // Mobile users scroll differently, so we adjust the timing
    // Desktop gets a slightly different treatment
    const headerTiming = isMobileDevice ? 0 : 0;  // Everything happens at once on mobile
    const headerDelay = isMobileDevice ? 0 : 0.2; // Desktop gets that slight pause

    doorTl
      .to(leftDoor, { 
        x: '-100%', 
        ease: easingType,
        duration: doorDuration,
        opacity: 1 // We want to keep it visible while it moves
      }, doorDelay)
      .to(rightDoor, { 
        x: '100%', 
        ease: easingType,
        duration: doorDuration,
        opacity: 1 // Same for the right door - stay visible
      }, doorDelay)
      .to(header, { 
        opacity: 0,
        y: '-50%',
        duration: isMobileDevice ? 0.8 : 1, // Text fades a bit faster on mobile
        ease: 'power2.inOut',
        delay: headerDelay
      }, headerTiming);

    // When we're done with the page, we clean up our GSAP magic
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* The full-screen canvas for our header spectacle */}
      <div 
        ref={headerRef}
        className={`fixed top-0 left-0 w-full h-screen z-20 ${animationCompleted ? 'pointer-events-none' : ''}`}
      >
        <div className="absolute top-0 left-0 w-full h-full flex items-stretch">
          {/* The left-side door that slides away */}
          <div 
            ref={leftDoorRef}
            className="w-1/2 h-full relative overflow-hidden"
            style={{ transformOrigin: 'left center' }}
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
            className="w-1/2 h-full relative overflow-hidden"
            style={{ transformOrigin: 'right center' }}
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
                zIndex: 10,
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
                    marginLeft: '35px'
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
                      zIndex: 10,
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
                    marginRight: '10px'
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
            className="mb-6 text-lg sm:text-xl md:text-2xl tracking-wider font-medium pointer-events-auto"
            style={{
              transform: 'translateY(0)',
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            <span className="golden-rooster-font text-[#8a7d65]" style={{ display: 'inline-block', position: 'relative' }}>
              Vopsele moderne
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8a7d65] opacity-60" style={{ animation: 'expandWidth 3s ease-in-out infinite' }}></span>
            </span>
            <span className="mx-4 text-gray-300">|</span>
            <span className="golden-rooster-font text-[#696969]" style={{ display: 'inline-block', position: 'relative' }}>
              izolații eco-friendly
              <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#696969] opacity-60" style={{ animation: 'expandWidth 3s ease-in-out infinite 1.5s' }}></span>
            </span>
          </div>
          
          <p 
            ref={subtitleRef}
            className="text-sm sm:text-base md:text-lg text-[#333333] mb-12 max-w-2xl font-medium pointer-events-auto golden-rooster-font"
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
                  className="px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 tracking-wide whitespace-nowrap w-[160px] sm:w-[200px]"
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
                  className="px-4 pl-5 sm:px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 tracking-wide whitespace-nowrap text-center w-[160px] sm:w-[200px]"
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
                  Descoperă proiecte
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Only show if animation not completed */}
        {!animationCompleted && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
            <div className="text-[#8a7d65] text-xs tracking-widest uppercase mb-2 opacity-80">Explorează</div>
            <div className="w-6 h-10 border border-[#404040]/50 rounded-full flex justify-center">
              <div className="w-1.5 h-1.5 bg-[#404040] rounded-full animate-bounce mt-2" />
            </div>
          </div>
        )}
        
        {/* Decorative Elements */}
        <div className="absolute top-24 right-[10%] w-20 h-20 border border-[#8a7d65]/20 rounded-full opacity-50 z-20"></div>
        <div className="absolute bottom-24 left-[10%] w-16 h-16 border border-[#696969]/20 rounded-full opacity-50 z-20"></div>
      </div>

      {/* Invisible content spacer - creates room for scrolling */}
      <div style={{ height: '200vh' }}></div>
      
      {/* Add keyframes for the underline animation */}
      <style jsx global>{`
        @keyframes expandWidth {
          0% { width: 0; left: 0; right: auto; }
          50% { width: 100%; left: 0; right: auto; }
          51% { width: 100%; right: 0; left: auto; }
          100% { width: 0; right: 0; left: auto; }
        }
      `}</style>
    </>
  );
};

export default VideoHeader; 
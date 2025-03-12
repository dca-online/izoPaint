'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Create SVG components for our icons
const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="#F0E4B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="#F0E4B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="#B99C4B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AccountIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#B99C4B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#F0E4B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

type NavLink = {
  name: string;
  path: string;
  index: string;
};

const navLinks: NavLink[] = [
  { name: 'Acasă', path: '/', index: '01' },
  { name: 'Servicii', path: '/servicii', index: '02' },
  { name: 'Produse', path: '/produse', index: '03' },
  { name: 'Portofoliu', path: '/portofoliu', index: '04' },
  { name: 'Despre Noi', path: '/despre', index: '05' },
  { name: 'Contact', path: '/contact', index: '06' },
];

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navItemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [cartCount] = useState(0);

  // Check if mobile on client side
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 100);
      setIsPastHero(scrollPosition > window.innerHeight * 0.75); // Past 75% of viewport height
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          paddingTop: hasScrolled ? '1rem' : '1.5rem',
          paddingBottom: hasScrolled ? '1rem' : '1.5rem',
          background: 'transparent',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo Pill Container */}
            <motion.div 
              className="relative"
              animate={{ 
                background: hasScrolled ? 'rgba(26, 26, 26, 0.35)' : 'transparent',
                borderRadius: hasScrolled ? '9999px' : '0px',
                padding: hasScrolled ? '0.5rem 1rem' : '0',
                boxShadow: hasScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
                backdropFilter: hasScrolled ? 'blur(16px)' : 'none',
                WebkitBackdropFilter: hasScrolled ? 'blur(16px)' : 'none',
                border: hasScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                borderTop: hasScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                borderLeft: hasScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none'
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Link href="/" className="text-xl font-bold text-white hover:text-[#F0E4B2] transition-colors font-heading relative">
                <span className="inline-block relative">
                  <span className="text-[#B99C4B] mr-0">.</span>
                  <span className="text-[#B99C4B]">izo</span><span className="text-[#F0E4B2]">paint</span>
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation - visible when not scrolled and centered */}
            <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 space-x-8 relative">
              {/* Highlight element */}
              <div 
                className="absolute h-10 bg-[#B99C4B] rounded-full transition-all duration-300"
                style={{
                  width: activeIndex !== null ? '85px' : '0',
                  // Recalibrated precise pixel values for perfect centering on each menu item including Produse
                  left: activeIndex === 0 ? '-5px' : 
                        activeIndex === 1 ? '104px' : 
                        activeIndex === 2 ? '225px' : 
                        activeIndex === 3 ? '365px' :
                        activeIndex === 4 ? '495px' :
                        activeIndex === 5 ? '625px' : '0',
                  opacity: activeIndex !== null ? 0.2 : 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
              
              {/* Nav links that animate into the menu pill */}
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  className="relative z-10"
                  ref={el => {
                    navItemRefs.current[index] = el;
                  }}
                  animate={{
                    x: hasScrolled ? 50 * (navLinks.length - index) : 0,
                    opacity: hasScrolled ? 0 : 1,
                    scale: hasScrolled ? 0.8 : 1,
                  }}
                  transition={{
                    duration: 0.3, 
                    ease: 'easeOut',
                    delay: hasScrolled ? 0.05 * index : 0.05 * (navLinks.length - index - 1)
                  }}
                >
                  <Link 
                    href={link.path}
                    className="text-white hover:text-[#F0E4B2] transition-colors px-4 py-2"
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Right-side actions container with Menu Button + Action Icons */}
            <div className="flex items-center">
              {/* Action Icons Container (Cart & Account) - now right next to menu button */}
              <div className="flex items-center space-x-1 mr-1">
                {/* Cart Icon Pill */}
                <motion.div
                  className="relative z-[60]"
                  animate={{ 
                    opacity: hasScrolled || (isMobile && isPastHero) ? 1 : 0,
                    scale: hasScrolled || (isMobile && isPastHero) ? 1 : 0.8,
                    x: hasScrolled ? 0 : 20,
                    background: hasScrolled ? 'rgba(26, 26, 26, 0.35)' : 'transparent',
                    borderRadius: '9999px',
                    boxShadow: hasScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
                    backdropFilter: hasScrolled ? 'blur(16px)' : 'none',
                    WebkitBackdropFilter: hasScrolled ? 'blur(16px)' : 'none',
                    border: hasScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                    borderTop: hasScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    borderLeft: hasScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                    pointerEvents: hasScrolled || (isMobile && isPastHero) ? 'auto' : 'none'
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <Link href="/cos" className="w-10 h-10 flex items-center justify-center">
                    <CartIcon />
                    {cartCount > 0 && (
                      <span className="absolute top-0 right-0 bg-[#B99C4B] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </motion.div>
                
                {/* Account Icon Pill */}
                <motion.div
                  className="relative z-[60]"
                  animate={{ 
                    opacity: hasScrolled || (isMobile && isPastHero) ? 1 : 0,
                    scale: hasScrolled || (isMobile && isPastHero) ? 1 : 0.8,
                    x: hasScrolled ? 0 : 20,
                    background: hasScrolled ? 'rgba(26, 26, 26, 0.35)' : 'transparent',
                    borderRadius: '9999px',
                    boxShadow: hasScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
                    backdropFilter: hasScrolled ? 'blur(16px)' : 'none',
                    WebkitBackdropFilter: hasScrolled ? 'blur(16px)' : 'none',
                    border: hasScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                    borderTop: hasScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    borderLeft: hasScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                    pointerEvents: hasScrolled || (isMobile && isPastHero) ? 'auto' : 'none'
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <Link href="/cont" className="w-10 h-10 flex items-center justify-center">
                    <AccountIcon />
                  </Link>
                </motion.div>
              </div>

              {/* Menu Button Pill - visible when scrolled on desktop or past hero on mobile */}
              <motion.button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="focus:outline-none relative z-[60] md:flex items-center"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                animate={{ 
                  opacity: hasScrolled || (isMobile && isPastHero) ? 1 : (isMobile ? 0 : hasScrolled ? 1 : 0),
                  x: hasScrolled ? 0 : 50,
                  background: hasScrolled ? 'rgba(26, 26, 26, 0.35)' : 'transparent',
                  borderRadius: hasScrolled ? '9999px' : '0',
                  padding: hasScrolled ? '0.5rem 1rem' : '0.5rem',
                  boxShadow: hasScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
                  backdropFilter: hasScrolled ? 'blur(16px)' : 'none',
                  WebkitBackdropFilter: hasScrolled ? 'blur(16px)' : 'none',
                  border: hasScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                  borderTop: hasScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                  borderLeft: hasScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                  pointerEvents: hasScrolled || (isMobile && isPastHero) ? 'auto' : (isMobile ? 'none' : 'auto')
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {hasScrolled && (
                  <span className="mr-3 text-[#F0E4B2] hidden md:block">Menu</span>
                )}
                <div className="w-8 h-6 flex flex-col items-center justify-center relative">
                  {/* Menu icon that transforms to X with equal-length lines */}
                  <span
                    className={`block h-[1.5px] bg-[#B99C4B] absolute transition-all duration-300 origin-center`}
                    style={{
                      top: isMenuOpen ? '50%' : '30%',
                      transform: isMenuOpen ? 'translateY(-50%) rotate(45deg)' : 'translateY(0)',
                      width: '28px'
                    }}
                  />
                  <span
                    className={`block h-[1.5px] bg-[#F0E4B2] absolute transition-all duration-300 origin-center`}
                    style={{
                      bottom: isMenuOpen ? '50%' : '30%',
                      transform: isMenuOpen ? 'translateY(50%) rotate(-45deg)' : 'translateY(0)',
                      width: '28px'
                    }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Menu - now for both mobile and desktop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 flex flex-col overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              backgroundColor: 'rgba(26, 26, 26, 0.75)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Background effects - enhanced with more visible glow */}
            <div className="absolute top-20 right-10 w-[250px] h-[250px] rounded-full bg-[#B99C4B] opacity-8 blur-3xl"></div>
            <div className="absolute bottom-40 left-10 w-[350px] h-[350px] rounded-full bg-[#F0E4B2] opacity-8 blur-3xl"></div>
            
            {/* Add additional subtle glass reflections */}
            <div className="absolute top-1/4 left-1/3 w-[150px] h-[150px] rounded-full bg-white opacity-[0.03] blur-xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-[100px] h-[100px] rounded-full bg-white opacity-[0.02] blur-lg"></div>
            
            {/* Empty space to ensure navbar visibility */}
            <div style={{ height: hasScrolled ? '60px' : '90px' }}></div>
            
            {/* Brutalist Menu Navigation - now with larger sizing for desktop */}
            <div className="flex flex-col justify-end flex-grow h-full pb-16 px-8 md:px-20 mt-auto container mx-auto">
              <ul className="flex flex-col items-start space-y-5 md:space-y-10">
                {navLinks.map((link) => (
                  <motion.li 
                    key={link.path}
                    className="overflow-hidden w-full"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: parseInt(link.index) * 0.1 }}
                    onClick={() => {
                      setIsMenuOpen(false);
                      // Use window.location for immediate navigation
                      window.location.href = link.path;
                    }}
                  >
                    <div className="flex items-baseline group cursor-pointer w-full py-3">
                      <span className="text-base md:text-xl text-[#B99C4B] mr-4 md:mr-6 font-mono opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        {link.index}
                      </span>
                      <span className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl uppercase font-bold text-white tracking-wide font-heading group-hover:text-[#B99C4B] transition-colors duration-300">
                        {link.name}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {/* Contact information at bottom */}
            <div className="px-8 md:px-20 pb-10 text-white/60 text-sm md:text-base container mx-auto">
              <p>office@vopsele-izolatii.ro</p>
              <p>+40 770 123 456</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 
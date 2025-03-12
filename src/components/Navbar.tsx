'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Create SVG components for our icons
const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="#404040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="#404040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AccountIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#404040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
          paddingTop: hasScrolled ? '1rem' : '0.75rem',
          paddingBottom: hasScrolled ? '1rem' : '0.75rem',
          background: 'transparent',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo Pill Container */}
            <motion.div 
              className="relative"
              animate={{ 
                background: hasScrolled ? 'rgba(248, 248, 246, 0.85)' : 'transparent',
                borderRadius: hasScrolled ? '9999px' : '0px',
                padding: hasScrolled ? '0.5rem 1rem' : '0',
                boxShadow: hasScrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
                backdropFilter: hasScrolled ? 'blur(16px)' : 'none',
                WebkitBackdropFilter: hasScrolled ? 'blur(16px)' : 'none',
                border: hasScrolled ? '1px solid rgba(64, 64, 64, 0.08)' : 'none',
                borderTop: hasScrolled ? '1px solid rgba(255, 255, 255, 0.8)' : 'none',
                borderLeft: hasScrolled ? '1px solid rgba(255, 255, 255, 0.6)' : 'none'
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Link href="/" className="text-xl font-bold text-[#404040] hover:text-[#696969] transition-colors font-heading relative">
                <span className="inline-block relative">
                  <span className="text-[#8a7d65] mr-0">.</span>
                  <span className="text-[#8a7d65]">izo</span><span className="text-[#696969]">paint</span>
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation - centered absolutely */}
            <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
              {/* Glassmorphic pill container for all navigation items */}
              <motion.div 
                className="absolute inset-0 rounded-full z-0"
                animate={{ 
                  background: 'rgba(255, 255, 255, 0.45)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.5)',
                  borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
                  opacity: hasScrolled ? 0 : 1,
                  width: '100%',
                  height: '40px',
                  padding: '0 1.5rem',
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
              
              {/* Highlight element - centered vertically */}
              <div 
                className="absolute h-10 bg-[#8a7d65] rounded-full transition-all duration-300 z-0"
                style={{
                  width: activeIndex !== null ? '85px' : '0',
                  // Recalibrated pixel values
                  left: activeIndex === 0 ? '0px' : 
                        activeIndex === 1 ? '110px' : 
                        activeIndex === 2 ? '235px' : 
                        activeIndex === 3 ? '375px' :
                        activeIndex === 4 ? '505px' :
                        activeIndex === 5 ? '635px' : '0',
                  opacity: activeIndex !== null ? 0.2 : 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
              
              {/* Nav links inside the glassmorphic pill - ensure perfect centering */}
              <div className="flex items-center justify-center space-x-8 px-4 h-10 relative z-10">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    className="relative"
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
                      className="text-[#404040] hover:text-[#8a7d65] transition-colors px-4 h-10 flex items-center justify-center"
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
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
                    background: hasScrolled ? 'rgba(248, 248, 246, 0.85)' : 'transparent',
                    borderRadius: '9999px',
                    boxShadow: hasScrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
                    backdropFilter: hasScrolled ? 'blur(16px)' : 'none',
                    WebkitBackdropFilter: hasScrolled ? 'blur(16px)' : 'none',
                    border: hasScrolled ? '1px solid rgba(64, 64, 64, 0.08)' : 'none',
                    borderTop: hasScrolled ? '1px solid rgba(255, 255, 255, 0.8)' : 'none',
                    borderLeft: hasScrolled ? '1px solid rgba(255, 255, 255, 0.6)' : 'none',
                    pointerEvents: hasScrolled || (isMobile && isPastHero) ? 'auto' : 'none'
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <Link href="/cos" className="w-10 h-10 flex items-center justify-center">
                    <CartIcon />
                    {cartCount > 0 && (
                      <span className="absolute top-0 right-0 bg-[#8a7d65] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
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
                    background: hasScrolled ? 'rgba(248, 248, 246, 0.85)' : 'transparent',
                    borderRadius: '9999px',
                    boxShadow: hasScrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
                    backdropFilter: hasScrolled ? 'blur(16px)' : 'none',
                    WebkitBackdropFilter: hasScrolled ? 'blur(16px)' : 'none',
                    border: hasScrolled ? '1px solid rgba(64, 64, 64, 0.08)' : 'none',
                    borderTop: hasScrolled ? '1px solid rgba(255, 255, 255, 0.8)' : 'none',
                    borderLeft: hasScrolled ? '1px solid rgba(255, 255, 255, 0.6)' : 'none',
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
                  background: hasScrolled ? 'rgba(248, 248, 246, 0.85)' : 'transparent',
                  borderRadius: hasScrolled ? '9999px' : '0',
                  padding: hasScrolled ? '0.5rem 1rem' : '0.5rem',
                  boxShadow: hasScrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
                  backdropFilter: hasScrolled ? 'blur(16px)' : 'none',
                  WebkitBackdropFilter: hasScrolled ? 'blur(16px)' : 'none',
                  border: hasScrolled ? '1px solid rgba(64, 64, 64, 0.08)' : 'none',
                  borderTop: hasScrolled ? '1px solid rgba(255, 255, 255, 0.8)' : 'none',
                  borderLeft: hasScrolled ? '1px solid rgba(255, 255, 255, 0.6)' : 'none',
                  pointerEvents: hasScrolled || (isMobile && isPastHero) ? 'auto' : (isMobile ? 'none' : 'auto')
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {hasScrolled && (
                  <span className="mr-3 text-[#696969] hidden md:block">Menu</span>
                )}
                <div className="w-6 flex flex-col items-center justify-center space-y-1">
                  <span className={`block w-full h-0.5 rounded-full bg-[#404040] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                  <span className={`block w-full h-0.5 rounded-full bg-[#404040] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-full h-0.5 rounded-full bg-[#404040] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-[#f8f8f6]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full justify-center items-center px-6">
              <div className="w-full max-w-md">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    className="mb-6 py-2 overflow-hidden"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Link 
                      href={link.path}
                      className="group flex items-center text-[#404040] hover:text-[#8a7d65] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-sm font-mono mr-4 text-[#8a7d65] group-hover:text-[#696969] transition-colors">{link.index}</span>
                      <span className="text-3xl md:text-4xl font-bold">{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-12 flex space-x-6">
                <Link href="/cos" className="text-[#404040] hover:text-[#8a7d65] transition-colors">
                  <span className="sr-only">Coș de cumpărături</span>
                  <CartIcon />
                </Link>
                <Link href="/cont" className="text-[#404040] hover:text-[#8a7d65] transition-colors">
                  <span className="sr-only">Contul meu</span>
                  <AccountIcon />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 
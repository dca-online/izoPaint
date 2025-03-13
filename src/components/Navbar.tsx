'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import CategoryOverlay from './CategoryOverlay';

// Our custom icons with a touch of brand personality
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

// Social media icons
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7615 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 6.5H17.51" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 6L12 13L2 6" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5902 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.2712 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.21649 3.36163C2.30509 3.09849 2.44756 2.85669 2.63476 2.65163C2.82196 2.44656 3.0498 2.28271 3.30379 2.17053C3.55777 2.05834 3.83233 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23662 4.68007 9.47145 5.62273 9.81 6.53C9.94455 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51355 12.4135 11.5865 14.4865 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
  { name: 'Despre noi', path: '/despre', index: '05' },
  { name: 'Contact', path: '/contact', index: '06' },
];

// Contact information data
const contactInfo = {
  email: 'contact@izopaint.ro',
  phone: '+40 722 123 456',
  instagram: 'instagram.com/izopaint',
  facebook: 'facebook.com/izopaint'
};

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(typeof window !== 'undefined' && window.location.pathname !== '/');
  const [isPastHero, setIsPastHero] = useState(typeof window !== 'undefined' && window.location.pathname !== '/');
  const [isMobile, setIsMobile] = useState(false);
  const navItemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [cartCount] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const routerPath = useRef<string>("");
  const [currentPath, setCurrentPath] = useState<string>("/");
  const [isHovering, setIsHovering] = useState(false);
  const [showCategoryOverlay, setShowCategoryOverlay] = useState(false);

  // Hide scrollbar on homepage and measure it for consistent layout
  useEffect(() => {
    // Check if we're on the homepage
    const path = window.location.pathname;
    routerPath.current = path;
    setCurrentPath(path);
    
    // Calculate scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // On homepage, hide scrollbar and add padding to prevent layout shift
    if (path === '/') {
      document.documentElement.style.overflowY = 'scroll';
      document.documentElement.style.scrollbarWidth = 'none'; // Firefox
      
      // Use correct TypeScript syntax for non-standard properties
      (document.documentElement.style as any).msOverflowStyle = 'none'; // IE/Edge
      
      // Add padding to prevent layout shift for browsers that show scrollbars
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // Safari/Chrome needs an additional style
      const style = document.createElement('style');
      style.textContent = `
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        // Clean up on unmount
        document.documentElement.style.overflowY = '';
        document.documentElement.style.scrollbarWidth = '';
        
        // Clean up with correct TypeScript syntax
        (document.documentElement.style as any).msOverflowStyle = '';
        
        document.body.style.paddingRight = '';
        document.head.removeChild(style);
      };
    }
  }, []);

  // The first time this loads, we need to figure out what device we're on
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check device type immediately on mount
    checkIfMobile();
    
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 100);
      setIsPastHero(scrollPosition > window.innerHeight * 0.75); // We're about 3/4 down the hero section
    };

    // Check scroll position immediately on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Let's make sure the menu doesn't make everything jumpy when it's open
  useEffect(() => {
    // Only handle scrollbar for non-homepage routes since homepage already has it hidden
    if (routerPath.current !== '/') {
      if (isMenuOpen) {
        // Calculate scrollbar width by measuring the difference between window and document width
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        
        // Apply padding to prevent layout shift when scrollbar disappears
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
      return () => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      };
    }
  }, [isMenuOpen, routerPath.current]);

  // Animation variants for the decorative lines
  const underlineVariants: Variants = {
    hidden: { width: 0 },
    visible: (i: number) => ({
      width: '100%', // Make underlines full width for a dynamic elongated effect
      transition: { 
        duration: 0.8,
        delay: i * 0.1 + 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    })
  };

  const verticalLineVariants: Variants = {
    hidden: { height: 0 },
    visible: {
      height: '100vh',
      transition: { 
        duration: 1,
        delay: 1.2,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const horizontalTopLineVariants: Variants = {
    hidden: { width: 0 },
    visible: {
      width: '100%', // Full width line
      transition: { 
        duration: 0.8,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const mobileVerticalLineVariants: Variants = {
    hidden: { height: 0 },
    visible: {
      height: '45vh', // Increased to fit all menu items
      transition: { 
        duration: 0.8,
        delay: 1.2,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const mobileHorizontalBottomLineVariants: Variants = {
    hidden: { width: 0 },
    visible: {
      width: '50vw',
      transition: { 
        duration: 0.8,
        delay: 2,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  // Need to add this back with the same name to fix linter issues
  const splitLineVariants: Variants = {
    hidden: { width: 0 },
    visible: {
      width: '0', // Not used anymore
      transition: { 
        duration: 0.6,
        delay: 2,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  // Mobile underline variants
  const mobileUnderlineVariants: Variants = {
    hidden: { width: 0 },
    visible: (i: number) => ({
      width: '100%', // Full width from left to right
      transition: { 
        duration: 0.8,
        delay: i * 0.1 + 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    })
  };

  // Animation variants for contact info
  const contactItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        delay: i * 0.1 + 1.0,
        ease: [0.76, 0, 0.24, 1]
      }
    })
  };

  // Handle category selection from the overlay
  const handleCategorySelect = (category: 'vopsele' | 'izolatii') => {
    setShowCategoryOverlay(false);
    
    if (category === 'vopsele') {
      router.push('/produse?categorie=vopsele');
    } else {
      router.push('/produse?categorie=izolații');
    }
  };

  // Handle navigation link click
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path === '/produse' && pathname !== '/produse') {
      e.preventDefault();
      setShowCategoryOverlay(true);
    }
  };

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
            {/* Our brand logo with that nice pill shape */}
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
                      className={`transition-colors px-4 h-10 flex items-center justify-center ${
                        link.path === currentPath && !isHovering 
                          ? 'text-[#8a7d65]' 
                          : 'text-[#404040] hover:text-[#8a7d65]'
                      }`}
                      onMouseEnter={() => {
                        setActiveIndex(index);
                        setIsHovering(true);
                      }}
                      onMouseLeave={() => {
                        setActiveIndex(null);
                        setIsHovering(false);
                      }}
                      onClick={(e) => handleNavLinkClick(e, link.path)}
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
              <div className="flex items-center space-x-2">
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

                {/* Menu Button Pill - now circular on mobile like other buttons */}
                <motion.button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="focus:outline-none relative z-[60] md:flex items-center"
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                  animate={{ 
                    opacity: hasScrolled || (isMobile && isPastHero) ? 1 : (isMobile ? 0 : hasScrolled ? 1 : 0),
                    x: hasScrolled ? 0 : 50,
                    background: hasScrolled ? 'rgba(248, 248, 246, 0.85)' : 'transparent',
                    borderRadius: '9999px',
                    padding: isMobile ? 0 : (hasScrolled ? '0.5rem 1rem' : '0.5rem'),
                    width: isMobile ? '40px' : 'auto',
                    height: isMobile ? '40px' : 'auto',
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
                  {hasScrolled && !isMobile && (
                    <span className="mr-3 text-[#696969] hidden md:block">Menu</span>
                  )}
                  <div className={`flex flex-col items-center justify-center space-y-1 ${isMobile ? 'h-full w-full' : 'w-6'}`}>
                    <span className={`block ${isMobile ? 'w-5' : 'w-full'} h-0.5 rounded-full bg-[#404040] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`block ${isMobile ? 'w-5' : 'w-full'} h-0.5 rounded-full bg-[#404040] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block ${isMobile ? 'w-5' : 'w-full'} h-0.5 rounded-full bg-[#404040] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen Menu Overlay - Refined animations targeting hamburger icon */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-[#f8f8f6] overflow-hidden"
            initial={{ 
              opacity: 0,
              y: isMobile ? '100%' : '-100%' // Start from bottom on mobile, top on desktop
            }}
            animate={{ 
              opacity: 1,
              y: 0, // Slide to center
              transition: { 
                opacity: { duration: 0.3 },
                y: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
              }
            }}
            exit={{ 
              opacity: 1, // Keep fully opaque during the slide
              y: isMobile ? '100%' : '-100%', // Exit to bottom on mobile, top on desktop
              transition: {
                opacity: { duration: 0.01, delay: 0.49 }, // Only fade at the very end of the animation
                y: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
              }
            }}
            onAnimationComplete={() => {
              if (isMenuOpen) setAnimationComplete(true);
            }}
          >
            {/* Desktop Menu Layout */}
            <div className="hidden md:flex h-full">
              {/* Vertical center line - desktop - Delayed to match expansion */}
              <motion.div
                className="absolute left-1/2 top-0 w-[1px] bg-[#8a7d65] origin-top"
                initial="hidden"
                animate={isMenuOpen ? "visible" : "hidden"}
                exit="hidden"
                variants={{
                  hidden: { height: 0 },
                  visible: {
                    height: '100vh',
                    transition: { 
                      duration: 1,
                      delay: 0.4, // Delayed to start after initial expansion
                      ease: [0.76, 0, 0.24, 1]
                    }
                  }
                }}
              />

              {/* Left side - Navigation */}
              <div className="w-1/2 h-full flex flex-col justify-center items-start pl-24 pr-10 relative">
                <div className="max-w-xl w-full">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      className="mb-2 pt-1 pb-0 overflow-hidden w-full relative"
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ 
                        y: 60, 
                        opacity: 0,
                        transition: {
                          duration: 0.4,
                          ease: [0.76, 0, 0.24, 1],
                          delay: 0.1 * (navLinks.length - index - 1) // Reverse stagger on exit
                        }
                      }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.3 + (index * 0.08), // Start after initial expansion
                        ease: [0.76, 0, 0.24, 1]
                      }}
                    >
                      {/* Underline for each nav item - desktop */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-[1px] bg-[#8a7d65]"
                        initial="hidden"
                        animate={isMenuOpen ? "visible" : "hidden"}
                        exit="hidden"
                        variants={underlineVariants}
                        custom={index}
                        style={{ originX: 0 }}
                      />

                      <Link 
                        href={link.path}
                        className={`group flex items-baseline transition-colors ${
                          link.path === currentPath && !isHovering 
                            ? 'text-[#8a7d65]' 
                            : 'text-[#404040] hover:text-[#8a7d65]'
                        }`}
                        onClick={(e) => {
                          if (link.path === '/produse' && pathname !== '/produse') {
                            e.preventDefault();
                            setIsMenuOpen(false);
                            setShowCategoryOverlay(true);
                          } else {
                            setIsMenuOpen(false);
                          }
                        }}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        <span className="text-base font-mono mr-8 text-[#8a7d65] opacity-80 group-hover:opacity-100 transition-opacity w-10">{link.index}</span>
                        <span className="text-6xl xl:text-8xl font-['Bebas_Neue'] tracking-tight leading-none">{link.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right side - Contact Info */}
              <div className="w-1/2 h-full flex flex-col justify-center items-center pl-10 pr-24">
                <div className="max-w-xl w-full">
                  <motion.h2 
                    className="text-4xl font-['Bebas_Neue'] text-[#404040] mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ 
                      opacity: 0, 
                      y: 20,
                      transition: { duration: 0.3, delay: 0.1 }
                    }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    Contactează-ne
                  </motion.h2>
                  
                  <motion.div 
                    className="flex items-center mb-6"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { 
                          duration: 0.5,
                          delay: 0.6,
                          ease: [0.76, 0, 0.24, 1]
                        }
                      }
                    }}
                  >
                    <PhoneIcon />
                    <a href={`tel:${contactInfo.phone}`} className="text-[#404040] hover:text-[#8a7d65] transition-colors ml-4 text-xl">
                      {contactInfo.phone}
                    </a>
                  </motion.div>

                  <motion.div 
                    className="flex items-center mb-6"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { 
                          duration: 0.5,
                          delay: 0.7,
                          ease: [0.76, 0, 0.24, 1]
                        }
                      }
                    }}
                  >
                    <EmailIcon />
                    <a href={`mailto:${contactInfo.email}`} className="text-[#404040] hover:text-[#8a7d65] transition-colors ml-4 text-xl">
                      {contactInfo.email}
                    </a>
                  </motion.div>

                  <motion.div 
                    className="flex items-center mb-6"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { 
                          duration: 0.5,
                          delay: 0.8,
                          ease: [0.76, 0, 0.24, 1]
                        }
                      }
                    }}
                  >
                    <InstagramIcon />
                    <a href={`https://${contactInfo.instagram}`} target="_blank" rel="noopener noreferrer" className="text-[#404040] hover:text-[#8a7d65] transition-colors ml-4 text-xl">
                      {contactInfo.instagram}
                    </a>
                  </motion.div>

                  <motion.div 
                    className="flex items-center"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { 
                          duration: 0.5,
                          delay: 0.9,
                          ease: [0.76, 0, 0.24, 1]
                        }
                      }
                    }}
                  >
                    <FacebookIcon />
                    <a href={`https://${contactInfo.facebook}`} target="_blank" rel="noopener noreferrer" className="text-[#404040] hover:text-[#8a7d65] transition-colors ml-4 text-xl">
                      {contactInfo.facebook}
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Layout - Bottom Aligned */}
            <div className="md:hidden flex flex-col h-full justify-end relative">
              {/* Mobile Contact Info */}
              <div className="w-full px-8 absolute top-[10vh]">
                <motion.h3
                  className="text-2xl font-['Bebas_Neue'] text-[#404040] mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ 
                    opacity: 0, 
                    y: -20,
                    transition: { duration: 0.3, delay: 0.1 }
                  }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  Contactează-ne
                </motion.h3>
                
                <div className="flex flex-col space-y-4">
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ 
                      opacity: 0, 
                      y: 20,
                      transition: { duration: 0.3, delay: 0.1 }
                    }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <PhoneIcon />
                    <a href={`tel:${contactInfo.phone}`} className="text-[#404040] hover:text-[#8a7d65] transition-colors ml-3 text-sm">
                      {contactInfo.phone}
                    </a>
                  </motion.div>

                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ 
                      opacity: 0, 
                      y: 20,
                      transition: { duration: 0.3, delay: 0.15 }
                    }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <EmailIcon />
                    <a href={`mailto:${contactInfo.email}`} className="text-[#404040] hover:text-[#8a7d65] transition-colors ml-3 text-sm">
                      {contactInfo.email}
                    </a>
                  </motion.div>

                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ 
                      opacity: 0, 
                      y: 20,
                      transition: { duration: 0.3, delay: 0.2 }
                    }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <InstagramIcon />
                    <a href={`https://${contactInfo.instagram}`} target="_blank" rel="noopener noreferrer" className="text-[#404040] hover:text-[#8a7d65] transition-colors ml-3 text-sm">
                      {contactInfo.instagram}
                    </a>
                  </motion.div>

                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ 
                      opacity: 0, 
                      y: 20,
                      transition: { duration: 0.3, delay: 0.25 }
                    }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <FacebookIcon />
                    <a href={`https://${contactInfo.facebook}`} target="_blank" rel="noopener noreferrer" className="text-[#404040] hover:text-[#8a7d65] transition-colors ml-3 text-sm">
                      {contactInfo.facebook}
                    </a>
                  </motion.div>
                </div>
              </div>

              <div className="w-full p-8 pb-16 pt-[35vh]">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    className="overflow-hidden relative py-5"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ 
                      y: 50, 
                      opacity: 0,
                      transition: {
                        duration: 0.3,
                        delay: 0.05 * (navLinks.length - index - 1) // Reverse stagger on exit
                      }
                    }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.5 + (index * 0.1),
                      ease: [0.76, 0, 0.24, 1]
                    }}
                  >
                    {/* Line above ACASA */}
                    {index === 0 && (
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-[1px] bg-[#8a7d65]"
                        initial="hidden"
                        animate={isMenuOpen ? "visible" : "hidden"}
                        exit="hidden"
                        variants={mobileUnderlineVariants}
                        custom={index}
                      />
                    )}
                    
                    {/* Underline below each nav item */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#8a7d65]"
                      initial="hidden"
                      animate={isMenuOpen ? "visible" : "hidden"}
                      exit="hidden"
                      variants={mobileUnderlineVariants}
                      custom={index}
                    />
                    
                    <Link 
                      href={link.path}
                      className={`group flex items-baseline transition-colors ${
                        link.path === currentPath && !isHovering 
                          ? 'text-[#8a7d65]' 
                          : 'text-[#404040] hover:text-[#8a7d65]'
                      }`}
                      onClick={(e) => {
                        if (link.path === '/produse' && pathname !== '/produse') {
                          e.preventDefault();
                          setIsMenuOpen(false);
                          setShowCategoryOverlay(true);
                        } else {
                          setIsMenuOpen(false);
                        }
                      }}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <span className="text-sm font-mono mr-4 text-[#8a7d65] opacity-80 group-hover:opacity-100 transition-opacity">{link.index}</span>
                      <span className="text-4xl font-['Bebas_Neue'] tracking-tight leading-none">{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Overlay */}
      <CategoryOverlay 
        isOpen={showCategoryOverlay}
        onClose={() => setShowCategoryOverlay(false)}
        onSelectCategory={handleCategorySelect}
      />
    </>
  );
};

export default Navbar; 
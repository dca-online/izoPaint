'use client';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import BackgroundVideo from '@/components/BackgroundVideo';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  videoSrc: string;
  align?: 'left' | 'center' | 'right';
}

const PageHeader = ({ title, subtitle, videoSrc, align = 'center' }: PageHeaderProps) => {
  const pathname = usePathname();
  
  // Text alignment classes
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };
  
  // Check which page we're on to apply the appropriate overlay
  const isAboutPage = pathname === '/despre';
  const isPortfolioPage = pathname === '/portofoliu';
  const isContactPage = pathname === '/contact';
  const isServicesPage = pathname === '/servicii';
  const isProductsPage = pathname === '/produse';
  
  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      {/* Video Background using the BackgroundVideo component */}
      <div className="absolute inset-0 w-full h-full">
        <BackgroundVideo 
          videoSrc={videoSrc}
          verticalFlip={typeof window !== 'undefined' && window.innerWidth < 768}
        />
        
        {/* More pronounced whitening filter and bottom washout for specified pages */}
        {(isAboutPage || isPortfolioPage || isContactPage) && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#f8f8f6]/50 via-[#f8f8f6]/30 to-[#f8f8f6]" />
        )}
        {/* Bottom washout for services and products pages */}
        {(isServicesPage || isProductsPage) && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8f8f6]/20 to-[#f8f8f6]" />
        )}
      </div>
      
      {/* Content */}
      <div className={`relative z-10 container mx-auto px-4 h-full flex flex-col justify-center ${alignmentClasses[align]}`}>
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#404040] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            className="text-xl md:text-2xl text-[#8a7d65] max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
        )}
        
        {/* Decorative elements */}
        <motion.div 
          className="w-20 h-1 bg-[#8a7d65] mt-8"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 80 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="w-8 h-12 rounded-full border-2 border-[#8a7d65] flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            className="w-1 h-3 bg-[#8a7d65] rounded-full mt-2"
            animate={{ 
              y: [0, 6, 0],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader; 
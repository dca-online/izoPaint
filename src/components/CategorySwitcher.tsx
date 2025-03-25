'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

interface CategorySwitcherProps {
  currentCategory: string;
  onCategoryChange: (category: 'vopsele' | 'izolatii') => void;
}

const CategorySwitcher: React.FC<CategorySwitcherProps> = ({ currentCategory, onCategoryChange }) => {
  // Animate in on mount
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSwitchCategory = () => {
    const newCategory = currentCategory === 'vopsele' ? 'izolatii' : 'vopsele';
    onCategoryChange(newCategory);
  };

  return (
    <motion.div 
      className="inline-block"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={handleSwitchCategory}
        className="group flex items-center space-x-2 backdrop-blur-md bg-white/15 border border-white/25 px-4 py-2.5 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/25"
        style={{
          background: currentCategory === 'vopsele' 
            ? 'linear-gradient(135deg, rgba(138, 125, 101, 0.8), rgba(112, 101, 79, 0.95))' 
            : 'linear-gradient(135deg, rgba(64, 64, 64, 0.8), rgba(37, 37, 37, 0.95))'
        }}
      >
        <motion.div 
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.4 }}
          className="w-5 h-5 flex items-center justify-center"
        >
          {currentCategory === 'vopsele' ? (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-white" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-white" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h10a2 2 0 012 2v12a4 4 0 01-4 4H7z" />
              <rect x="12" y="3" width="4" height="6" rx="1" strokeLinecap="round" />
            </svg>
          )}
        </motion.div>
        <div className={`${spaceGrotesk.className} text-sm uppercase tracking-wider font-medium`}>
          {currentCategory === 'vopsele' ? 'Vezi IZOLAȚII' : 'Vezi VOPSELE'}
        </div>
        <motion.div 
          className="ml-1 w-3"
          initial={{ x: 0 }}
          animate={{ x: [0, 3, 0] }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity, 
            repeatType: "loop", 
            ease: "easeInOut",
            repeatDelay: 1
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3 w-3 text-white" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </motion.div>
      </button>
    </motion.div>
  );
};

export default CategorySwitcher; 
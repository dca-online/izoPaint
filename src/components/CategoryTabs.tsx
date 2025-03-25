'use client';
import React from 'react';
import { Space_Grotesk, Bebas_Neue } from 'next/font/google';
import Link from 'next/link';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

// Add Bebas Neue font
const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

interface CategoryTabsProps {
  currentCategory: string;
  onCategoryChange: (category: 'vopsele' | 'izolatii') => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ currentCategory, onCategoryChange }) => {
  const handleCategoryClick = (category: 'vopsele' | 'izolatii', e: React.MouseEvent) => {
    e.preventDefault();
    
    if (currentCategory === category) {
      // Already on this category, do nothing
      return;
    }
    
    // Change the category
    onCategoryChange(category);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
      <div className="flex w-full">
        {/* VOPSELE Tab */}
        <div 
          className={`flex-1 cursor-pointer transition-all duration-300 ${
            currentCategory === 'vopsele' 
              ? 'bg-[#8a7d65] text-white' 
              : 'bg-gray-100 text-[#404040] hover:bg-gray-200'
          }`}
          onClick={(e) => handleCategoryClick('vopsele', e)}
        >
          <div className="py-6 px-8 flex items-center justify-center space-x-5">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              currentCategory === 'vopsele'
                ? 'bg-white/20' 
                : 'bg-gradient-to-br from-[#a39178] to-[#70654f]'
            }`}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-6 w-6 ${currentCategory === 'vopsele' ? 'text-white' : 'text-white'}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h10a2 2 0 012 2v12a4 4 0 01-4 4H7z" />
                <rect x="12" y="3" width="4" height="6" rx="1" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-center">
              <p className={`${bebasNeue.className} text-2xl tracking-wide`}>VOPSELE</p>
              <p className={`${spaceGrotesk.className} text-sm opacity-90`}>și produse decorative</p>
            </div>
          </div>
        </div>
        
        {/* IZOLATII Tab */}
        <div 
          className={`flex-1 cursor-pointer transition-all duration-300 ${
            currentCategory === 'izolatii' 
              ? 'bg-[#8a7d65] text-white' 
              : 'bg-gray-100 text-[#404040] hover:bg-gray-200'
          }`}
          onClick={(e) => handleCategoryClick('izolatii', e)}
        >
          <div className="py-6 px-8 flex items-center justify-center space-x-5">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              currentCategory === 'izolatii'
                ? 'bg-white/20' 
                : 'bg-gradient-to-br from-[#404040] to-[#252525]'
            }`}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-6 w-6 ${currentCategory === 'izolatii' ? 'text-white' : 'text-white'}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="text-center">
              <p className={`${bebasNeue.className} text-2xl tracking-wide`}>IZOLAȚII</p>
              <p className={`${spaceGrotesk.className} text-sm opacity-90`}>termice și fonice</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs; 
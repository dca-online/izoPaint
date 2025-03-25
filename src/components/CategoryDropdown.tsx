'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Space_Grotesk, Bebas_Neue } from 'next/font/google';
import { createPortal } from 'react-dom';

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

interface CategoryDropdownProps {
  currentCategory: string;
  onCategoryChange: (category: 'vopsele' | 'izolatii') => void;
}

const CategoryDropdown = ({ currentCategory, onCategoryChange }: CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side mounting for the portal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle clicks outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle category selection
  const handleSelectCategory = (category: 'VOPSELE' | 'IZOLAȚII', event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(`Category selected from dropdown: ${category}`);
    
    try {
      // First update local state
      setIsOpen(false);
      
      // Map the category to lowercase for API/URL consistency
      const categoryParam = category === 'VOPSELE' ? 'vopsele' : 'izolatii';
      
      if (onCategoryChange) {
        onCategoryChange(categoryParam);
      }
      
      // Use the same approach as CategoryOverlay - force a full navigation
      // to ensure all components properly reload
      const params = new URLSearchParams();
      params.set('categorie', categoryParam);
      
      const url = `/produse?${params.toString()}`;
      console.log(`Navigating to: ${url}`);
      
      // Full page navigation to ensure proper reinitialization
      window.location.href = url;
    } catch (error) {
      console.error('Error in CategoryDropdown handleSelectCategory:', error);
    }
  };

  // Calculate position for the dropdown
  const getDropdownPosition = () => {
    if (!dropdownRef.current) return { top: 0, left: 0 };
    
    const rect = dropdownRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    };
  };

  return (
    <div className="inline-block relative" ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-3 bg-[#8a7d65] text-white rounded-full text-lg font-medium hover:bg-[#8a7d65]/80 transition-colors flex items-center relative z-10"
      >
        <span>
          {currentCategory === 'vopsele' ? 'VOPSELE' : 
           currentCategory === 'izolatii' ? 'IZOLAȚII' : 
           'Schimbă categoria'}
        </span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown Content */}
      {isMounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[9999]" onClick={() => setIsOpen(false)}>
          <div 
            className="absolute overflow-hidden rounded-xl shadow-lg border border-[#8a7d65]/20 min-w-[240px] bg-white"
            style={{
              top: `${getDropdownPosition().top}px`,
              left: `${getDropdownPosition().left}px`,
              zIndex: 10000,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white divide-y divide-gray-100">
              {/* VOPSELE Option */}
              <div 
                className={`block w-full px-4 py-4 hover:bg-[#f8f8f6] transition-colors text-left cursor-pointer ${
                  currentCategory === 'vopsele' ? 'bg-[#f8f8f6]' : ''
                }`}
                onClick={(e) => handleSelectCategory('VOPSELE', e)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a39178] to-[#70654f] flex items-center justify-center shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h10a2 2 0 012 2v12a4 4 0 01-4 4H7z" />
                      <rect x="12" y="3" width="4" height="6" rx="1" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className={`${bebasNeue.className} text-[#404040] text-xl md:text-2xl tracking-wide`}>VOPSELE</p>
                    <p className={`${spaceGrotesk.className} text-[#696969] text-sm`}>și produse decorative</p>
                  </div>
                  {currentCategory === 'vopsele' && (
                    <div className="ml-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#8a7d65]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* IZOLAȚII Option */}
              <div 
                className={`block w-full px-4 py-4 hover:bg-[#f8f8f6] transition-colors text-left cursor-pointer ${
                  currentCategory === 'izolatii' ? 'bg-[#f8f8f6]' : ''
                }`}
                onClick={(e) => handleSelectCategory('IZOLAȚII', e)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#404040] to-[#252525] flex items-center justify-center shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className={`${bebasNeue.className} text-[#404040] text-xl md:text-2xl tracking-wide`}>IZOLAȚII</p>
                    <p className={`${spaceGrotesk.className} text-[#696969] text-sm`}>termice și fonice</p>
                  </div>
                  {currentCategory === 'izolatii' && (
                    <div className="ml-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#8a7d65]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default CategoryDropdown; 
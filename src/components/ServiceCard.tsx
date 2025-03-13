'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import ErrorFallbackImage from './ErrorFallbackImage';

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
  index: number;
  type: 'vopsele' | 'izolații';
}

const ServiceCard = ({
  title,
  description,
  imageSrc,
  link,
  index,
  type
}: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, {
    once: false,
    amount: 0.3
  });
  
  // Colors for different card types - significantly increased opacity values
  const bgGradient = type === 'vopsele' 
    ? 'linear-gradient(135deg, rgba(138, 125, 101, 0.7) 0%, rgba(138, 125, 101, 0.6) 100%)' 
    : 'linear-gradient(135deg, rgba(105, 105, 105, 0.7) 0%, rgba(105, 105, 105, 0.6) 100%)';
  const glowColor = type === 'vopsele' ? 'rgba(138, 125, 101, 0.4)' : 'rgba(105, 105, 105, 0.4)';
  const borderColor = type === 'vopsele' ? 'rgba(138, 125, 101, 0.6)' : 'rgba(105, 105, 105, 0.6)';
  const categoryColor = type === 'vopsele' ? '#8a7d65' : '#696969';
  const cardBgColor = type === 'vopsele' ? 'rgba(138, 125, 101, 0.35)' : 'rgba(105, 105, 105, 0.35)';

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-full aspect-square"
    >
      {/* Background color layer - always visible with high opacity */}
      <div 
        className="absolute inset-0 rounded-2xl"
        style={{ background: bgGradient }}
      ></div>
      
      {/* Image layer (if available) - with increased opacity */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <ErrorFallbackImage 
          src={imageSrc}
          alt={title}
          fill
          className="object-cover opacity-50 rounded-2xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Glassmorphic effect - main card body with higher opacity */}
      <div 
        className="absolute inset-0 rounded-2xl backdrop-blur-[8px] transition-all duration-300 group-hover:backdrop-blur-xl"
        style={{
          background: `rgba(255, 255, 255, 0.25)`,
          backgroundColor: cardBgColor,
          boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.25), inset 0 0 0 1px ${borderColor}`,
          border: `1px solid rgba(255, 255, 255, 0.35)`,
        }}
      >
        {/* Inner glow with high opacity */}
        <div 
          className="absolute inset-[1px] rounded-[14px] opacity-70"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${glowColor}, transparent 70%)`,
          }}
        />
        
        {/* Top light reflection - enhanced for better visibility */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/40 rounded-t-2xl" />
        
        {/* Content container with darker overlay for better text contrast */}
        <div className="relative z-10 h-full p-6 flex flex-col justify-end">
          <div className="mb-auto">
            <span 
              className="inline-block px-3 py-1 text-xs font-mono mb-3 rounded-full font-medium"
              style={{ 
                backgroundColor: `${categoryColor}60`,
                color: type === 'vopsele' ? '#ffffff' : '#ffffff',
                backdropFilter: 'blur(4px)',
                border: `1px solid ${categoryColor}70`
              }}
            >
              {type === 'vopsele' ? 'VOPSELE MODERNE' : 'IZOLAȚII ECO-FRIENDLY'}
            </span>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-3 text-white">
              {title}
            </h3>
            <p className="mb-6 text-sm text-white">
              {description}
            </p>
            
            <Link 
              href={link}
              className="inline-flex items-center group/link"
            >
              <span className="mr-2 text-white group-hover/link:text-white/90 transition-colors font-medium">Află mai multe</span>
              <span 
                className="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 group-hover/link:bg-white/60"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  border: `1px solid rgba(255, 255, 255, 0.5)`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M1 6H11M11 6L6 1M11 6L6 11"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
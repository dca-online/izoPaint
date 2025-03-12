'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

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
  
  const [imageError, setImageError] = useState(false);
  
  const bgColor = type === 'vopsele' ? 'rgba(138, 125, 101, 0.2)' : 'rgba(105, 105, 105, 0.2)';
  const textColor = type === 'vopsele' ? '#f8f8f6' : '#f8f8f6';
  const borderColor = type === 'vopsele' ? 'rgba(195, 190, 180, 0.15)' : 'rgba(163, 163, 163, 0.15)';
  const accentColor = type === 'vopsele' ? '#8a7d65' : '#696969';
  
  return (
    <motion.div 
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden aspect-square shadow-sm"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="absolute inset-0 w-full h-full">
        {imageError ? (
          <div 
            className="w-full h-full flex items-center justify-center text-center p-4"
            style={{ backgroundColor: accentColor, color: textColor }}
          >
            <div>
              <div className="text-xl font-bold mb-2">{title}</div>
              <div className="text-sm opacity-80">Imaginea nu este disponibilă încă</div>
            </div>
          </div>
        ) : (
          <>
            <Image 
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transform transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
            <div 
              className="absolute inset-0 transition-opacity duration-300 hover:opacity-60"
              style={{ 
                backgroundColor: bgColor,
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)',
                borderTop: `1px solid ${borderColor}`,
                borderLeft: `1px solid ${borderColor}`,
                borderRight: `1px solid rgba(0, 0, 0, 0.05)`,
                borderBottom: `1px solid rgba(0, 0, 0, 0.05)`,
                boxShadow: `
                  inset 0 1px 1px rgba(255, 255, 255, 0.1),
                  0 10px 20px rgba(0, 0, 0, 0.1),
                  0 6px 6px rgba(0, 0, 0, 0.1)
                `
              }}
            />
          </>
        )}
      </div>
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
        <div>
          <span 
            className="text-xs font-mono mb-2 block"
            style={{ color: '#ffffff' }}
          >
            {type === 'vopsele' ? 'VOPSELE MODERNE' : 'IZOLAȚII ECO-FRIENDLY'}
          </span>
          <h3 
            className="text-2xl font-bold mb-3"
            style={{ color: textColor }}
          >
            {title}
          </h3>
          <p 
            className="mb-6 text-sm"
            style={{ color: `${textColor}CC` }}
          >
            {description}
          </p>
        </div>
        
        <Link 
          href={link}
          className="inline-flex items-center group"
          style={{ color: textColor }}
        >
          <span className="mr-2">Află mai multe</span>
          <span 
            className="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-white/30"
            style={{ 
              border: `1px solid ${borderColor}`,
              backdropFilter: 'blur(4px)'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M1 6H11M11 6L6 1M11 6L6 11"
                stroke={textColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
'use client';
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  accent?: 'gold' | 'light' | 'none';
  className?: string;
  delay?: number;
}

const GlassCard = ({ children, accent = 'none', className = '', delay = 0 }: GlassCardProps) => {
  // The secret sauce for our beautiful glass cards with different moods
  const accentStyles = {
    gold: {
      border: 'border-[#8a7d65]/40',
      glow: 'before:bg-[#8a7d65]',
      shadow: 'shadow-[0_0_15px_rgba(138,125,101,0.15)]'
    },
    light: {
      border: 'border-[#c3beb4]/30',
      glow: 'before:bg-[#c3beb4]',
      shadow: 'shadow-[0_0_15px_rgba(195,190,180,0.1)]'
    },
    none: {
      border: 'border-[#e6e5e3]',
      glow: '',
      shadow: 'shadow-[0_8px_32px_rgba(0,0,0,0.05)]'
    }
  };

  const selectedStyle = accentStyles[accent];

  return (
    <motion.div 
      className={`relative rounded-xl backdrop-blur-lg bg-white/90 border ${selectedStyle.border} ${selectedStyle.shadow} ${selectedStyle.glow} p-6 md:p-8 overflow-hidden before:absolute before:w-1/2 before:h-1/2 before:blur-3xl before:opacity-10 before:-z-10 before:rounded-full before:top-0 before:left-1/4 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      {/* Those subtle glowy edges that make it feel like glass catching light */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#696969]/10 to-transparent"></div>
      <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-[#696969]/10 via-transparent to-transparent"></div>
      
      {/* Where the magic happens - all the actual content goes here */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard; 
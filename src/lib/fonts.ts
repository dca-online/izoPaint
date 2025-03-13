import { Inter, Bebas_Neue } from 'next/font/google';

// Configure Inter font for body text
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

// Configure Bebas Neue font for headers
export const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas-neue',
  preload: true,
});

// Font CSS variables for easy usage
export const fontVariables = {
  inter: 'var(--font-inter)',
  bebasNeue: 'var(--font-bebas-neue)',
}; 
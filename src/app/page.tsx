'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ServiceCard from '@/components/ServiceCard';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import VideoHeader from '@/components/VideoHeader';
import BackgroundVideo from '@/components/BackgroundVideo';
import HomeServiceScroller from '@/components/HomeServiceScroller';

// Our showcase of beautiful paint and insulation services
const paintServices = [
  {
    title: 'Vopsele decorative premium',
    description: 'Transformă-ți spațiul cu vopsele decorative de înaltă calitate, cu efecte unice și finisaje elegante.',
    icon: '/icons/paint.svg',
    link: '/servicii',
    imageSrc: '/images/product-placeholder.svg'
  },
  {
    title: 'Vopsele ecologice',
    description: 'Soluții eco-friendly pentru interior, fără compuși organici volatili, ideale pentru dormitoare și camere de copii.',
    icon: '/icons/eco.svg',
    link: '/servicii',
    imageSrc: '/images/product-placeholder.svg'
  },
  {
    title: 'Finisaje speciale',
    description: 'Efecte decorative premium care adaugă textură, strălucire și personalitate oricărui perete.',
    icon: '/icons/quality.svg',
    link: '/servicii',
    imageSrc: '/images/product-placeholder.svg'
  }
];

const insulationServices = [
  {
    title: 'Izolație termică exterioară',
    description: 'Sisteme complete de izolație termică pentru fațade, care reduc semnificativ pierderile de căldură.',
    icon: '/icons/thermal.svg',
    link: '/servicii#izolatie',
    imageSrc: '/images/service-placeholder.svg'
  },
  {
    title: 'Izolație fonică',
    description: 'Soluții profesionale pentru reducerea zgomotului și îmbunătățirea confortului acustic în orice spațiu.',
    icon: '/icons/eco.svg',
    link: '/servicii#izolatie',
    imageSrc: '/images/service-placeholder.svg'
  },
  {
    title: 'Hidroizolații',
    description: 'Sisteme de impermeabilizare pentru protecția clădirilor împotriva infiltrațiilor și umezelii.',
    icon: '/icons/warranty.svg',
    link: '/servicii#izolatie',
    imageSrc: '/images/service-placeholder.svg'
  }
];

export default function Home() {
  return (
    <SmoothScrollProvider>
      <BackgroundVideo 
        videoSrc="/videos/paint.mp4" 
        verticalFlip={typeof window !== 'undefined' && window.innerWidth < 768} // Mobile screens get a cooler vertical flip effect
      />
      
      <main className="min-h-screen relative z-10 bg-transparent">
        <Navbar />
        <VideoHeader />
        
        {/* Where we showcase our amazing services */}
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-transparent">
          <div className="container mx-auto">
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Desktop version */}
              <h2 className="hidden md:block text-4xl md:text-6xl font-bold text-[#404040] max-w-5xl text-left mb-2">
                Vopsele moderne & Izolații eco-friendly
              </h2>
              
              {/* Mobile version - stacked with gold ampersand */}
              <div className="flex md:hidden items-start mb-2">
                <div className="flex flex-col">
                  <h2 className="text-3xl font-bold text-[#404040] leading-tight">
                    Vopsele moderne
                  </h2>
                  <h2 className="text-3xl font-bold text-[#404040] leading-tight">
                    Izolații eco-friendly
                  </h2>
                </div>
                <span className="text-8xl font-['Bebas_Neue'] text-[#8a7d65] ml-3 flex items-center justify-center" style={{ height: '90%', alignSelf: 'stretch', lineHeight: '0.8', marginTop: '-1px' }}>&</span>
              </div>
              
              {/* Mobile text aligned with heading */}
              <div className="md:hidden">
                <p className="text-lg text-[#1A1A1A] max-w-2xl mb-4">
                  Oferim soluții complete pentru transformarea spațiilor, de la vopsele decorative premium la sisteme de izolație eco-friendly.
                </p>
              </div>
              
              {/* Desktop text aligned left with heading */}
              <p className="hidden md:block text-lg text-[#1A1A1A] max-w-2xl text-left">
                Oferim soluții complete pentru transformarea spațiilor, de la vopsele decorative premium la sisteme de izolație eco-friendly.
              </p>
            </motion.div>
            
            {/* Our premium paint options - where color meets creativity */}
            <HomeServiceScroller 
              services={paintServices}
              categoryType="vopsele"
              title="Vopsele Moderne"
            />
            
            {/* Our eco-friendly insulation solutions - comfort meets sustainability */}
            <HomeServiceScroller 
              services={insulationServices}
              categoryType="izolatii"
              title="Izolații Eco-Friendly"
            />
          </div>
        </section>
        
        {/* The gentle nudge that turns visitors into clients */}
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-[#8a7d65] blur-3xl" />
            <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-[#c3beb4] blur-3xl" />
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#404040] mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Transformă-ți Spațiul cu Experții Noștri
              </motion.h2>
              <motion.p 
                className="text-lg text-[#1A1A1A] mb-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Fie că dorești să renovezi un singur perete sau o clădire întreagă, echipa noastră de profesioniști este pregătită să-ți ofere soluții personalizate pentru nevoile tale.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <button className="px-8 py-4 bg-[#8a7d65] text-white rounded-full text-lg font-medium hover:bg-[#8a7d65]/80 transition-colors">
                  Solicită o Ofertă Gratuită
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-[#404040] text-[#404040] rounded-full text-lg font-medium hover:bg-[#404040]/10 transition-colors">
                  Contactează-ne
                </button>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our stylish footer area */}
        <footer className="py-12 px-4 md:px-8 lg:px-16 bg-transparent relative z-10">
          <div className="absolute inset-0 bg-[#f8f8f6]/80 backdrop-blur-xl border-t border-[#e6e5e3] z-0"
            style={{
              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)'
            }}
          ></div>
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold text-[#404040] mb-2">
                  <span className="text-[#8a7d65]">Vopsele</span> & <span className="text-[#696969]">Izolații</span>
                </h3>
                <p className="text-[#1A1A1A] text-sm">
                  Soluții complete pentru spații moderne
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                <a href="#" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                  Acasă
                </a>
                <a href="#" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                  Servicii
                </a>
                <a href="#" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                  Portofoliu
                </a>
                <a href="#" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                  Despre Noi
                </a>
                <a href="#" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                  Contact
                </a>
              </div>
            </div>
            <div className="text-center mt-8 text-sm text-[#696969]">
              © 2025 Vopsele & Izolații. Toate drepturile rezervate.
            </div>
          </div>
        </footer>
      </main>
    </SmoothScrollProvider>
  );
}

'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import GlassCard from '@/components/GlassCard';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Link from 'next/link';
import VideoHeader from '@/components/VideoHeader';
import BackgroundVideo from '@/components/BackgroundVideo';

// Our showcase of beautiful paint and insulation services
const paintServices = [
  {
    title: 'Vopsele decorative premium',
    description: 'Transformă-ți spațiul cu vopsele decorative de înaltă calitate, cu efecte unice și finisaje elegante.',
    icon: '/icons/paint.svg',
    link: '/servicii',
    image: '/images/paint-service-1.jpg'
  },
  {
    title: 'Vopsele ecologice',
    description: 'Soluții eco-friendly pentru interior, fără compuși organici volatili, ideale pentru dormitoare și camere de copii.',
    icon: '/icons/eco.svg',
    link: '/servicii',
    image: '/images/paint-service-2.jpg'
  },
  {
    title: 'Finisaje speciale',
    description: 'Efecte decorative premium care adaugă textură, strălucire și personalitate oricărui perete.',
    icon: '/icons/quality.svg',
    link: '/servicii',
    image: '/images/paint-service-3.jpg'
  }
];

const insulationServices = [
  {
    title: 'Izolație termică exterioară',
    description: 'Sisteme complete de izolație termică pentru fațade, care reduc semnificativ pierderile de căldură.',
    icon: '/icons/thermal.svg',
    link: '/servicii#izolatie',
    image: '/images/insulation-service-1.jpg'
  },
  {
    title: 'Izolație fonică',
    description: 'Soluții profesionale pentru reducerea zgomotului și îmbunătățirea confortului acustic în orice spațiu.',
    icon: '/icons/eco.svg',
    link: '/servicii#izolatie',
    image: '/images/insulation-service-2.jpg'
  },
  {
    title: 'Hidroizolații',
    description: 'Sisteme de impermeabilizare pentru protecția clădirilor împotriva infiltrațiilor și umezelii.',
    icon: '/icons/warranty.svg',
    link: '/servicii#izolatie',
    image: '/images/insulation-service-3.jpg'
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
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-[#404040] max-w-5xl text-left mb-6">
                Vopsele moderne & Izolații eco-friendly
              </h2>
              <p className="text-lg text-[#1A1A1A] max-w-2xl mx-auto">
                Oferim soluții complete pentru transformarea spațiilor, de la vopsele decorative premium la sisteme de izolație eco-friendly.
              </p>
            </motion.div>
            
            {/* Our premium paint options - where color meets creativity */}
            <div className="mb-16">
              <motion.h3 
                className="text-2xl font-bold text-[#8a7d65] mb-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Vopsele Moderne
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paintServices.map((service, index) => (
                  <ServiceCard
                    key={service.title}
                    title={service.title}
                    description={service.description}
                    imageSrc={service.image}
                    link={service.link}
                    index={index}
                    type="vopsele"
                  />
                ))}
              </div>
            </div>
            
            {/* Our eco-friendly insulation solutions - comfort meets sustainability */}
            <div>
              <motion.h3 
                className="text-2xl font-bold text-[#696969] mb-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Izolații Eco-Friendly
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {insulationServices.map((service, index) => (
                  <ServiceCard
                    key={service.title}
                    title={service.title}
                    description={service.description}
                    imageSrc={service.image}
                    link={service.link}
                    index={index}
                    type="izolații"
                  />
                ))}
              </div>
            </div>
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
        <footer className="py-12 px-4 md:px-8 lg:px-16 bg-transparent border-t border-[#e6e5e3]">
          <div className="container mx-auto">
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
            
            <div className="mt-8 pt-8 border-t border-[#e6e5e3] flex flex-col md:flex-row justify-between items-center">
              <p className="text-[#1A1A1A] text-sm mb-4 md:mb-0">
                © 2025 Vopsele & Izolații. Toate drepturile rezervate.
              </p>
              
              <div className="flex space-x-4">
                <a href="#" className="text-[#1A1A1A] hover:text-[#404040] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-[#1A1A1A] hover:text-[#404040] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </SmoothScrollProvider>
  );
}

'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// Remove unused PageHeader import
import GlassCard from '@/components/GlassCard';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Link from 'next/link';
import BackgroundVideo from '@/components/BackgroundVideo';
import ErrorFallbackImage from '@/components/ErrorFallbackImage';

// Project data with categories
const projects = [
  {
    id: 1,
    title: 'Apartament Modern',
    description: 'Renovare completă cu vopsele decorative premium și izolație fonică',
    category: 'interior',
    image: '/images/project-1.jpg',
    tags: ['Vopsele decorative', 'Izolație fonică']
  },
  {
    id: 2,
    title: 'Fațadă Residențială',
    description: 'Izolație termică exterioară și finisaje decorative pentru fațadă',
    category: 'exterior',
    image: '/images/project-2.jpg',
    tags: ['Izolație termică', 'Finisaje fațadă']
  },
  {
    id: 3,
    title: 'Spațiu Comercial',
    description: 'Design interior cu accente decorative pentru un spațiu comercial modern',
    category: 'comercial',
    image: '/images/project-3.jpg',
    tags: ['Vopsele ecologice', 'Design interior']
  },
  {
    id: 4,
    title: 'Proiect Rezidențial',
    description: 'Sistem complet de izolație și finisaje pentru un complex rezidențial',
    category: 'exterior',
    image: '/images/project-4.jpg',
    tags: ['Termoizolație', 'Hidroizolație']
  },
  {
    id: 5,
    title: 'Living Modern',
    description: 'Renovare living cu finisaje de lux și efecte decorative speciale',
    category: 'interior',
    image: '/images/project-5.jpg',
    tags: ['Finisaje speciale', 'Design interior']
  },
  {
    id: 6,
    title: 'Birou Corporativ',
    description: 'Soluții complete de finisaje și izolație fonică pentru un spațiu de birouri',
    category: 'comercial',
    image: '/images/project-6.jpg',
    tags: ['Izolație fonică', 'Vopsele ecologice']
  },
  {
    id: 7,
    title: 'Vila Contemporană',
    description: 'Proiect complet pentru o vilă contemporană, interior și exterior',
    category: 'exterior',
    image: '/images/project-7.jpg',
    tags: ['Izolație termică', 'Vopsele premium']
  },
  {
    id: 8,
    title: 'Baie Minimalistă',
    description: 'Renovare baie cu materiale impermeabile și finisaje moderne',
    category: 'interior',
    image: '/images/project-8.jpg',
    tags: ['Hidroizolație', 'Finisaje speciale']
  },
];

// Portfolio categories
const categories = [
  { id: 'all', label: 'Toate Proiectele' },
  { id: 'interior', label: 'Interior' },
  { id: 'exterior', label: 'Exterior' },
  { id: 'comercial', label: 'Comercial' },
];

// Custom PageHeader wrapper with background video
const PortfolioPageHeader = () => {
  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <BackgroundVideo 
          videoSrc="/videos/paint.mp4" 
          verticalFlip={true}
          horizontalFlip={false}
        />
        {/* Adding bottom washout effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f8f6]/70 via-[#f8f8f6]/50 to-[#f8f8f6]" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#404040] mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Portofoliu
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-[#8a7d65] max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Proiecte care inspiră și transformă spații
        </motion.p>
        
        {/* Decorative accent line */}
        <motion.div 
          className="w-20 h-1 bg-[#8a7d65] mt-8"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 80 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </div>
      
      {/* Mouse scroll indicator */}
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
    </div>
  );
};

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-[#f8f8f6] overflow-hidden">
        <Navbar />
        <PortfolioPageHeader />
        
        {/* Content Background Overlay */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#f8f8f6] opacity-90 z-0"></div>
          
          {/* Portfolio Filter */}
          <section className="py-16 px-4 relative z-10">
            <div className="container mx-auto">
              <div className="flex flex-wrap justify-center mb-12 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-[#8a7d65] text-white'
                        : 'bg-[#f0efed] text-[#404040] hover:bg-[#e6e5e3]'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              
              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence mode="wait">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      layout
                    >
                      <GlassCard 
                        className="h-full flex flex-col" 
                        accent={index % 2 === 0 ? 'gold' : 'light'}
                      >
                        {/* Project Image */}
                        <div 
                          className="aspect-[16/9] w-full relative overflow-hidden rounded-lg mb-4 cursor-pointer"
                          onClick={() => setSelectedProject(project.id)}
                        >
                          <div className="absolute inset-0 w-full h-full bg-[#f5f5f5]">
                            <ErrorFallbackImage 
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-700 hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          </div>
                          
                          {/* Category Tag */}
                          <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium capitalize" 
                            style={{
                              backgroundColor: project.category === 'interior' 
                                ? 'rgba(138, 125, 101, 0.8)' 
                                : project.category === 'exterior'
                                  ? 'rgba(105, 105, 105, 0.8)'
                                  : 'rgba(90, 90, 90, 0.8)',
                              color: 'white',
                              backdropFilter: 'blur(4px)'
                            }}
                          >
                            {project.category}
                          </div>
                        </div>
                        
                        {/* Project info */}
                        <div className="flex flex-col flex-grow">
                          <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{project.title}</h3>
                          <p className="text-[#696969] mb-4 flex-grow">{project.description}</p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="inline-block px-3 py-1 bg-[#f0efed] text-[#696969] rounded-full text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          {/* View Button */}
                          <button 
                            onClick={() => setSelectedProject(project.id)}
                            className="mt-4 inline-flex items-center text-[#8a7d65] hover:text-[#8a7d65]/80 transition-colors group"
                          >
                            <span className="mr-2">Vezi detalii</span>
                            <span className="w-6 h-6 rounded-full flex items-center justify-center border border-[#8a7d65] transition-colors group-hover:bg-[#8a7d65]/10">
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              {/* Empty state when no projects match filter */}
              {filteredProjects.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-[#696969] text-lg">Niciun proiect găsit în această categorie.</p>
                </div>
              )}
            </div>
          </section>
          
          {/* Call to Action - Using glassmorphic card */}
          <section className="py-16 px-4 relative z-10">
            <div className="container mx-auto max-w-5xl">
              <GlassCard accent="gold" className="p-8 md:p-12">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#404040] mb-6">
                    Pregătiți pentru următorul proiect?
                  </h2>
                  <p className="text-lg text-[#696969] mb-8 max-w-2xl mx-auto">
                    Contactați-ne pentru a discuta despre proiectul dumneavoastră și pentru a afla cum vă putem ajuta să creați spații excepționale.
                  </p>
                  <Link 
                    href="/contact"
                    className="inline-block px-8 py-4 bg-[#8a7d65] text-white rounded-full text-lg font-medium hover:bg-[#8a7d65]/80 transition-colors"
                  >
                    Contactați-ne acum
                  </Link>
                </div>
              </GlassCard>
            </div>
          </section>
          
          <Footer />
        </div>
        
        {/* Modal for project details */}
        <AnimatePresence>
          {selectedProject !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#f8f8f6]/90 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25 }}
                className="relative max-w-4xl w-full bg-white/80 backdrop-blur-xl rounded-xl overflow-hidden border border-[#e6e5e3]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Selected project content */}
                {(() => {
                  const project = projects.find(p => p.id === selectedProject);
                  if (!project) return null;
                  
                  return (
                    <>
                      <div className="relative aspect-video">
                        <ErrorFallbackImage 
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1536px) 100vw, 1536px"
                        />
                      </div>
                      <div className="p-6 md:p-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">{project.title}</h2>
                        <p className="text-[#404040] mb-6">{project.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold text-[#8a7d65] mb-3">Detalii Proiect</h3>
                            <ul className="space-y-2 text-[#404040]">
                              <li>Categorie: {project.category === 'interior' ? 'Interior' : project.category === 'exterior' ? 'Exterior' : 'Comercial'}</li>
                              <li>Locație: Suceava, România</li>
                              <li>Durată: 3 săptămâni</li>
                              <li>An: 2023</li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-[#8a7d65] mb-3">Servicii</h3>
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag) => (
                                <span 
                                  key={tag} 
                                  className="text-sm py-1 px-4 rounded-full bg-[#8a7d65]/20 text-[#404040]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#e6e5e3] flex items-center justify-center text-[#404040] hover:bg-[#c3beb4] transition-colors"
                        onClick={() => setSelectedProject(null)}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </SmoothScrollProvider>
  );
};

export default PortfolioPage; 
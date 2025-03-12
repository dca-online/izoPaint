'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Image from 'next/image';

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

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-[#1A1A1A] overflow-hidden">
        <Navbar />
        
        <PageHeader 
          title="Portofoliul Nostru"
          subtitle="Proiecte de Excepție Realizate cu Pasiune"
          videoSrc="/videos/cherryPut.mp4"
        />
        
        {/* Portfolio Filter */}
        <section className="py-16 px-4 relative">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center mb-12 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-[#B99C4B] text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    layout
                    className="group"
                  >
                    <div 
                      className="aspect-[4/3] relative overflow-hidden rounded-xl cursor-pointer"
                      onClick={() => setSelectedProject(project.id)}
                    >
                      {/* Project Image or Fallback */}
                      <div className="absolute inset-0 w-full h-full bg-[#333]">
                        <Image 
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={(e) => {
                            // Fallback for image errors
                            e.currentTarget.style.opacity = '0';
                          }}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />
                      </div>
                      
                      {/* Project Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-white/80 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="text-xs py-1 px-3 rounded-full bg-[#B99C4B]/30 text-[#F0E4B2] backdrop-blur-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Empty state when no projects match filter */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-white/60 text-lg">Niciun proiect în această categorie momentan.</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Portfolio Modal */}
        <AnimatePresence>
          {selectedProject !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/90 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25 }}
                className="relative max-w-4xl w-full bg-[#1A1A1A]/80 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Selected project content */}
                {(() => {
                  const project = projects.find(p => p.id === selectedProject);
                  if (!project) return null;
                  
                  return (
                    <>
                      <div className="relative aspect-video">
                        <Image 
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1536px) 100vw, 1536px"
                          onError={(e) => {
                            // Fallback for image errors
                            e.currentTarget.style.opacity = '0';
                          }}
                        />
                      </div>
                      <div className="p-6 md:p-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h2>
                        <p className="text-white/80 mb-6">{project.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold text-[#B99C4B] mb-3">Detalii Proiect</h3>
                            <ul className="space-y-2 text-white/70">
                              <li>Categorie: {project.category === 'interior' ? 'Interior' : project.category === 'exterior' ? 'Exterior' : 'Comercial'}</li>
                              <li>Locație: Suceava, România</li>
                              <li>Durată: 3 săptămâni</li>
                              <li>An: 2023</li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-[#B99C4B] mb-3">Servicii</h3>
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag) => (
                                <span 
                                  key={tag} 
                                  className="text-sm py-1 px-4 rounded-full bg-[#B99C4B]/20 text-[#F0E4B2]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
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
        
        {/* Call to Action */}
        <section className="py-16 px-4 bg-[#333333] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <video 
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              src="/videos/paintbrush.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-transparent to-[#1A1A1A]/70"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <GlassCard className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ai un Proiect Similar în Minte?</h2>
              <p className="text-white/80 mb-8">
                Fie că este vorba de o renovare completă sau de îmbunătățirea unui spațiu existent, suntem pregătiți să transformăm ideile tale în realitate.
              </p>
              <button className="px-8 py-3 bg-[#B99C4B] text-white rounded-full text-lg font-medium hover:bg-[#B99C4B]/80 transition-colors">
                Discută cu Experții Noștri
              </button>
            </GlassCard>
          </div>
        </section>
        
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
};

export default PortfolioPage; 
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Image from 'next/image';
import Link from 'next/link';
import BackgroundVideo from '@/components/BackgroundVideo';

// Service data
const paintServices = [
  {
    title: 'Vopsele decorative',
    description: 'Transformă-ți interiorul cu vopsele decorative moderne ce oferă texturi și finisaje unice pentru orice spațiu.',
    icon: '/icons/paint.svg',
    features: [
      'Vopsele cu efect mătase',
      'Vopsele cu efect metalic',
      'Vopsele cu efect rustic',
      'Tencuieli decorative',
      'Finisaje personalizate',
    ],
    image: '/images/paint-service-1.jpg',
  },
  {
    title: 'Vopsele ecologice',
    description: 'Soluții de vopsire prietenoase cu mediul, fără compuși organici volatili, ideale pentru dormitoare și camere de copii.',
    icon: '/icons/eco.svg',
    features: [
      'Vopsele pe bază de apă',
      'Fără mirosuri puternice',
      'Hipoalergenice',
      'Lavabile și durabile',
      'Gamă variată de culori',
    ],
    image: '/images/paint-service-2.jpg',
  },
  {
    title: 'Finisaje speciale',
    description: 'Finisaje decorative premium pentru un ambient elegant, de la efecte vintage la ultramoderne.',
    icon: '/icons/quality.svg',
    features: [
      'Finisaje microciment',
      'Efect beton aparent',
      'Stucco veneziano',
      'Glazuri decorative',
      'Tencuieli texturate',
    ],
    image: '/images/paint-service-3.jpg',
  },
];

const insulationServices = [
  {
    title: 'Izolație termică',
    description: 'Sisteme profesionale de izolație termică pentru reducerea costurilor energetice și un confort superior.',
    icon: '/icons/thermal.svg',
    features: [
      'Termoizolație fațade',
      'Izolație interioară',
      'Izolație spumă poliuretanică',
      'Sisteme ETICS complete',
      'Consultanță eficiență energetică',
    ],
    image: '/images/insulation-service-1.jpg',
  },
  {
    title: 'Izolație fonică',
    description: 'Soluții de izolare acustică pentru reducerea zgomotului și îmbunătățirea confortului în orice spațiu.',
    icon: '/icons/eco.svg',
    features: [
      'Panouri fonoabsorbante',
      'Bariere acustice',
      'Membrane antivibrații',
      'Izolație pentru pereți și tavane',
      'Soluții pentru spații comerciale',
    ],
    image: '/images/insulation-service-2.jpg',
  },
  {
    title: 'Hidroizolații',
    description: 'Protecție eficientă împotriva infiltrațiilor de apă pentru acoperișuri, băi, subsoluri și fundații.',
    icon: '/icons/warranty.svg',
    features: [
      'Membrane bituminoase',
      'Hidroizolații lichide',
      'Impermeabilizare băi',
      'Protecție terase și balcoane',
      'Tratamente anti-umiditate',
    ],
    image: '/images/insulation-service-3.jpg',
  },
];

// Custom PageHeader wrapper with background video
const ServicesPageHeader = () => {
  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <BackgroundVideo 
          videoSrc="/videos/paintApply.mp4" 
          verticalFlip={typeof window !== 'undefined' && window.innerWidth < 768}
        />
        {/* Adding bottom washout effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8f8f6]/30 to-[#f8f8f6]" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#404040] mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Serviciile Noastre
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-[#8a7d65] max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Soluții complete pentru finisaje de excepție
        </motion.p>
      </div>
    </div>
  );
};

const ServicesPage = () => {
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-[#f8f8f6] overflow-hidden">
        <Navbar />
        <ServicesPageHeader />
        
        {/* Content Background Overlay */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#f8f8f6] opacity-90 z-0"></div>
          
          {/* Services Sections */}
          <section className="py-16 md:py-24 px-4 relative z-10">
            {/* Introduction Section */}
            <section className="py-16 md:py-24 px-4 relative">
              <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-[#8a7d65] opacity-5 blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-[#c3beb4] opacity-10 blur-3xl"></div>
              </div>
              
              <div className="container mx-auto relative z-10">
                <GlassCard accent="gold" className="max-w-3xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#404040] mb-6">Soluții profesionale pentru spații impecabile</h2>
                  <p className="text-[#404040] mb-6">
                    Cu o experiență de peste 10 ani în domeniu, echipa noastră oferă servicii complete de finisaje decorative și sisteme de izolație de calitate superioară. Folosim doar materiale premium și tehnici moderne pentru a asigura rezultate durabile și estetice.
                  </p>
                  <p className="text-[#404040]">
                    Fie că aveți nevoie de renovarea unui apartament sau de izolarea unei clădiri întregi, suntem pregătiți să vă oferim soluții personalizate, adaptate nevoilor și bugetului dumneavoastră.
                  </p>
                </GlassCard>
              </div>
            </section>
            
            {/* Paint Services Section */}
            <section className="py-16 md:py-24 relative overflow-hidden">
              {/* Background with gradient instead of video */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#f8f8f6] via-[#f8f8f6]/95 to-[#f8f8f6]"></div>
              </div>
              
              <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#404040] mb-4">
                    Servicii <span className="text-[#8a7d65]">Vopsele</span>
                  </h2>
                  <p className="text-[#696969] max-w-3xl mx-auto">
                    Descoperă soluțiile noastre complete de vopsire și decorare pentru interioare și exterioare
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                  {paintServices.map((service, index) => (
                    <GlassCard key={service.title} accent="light" delay={index * 0.1} className="h-full">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center mb-4">
                          <div className="relative w-10 h-10 mr-3">
                            <Image 
                              src={service.icon}
                              alt={service.title}
                              fill
                              sizes="40px"
                              style={{ objectFit: 'contain' }}
                              onError={(e) => {
                                // Replace with a default icon
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  // Hide the image
                                  e.currentTarget.style.display = 'none';
                                  
                                  // Create a placeholder icon
                                  const placeholder = document.createElement('div');
                                  placeholder.className = 'absolute inset-0 flex items-center justify-center text-[#8a7d65]';
                                  placeholder.innerHTML = `
                                    <svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                                    </svg>
                                  `;
                                  parent.appendChild(placeholder);
                                }
                              }}
                            />
                          </div>
                          <h3 className="text-2xl font-bold text-[#404040]">{service.title}</h3>
                        </div>
                        <p className="text-[#696969] mb-6">{service.description}</p>
                        
                        <div className="mt-auto">
                          <h4 className="text-lg font-semibold text-[#404040] mb-3">Ce oferim:</h4>
                          <ul className="space-y-2">
                            {service.features.map((feature) => (
                              <li key={feature} className="flex items-start">
                                <span className="text-[#8a7d65] mr-2">✓</span>
                                <span className="text-[#696969]">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Insulation Services Section */}
            <section className="py-16 md:py-24 relative overflow-hidden bg-[#f5f5f3]">
              {/* Background Elements */}
              <div className="absolute inset-0 z-0">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#8a7d65] opacity-5 blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#c3beb4] opacity-5 blur-3xl"></div>
              </div>
              
              <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#404040] mb-4">
                    Servicii <span className="text-[#8a7d65]">Izolații</span>
                  </h2>
                  <p className="text-[#696969] max-w-3xl mx-auto">
                    Sisteme complete de izolație pentru un confort termic superior și economie de energie
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                  {insulationServices.map((service, index) => (
                    <GlassCard key={service.title} accent="gold" delay={index * 0.1} className="h-full">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center mb-4">
                          <div className="relative w-10 h-10 mr-3">
                            <Image 
                              src={service.icon}
                              alt={service.title}
                              fill
                              sizes="40px"
                              style={{ objectFit: 'contain' }}
                              onError={(e) => {
                                // Replace with a default icon
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  // Hide the image
                                  e.currentTarget.style.display = 'none';
                                  
                                  // Create a placeholder icon
                                  const placeholder = document.createElement('div');
                                  placeholder.className = 'absolute inset-0 flex items-center justify-center text-[#8a7d65]';
                                  placeholder.innerHTML = `
                                    <svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                                    </svg>
                                  `;
                                  parent.appendChild(placeholder);
                                }
                              }}
                            />
                          </div>
                          <h3 className="text-2xl font-bold text-[#404040]">{service.title}</h3>
                        </div>
                        <p className="text-[#696969] mb-6">{service.description}</p>
                        
                        <div className="mt-auto">
                          <h4 className="text-lg font-semibold text-[#404040] mb-3">Ce oferim:</h4>
                          <ul className="space-y-2">
                            {service.features.map((feature) => (
                              <li key={feature} className="flex items-start">
                                <span className="text-[#8a7d65] mr-2">✓</span>
                                <span className="text-[#696969]">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Process Section */}
            <section className="py-16 md:py-24 px-4 bg-[#f8f8f6] relative overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute top-1/3 right-1/5 w-96 h-96 rounded-full bg-[#8a7d65] opacity-5 blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-[#c3beb4] opacity-5 blur-3xl"></div>
              </div>
              
              <div className="container mx-auto relative z-10">
                <motion.div 
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#404040] mb-4">Cum Lucrăm</h2>
                  <p className="text-[#696969] max-w-3xl mx-auto">
                    Procesul nostru structurat asigură rezultate de calitate și o experiență fără stres
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { 
                      number: '01', 
                      title: 'Consultare', 
                      description: 'Discutăm nevoile și preferințele dumneavoastră pentru a înțelege exact ce doriți.' 
                    },
                    { 
                      number: '02', 
                      title: 'Evaluare', 
                      description: 'Specialiștii noștri evaluează spațiul și propun cele mai adecvate soluții tehnice.' 
                    },
                    { 
                      number: '03', 
                      title: 'Implementare', 
                      description: 'Echipa noastră execută lucrarea cu maximă atenție la detalii și respectarea termenelor.' 
                    },
                    { 
                      number: '04', 
                      title: 'Verificare', 
                      description: 'Verificăm împreună calitatea finală a lucrării pentru a ne asigura că sunteți mulțumiți.' 
                    }
                  ].map((step, index) => (
                    <GlassCard key={step.number} delay={index * 0.1}>
                      <div className="flex flex-col items-center text-center">
                        <span className="text-6xl font-bold text-[#8a7d65]/20 mb-4">{step.number}</span>
                        <h3 className="text-xl font-bold text-[#404040] mb-3">{step.title}</h3>
                        <p className="text-[#696969]">{step.description}</p>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Call to Action */}
            <section className="py-16 md:py-24 relative overflow-hidden">
              {/* Gradient background instead of video */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#f8f8f6]/95 via-[#f8f8f6]/90 to-[#f8f8f6]/95"></div>
                <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#8a7d65] opacity-10 blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full bg-[#c3beb4] opacity-10 blur-3xl"></div>
              </div>
              
              <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                  className="text-center max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#404040] mb-6">
                    Transformă-ți spațiul în realitatea pe care ți-o dorești
                  </h2>
                  <p className="text-xl text-[#696969] mb-8">
                    Contactează-ne astăzi pentru o consultație gratuită și o ofertă personalizată pentru proiectul tău
                  </p>
                  <Link 
                    href="/contact"
                    className="inline-block px-8 py-4 bg-[#8a7d65] text-white rounded-full text-lg font-medium hover:bg-[#8a7d65]/80 transition-colors"
                  >
                    Solicită o Ofertă
                  </Link>
                </motion.div>
              </div>
            </section>
          </section>
          
          <Footer />
        </div>
      </main>
    </SmoothScrollProvider>
  );
};

export default ServicesPage; 
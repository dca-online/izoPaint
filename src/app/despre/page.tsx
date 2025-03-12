'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Image from 'next/image';

// Team data
const teamMembers = [
  {
    name: 'Alexandru Popescu',
    position: 'Fondator & Director',
    description: 'Cu peste 15 ani de experiență în domeniul finisajelor și izolațiilor, Alexandru conduce compania cu pasiune și dedicare pentru calitate.',
    image: '/images/team-1.jpg',
  },
  {
    name: 'Maria Ionescu',
    position: 'Designer de Interior',
    description: 'Maria aduce creativitate și inovație în fiecare proiect, cu un ochi deosebit pentru detalii și tendințe contemporane.',
    image: '/images/team-2.jpg',
  },
  {
    name: 'Mihai Stanescu',
    position: 'Șef Departament Tehnic',
    description: 'Mihai coordonează echipele tehnice și asigură implementarea la standarde înalte a tuturor proiectelor noastre.',
    image: '/images/team-3.jpg',
  },
  {
    name: 'Elena Dumitrescu',
    position: 'Specialist Materiale',
    description: 'Cu o vastă cunoaștere a materialelor moderne, Elena asigură selecția optimă pentru fiecare proiect specific.',
    image: '/images/team-4.jpg',
  },
];

// Testimonial data
const testimonials = [
  {
    quote: "Am fost impresionați de profesionalismul echipei și de calitatea materialelor folosite. Apartamentul nostru arată impecabil!",
    author: "Ana și Mihai Constantinescu",
    project: "Renovare Apartament",
  },
  {
    quote: "Izolația termică aplicată de echipa lor a redus considerabil costurile noastre de încălzire. Recomand cu încredere!",
    author: "Familia Georgescu",
    project: "Izolație Termică Casă",
  },
  {
    quote: "Serviciile lor premium de vopsele decorative au transformat complet aspectul birourilor noastre, creând un spațiu modern și primitor.",
    author: "Andrei Radu, Manager General",
    project: "Renovare Spațiu Comercial",
  },
];

// Milestones
const milestones = [
  {
    year: "2010",
    title: "Înființarea Companiei",
    description: "Am început ca o mică echipă dedicată calității și serviciilor personalizate în domeniul finisajelor."
  },
  {
    year: "2013",
    title: "Extinderea Serviciilor",
    description: "Am adăugat servicii complete de izolații, devenind un furnizor complet de soluții pentru construcții."
  },
  {
    year: "2016",
    title: "100+ Proiecte Finalizate",
    description: "Am celebrat finalizarea a peste 100 de proiecte rezidențiale și comerciale în Suceava și împrejurimi."
  },
  {
    year: "2019",
    title: "Relocare Sediu Nou",
    description: "Ne-am mutat într-un sediu modern cu showroom pentru a oferi o experiență premium clienților noștri."
  },
  {
    year: "2022",
    title: "Parteneriate Internaționale",
    description: "Am devenit distribuitori oficiali pentru mărci premium de vopsele decorative și materiale de izolație."
  },
];

const AboutPage = () => {
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-[#1A1A1A] overflow-hidden">
        <Navbar />
        
        <PageHeader 
          title="Despre Noi"
          subtitle="Pasiune pentru Calitate și Inovație în Finisaje"
          videoSrc="/videos/palettes.mp4"
        />
        
        {/* Introduction Section */}
        <section className="py-16 md:py-24 px-4 relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-[#B99C4B] opacity-10 blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-[#F0E4B2] opacity-10 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <GlassCard accent="gold">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                    Povestea <span className="text-[#B99C4B]">Noastră</span>
                  </h2>
                  <p className="text-white/80 mb-6">
                    De peste un deceniu, ne-am dedicat transformării spațiilor prin finisaje decorative de calitate și soluții moderne de izolație. Ce a început ca o mică afacere de familie, s-a dezvoltat într-o companie de referință în zona Sucevei, cu o echipă de profesioniști pasionați și un portofoliu impresionant de proiecte.
                  </p>
                  <p className="text-white/80">
                    Misiunea noastră este simplă: să oferim clienților noștri cele mai bune soluții pentru spații frumoase, confortabile și eficiente energetic. Ne mândrim cu atenția la detalii, folosirea materialelor premium și adaptarea constantă la noile tehnologii și tendințe din domeniu.
                  </p>
                </GlassCard>
              </motion.div>
              
              <motion.div
                className="relative aspect-square lg:aspect-auto"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative h-full w-full min-h-[400px]">
                  <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-2xl overflow-hidden border-8 border-[#1A1A1A] shadow-2xl">
                    <Image
                      src="/images/about-main.jpg"
                      alt="Our story"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-2/3 h-2/3 rounded-2xl overflow-hidden border-8 border-[#1A1A1A] shadow-2xl">
                    <Image
                      src="/images/about-secondary.jpg"
                      alt="Our workshop"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-[#B99C4B] opacity-50"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-full bg-[#B99C4B]/20 backdrop-blur-sm"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Philosophy Section */}
        <section className="py-16 md:py-24 px-4 relative bg-[#333333]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-transparent to-[#1A1A1A]"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Filozofia Noastră</h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Valorile care ne ghidează și ne diferențiază în tot ceea ce facem.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Calitate premium",
                  description: "Utilizăm doar materiale de cea mai înaltă calitate și tehnici avansate pentru rezultate durabile și estetice.",
                  icon: "🏆"
                },
                {
                  title: "Inovație Continuă",
                  description: "Ne actualizăm constant cunoștințele și tehnicile pentru a oferi cele mai moderne soluții clienților noștri.",
                  icon: "💡"
                },
                {
                  title: "Sustenabilitate",
                  description: "Suntem dedicați folosirii materialelor eco-friendly și metodelor sustenabile în toate proiectele noastre.",
                  icon: "🌱"
                }
              ].map((value, index) => (
                <GlassCard key={value.title} delay={index * 0.2} accent={index === 1 ? "light" : "gold"}>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl mb-4">{value.icon}</span>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-white/70">{value.description}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
        
        {/* History Timeline */}
        <section className="py-16 md:py-24 px-4 relative">
          <div className="container mx-auto relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Istoricul Nostru</h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                O privire asupra evoluției noastre și momentelor cheie din istoria companiei.
              </p>
            </motion.div>
            
            <div className="relative">
              {/* Timeline stem */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#B99C4B]/30 transform -translate-x-1/2 hidden md:block"></div>
              
              <div className="space-y-16 relative">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="relative">
                    <motion.div 
                      className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center gap-6 md:gap-12`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      {/* Year bubble - always aligned with center stem on mobile, alternating sides on desktop */}
                      <div className="md:w-1/2 flex justify-center md:justify-start items-center">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#B99C4B] text-white text-xl font-bold relative z-20">
                          {milestone.year}
                        </div>
                      </div>
                      
                      {/* Content - forms 50% of the row */}
                      <div className="md:w-1/2">
                        <GlassCard 
                          accent={index % 2 === 0 ? "gold" : "light"}
                          className="md:max-w-md"
                        >
                          <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                          <p className="text-white/70">{milestone.description}</p>
                        </GlassCard>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 md:py-24 px-4 relative overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0 opacity-10">
            <video 
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              src="/videos/paintbrush.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/50 to-[#1A1A1A]"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Echipa Noastră</h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Profesioniști pasionați care aduc expertiza și creativitate în fiecare proiect.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-60"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-[#B99C4B] mb-2">{member.position}</p>
                  <p className="text-white/70 text-sm">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 md:py-24 px-4 relative bg-[#333333]">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/3 right-1/5 w-96 h-96 rounded-full bg-[#B99C4B] opacity-5 blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-[#F0E4B2] opacity-5 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Ce Spun Clienții</h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Experiențele clienților care au ales serviciile noastre.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <GlassCard key={index} accent="light" delay={index * 0.2}>
                  <div className="flex flex-col h-full">
                    <div className="text-4xl text-[#B99C4B] mb-4">&ldquo;</div>
                    <p className="text-white/90 italic mb-6 flex-grow">{testimonial.quote}</p>
                    <div>
                      <p className="font-bold text-white">{testimonial.author}</p>
                      <p className="text-[#F0E4B2] text-sm">{testimonial.project}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 md:py-24 px-4 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <GlassCard accent="gold" className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Devino Parte din Povestea Noastră</h2>
              <p className="text-white/80 mb-8">
                Suntem pregătiți să ne punem experiența, pasiunea și expertiza în slujba proiectului tău. Contactează-ne pentru a discuta despre viziunea ta.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-8 py-3 bg-[#B99C4B] text-white rounded-full text-lg font-medium hover:bg-[#B99C4B]/80 transition-colors">
                  Contactează-ne
                </button>
              </div>
            </GlassCard>
          </div>
        </section>
        
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
};

export default AboutPage; 
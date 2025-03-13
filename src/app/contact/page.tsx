'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Link from 'next/link'; // Used in the template but not directly in this file

// Contact information
const contactInfo = {
  address: 'Strada Exemplu 123, Suceava, România',
  phone: '+40 770 123 456',
  email: 'office@izopaint.ro',
  hours: 'Luni - Vineri: 09:00 - 18:00',
  socialMedia: {
    facebook: 'https://facebook.com/izopaint',
    instagram: 'https://instagram.com/izopaint',
  },
};

const ContactPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, just simulating success
      // In a real application, you would send the form data to your API
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      //   headers: { 'Content-Type': 'application/json' }
      // });
      
      // if (!response.ok) throw new Error('Submission failed');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      setFormStatus('success');
    } catch (_) {
      // Using _ to indicate an intentionally unused parameter
      setFormStatus('error');
    } finally {
      setFormStatus('idle');
    }
  };
  
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-[#f8f8f6] overflow-hidden">
        <Navbar />
        
        <PageHeader 
          title="Contactează-ne"
          subtitle="Suntem Aici pentru a Răspunde Întrebărilor Tale"
          videoSrc="/videos/paintbrush.mp4"
        />
        
        {/* Content Background Overlay */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#f8f8f6] opacity-90 z-0"></div>
          
          {/* Contact Information Section */}
          <section className="py-16 md:py-24 px-4 relative z-10">
            <div className="container mx-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <GlassCard accent="gold">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6">Informații de Contact</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-[#8a7d65]/20 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#8a7d65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="#8a7d65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#8a7d65] mb-1">Adresă</h3>
                          <p className="text-[#404040]">{contactInfo.address}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-[#8a7d65]/20 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 16.92V19.92C22 20.4704 21.7893 20.9982 21.4142 21.3982C21.0391 21.7982 20.5304 21.9968 20 22C16.12 22 12.29 20.62 9.16 18.04C6.31 15.71 4.03 12.61 3 8.92C3 8.4 3.19 7.9 3.56 7.53C3.93 7.16 4.44 6.96 4.98 6.95H7.98C8.5406 6.944 9.08341 7.1445 9.50677 7.52149C9.93013 7.89848 10.2038 8.42647 10.27 8.98C10.4 10.17 10.67 11.34 11.08 12.45C11.2365 12.833 11.2595 13.2573 11.1456 13.6554C11.0316 14.0535 10.7867 14.4013 10.45 14.64L9.1 15.67C10.0482 17.4671 11.397 18.9942 13.03 20.17L14.38 19.14C14.6169 18.8153 14.954 18.5785 15.3402 18.4673C15.7265 18.3561 16.1378 18.3765 16.51 18.52C17.6226 18.9292 18.7877 19.1998 19.98 19.33C20.5468 19.3958 21.0692 19.6663 21.4385 20.0893C21.8079 20.5123 21.9986 21.0524 22 21.61V16.92Z" stroke="#8a7d65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#8a7d65] mb-1">Telefon</h3>
                          <p className="text-[#404040]">{contactInfo.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-[#8a7d65]/20 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#8a7d65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 6L12 13L2 6" stroke="#8a7d65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#8a7d65] mb-1">Email</h3>
                          <p className="text-[#404040]">{contactInfo.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-[#8a7d65]/20 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#8a7d65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 6V12L16 14" stroke="#8a7d65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#8a7d65] mb-1">Program</h3>
                          <p className="text-[#404040]">{contactInfo.hours}</p>
                        </div>
                      </div>
                      
                      <div className="pt-6">
                        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">Social Media</h3>
                        <div className="flex space-x-4">
                          <a href={contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#8a7d65]/20 flex items-center justify-center hover:bg-[#8a7d65]/30 transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="#8a7d65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                          <a href={contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#8a7d65]/20 flex items-center justify-center hover:bg-[#8a7d65]/30 transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="#8a7d65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09208 10.9099 8.47034 10.1584C8.8486 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="#8a7d65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M17.5 6.5H17.51" stroke="#8a7d65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
                
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <GlassCard accent="light">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6">Trimite-ne un Mesaj</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-[#8a7d65] mb-2">Nume</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-[#e6e5e3] rounded-lg focus:outline-none focus:border-[#8a7d65] text-[#1A1A1A]"
                            placeholder="Numele tău"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-[#8a7d65] mb-2">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-[#e6e5e3] rounded-lg focus:outline-none focus:border-[#8a7d65] text-[#1A1A1A]"
                            placeholder="Email-ul tău"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-[#8a7d65] mb-2">Telefon</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-[#e6e5e3] rounded-lg focus:outline-none focus:border-[#8a7d65] text-[#1A1A1A]"
                            placeholder="Număr de telefon"
                          />
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-[#8a7d65] mb-2">Subiect</label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-[#e6e5e3] rounded-lg focus:outline-none focus:border-[#8a7d65] text-[#1A1A1A] appearance-none"
                            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%238a7d65\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em 1.5em' }}
                          >
                            <option value="" disabled className="bg-[#f8f8f6]">Selectează un subiect</option>
                            <option value="Ofertă vopsele" className="bg-[#f8f8f6]">Ofertă vopsele</option>
                            <option value="Ofertă izolații" className="bg-[#f8f8f6]">Ofertă izolații</option>
                            <option value="Consultanță" className="bg-[#f8f8f6]">Consultanță</option>
                            <option value="Altele" className="bg-[#f8f8f6]">Altele</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-[#8a7d65] mb-2">Mesaj</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 bg-white/5 border border-[#e6e5e3] rounded-lg focus:outline-none focus:border-[#8a7d65] text-[#1A1A1A] resize-none"
                          placeholder="Cum te putem ajuta?"
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className={`w-full py-4 rounded-lg text-white font-medium transition-colors ${
                          formStatus === 'submitting' 
                            ? 'bg-[#8a7d65]/50 cursor-not-allowed' 
                            : 'bg-[#8a7d65] hover:bg-[#8a7d65]/80'
                        }`}
                      >
                        {formStatus === 'submitting' ? 'Se trimite...' : 'Trimite Mesajul'}
                      </button>
                      
                      {/* Success/Error Message */}
                      {formStatus === 'success' && (
                        <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-700">
                          Mesajul a fost trimis cu succes. Te vom contacta în curând!
                        </div>
                      )}
                      
                      {formStatus === 'error' && (
                        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-700">
                          A apărut o eroare. Te rugăm să încerci din nou mai târziu.
                        </div>
                      )}
                    </form>
                  </GlassCard>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Map Section */}
          <section className="py-16 md:py-24 px-4 relative z-10 bg-[#f5f5f3]">
            <div className="container mx-auto relative z-10">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-4">Locația Noastră</h2>
                <p className="text-lg text-[#404040] max-w-2xl mx-auto">
                  Vino să ne vizitezi la showroom-ul nostru din Suceava.
                </p>
              </motion.div>
              
              <GlassCard>
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  {/* For demonstration, we'll use an iframe for Google Maps */}
                  {/* In a real project, you might want to use a mapping library with your API key */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42878.846899989525!2d26.221290155644316!3d47.65788078362044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4734fc3f2e90ec35%3A0x25d46305f53c6ac6!2sSuceava!5e0!3m2!1sen!2sro!4v1615812000000!5m2!1sen!2sro"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Company Location Map"
                  ></iframe>
                </div>
              </GlassCard>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-16 md:py-24 px-4 relative z-10">
            <div className="container mx-auto relative z-10">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-4">Întrebări Frecvente</h2>
                <p className="text-lg text-[#404040] max-w-2xl mx-auto">
                  Răspunsurile la cele mai comune întrebări despre serviciile noastre.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    question: 'Cât durează o lucrare de izolație termică?',
                    answer: 'Durata unei lucrări de izolație termică depinde de dimensiunea și complexitatea proiectului. În general, pentru o casă medie, lucrarea poate dura între 1-3 săptămâni. Vă oferim un calendar detaliat înainte de începerea lucrărilor.'
                  },
                  {
                    question: 'Ce tipuri de vopsele decorative oferiți?',
                    answer: 'Oferim o gamă largă de vopsele decorative, inclusiv vopsele cu efect mătase, metalic, beton, vopsele texturate, tencuieli decorative și multe altele. Toate produsele noastre sunt de calitate premium, durabile și disponibile într-o varietate de culori.'
                  },
                  {
                    question: 'Oferiți garanție pentru lucrările efectuate?',
                    answer: 'Da, toate lucrările noastre beneficiază de garanție. Pentru izolații termice oferim o garanție de 5-10 ani, iar pentru lucrările de vopsitorie și finisaje decorative, garanția este de 2-5 ani, în funcție de tipul de produs utilizat.'
                  },
                  {
                    question: 'Cum se face programarea pentru o ofertă?',
                    answer: 'Puteți solicita o ofertă completând formularul de contact de pe site, sunând la numărul nostru de telefon sau trimițând un email. Un specialist vă va contacta în maxim 24 de ore pentru a programa o vizită la domiciliu și pentru a discuta detaliile proiectului.'
                  },
                ].map((faq, index) => (
                  <GlassCard key={index} accent={index % 2 === 0 ? 'gold' : 'light'} delay={index * 0.1}>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{faq.question}</h3>
                    <p className="text-[#404040]">{faq.answer}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </section>
          
          <Footer />
        </div>
      </main>
    </SmoothScrollProvider>
  );
};

export default ContactPage; 
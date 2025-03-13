'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import BackgroundVideo from '@/components/BackgroundVideo';
import Link from 'next/link';

// Mobile Navigation Pills
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MobileNavPills = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show pills when scrolled down past the hero section
      if (window.scrollY > window.innerHeight * 0.7) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 sm:hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex space-x-3 bg-white/80 backdrop-blur-lg p-2 rounded-full shadow-lg border border-[#e6e5e3]">
        <Link href="/cont" className="px-4 py-2 bg-[#8a7d65] text-white rounded-full text-sm font-medium">
          Cont
        </Link>
        <Link href="/cos" className="px-4 py-2 bg-[#e6e5e3] text-[#404040] rounded-full text-sm font-medium">
          Coș
        </Link>
      </div>
    </motion.div>
  );
};

// Custom PageHeader wrapper with background video
const AccountPageHeader = () => {
  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      {/* Video Background using the component */}
      <BackgroundVideo
        videoSrc="/videos/paint.mp4"
        verticalFlip={typeof window !== 'undefined' && window.innerWidth < 768} // Vertical flip only on mobile
      />
      
      {/* Adding bottom washout effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8f8f6]/30 to-[#f8f8f6]" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#404040] mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Contul Meu
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-[#8a7d65] max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Gestionează profilul și comenzile tale
        </motion.p>
      </div>
    </div>
  );
};

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // Login status state
  const [loginStatus, setLoginStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [loginError, setLoginError] = useState<string | null>(null);
  
  // Register form state
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  // Register status state
  const [registerStatus, setRegisterStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [registerError, setRegisterError] = useState<string | null>(null);
  
  // Form errors
  const [errors, setErrors] = useState<{
    login?: { email?: string; password?: string };
    register?: { 
      firstName?: string; 
      lastName?: string; 
      email?: string; 
      password?: string;
      confirmPassword?: string;
      agreeTerms?: string;
    }
  }>({});
  
  // Handle login form input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle register form input changes
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle login form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginStatus('submitting');
    setLoginError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes only
      if (loginForm.email !== 'demo@example.com' || loginForm.password !== 'password') {
        throw new Error('Invalid credentials');
      }
      
      // In a real app, you would handle JWT or session storage here
      setIsLoggedIn(true);
      // Remove logging in production environment
      // console.log('User logged in:', loginForm.email);
      setLoginStatus('success');
    } catch (error) {
      setLoginError('Email sau parolă incorecte.');
      setLoginStatus('error');
    }
  };
  
  // Handle register form submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterStatus('submitting');
    setRegisterError(null);
    
    // Password validation
    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError('Parolele nu se potrivesc.');
      setRegisterStatus('error');
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API call to register the user
      // Remove logging in production environment
      // console.log('User registered:', registerForm.email);
      
      // Switch to login tab after successful registration
      setActiveTab('login');
      setRegisterStatus('success');
      
      // Clear register form
      setRegisterForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
      });
    } catch (error) {
      setRegisterError('Eroare la înregistrare. Încercați din nou mai târziu.');
      setRegisterStatus('error');
    }
  };
  
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-[#f8f8f6] overflow-hidden">
        <Navbar />
        
        <AccountPageHeader />
        
        {/* Content Background Overlay */}
        <section className="py-16 px-4 relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#8a7d65] opacity-5 blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-[#c3beb4] opacity-5 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="max-w-xl mx-auto">
              {/* Tabs */}
              <div className="flex mb-8">
                <button
                  className={`flex-1 py-3 text-center transition-colors ${
                    activeTab === 'login'
                      ? 'text-[#8a7d65] border-b-2 border-[#8a7d65]'
                      : 'text-[#404040] hover:text-[#1A1A1A] border-b-2 border-[#e6e5e3]'
                  }`}
                  onClick={() => setActiveTab('login')}
                >
                  Autentificare
                </button>
                <button
                  className={`flex-1 py-3 text-center transition-colors ${
                    activeTab === 'register'
                      ? 'text-[#8a7d65] border-b-2 border-[#8a7d65]'
                      : 'text-[#404040] hover:text-[#1A1A1A] border-b-2 border-[#e6e5e3]'
                  }`}
                  onClick={() => setActiveTab('register')}
                >
                  Înregistrare
                </button>
              </div>
              
              <GlassCard accent="gold" className="p-8">
                {activeTab === 'login' ? (
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Autentificare</h2>
                    
                    <form onSubmit={handleLoginSubmit}>
                      <div className="mb-4">
                        <label htmlFor="login-email" className="block text-[#404040] text-sm mb-2">
                          Adresă de Email
                        </label>
                        <input
                          type="email"
                          id="login-email"
                          name="email"
                          value={loginForm.email}
                          onChange={handleLoginChange}
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                            errors.login?.email ? 'border-red-500' : 'border-[#e6e5e3]'
                          } text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#8a7d65]`}
                          placeholder="exemplu@email.com"
                        />
                        {errors.login?.email && (
                          <p className="text-red-600 text-sm mt-1">{errors.login.email}</p>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="login-password" className="block text-[#404040] text-sm mb-2">
                          Parolă
                        </label>
                        <input
                          type="password"
                          id="login-password"
                          name="password"
                          value={loginForm.password}
                          onChange={handleLoginChange}
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                            errors.login?.password ? 'border-red-500' : 'border-[#e6e5e3]'
                          } text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#8a7d65]`}
                          placeholder="••••••••"
                        />
                        {errors.login?.password && (
                          <p className="text-red-600 text-sm mt-1">{errors.login.password}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="remember-me"
                            name="rememberMe"
                            checked={loginForm.rememberMe}
                            onChange={handleLoginChange}
                            className="h-4 w-4 text-[#8a7d65] rounded border-[#e6e5e3] bg-white/5 focus:ring-[#8a7d65]"
                          />
                          <label htmlFor="remember-me" className="ml-2 block text-sm text-[#404040]">
                            Ține-mă minte
                          </label>
                        </div>
                        
                        <a href="#" className="text-sm text-[#8a7d65] hover:underline">
                          Ai uitat parola?
                        </a>
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full py-3 bg-[#8a7d65] text-white rounded-full hover:bg-[#8a7d65]/90 transition-colors text-lg font-medium"
                      >
                        Autentificare
                      </button>
                    </form>
                    
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-[#e6e5e3]"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white/60 text-[#404040] backdrop-blur-md">
                            Sau continuă cu
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-[#e6e5e3] rounded-md shadow-sm text-sm font-medium text-[#1A1A1A] bg-white/5 hover:bg-white/10">
                          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" fill="#404040"/>
                          </svg>
                          Google
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-[#e6e5e3] rounded-md shadow-sm text-sm font-medium text-[#1A1A1A] bg-white/5 hover:bg-white/10">
                          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127c-.82-.088-1.643-.13-2.467-.127-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" fill="#404040"/>
                          </svg>
                          Facebook
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-center mt-8">
                      <p className="text-[#404040] text-sm">
                        Nu ai cont? {' '}
                        <button
                          onClick={() => setActiveTab('register')}
                          className="text-[#8a7d65] hover:underline"
                        >
                          Înregistrează-te
                        </button>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Înregistrare</h2>
                    
                    <form onSubmit={handleRegisterSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="firstName" className="block text-[#404040] text-sm mb-2">
                            Prenume
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={registerForm.firstName}
                            onChange={handleRegisterChange}
                            className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                              errors.register?.firstName ? 'border-red-500' : 'border-[#e6e5e3]'
                            } text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#8a7d65]`}
                            placeholder="Prenume"
                          />
                          {errors.register?.firstName && (
                            <p className="text-red-600 text-sm mt-1">{errors.register.firstName}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-[#404040] text-sm mb-2">
                            Nume
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={registerForm.lastName}
                            onChange={handleRegisterChange}
                            className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                              errors.register?.lastName ? 'border-red-500' : 'border-[#e6e5e3]'
                            } text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#8a7d65]`}
                            placeholder="Nume"
                          />
                          {errors.register?.lastName && (
                            <p className="text-red-600 text-sm mt-1">{errors.register.lastName}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="register-email" className="block text-[#404040] text-sm mb-2">
                          Adresă de Email
                        </label>
                        <input
                          type="email"
                          id="register-email"
                          name="email"
                          value={registerForm.email}
                          onChange={handleRegisterChange}
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                            errors.register?.email ? 'border-red-500' : 'border-[#e6e5e3]'
                          } text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#8a7d65]`}
                          placeholder="exemplu@email.com"
                        />
                        {errors.register?.email && (
                          <p className="text-red-600 text-sm mt-1">{errors.register.email}</p>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="register-password" className="block text-[#404040] text-sm mb-2">
                          Parolă
                        </label>
                        <input
                          type="password"
                          id="register-password"
                          name="password"
                          value={registerForm.password}
                          onChange={handleRegisterChange}
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                            errors.register?.password ? 'border-red-500' : 'border-[#e6e5e3]'
                          } text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#8a7d65]`}
                          placeholder="Minim 6 caractere"
                        />
                        {errors.register?.password && (
                          <p className="text-red-600 text-sm mt-1">{errors.register.password}</p>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="confirm-password" className="block text-[#404040] text-sm mb-2">
                          Confirmă Parola
                        </label>
                        <input
                          type="password"
                          id="confirm-password"
                          name="confirmPassword"
                          value={registerForm.confirmPassword}
                          onChange={handleRegisterChange}
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                            errors.register?.confirmPassword ? 'border-red-500' : 'border-[#e6e5e3]'
                          } text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#8a7d65]`}
                          placeholder="Confirmă parola"
                        />
                        {errors.register?.confirmPassword && (
                          <p className="text-red-600 text-sm mt-1">{errors.register.confirmPassword}</p>
                        )}
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="terms"
                              name="agreeTerms"
                              type="checkbox"
                              checked={registerForm.agreeTerms}
                              onChange={handleRegisterChange}
                              className="h-4 w-4 text-[#8a7d65] rounded border-[#e6e5e3] bg-white/5 focus:ring-[#8a7d65]"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="text-[#404040]">
                              Sunt de acord cu{' '}
                              <a href="#" className="text-[#8a7d65] hover:underline">
                                Termenii și Condițiile
                              </a>{' '}
                              și{' '}
                              <a href="#" className="text-[#8a7d65] hover:underline">
                                Politica de Confidențialitate
                              </a>
                            </label>
                            {errors.register?.agreeTerms && (
                              <p className="text-red-600 text-sm mt-1">{errors.register.agreeTerms}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full py-3 bg-[#8a7d65] text-white rounded-full hover:bg-[#8a7d65]/90 transition-colors text-lg font-medium"
                      >
                        Creare Cont
                      </button>
                    </form>
                    
                    <div className="text-center mt-8">
                      <p className="text-[#404040] text-sm">
                        Ai deja cont? {' '}
                        <button
                          onClick={() => setActiveTab('login')}
                          className="text-[#8a7d65] hover:underline"
                        >
                          Autentifică-te
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </GlassCard>
            </div>
          </div>
        </section>
        
        {/* Account Benefits */}
        <section className="py-16 px-4 bg-[#f0efed]/50 relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-[#8a7d65] opacity-5 blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-[#c3beb4] opacity-5 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Beneficiile Contului</h2>
              <p className="text-[#404040] max-w-2xl mx-auto">
                Creează un cont pentru a beneficia de o experiență de cumpărare îmbunătățită și acces la funcții exclusive.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 8V14" stroke="#c3beb4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M23 11H17" stroke="#c3beb4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: 'Profil Personalizat',
                  description: 'Gestionează-ți datele personale și preferințele pentru o experiență personalizată.'
                },
                {
                  icon: (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 11L12 14L22 4" stroke="#c3beb4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: 'Istoric Comenzi',
                  description: 'Vizualizează istoricul comenzilor tale și recomandă produsele preferate.'
                },
                {
                  icon: (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 10L11 12L15 8" stroke="#c3beb4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: 'Produse Favorite',
                  description: 'Salvează produsele preferate pentru a le găsi mai ușor și a le cumpăra ulterior.'
                },
                {
                  icon: (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 15C3 16.6569 4.34315 18 6 18C7.65685 18 9 16.6569 9 15C9 13.3431 7.65685 12 6 12C4.34315 12 3 13.3431 3 15Z" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 15C21 16.6569 19.6569 18 18 18C16.3431 18 15 16.6569 15 15C15 13.3431 16.3431 12 18 12C19.6569 12 21 13.3431 21 15Z" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 15H15" stroke="#c3beb4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 18V21" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18 18V21" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 7L17 6V10L12 11V7Z" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 7L7 6V10L12 11V7Z" stroke="#8a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 6L12 3L17 6" stroke="#c3beb4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: 'Oferte Exclusive',
                  description: 'Primește acces la oferte exclusive și promoții disponibile doar pentru utilizatorii înregistrați.'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard>
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4">{benefit.icon}</div>
                      <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{benefit.title}</h3>
                      <p className="text-[#404040]">{benefit.description}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
};

export default AccountPage; 
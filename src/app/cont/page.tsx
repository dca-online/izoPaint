'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import BackgroundVideo from '@/components/BackgroundVideo';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { useRouter } from 'next/navigation';

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
  const { user, signIn, signUp, signInWithGoogle, signOut } = useAuth();
  const router = useRouter();
  
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
  
  // Handle login form submission with Supabase
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginStatus('submitting');
    setLoginError(null);
    
    try {
      const { error } = await signIn(loginForm.email, loginForm.password);
      
      if (error) {
        setLoginError(error.message || 'Email sau parolă incorecte.');
        setLoginStatus('error');
      } else {
        setLoginStatus('success');
      }
    } catch (error) {
      setLoginError('A apărut o eroare la autentificare.');
      setLoginStatus('error');
      console.error('Login error:', error);
    }
  };
  
  // Handle register form submission with Supabase
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterStatus('submitting');
    setRegisterError(null);
    
    // Form validation
    const formErrors: any = {};
    
    if (!registerForm.firstName.trim()) {
      formErrors.firstName = 'Prenumele este obligatoriu';
    }
    
    if (!registerForm.lastName.trim()) {
      formErrors.lastName = 'Numele este obligatoriu';
    }
    
    if (!registerForm.email.trim()) {
      formErrors.email = 'Email-ul este obligatoriu';
    }
    
    if (registerForm.password.length < 6) {
      formErrors.password = 'Parola trebuie să aibă minim 6 caractere';
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      formErrors.confirmPassword = 'Parolele nu se potrivesc';
    }
    
    if (!registerForm.agreeTerms) {
      formErrors.agreeTerms = 'Trebuie să acceptați termenii și condițiile';
    }
    
    if (Object.keys(formErrors).length > 0) {
      setErrors({ register: formErrors });
      setRegisterStatus('error');
      return;
    }
    
    try {
      const { error, data } = await signUp(registerForm.email, registerForm.password);
      
      if (error) {
        setRegisterError(error.message || 'Eroare la înregistrare. Încercați din nou mai târziu.');
        setRegisterStatus('error');
      } else {
        setRegisterStatus('success');
        setActiveTab('login');
        
        // Clear register form
        setRegisterForm({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false
        });
        
        // Show success message
        alert('Cont creat cu succes! Vă rugăm să vă verificați email-ul pentru a confirma înregistrarea.');
      }
    } catch (error) {
      setRegisterError('A apărut o eroare la înregistrare.');
      setRegisterStatus('error');
      console.error('Registration error:', error);
    }
  };
  
  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };
  
  // Handle sign in with Google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign in error:', error);
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
              {user ? (
                // User is logged in - show account dashboard
                <GlassCard accent="gold" className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Bine ai venit!</h2>
                    <p className="text-[#696969]">{user.email}</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="border border-[#e6e5e3] rounded-lg p-4">
                      <h3 className="text-lg font-medium text-[#1A1A1A] mb-4">Detalii cont</h3>
                      <p className="text-[#696969] mb-2">
                        <span className="font-medium">Email:</span> {user.email}
                      </p>
                      <p className="text-[#696969] mb-2">
                        <span className="font-medium">ID cont:</span> {user.id.substring(0, 8)}...
                      </p>
                      <p className="text-[#696969]">
                        <span className="font-medium">Status email:</span>{' '}
                        {user.email_confirmed_at ? (
                          <span className="text-green-600">Verificat</span>
                        ) : (
                          <span className="text-amber-600">Neverificat</span>
                        )}
                      </p>
                    </div>
                    
                    <div className="border border-[#e6e5e3] rounded-lg p-4">
                      <h3 className="text-lg font-medium text-[#1A1A1A] mb-4">Acțiuni rapide</h3>
                      <div className="flex flex-col gap-3">
                        <Link 
                          href="/comenzile-mele" 
                          className="text-[#8a7d65] hover:underline flex items-center p-3 rounded-lg hover:bg-[#f0efed] transition-colors"
                        >
                          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none">
                            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 16H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Comenzile mele
                          <svg className="w-4 h-4 ml-auto" viewBox="0 0 24 24" fill="none">
                            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                        <Link 
                          href="/favorite" 
                          className="text-[#8a7d65] hover:underline flex items-center p-3 rounded-lg hover:bg-[#f0efed] transition-colors"
                        >
                          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none">
                            <path d="M19.5 12.5719L12 20.0719L4.5 12.5719C4.0053 12.0772 3.61564 11.4879 3.35554 10.8433C3.09545 10.1987 2.97056 9.51098 2.99011 8.81915C3.00967 8.12732 3.1733 7.44718 3.47088 6.81833C3.76845 6.18949 4.19414 5.62621 4.72433 5.15954C5.25453 4.69288 5.87619 4.33558 6.54523 4.10871C7.21427 3.88184 7.91862 3.78948 8.61635 3.83661C9.31409 3.88374 9.99473 4.06933 10.6197 4.384C11.2447 4.69867 11.8018 5.13477 12.2575 5.67094C12.7106 5.13908 13.2643 4.70686 13.8852 4.39539C14.5061 4.08391 15.1821 3.90063 15.8751 3.85461C16.5681 3.80858 17.2678 3.90079 17.9329 4.12635C18.598 4.35191 19.2164 4.7067 19.7441 5.16997C20.2719 5.63324 20.6965 6.19258 20.9944 6.81747C21.2923 7.44235 21.4577 8.11876 21.4799 8.80746C21.502 9.49616 21.3804 10.182 21.1239 10.826C20.8673 11.47 20.4812 12.0598 19.99 12.5559" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Produse favorite
                          <svg className="w-4 h-4 ml-auto" viewBox="0 0 24 24" fill="none">
                            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                        <Link 
                          href="/adresele-mele" 
                          className="text-[#8a7d65] hover:underline flex items-center p-3 rounded-lg hover:bg-[#f0efed] transition-colors"
                        >
                          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none">
                            <path d="M17.6569 16.6568L13.1716 21.1421C12.7811 21.5326 12.1479 21.5326 11.7574 21.1421L7.27203 16.6568C6.30964 15.6944 5.65731 14.4791 5.40666 13.1624C5.15602 11.8457 5.31388 10.4877 5.86278 9.25995C6.41167 8.03223 7.32494 6.98881 8.47485 6.27983C9.62476 5.57084 10.9579 5.23076 12.3136 5.30473C13.6693 5.3787 14.9582 5.86307 16.0287 6.68937C17.0991 7.51567 17.8962 8.64968 18.3133 9.9233C18.7304 11.1969 18.7472 12.5598 18.3619 13.8438C17.9765 15.1279 17.2073 16.2816 16.1569 17.1345" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12.5 11C12.5 11.2761 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.2761 11.5 11C11.5 10.7239 11.7239 10.5 12 10.5C12.2761 10.5 12.5 10.7239 12.5 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Adresele mele
                          <svg className="w-4 h-4 ml-auto" viewBox="0 0 24 24" fill="none">
                            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <button 
                      onClick={handleSignOut}
                      className="px-6 py-2 border border-red-200 text-red-600 rounded-full hover:bg-red-50 transition-colors"
                    >
                      Deconectare
                    </button>
                  </div>
                </GlassCard>
              ) : (
                // User is not logged in - show login/register form
                <>
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
                        
                        {loginError && (
                          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
                            {loginError}
                          </div>
                        )}
                        
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
                              required
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
                              required
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
                            
                            <Link href="/cont/resetare-parola" className="text-sm text-[#8a7d65] hover:underline">
                              Ai uitat parola?
                            </Link>
                          </div>
                          
                          <button
                            type="submit"
                            className="w-full py-3 bg-[#8a7d65] text-white rounded-full hover:bg-[#8a7d65]/90 transition-colors text-lg font-medium"
                            disabled={loginStatus === 'submitting'}
                          >
                            {loginStatus === 'submitting' ? 'Se procesează...' : 'Autentificare'}
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
                          
                          <div className="mt-6">
                            <button 
                              onClick={handleGoogleSignIn}
                              className="w-full flex items-center justify-center px-4 py-2 border border-[#e6e5e3] rounded-md shadow-sm text-sm font-medium text-[#1A1A1A] bg-white/5 hover:bg-white/10"
                            >
                              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" fill="#404040"/>
                              </svg>
                              Continuă cu Google
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
                        
                        {registerError && (
                          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
                            {registerError}
                          </div>
                        )}
                        
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
                                required
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
                                required
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
                              required
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
                              required
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
                              required
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
                                  required
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
                            disabled={registerStatus === 'submitting'}
                          >
                            {registerStatus === 'submitting' ? 'Se procesează...' : 'Creare Cont'}
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
                </>
              )}
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
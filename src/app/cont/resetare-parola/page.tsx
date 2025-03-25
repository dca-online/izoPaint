'use client';
import React, { useState } from 'react';
import { useAuth } from '@/lib/authContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import { useRouter } from 'next/navigation';

const PasswordResetPage = () => {
  const { resetPassword } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        setError('A apărut o eroare. Verificați adresa de email și încercați din nou.');
        console.error('Password reset error:', error);
      } else {
        setMessage('Un link de resetare a parolei a fost trimis la adresa de email. Verificați și căsuța de spam.');
        setTimeout(() => {
          router.push('/cont');
        }, 5000);
      }
    } catch (err) {
      setError('A apărut o eroare neașteptată. Încercați din nou mai târziu.');
      console.error('Unexpected error during password reset:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-[#f8f8f6]">
        <Navbar />
        
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8 text-center">Resetare Parolă</h1>
              
              <GlassCard accent="gold" className="p-8">
                {message ? (
                  <div className="text-center">
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
                      {message}
                    </div>
                    <p className="text-[#404040] mb-4">Veți fi redirecționat către pagina de autentificare în câteva secunde...</p>
                  </div>
                ) : (
                  <>
                    <p className="text-[#404040] mb-6">
                      Introduceți adresa de email asociată contului dvs. și vă vom trimite un link pentru resetarea parolei.
                    </p>
                    
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-[#404040] text-sm mb-2">
                          Adresă de Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#e6e5e3] text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#8a7d65]"
                          placeholder="exemplu@email.com"
                          required
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full py-3 bg-[#8a7d65] text-white rounded-full hover:bg-[#8a7d65]/90 transition-colors font-medium"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Se procesează...' : 'Trimite link de resetare'}
                      </button>
                    </form>
                  </>
                )}
              </GlassCard>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
};

export default PasswordResetPage; 
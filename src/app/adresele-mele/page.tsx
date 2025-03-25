'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import { useAuth } from '@/lib/authContext';
import { Address, getUserAddresses, createAddress, updateAddress, deleteAddress, setDefaultAddress } from '@/lib/api/addresses';
import Link from 'next/link';

// Types for form state
type AddressFormState = Omit<Address, 'id' | 'user_id' | 'created_at' | 'updated_at'>;

// Initial form state
const initialAddressForm: AddressFormState = {
  name: '',
  address_line1: '',
  address_line2: '',
  city: '',
  county: '',
  postal_code: '',
  phone: '',
  is_default: false
};

// Custom PageHeader wrapper
const AddressesPageHeader = () => {
  return (
    <div className="relative py-20 bg-[#f0efed]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-[#404040] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Adresele Mele
          </motion.h1>
          
          <motion.p 
            className="text-xl text-[#696969]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Gestionează adresele tale de livrare și facturare
          </motion.p>
        </div>
      </div>
    </div>
  );
};

const AddressesPage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [addressForm, setAddressForm] = useState<AddressFormState>(initialAddressForm);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  
  // Fetch addresses when component mounts
  useEffect(() => {
    // Only fetch if user is logged in
    if (user) {
      fetchAddresses();
    } else if (!isLoading && !user) {
      // Redirect to login if not logged in
      router.push('/cont');
    }
  }, [user, isLoading, router]);
  
  // Fetch addresses
  const fetchAddresses = async () => {
    try {
      const data = await getUserAddresses();
      setAddresses(data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };
  
  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!addressForm.name.trim()) {
      errors.name = 'Numele este obligatoriu';
    }
    
    if (!addressForm.address_line1.trim()) {
      errors.address_line1 = 'Adresa este obligatorie';
    }
    
    if (!addressForm.city.trim()) {
      errors.city = 'Orașul este obligatoriu';
    }
    
    if (!addressForm.county.trim()) {
      errors.county = 'Județul este obligatoriu';
    }
    
    if (!addressForm.postal_code.trim()) {
      errors.postal_code = 'Codul poștal este obligatoriu';
    }
    
    if (!addressForm.phone.trim()) {
      errors.phone = 'Telefonul este obligatoriu';
    } else if (!/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/.test(addressForm.phone)) {
      errors.phone = 'Numărul de telefon nu este valid';
    }
    
    setFormErrors(errors);
    
    return Object.keys(errors).length === 0;
  };
  
  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (currentAddress) {
        // Update existing address
        await updateAddress(currentAddress.id!, addressForm);
      } else {
        // Create new address
        await createAddress(addressForm);
      }
      
      // Reset form and close modal
      setAddressForm(initialAddressForm);
      setCurrentAddress(null);
      setIsAddressModalOpen(false);
      
      // Refresh addresses
      fetchAddresses();
    } catch (error) {
      console.error('Error saving address:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Open address form for editing
  const handleEditAddress = (address: Address) => {
    setCurrentAddress(address);
    setAddressForm({
      name: address.name,
      address_line1: address.address_line1,
      address_line2: address.address_line2 || '',
      city: address.city,
      county: address.county,
      postal_code: address.postal_code,
      phone: address.phone,
      is_default: !!address.is_default
    });
    setIsAddressModalOpen(true);
  };
  
  // Open new address form
  const handleAddAddress = () => {
    setCurrentAddress(null);
    setAddressForm(initialAddressForm);
    setIsAddressModalOpen(true);
  };
  
  // Delete an address
  const handleDeleteAddress = async () => {
    if (!addressToDelete) return;
    
    try {
      await deleteAddress(addressToDelete);
      setAddressToDelete(null);
      
      // Refresh addresses
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };
  
  // Set an address as default
  const handleSetDefault = async (id: string) => {
    try {
      await setDefaultAddress(id);
      
      // Refresh addresses
      fetchAddresses();
    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };
  
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-[#f8f8f6]">
        <Navbar />
        
        <AddressesPageHeader />
        
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#404040]">Adresele Tale</h2>
              
              <button 
                onClick={handleAddAddress}
                className="px-6 py-2 bg-[#8a7d65] text-white rounded-full hover:bg-[#8a7d65]/90 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Adaugă adresă
              </button>
            </div>
            
            {addresses.length === 0 ? (
              <GlassCard className="p-8 text-center">
                <p className="text-[#696969] mb-4">Nu ai nicio adresă salvată.</p>
                <button 
                  onClick={handleAddAddress}
                  className="px-6 py-2 bg-[#8a7d65] text-white rounded-full hover:bg-[#8a7d65]/90 transition-colors inline-flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Adaugă prima adresă
                </button>
              </GlassCard>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address) => (
                  <GlassCard 
                    key={address.id} 
                    className="p-6 relative"
                    accent={address.is_default ? 'gold' : 'light'}
                  >
                    {address.is_default && (
                      <span className="absolute top-4 right-4 bg-[#8a7d65] text-white text-xs px-2 py-1 rounded-full">
                        Implicită
                      </span>
                    )}
                    
                    <h3 className="text-xl font-bold text-[#404040] mb-1">{address.name}</h3>
                    
                    <div className="text-[#696969] space-y-1 mb-4">
                      <p>{address.address_line1}</p>
                      {address.address_line2 && <p>{address.address_line2}</p>}
                      <p>{address.city}, {address.county}</p>
                      <p>{address.postal_code}</p>
                      <p>{address.phone}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <button 
                        onClick={() => handleEditAddress(address)}
                        className="px-4 py-1 border border-[#8a7d65] text-[#8a7d65] rounded-full hover:bg-[#8a7d65]/10 transition-colors text-sm"
                      >
                        Editează
                      </button>
                      
                      {!address.is_default && (
                        <button 
                          onClick={() => handleSetDefault(address.id!)}
                          className="px-4 py-1 border border-[#8a7d65] text-[#8a7d65] rounded-full hover:bg-[#8a7d65]/10 transition-colors text-sm"
                        >
                          Setează ca implicită
                        </button>
                      )}
                      
                      <button 
                        onClick={() => setAddressToDelete(address.id!)}
                        className="px-4 py-1 border border-red-300 text-red-500 rounded-full hover:bg-red-50 transition-colors text-sm"
                      >
                        Șterge
                      </button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Navigation back to account */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            <Link 
              href="/cont"
              className="inline-flex items-center text-[#8a7d65] hover:underline"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Înapoi la contul meu
            </Link>
          </div>
        </section>
        
        {/* Address Form Modal */}
        {isAddressModalOpen && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-[#404040]">
                    {currentAddress ? 'Editează adresa' : 'Adaugă adresă nouă'}
                  </h3>
                  
                  <button 
                    onClick={() => setIsAddressModalOpen(false)}
                    className="text-[#696969] hover:text-[#404040]"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#404040] mb-1">
                        Nume complet
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={addressForm.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${formErrors.name ? 'border-red-500' : 'border-[#e6e5e3]'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8a7d65]`}
                        placeholder="Nume și prenume"
                      />
                      {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="address_line1" className="block text-sm font-medium text-[#404040] mb-1">
                        Adresa
                      </label>
                      <input
                        type="text"
                        id="address_line1"
                        name="address_line1"
                        value={addressForm.address_line1}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${formErrors.address_line1 ? 'border-red-500' : 'border-[#e6e5e3]'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8a7d65]`}
                        placeholder="Strada, număr"
                      />
                      {formErrors.address_line1 && <p className="mt-1 text-sm text-red-500">{formErrors.address_line1}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="address_line2" className="block text-sm font-medium text-[#404040] mb-1">
                        Adresa (linia 2) <span className="text-[#696969]">(opțional)</span>
                      </label>
                      <input
                        type="text"
                        id="address_line2"
                        name="address_line2"
                        value={addressForm.address_line2}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-[#e6e5e3] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8a7d65]"
                        placeholder="Apartament, bloc, scară, etaj etc."
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-[#404040] mb-1">
                          Oraș
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={addressForm.city}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${formErrors.city ? 'border-red-500' : 'border-[#e6e5e3]'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8a7d65]`}
                          placeholder="Oraș"
                        />
                        {formErrors.city && <p className="mt-1 text-sm text-red-500">{formErrors.city}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="county" className="block text-sm font-medium text-[#404040] mb-1">
                          Județ
                        </label>
                        <input
                          type="text"
                          id="county"
                          name="county"
                          value={addressForm.county}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${formErrors.county ? 'border-red-500' : 'border-[#e6e5e3]'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8a7d65]`}
                          placeholder="Județ"
                        />
                        {formErrors.county && <p className="mt-1 text-sm text-red-500">{formErrors.county}</p>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="postal_code" className="block text-sm font-medium text-[#404040] mb-1">
                          Cod poștal
                        </label>
                        <input
                          type="text"
                          id="postal_code"
                          name="postal_code"
                          value={addressForm.postal_code}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${formErrors.postal_code ? 'border-red-500' : 'border-[#e6e5e3]'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8a7d65]`}
                          placeholder="Cod poștal"
                        />
                        {formErrors.postal_code && <p className="mt-1 text-sm text-red-500">{formErrors.postal_code}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-[#404040] mb-1">
                          Telefon
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={addressForm.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${formErrors.phone ? 'border-red-500' : 'border-[#e6e5e3]'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8a7d65]`}
                          placeholder="Telefon"
                        />
                        {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="is_default"
                        name="is_default"
                        checked={addressForm.is_default}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#8a7d65] rounded border-[#e6e5e3] focus:ring-[#8a7d65]"
                      />
                      <label htmlFor="is_default" className="ml-2 block text-sm text-[#404040]">
                        Setează ca adresă implicită
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setIsAddressModalOpen(false)}
                      className="px-6 py-2 border border-[#e6e5e3] text-[#696969] rounded-full hover:bg-[#f0efed] transition-colors"
                    >
                      Anulează
                    </button>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-[#8a7d65] text-white rounded-full hover:bg-[#8a7d65]/90 transition-colors"
                    >
                      {isSubmitting ? 'Se salvează...' : 'Salvează adresa'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        
        {/* Delete Confirmation Modal */}
        {addressToDelete && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-[#404040] mb-4">Confirmă ștergerea</h3>
              
              <p className="text-[#696969] mb-6">
                Ești sigur că vrei să ștergi această adresă? Această acțiune nu poate fi anulată.
              </p>
              
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setAddressToDelete(null)}
                  className="px-6 py-2 border border-[#e6e5e3] text-[#696969] rounded-full hover:bg-[#f0efed] transition-colors"
                >
                  Anulează
                </button>
                
                <button
                  onClick={handleDeleteAddress}
                  className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  Șterge
                </button>
              </div>
            </div>
          </div>
        )}
        
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
};

export default AddressesPage; 
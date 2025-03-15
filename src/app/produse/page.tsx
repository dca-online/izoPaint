'use client';
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Space_Grotesk, Bebas_Neue } from 'next/font/google';
import { Product } from '@/types/product';
import { useRouter, useSearchParams } from 'next/navigation';
import CategoryOverlay from '@/components/CategoryOverlay';
import CategoryDropdown from '@/components/CategoryDropdown';
import { PhotoIcon } from '@heroicons/react/24/outline';

// Using the same font as in other components
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

// Add Bebas Neue font 
const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

// Add CSS for hiding scrollbars across browsers
const scrollbarHideStyles = {
  scrollbarWidth: 'none' as const, // Firefox
  msOverflowStyle: 'none' as const, // IE/Edge
};

const scrollbarHideClass = `
  ::-webkit-scrollbar {
    display: none;
  }
`;

// In a real application, this would be fetched from an API
const fetchProducts = async (): Promise<Product[]> => {
  // All product slugs
  const slugs = [
    // ELF Decor products
    'illusion-crystal',
    'elf-decor-1', 'elf-decor-2', 'elf-decor-3', 'elf-decor-4',
    'elf-decor-5', 'elf-decor-6', 'elf-decor-7',
    
    // Vopsele interior products
    'vopsea-interior-1', 'vopsea-interior-2', 'vopsea-interior-3',
    'vopsea-interior-4', 'vopsea-interior-5', 'vopsea-interior-6',
    
    // Amorse interior products
    'amorsa-interior-1', 'amorsa-interior-2', 'amorsa-interior-3', 'amorsa-interior-4',
    
    // Vopsele & Amorse exterior products
    'vopsea-exterior-1', 'vopsea-exterior-2', 'vopsea-exterior-3', 'vopsea-exterior-4',
    
    // Tencuieli/Amorse exterior products
    'tencuiala-1', 'tencuiala-2', 'tencuiala-3', 'tencuiala-4', 'tencuiala-5', 'tencuiala-6',
    'tencuiala-7', 'tencuiala-8', 'tencuiala-9', 'tencuiala-10', 'tencuiala-11', 'tencuiala-12',
    
    // Vopsele epoxidice products
    'vopsea-epoxidica-1', 'vopsea-epoxidica-2', 'vopsea-epoxidica-3', 'vopsea-epoxidica-4',
    'vopsea-epoxidica-5', 'vopsea-epoxidica-6', 'vopsea-epoxidica-7', 'vopsea-epoxidica-8',
    
    // Vopsele pentru lemn/metal products
    'vopsea-lemn-metal-1', 'vopsea-lemn-metal-2', 'vopsea-lemn-metal-3', 'vopsea-lemn-metal-4',
    'vopsea-lemn-metal-5', 'vopsea-lemn-metal-6', 'vopsea-lemn-metal-7', 'vopsea-lemn-metal-8',
    
    // Protectia lemnului products
    'protectie-lemn-1', 'protectie-lemn-2', 'protectie-lemn-3', 'protectie-lemn-4', 'protectie-lemn-5'
  ];
  
  const productsPromises = slugs.map(async (slug) => {
    const response = await fetch(`/api/products/${slug}`);
    if (!response.ok) return null;
    return response.json();
  });
  
  const products = await Promise.all(productsPromises);
  return products.filter(Boolean) as Product[];
};

// Update the mock database reference for generating product URLs
const productsDatabase: Record<string, { id: string }> = {
  // ELF Decor products
  'illusion-crystal': { id: 'illusion-crystal' },
  'elf-decor-1': { id: '1' },
  'elf-decor-2': { id: '2' },
  'elf-decor-3': { id: '3' },
  'elf-decor-4': { id: '4' },
  'elf-decor-5': { id: '5' },
  'elf-decor-6': { id: '6' },
  'elf-decor-7': { id: '7' },
  
  // Vopsele interior products
  'vopsea-interior-1': { id: '8' },
  'vopsea-interior-2': { id: '9' },
  'vopsea-interior-3': { id: '10' },
  'vopsea-interior-4': { id: '11' },
  'vopsea-interior-5': { id: '12' },
  'vopsea-interior-6': { id: '13' },
  
  // Amorse interior products
  'amorsa-interior-1': { id: '14' },
  'amorsa-interior-2': { id: '15' },
  'amorsa-interior-3': { id: '16' },
  'amorsa-interior-4': { id: '17' },
  
  // Vopsele & Amorse exterior products
  'vopsea-exterior-1': { id: '18' },
  'vopsea-exterior-2': { id: '19' },
  'vopsea-exterior-3': { id: '20' },
  'vopsea-exterior-4': { id: '21' },
  
  // Tencuieli/Amorse exterior products
  'tencuiala-1': { id: '22' },
  'tencuiala-2': { id: '23' },
  'tencuiala-3': { id: '24' },
  'tencuiala-4': { id: '25' },
  'tencuiala-5': { id: '26' },
  'tencuiala-6': { id: '27' },
  'tencuiala-7': { id: '28' },
  'tencuiala-8': { id: '29' },
  'tencuiala-9': { id: '30' },
  'tencuiala-10': { id: '31' },
  'tencuiala-11': { id: '32' },
  'tencuiala-12': { id: '33' },
  
  // Vopsele epoxidice products
  'vopsea-epoxidica-1': { id: '34' },
  'vopsea-epoxidica-2': { id: '35' },
  'vopsea-epoxidica-3': { id: '36' },
  'vopsea-epoxidica-4': { id: '37' },
  'vopsea-epoxidica-5': { id: '38' },
  'vopsea-epoxidica-6': { id: '39' },
  'vopsea-epoxidica-7': { id: '40' },
  'vopsea-epoxidica-8': { id: '41' },
  
  // Vopsele pentru lemn/metal products
  'vopsea-lemn-metal-1': { id: '42' },
  'vopsea-lemn-metal-2': { id: '43' },
  'vopsea-lemn-metal-3': { id: '44' },
  'vopsea-lemn-metal-4': { id: '45' },
  'vopsea-lemn-metal-5': { id: '46' },
  'vopsea-lemn-metal-6': { id: '47' },
  'vopsea-lemn-metal-7': { id: '48' },
  'vopsea-lemn-metal-8': { id: '49' },
  
  // Protectia lemnului products
  'protectie-lemn-1': { id: '50' },
  'protectie-lemn-2': { id: '51' },
  'protectie-lemn-3': { id: '52' },
  'protectie-lemn-4': { id: '53' },
  'protectie-lemn-5': { id: '54' },

  // IZOLATII ECO-FRIENDLY products
  'izolatie-celuloza': { id: '101' },
  'izolatie-fibra-lemn': { id: '102' },
  'izolatie-fibra-canepa': { id: '103' },
  'izolatie-iuta': { id: '104' },
  'izolatie-lana': { id: '105' },
  'izolatie-pluta': { id: '106' },
  'izolatie-vata-minerala-vrac': { id: '107' },
  'izolatie-perlit': { id: '108' },
  'izolatie-fibra-minerala': { id: '109' },
  'izolatie-granule-polistiren': { id: '110' },
  
  // MATERIALE HIDROIZOLANTE products
  'aquamat-mortar-hidroizolant': { id: '201' },
  'aquamat-elastic-bicomponent': { id: '202' },
  'aquamat-flex-bicomponent': { id: '203' },
  'aquamat-monoelastic-fibre': { id: '204' },
  'aquamat-sr-sulfatice': { id: '205' },
  'isoflex-pu-560-bt': { id: '206' },
  
  // ADEZIVI&CHITURI products
  'isomat-ak-9': { id: '301' },
  'isomat-ak-14': { id: '302' },
  'isomat-ak-16': { id: '303' },
  'isomat-ak-20': { id: '304' },
  'isomat-ak-22': { id: '305' },
  'isomat-ak-25': { id: '306' },
  'isomat-ak-rapid': { id: '307' },
  'isomat-ak-rapid-flex': { id: '308' },
  'isomat-ak-megarapid': { id: '309' },
  'isomat-ak-stone': { id: '310' },
  'isomat-ak-marble': { id: '311' },
  'isomat-ak-parquet': { id: '312' },
  'montage-w': { id: '313' },
  'superbond-pu': { id: '314' }
};

// Define interfaces for card data types
interface SubcategoryCard {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

interface MainCategoryCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  gradient: string;
  icon: string;
}

// Create a client component that uses useSearchParams
function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('categorie');
  const subcategoryParam = searchParams.get('subcategorie');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(() => {
    // If category param is present, use it
    if (categoryParam) return categoryParam;
    // Default to null if no category is selected
    return null;
  });
  const [mainCategory, setMainCategory] = useState<string | null>(
    categoryParam === 'vopsele' ? 'vopsele' :
    categoryParam === 'izolatii' ? 'izolatii' : null
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [showCategoryOverlay, setShowCategoryOverlay] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    subcategoryParam || null
  );
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Update the subcategories based on the main category selection
  const updateSubcategories = (productsData: Product[], category: 'vopsele' | 'izolatii' | null) => {
    const uniqueCategories = new Set<string>();
    
    // Define the fixed subcategories for vopsele
    const vopseleSubcategories = [
      'ELF Decor',
      'Vopsele interior',
      'Amorse interior',
      'Vopsele & Amorse exterior',
      'Tencuieli/Amorse exterior',
      'Vopsele epoxidice',
      'Vopsele pentru lemn/metal',
      'Protectia lemnului'
    ];
    
    // Define the fixed subcategories for izolatii
    const izolatiiSubcategories = [
      'IZOLATII ECO-FRIENDLY',
      'MATERIALE HIDROIZOLANTE',
      'ADEZIVI&CHITURI'
    ];
    
    // Filter products by main category first
    if (category === 'vopsele') {
      vopseleSubcategories.forEach(cat => uniqueCategories.add(cat));
    } else if (category === 'izolatii') {
      izolatiiSubcategories.forEach(cat => uniqueCategories.add(cat));
    }
    
    return Array.from(uniqueCategories);
  };

  // Load products from API
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch actual products from the API
      const slugs = [
        // ELF Decor products
        'illusion-crystal',
        'elf-decor-1', 'elf-decor-2', 'elf-decor-3', 'elf-decor-4',
        'elf-decor-5', 'elf-decor-6', 'elf-decor-7',
        
        // Vopsele interior products
        'vopsea-interior-1', 'vopsea-interior-2', 'vopsea-interior-3',
        'vopsea-interior-4', 'vopsea-interior-5', 'vopsea-interior-6',
        
        // Amorse interior products
        'amorsa-interior-1', 'amorsa-interior-2', 'amorsa-interior-3', 'amorsa-interior-4',
        
        // Vopsele & Amorse exterior products
        'vopsea-exterior-1', 'vopsea-exterior-2', 'vopsea-exterior-3', 'vopsea-exterior-4',
        
        // Tencuieli/Amorse exterior products
        'tencuiala-1', 'tencuiala-2', 'tencuiala-3', 'tencuiala-4', 'tencuiala-5', 'tencuiala-6',
        'tencuiala-7', 'tencuiala-8', 'tencuiala-9', 'tencuiala-10', 'tencuiala-11', 'tencuiala-12',
        
        // Vopsele epoxidice products
        'vopsea-epoxidica-1', 'vopsea-epoxidica-2', 'vopsea-epoxidica-3', 'vopsea-epoxidica-4',
        'vopsea-epoxidica-5', 'vopsea-epoxidica-6', 'vopsea-epoxidica-7', 'vopsea-epoxidica-8',
        
        // Vopsele pentru lemn/metal products
        'vopsea-lemn-metal-1', 'vopsea-lemn-metal-2', 'vopsea-lemn-metal-3', 'vopsea-lemn-metal-4',
        'vopsea-lemn-metal-5', 'vopsea-lemn-metal-6', 'vopsea-lemn-metal-7', 'vopsea-lemn-metal-8',
        
        // Protectia lemnului products
        'protectie-lemn-1', 'protectie-lemn-2', 'protectie-lemn-3', 'protectie-lemn-4', 'protectie-lemn-5',
        
        // IZOLATII ECO-FRIENDLY products
        'izolatie-celuloza', 'izolatie-fibra-lemn', 'izolatie-fibra-canepa', 'izolatie-iuta',
        'izolatie-lana', 'izolatie-pluta', 'izolatie-vata-minerala-vrac', 'izolatie-perlit',
        'izolatie-fibra-minerala', 'izolatie-granule-polistiren',
        
        // MATERIALE HIDROIZOLANTE products
        'aquamat-mortar-hidroizolant', 'aquamat-elastic-bicomponent', 'aquamat-flex-bicomponent',
        'aquamat-monoelastic-fibre', 'aquamat-sr-sulfatice', 'isoflex-pu-560-bt',
        
        // ADEZIVI&CHITURI products
        'isomat-ak-9', 'isomat-ak-14', 'isomat-ak-16', 'isomat-ak-20', 'isomat-ak-22',
        'isomat-ak-25', 'isomat-ak-rapid', 'isomat-ak-rapid-flex', 'isomat-ak-megarapid',
        'isomat-ak-stone', 'isomat-ak-marble', 'isomat-ak-parquet', 'montage-w', 'superbond-pu'
      ];
      
      const productsPromises = slugs.map(async (slug) => {
        try {
          const response = await fetch(`/api/products/${slug}`);
          if (!response.ok) return null;
          return await response.json();
        } catch (error) {
          console.error(`Error fetching product ${slug}:`, error);
          return null;
        }
      });
      
      const fetchedProducts = await Promise.all(productsPromises);
      const validProducts = fetchedProducts.filter(Boolean) as Product[];
      
      setProducts(validProducts);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Nu am putut încărca produsele. Vă rugăm încercați din nou.');
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  };

  // Initialize state tracking and URL parameters
  useEffect(() => {
    // Parse URL params
    const categoryParam = searchParams.get('categorie');
    const subcategoryParam = searchParams.get('subcategorie');
    
    // Set active category from URL or default to null
    setActiveCategory(categoryParam);
    
    // Also update mainCategory if it's one of the main categories
    if (categoryParam === 'vopsele' || categoryParam === 'izolatii') {
      setMainCategory(categoryParam);
    } else {
      setMainCategory(null);
    }
    
    // Set selected subcategory from URL
    setSelectedSubcategory(subcategoryParam);
    
    // Only load products if a subcategory is selected
    if (subcategoryParam) {
      loadProducts();
    } else {
      // If no subcategory is selected, clear products and set loading to false
      setProducts([]);
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, [searchParams]);

  // Update categories when products are loaded
  useEffect(() => {
    if (products.length > 0) {
      // Get categories for the current activeCategory
      const categoryList = updateSubcategories(products, activeCategory as 'vopsele' | 'izolatii' | null);
      setCategories(categoryList);
    }
  }, [products, activeCategory]);

  // Function to handle subcategory card selection
  const handleSubcategoryCardSelect = (subcategory: string) => {
    // Map subcategory display names to URL params
    let urlParam = '';
    
    switch (subcategory) {
      // Vopsele subcategories
      case 'ELF Decor':
        urlParam = 'elf-decor';
        break;
      case 'Vopsele interior':
        urlParam = 'vopsele-interior';
        break;
      case 'Amorse interior':
        urlParam = 'amorse-interior';
        break;
      case 'Vopsele & Amorse exterior':
        urlParam = 'vopsele-exterior';
        break;
      case 'Tencuieli/Amorse exterior':
        urlParam = 'tencuieli-amorse-exterior';
        break;
      case 'Vopsele epoxidice':
        urlParam = 'vopsele-epoxidice';
        break;
      case 'Vopsele pentru lemn/metal':
        urlParam = 'vopsele-lemn-metal';
        break;
      case 'Protectia lemnului':
        urlParam = 'protectia-lemnului';
        break;
        
      // Insulation subcategories
      case 'IZOLATII ECO-FRIENDLY':
        urlParam = 'izolatii-eco-friendly';
        break;
      case 'MATERIALE HIDROIZOLANTE':
        urlParam = 'materiale-hidroizolante';
        break;
      case 'ADEZIVI&CHITURI':
        urlParam = 'adezivi-chituri';
        break;
    }

    // Set loading state to show the loader immediately
    setLoading(true);

    // Update local state right away to prevent UI lag
    setSelectedSubcategory(urlParam);
    
    // Construct URL with both main category and subcategory parameters
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('subcategorie', urlParam);
    
    // If we don't have a main category set in the URL, determine and set it
    if (!currentParams.has('categorie')) {
      // Determine main category from subcategory
      if (subcategory.includes('ELF Decor') || 
          subcategory.includes('Vopsele') || 
          subcategory.includes('Amorse') || 
          subcategory.includes('Tencuieli') ||
          subcategory.includes('epoxidice') ||
          subcategory.includes('lemn') ||
          subcategory.includes('Protectia')) {
        currentParams.set('categorie', 'vopsele');
      } else {
        currentParams.set('categorie', 'izolatii');
      }
    }
    
    const newUrl = `/produse?${currentParams.toString()}`;
    router.push(newUrl);
  };

  // Define category collections for filtering
  const vopseleMainCategories = [
    'vopsele', 
    'decorative', 
    'premium', 
    'interior', 
    'lavabile', 
    'ELF Decor',
    'Vopsele interior',
    'Amorse interior',
    'Vopsele & Amorse exterior',
    'Tencuieli/Amorse exterior',
    'Vopsele epoxidice',
    'Vopsele pentru lemn/metal',
    'Protectia lemnului'
  ];
  
  const izolatiiMainCategories = [
    'izolații', 
    'termice', 
    'exterior', 
    'eco',
    'IZOLATII ECO-FRIENDLY',
    'MATERIALE HIDROIZOLANTE',
    'ADEZIVI&CHITURI'
  ];

  // Get products filtered by subcategory and category
  const getFilteredProducts = () => {
    // If no products loaded yet, return empty array
    if (!products || products.length === 0) {
      return [];
    }
    
    console.log("Filtering products:");
    console.log("Active Category:", activeCategory);
    console.log("Selected Subcategory:", selectedSubcategory);
    console.log("Products Count:", products.length);
    
    // First get all products
    let filteredProducts = [...products];
    
    // Filter by main category if it's one of the main categories
    if (activeCategory === 'vopsele' || activeCategory === 'izolatii') {
      console.log(`Filtering by main category: ${activeCategory}`);
      filteredProducts = filteredProducts.filter(product => 
        product.categorii.some(cat => 
          cat.toLowerCase() === activeCategory.toLowerCase() ||
          (activeCategory === 'vopsele' && vopseleMainCategories.includes(cat)) ||
          (activeCategory === 'izolatii' && izolatiiMainCategories.includes(cat))
        )
      );
    }

    // Then filter by subcategory if applicable
    if (selectedSubcategory) {
      console.log(`Filtering by subcategory: ${selectedSubcategory}`);
      
      // Map URL param back to subcategory display name
      const subcategoryName = getSubcategoryDisplayName(selectedSubcategory);
      
      console.log(`Mapped to display name: ${subcategoryName}`);
      
      if (subcategoryName) {
        filteredProducts = filteredProducts.filter(product => {
          const hasSubcategory = product.subcategorii && 
            product.subcategorii.some(subcat => subcat === subcategoryName);
          
          console.log(`Product ${product.id} (${product.titlu}) has subcategory ${subcategoryName}: ${hasSubcategory}`);
          if (hasSubcategory) {
            console.log(`Subcategories: ${product.subcategorii.join(', ')}`);
          }
          
          return hasSubcategory;
        });
      }
    }

    // Apply search filter if search term exists
    if (searchTerm) {
      const searchString = searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(product => {
        return (
          product.titlu.toLowerCase().includes(searchString) ||
          (product.descriere && product.descriere.toLowerCase().includes(searchString))
        );
      });
    }

    console.log(`Final filtered products count: ${filteredProducts.length}`);
    return filteredProducts;
  };

  // Helper function to get display name from URL param
  const getSubcategoryDisplayName = (urlParam: string): string => {
    switch (urlParam) {
      // Vopsele subcategories
      case 'elf-decor':
        return 'ELF Decor';
      case 'vopsele-interior':
        return 'Vopsele interior';
      case 'amorse-interior':
        return 'Amorse interior';
      case 'vopsele-exterior':
        return 'Vopsele & Amorse exterior';
      case 'tencuieli-amorse-exterior':
        return 'Tencuieli/Amorse exterior';
      case 'vopsele-epoxidice':
        return 'Vopsele epoxidice';
      case 'vopsele-lemn-metal':
        return 'Vopsele pentru lemn/metal';
      case 'protectia-lemnului':
        return 'Protectia lemnului';
        
      // Insulation subcategories
      case 'izolatii-eco-friendly':
        return 'IZOLATII ECO-FRIENDLY';
      case 'materiale-hidroizolante':
        return 'MATERIALE HIDROIZOLANTE';
      case 'adezivi-chituri':
        return 'ADEZIVI&CHITURI';
      default:
        return '';
    }
  };

  // The rest of the ProductsContent component...

  return (
    // The component JSX...
    <>
      {/* Category overlay */}
      {showCategoryOverlay && (
        <CategoryOverlay 
          isOpen={showCategoryOverlay}
          onClose={() => setShowCategoryOverlay(false)}
          onSelectCategory={(category: 'vopsele' | 'izolatii') => {
            setActiveCategory(category);
            router.push(`/produse?categorie=${encodeURIComponent(category)}`);
            setShowCategoryOverlay(false);
          }}
          preserveBackground={true}
        />
      )}

      {/* Main content */}
      <div className="pt-32 px-4 sm:px-8 lg:px-16 min-h-screen bg-[#f8f8f6]">
        <div className="container mx-auto">
          {/* Content sections */}
          {/* ... */}
          
          {/* Main categories view - shown when no category is selected */}
          {!activeCategory ? (
            <div className="py-16">
              <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl text-[#404040] mb-12 text-center`}>
                CATEGORII PRINCIPALE
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {mainCategoryCardsData.map((category, index) => (
                  <motion.div
                    key={category.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer group h-[500px]"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    onClick={() => {
                      router.push(`/produse?categorie=${category.id.toLowerCase()}`);
                    }}
                  >
                    <div className="relative h-72">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                      <div className="absolute bottom-0 w-full p-8">
                        <h3 className={`${spaceGrotesk.className} text-4xl text-white font-bold mb-0`}>
                          {category.title}
                        </h3>
                        <p className="text-white text-lg opacity-90 leading-tight">{category.subtitle}</p>
                      </div>
                    </div>
                    <div className="p-8">
                      <p className="text-[#696969] mb-6">{category.description}</p>
                      <div className="flex items-center text-[#8a7d65] font-medium group-hover:underline">
                        Vezi toate produsele
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Heading and dropdown section */}
              <div className="mb-8">
                <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl text-[#404040] mb-4`}>
                  {activeCategory === 'vopsele' ? 'VOPSELE' : 'IZOLAȚII'}
                </h1>
                <p className="text-xl text-[#696969] mb-6">
                  {activeCategory === 'vopsele' 
                    ? 'Explorează colecția noastră de vopsele premium pentru interior și exterior.' 
                    : 'Descoperă soluțiile noastre profesionale de izolare pentru proiectele tale.'}
                </p>
              </div>

              {/* Dropdown for mobile filtering */}
              <div className="mb-8">
                <CategoryDropdown 
                  currentCategory={activeCategory === 'vopsele' ? 'vopsele' : activeCategory === 'izolatii' ? 'izolatii' : 'toate'}
                  onCategoryChange={(category) => {
                    setActiveCategory(category);
                    setMainCategory(category);
                    router.push(`/produse?categorie=${encodeURIComponent(category)}`);
                  }}
                />
              </div>
              
              {/* Product List */}
              <div className="w-full pt-8 md:pt-12">
                {/* Display breadcrumb information for selected subcategory */}
                {selectedSubcategory && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-600">
                      <span 
                        className="cursor-pointer hover:text-[#8a7d65] hover:underline"
                        onClick={() => {
                          router.push(`/produse?categorie=${mainCategory}`);
                          setSelectedSubcategory(null);
                        }}
                      >
                        {mainCategory === 'vopsele' ? 'VOPSELE' : 'IZOLAȚII'}
                      </span> {'>'} {getSubcategoryDisplayName(selectedSubcategory)}
                    </p>
                    <h2 className="text-2xl font-bold mt-2">{getSubcategoryDisplayName(selectedSubcategory)}</h2>
                  </div>
                )}

                {/* Subcategory pills - only show when a subcategory is selected */}
                {mainCategory === 'vopsele' && selectedSubcategory && (
                  <div className="mb-8 overflow-x-auto" style={scrollbarHideStyles}>
                    <style jsx global>{scrollbarHideClass}</style>
                    <div className="flex space-x-2 pb-2 min-w-max">
                      {subcategoryCardsData.map((subcategory) => (
                        <button
                          key={subcategory.id}
                          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                            selectedSubcategory === subcategory.id
                              ? 'bg-[#8a7d65] text-white'
                              : 'bg-gray-100 text-[#404040] hover:bg-gray-200'
                          }`}
                          onClick={() => handleSubcategoryCardSelect(subcategory.title)}
                        >
                          {subcategory.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subcategory pills for IZOLATII - only show when a subcategory is selected */}
                {mainCategory === 'izolatii' && selectedSubcategory && (
                  <div className="mb-8 overflow-x-auto" style={scrollbarHideStyles}>
                    <style jsx global>{scrollbarHideClass}</style>
                    <div className="flex space-x-2 pb-2 min-w-max">
                      {izolationSubcategoryCardsData.map((subcategory) => (
                        <button
                          key={subcategory.id}
                          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                            selectedSubcategory === subcategory.id
                              ? 'bg-[#4A6741] text-white'
                              : 'bg-gray-100 text-[#404040] hover:bg-gray-200'
                          }`}
                          onClick={() => handleSubcategoryCardSelect(subcategory.title)}
                        >
                          {subcategory.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Display subcategory cards for main categories when no subcategory is selected */}
                {mainCategory === 'vopsele' && !selectedSubcategory && (
                  <div className="mb-8">
                    <h2 className={`${spaceGrotesk.className} text-3xl text-[#404040] mb-8`}>
                      SUBCATEGORII VOPSELE
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {subcategoryCardsData.map((subcategory, index) => (
                        <motion.div
                          key={subcategory.id}
                          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer h-72"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          onClick={() => handleSubcategoryCardSelect(subcategory.title)}
                        >
                          <div className="relative h-40">
                            <Image
                              src={subcategory.image}
                              alt={subcategory.title}
                              fill
                              className="object-cover"
                            />
                            <div 
                              className="absolute inset-0 opacity-40"
                              style={{ backgroundColor: subcategory.color }}
                            ></div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2 text-[#404040]">{subcategory.title}</h3>
                            <p className="text-sm text-[#696969] line-clamp-2">{subcategory.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Display subcategory cards for IZOLATII when no subcategory is selected */}
                {mainCategory === 'izolatii' && !selectedSubcategory && (
                  <div className="mb-8">
                    <h2 className={`${spaceGrotesk.className} text-3xl text-[#404040] mb-8`}>
                      SUBCATEGORII IZOLAȚII
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {izolationSubcategoryCardsData.map((subcategory, index) => (
                        <motion.div
                          key={subcategory.id}
                          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer h-72"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          onClick={() => handleSubcategoryCardSelect(subcategory.title)}
                        >
                          <div className="relative h-40">
                            <Image
                              src={subcategory.image}
                              alt={subcategory.title}
                              fill
                              className="object-cover"
                            />
                            <div 
                              className="absolute inset-0 opacity-40"
                              style={{ backgroundColor: subcategory.color }}
                            ></div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2 text-[#404040]">{subcategory.title}</h3>
                            <p className="text-sm text-[#696969] line-clamp-2">{subcategory.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Only display products when a subcategory is selected */}
                {selectedSubcategory && (
                  <>
                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-16">
                        <div className="relative">
                          {/* Outer ping animation */}
                          <div className="absolute -inset-1 rounded-full opacity-75 animate-ping bg-gradient-to-r from-[#8a7d65]/40 to-[#8a7d65]/70"></div>
                          {/* Spinning loader */}
                          <div className="relative h-16 w-16 rounded-full border-4 border-gray-200">
                            <div className="absolute inset-0 rounded-full border-4 border-t-[#8a7d65] border-r-transparent border-b-[#8a7d65]/70 border-l-transparent animate-spin"></div>
                          </div>
                        </div>
                        <p className="mt-6 text-lg font-medium text-[#696969]">Se încarcă produsele...</p>
                      </div>
                    ) : getFilteredProducts().length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-lg text-[#696969]">Nu am găsit produse în această categorie.</p>
                        {selectedSubcategory && (
                          <button 
                            onClick={() => {
                              setSelectedSubcategory(null);
                              router.push(`/produse?categorie=${mainCategory}`);
                            }}
                            className="mt-4 px-6 py-2 bg-[#8a7d65] text-white rounded-lg hover:bg-[#776d59] transition-colors"
                          >
                            Înapoi la {mainCategory === 'vopsele' ? 'VOPSELE' : 'IZOLAȚII'}
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {getFilteredProducts().map((product, index) => (
                          <Link href={`/produs/${product.id}`} key={product.id}>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                            >
                              {/* Product image */}
                              <div className="relative h-48 bg-gray-100">
                                {product.linkImagine ? (
                                  <Image
                                    src={product.linkImagine}
                                    alt={product.titlu}
                                    fill
                                    className="object-contain p-2"
                                  />
                                ) : (
                                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <PhotoIcon className="h-12 w-12" />
                                  </div>
                                )}
                              </div>
                              
                              {/* Product details */}
                              <div className="p-4 flex-grow flex flex-col">
                                <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-[#404040]">{product.titlu}</h3>
                                <p className="text-sm text-[#696969] mb-4 line-clamp-3">{product.descriereScurta}</p>
                                <div className="mt-auto">
                                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[#8a7d65]/10 text-[#8a7d65] hover:bg-[#8a7d65]/20 transition-colors">
                                    Vezi detalii
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#F5F5F5] pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div className="mb-8 md:mb-0">
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#404040] mb-2`}>
                Vopsele & Izolații
              </h3>
              <p className="text-[#1A1A1A] text-sm">
                Soluții complete pentru spații moderne
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <Link href="/" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                Acasă
              </Link>
              <Link href="/produse" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                Produse
              </Link>
              <Link href="/servicii" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                Servicii
              </Link>
              <Link href="/despre" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                Despre Noi
              </Link>
              <Link href="/contact" className="text-[#1A1A1A] hover:text-[#8a7d65] transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-[#696969]">
            © 2025 Vopsele & Izolații. Toate drepturile rezervate.
          </div>
        </div>
      </footer>
    </>
  );
}

// Define the subcategory cards data for vopsele
const subcategoryCardsData: SubcategoryCard[] = [
  {
    id: 'elf-decor',
    title: 'ELF Decor',
    description: 'Colecția noastră de vopsele decorative premium cu efecte speciale și finisaje unice pentru pereții tăi.',
    image: '/images/categories/elf-decor.jpg',
    color: '#8a7d65',
  },
  {
    id: 'vopsele-interior',
    title: 'Vopsele interior',
    description: 'Vopsele de înaltă calitate pentru interior, cu acoperire excelentă și rezistență la spălare.',
    image: '/images/categories/vopsele-interior.jpg',
    color: '#A67C52',
  },
  {
    id: 'amorse-interior',
    title: 'Amorse interior',
    description: 'Amorse profesionale pentru pregătirea suprafețelor interioare și asigurarea unei aderențe perfecte.',
    image: '/images/categories/amorse-interior.jpg',
    color: '#B3A999',
  },
  {
    id: 'vopsele-amorse-exterior',
    title: 'Vopsele & Amorse exterior',
    description: 'Soluții complete pentru protecția și finisarea fațadelor, cu rezistență ridicată la intemperii.',
    image: '/images/categories/vopsele-exterior.jpg',
    color: '#746D67',
  },
  {
    id: 'tencuieli-amorse-exterior',
    title: 'Tencuieli/Amorse exterior',
    description: 'Sisteme complete de tencuieli decorative și amorse pentru fațade, cu multiple texturi și efecte.',
    image: '/images/categories/tencuieli.jpg',
    color: '#9E8E7A',
  },
  {
    id: 'vopsele-epoxidice',
    title: 'Vopsele epoxidice',
    description: 'Vopsele epoxidice profesionale pentru pardoseli și suprafețe industriale, cu rezistență chimică și mecanică ridicată.',
    image: '/images/categories/vopsele-epoxidice.jpg',
    color: '#5D5C59',
  },
  {
    id: 'vopsele-lemn-metal',
    title: 'Vopsele pentru lemn/metal',
    description: 'Vopsele și emailuri de calitate superioară pentru protecția și decorarea suprafețelor din lemn și metal.',
    image: '/images/categories/vopsele-lemn-metal.jpg',
    color: '#A38F75',
  },
  {
    id: 'protectia-lemnului',
    title: 'Protectia lemnului',
    description: 'Produse specializate pentru protecția și întreținerea lemnului, de la lacuri și lazuri până la uleiuri și ceruri.',
    image: '/images/categories/protectia-lemnului.jpg',
    color: '#7D6E59',
  },
];

// Define insulation subcategory cards data
const izolationSubcategoryCardsData: SubcategoryCard[] = [
  {
    id: 'izolatii-eco-friendly',
    title: 'IZOLATII ECO-FRIENDLY',
    description: 'Soluții de izolare termică și fonică ecologice, realizate din materiale sustenabile și prietenoase cu mediul.',
    image: '/images/categories/izolatii-eco.jpg',
    color: '#4D724D', // Green for eco-friendly
  },
  {
    id: 'materiale-hidroizolante',
    title: 'MATERIALE HIDROIZOLANTE',
    description: 'Produse de înaltă calitate pentru impermeabilizarea și protecția împotriva umezelii și infiltrațiilor de apă.',
    image: '/images/categories/hidroizolante.jpg',
    color: '#2E5984', // Blue for waterproofing
  },
  {
    id: 'adezivi-chituri',
    title: 'ADEZIVI&CHITURI',
    description: 'Materiale de construcție pentru fixarea și etanșarea elementelor de zidărie, gresie, faianță și alte suprafețe.',
    image: '/images/categories/adezivi-chituri.jpg',
    color: '#6E6E6E', // Grey for construction materials
  },
];

// Define the main category cards data
const mainCategoryCardsData: MainCategoryCard[] = [
  {
    id: 'vopsele',
    title: 'VOPSELE',
    subtitle: 'tencuieli si produse decorative',
    description: 'Colecția noastră de vopsele premium pentru interior și exterior, tencuieli decorative și produse pentru protecția suprafețelor. Descoperă soluții profesionale pentru orice suprafață și proiect.',
    image: '/images/categories/vopsele-main.jpg',
    color: '#8a7d65',
    gradient: 'from-[#8a7d65]/30 to-[#8a7d65]/90',
    icon: '🎨'
  },
  {
    id: 'izolatii',
    title: 'IZOLAȚII',
    subtitle: 'adezivi, chituri si hidroizolanti',
    description: 'Sisteme complete de izolație termică, fonică și hidroizolație, adezivi și chituri pentru diferite suprafețe și aplicații. Materiale de calitate superioară pentru rezultate durabile.',
    image: '/images/categories/izolatii-main.jpg',
    color: '#4A6741',
    gradient: 'from-[#4A6741]/30 to-[#4A6741]/90',
    icon: '🏗️'
  }
];

// Main component that wraps the client component in Suspense
export default function ProductsPage() {
  return (
    <main className="min-h-screen relative bg-[#f8f8f6]">
      <Navbar />
      <Suspense fallback={
        // Using a full-page layout similar to our header with a loading spinner below
        <>
          <div className="pt-32 px-4 sm:px-8 lg:px-16 min-h-screen bg-[#f8f8f6]">
            <div className="container mx-auto">
              <div className="max-w-3xl mb-16">
                <div className="h-16 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="h-24 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
              
              <div className="py-24 flex items-center justify-center">
                <div className="relative w-16 h-16">
                  <div className="absolute w-full h-full border-4 border-[#8a7d65]/20 rounded-full animate-ping"></div>
                  <div className="absolute w-full h-full border-4 border-t-[#8a7d65] rounded-full animate-spin"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      }>
        <ProductsContent />
      </Suspense>
    </main>
  );
} 
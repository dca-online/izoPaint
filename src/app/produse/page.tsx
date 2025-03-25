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
import { PhotoIcon } from '@heroicons/react/24/outline';
import ErrorFallbackImage from '@/components/ErrorFallbackImage';
import CategorySwitcher from '@/components/CategorySwitcher';
import ProductCardBackground from '@/components/ProductCardBackground';
import PageVideoBackground from '@/components/PageVideoBackground';
import SubcategoryScroller from '@/components/SubcategoryScroller';
import ProductScroller from '@/components/ProductScroller';

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
const fetchProducts = async (category?: string, subcategory?: string): Promise<Product[]> => {
  // Use the optimized batch endpoint instead of fetching all products individually
  let apiUrl = '/api/products/batch?';
  const queryParams = new URLSearchParams();
  
  // Add category filter if provided
  if (category) {
    queryParams.append('category', category);
  }
  
  // Add subcategory filter if provided
  if (subcategory) {
    queryParams.append('subcategory', subcategory);
  }
  
  // Default to ELF Decor if no filters are provided (for demo purposes)
  if (!queryParams.toString()) {
    queryParams.append('category', 'elf-decor');
  }
  
  apiUrl += queryParams.toString();
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      return [];
    }
    
    // API now returns an array directly
    const data = await response.json();
    return data as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Update the mock database reference for generating product URLs
const productsDatabase: Record<string, { id: string }> = {
  // ELF Decor products
  'illusion-crystal': { id: 'illusion-crystal' },
  'persia': { id: 'persia' },
  'sahara': { id: 'sahara' },
  'feerie': { id: 'feerie' },
  'mirage': { id: 'mirage' },
  'grotto': { id: 'grotto' },
  'toscana': { id: 'toscana' },
  'pigment-decotoner': { id: 'pigment-decotoner' },
  
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
  const [mainCategory, setMainCategory] = useState<'vopsele' | 'izolatii' | null>(() => {
    if (categoryParam === 'vopsele') return 'vopsele';
    if (categoryParam === 'izolatii') return 'izolatii';
    return null;
  });
  const [showCategoryOverlay, setShowCategoryOverlay] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    subcategoryParam || null
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [subcategories, setSubcategories] = useState<SubcategoryCard[]>([]);

  // Update the subcategories based on the main category selection with specific ordering
  const updateSubcategories = (productsData: Product[], category: 'vopsele' | 'izolatii' | null) => {
    if (!category) {
      setSubcategories([]);
      return;
    }

    // Create sets for unique subcategories
    const uniqueSubcategories = new Set<string>();
    
    // Add default subcategories based on category
    if (category === 'vopsele') {
      ['ELF Decor', 'Vopsele interior', 'Amorse interior', 'Vopsele & Amorse exterior', 
       'Tencuieli/Amorse exterior', 'Vopsele epoxidice', 'Vopsele pentru lemn/metal', 
       'Protectia lemnului'].forEach(sub => uniqueSubcategories.add(sub));
    } else if (category === 'izolatii') {
      ['IZOLATII ECO-FRIENDLY', 'MATERIALE HIDROIZOLANTE', 'ADEZIVI&CHITURI'].forEach(sub => 
        uniqueSubcategories.add(sub));
    }
    
    // Add subcategories from products if available
    if (productsData && productsData.length > 0) {
      productsData.forEach(product => {
        // Check if product has subcategorii property
        if (product.subcategorii && Array.isArray(product.subcategorii)) {
          product.subcategorii.forEach(subcategory => {
            if (subcategory) {
              uniqueSubcategories.add(subcategory);
            }
          });
        } else if (product.categorii && Array.isArray(product.categorii)) {
          // Fallback to categorii if subcategorii is not available
          product.categorii.forEach(cat => {
            if (
              (category === 'vopsele' && vopseleMainCategories.includes(cat)) ||
              (category === 'izolatii' && izolatiiMainCategories.includes(cat))
            ) {
              uniqueSubcategories.add(cat);
            }
          });
        }
      });
    }

    // Map subcategories to cards
    const subcategoryCards: SubcategoryCard[] = Array.from(uniqueSubcategories).map(subcat => {
      const urlParam = subcat.toLowerCase()
        .replace(/\s+/g, '-')       // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, '')   // Remove any non-word or non-hyphen characters
        .replace(/\-\-+/g, '-')     // Replace multiple hyphens with single hyphen
        .replace(/^-+/, '')         // Trim hyphens from start
        .replace(/-+$/, '');        // Trim hyphens from end

      // Use Illusion Crystal as the image for the ELF Decor subcategory
      const subcategoryImage = subcat === 'ELF Decor' 
        ? '/images/vopsele/elf-decor/illusion-crystal/illusionCrystal.png'
        : '/images/subcategory-placeholder.svg';

      return {
        id: urlParam,
        title: subcat,
        description: `Produse din categoria ${subcat}`,
        image: subcategoryImage,
        color: `var(--subcategory-${Math.floor(Math.random() * 5) + 1})` // Random color from predefined variables
      };
    });

    // Define the specific order for vopsele subcategories
    if (category === 'vopsele') {
      const vopseleOrder = [
        'ELF Decor',
        'Vopsele interior',
        'Amorse interior',
        'Vopsele & Amorse exterior',
        'Tencuieli/Amorse exterior',
        'Vopsele epoxidice',
        'Vopsele pentru lemn/metal',
        'Protectia lemnului'
      ];
      
      // Sort subcategories according to the defined order
      subcategoryCards.sort((a, b) => {
        const indexA = vopseleOrder.indexOf(a.title);
        const indexB = vopseleOrder.indexOf(b.title);
        
        // If both subcategories are in our ordered list, sort by their position
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        
        // If only one is in the list, prioritize the one in the list
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        
        // If neither is in the list, sort alphabetically
        return a.title.localeCompare(b.title);
      });
    } else if (category === 'izolatii') {
      // Define order for izolatii subcategories
      const izolatiiOrder = [
        'IZOLATII ECO-FRIENDLY',
        'MATERIALE HIDROIZOLANTE',
        'ADEZIVI&CHITURI'
      ];
      
      // Sort izolatii subcategories
      subcategoryCards.sort((a, b) => {
        const indexA = izolatiiOrder.indexOf(a.title);
        const indexB = izolatiiOrder.indexOf(b.title);
        
        // If both subcategories are in our ordered list, sort by their position
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        
        // If only one is in the list, prioritize the one in the list
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        
        // If neither is in the list, sort alphabetically
        return a.title.localeCompare(b.title);
      });
    }

    console.log(`Updated subcategories for ${category}:`, subcategoryCards);
    setSubcategories(subcategoryCards);
  };

  // Fix the loadProducts function to accept a category parameter
  const loadProducts = async (categoryOverride?: string) => {
    setLoading(true);
    
    try {
      // Determine which category to load
      const categoryToLoad = categoryOverride || activeCategory;
      console.log(`Loading products for category: ${categoryToLoad}`);
      
      // Fetch products for each main category directly from productsDatabase
      // This is a client-side filter approach since we don't have a batch endpoint
      let allProducts = [];
      
      // This simulates the batch API by making individual requests
      if (categoryToLoad === 'vopsele') {
        const vopseleProducts = [
          'illusion-crystal', 
          'persia', 
          'sahara',
          'feerie',
          'mirage',
          'grotto', 
          'toscana',
          'pigment-decotoner',
          'vopsea-lavabila-interior',
          'vopsea-interior-1',
          'vopsea-interior-2',
          'vopsea-interior-3'
        ];
        
        // Get vopsele products
        const productResponses = await Promise.all(
          vopseleProducts.map(async (slug) => {
            try {
              const response = await fetch(`/api/products/${slug}`);
              if (response.ok) {
                return await response.json();
              }
              return null;
            } catch (error) {
              console.error(`Error fetching product ${slug}:`, error);
              return null;
            }
          })
        );
        
        allProducts = productResponses.filter(product => product !== null);
        
        // Force add these subcategories even if no products exist
        if (allProducts.length === 0) {
          updateSubcategories([
            { 
              subcategorii: ['ELF Decor', 'Vopsele interior', 'Amorse interior', 'Vopsele & Amorse exterior', 
                'Tencuieli/Amorse exterior', 'Vopsele epoxidice', 'Vopsele pentru lemn/metal', 'Protectia lemnului'],
              categorii: ['vopsele']
            } as Product
          ], 'vopsele');
        } else {
          // Update subcategories based on the loaded products
          updateSubcategories(allProducts, 'vopsele');
        }
      } else if (categoryToLoad === 'izolatii') {
        const izolatiiProducts = [
          'izolatie-termica-exterior',
          'isomat-ak-9',
          'isomat-ak-14',
          'isomat-ak-16',
          'isomat-ak-20',
          'isomat-ak-22',
          'isomat-ak-25',
          'isomat-ak-rapid',
          'isomat-ak-rapid-flex',
          'isomat-ak-megarapid',
          'isomat-ak-stone',
          'isomat-ak-marble',
          'isomat-ak-parquet',
          'montage-w',
          'superbond-pu',
          'izolatie-celuloza',
          'izolatie-fibra-lemn',
          'izolatie-fibra-canepa',
          'izolatie-iuta',
          'izolatie-lana',
          'izolatie-pluta',
          'izolatie-vata-minerala-vrac',
          'izolatie-perlit',
          'izolatie-fibra-minerala',
          'izolatie-granule-polistiren',
          'aquamat-mortar-hidroizolant',
          'aquamat-elastic-bicomponent',
          'aquamat-flex-bicomponent',
          'aquamat-monoelastic-fibre',
          'aquamat-sr-sulfatice',
          'isoflex-pu-560-bt'
        ];
        
        // Get izolatii products
        const productResponses = await Promise.all(
          izolatiiProducts.map(async (slug) => {
            try {
              const response = await fetch(`/api/products/${slug}`);
              if (response.ok) {
                return await response.json();
              }
              return null;
            } catch (error) {
              console.error(`Error fetching product ${slug}:`, error);
              return null;
            }
          })
        );
        
        allProducts = productResponses.filter(product => product !== null);
        
        // Force add these subcategories even if no products exist
        if (allProducts.length === 0) {
          updateSubcategories([
            { 
              subcategorii: ['IZOLATII ECO-FRIENDLY', 'MATERIALE HIDROIZOLANTE', 'ADEZIVI&CHITURI'],
              categorii: ['izolatii']
            } as Product
          ], 'izolatii');
        } else {
          // Update subcategories based on the loaded products
          updateSubcategories(allProducts, 'izolatii');
        }
      }
      
      console.log(`Loaded ${allProducts.length} products for category: ${categoryToLoad}`);
      
      setProducts(allProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      setError('Failed to load products. Please try again later.');
      
      // Even on error, ensure we have some subcategories
      if (categoryOverride === 'vopsele' || activeCategory === 'vopsele') {
        updateSubcategories([
          { 
            subcategorii: ['ELF Decor', 'Vopsele interior', 'Amorse interior', 'Vopsele & Amorse exterior', 
              'Tencuieli/Amorse exterior', 'Vopsele epoxidice', 'Vopsele pentru lemn/metal', 'Protectia lemnului'],
            categorii: ['vopsele']
          } as Product
        ], 'vopsele');
      } else if (categoryOverride === 'izolatii' || activeCategory === 'izolatii') {
        updateSubcategories([
          { 
            subcategorii: ['IZOLATII ECO-FRIENDLY', 'MATERIALE HIDROIZOLANTE', 'ADEZIVI&CHITURI'],
            categorii: ['izolatii']
          } as Product
        ], 'izolatii');
      }
    } finally {
      setLoading(false);
    }
  };

  // Update the useEffect that handles URL parameter changes
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
    
    // Load products if we have a category param
    if (categoryParam) {
      // Always load all products for the category, and do client-side filtering
      loadProducts(categoryParam);
    } else {
      // If no category is selected, clear products
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
    }
  }, [products, activeCategory]);

  // Update the other useEffect to load products correctly
  useEffect(() => {
    if (isInitialLoad && activeCategory) {
      loadProducts(activeCategory);
    }
  }, [isInitialLoad, activeCategory]);

  // Update handleCategoryCardSelect to clear selected subcategory when changing category
  const handleCategoryCardSelect = (category: string) => {
    console.log(`Selecting main category: ${category}`);
    try {
      // Force update navigation state first
      setActiveCategory(category);
      setMainCategory(category as 'vopsele' | 'izolatii');
      setSelectedSubcategory(null);

      // Create new URL with the selected category
      const params = new URLSearchParams(searchParams.toString());
      params.set('categorie', category);
      if (params.has('subcategorie')) params.delete('subcategorie');
      
      // Update the URL without reloading the page but trigger all client components
      const nextURL = `/produse?${params.toString()}`;
      console.log(`Navigating to: ${nextURL}`);
      
      // First load products, then update URL
      loadProducts(category);
      router.push(nextURL, { scroll: false });
    } catch (error) {
      console.error('Error in handleCategoryCardSelect:', error);
      setError('A apărut o eroare la încărcarea categoriei.');
    }
  };

  // Also update the handleCategoryChange function
  const handleCategoryChange = (newCategory: string) => {
    console.log(`Switching category from ${activeCategory} to ${newCategory}`);
    try {
      // Update state first
      setActiveCategory(newCategory);
      setMainCategory(newCategory as 'vopsele' | 'izolatii');
      setSelectedSubcategory(null);
      setShowCategoryOverlay(false);

      // Create new URL with the selected category
      const params = new URLSearchParams(searchParams.toString());
      params.set('categorie', newCategory);
      if (params.has('subcategorie')) params.delete('subcategorie');
      
      // Update the URL without reloading the page but trigger all client components
      const nextURL = `/produse?${params.toString()}`;
      console.log(`Navigating to: ${nextURL}`);
      
      // First load products, then update URL
      loadProducts(newCategory);
      router.push(nextURL, { scroll: false });
    } catch (error) {
      console.error('Error in handleCategoryChange:', error);
      setError('A apărut o eroare la încărcarea categoriei.');
    }
  };

  // Restore the handleSubcategoryCardSelect function
  const handleSubcategoryCardSelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    
    // Update the URL without full page reload - use categorie and subcategorie to match expectations
    const newUrl = `/produse?categorie=${activeCategory}${subcategory ? `&subcategorie=${subcategory}` : ''}`;
    router.push(newUrl, { scroll: false });
    
    // No need to load products as we already have all products for the main category
    // Client-side filtering will now handle showing the correct products
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

  // Update getFilteredProducts to handle client-side filtering
  const getFilteredProducts = () => {
    // If no products loaded yet, return empty array
    if (!products || products.length === 0) {
      return [];
    }
    
    // First get all products
    let filteredProducts = [...products];
    
    // Filter by main category if needed (should already be filtered by the API, but just in case)
    if (activeCategory === 'vopsele' || activeCategory === 'izolatii') {
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
      // Map URL param back to subcategory display name
      const subcategoryName = getSubcategoryDisplayName(selectedSubcategory);
      
      if (subcategoryName) {
        filteredProducts = filteredProducts.filter(product => {
          const hasSubcategory = product.subcategorii && 
            product.subcategorii.some(subcat => subcat === subcategoryName);
          
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

    return filteredProducts;
  };

  // Update getSubcategoryDisplayName to use the correct display names
  const getSubcategoryDisplayName = (urlParam: string): string => {
    // Find the matching subcategory card
    const subcategoryCard = subcategories.find(sub => sub.id === urlParam);
    if (subcategoryCard) {
      return subcategoryCard.title;
    }
    
    // Handle specific cases that might not be in the subcategories list yet
    // Use the exact names as specified in the requirements
    switch(urlParam) {
      case 'elf-decor':
        return 'ELF Decor';
      case 'vopsele-interior':
        return 'Vopsele interior';
      case 'amorse-interior':
        return 'Amorse interior';
      case 'vopsele-amorse-exterior':
        return 'Vopsele & Amorse exterior';
      case 'tencuieli-amorse-exterior':
        return 'Tencuieli/Amorse exterior';
      case 'vopsele-epoxidice':
        return 'Vopsele epoxidice';
      case 'vopsele-lemn-metal':
        return 'Vopsele pentru lemn/metal';
      case 'protectia-lemnului':
        return 'Protectia lemnului';
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

  // Update useEffect to properly sync mainCategory with activeCategory
  useEffect(() => {
    // Make sure mainCategory is always set correctly based on activeCategory
    if (activeCategory === 'vopsele' || activeCategory === 'izolatii') {
      if (mainCategory !== activeCategory) {
        console.log(`Syncing mainCategory to ${activeCategory}`);
        setMainCategory(activeCategory);
      }
    }
  }, [activeCategory, mainCategory]);

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
            console.log(`--------------------`);
            console.log(`CategoryOverlay selecting category: ${category}`);
            console.log(`Current state - activeCategory: ${activeCategory}, mainCategory: ${mainCategory}`);
            
            // Clear any selected subcategory when changing the main category
            setSelectedSubcategory(null);
            
            // Set the active category and main category
            setActiveCategory(category);
            setMainCategory(category);
            
            console.log(`New state - activeCategory: ${category}, mainCategory: ${category}`);
            
            // Reset the products to trigger a new load
            setProducts([]);
            
            // Load products for this category
            try {
              console.log(`Starting product load for category: ${category}`);
              loadProducts(category);
              console.log(`Finished triggering product load for: ${category}`);
            } catch (err) {
              console.error(`Error loading products for ${category}:`, err);
            }
            
            // Update URL without reloading the page
            console.log(`Updating URL to: /produse?categorie=${encodeURIComponent(category)}`);
            router.push(`/produse?categorie=${encodeURIComponent(category)}`, { 
              scroll: false
            });
            
            // Close the overlay
            setShowCategoryOverlay(false);
            console.log(`--------------------`);
          }}
          preserveBackground={true}
        />
      )}

      {/* Main content */}
      <div className="pt-32 px-4 sm:px-8 lg:px-16 min-h-screen">
        <PageVideoBackground />
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
                      <ErrorFallbackImage
                        src={category.image}
                        alt={category.title}
                        fill
                        type="category"
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
              {/* Heading section - now at the top since tabs were removed */}
              <div className="mb-8">
                <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl text-[#404040] mb-4`}>
                  {activeCategory === 'vopsele' ? 'VOPSELE' : 'IZOLAȚII'}
                </h1>
                <p className="text-xl text-[#696969] mb-6">
                  {activeCategory === 'vopsele' 
                    ? 'Explorează colecția noastră de vopsele premium pentru interior și exterior.' 
                    : 'Descoperă soluțiile noastre profesionale de izolare pentru proiectele tale.'}
                </p>
                
                {/* Category switcher positioned under the heading */}
                <div className="mb-6">
                  <CategorySwitcher 
                    currentCategory={activeCategory === 'vopsele' ? 'vopsele' : activeCategory === 'izolatii' ? 'izolatii' : 'vopsele'}
                    onCategoryChange={(category) => {
                      // Clear any selected subcategory when changing the main category
                      setSelectedSubcategory(null);
                      
                      // Set the active category and main category
                      setActiveCategory(category);
                      setMainCategory(category);
                      
                      // Reset the products to trigger a new load
                      setProducts([]);
                      
                      // Load products for this category
                      loadProducts(category);
                      
                      // Update URL without reloading the page
                      router.push(`/produse?categorie=${encodeURIComponent(category)}`, { 
                        scroll: false
                      });
                    }}
                  />
                </div>
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
                          // Simply clear the subcategory selection and update the URL
                          setSelectedSubcategory(null);
                          router.push(`/produse?categorie=${activeCategory}`);
                        }}
                      >
                        {mainCategory === 'vopsele' ? 'VOPSELE' : 'IZOLAȚII'}
                      </span> {'>'} {getSubcategoryDisplayName(selectedSubcategory)}
                    </p>
                  </div>
                )}

                {/* Subcategory pills for VOPSELE - only show when in a specific subcategory */}
                {mainCategory === 'vopsele' && selectedSubcategory && (
                  <div className="mb-8 overflow-x-auto" style={scrollbarHideStyles}>
                    <style jsx global>{scrollbarHideClass}</style>
                    <div className="flex space-x-2 pb-2 min-w-max">
                      {subcategories.map((subcategory) => (
                        <button
                          key={subcategory.id}
                          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                            selectedSubcategory === subcategory.id
                              ? 'bg-[#8a7d65] text-white'
                              : 'bg-gray-100 text-[#404040] hover:bg-gray-200'
                          }`}
                          onClick={() => handleSubcategoryCardSelect(subcategory.id)}
                        >
                          {subcategory.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subcategory pills for IZOLATII - only show when in a specific subcategory */}
                {mainCategory === 'izolatii' && selectedSubcategory && (
                  <div className="mb-8 overflow-x-auto" style={scrollbarHideStyles}>
                    <style jsx global>{scrollbarHideClass}</style>
                    <div className="flex space-x-2 pb-2 min-w-max">
                      {subcategories.map((subcategory) => (
                        <button
                          key={subcategory.id}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                            selectedSubcategory === subcategory.id
                              ? 'bg-amber-500 text-white'
                              : 'bg-gray-100 text-[#404040] hover:bg-gray-200'
                          }`}
                          onClick={() => handleSubcategoryCardSelect(subcategory.id)}
                        >
                          {subcategory.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Display subcategory cards for main categories when no subcategory is selected */}
                {mainCategory === 'vopsele' && !selectedSubcategory && (
                  <div className="mb-8 -mx-4 md:-mx-8 lg:-mx-16">
                    <SubcategoryScroller 
                      subcategories={subcategories} 
                      onSelectSubcategory={handleSubcategoryCardSelect} 
                      activeCategory={activeCategory || ''}
                    />
                  </div>
                )}

                {/* Display subcategory cards for IZOLATII when no subcategory is selected */}
                {mainCategory === 'izolatii' && !selectedSubcategory && (
                  <div className="mb-8 -mx-4 md:-mx-8 lg:-mx-16">
                    <SubcategoryScroller 
                      subcategories={subcategories} 
                      onSelectSubcategory={handleSubcategoryCardSelect} 
                      activeCategory={activeCategory || ''}
                    />
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
                              // Simply clear the subcategory selection and update the URL
                              setSelectedSubcategory(null);
                              router.push(`/produse?categorie=${activeCategory}`);
                            }}
                            className="mt-4 px-6 py-2 bg-[#8a7d65] text-white rounded-lg hover:bg-[#776d59] transition-colors"
                          >
                            Înapoi la {mainCategory === 'vopsele' ? 'VOPSELE' : 'IZOLAȚII'}
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="-mx-4 md:-mx-8 lg:-mx-16 mb-12">
                        <ProductScroller
                          products={getFilteredProducts()}
                          activeCategory={activeCategory || ''}
                        />
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

// Define the main category cards data
const mainCategoryCardsData: MainCategoryCard[] = [
  {
    id: 'vopsele',
    title: 'VOPSELE',
    subtitle: 'tencuieli si produse decorative',
    description: 'Colecția noastră de vopsele premium pentru interior și exterior, tencuieli decorative și produse pentru protecția suprafețelor. Descoperă soluții profesionale pentru orice suprafață și proiect.',
    image: '/images/category-placeholder.svg',
    color: '#8a7d65',
    gradient: 'from-[#8a7d65]/30 to-[#8a7d65]/90',
    icon: '🎨'
  },
  {
    id: 'izolatii',
    title: 'IZOLAȚII',
    subtitle: 'adezivi, chituri si hidroizolanti',
    description: 'Sisteme complete de izolație termică, fonică și hidroizolație, adezivi și chituri pentru diferite suprafețe și aplicații. Materiale de calitate superioară pentru rezultate durabile.',
    image: '/images/category-placeholder.svg',
    color: '#4A6741',
    gradient: 'from-[#4A6741]/30 to-[#4A6741]/90',
    icon: '🏗️'
  }
];

// Create a loading component
const ProductsLoading = () => (
  <div className="min-h-screen bg-[#f8f8f6]">
    <Navbar />
    <div className="container mx-auto px-4 py-16">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsContent />
    </Suspense>
  );
} 
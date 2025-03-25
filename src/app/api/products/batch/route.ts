import { NextResponse } from 'next/server';
import { Product } from '@/types/product';
import { productsDatabase } from '../[slug]/route';

// Define ELF Decor subcategory products
// const productsDatabase: Record<string, Product> = {
//   'feerie': {
// ... remaining code ...

export async function GET(request: Request) {
  // Get URL and search params
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  
  try {
    // Filter products based on query parameters
    const products = Object.values(productsDatabase).filter(product => {
      let matchesCategory = true;
      let matchesSubcategory = true;
      
      // Filter by category if provided
      if (category) {
        matchesCategory = product.categorii.some(
          cat => cat.toLowerCase() === category.toLowerCase()
        );
      }
      
      // Filter by subcategory if provided
      if (subcategory) {
        matchesSubcategory = product.subcategorii.some(
          subcat => subcat.toLowerCase() === subcategory.toLowerCase()
        );
      }
      
      return matchesCategory && matchesSubcategory;
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
} 
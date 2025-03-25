import supabase from '../supabase';

export type Favorite = {
  id?: string;
  user_id?: string;
  product_id: string;
  created_at?: string;
};

// We'll also need a Product type to use when joining with favorites
export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  stock_quantity?: number;
  created_at?: string;
  updated_at?: string;
};

// Get all favorite products for the current user
export async function getUserFavorites() {
  // This assumes you have a products table
  // If your products are stored differently, adjust this query
  const { data, error } = await supabase
    .from('favorites')
    .select(`
      id,
      product_id,
      created_at,
      products:product_id (
        id, 
        name, 
        description, 
        price, 
        image,
        category,
        stock_quantity
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }

  return data || [];
}

// Check if a product is already in favorites
export async function isProductFavorite(productId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('product_id', productId)
    .maybeSingle();

  if (error) {
    console.error('Error checking favorite status:', error);
    throw error;
  }

  return !!data;
}

// Add a product to favorites
export async function addToFavorites(productId: string) {
  // First check if it's already a favorite
  const isAlreadyFavorite = await isProductFavorite(productId);
  
  if (isAlreadyFavorite) {
    return { id: 'already_exists', product_id: productId };
  }

  const { data, error } = await supabase
    .from('favorites')
    .insert({ product_id: productId })
    .select()
    .single();

  if (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }

  return data;
}

// Remove a product from favorites
export async function removeFromFavorites(productId: string) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('product_id', productId);

  if (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }

  return true;
}

// Toggle favorite status
export async function toggleFavorite(productId: string) {
  const isFavorite = await isProductFavorite(productId);
  
  if (isFavorite) {
    await removeFromFavorites(productId);
    return { isFavorite: false, productId };
  } else {
    await addToFavorites(productId);
    return { isFavorite: true, productId };
  }
} 
import supabase from '../supabase';

export type Address = {
  id?: string;
  user_id?: string;
  name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  county: string;
  postal_code: string;
  phone: string;
  is_default?: boolean;
  created_at?: string;
  updated_at?: string;
};

// Get all addresses for the current user
export async function getUserAddresses() {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching addresses:', error);
    throw error;
  }

  return data || [];
}

// Get a single address by ID
export async function getAddressById(id: string) {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching address:', error);
    throw error;
  }

  return data;
}

// Create a new address
export async function createAddress(address: Address) {
  const { data, error } = await supabase
    .from('addresses')
    .insert(address)
    .select()
    .single();

  if (error) {
    console.error('Error creating address:', error);
    throw error;
  }

  // If this address is set as default, update other addresses
  if (address.is_default) {
    await updateOtherAddressesDefaultStatus(data.id);
  }

  return data;
}

// Update an existing address
export async function updateAddress(id: string, address: Partial<Address>) {
  const { data, error } = await supabase
    .from('addresses')
    .update(address)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating address:', error);
    throw error;
  }

  // If this address is set as default, update other addresses
  if (address.is_default) {
    await updateOtherAddressesDefaultStatus(id);
  }

  return data;
}

// Delete an address
export async function deleteAddress(id: string) {
  const { error } = await supabase
    .from('addresses')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting address:', error);
    throw error;
  }

  return true;
}

// Set an address as default
export async function setDefaultAddress(id: string) {
  // First update the target address to be default
  const { data, error } = await supabase
    .from('addresses')
    .update({ is_default: true })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error setting default address:', error);
    throw error;
  }

  // Then update all other addresses to not be default
  await updateOtherAddressesDefaultStatus(id);

  return data;
}

// Helper function to update other addresses when a new default is set
async function updateOtherAddressesDefaultStatus(currentAddressId: string) {
  const { error } = await supabase
    .from('addresses')
    .update({ is_default: false })
    .neq('id', currentAddressId);

  if (error) {
    console.error('Error updating other addresses:', error);
    throw error;
  }
} 
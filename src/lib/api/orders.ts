import supabase from '../supabase';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type Order = {
  id?: string;
  user_id?: string;
  status: OrderStatus;
  shipping_address_id: string;
  billing_address_id: string;
  total_amount: number;
  shipping_cost: number;
  created_at?: string;
  updated_at?: string;
};

export type OrderItem = {
  id?: string;
  order_id?: string;
  product_id: string;
  product_name: string;
  product_image?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at?: string;
};

// Get all orders for the current user
export async function getUserOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      shipping_address:shipping_address_id(*),
      billing_address:billing_address_id(*),
      order_items:order_items(*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }

  return data || [];
}

// Get a single order by ID with all details
export async function getOrderById(id: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      shipping_address:shipping_address_id(*),
      billing_address:billing_address_id(*),
      order_items:order_items(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    throw error;
  }

  return data;
}

// Create a new order
export async function createOrder(
  order: Omit<Order, 'id' | 'user_id' | 'created_at' | 'updated_at'>,
  orderItems: Omit<OrderItem, 'id' | 'order_id' | 'created_at'>[]
) {
  // Start a transaction
  const { data: newOrder, error: orderError } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();

  if (orderError) {
    console.error('Error creating order:', orderError);
    throw orderError;
  }

  // Add the order_id to each item
  const itemsWithOrderId = orderItems.map(item => ({
    ...item,
    order_id: newOrder.id
  }));

  // Insert all order items
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(itemsWithOrderId);

  if (itemsError) {
    console.error('Error creating order items:', itemsError);
    
    // Clean up the order if items insertion fails
    await supabase.from('orders').delete().eq('id', newOrder.id);
    
    throw itemsError;
  }

  // Return the complete order with items
  return await getOrderById(newOrder.id);
}

// Update an order's status
export async function updateOrderStatus(id: string, status: OrderStatus) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating order status:', error);
    throw error;
  }

  return data;
}

// Cancel an order (only if it's pending or processing)
export async function cancelOrder(id: string) {
  // First check the current status
  const { data: order, error: fetchError } = await supabase
    .from('orders')
    .select('status')
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('Error fetching order for cancellation:', fetchError);
    throw fetchError;
  }

  // Only allow cancellation if the order is pending or processing
  if (order.status !== 'pending' && order.status !== 'processing') {
    throw new Error('Cannot cancel an order that has already been shipped or delivered');
  }

  return await updateOrderStatus(id, 'cancelled');
} 
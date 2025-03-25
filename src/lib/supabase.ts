import { createClient } from '@supabase/supabase-js';

// Supabase client configuration with hardcoded values
const supabaseUrl = 'https://lrmahauwyevmpjaspbzy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxybWFoYXV3eWV2bXBqYXNwYnp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MDEzNTYsImV4cCI6MjA1ODI3NzM1Nn0.J6grReePgHP9EpviQAE-2b76zIRr0c14BlB8jEyJIGM';

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase; 
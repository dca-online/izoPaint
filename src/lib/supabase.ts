// @ts-ignore - Ignore type error when module declarations are missing
import { createClient } from '@supabase/supabase-js';

// Supabase client configuration with hardcoded values
const supabaseUrl = 'https://lrmahauwyevmpjaspbzy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxybWFoYXV3eWV2bXBqYXNwYnp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MDEzNTYsImV4cCI6MjA1ODI3NzM1Nn0.J6grReePgHP9EpviQAE-2b76zIRr0c14BlB8jEyJIGM';

/*
 * OAuth Setup Notes:
 * 1. Make sure localhost:3000 is added to your Supabase Site URLs in the dashboard:
 *    - Go to Authentication > URL Configuration
 *    - Add http://localhost:3000 to the Site URL list
 * 
 * 2. Ensure your Google OAuth client in Google Cloud Console has:
 *    - https://lrmahauwyevmpjaspbzy.supabase.co/auth/v1/callback in the redirect URIs
 *
 * 3. Development & Production URLs are handled in the authContext.tsx file's
 *    signInWithGoogle function, which will use localhost:3000 for development.
 */

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase; 
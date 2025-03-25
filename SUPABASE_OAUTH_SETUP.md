# Supabase OAuth Setup for Local Development

When developing locally and testing OAuth (Google login) from multiple devices, you need to properly configure Supabase and your Google OAuth application.

## Configure Google Cloud Console

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your project > APIs & Services > Credentials
3. Edit your OAuth 2.0 Client ID
4. Under "Authorized redirect URIs," add:
   - `https://lrmahauwyevmpjaspbzy.supabase.co/auth/v1/callback`
   - Ensure there are no trailing slashes

## Configure Supabase

1. Go to your Supabase dashboard
2. Navigate to Authentication > Providers > Google
3. Make sure the provider is enabled
4. Enter your Google Client ID and Client Secret from Google Cloud Console
5. Under "Redirect URLs" in the Site URL settings, add all the URLs that might be used to access your app:
   - `http://localhost:3000`
   - `http://127.0.0.1:3000`
   - `http://192.168.1.128:3000` (your specific local IP)

## Testing on Mobile Devices

When testing on mobile devices while running a local development server:

1. Ensure your computer and mobile device are on the same network
2. Use your specific local IP address: 192.168.1.128
3. Run your development server making it accessible on all network interfaces:
   ```
   npm run dev -- --host
   ```
4. Access your app on your mobile device using: `http://192.168.1.128:3000`

## Important Note

Make sure to add the redirect URL to your Supabase Site URLs settings:
1. Go to Authentication > URL Configuration
2. Add `http://192.168.1.128:3000` to the Site URL list
3. Make sure "localhost" redirect is also enabled for development on your computer

## Troubleshooting

If you still encounter "Connection Refused" errors:

1. Check if your development server is running with the `--host` flag
2. Verify that your computer firewall allows incoming connections on port 3000
3. Make sure you've added all necessary redirect URLs to both Google Cloud Console and Supabase
4. Clear browser cache and cookies on your mobile device 
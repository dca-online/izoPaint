import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { inter, bebasNeue } from "@/lib/fonts";
import "./globals.css";
import { AuthProvider } from "@/lib/authContext";
import { CartProvider } from "@/lib/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

// Define title and description constants
const title = "Vopsele & Izolații | Soluții moderne pentru casa ta";
const description = "Servicii profesionale de vopsele moderne și izolații eco-friendly pentru case și clădiri in Romania.";

export const metadata: Metadata = {
  title,
  description
};

// Separate viewport export as recommended by Next.js
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  height: "device-height"
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`lenis ${inter.variable} ${bebasNeue.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* Preload fonts to avoid layout shift */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        
        {/* Preload local font files */}
        <link 
          rel="preload" 
          href="/fonts/DrukText-Medium.woff" 
          as="font" 
          type="font/woff" 
          crossOrigin="anonymous" 
        />
      </head>
      <body className="antialiased overflow-x-hidden w-full max-w-full">
        <AuthProvider>
          <CartProvider>
            <div className="relative w-full overflow-x-hidden">
              {children}
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
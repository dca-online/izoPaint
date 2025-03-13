import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { inter, bebasNeue } from "@/lib/fonts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Vopsele & Izolații | Soluții moderne pentru casa ta",
  description: "Servicii profesionale de vopsele moderne și izolații eco-friendly pentru case și clădiri în Romania.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`lenis ${inter.variable} ${bebasNeue.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <head>
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showFooter = true
}) => {
  return (
    <div className="relative w-full overflow-x-hidden">
      <Navbar />
      <main className="min-h-screen w-full overflow-x-hidden">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout; 
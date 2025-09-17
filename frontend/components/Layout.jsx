// This file should be created at: frontend/src/components/Layout.jsx

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

// This component provides the overall structure for the public-facing pages.
// It includes the Navbar, the main content area, and the Footer.
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-200">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;


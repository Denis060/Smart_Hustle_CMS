// This file is located at: frontend/src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // In a real app, these links would come from the settings API
  const socialLinks = {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
    github: '#',
  };
  
  return (
    <footer className="bg-slate-800 border-t border-slate-700 mt-12">
      <div className="container mx-auto py-6 px-4 text-center text-slate-400">
        <div className="flex justify-center space-x-6 mb-4">
            {/* Social media icons would go here */}
            <a href={socialLinks.facebook} className="hover:text-cyan-400">Facebook</a>
            <a href={socialLinks.instagram} className="hover:text-cyan-400">Instagram</a>
            <a href={socialLinks.linkedin} className="hover:text-cyan-400">LinkedIn</a>
            <a href={socialLinks.github} className="hover:text-cyan-400">GitHub</a>
        </div>
        <p>&copy; {new Date().getFullYear()} Smart Hustle with AI. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

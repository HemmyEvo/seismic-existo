/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamic glassmorphism intensity based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-100 px-4 pt-4 sm:pt-6 pointer-events-none">
      
      {/* Framer Motion wrapper strictly for animation (No className) */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        
        {/* Inner standard HTML tag for the glassmorphism UI */}
        <div 
          className={`
            pointer-events-auto flex items-center justify-between px-4 sm:px-6 py-3 w-full max-w-6xl
            rounded-full transition-all duration-500
            ${isScrolled 
              ? 'bg-[#0a0a0a]/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
              : 'bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]'}
          `}
        >
          
          {/* --- LOGO IMAGE --- */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
              <img 
                src="/logo.png" 
                alt="Seismic Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white font-bold text-lg sm:text-xl tracking-wide font-serif hidden sm:block">
              Seismic
            </span>
          </Link>

          {/* --- PROJECTS BUTTON --- */}
          <div className="flex items-center gap-2">
            <Link 
              href="/projects" 
              className="px-4 py-2 md:px-5 md:py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm md:text-base font-bold rounded-full transition-all"
            >
              Projects
            </Link>
      
          </div>

        </div>
      </motion.div>
    </div>
  );
}
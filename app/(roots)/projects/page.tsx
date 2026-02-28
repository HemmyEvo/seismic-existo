"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Globe } from 'lucide-react';
import Link from 'next/link';

// --- TYPES ---
interface Project {
  id: string;
  image: string;
  title: string;
  description: string;
  category: string;
  link: string;
  github?: string;
}

// --- EXTENDED DATA ---
const allProjects: Project[] = [
  {
    id: "community1",
    image: "/images/community1.jpg", 
    title: "DeFi Protocol Demo",
    description: "A decentralized lending platform built on Seismic with zero-knowledge proofs.",
    category: "DeFi",
    link: "https://demo-defi.example.com",
    github: "https://github.com/atilolaemmanuel/defi-demo"
  },
  {
    id: "community2",
    image: "/images/community2.jpg",
    title: "Payment App Integration",
    description: "Seamless cross-border payments using Seismic's privacy features and compliant rails.",
    category: "Payments",
    link: "https://payments.example.com"
  },
  {
    id: "community3",
    image: "/images/community3.jpg",
    title: "Privacy-Preserving Analytics",
    description: "On-chain analytics dashboard without compromising user privacy or wallet identities.",
    category: "Analytics",
    link: "https://analytics.example.com",
    github: "https://github.com/atilolaemmanuel/seismic-analytics"
  },
  {
    id: "community4",
    image: "/images/community4.jpg",
    title: "Seismic Identity Vault",
    description: "Self-sovereign identity management system using encrypted on-chain storage.",
    category: "Infrastructure",
    link: "https://identity.example.com"
  },
  {
    id: "community5",
    image: "/images/community5.jpg",
    title: "Private NFT Marketplace",
    description: "Trade digital assets with completely shielded transaction histories.",
    category: "NFTs",
    link: "https://nft.example.com",
    github: "https://github.com/atilolaemmanuel/private-nft"
  },
  {
    id: "community6",
    image: "/images/community6.jpg",
    title: "Institutional Bridge",
    description: "Regulated cross-chain bridge connecting traditional finance to Seismic.",
    category: "Infrastructure",
    link: "https://bridge.example.com"
  }
];

const categories = ["All", "DeFi", "Payments", "Analytics", "Infrastructure", "NFTs"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = activeCategory === "All" 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <div className="bg-[#0a0a0a] text-stone-100 min-h-screen font-sans selection:bg-[#8b5a2b]/50 selection:text-white relative overflow-x-hidden flex flex-col">
      
      {/* --- ANIMATED BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#8b5a2b]/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#cda577]/10 blur-[150px] rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] bg-[#d4a373]/10 blur-[120px] rounded-full animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="relative z-50 w-full px-6 py-6 max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="relative z-10 flex-grow px-4 sm:px-6 pt-12 pb-24 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-16 md:mb-24"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
            Ecosystem <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5a2b] via-[#e2c19d] to-[#cda577]">
              Projects
            </span>
          </h1>
          <p className="text-lg md:text-xl text-stone-400 max-w-2xl font-medium">
            Explore the innovative products and infrastructure I&apos;ve been building on top of the Seismic privacy network.
          </p>
        </motion.div>

        {/* --- FILTERS --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === category 
                  ? 'bg-gradient-to-r from-[#8b5a2b] to-[#b88b4a] text-white border-transparent shadow-[0_4px_20px_rgba(139,90,43,0.3)]' 
                  : 'bg-white/5 backdrop-blur-md border-white/10 text-stone-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* --- PROJECTS GRID --- */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-2 shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
              >
                <div className="aspect-[4/3] relative overflow-hidden rounded-2xl bg-[#111]">
                  {/* Fallback styling in case images are missing */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Default subtle gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block px-3 py-1 mb-3 rounded-full bg-[#8b5a2b]/20 border border-[#8b5a2b]/30 text-[#e2c19d] text-xs font-semibold backdrop-blur-md">
                        {project.category}
                      </span>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
                      
                      <p className="text-stone-300 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {project.description}
                      </p>

                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-colors"
                        >
                          <Globe className="w-4 h-4" /> Live App
                        </a>
                        
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm font-medium text-stone-300 hover:text-white bg-black/40 hover:bg-black/60 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md transition-colors"
                          >
                            <Github className="w-4 h-4" /> Source
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

    
    </div>
  );
}
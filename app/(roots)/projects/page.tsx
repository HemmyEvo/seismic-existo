/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Github, Globe } from 'lucide-react';
import Link from 'next/link';

// --- TYPES ---
interface Project {
  id: string;
  image: string;
  title: string;
  description: string;
  link: string;
  github?: string;
}

// --- EXTENDED DATA ---
// Leave this array empty (e.g., `const allProjects: Project[] = [];`) to see the "Coming Soon" state.
const allProjects: Project[] = [
  
];

export default function ProjectsPage() {
  const [, setHoveredProject] = useState<string | null>(null);

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
      <nav className="relative z-50 w-full px-6 pt-28 md:pt-36 pb-6 max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="relative z-10 grow px-4 sm:px-6 pt-6 pb-24 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%' }}
        >
          <div className="text-left mb-16 md:mb-24">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
              Ecosystem <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#8b5a2b] via-[#e2c19d] to-[#cda577]">
                Projects
              </span>
            </h1>
            <p className="text-lg md:text-xl text-stone-400 max-w-2xl font-medium">
              Explore the innovative products and infrastructure I&apos;ve been building on top of the Seismic privacy network.
            </p>
          </div>
        </motion.div>

        {/* --- PROJECTS OR EMPTY STATE --- */}
        <motion.div layout style={{ width: '100%' }}>
          {allProjects.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center py-20 px-4 text-center border border-white/5 bg-white/5 backdrop-blur-md rounded-3xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Coming Soon</h2>
              <p className="text-stone-400 text-lg max-w-md">
                Exciting new projects are currently in the works. Check back later to see what&apos;s been built!
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {allProjects.map((project, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    key={project.id}
                    style={{ display: 'block' }}
                  >
                    <div 
                      className="group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-2 shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      <div className="aspect-4/3 relative overflow-hidden rounded-2xl bg-[#111]">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
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
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

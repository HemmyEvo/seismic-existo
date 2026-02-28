/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  const [, setHoveredProject] = useState<string | null>(null);

  return (
    <div className="bg-[#0a0a0a] text-stone-100 min-h-screen font-sans selection:bg-[#8b5a2b]/50 selection:text-white relative overflow-x-hidden flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#8b5a2b]/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#cda577]/10 blur-[150px] rounded-full animate-pulse delay-1000" />
      </div>

      <nav className="relative z-50 w-full px-6 pt-28 md:pt-36 pb-6 max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="group inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-stone-300 hover:text-white">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <Link href="/admin" className="px-4 py-2 bg-[#8b5a2b]/80 rounded-full text-sm font-semibold text-white">Admin Dashboard</Link>
      </nav>

      <main className="relative z-10 grow px-4 sm:px-6 pt-6 pb-24 max-w-7xl mx-auto w-full">
        <div className="text-left mb-16 md:mb-24">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">Ecosystem Projects</h1>
          <p className="text-lg md:text-xl text-stone-400 max-w-2xl font-medium">Open a project page and generate images. Downloads are tracked for admin analytics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="group block rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-2"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="aspect-4/3 relative overflow-hidden rounded-2xl bg-[#111]">
                    <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-stone-300 text-sm mb-4">{project.description}</p>
                      <span className="inline-flex items-center gap-2 text-sm text-white font-semibold">
                        Open project <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

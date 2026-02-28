"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { Rocket, ArrowRight, ExternalLink, Lock, Check, RefreshCw, Github, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

// --- TYPES ---
interface Video {
  id: string;
  src: string;
  title: string;
  description: string;
  tweetUrl: string;
  author: string;
  authorHandle: string;
}

interface Project {
  id: string;
  image: string;
  title: string;
  description: string;
  link: string;
}

// --- DATA ---
const videos: Video[] = [
  {
    id: "intro",
    src: "/videos/intro.mp4",
    title: "Introducing Seismic",
    description: "The privacy-enabled blockchain built for fintechs. Experience seamless, compliant transactions with complete privacy.",
    tweetUrl: "https://twitter.com/seismic/status/1",
    author: "Seismic",
    authorHandle: "@seismic"
  },
  {
    id: "founder",
    src: "/videos/founder.mp4",
    title: "Founder's Vision",
    description: "Lyron Co Ting Keh explains how Seismic is revolutionizing financial privacy on Web3.",
    tweetUrl: "https://twitter.com/lyronctk/status/2",
    author: "Lyron Co Ting Keh",
    authorHandle: "@lyronctk"
  }
];

const communityProjects: Project[] = [
  {
    id: "community1",
    image: "/background.avif", 
    title: "DeFi Protocol Demo",
    description: "A decentralized lending platform built on Seismic",
    link: "/projects/defi-protocol"
  },
  {
    id: "community2",
    image: "/background.avif",
    title: "Payment App Integration",
    description: "Seamless cross-border payments using Seismic's privacy features",
    link: "/projects/payment-app"
  },
  {
    id: "community3",
    image: "/background.avif",
    title: "Privacy-Preserving Analytics",
    description: "On-chain analytics without compromising user privacy",
    link: "/projects/analytics"
  }
];

export default function SeismicHomePageBrown() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
  // Track mute state for videos
  const [mutedStates, setMutedStates] = useState<{ [key: number]: boolean }>({ 0: true, 1: true });

  // Track scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef as React.RefObject<HTMLElement>,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Safe transforms
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 0.95]);
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0px", "300px"]);

  const toggleMute = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.muted = !video.muted;
      setMutedStates(prev => ({ ...prev, [index]: video.muted }));
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoIndex = entry.target.getAttribute('data-video-index');
          if (videoIndex !== null) {
            const index = parseInt(videoIndex);
            const video = videoRefs.current[index];

            if (video) {
              if (entry.isIntersecting) {
                // Ensure muted matches state before playing
                video.muted = mutedStates[index] ?? true;
                video.play().catch(err => console.log('Autoplay blocked:', err));
              } else {
                video.pause();
              }
            }
          }
        });
      },
      {
        threshold: 0.3, 
        rootMargin: "0px" 
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [mutedStates]);

  return (
    <div 
      ref={containerRef}
      className="bg-[#0a0a0a] text-stone-100 min-h-screen font-sans selection:bg-[#8b5a2b]/50 selection:text-white relative overflow-x-hidden" 
    >
      <Header />
      {/* --- ANIMATED BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div style={{ y: backgroundY, width: '100%', height: '100%' }}>
          <div className="absolute top-10 left-5 md:top-20 md:left-10 w-48 h-48 md:w-[30vw] md:h-[30vw] bg-[#8b5a2b]/20 blur-[100px] md:blur-[140px] rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-5 md:bottom-40 md:right-10 w-64 h-64 md:w-[40vw] md:h-[40vw] bg-[#cda577]/10 blur-[100px] md:blur-[150px] rounded-full animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/4 md:left-1/3 w-48 h-48 md:w-[25vw] md:h-[25vw] bg-[#d4a373]/15 blur-[100px] md:blur-[120px] rounded-full animate-pulse delay-700" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </motion.div>
      </div>

      {/* --- 1. HERO SECTION --- */}
      <section className="min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 md:pt-36 pb-12 md:pb-16 relative z-10">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale, width: '100%' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ width: '100%' }}
          >
            <div className="w-full max-w-5xl mx-auto space-y-6 md:space-y-8 relative px-2 flex flex-col items-center">

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                style={{ display: 'inline-block' }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs md:text-sm text-stone-300 font-semibold tracking-wide shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                  <Rocket className="text-[#8b5a2b] w-4 h-4" /> Backed by $17M led by a16z crypto
                </div>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-white">
                A privacy enabled{' '}
                <motion.span
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: "100% 50%" }}
                  transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                  style={{ display: 'inline-block' }}
                >
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#8b5a2b] via-[#e2c19d] to-[#cda577] bg-size-[200%] block sm:inline">
                    blockchain for fintechs
                  </span>
                </motion.span>
              </h1>

              <p className="text-sm sm:text-lg md:text-xl text-stone-400 max-w-3xl mx-auto leading-relaxed font-medium bg-white/5 backdrop-blur-md p-4 md:p-6 rounded-xl md:rounded-2xl border border-white/10 shadow-lg">
                Build products users can trust. Seismic works with leading fintechs to launch private, 
                compliant checking accounts, loans, and more.
              </p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ width: '100%' }}
              >
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-10 px-4">

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block' }}>
                    <Link href="/projects" className="inline-block w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-linear-to-r from-[#8b5a2b] to-[#b88b4a] text-white font-bold rounded-full shadow-[0_8px_32px_rgba(139,90,43,0.3)] transition-all duration-300 text-sm md:text-base">
                      My projects
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block' }}>
                    <Link href="https://docs.seismic.systems/" className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur-md border flex items-center justify-center border-white/20 font-bold rounded-full text-white hover:bg-white/20 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-sm md:text-base">
                      <span>View Docs</span> <Github className="ml-2 w-4 h-4" /> 
                    </Link>
                  </motion.div>

                </div>
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- 2. MAIN INTRO VIDEO --- */}
      <section 
        ref={(el) => { sectionRefs.current[0] = el; }}
        data-video-index="0"
        className="py-12 md:py-24 flex items-center justify-center relative z-20 px-4 sm:px-6"
      >
        <div className="w-full max-w-6xl mx-auto flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            style={{ width: '100%' }}
          >
            <div className="w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-1.5 md:p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500">
              <div className="w-full h-full rounded-xl md:rounded-2xl relative overflow-hidden group">
                
                {/* Audio Toggle Button */}
                <button
                  onClick={() => toggleMute(0)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 z-10 p-2 md:p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 transition-colors"
                  aria-label={mutedStates[0] ? "Unmute video" : "Mute video"}
                >
                  {mutedStates[0] ? <VolumeX className="w-4 h-4 md:w-5 md:h-5" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5" />}
                </button>

                <video 
                  ref={(el) => { videoRefs.current[0] = el; }}
                  loop 
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                  <source src={videos[0].src} type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pointer-events-none">
                  <div className="backdrop-blur-md bg-black/40 border border-white/10 rounded-xl md:rounded-2xl p-4 w-full sm:w-auto pointer-events-auto">
                    <p className="text-white text-xs md:text-sm font-bold tracking-[0.2em] uppercase">{videos[0].title}</p>
                    <p className="text-stone-300 text-xs md:text-base font-medium max-w-md mt-2 ">{videos[0].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


 {/* --- 3. COMMUNITY PROJECTS --- */}
      <section className="py-12 md:py-24 relative z-40 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ width: '100%' }}
          >
            <div className="text-center mb-10 md:mb-16 px-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-linear-to-r from-white to-stone-400 bg-clip-text text-transparent">
                My Community Projects
              </h2>
              <p className="text-sm sm:text-lg text-stone-400 max-w-2xl mx-auto bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                Built by Atilola Emmanuel — check out my projects building on Seismic
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block', marginTop: '1.5rem' }}>
                <button
                  onClick={() => window.location.href = '/projects'}
                  className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all inline-flex items-center gap-2 text-sm md:text-base cursor-pointer"
                >
                  <span>View all projects</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                style={{ display: 'block' }}
              >
                <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-1.5 md:p-2 shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-all duration-500 group">
                  <div className="aspect-video relative overflow-hidden rounded-xl">
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-90 lg:opacity-60 lg:group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

                    {/* Always visible on mobile, reveal on hover for desktop */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-0 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300">
                      <div className="backdrop-blur-md bg-black/60 border border-white/10 rounded-xl p-3">
                        <p className="text-white font-bold text-sm truncate">{project.title}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-stone-300 text-xs truncate mr-2">{project.description}</span>
                          <Link
                            href={project.link}
                            className="text-[#e2c19d] hover:text-white transition-colors flex items-center gap-1 text-xs shrink-0"
                          >
                            <span>View</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. FOUNDER SECTION --- */}
      <section 
        ref={(el) => { sectionRefs.current[1] = el; }}
        data-video-index="1"
        className="py-12 md:py-24 relative z-30 px-4 sm:px-6 flex items-center"
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7 }}
            style={{ width: '100%' }}
          >
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-1.5 md:p-2 shadow-[0_20px_40px_rgba(0,0,0,0.4)] w-full group">
                <div className="aspect-video relative overflow-hidden rounded-xl md:rounded-2xl">
                  
                  {/* Audio Toggle Button */}
                  <button
                    onClick={() => toggleMute(1)}
                    className="absolute top-3 right-3 md:top-4 md:right-4 z-10 p-2 md:p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 transition-colors"
                    aria-label={mutedStates[1] ? "Unmute video" : "Mute video"}
                  >
                    {mutedStates[1] ? <VolumeX className="w-4 h-4 md:w-5 md:h-5" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5" />}
                  </button>

                  <video 
                    ref={(el) => { videoRefs.current[1] = el; }}
                    loop 
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={videos[1].src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 flex justify-between items-end pointer-events-none">
                    <div className="backdrop-blur-md bg-black/50 border border-white/10 rounded-lg md:rounded-xl p-2 md:p-3 pointer-events-auto">
                      <p className="text-white text-xs md:text-sm font-bold">{videos[1].title}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.3)] w-full">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-linear-to-br from-[#8b5a2b] to-[#cda577] flex items-center justify-center text-white font-bold text-lg shrink-0">
                    L
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                      <span className="font-bold text-base text-white truncate">Lyron Co Ting Keh</span>
                      <span className="text-sm text-stone-400">@lyronctk</span>
                    </div>
                    <p className="text-sm md:text-lg text-stone-300 mb-5 leading-relaxed">
                      &ldquo;We&apos;re building the future of private, compliant financial infrastructure on Web3. Excited to share our vision with the community.&rdquo;
                    </p>
                    <a
                      href={videos[1].tweetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-stone-300 hover:text-white font-medium text-sm md:text-base transition-colors"
                    >
                      View post
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

     

      {/* --- 5. LEADERSHIP & STATS --- */}
      <section className="py-12 md:py-24 flex items-center justify-center px-4 sm:px-6 relative z-50">
        <div className="w-full max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-12 lg:p-16 text-center shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">Led by Visionaries</h2>
              <p className="text-sm md:text-xl text-stone-400 mb-10 md:mb-12 max-w-3xl mx-auto">
                Founded by <span className="text-white font-bold bg-white/10 px-3 py-1 rounded-full text-xs md:text-base mx-1 inline-block mt-2 sm:mt-0">Lyron Co Ting Keh (CEO)</span>, 
                Seismic is quietly building the foundational encrypted backbone for financial Web3.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 px-2 mb-10 md:mb-12">
                {[
                  { title: "Private", desc: "Protects the privacy of every transaction, from transfers to loans.", icon: <Lock className="w-8 h-8 md:w-10 md:h-10" /> },
                  { title: "Compliant", desc: "Transaction screening, reporting, and investigations built directly in.", icon: <Check className="w-8 h-8 md:w-10 md:h-10" /> },
                  { title: "Integrated", desc: "Deep integrations with on-/off-ramp and card providers worldwide.", icon: <RefreshCw className="w-8 h-8 md:w-10 md:h-10" /> }
                ].map((feature, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ y: -5 }}
                    style={{ display: 'block' }}
                  >
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 hover:bg-white/10 transition-all cursor-default flex flex-col items-center h-full">
                      <div className="mb-4 text-[#e2c19d]">{feature.icon}</div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-white">{feature.title}</h3>
                      <p className="text-xs md:text-sm text-stone-400">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8 border-t border-white/10">
                {[
                  { value: "$17M", label: "Funding (a16z)" },
                  { value: "50+", label: "Team Members" },
                  { value: "100+", label: "Projects Built" },
                  { value: "99.9%", label: "Uptime" }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center p-2 md:p-4">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-stone-500 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

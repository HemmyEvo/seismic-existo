"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Upload, CreditCard, Sparkles, User, AtSign, Briefcase } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- DATA ---
const specialties = ["Leader", "Builder", "Content Creator"];

// You can replace the 'chipUrl' with your actual magnitude images
const magnitudes = [
  { id: 1, name: "Magnitude 1", color: "#1e293b", chipUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=200&fit=crop" }, // Dark Slate
  { id: 2, name: "Magnitude 2", color: "#0f766e", chipUrl: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=200&h=200&fit=crop" }, // Teal
  { id: 3, name: "Magnitude 3", color: "#4338ca", chipUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop" }, // Indigo
  { id: 4, name: "Magnitude 4", color: "#b45309", chipUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=200&fit=crop" }, // Amber/Brown
  { id: 5, name: "Magnitude 5", color: "#be123c", chipUrl: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=200&h=200&fit=crop" }, // Rose
  { id: 6, name: "Magnitude 6", color: "#6d28d9", chipUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop" }, // Purple
  { id: 7, name: "Magnitude 7", color: "#334155", chipUrl: "/mag7.jpg" }, // Slate
  { id: 8, name: "Magnitude 8", color: "#047857", chipUrl: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=200&h=200&fit=crop" }, // Emerald
  { id: 9, name: "Magnitude 9", color: "#000000", chipUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop" }  // Black/Obsidian
];

export default function SeismicCardGenerator() {
  // State with requested defaults
  const [name, setName] = useState<string>('Existo');
  const [handle, setHandle] = useState<string>('existo999');
  const [specialty, setSpecialty] = useState<string>('Builder');
  const [magIndex, setMagIndex] = useState<number>(0);
  const [userImage, setUserImage] = useState<string>('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop'); // Default Avatar
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeMag = magnitudes[magIndex];

  // Handle Image Upload for Profile Picture
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUserImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to load images for Canvas
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  // Native HTML5 Canvas Image Generation
  const handleDownload = async () => {
    setIsGenerating(true);
    
    try {
      // 1. Create a native canvas in memory. Standard CC ratio is 1.586 (e.g., 1056 x 666)
      const canvas = document.createElement('canvas');
      canvas.width = 1056;
      canvas.height = 666;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not get canvas context");

      // 2. Load necessary images
      const [logoImg, chipImg, profileImg] = await Promise.all([
        loadImage('/logo.png').catch(() => null), // Fallback if logo is missing locally
        loadImage(activeMag.chipUrl),
        loadImage(userImage)
      ]);

      // 3. Draw Card Background Color
      ctx.fillStyle = activeMag.color;
      ctx.beginPath();
      ctx.roundRect(0, 0, canvas.width, canvas.height, 40); // 40px border radius
      ctx.fill();

      // Optional: Add a subtle glass reflection/gradient over the color
      const reflection = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      reflection.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      reflection.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
      reflection.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
      ctx.fillStyle = reflection;
      ctx.fill();

      // 4. Draw "ENCRYPTED CITIZEN" (Top Left)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '600 24px system-ui, sans-serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('ENCRYPTED CITIZEN', 60, 80);

      // 5. Draw Logo (Top Right)
      if (logoImg) {
        // Assuming logo is rectangular, adjust sizing as needed
        const logoHeight = 60;
        const logoWidth = logoImg.width * (logoHeight / logoImg.height);
        ctx.drawImage(logoImg, canvas.width - logoWidth - 60, 45, logoWidth, logoHeight);
      } else {
        // Fallback text if /logo.png isn't found
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 36px system-ui, sans-serif';
        ctx.fillText('SEISMIC', canvas.width - 200, 80);
      }

      // 6. Draw Magnitude Image (The "Chip") - Middle Left
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(60, 240, 120, 100, 16); // ATM Chip dimensions
      ctx.clip();
      ctx.drawImage(chipImg, 60, 240, 120, 100);
      ctx.restore();

      // Draw subtle border around the chip
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(60, 240, 120, 100, 16);
      ctx.stroke();

      // 7. Draw Magnitude Name (Next to the chip)
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 32px system-ui, sans-serif';
      ctx.fillText(activeMag.name.toUpperCase(), 210, 305);

      // 8. Draw Profile Picture (Bottom Right)
      const profileSize = 140;
      const profileX = canvas.width - profileSize - 60;
      const profileY = canvas.height - profileSize - 60;
      
      ctx.save();
      ctx.beginPath();
      ctx.arc(profileX + profileSize/2, profileY + profileSize/2, profileSize/2, 0, Math.PI * 2);
      ctx.clip();
      // Calculate object-fit cover for profile image
      const aspect = profileImg.width / profileImg.height;
      let dW, dH;
      if (aspect > 1) { dH = profileSize; dW = profileSize * aspect; } 
      else { dW = profileSize; dH = profileSize / aspect; }
      ctx.drawImage(profileImg, profileX - (dW - profileSize)/2, profileY - (dH - profileSize)/2, dW, dH);
      ctx.restore();

      // Ring around profile picture
      ctx.strokeStyle = '#e2c19d';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(profileX + profileSize/2, profileY + profileSize/2, profileSize/2 + 6, 0, Math.PI * 2);
      ctx.stroke();

      // 9. Draw User Details (Bottom Left)
      const bottomY = canvas.height - 70;
      
      // Handle
      ctx.fillStyle = '#e2c19d';
      ctx.font = '600 28px system-ui, sans-serif';
      const displayHandle = handle.startsWith('@') ? handle : `@${handle}`;
      ctx.fillText(displayHandle, 60, bottomY - 60);

      // Name
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 52px system-ui, sans-serif';
      const displayName = name || 'Existo';
      ctx.fillText(displayName, 60, bottomY);

      // 10. Draw Specialty (Bottom Center-Right)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '700 20px system-ui, sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('SPECIALTY', profileX - 250, bottomY - 35);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 28px system-ui, sans-serif';
      ctx.fillText(specialty.toUpperCase(), profileX - 250, bottomY);

      // 11. Generate and Trigger Download
      const finalImage = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = finalImage;
      link.download = `Seismic_Card_${handle || 'Citizen'}.png`;
      link.click();

    } catch (error) {
      console.error("Error generating card:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-stone-100 min-h-screen font-sans selection:bg-[#8b5a2b]/50 selection:text-white relative overflow-x-hidden">
      <Header />

      {/* --- ANIMATED BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 right-5 md:top-20 md:right-10 w-48 h-48 md:w-[30vw] md:h-[30vw] bg-[#8b5a2b]/20 blur-[100px] md:blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-5 md:bottom-40 md:left-10 w-64 h-64 md:w-[40vw] md:h-[40vw] bg-[#cda577]/10 blur-[100px] md:blur-[150px] rounded-full animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <main className="relative z-10 pt-28 md:pt-36 pb-16 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-12">
          <div style={{ display: 'inline-block' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
                Citizen <span className="text-transparent bg-clip-text bg-linear-to-r from-[#8b5a2b] via-[#e2c19d] to-[#cda577]">Card Generator</span>
              </h1>
              <p className="text-stone-400 text-sm md:text-lg max-w-2xl mx-auto bg-white/5 backdrop-blur-md p-3 md:p-4 rounded-xl border border-white/10 shadow-lg flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5 text-[#e2c19d]" /> Generate your official Seismic Web3 identity card.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          
          {/* --- LEFT: CONTROLS (Glassmorphism Panel) --- */}
          <div className="lg:col-span-4 space-y-6">
            <div style={{ display: 'block' }}>
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#e2c19d]" /> Profile Details
                  </h3>

                  <div className="space-y-5">
                    
                    {/* Image Upload */}
                    <div>
                      <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Profile Image</label>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
                          <Image src={userImage} alt="Avatar" width={64} height={64} className="w-full h-full object-cover" />
                        </div>
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-stone-300"
                        >
                          <Upload className="w-4 h-4" /> Upload Photo
                        </button>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleImageUpload} 
                          accept="image/*" 
                          className="hidden" 
                        />
                      </div>
                    </div>

                    {/* Text Inputs */}
                    <div>
                      <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Display Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 w-4 h-4 text-stone-500" />
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          maxLength={20}
                          className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#8b5a2b] focus:ring-1 focus:ring-[#8b5a2b] transition-all"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Twitter / X Handle</label>
                      <div className="relative">
                        <AtSign className="absolute left-4 top-3.5 w-4 h-4 text-stone-500" />
                        <input 
                          type="text" 
                          value={handle}
                          onChange={(e) => setHandle(e.target.value.replace('@', ''))}
                          maxLength={15}
                          className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#8b5a2b] focus:ring-1 focus:ring-[#8b5a2b] transition-all"
                        />
                      </div>
                    </div>

                    {/* Dropdowns */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Magnitude</label>
                        <select 
                          value={magIndex}
                          onChange={(e) => setMagIndex(Number(e.target.value))}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-white appearance-none focus:outline-none focus:border-[#8b5a2b] transition-all text-sm"
                        >
                          {magnitudes.map((mag, idx) => (
                            <option key={mag.id} value={idx} className="bg-stone-900">{mag.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Specialty</label>
                        <select 
                          value={specialty}
                          onChange={(e) => setSpecialty(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-white appearance-none focus:outline-none focus:border-[#8b5a2b] transition-all text-sm"
                        >
                          {specialties.map((spec) => (
                            <option key={spec} value={spec} className="bg-stone-900">{spec}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* --- RIGHT: PREVIEW & ACTIONS --- */}
          <div className="lg:col-span-8 space-y-6">
            <div style={{ display: 'block' }}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* The HTML UI Preview (CSS representation of the canvas) */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-8 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-x-auto">
                  
                  {/* Card Container (Aspect Ratio 1.586:1) */}
                  <div 
                    className="relative w-full min-w-[500px] max-w-[700px] aspect-[1.586/1] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl p-6 md:p-8 flex flex-col justify-between select-none border border-white/20"
                    style={{ backgroundColor: activeMag.color }}
                  >
                    {/* Light Reflection Overlay */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Row */}
                    <div className="relative z-10 flex justify-between items-start">
                      <h4 className="text-white/70 font-semibold tracking-[0.2em] text-xs md:text-sm uppercase">Encrypted Citizen</h4>
                      {/* Logo (Fallback to text if image fails to load in preview) */}
                      <div className="h-8 md:h-12 relative">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logo.png" alt="Seismic Logo" className="h-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                        <span className="text-white font-extrabold text-xl md:text-2xl ml-2 drop-shadow-md">SEISMIC</span>
                      </div>
                    </div>

                    {/* Middle Row: Chip & Rank */}
                    <div className="relative z-10 flex items-center gap-4 md:gap-6 mt-4 md:mt-8">
                      {/* The "Chip" */}
                      <div className="w-16 h-12 md:w-24 md:h-16 rounded-md md:rounded-xl overflow-hidden border-2 border-white/30 shadow-inner">
                        <Image src={activeMag.chipUrl} alt="Chip" width={96} height={64} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="text-white font-bold text-xl md:text-3xl drop-shadow-md">{activeMag.name.toUpperCase()}</h3>
                    </div>

                    {/* Bottom Row: User Details */}
                    <div className="relative z-10 flex justify-between items-end mt-auto">
                      
                      <div className="flex flex-col">
                        <p className="text-[#e2c19d] font-semibold text-lg md:text-xl drop-shadow-sm">
                          {handle.startsWith('@') ? handle : `@${handle}`}
                        </p>
                        <h2 className="text-white font-black text-3xl md:text-[2.75rem] leading-none drop-shadow-md uppercase mt-1">
                          {name || 'Existo'}
                        </h2>
                      </div>

                      <div className="flex items-end gap-6 md:gap-10">
                        <div className="hidden sm:flex flex-col pb-2">
                          <span className="text-white/60 text-[10px] md:text-xs font-bold tracking-widest uppercase">Specialty</span>
                          <span className="text-white font-bold text-sm md:text-lg uppercase">{specialty}</span>
                        </div>

                        {/* Profile Picture */}
                        <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-tr from-[#8b5a2b] to-[#e2c19d] shadow-lg shrink-0">
                          <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#1a1a1a]">
                            <Image src={userImage} alt="User" width={96} height={96} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 flex justify-center">
                  <button 
                    onClick={handleDownload}
                    disabled={isGenerating}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-linear-to-r from-[#8b5a2b] to-[#b88b4a] text-white font-bold rounded-2xl shadow-[0_8px_32px_rgba(139,90,43,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
                  >
                    {isGenerating ? (
                      <span className="animate-pulse">Minting Identity Card...</span>
                    ) : (
                      <>
                        <Download className="w-5 h-5" /> Download Citizen Card
                      </>
                    )}
                  </button>
                </div>
                
                <div className="mt-4 flex items-start justify-center gap-2 text-stone-400 text-xs md:text-sm text-center">
                  <Briefcase className="w-4 h-4 text-[#e2c19d] shrink-0 mt-0.5" />
                  <p>Downloads as a crisp, high-resolution PNG ready to share.</p>
                </div>

              </motion.div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

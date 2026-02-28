"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Twitter, Image as ImageIcon, Sparkles, AtSign, User, Zap } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- DATA ---
const banners = [
  "/background.avif", 
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2832&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"  ,

"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNE-UpGrUkES7gC1j-L_fdoNT0PE8yXlnBb2rCYCaFNw&s=10",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAIVdEywzQywvIuufToE-aQDlqBzphmsjJK9L_EZWo2g&s=10"
];

const captions = [
  "Building the future of private DeFi on @seismic.",
  "Just created my Web3 builder profile for @seismic! Come build with us.",
  "Privacy isn't a feature, it's the foundation. Proud to be part of the @seismic ecosystem.",
  "Securing the next generation of fintech with @seismic. Check out my builder card!"
];

export default function SeismicBannerGenerator() {
  // State
  const [selectedBg, setSelectedBg] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [handle, setHandle] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Native HTML5 Canvas Image Generation
  const handleDownload = async () => {
    setIsGenerating(true);
    
    try {
      // 1. Create a native canvas in memory (1500x500 is Twitter Banner size)
      const canvas = document.createElement('canvas');
      canvas.width = 1500;
      canvas.height = 500;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not get canvas context");

      // 2. Load the background image securely
      const img = new window.Image();
      img.crossOrigin = 'anonymous'; // Crucial for external Unsplash images
      img.src = banners[selectedBg];
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // 3. Draw Background Image (Simulate object-fit: cover)
      const imgAspect = img.width / img.height;
      const canvasAspect = canvas.width / canvas.height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgAspect > canvasAspect) {
        drawHeight = canvas.height;
        drawWidth = img.width * (canvas.height / img.height);
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = img.height * (canvas.width / img.width);
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      }
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      // 4. Draw Dark Gradients
      // Bottom-to-Top
      const gradBottom = ctx.createLinearGradient(0, canvas.height, 0, 0);
      gradBottom.addColorStop(0, 'rgba(0,0,0,0.95)');
      gradBottom.addColorStop(0.6, 'rgba(0,0,0,0.3)');
      gradBottom.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradBottom;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Left-to-Right
      const gradLeft = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradLeft.addColorStop(0, 'rgba(0,0,0,0.9)');
      gradLeft.addColorStop(0.5, 'rgba(0,0,0,0.3)');
      gradLeft.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradLeft;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 5. Draw Top Right Accent Line
      const gradAccent = ctx.createLinearGradient(canvas.width - 200, 0, canvas.width, 0);
      gradAccent.addColorStop(0, 'rgba(139,90,43,0.8)');
      gradAccent.addColorStop(1, 'rgba(226,193,157,0)');
      ctx.fillStyle = gradAccent;
      ctx.beginPath();
      // Use standard arc/rect fallback if roundRect isn't supported in older browsers, 
      // but roundRect is widely supported now.
      ctx.roundRect(canvas.width - 200, 40, 200, 8, 4); 
      ctx.fill();

      // 6. Draw User Text
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 65px system-ui, -apple-system, sans-serif';
      const displayName = name || 'Existo';
      ctx.fillText(displayName, 80, 360);

      ctx.fillStyle = '#cda577';
      ctx.font = 'bold 35px system-ui, -apple-system, sans-serif';
      const displayHandle = handle ? `@${handle}` : '@existo999';
      ctx.fillText(displayHandle, 85, 420);

      // 7. Draw Seismic Logo Pill
      const pillWidth = 200;
      const pillHeight = 60;
      const pillX = canvas.width - pillWidth - 60;
      const pillY = canvas.height - pillHeight - 60;
      
      // Pill Background
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 30);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.stroke();

      // Pill Circle icon
      ctx.fillStyle = '#8b5a2b';
      ctx.beginPath();
      ctx.arc(pillX + 35, pillY + 30, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.fillText('S', pillX + 29, pillY + 36);

      // Pill Text
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 22px system-ui, -apple-system, sans-serif';
      ctx.fillText('SEISMIC', pillX + 65, pillY + 38);

      // 8. Generate and Trigger Download
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `Seismic_Banner_${handle || 'Profile'}.png`;
      link.click();

    } catch (error) {
      console.error("Error generating banner:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Share Logic
  const handleShareX = () => {
    const randomCaption = captions[Math.floor(Math.random() * captions.length)];
    const tweetText = encodeURIComponent(`${randomCaption}\n\n(Don't forget to attach the banner you just downloaded!)`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
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
                Builder <span className="text-transparent bg-clip-text bg-linear-to-r from-[#8b5a2b] via-[#e2c19d] to-[#cda577]">Card Generator</span>
              </h1>
              <p className="text-stone-400 text-sm md:text-lg max-w-2xl mx-auto bg-white/5 backdrop-blur-md p-3 md:p-4 rounded-xl border border-white/10 shadow-lg flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-[#e2c19d]" /> Create your personalized Seismic Twitter banner.
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
                    <Sparkles className="w-5 h-5 text-[#e2c19d]" /> Customize Card
                  </h3>

                  {/* Text Inputs */}
                  <div className="space-y-5 mb-8">
                    <div>
                      <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Display Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 w-4 h-4 text-stone-500" />
                        <input 
                          type="text" 
                          placeholder="Existo"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          maxLength={25}
                          className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-stone-600 focus:outline-none focus:border-[#8b5a2b] focus:ring-1 focus:ring-[#8b5a2b] transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Twitter / X Handle</label>
                      <div className="relative">
                        <AtSign className="absolute left-4 top-3.5 w-4 h-4 text-stone-500" />
                        <input 
                          type="text" 
                          placeholder="existo999"
                          value={handle}
                          onChange={(e) => setHandle(e.target.value.replace('@', ''))}
                          maxLength={15}
                          className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-stone-600 focus:outline-none focus:border-[#8b5a2b] focus:ring-1 focus:ring-[#8b5a2b] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Background Selector */}
                  <div>
                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" /> Select Background
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {banners.map((bg, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedBg(index)}
                          className={`relative aspect-[3/1] rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedBg === index ? 'border-[#e2c19d] scale-[1.02] shadow-[0_0_20px_rgba(226,193,157,0.3)]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={bg} alt={`Background ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
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
                {/* The HTML UI Preview (This is just for the user to look at, not what gets downloaded) */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-2 md:p-3 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-x-auto">
                  
                  <div className="relative w-full min-w-[600px] aspect-[3/1] rounded-2xl overflow-hidden bg-black flex flex-col justify-between p-6 md:p-10 pointer-events-none select-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={banners[selectedBg]} 
                      alt="Banner Background" 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                    
                    <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/30 to-transparent opacity-90" />

                    <div className="relative z-10 flex justify-end w-full">
                       <div className="w-32 h-1.5 bg-linear-to-r from-[#8b5a2b] via-[#e2c19d] to-transparent opacity-80 rounded-full" />
                    </div>

                    <div className="relative z-10 flex justify-between items-end w-full mt-auto">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none mb-1 flex items-center gap-3">
                          {name || 'Atilola Emmanuel'}
                        </h2>
                        <p className="text-[#cda577] text-lg sm:text-xl md:text-2xl font-bold tracking-wide opacity-90 flex items-center gap-1">
                          {handle ? `@${handle}` : '@hemmyevo'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 md:gap-3 bg-black/60 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-full border border-white/10 shadow-2xl shrink-0 mb-2 mr-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-linear-to-br from-[#8b5a2b] to-[#cda577] flex items-center justify-center text-white font-bold text-xs md:text-sm">
                          S
                        </div>
                        <span className="font-extrabold text-white tracking-[0.2em] uppercase text-xs md:text-sm">
                          Seismic
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button 
                    onClick={handleDownload}
                    disabled={isGenerating}
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-[#8b5a2b] to-[#b88b4a] text-white font-bold rounded-2xl shadow-[0_8px_32px_rgba(139,90,43,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
                  >
                    {isGenerating ? (
                      <span className="animate-pulse">Generating Image...</span>
                    ) : (
                      <>
                        <Download className="w-5 h-5" /> Download Banner
                      </>
                    )}
                  </button>

                  <button 
                    onClick={handleShareX}
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#1DA1F2]/10 backdrop-blur-md border border-[#1DA1F2]/30 text-white font-bold rounded-2xl hover:bg-[#1DA1F2]/20 shadow-[0_8px_32px_rgba(29,161,242,0.1)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Twitter className="w-5 h-5 text-[#1DA1F2]" /> Share on X
                  </button>
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

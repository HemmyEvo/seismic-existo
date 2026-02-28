"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Upload, Twitter, Sparkles, RefreshCw, Calendar } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- DATA ---
const magnitudes = [
  { id: 1, name: "Magnitude 1", color: "#E6E6B8", chipUrl: "/mag1.jpg" },
  { id: 2, name: "Magnitude 2", color: "#48D1CC", chipUrl: "/mag2.jpeg" },
  { id: 3, name: "Magnitude 3", color: "#228B22", chipUrl: "/mag3.jpeg" },
  { id: 4, name: "Magnitude 4", color: "#90EE90", chipUrl: "/mag4.jpg" },
  { id: 5, name: "Magnitude 5", color: "#9ACD32", chipUrl: "/mag5.jpg" },
  { id: 6, name: "Magnitude 6", color: "#FFD700", chipUrl: "/mag6.jpg" },
  { id: 7, name: "Magnitude 7", color: "#FF8C00", chipUrl: "/mag7.jpg" },
  { id: 8, name: "Magnitude 8", color: "#FF0000", chipUrl: "/mag8.jpg" },
  { id: 9, name: "Magnitude 9", color: "#00D2FF", chipUrl: "/mag9.jpg" }
];

export default function SeismicGreetingGenerator() {
  const [name, setName] = useState<string>('Existo');
  const [magIndex, setMagIndex] = useState<number>(0);
  const [userImage, setUserImage] = useState<string>('/profile.jpeg'); 
  const [theme, setTheme] = useState<'week-start' | 'week-end' | 'month-start' | 'month-end'>('month-start');
  const [currentQuote, setCurrentQuote] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<string>('Cycle');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeMag = magnitudes[magIndex];

  // Safely get the current month on the client side
  useEffect(() => {
    const month = new Date().toLocaleString('default', { month: 'long' });
    setCurrentMonth(month);
  }, []);

  // --- DYNAMIC DATA (Depends on currentMonth) ---
  const dynamicThemes = {
    "week-start": { label: "Week Starting", title: "NEW WEEK ALIGNED" },
    "week-end": { label: "Week Ending", title: "WEEK CONCLUDED" },
    "month-start": { label: "Month Starting", title: `WELCOME TO ${currentMonth.toUpperCase()}` },
    "month-end": { label: "Month Ending", title: `${currentMonth.toUpperCase()} CONCLUDED` }
  };

  const dynamicQuotes = {
    "week-start": [
      "A new week, a new block. Build relentlessly.",
      "Momentum is created, not found. Seize the week.",
      "Deploy your vision. The week is yours to command."
    ],
    "week-end": [
      "Rest is part of the protocol. Recharge for the next cycle.",
      "Reflect on the blocks built. The week is secure.",
      "Greatness takes time. Step back and view the architecture."
    ],
    "month-start": [
      `A new chapter in the ledger. What will you write in ${currentMonth}?`,
      `Broaden your bandwidth. ${currentMonth} holds infinite potential.`,
      `Initialize greatness. Welcome to ${currentMonth}.`
    ],
    "month-end": [
      `Milestones achieved. Data processed. Farewell, ${currentMonth}.`,
      `Look at the network you've built. ${currentMonth} was a success.`,
      `Close the loops. A phenomenal ${currentMonth} comes to a halt.`
    ]
  };

  // Set initial random quote on load, theme change, or month load
  useEffect(() => {
    getRandomQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, currentMonth]);

  const getRandomQuote = () => {
    const themeQuotes = dynamicQuotes[theme];
    const randomIndex = Math.floor(Math.random() * themeQuotes.length);
    setCurrentQuote(themeQuotes[randomIndex]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) setUserImage(event.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  // Helper to wrap text on Canvas
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for(let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not get canvas context");

      const [chipImg, profileImg] = await Promise.all([
        loadImage(activeMag.chipUrl),
        loadImage(userImage)
      ]);

      // 1. Background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle Grid overlay
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for(let i = 0; i < canvas.width; i += 60) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }

      // 2. Sleek Frame with Magnitude Color Accent
      const margin = 50;
      ctx.strokeStyle = activeMag.color;
      ctx.lineWidth = 4;
      
      const cornerLength = 80;
      ctx.beginPath();
      ctx.moveTo(margin, margin + cornerLength); ctx.lineTo(margin, margin); ctx.lineTo(margin + cornerLength, margin);
      ctx.moveTo(canvas.width - margin - cornerLength, margin); ctx.lineTo(canvas.width - margin, margin); ctx.lineTo(canvas.width - margin, margin + cornerLength);
      ctx.moveTo(canvas.width - margin, canvas.height - margin - cornerLength); ctx.lineTo(canvas.width - margin, canvas.height - margin); ctx.lineTo(canvas.width - margin - cornerLength, canvas.height - margin);
      ctx.moveTo(margin + cornerLength, canvas.height - margin); ctx.lineTo(margin, canvas.height - margin); ctx.lineTo(margin, canvas.height - margin - cornerLength);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.strokeRect(margin + 15, margin + 15, canvas.width - (margin*2) - 30, canvas.height - (margin*2) - 30);

      // 3. Header Texts
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 48px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '10px';
      ctx.fillText('SEISMIC', canvas.width / 2, 160);

      ctx.fillStyle = activeMag.color;
      ctx.font = '600 24px system-ui, sans-serif';
      ctx.letterSpacing = '6px';
      ctx.fillText(dynamicThemes[theme].title, canvas.width / 2, 210);

      // 4. Quote (Centered)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'italic 500 56px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '0px';
      const quoteY = 480; 
      wrapText(ctx, `"${currentQuote}"`, canvas.width / 2, quoteY, 800, 70);

      // 5. User Profile Area
      const profileSize = 120;
      const profileX = margin + 40;
      const profileY = canvas.height - margin - profileSize - 40;

      ctx.save();
      ctx.beginPath();
      ctx.arc(profileX + profileSize/2, profileY + profileSize/2, profileSize/2, 0, Math.PI * 2);
      ctx.clip();

      const pAspect = profileImg.width / profileImg.height;
      let pW, pH;
      if (pAspect > 1) { pH = profileSize; pW = profileSize * pAspect; } 
      else { pW = profileSize; pH = profileSize / pAspect; }
      ctx.drawImage(profileImg, profileX - (pW - profileSize)/2, profileY - (pH - profileSize)/2, pW, pH);
      ctx.restore();

      ctx.strokeStyle = activeMag.color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(profileX + profileSize/2, profileY + profileSize/2, profileSize/2 + 6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 36px system-ui, sans-serif';
      ctx.fillText(name.toUpperCase(), profileX + profileSize + 30, profileY + 55);

      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '600 20px system-ui, sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText(activeMag.name.toUpperCase(), profileX + profileSize + 30, profileY + 95);

      // 6. Website URL
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = '600 22px system-ui, sans-serif';
      ctx.fillText('seismic-existo.vercel.app', canvas.width - margin - 40, canvas.height - margin - 60);

      // 7. Magnitude Chip
      const chipW = 80; const chipH = 55;
      const chipX = canvas.width - margin - chipW - 40;
      const chipY = canvas.height - margin - 150;
      
      ctx.save();
      ctx.beginPath(); ctx.roundRect(chipX, chipY, chipW, chipH, 8); ctx.clip();
      ctx.drawImage(chipImg, chipX, chipY, chipW, chipH);
      ctx.restore();
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 2;
      ctx.strokeRect(chipX, chipY, chipW, chipH);

      const finalImage = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = finalImage;
      link.download = `Seismic_${theme}_${name}.png`;
      link.click();

    } catch (error) {
      console.error("Error generating card:", error);
      alert("Failed to generate image.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`Gmic! 🌊\n\n"${currentQuote}"\n\nCreate your custom Seismic greeting here: https://seismic-existo.vercel.app/ \n\n@existo99`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <div className="bg-[#050505] text-stone-100 min-h-screen font-sans selection:bg-[#8b5a2b]/50 relative overflow-x-hidden">
      <Header />

      <main className="relative z-10 pt-28 pb-16 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col justify-center">
        
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Seismic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5a2b] to-[#e2c19d]">Greetings</span>
            </h1>
            <p className="text-stone-400 text-sm md:text-lg max-w-2xl mx-auto">
              Generate aesthetic weekly & monthly updates.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#e2c19d]" /> Configuration
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Greeting Type</label>
                  <select 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as any)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#e2c19d]"
                  >
                    {Object.entries(dynamicThemes).map(([key, val]) => (
                      <option key={key} value={key} className="bg-stone-900">{val.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex justify-between">
                    <span>Current Quote</span>
                    <button onClick={getRandomQuote} className="text-[#e2c19d] hover:text-white flex items-center gap-1">
                      <RefreshCw className="w-3 h-3" /> Randomize
                    </button>
                  </label>
                  <div className="bg-black/50 border border-white/10 rounded-xl p-4 text-sm italic text-stone-300">
                    "{currentQuote}"
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={15}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e2c19d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Magnitude</label>
                  <select 
                    value={magIndex}
                    onChange={(e) => setMagIndex(Number(e.target.value))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#e2c19d]"
                  >
                    {magnitudes.map((mag, idx) => (
                      <option key={mag.id} value={idx} className="bg-stone-900">{mag.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Profile Image</label>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/20">
                      <Image src={userImage} alt="Avatar" width={48} height={48} className="w-full h-full object-cover" />
                    </div>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors text-stone-300"
                    >
                      Upload Photo
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            
            <div className="bg-[#050505] relative w-full aspect-square max-w-[500px] mx-auto rounded-xl overflow-hidden border border-white/10 shadow-2xl p-6 sm:p-10 flex flex-col items-center justify-between">
              
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: activeMag.color }} />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 pointer-events-none" style={{ borderColor: activeMag.color }} />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 pointer-events-none" style={{ borderColor: activeMag.color }} />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: activeMag.color }} />
              <div className="absolute inset-6 border border-white/10 pointer-events-none" />

              <div className="relative z-10 text-center mt-4">
                <h2 className="text-white font-bold text-2xl tracking-[0.3em]">SEISMIC</h2>
                <h3 className="text-sm font-semibold tracking-widest mt-1 uppercase" style={{ color: activeMag.color }}>
                  {dynamicThemes[theme].title}
                </h3>
              </div>

              <div className="relative z-10 text-center px-4 w-full max-w-[400px]">
                <p className="text-white text-xl sm:text-2xl font-medium italic leading-snug">
                  "{currentQuote}"
                </p>
              </div>

              <div className="relative z-10 w-full flex justify-between items-end mb-2 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2" style={{ borderColor: activeMag.color }}>
                    <Image src={userImage} alt="User" width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg sm:text-xl leading-none">{name.toUpperCase()}</h4>
                    <p className="text-white/60 text-xs sm:text-sm font-semibold tracking-wider mt-1">{activeMag.name.toUpperCase()}</p>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-2">
                  <div className="w-12 h-8 rounded border border-white/20 overflow-hidden">
                    <Image src={activeMag.chipUrl} alt="Chip" width={48} height={32} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-white font-semibold text-[10px] sm:text-xs tracking-wider">seismic-existo.vercel.app</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-[500px] mx-auto w-full">
              <button 
                onClick={handleDownload}
                disabled={isGenerating}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white text-black font-bold rounded-xl hover:bg-stone-200 transition-all disabled:opacity-70 cursor-pointer"
              >
                {isGenerating ? "Processing..." : <><Download className="w-5 h-5" /> Download Image</>}
              </button>
              
              <button 
                onClick={handleTwitterShare}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#1DA1F2] text-white font-bold rounded-xl hover:bg-[#1a8cd8] transition-all cursor-pointer"
              >
                <Twitter className="w-5 h-5" /> Share to X
              </button>
            </div>
            <p className="text-center text-xs text-stone-500 mt-2">
              Note: Download the image first, then click "Share to X" to attach it to your drafted tweet!
            </p>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
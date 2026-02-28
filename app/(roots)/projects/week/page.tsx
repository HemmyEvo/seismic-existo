"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Twitter, RefreshCw, Calendar } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 1. Import Convex hooks
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

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

type ThemeType = 'week-start' | 'week-end' | 'month-start' | 'month-end';

export default function SeismicGreetingGenerator() {
  const [name, setName] = useState<string>('Existo');
  const [magIndex, setMagIndex] = useState<number>(0);
  const [userImage, setUserImage] = useState<string>('/profile.jpeg'); 
  const [theme, setTheme] = useState<ThemeType>('month-start');
  const [currentQuote, setCurrentQuote] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<string>('Cycle');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeMag = magnitudes[magIndex];

  // 2. Initialize the Convex mutation
  const logDownload = useMutation(api.projects.logImageDownload);

  // Safely get the current month on the client side
  useEffect(() => {
    const month = new Date().toLocaleString('default', { month: 'long' });
    setCurrentMonth(month);
  }, []);

  // --- DYNAMIC DATA (Depends on currentMonth) ---
  const dynamicThemes: Record<ThemeType, { label: string; title: string }> = {
    "week-start": { label: "Week Starting", title: "NEW WEEK ALIGNED" },
    "week-end": { label: "Week Ending", title: "WEEK CONCLUDED" },
    "month-start": { label: "Month Starting", title: `WELCOME TO ${currentMonth.toUpperCase()}` },
    "month-end": { label: "Month Ending", title: `${currentMonth.toUpperCase()} CONCLUDED` }
  };

const dynamicQuotes: Record<ThemeType, string[]> = {
  "week-start": [
    "A new week, a new block. Build relentlessly.",
    "Momentum is created, not found. Seize the week.",
    "Deploy your vision. The week is yours to command.",
    "System reboot complete. Initialize the week's objectives.",
    "The genesis block of the week. Mine it well.",
    "Clear your cache. Execute the Monday protocol.",
    "Spin up your nodes. It’s time to sync with the network.",
    "Open a new terminal. The week awaits your commands.",
    "Commit to greatness. Push your limits this week.",
    "New week detected. Compiling success algorithms.",
    "Route your focus. Bandwidth is precious this week.",
    "Ping your goals. Expect a 100% success rate.",
    "Your weekly compute cycle begins now. Optimize it.",
    "Break the week down into actionable commits.",
    "Merge your ambition with action. Let’s build.",
    "A fresh sprint starts today. Track your velocity.",
    "Unlock the vault. The week's potential is unencrypted.",
    "Run the start-up script. Let's get to work.",
    "Allocate your memory to what matters most this week.",
    "No syntax errors today. Just flawless execution.",
    "The server is live. Broadcast your intent to the world.",
    "A blank canvas in the console. Write the master code.",
    "Parse the week's challenges. Output nothing but wins.",
    "Initialize the main loop. Keep iterating until victory.",
    "Establish a secure connection to your goals today.",
    "Elevate your permissions. Take control of the week.",
    "Decrypt Monday. The key is relentless focus.",
    "Your architecture is solid. Now scale it up this week.",
    "Ready the payload. This week, we launch.",
    "Query the database of your potential. Return maximum results.",
    "Format the noise. Write only clean logic this week.",
    "Your uptime starts now. Keep the momentum continuous.",
    "Generate the keys to this week's success.",
    "Shift your paradigm. The week is ripe for innovation.",
    "Resolve all dependencies. You are the sole architect today.",
    "Open-source your energy. Lead by example this week.",
    "Bypass the firewall of doubt. Execute your vision.",
    "Mount the new volume. The week's data is ready to be written.",
    "Set your environment variables for absolute success.",
    "The network is waiting for your next broadcast. Make it loud.",
    "Synchronize your team. Let the weekly build commence.",
    "Automate your discipline. Let success run in the background.",
    "Hash your intentions. Make them immutable this week.",
    "Boot sequence initiated. Ready for high-level operations.",
    "Index your priorities. Query them daily.",
    "Optimize your query execution. Make every day count.",
    "Refactor your mindset. It’s a brand new week.",
    "The pipeline is clear. Push to production.",
    "Validate your inputs. This week demands quality data.",
    "A 200 OK status for the week ahead. Start building."
  ],
  "week-end": [
    "Rest is part of the protocol. Recharge for the next cycle.",
    "Reflect on the blocks built. The week is secure.",
    "Greatness takes time. Step back and view the architecture.",
    "Initiating cool-down sequence. Power down and disconnect.",
    "Run garbage collection. Clear your mind for the weekend.",
    "Commit your progress. The weekly sprint is complete.",
    "Save state. It's time to log off and reset.",
    "Bandwidth exhausted. Enter sleep mode.",
    "Close all open ports. Secure your peace of mind.",
    "The server needs maintenance. Take time to heal and rest.",
    "End of execution block. Review the logs tomorrow.",
    "Your uptime was stellar. Now enjoy some well-earned latency.",
    "Disconnect from the node. Reconnect with yourself.",
    "Weekly variables stored. RAM cleared.",
    "Successful deployment. Now let the system idle.",
    "Terminate background processes. Focus on recovery.",
    "Let the algorithms rest. Human mode activated.",
    "Compile your thoughts. The week's build is stable.",
    "Put the project in standby. Life happens offline.",
    "Defragment your brain. You've processed enough data.",
    "Archive the week's stress. It’s no longer needed.",
    "Shift offline. The real world has better resolution.",
    "Pause the cron jobs. Let the weekend flow naturally.",
    "Unplug the ethernet. Go wireless for a few days.",
    "The ledger is updated. Your work here is done.",
    "Close the terminal. Open a book instead.",
    "You’ve earned your bandwidth back. Spend it on joy.",
    "Save and Exit. The weekend protocol is now active.",
    "System override: Mandating 48 hours of relaxation.",
    "Store your achievements in long-term memory.",
    "Acknowledge the week's runtime. You did well.",
    "Log out of the grid. Nature has no API limits.",
    "Graceful shutdown initialized. See you Monday.",
    "Review your analytics later. Now is the time to breathe.",
    "The firewall is up against work emails. Enjoy the weekend.",
    "Task failed successfully: You worked hard, now rest harder.",
    "Cache cleared. Returning to a state of zen.",
    "No more queries until Monday. Database locked.",
    "You’ve reached the end of the loop. Break and rest.",
    "Your hardware needs cooling. Step away from the screen.",
    "Power saving mode on. Conserve your energy.",
    "Unmount the work drive. Mount the weekend drive.",
    "Syncing complete. Enjoy the offline experience.",
    "Drop all tables of stress. Rebuild them never.",
    "The week's code is pushed. Let it run without you.",
    "Halt execution. Enjoy the silence of the hardware.",
    "Disconnecting from the matrix. Welcome back to reality.",
    "The week's transaction is confirmed. Take a break.",
    "Your API is rate-limited until Monday morning.",
    "Shut down all containers. Let the host machine rest."
  ],
  "month-start": [
    `A new chapter in the ledger. What will you write in ${currentMonth}?`,
    `Broaden your bandwidth. ${currentMonth} holds infinite potential.`,
    `Initialize greatness. Welcome to ${currentMonth}.`,
    `A macro-cycle begins. Set your global variables for ${currentMonth}.`,
    `Version ${currentMonth} is now live. Read the release notes of your life.`,
    `The ${currentMonth} block has been mined. Start building on top of it.`,
    `Clear the monthly cache. ${currentMonth} requires fresh logic.`,
    `Deploy the ${currentMonth} roadmap. Stick to the architecture.`,
    `A new directory created: /${currentMonth}. Fill it with value.`,
    `Ping the future. ${currentMonth} is responding with low latency.`,
    `Update your dependencies. ${currentMonth} demands a better you.`,
    `The ${currentMonth} genesis state is set. What’s your first move?`,
    `Allocate major computing power to your ${currentMonth} objectives.`,
    `Welcome to ${currentMonth}. Your access tokens have been refreshed.`,
    `A new database partition: ${currentMonth}. Write high-quality data.`,
    `Scale up. ${currentMonth} is the time for enterprise-level growth.`,
    `Booting the ${currentMonth} environment. All systems nominal.`,
    `Let ${currentMonth} be your most optimized iteration yet.`,
    `Querying the next 30 days: Endless possibilities found in ${currentMonth}.`,
    `Merge the lessons of the past. Commit to a flawless ${currentMonth}.`,
    `Open a new socket. ${currentMonth} is ready to receive data.`,
    `Format the timeline. ${currentMonth} is a clean slate.`,
    `The ${currentMonth} network upgrade is complete. Enjoy the new features.`,
    `Initialize ${currentMonth}.sh. Let the automation of success begin.`,
    `Your quota has been reset for ${currentMonth}. Use every cycle.`,
    `Load balancing complete. You are ready to handle ${currentMonth}.`,
    `Welcome to the ${currentMonth} runtime. Execute with precision.`,
    `Elevate your privileges this ${currentMonth}. You are the superuser.`,
    `New hash generated. ${currentMonth} is officially secured.`,
    `Drop the legacy code. ${currentMonth} is about modern solutions.`,
    `The ${currentMonth} daemon is running in the background. Keep moving forward.`,
    `Mount the ${currentMonth} filesystem. Prepare for heavy read/writes.`,
    `Unlock the ${currentMonth} achievements. The game starts now.`,
    `Establish a baseline for ${currentMonth}. Then shatter it.`,
    `Your ${currentMonth} repository is initialized. Time for the first commit.`,
    `Syncing with the ${currentMonth} satellite. Signal is strong.`,
    `The logic gate opens. Step into ${currentMonth} with purpose.`,
    `Configure your settings for maximum output in ${currentMonth}.`,
    `A new thread spawned. ${currentMonth} is running concurrently.`,
    `Decrypt the opportunities hidden within ${currentMonth}.`,
    `Welcome to the ${currentMonth} cluster. Let's process some massive goals.`,
    `Set your status to 'Building'. ${currentMonth} takes no days off.`,
    `The ${currentMonth} domain has been registered. Start hosting.`,
    `Pull the latest image for ${currentMonth}. Let's get deploying.`,
    `Map your inputs to incredible outputs this ${currentMonth}.`,
    `The syntax of ${currentMonth} is yours to define.`,
    `Welcome to the ${currentMonth} sandbox. Build without limits.`,
    `Start the ${currentMonth} instance. It's time to go live.`,
    `A new genesis file created. ${currentMonth} is online.`,
    `Optimize your routing. The path to success in ${currentMonth} is clear.`
  ],
  "month-end": [
    `Milestones achieved. Data processed. Farewell, ${currentMonth}.`,
    `Look at the network you've built. ${currentMonth} was a success.`,
    `Close the loops. A phenomenal ${currentMonth} comes to a halt.`,
    `Compile the monthly report. ${currentMonth} is officially in the logs.`,
    `End of file reached for ${currentMonth}. Saving progress.`,
    `The ${currentMonth} iteration is complete. Time to review the metrics.`,
    `Archive ${currentMonth}. It’s time to prepare the next volume.`,
    `Shutting down the ${currentMonth} environment. All data secured.`,
    `Run the retrospective. What bugs did we squash in ${currentMonth}?`,
    `The ${currentMonth} ledger is balanced and immutable.`,
    `Garbage collection for ${currentMonth} complete. Moving forward.`,
    `Acknowledge the runtime of ${currentMonth}. You executed well.`,
    `Push the final commits for ${currentMonth}. The branch is closing.`,
    `Save state. ${currentMonth} has been successfully rendered.`,
    `The ${currentMonth} node is syncing its final blocks.`,
    `Exporting ${currentMonth} analytics. The data looks incredible.`,
    `Close the ${currentMonth} directory. We are moving up a level.`,
    `The ${currentMonth} daemon is spinning down. Great work.`,
    `Commit history for ${currentMonth} looks solid. No rollbacks needed.`,
    `Disconnecting from ${currentMonth}. Preparing for the next handshake.`,
    `The ${currentMonth} protocol has reached its end-of-life. Upgrade pending.`,
    `Store the memories of ${currentMonth} in cold storage.`,
    `Closing all active connections for ${currentMonth}.`,
    `The bandwidth of ${currentMonth} has been fully utilized.`,
    `Finalize the ${currentMonth} build. It was a stable release.`,
    `Log out of ${currentMonth}. You've earned the transition.`,
    `The ${currentMonth} cycle has terminated successfully. Exit code 0.`,
    `Unmount ${currentMonth}. The drive is full of accomplishments.`,
    `Verify the checksum for ${currentMonth}. Everything is intact.`,
    `The ${currentMonth} server is being decommissioned. Stand by.`,
    `Flush the DNS cache. We are routing away from ${currentMonth}.`,
    `The ${currentMonth} smart contract has been fully executed.`,
    `Terminate the ${currentMonth} instance. It served us well.`,
    `Review your root permissions. You owned ${currentMonth}.`,
    `End of the macro-loop. ${currentMonth} is exiting gracefully.`,
    `The ${currentMonth} repository is now read-only.`,
    `Generate the final hash for ${currentMonth}. Seal the records.`,
    `The firewall closes on ${currentMonth}. Secure the perimeter.`,
    `Acknowledge the packets received in ${currentMonth}. Good transmission.`,
    `The ${currentMonth} session has expired. Please authenticate the next.`,
    `Drop the ${currentMonth} tables from active memory.`,
    `The ${currentMonth} compilation finished with zero warnings.`,
    `Close the terminal window on ${currentMonth}.`,
    `The ping to ${currentMonth} has timed out. It is officially in the past.`,
    `Wrap up the API calls. ${currentMonth} is deprecating tonight.`,
    `The pipeline for ${currentMonth} is flushed and clear.`,
    `Extract the value from ${currentMonth}. Discard the rest.`,
    `The ${currentMonth} sub-routine has finished executing.`,
    `Stop the background workers for ${currentMonth}. They’ve done enough.`,
    `Halt the ${currentMonth} processor. Prepare for the reboot.`
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

      // Generate Data URL
      const finalImage = canvas.toDataURL("image/png");

      // 3. Call Convex instead of Fetch API
      await logDownload({
        projectSlug: `seismic-${theme}`, // Using a dynamic slug to separate week vs month data 
        projectName: `Seismic ${dynamicThemes[theme].label} Generator`,
        imageData: finalImage,
        generatedByName: name,
        generatedByHandle: name,
      }).catch((err) => {
        // Silently fail logging rather than breaking the user download
        console.error("Failed to log download to Convex", err);
      });

      // Trigger download
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
              Seismic <span className="text-transparent bg-clip-text bg-linear-to-r from-[#8b5a2b] to-[#e2c19d]">Greetings</span>
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
                    onChange={(e) => setTheme(e.target.value as ThemeType)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#e2c19d]"
                  >
                    {Object.entries(dynamicThemes).map(([key, val]) => (
                      <option key={key} value={key} className="bg-stone-900">{val.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className=" text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex justify-between">
                    <span>Current Quote</span>
                    <button onClick={getRandomQuote} className="text-[#e2c19d] hover:text-white flex items-center gap-1">
                      <RefreshCw className="w-3 h-3" /> Randomize
                    </button>
                  </label>
                  <div className="bg-black/50 border border-white/10 rounded-xl p-4 text-sm italic text-stone-300">
                    &quot;{currentQuote}&quot;
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
            
            <div className="bg-[#050505] relative w-full aspect-square max-w-125 mx-auto rounded-xl overflow-hidden border border-white/10 shadow-2xl p-6 sm:p-10 flex flex-col items-center justify-between">
              
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />

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

              <div className="relative z-10 text-center px-4 w-full max-w-100">
                <p className="text-white text-xl sm:text-2xl font-medium italic leading-snug">
                  &quot;{currentQuote}&quot;
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-125 mx-auto w-full">
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
              Note: Download the image first, then click &quot;Share to X&quot; to attach it to your drafted tweet!
            </p>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
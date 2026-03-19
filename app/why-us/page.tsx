"use client";

import React, { useEffect, useState } from 'react';

export default function WhyUsPage() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [lang, setLang] = useState<'EN' | 'GR'>('EN');

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="font-sans antialiased bg-[#030303] text-[#FAFAFA] min-h-screen selection:bg-[#0055FF] selection:text-white relative overflow-x-hidden">
      
      {/* Global Background (Matches Home Page) */}
      <div 
        className="fixed inset-0 z-[1] pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `translateY(${scrollY * 0.15}px) scale(${1 + scrollY * 0.0002})`,
          opacity: mounted ? Math.min(0.8, 0.4 + scrollY / 1500) : 0
        }}
      >
        <div className="absolute inset-0 bg-[#0055FF]/10 mix-blend-color z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/40 via-[#030303]/80 to-[#030303] z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=2000&auto=format&fit=crop" 
          alt="The Parthenon" 
          className="w-full h-[120vh] object-cover opacity-20 grayscale contrast-125"
        />
      </div>

      {/* Navigation */}
      <nav className="w-full top-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 sticky">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-serif font-bold tracking-widest uppercase flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-all focus:outline-none">
            RENZO <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF] mt-1 shadow-[0_0_10px_#0055FF]"></span>
          </a>
          
          <div className="flex items-center gap-6">
            <a href="/" className="hidden md:block text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-[#0055FF] transition-colors">
              {lang === 'EN' ? '← Back to Home' : '← Πίσω στην Αρχική'}
            </a>
            <div className="flex bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden text-[10px] font-bold tracking-widest uppercase">
              <button onClick={() => setLang('EN')} className={`px-3 py-2 transition-all ${lang === 'EN' ? 'bg-[#0055FF] text-white' : 'text-zinc-500 hover:text-white'}`}>EN</button>
              <button onClick={() => setLang('GR')} className={`px-3 py-2 transition-all ${lang === 'GR' ? 'bg-[#0055FF] text-white' : 'text-zinc-500 hover:text-white'}`}>GR</button>
            </div>
            <a href="/#the-agora" className="hidden md:block border border-[#0055FF] text-[#0055FF] px-6 py-2.5 text-[10px] font-bold tracking-widest hover:bg-[#0055FF] hover:text-white transition-all duration-300 uppercase">
                {lang === 'EN' ? 'Start a Project' : 'Ξεκινηστε'}
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-sans font-black tracking-tighter uppercase mb-6 text-white drop-shadow-2xl">
          {lang === 'EN' ? 'WHY' : 'ΓΙΑΤΙ'} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055FF] to-blue-400">
            RENZO?
          </span>
        </h1>
        <p className="text-zinc-400 font-light max-w-2xl mx-auto text-lg mt-6">
          {lang === 'EN' 
            ? 'We refuse to deliver average. Here is how our engineering compares to standard agency practices.' 
            : 'Αρνούμαστε να παραδώσουμε κάτι μέτριο. Δείτε πώς συγκρίνεται η μηχανική μας με τις πρακτικές των κοινών agencies.'}
        </p>
      </section>

      {/* Comparison Table Section */}
      <section className="pb-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="bg-zinc-950/70 backdrop-blur-xl border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl">
            
            {/* Table Header */}
            <div className="grid grid-cols-2 bg-black border-b border-zinc-800">
              <div className="p-8 md:p-10 border-r border-zinc-800">
                <h3 className="text-3xl font-black uppercase tracking-widest text-white">RENZO.</h3>
              </div>
              <div className="p-8 md:p-10 flex items-center">
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-zinc-600">
                  {lang === 'EN' ? 'OTHER AGENCIES' : 'ΑΛΛΑ AGENCIES'}
                </h3>
              </div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-2 border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
              <div className="p-6 md:p-10 border-r border-zinc-800/50 flex items-center gap-4">
                <CheckIcon />
                <p className="text-white font-medium text-sm md:text-lg leading-relaxed">
                  {lang === 'EN' ? 'Premium, custom high-spec web architecture' : 'Premium, custom web architecture υψηλών προδιαγραφών'}
                </p>
              </div>
              <div className="p-6 md:p-10 flex items-center gap-4 opacity-50">
                <CrossIcon />
                <p className="text-zinc-400 font-light text-sm md:text-lg leading-relaxed">
                  {lang === 'EN' ? 'Mass production & prefab templates' : 'Μαζική παραγωγή & προκάτ templates'}
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
              <div className="p-6 md:p-10 border-r border-zinc-800/50 flex items-center gap-4">
                <CheckIcon />
                <p className="text-white font-medium text-sm md:text-lg leading-relaxed">
                  {lang === 'EN' ? 'Absolute focus on conversion and speed' : 'Απόλυτη εστίαση στο conversion και την ταχύτητα'}
                </p>
              </div>
              <div className="p-6 md:p-10 flex items-center gap-4 opacity-50">
                <CrossIcon />
                <p className="text-zinc-400 font-light text-sm md:text-lg leading-relaxed">
                  {lang === 'EN' ? 'Slow websites that lose customers' : 'Αργά websites που χάνουν πελάτες'}
                </p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-2 border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
              <div className="p-6 md:p-10 border-r border-zinc-800/50 flex items-center gap-4">
                <CheckIcon />
                <p className="text-white font-medium text-sm md:text-lg leading-relaxed">
                  {lang === 'EN' ? 'Lightning-fast execution & immediate response' : 'Αστραπιαία εκτέλεση & άμεση απόκριση'}
                </p>
              </div>
              <div className="p-6 md:p-10 flex items-center gap-4 opacity-50">
                <CrossIcon />
                <p className="text-zinc-400 font-light text-sm md:text-lg leading-relaxed">
                  {lang === 'EN' ? 'Slow processes & constant delays' : 'Αργές διαδικασίες & συνεχείς καθυστερήσεις'}
                </p>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-2 hover:bg-zinc-900/30 transition-colors">
              <div className="p-6 md:p-10 border-r border-zinc-800/50 flex items-center gap-4">
                <CheckIcon />
                <p className="text-white font-medium text-sm md:text-lg leading-relaxed">
                  {lang === 'EN' ? 'Fair prices with absolutely clear pricing' : 'Δίκαιες τιμές με απολύτως ξεκάθαρη κοστολόγηση'}
                </p>
              </div>
              <div className="p-6 md:p-10 flex items-center gap-4 opacity-50">
                <CrossIcon />
                <p className="text-zinc-400 font-light text-sm md:text-lg leading-relaxed">
                  {lang === 'EN' ? 'Unpredictable costs & hidden charges' : 'Απρόβλεπτα κόστη & κρυφές χρεώσεις'}
                </p>
              </div>
            </div>

          </div>

          <div className="mt-16 text-center">
            <a href="/#the-agora" className="inline-block bg-[#0055FF] text-white px-10 py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,85,255,0.3)] hover:scale-105 rounded-sm">
              {lang === 'EN' ? 'Experience The Difference' : 'Ζηστε Τη Διαφορα'}
            </a>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-900 py-12 bg-black flex flex-col items-center justify-center gap-6">
        <p className="text-zinc-600 text-[10px] font-bold tracking-[0.3em] uppercase text-center">
          <span className="text-[#0055FF] mr-2">🏛️</span> 
          © {new Date().getFullYear()} RENZO AGENCY. {lang === 'EN' ? 'DIGITAL INFRASTRUCTURE.' : 'ΨΗΦΙΑΚΗ ΥΠΟΔΟΜΗ.'}
        </p>
      </footer>
    </main>
  );
}

// Glowing Green Check Icon for Renzo
function CheckIcon() {
  return (
    <div className="min-w-[24px] h-6 rounded-full flex items-center justify-center bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
}

// Red Cross Icon for "Other Agencies"
function CrossIcon() {
  return (
    <div className="min-w-[24px] h-6 flex items-center justify-center text-red-500/70">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </div>
  );
}
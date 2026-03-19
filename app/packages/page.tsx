"use client";

import React, { useEffect, useState } from 'react';

export default function PackagesPage() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [lang, setLang] = useState<'EN' | 'GR'>('EN');

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="font-sans antialiased bg-[#030303] text-[#FAFAFA] min-h-screen selection:bg-[#0055FF] selection:text-white relative overflow-x-hidden">
      
      {/* Global Background (Matches Home Page Exactly) */}
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
          {lang === 'EN' ? 'WEBSITE' : 'ΙΣΤΟΣΕΛΙΔΕΣ'} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055FF] to-blue-400">
            {lang === 'EN' ? 'PACKAGES' : 'ΠΑΚΕΤΑ'}
          </span>
        </h1>
        <p className="text-zinc-400 font-light max-w-xl mx-auto text-lg mt-6">
          {lang === 'EN' 
            ? 'Transparent pricing for high-performance digital infrastructure.' 
            : 'Διαφανής τιμολόγηση για ψηφιακές υποδομές υψηλής απόδοσης.'}
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="pb-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Essential Tier */}
          <div className="bg-zinc-950/70 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] p-10 flex flex-col shadow-2xl hover:border-zinc-700 transition-all duration-300 group">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-white">Essential</h3>
            <p className="text-zinc-500 text-sm font-light mb-8 h-10">
              {lang === 'EN' ? 'The foundation for a strong corporate identity.' : 'Η βάση για μια ισχυρή εταιρική ταυτότητα.'}
            </p>
            <div className="mb-8 border-b border-zinc-800/50 pb-8">
              <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">Investment</span>
              <h4 className="text-5xl font-black mt-2 text-white">500€</h4>
            </div>
            <ul className="space-y-4 mb-12 flex-grow text-sm font-medium text-zinc-300">
              <li className="flex items-center gap-3"><CheckIcon /> Custom UI/UX Design</li>
              <li className="flex items-center gap-3"><CheckIcon /> Responsive Architecture</li>
              <li className="flex items-center gap-3"><CheckIcon /> Basic SEO</li>
              <li className="flex items-center gap-3"><CheckIcon /> Contact Systems</li>
              <li className="flex items-center gap-3"><CheckIcon /> High Speed Hosting Setup</li>
            </ul>
            <a href="/#the-agora" className="w-full py-4 border border-zinc-800 text-zinc-300 text-center rounded-sm text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300">
              {lang === 'EN' ? 'Get Started' : 'Ξεκινηστε'}
            </a>
          </div>

          {/* Professional Tier (Highlighted Blue Accent) */}
          <div className="bg-[#050505]/90 backdrop-blur-xl border border-[#0055FF]/50 rounded-[2rem] p-10 flex flex-col shadow-[0_0_30px_rgba(0,85,255,0.15)] relative transform md:-translate-y-4 hover:border-[#0055FF] transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0055FF] to-transparent opacity-100"></div>
            <div className="absolute top-6 right-6 bg-[#0055FF] text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-sm shadow-[0_0_10px_rgba(0,85,255,0.5)]">
              {lang === 'EN' ? 'Most Wanted' : 'Δημοφιλεστερο'}
            </div>
            
            <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-white">Professional</h3>
            <p className="text-zinc-400 text-sm font-light mb-8 h-10">
              {lang === 'EN' ? 'The choice of Market Leaders.' : 'Η επιλογή των Market Leaders.'}
            </p>
            <div className="mb-8 border-b border-zinc-800 pb-8">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#0055FF]">Investment</span>
              <h4 className="text-5xl font-black mt-2 text-white">1.200€</h4>
            </div>
            <ul className="space-y-4 mb-12 flex-grow text-sm font-medium text-zinc-200">
              <li className="flex items-center gap-3"><CheckIcon accent /> Advanced Framer/React Motion</li>
              <li className="flex items-center gap-3"><CheckIcon accent /> Dynamic CMS</li>
              <li className="flex items-center gap-3"><CheckIcon accent /> Full SEO Strategy</li>
              <li className="flex items-center gap-3"><CheckIcon accent /> Premium Animations</li>
              <li className="flex items-center gap-3"><CheckIcon accent /> Conversion Optimization</li>
            </ul>
            <a href="/#the-agora" className="w-full py-4 bg-[#0055FF] text-white text-center rounded-sm text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,85,255,0.3)]">
              {lang === 'EN' ? 'Get Started' : 'Ξεκινηστε'}
            </a>
          </div>

          {/* Enterprise Tier */}
          <div className="bg-zinc-950/70 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] p-10 flex flex-col shadow-2xl hover:border-zinc-700 transition-all duration-300 group">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-zinc-400">Enterprise</h3>
            <p className="text-zinc-500 text-sm font-light mb-8 h-10">
              {lang === 'EN' ? 'Cutting-edge technology without limits.' : 'Τεχνολογία αιχμής χωρίς περιορισμούς.'}
            </p>
            <div className="mb-8 border-b border-zinc-800/50 pb-8">
              <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">Investment</span>
              <h4 className="text-5xl font-black mt-2 text-zinc-400">Custom</h4>
            </div>
            <ul className="space-y-4 mb-12 flex-grow text-sm font-medium text-zinc-400">
              <li className="flex items-center gap-3"><CheckIcon dim /> Custom Web Applications</li>
              <li className="flex items-center gap-3"><CheckIcon dim /> Database Logic</li>
              <li className="flex items-center gap-3"><CheckIcon dim /> Unrivaled Load Times</li>
              <li className="flex items-center gap-3"><CheckIcon dim /> Full API Integration</li>
              <li className="flex items-center gap-3"><CheckIcon dim /> 24/7 Priority Ops</li>
            </ul>
            <a href="/#the-agora" className="w-full py-4 border border-zinc-800 text-zinc-400 text-center rounded-sm text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300">
              {lang === 'EN' ? 'Get Started' : 'Ξεκινηστε'}
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

// Custom Glowing Checkmark for Dark Theme
function CheckIcon({ accent = false, dim = false }: { accent?: boolean, dim?: boolean }) {
  let bgColor = "bg-zinc-800 text-zinc-400";
  if (accent) bgColor = "bg-[#0055FF]/20 text-[#0055FF] shadow-[0_0_10px_rgba(0,85,255,0.3)]";
  if (dim) bgColor = "bg-zinc-900 text-zinc-600";

  return (
    <div className={`min-w-[20px] h-5 rounded-full flex items-center justify-center ${bgColor}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
}
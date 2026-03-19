"use client";

import React, { useState } from 'react';

export default function PackagesPage() {
  // Keeping the language state so it matches your home page
  const [lang, setLang] = useState<'EN' | 'GR'>('EN');

  return (
    <main className="font-sans antialiased bg-[#FAFAFA] text-[#030303] min-h-screen selection:bg-[#0055FF] selection:text-white">
      
      {/* Clean Minimal Navbar for the Subpage */}
      <nav className="w-full top-0 z-50 bg-white border-b border-zinc-200 px-6 py-4 sticky">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-serif font-bold tracking-widest uppercase flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-all">
            RENZO <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF] mt-1 shadow-[0_0_10px_#0055FF]"></span>
          </a>
          
          <div className="flex items-center gap-4">
            <a href="/#the-agora" className="hidden md:block text-[10px] font-bold tracking-widest uppercase text-zinc-500 hover:text-black transition-colors mr-4">
              {lang === 'EN' ? '← Back to Home' : '← Πίσω στην Αρχική'}
            </a>
            <div className="flex bg-zinc-100 border border-zinc-200 rounded-sm overflow-hidden text-[10px] font-bold tracking-widest uppercase">
              <button onClick={() => setLang('EN')} className={`px-3 py-2 transition-all ${lang === 'EN' ? 'bg-[#0055FF] text-white' : 'text-zinc-500 hover:text-black'}`}>EN</button>
              <button onClick={() => setLang('GR')} className={`px-3 py-2 transition-all ${lang === 'GR' ? 'bg-[#0055FF] text-white' : 'text-zinc-500 hover:text-black'}`}>GR</button>
            </div>
            <a href="/#the-agora" className="bg-black text-white px-6 py-2.5 text-[10px] font-bold tracking-widest hover:bg-[#0055FF] transition-all duration-300 uppercase rounded-full">
                {lang === 'EN' ? 'Contact' : 'Επικοινωνια'}
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-12 px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-sans font-black tracking-tighter uppercase mb-4 text-black outline-text drop-shadow-sm">
          {lang === 'EN' ? 'WEBSITE' : 'ΙΣΤΟΣΕΛΙΔΕΣ'} <br/>
          <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>
            {lang === 'EN' ? 'PACKAGES' : 'ΠΑΚΕΤΑ'}
          </span>
        </h1>
        <p className="text-zinc-500 font-medium max-w-xl mx-auto text-lg mt-6">
          {lang === 'EN' 
            ? 'Transparent pricing for high-performance digital infrastructure.' 
            : 'Διαφανής τιμολόγηση για ψηφιακές υποδομές υψηλής απόδοσης.'}
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Essential Tier */}
          <div className="bg-white border border-zinc-200 rounded-[2rem] p-10 flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Essential</h3>
            <p className="text-zinc-400 text-sm font-medium mb-8">
              {lang === 'EN' ? 'The foundation for a strong corporate identity.' : 'Η βάση για μια ισχυρή εταιρική ταυτότητα.'}
            </p>
            <div className="mb-8">
              <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">Investment</span>
              <h4 className="text-5xl font-black mt-1">1.200€</h4>
            </div>
            <ul className="space-y-4 mb-12 flex-grow text-sm font-bold text-zinc-800">
              <li className="flex items-center gap-3"><CheckIcon /> Custom UI/UX Design</li>
              <li className="flex items-center gap-3"><CheckIcon /> Responsive Architecture</li>
              <li className="flex items-center gap-3"><CheckIcon /> Basic SEO</li>
              <li className="flex items-center gap-3"><CheckIcon /> Contact Systems</li>
              <li className="flex items-center gap-3"><CheckIcon /> High Speed Hosting Setup</li>
            </ul>
            <a href="/#the-agora" className="w-full py-4 bg-black text-white text-center rounded-full text-xs font-black tracking-widest uppercase hover:bg-[#0055FF] transition-colors">
              {lang === 'EN' ? 'Get Started' : 'Ξεκινηστε'}
            </a>
          </div>

          {/* Professional Tier (Black/Highlight) */}
          <div className="bg-[#0a0a0a] text-white rounded-[2rem] p-10 flex flex-col shadow-2xl relative transform md:-translate-y-4 border border-zinc-800">
            <div className="absolute top-6 right-6 bg-white text-black text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
              {lang === 'EN' ? 'Most Wanted' : 'Δημοφιλεστερο'}
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Professional</h3>
            <p className="text-zinc-400 text-sm font-medium mb-8">
              {lang === 'EN' ? 'The choice of Market Leaders.' : 'Η επιλογή των Market Leaders.'}
            </p>
            <div className="mb-8">
              <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">Investment</span>
              <h4 className="text-5xl font-black mt-1 text-white">2.500€</h4>
            </div>
            <ul className="space-y-4 mb-12 flex-grow text-sm font-bold text-zinc-200">
              <li className="flex items-center gap-3"><CheckIcon white /> Advanced Framer/React Motion</li>
              <li className="flex items-center gap-3"><CheckIcon white /> Dynamic CMS</li>
              <li className="flex items-center gap-3"><CheckIcon white /> Full SEO Strategy</li>
              <li className="flex items-center gap-3"><CheckIcon white /> Premium Animations</li>
              <li className="flex items-center gap-3"><CheckIcon white /> Conversion Optimization</li>
            </ul>
            <a href="/#the-agora" className="w-full py-4 bg-white text-black text-center rounded-full text-xs font-black tracking-widest uppercase hover:bg-[#0055FF] hover:text-white transition-colors">
              {lang === 'EN' ? 'Get Started' : 'Ξεκινηστε'}
            </a>
          </div>

          {/* Enterprise Tier */}
          <div className="bg-white border border-zinc-200 rounded-[2rem] p-10 flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-zinc-300">Enterprise</h3>
            <p className="text-zinc-400 text-sm font-medium mb-8">
              {lang === 'EN' ? 'Cutting-edge technology without limits.' : 'Τεχνολογία αιχμής χωρίς περιορισμούς.'}
            </p>
            <div className="mb-8">
              <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">Investment</span>
              <h4 className="text-5xl font-black mt-1 text-zinc-300">Custom</h4>
            </div>
            <ul className="space-y-4 mb-12 flex-grow text-sm font-bold text-zinc-800">
              <li className="flex items-center gap-3"><CheckIcon /> Custom Web Applications</li>
              <li className="flex items-center gap-3"><CheckIcon /> Database Logic</li>
              <li className="flex items-center gap-3"><CheckIcon /> Unrivaled Load Times</li>
              <li className="flex items-center gap-3"><CheckIcon /> Full API Integration</li>
              <li className="flex items-center gap-3"><CheckIcon /> 24/7 Priority Ops</li>
            </ul>
            <a href="/#the-agora" className="w-full py-4 bg-black text-white text-center rounded-full text-xs font-black tracking-widest uppercase hover:bg-[#0055FF] transition-colors">
              {lang === 'EN' ? 'Get Started' : 'Ξεκινηστε'}
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}

// Simple Checkmark SVG Component
function CheckIcon({ white = false }: { white?: boolean }) {
  return (
    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${white ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
}
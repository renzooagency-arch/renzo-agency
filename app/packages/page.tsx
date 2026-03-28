"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Component function to create a unified blue checkmark style like the reference
const BlueCheckmark = () => (
  <div className="w-4 h-4 rounded-full bg-[#0055FF] flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(0,85,255,0.5)]">
    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

export default function PricesPage() {
  const [lang, setLang] = useState<'EN' | 'GR'>('EN');
  const [scrollY, setScrollY] = useState(0);

  // Track the user's scroll position to dynamically change background visibility
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="font-sans antialiased bg-[#030303] text-[#FAFAFA] min-h-screen selection:bg-[#0055FF] selection:text-white relative overflow-hidden">
      
      {/* Dynamic Scrolling Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/80 via-[#030303]/90 to-[#030303] z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=2000&auto=format&fit=crop" 
          alt="Background" 
          className="w-full h-[120vh] object-cover grayscale transition-opacity duration-100 ease-out" 
          // Opacity starts at 15% and increases up to 60% as you scroll down
          style={{ opacity: Math.min(0.6, 0.15 + scrollY / 800) }}
        />
      </div>

      {/* Navigation - Simplified for Subpage */}
      <nav className="relative z-50 w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-serif font-bold tracking-widest uppercase flex items-center gap-2 group">
          RENZO <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF] mt-1 shadow-[0_0_10px_#0055FF]"></span>
        </Link>
        
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="text-xs font-bold tracking-[0.2em] text-zinc-400 hover:text-white transition-colors uppercase items-center gap-2">
            &larr; {lang === 'EN' ? 'BACK TO HOME' : 'ΠΙΣΩ ΣΤΗΝ ΑΡΧΙΚΗ'}
          </Link>
          
          <div className="flex bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden text-[10px] font-bold tracking-widest uppercase">
            <button onClick={() => setLang('EN')} className={`px-3 py-1.5 transition-all ${lang === 'EN' ? 'bg-[#0055FF] text-white' : 'text-zinc-500 hover:text-white'}`}>EN</button>
            <button onClick={() => setLang('GR')} className={`px-3 py-1.5 transition-all ${lang === 'GR' ? 'bg-[#0055FF] text-white' : 'text-zinc-500 hover:text-white'}`}>GR</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
              {lang === 'EN' ? 'WEBSITE' : 'ΠΑΚΕΤΑ'}<br/>
              <span className="text-[#0055FF]">{lang === 'EN' ? 'PACKAGES' : 'ΙΣΤΟΣΕΛΙΔΩΝ'}</span>
            </h1>
            <p className="text-zinc-400 text-sm md:text-base font-light tracking-wide">
              {lang === 'EN' ? 'Transparent pricing for high-performance digital infrastructure.' : 'Διαφανής τιμολόγηση για ψηφιακές υποδομές υψηλής απόδοσης.'}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Essential Card */}
            <div className="bg-[#080808]/80 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 flex flex-col hover:border-zinc-700 transition-colors">
              <h3 className="text-2xl font-black uppercase tracking-wide mb-2">ESSENTIAL</h3>
              <p className="text-zinc-500 text-xs font-light mb-10 h-8">{lang === 'EN' ? 'The foundation for a strong corporate identity.' : 'Τα θεμέλια για μια ισχυρή εταιρική ταυτότητα.'}</p>
              
              <div className="mb-10">
                <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-1">INVESTMENT</p>
                <p className="text-5xl font-black">350€</p>
              </div>

              <ul className="space-y-4 flex-grow">
                {[
                  lang === 'EN' ? 'Custom UI/UX Design' : 'Custom Σχεδιασμός UI/UX',
                  lang === 'EN' ? 'Responsive Architecture' : 'Responsive Αρχιτεκτονική',
                  lang === 'EN' ? 'Basic SEO' : 'Βασικό SEO',
                  lang === 'EN' ? 'Contact Systems' : 'Συστήματα Επικοινωνίας',
                  lang === 'EN' ? 'High Speed Hosting Setup' : 'Ρύθμιση High Speed Hosting'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-zinc-300 font-medium">
                    <BlueCheckmark /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional Card (Glowing) */}
            <div className="bg-[#080808]/90 backdrop-blur-md border border-[#0055FF] rounded-2xl p-8 flex flex-col relative shadow-[0_0_40px_rgba(0,85,255,0.2)] transform lg:-translate-y-4 z-10">
              <div className="absolute top-6 right-6 bg-[#0055FF] text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-sm">
                {lang === 'EN' ? 'MOST WANTED' : 'ΔΗΜΟΦΙΛΕΣΤΕΡΟ'}
              </div>
              
              <h3 className="text-2xl font-black uppercase tracking-wide mb-2 mt-2">PROFESSIONAL</h3>
              <p className="text-zinc-400 text-xs font-light mb-10 h-8">{lang === 'EN' ? 'The choice of Market Leaders.' : 'Η επιλογή των Market Leaders.'}</p>
              
              <div className="mb-10">
                <p className="text-[10px] text-[#0055FF] font-bold tracking-[0.2em] uppercase mb-1">INVESTMENT</p>
                <p className="text-5xl font-black">450€</p>
              </div>

              <ul className="space-y-4 flex-grow">
                {[
                  lang === 'EN' ? 'Advanced Framer/React Motion' : 'Προηγμένα Animations',
                  lang === 'EN' ? 'Dynamic CMS' : 'Δυναμικό CMS',
                  lang === 'EN' ? 'Full SEO Strategy' : 'Πλήρης Στρατηγική SEO',
                  lang === 'EN' ? 'Premium Animations' : 'Premium Animations',
                  lang === 'EN' ? 'Conversion Optimization' : 'Βελτιστοποίηση Μετατροπών'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-white font-medium">
                    <BlueCheckmark /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise Card */}
            <div className="bg-[#080808]/80 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 flex flex-col hover:border-zinc-700 transition-colors">
              <h3 className="text-2xl font-black uppercase tracking-wide mb-2">ENTERPRISE</h3>
              <p className="text-zinc-500 text-xs font-light mb-10 h-8">{lang === 'EN' ? 'Cutting-edge technology without limits.' : 'Τεχνολογία αιχμής χωρίς όρια.'}</p>
              
              <div className="mb-10">
                <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-1">INVESTMENT</p>
                <p className="text-5xl font-black">Custom</p>
              </div>

              <ul className="space-y-4 flex-grow">
                {[
                  lang === 'EN' ? 'Custom Web Applications' : 'Custom Web Εφαρμογές',
                  lang === 'EN' ? 'Database Logic' : 'Λογική Βάσης Δεδομένων',
                  lang === 'EN' ? 'Unrivaled Load Times' : 'Ασυναγώνιστοι Χρόνοι Φόρτωσης',
                  lang === 'EN' ? 'Full API Integration' : 'Πλήρης Διασύνδεση API',
                  lang === 'EN' ? '24/7 Priority Ops' : '24/7 Υποστήριξη Priority'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-zinc-300 font-medium">
                    <BlueCheckmark /> {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* NEW BOOKING BUTTON - Smooth glides back to landing page booking form */}
          <div className="mt-20 text-center">
            <a href="/#the-agora" className="inline-block bg-[#0055FF] text-white px-10 py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 rounded-sm shadow-[0_0_20px_rgba(0,85,255,0.3)] hover:scale-105">
              {lang === 'EN' ? 'Book My Digital Architecture' : 'ΚΡΑΤΗΣΗ ΨΗΦΙΑΚΗΣ ΑΡΧΙΤΕΚΤΟΝΙΚΗΣ'}
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}
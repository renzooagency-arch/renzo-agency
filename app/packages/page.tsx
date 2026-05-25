"use client";

import React, { useEffect, useState } from 'react';

export default function PackagesPage() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<'EN' | 'GR'>('GR');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="font-sans antialiased bg-[#030303] text-[#FAFAFA] min-h-screen selection:bg-[#0055FF] selection:text-white overflow-x-hidden relative">
      <style dangerouslySetInnerHTML={{
        __html: `
        html { scroll-behavior: smooth; }
        
        .blueprint-grid {
          background-image: 
            linear-gradient(rgba(0, 85, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 85, 255, 0.15) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at 50% 50%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black 30%, transparent 80%);
          position: absolute; inset: 0; pointer-events: none; z-index: 12;
        }

        .cyber-card { position: relative; transition: all 0.3s ease; }
        .cyber-card::before {
          content: ""; position: absolute; inset: -3px; background: linear-gradient(45deg, #0055FF, transparent, #0055FF, transparent);
          z-index: -1; border-radius: inherit; opacity: 0; transition: opacity 0.5s ease;
        }
        .cyber-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 20px 40px rgba(0,85,255,0.4); }
        .cyber-card:hover::before { opacity: 0.8; animation: rotate-gradient 4s linear infinite; }
        @keyframes rotate-gradient { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }
      `}} />

      {/* Global Background */}
      <div 
        className="pointer-events-none fixed inset-0 z-[2] opacity-70 mix-blend-screen transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,85,255,0.15), transparent 40%)`
        }}
      />
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{ opacity: mounted ? 0.4 : 0 }}>
        <div className="absolute inset-0 bg-[#0055FF]/10 mix-blend-color z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/40 via-[#030303]/70 to-[#030303] z-10"></div>
        <div className="blueprint-grid"></div>
        <img src="https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=2000&auto=format&fit=crop" alt="The Parthenon" className="w-full h-[120vh] object-cover opacity-40 grayscale contrast-[1.4] blur-[2px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-50">
          <a href="/" className="text-2xl font-serif font-bold tracking-widest uppercase flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-all focus:outline-none">
            RENZO <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF] mt-1 group-hover:animate-ping shadow-[0_0_10px_#0055FF]"></span>
          </a>

          <div className="flex items-center gap-4 md:gap-6">
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

      {/* PRICING SECTION (REORDERED: WEBSITE FIRST, HIGHLIGHTED) */}
      <section className="pt-40 pb-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center reveal">
            <p className="text-[#0055FF] font-bold tracking-widest text-[10px] uppercase mb-2">{lang === 'EN' ? 'INVESTMENT' : 'ΕΠΕΝΔΥΣΗ'}</p>
            <h3 className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-white drop-shadow-xl">
              {lang === 'EN' ? 'OUR' : 'ΤΑ'} <span className="font-serif italic font-light text-[#0055FF]">{lang === 'EN' ? 'Prices.' : 'Πακέτα.'}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start max-w-7xl mx-auto">

            {/* 1. Simple Website */}
            <div className="cyber-card bg-zinc-950/80 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] p-10 flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.8)] relative h-full">
              <div className="mb-4 inline-block border border-zinc-700 text-zinc-400 text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1 rounded-full bg-zinc-900/50 self-start">
                {lang === 'EN' ? 'SALE ACTIVE' : 'ΣΕ ΕΚΠΤΩΣΗ'}
              </div>
              <h4 className="text-2xl font-black mb-2 tracking-tighter uppercase text-white">{lang === 'EN' ? 'Landing Page' : 'Landing Page'}</h4>
              <div className="flex items-end gap-3 mb-8">
                <div className="text-white text-4xl font-sans font-black">€350-€500</div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-400"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> {lang === 'EN' ? 'Custom UI/UX Design' : 'Custom Σχεδιασμός UI/UX'}</li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-400"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> {lang === 'EN' ? 'Basic SEO Setup' : 'Βασικό SEO'}</li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-400"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> {lang === 'EN' ? '1 Year Free Domain & Hosting' : '1 Χρόνος Δωρεάν Domain & Hosting'}</li>
              </ul>
              <a href="/#the-agora" className="w-full mt-auto text-center border border-zinc-700 text-zinc-400 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:border-[#0055FF] hover:text-[#0055FF] transition-all rounded-sm">{lang === 'EN' ? 'Select Plan' : 'Επιλογή'}</a>
            </div>

            {/* 2. Premium Website (HIGHLIGHTED) */}
            <div className="cyber-card bg-black border-2 border-[#0055FF] rounded-[2rem] p-10 flex flex-col shadow-[0_0_50px_rgba(0,85,255,0.3)] relative transform md:-translate-y-4 h-full">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0055FF] text-white px-4 py-1 text-[9px] font-black tracking-widest uppercase rounded-sm whitespace-nowrap shadow-[0_0_15px_rgba(0,85,255,0.5)]">
                {lang === 'EN' ? 'PREMIUM CHOICE' : 'PREMIUM ΕΠΙΛΟΓΗ'}
              </div>
              <div className="mb-4 inline-block border border-[#0055FF] text-[#0055FF] text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1 rounded-full bg-[#0055FF]/10 animate-pulse self-start mt-2">
                {lang === 'EN' ? 'SALE ACTIVE' : 'ΣΕ ΕΚΠΤΩΣΗ'}
              </div>
              <h4 className="text-2xl font-black mb-2 tracking-tighter uppercase text-white">{lang === 'EN' ? 'E-Shop / E-Commerce' : 'Ηλεκτρονικό Κατάστημα'}</h4>
              <div className="flex items-end gap-3 mb-8">
                <div className="text-[#0055FF] text-4xl font-sans font-black">€500+</div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-300"><span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF]"></span> {lang === 'EN' ? 'Everything is upgraded' : 'Όλα ειναι αναβαθμισμένα'}</li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-300"><span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF]"></span> {lang === 'EN' ? 'Premium Visuals & UX' : 'Premium Γραφικά & Εμπειρία Χρήστη (UX)'}</li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-300"><span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF]"></span> {lang === 'EN' ? 'Full SEO & Optimization' : 'Πλήρης Στρατηγική SEO & Μετατροπών'}</li>
              </ul>
              <a href="/#the-agora" className="w-full mt-auto text-center bg-[#0055FF] text-white py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(0,85,255,0.4)] rounded-sm">{lang === 'EN' ? 'Get Started' : 'Ξεκινήστε'}</a>
            </div>

            {/* 3. AI Learner */}
            <div className="cyber-card bg-zinc-950/80 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] p-10 flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.8)] relative h-full">
              <div className="mb-4 inline-block border border-zinc-700 text-zinc-400 text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1 rounded-full bg-zinc-900/50 self-start">
                {lang === 'EN' ? 'EDUCATION' : 'ΕΚΠΑΙΔΕΥΣΗ'}
              </div>
              <h4 className="text-2xl font-black mb-2 tracking-tighter uppercase text-white">{lang === 'EN' ? 'AI Learner' : 'AI Μαθητής'}</h4>
              <div className="flex items-end gap-3 mb-8">
                <div className="text-white text-4xl font-sans font-black">€500</div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-400"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> {lang === 'EN' ? 'Private 1-on-1 Mentorship' : 'Ιδιωτικό 1-on-1 Mentorship'}</li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-400"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> {lang === 'EN' ? 'Master AI Tools (Midjourney, Runway)' : 'Εκμάθηση AI (Midjourney, Runway)'}</li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-400"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> {lang === 'EN' ? 'Professional Grade Video Creation' : 'Επαγγελματική Δημιουργία Βίντεο'}</li>
              </ul>
              <a href="/#the-agora" className="w-full mt-auto text-center border border-zinc-700 text-zinc-400 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:border-[#0055FF] hover:text-[#0055FF] transition-all rounded-sm">{lang === 'EN' ? 'Select Plan' : 'Επιλογή'}</a>
            </div>

            {/* 4. Marketing */}
            <div className="cyber-card bg-zinc-950/80 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] p-10 flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.8)] relative h-full">
              <div className="mb-4 inline-block border border-zinc-700 text-zinc-400 text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1 rounded-full bg-zinc-900/50 self-start">
                {lang === 'EN' ? 'GROWTH' : 'ΑΝΑΠΤΥΞΗ'}
              </div>
              <h4 className="text-2xl font-black mb-2 tracking-tighter uppercase text-white">{lang === 'EN' ? 'Marketing' : 'Marketing'}</h4>
              <div className="flex items-end gap-3 mb-8">
                <div className="text-white text-4xl font-sans font-black">€500</div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-400"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> {lang === 'EN' ? '8 Professional AI Videos' : '8 Επαγγελματικά AI Βίντεο'}</li>
                <li className="flex items-center gap-4 text-sm font-medium text-[#0055FF] font-bold"><span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF]"></span> {lang === 'EN' ? '250,000 Views Guaranteed in 3 months' : 'Εγγύηση 250.000 Προβολών σε 3 μήνες'}</li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-400"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> {lang === 'EN' ? 'Or Your Money Back' : 'Ή Επιστροφή Χρημάτων'}</li>
              </ul>
              <a href="/#the-agora" className="w-full mt-auto text-center border border-zinc-700 text-zinc-400 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:border-[#0055FF] hover:text-[#0055FF] transition-all rounded-sm">{lang === 'EN' ? 'Select Plan' : 'Επιλογή'}</a>
            </div>

          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-zinc-900 py-12 bg-black flex flex-col items-center justify-center gap-6">
        <p className="text-zinc-600 text-[10px] font-bold tracking-[0.3em] uppercase text-center"><span className="text-[#0055FF] mr-2">🏛️</span> © {new Date().getFullYear()} RENZO AGENCY. {lang === 'EN' ? 'DIGITAL INFRASTRUCTURE.' : 'ΨΗΦΙΑΚΗ ΥΠΟΔΟΜΗ.'}</p>
        <a href="https://www.instagram.com/renzo.agency_/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#0055FF] text-[10px] font-bold tracking-[0.3em] uppercase transition-colors">
          INSTAGRAM
        </a>
      </footer>
    </main>
  );
}
"use client";

import React, { useEffect, useState, useRef } from 'react';

export default function WebsitesPage() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<'EN' | 'GR'>('GR');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

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

          <div className="hidden md:flex space-x-6 lg:space-x-8 text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">
            <a href="/why-us" className="hover:text-[#0055FF] transition duration-300">Why Us</a>
            <a href="/websites" className="text-[#0055FF] transition duration-300">{lang === 'EN' ? 'Website' : 'Ιστοσελιδες'}</a>
            <a href="/social-media" className="hover:text-[#0055FF] transition duration-300">Social</a>
            <a href="/learner" className="hover:text-[#0055FF] transition duration-300">{lang === 'EN' ? 'Learn' : 'Μαθηση'}</a>
            <a href="/packages" className="hover:text-[#0055FF] transition duration-300">{lang === 'EN' ? 'Prices' : 'Τιμες'}</a>
            <a href="/#faq" className="hover:text-[#0055FF] transition duration-300">FAQ</a>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <a href="https://www.instagram.com/renzo.agency_/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#0055FF] transition-colors p-1" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <div className="flex bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden text-[10px] font-bold tracking-widest uppercase">
              <button onClick={() => setLang('EN')} className={`px-3 py-2 transition-all ${lang === 'EN' ? 'bg-[#0055FF] text-white' : 'text-zinc-500 hover:text-white'}`}>EN</button>
              <button onClick={() => setLang('GR')} className={`px-3 py-2 transition-all ${lang === 'GR' ? 'bg-[#0055FF] text-white' : 'text-zinc-500 hover:text-white'}`}>GR</button>
            </div>
            <a href="/#the-agora" className="hidden md:block border border-[#0055FF] text-[#0055FF] px-6 py-2.5 text-[10px] font-bold tracking-widest hover:bg-[#0055FF] hover:text-white transition-all duration-300 uppercase">
              {lang === 'EN' ? 'Start a Project' : 'Ξεκινηστε'}
            </a>
            <button className="md:hidden text-zinc-400 hover:text-white p-2 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 h-screen w-screen bg-[#030303]/98 backdrop-blur-3xl z-40 flex flex-col items-center justify-center transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col items-center space-y-8 text-sm font-bold tracking-[0.3em] uppercase text-zinc-400">
            <a href="/why-us" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition duration-300">Why Us</a>
            <a href="/websites" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0055FF] transition duration-300">{lang === 'EN' ? 'Website' : 'Ιστοσελιδες'}</a>
            <a href="/social-media" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition duration-300">Social</a>
            <a href="/learner" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition duration-300">{lang === 'EN' ? 'Learn' : 'Μαθηση'}</a>
            <a href="/packages" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition duration-300">{lang === 'EN' ? 'Prices' : 'Τιμες'}</a>
            <a href="/#faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition duration-300">FAQ</a>
            <a href="https://www.instagram.com/renzo.agency_/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0055FF] transition duration-300">INSTAGRAM</a>
            <a href="/#the-agora" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0055FF] border border-[#0055FF] px-8 py-3 rounded-sm hover:bg-[#0055FF] hover:text-white transition duration-300 mt-4">{lang === 'EN' ? 'Start a Project' : 'Ξεκινηστε'}</a>
          </div>
        </div>
      </nav>

      {/* PILLAR 1: WEB ARCHITECTURE (MASSIVE SINGLE CARD) */}
      <section className="pt-40 pb-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-zinc-800 pb-8 reveal">
            <div>
              <p className="text-[#0055FF] font-bold tracking-widest text-[10px] uppercase mb-2">PILLAR 01 • ENGINEERING</p>
              <h3 className="text-5xl md:text-7xl font-sans font-black tracking-tighter uppercase text-white drop-shadow-xl">{lang === 'EN' ? 'WEB ARCHITECTURE' : 'ΚΑΤΑΣΚΕΥΗ WEB'}</h3>
            </div>
            <a href="/packages" className="hidden md:block text-zinc-400 hover:text-[#0055FF] text-xs font-bold tracking-widest uppercase transition-colors">{lang === 'EN' ? 'VIEW PACKAGES →' : 'ΔΕΙΤΕ ΤΑ ΠΑΚΕΤΑ →'}</a>
          </div>

          {/* 🔥 THE ULTIMATE STANDOUT OFFER CARD 🔥 */}
          <div className="bg-black border-2 border-[#0055FF] rounded-[2rem] p-8 md:p-14 flex flex-col shadow-[0_0_50px_rgba(0,85,255,0.2)] relative overflow-hidden group">
            {/* Glowing background flares */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(0,85,255,0.05),transparent)] animate-pulse pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0055FF]/20 rounded-full blur-[120px] pointer-events-none group-hover:bg-[#0055FF]/30 transition-all duration-700"></div>

            <div className="mb-8 inline-block border border-[#0055FF] text-[#0055FF] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase px-6 py-2 rounded-full shadow-[0_0_20px_rgba(0,85,255,0.4)] animate-pulse bg-[#0055FF]/10 self-start">
              {lang === 'EN' ? 'LIMITED TIME OFFER' : 'ΠΡΟΣΦΟΡΑ ΓΙΑ ΛΙΓΟ ΚΑΙΡΟ'}
            </div>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center relative z-10">
              <div className="w-full lg:w-1/2">
                <h4 className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tighter uppercase text-white">
                  {lang === 'EN' ? 'Website Engineering' : 'Κατασκευη Ιστοσελιδας'}
                </h4>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-zinc-500 text-xl font-light">{lang === 'EN' ? 'Starting at' : 'Από'}</span>
                  <div className="text-[#0055FF] text-6xl font-sans font-black">€350</div>
                </div>
                <p className="text-zinc-400 text-lg leading-relaxed font-light mb-8">
                  {lang === 'EN'
                    ? 'A high-converting, fully custom web platform engineered to dominate your market and turn visitors into paying clients instantly.'
                    : 'Μια custom ιστοσελίδα υψηλής μετατρεψιμότητας, σχεδιασμένη να κυριαρχήσει στην αγορά σας και να φέρνει άμεσα πελάτες.'}
                </p>
                <a href="/#the-agora" className="hidden lg:inline-block bg-[#0055FF] text-white px-10 py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,85,255,0.4)] rounded-sm">
                  {lang === 'EN' ? 'CLAIM THIS OFFER' : 'ΚΑΤΟΧΥΡΩΣΗ ΠΡΟΣΦΟΡΑΣ'}
                </a>
              </div>

              <div className="w-full lg:w-1/2">
                <ul className="space-y-6">
                  {/* Irresistible Trigger 1 */}
                  <li className="flex items-start gap-4 text-base font-medium text-white">
                    <div className="mt-1.5 w-2 h-2 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF] flex-shrink-0"></div>
                    <span className="leading-snug">{lang === 'EN' ? '1 Year Free Domain & Premium Hosting' : '1 Χρόνος Δωρεάν Domain & Premium Hosting'}</span>
                  </li>
                  {/* Irresistible Trigger 2 */}
                  <li className="flex items-start gap-4 text-base font-medium text-white">
                    <div className="mt-1.5 w-2 h-2 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF] flex-shrink-0"></div>
                    <span className="leading-snug">{lang === 'EN' ? 'Blazing Fast Load Speeds (Zero Lag)' : 'Αστραπιαία Ταχύτητα Φόρτωσης (Zero Lag)'}</span>
                  </li>
                  {/* Irresistible Trigger 3 */}
                  <li className="flex items-start gap-4 text-base font-medium text-white">
                    <div className="mt-1.5 w-2 h-2 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF] flex-shrink-0"></div>
                    <span className="leading-snug">{lang === 'EN' ? 'Integrated Booking & Appointment System' : 'Ενσωματωμένο Σύστημα Κρατήσεων (Booking)'}</span>
                  </li>
                  {/* Irresistible Trigger 4 */}
                  <li className="flex items-start gap-4 text-base font-medium text-zinc-300">
                    <div className="mt-1.5 w-2 h-2 bg-zinc-700 rounded-full flex-shrink-0"></div>
                    <span className="leading-snug text-zinc-400">{lang === 'EN' ? 'UI/UX Engineered to Maximize Sales' : 'UI/UX Σχεδιασμός Για Μέγιστες Πωλήσεις'}</span>
                  </li>
                  {/* Irresistible Trigger 5 */}
                  <li className="flex items-start gap-4 text-base font-medium text-zinc-300">
                    <div className="mt-1.5 w-2 h-2 bg-zinc-700 rounded-full flex-shrink-0"></div>
                    <span className="leading-snug text-zinc-400">{lang === 'EN' ? 'Advanced SEO Setup for Google Ranking' : 'Βελτιστοποίηση SEO Για Την Google'}</span>
                  </li>
                </ul>
                <a href="/#the-agora" className="w-full mt-10 lg:hidden text-center block bg-[#0055FF] text-white px-10 py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,85,255,0.4)] rounded-sm">
                  {lang === 'EN' ? 'CLAIM THIS OFFER' : 'ΚΑΤΟΧΥΡΩΣΗ ΠΡΟΣΦΟΡΑΣ'}
                </a>
              </div>
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

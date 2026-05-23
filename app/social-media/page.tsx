"use client";

import React, { useEffect, useState, useRef } from 'react';

export default function SocialMediaPage() {
  const [mounted, setMounted] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<'EN' | 'GR'>('GR');

  useEffect(() => {
    setMounted(true);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (bgRef.current) {
            bgRef.current.style.transform = `translateY(${y * 0.15}px) scale(${1 + y * 0.0002})`;
            bgRef.current.style.opacity = Math.min(0.8, 0.4 + y / 1500).toString();
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => { window.removeEventListener("scroll", handleScroll); observer.disconnect(); };
  }, []);

  return (
    <main className="font-sans antialiased bg-[#030303] text-[#FAFAFA] min-h-screen selection:bg-[#0055FF] selection:text-white relative overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .reveal { opacity: 0; transform: translateY(40px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-100 { transition-delay: 100ms; }
        .reveal-delay-200 { transition-delay: 200ms; }
      `}} />
      
      {/* Global Background */}
      <div 
        ref={bgRef}
        className="fixed inset-0 z-[1] pointer-events-none transition-transform duration-75 ease-out"
        style={{ opacity: mounted ? 0.4 : 0 }}
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

      {/* Main Content */}
      <section className="py-32 px-6 relative z-10 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 reveal">
            <p className="text-[#0055FF] font-bold tracking-widest text-[10px] uppercase mb-2">PILLAR 02 • SOCIAL MEDIA</p>
            <h1 className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-white drop-shadow-xl">{lang === 'EN' ? 'THE CONTENT' : 'ΑΥΤΟΚΡΑΤΟΡΙΑ'} <span className="font-serif italic font-light text-[#0055FF]">{lang === 'EN' ? 'Empire.' : 'Περιεχομένου.'}</span></h1>
            <p className="text-zinc-400 text-lg mt-6 max-w-2xl font-light">
              {lang === 'EN' ? 'AI-powered social media content engineered for maximum reach. We produce scroll-stopping short-form videos that turn followers into paying clients.' : 'AI περιεχόμενο σχεδιασμένο για μέγιστη απήχηση. Παράγουμε short-form βίντεο που μετατρέπουν τους followers σε πελάτες.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 bg-black border border-zinc-800 rounded-2xl p-10 relative hover:border-[#0055FF]/50 transition-colors duration-500 flex flex-col reveal reveal-delay-100">
              <h2 className="text-3xl font-serif text-white mb-2 mt-4">{lang === 'EN' ? 'Social Media Pack' : 'Πακέτο Social Media'}</h2>
              <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-8">{lang === 'EN' ? 'AI-ENHANCED VIDEO PRODUCTION' : 'ΠΑΡΑΓΩΓΗ ΒΙΝΤΕΟ ΜΕ AI'}</p>
              
              <div className="mb-8 border-b border-zinc-800 pb-8">
                <span className="text-6xl font-sans font-black tracking-tighter text-white">500€</span>
                <span className="text-zinc-500 text-sm block mt-2">{lang === 'EN' ? '8 videos — one-time investment' : '8 βίντεο — εφάπαξ επένδυση'}</span>
              </div>

              <ul className="space-y-5 flex-grow mb-10">
                {[
                  lang === 'EN' ? '8 professionally produced short-form videos' : '8 επαγγελματικά short-form βίντεο',
                  lang === 'EN' ? 'AI-generated visuals & motion graphics' : 'AI γραφικά & motion graphics',
                  lang === 'EN' ? 'Platform-optimised for Insta, TikTok & LinkedIn' : 'Βελτιστοποιημένα για Insta, TikTok & LinkedIn',
                  lang === 'EN' ? 'Captions, hooks & CTAs engineered to convert' : 'Captions & hooks σχεδιασμένα για πωλήσεις',
                  lang === 'EN' ? 'Content calendar & publishing strategy' : 'Στρατηγική δημοσίευσης & calendar'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm font-medium text-zinc-300">
                    <div className="mt-1 w-1.5 h-1.5 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF] flex-shrink-0"></div>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              <a href="/#the-agora" className="w-full text-center border border-zinc-700 text-zinc-400 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:border-[#0055FF] hover:text-[#0055FF] hover:bg-[#0055FF]/5 transition-all duration-300 rounded-sm">
                {lang === 'EN' ? 'START YOUR CONTENT EMPIRE' : 'ΞΕΚΙΝΗΣΤΕ ΤΗΝ ΠΑΡΑΓΩΓΗ'}
              </a>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center space-y-12 reveal reveal-delay-200">
              <div>
                <h3 className="text-[10px] text-[#0055FF] font-bold tracking-[0.3em] uppercase mb-4">{lang === 'EN' ? 'WHY VIDEO DOMINATES' : 'ΓΙΑΤΙ ΤΟ ΒΙΝΤΕΟ ΚΥΡΙΑΡΧΕΙ'}</h3>
                <p className="text-zinc-300 text-lg font-light leading-relaxed">
                  {lang === 'EN' ? 'Short-form video generates up to 3× more engagement than static posts. We combine AI tools with strategic storytelling to create content that algorithms push — and audiences stop for.' : 'Το βίντεο παράγει 3× περισσότερο engagement. Συνδυάζουμε AI εργαλεία με στρατηγικό storytelling για να δημιουργήσουμε περιεχόμενο που προωθείται από τον αλγόριθμο.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-zinc-800 bg-zinc-900/30 p-8 flex flex-col items-center justify-center text-center rounded-lg">
                  <span className="text-5xl font-sans font-black text-white mb-2">250k</span>
                  <span className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase">{lang === 'EN' ? 'VIEWS GUARANTEED OR MONEY BACK' : 'ΠΡΟΒΟΛΕΣ ΕΓΓΥΗΜΕΝΑ Η ΕΠΙΣΤΡΟΦΗ'}</span>
                </div>
                <div className="border border-zinc-800 bg-zinc-900/30 p-8 flex flex-col items-center justify-center text-center rounded-lg">
                  <span className="text-5xl font-sans font-black text-white mb-2">8</span>
                  <span className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase">{lang === 'EN' ? 'VIDEOS DELIVERED' : 'ΒΙΝΤΕΟ ΣΥΝΟΛΙΚΑ'}</span>
                </div>
                <div className="border border-zinc-800 bg-[#0055FF]/10 p-8 flex flex-col items-center justify-center text-center rounded-lg">
                  <span className="text-4xl font-serif text-[#0055FF] mb-2">AI</span>
                  <span className="text-[10px] text-[#0055FF] font-bold tracking-[0.2em] uppercase">{lang === 'EN' ? 'ENHANCED' : 'ΕΝΙΣΧΥΜΕΝΟ'}</span>
                </div>
                <div className="border border-zinc-800 bg-zinc-900/30 p-8 flex flex-col items-center justify-center text-center rounded-lg">
                  <span className="text-4xl font-sans font-black text-white mb-2">€40</span>
                  <span className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase">{lang === 'EN' ? 'PER VIDEO' : 'ΑΝΑ ΒΙΝΤΕΟ'}</span>
                </div>
              </div>

              <blockquote className="border-l-2 border-[#0055FF] pl-6 py-2">
                <p className="text-2xl font-serif italic text-white mb-2">"Visibility is the only currency that cannot be faked."</p>
                <footer className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase">— RENZO STUDIO</footer>
              </blockquote>
            </div>
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

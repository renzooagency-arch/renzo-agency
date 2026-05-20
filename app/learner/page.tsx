"use client";

import React, { useEffect, useState, useRef } from 'react';

export default function LearnerPage() {
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
            <p className="text-[#0055FF] font-bold tracking-widest text-[10px] uppercase mb-2">PILLAR 03 • EDUCATION</p>
            <h1 className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-white drop-shadow-xl">{lang === 'EN' ? 'AI LEARNING' : 'AI LEARNING'} <span className="font-serif italic font-light text-[#0055FF]">{lang === 'EN' ? 'Atelier.' : 'Atelier.'}</span></h1>
            <p className="text-zinc-400 text-lg mt-6 max-w-2xl font-light">
              {lang === 'EN' ? 'Master the tools shaping the future of visual content. A private, hands-on program teaching you to create professional-grade AI videos and images from zero to mastery.' : 'Μάθετε τα εργαλεία του μέλλοντος. Ένα ιδιωτικό, πρακτικό πρόγραμμα που σας μαθαίνει να δημιουργείτε επαγγελματικά AI βίντεο από το μηδέν.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 border-y border-zinc-800 bg-black py-8 px-4 mb-16 reveal reveal-delay-100">
            <div className="flex flex-col items-center justify-center text-center p-4">
              <span className="text-5xl font-serif text-white mb-2">3</span>
              <span className="text-[10px] text-[#0055FF] font-bold tracking-[0.2em] uppercase">{lang === 'EN' ? 'LIVE CALLS' : 'LIVE ΣΥΝΕΔΡΙΕΣ'}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-4 md:border-l md:border-r border-zinc-800">
              <span className="text-5xl font-serif text-white mb-2">2h+</span>
              <span className="text-[10px] text-[#0055FF] font-bold tracking-[0.2em] uppercase">{lang === 'EN' ? 'PER SESSION' : 'ΑΝΑ ΣΥΝΕΔΡΙΑ'}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-4">
              <span className="text-5xl font-serif text-white mb-2">∞</span>
              <span className="text-[10px] text-[#0055FF] font-bold tracking-[0.2em] uppercase">{lang === 'EN' ? 'SKILL RETAINED' : 'ΓΝΩΣΗ ΠΟΥ ΜΕΝΕΙ'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 space-y-8 reveal reveal-delay-200">
              <p className="text-xl text-zinc-300 font-light leading-relaxed">
                {lang === 'EN' ? 'This is not a course. This is a private mentorship. You work directly with a Renzo expert across three intensive live sessions — leaving each one with skills, not just theory.' : 'Δεν είναι απλά ένα μάθημα. Είναι ιδιωτικό mentorship. Δουλεύετε απευθείας με έναν expert του Renzo σε τρεις εντατικές συνεδρίες — φεύγοντας με πρακτικές ικανότητες.'}
              </p>
              <ul className="space-y-6 pt-6 border-t border-zinc-800">
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-400">
                  <div className="w-8 h-px bg-[#0055FF]"></div> {lang === 'EN' ? 'All sessions recorded for you to keep' : 'Όλες οι συνεδρίες καταγράφονται'}
                </li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-400">
                  <div className="w-8 h-px bg-[#0055FF]"></div> {lang === 'EN' ? 'Private 1-on-1 or small group format' : 'Ιδιωτικό 1-προς-1 ή μικρό group'}
                </li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-400">
                  <div className="w-8 h-px bg-[#0055FF]"></div> {lang === 'EN' ? 'Real projects — not generic examples' : 'Πραγματικά projects — όχι θεωρία'}
                </li>
              </ul>
            </div>

            <div className="lg:col-span-8 flex flex-col justify-between reveal reveal-delay-300">
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="text-4xl font-serif text-zinc-700 italic">01</div>
                  <div>
                    <h2 className="text-lg font-bold tracking-widest uppercase text-white mb-2">{lang === 'EN' ? 'AI IMAGE MASTERY' : 'MASTERY ΕΙΚΟΝΑΣ AI'}</h2>
                    <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{lang === 'EN' ? 'Learn to prompt, generate, edit, and stylise images with professional precision. From product shots to cinematic stills.' : 'Μάθετε να δημιουργείτε και επεξεργάζεστε εικόνες με επαγγελματική ακρίβεια.'}</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="text-4xl font-serif text-zinc-700 italic">02</div>
                  <div>
                    <h2 className="text-lg font-bold tracking-widest uppercase text-white mb-2">{lang === 'EN' ? 'AI VIDEO PRODUCTION' : 'ΠΑΡΑΓΩΓΗ AI VIDEO'}</h2>
                    <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{lang === 'EN' ? 'Generate and recreate video content using text-to-video and image-to-video workflows. Recreate viral formats exactly.' : 'Δημιουργήστε βίντεο χρησιμοποιώντας text-to-video. Αναπαράγετε ακριβώς viral formats.'}</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="text-4xl font-serif text-zinc-700 italic">03</div>
                  <div>
                    <h2 className="text-lg font-bold tracking-widest uppercase text-white mb-2">{lang === 'EN' ? 'FULL WORKFLOW & AUTOMATION' : 'ΠΛΗΡΕΣ WORKFLOW & AUTOMATION'}</h2>
                    <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{lang === 'EN' ? 'Combine all tools into a complete content production pipeline. Create branded video series independently from day one.' : 'Συνδυάστε τα εργαλεία σε ένα πλήρες σύστημα παραγωγής. Δημιουργήστε branded βίντεο ανεξάρτητα.'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 border border-[#0055FF]/40 bg-[#0055FF]/5 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-[10px] text-[#0055FF] font-bold tracking-[0.3em] uppercase mb-2">{lang === 'EN' ? 'PROGRAM INVESTMENT' : 'ΕΠΕΝΔΥΣΗ ΠΡΟΓΡΑΜΜΑΤΟΣ'}</p>
                  <span className="text-4xl font-serif text-white">€500</span>
                  <p className="text-zinc-500 text-xs mt-1">{lang === 'EN' ? 'One-time investment' : 'Εφάπαξ επένδυση'}</p>
                </div>
                <a href="/#the-agora" className="w-full md:w-auto bg-[#0055FF] text-white px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 text-center rounded-sm">
                  {lang === 'EN' ? 'JOIN THE ATELIER' : 'ΣΥΜΜΕΤΟΧΗ ΣΤΟ ATELIER'}
                </a>
              </div>
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

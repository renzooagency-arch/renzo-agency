"use client";

import React, { useEffect, useState, useRef } from 'react';
import MatrixRain from '../components/MatrixRain';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<'EN' | 'GR'>('GR');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'), // <-- ADDED PHONE HERE
      project_type: formData.get('project_type'),
      message: formData.get('message'),
      honeypot: formData.get('honeypot'),
    };
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) { setIsSent(true); }
      else { alert("Transmission failed. Please try again."); }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      en: { q: "How long does it take to build a custom website?", a: "Most digital infrastructures are designed, developed, and launched within 1 to 3 business days, depending on the complexity and scope of the project." },
      gr: { q: "Πόσος χρόνος χρειάζεται για την κατασκευή μιας ιστοσελίδας;", a: "Οι περισσότερες ψηφιακές υποδομές σχεδιάζονται, αναπτύσσονται και παραδίδονται μέσα σε 1 με 3 εργάσιμες ημέρες, ανάλογα με την πολυπλοκότητα του έργου." }
    },
    {
      en: { q: "Do I need technical knowledge to manage my website?", a: "Not at all. We build ecosystems that are extremely easy to manage. We handle the complex engineering, so you can focus purely on scaling your business." },
      gr: { q: "Χρειάζεται να έχω τεχνικές γνώσεις για τη διαχείριση;", a: "Καθόλου. Δημιουργούμε οικοσυστήματα που είναι εξαιρετικά εύκολα στη διαχείριση. Εμείς αναλαμβάνουμε το τεχνικό κομμάτι, για να εστιάσετε στην επιχείρησή σας." }
    },
    {
      en: { q: "Can you teach my team how to make AI videos?", a: "Yes. Our AI Learning Atelier is a private 1-on-1 mentorship program where we train you on industry-leading tools like Midjourney, Runway, and CapCut." },
      gr: { q: "Μπορείτε να εκπαιδεύσετε την ομάδα μου στο AI Video;", a: "Ναι. Το AI Learning Atelier είναι ένα ιδιωτικό πρόγραμμα mentoring 1-προς-1 όπου σας εκπαιδεύουμε στα κορυφαία εργαλεία (Midjourney, Runway, CapCut)." }
    },
    {
      en: { q: "Where can I see your pricing?", a: "You can find our standard architecture packages in the 'Prices' section. For enterprise or highly custom requirements, contact the studio directly for a tailored quote." },
      gr: { q: "Πού μπορώ να δω τις τιμές σας;", a: "Μπορείτε να βρείτε τα βασικά μας πακέτα στην ενότητα 'Τιμές'. Για enterprise ή highly custom απαιτήσεις, επικοινωνήστε με το στούντιο για εξατομικευμένη προσφορά." }
    }
  ];

  return (
    <main className="font-sans antialiased bg-[#030303] text-[#FAFAFA] min-h-screen selection:bg-[#0055FF] selection:text-white overflow-x-hidden relative">
      <style dangerouslySetInnerHTML={{
        __html: `
        html { scroll-behavior: smooth; }
        @keyframes floatCube { 0% { transform: translateY(110vh) rotateX(0deg) rotateY(0deg); opacity: 0; } 20% { opacity: 0.8; } 80% { opacity: 0.8; } 100% { transform: translateY(-20vh) rotateX(360deg) rotateY(360deg); opacity: 0; } }
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        
        /* CRAZY NEW STYLES */
        @keyframes glitch-anim {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 2px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -2px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 2px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(2px, -2px); }
        }
        .glitch-hover { position: relative; display: inline-block; transition: all 0.3s ease; cursor: crosshair; }
        .glitch-hover:hover { color: #fff; text-shadow: 0 0 20px #0055FF, 0 0 40px #0055FF; }
        .glitch-hover:hover::before, .glitch-hover:hover::after {
          content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: transparent;
        }
        .glitch-hover:hover::before { left: 3px; text-shadow: -2px 0 red; animation: glitch-anim 0.3s infinite linear alternate-reverse; }
        .glitch-hover:hover::after { left: -3px; text-shadow: -2px 0 cyan; animation: glitch-anim 0.3s infinite linear alternate-reverse; animation-delay: -0.1s; }
        
        .blueprint-grid {
          background-image: 
            linear-gradient(rgba(0, 85, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 85, 255, 0.15) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at 50% 50%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black 30%, transparent 80%);
          position: absolute; inset: 0; pointer-events: none; z-index: 12;
        }
        .cube { position: fixed; bottom: -100px; background: rgba(0,85,255,0.02); border: 1px solid rgba(0, 85, 255, 0.5); box-shadow: 0 0 15px rgba(0,85,255,0.2), inset 0 0 15px rgba(0,85,255,0.2); pointer-events: none; z-index: 5; backdrop-filter: blur(2px); }
        .cube::after { content: ''; position: absolute; top: 10%; left: 10%; right: 10%; bottom: 10%; border: 1px dashed rgba(0,85,255,0.4); animation: rotate-gradient 10s linear infinite; }
        
        .cyber-card { position: relative; transition: all 0.3s ease; }
        .cyber-card::before {
          content: ""; position: absolute; inset: -3px; background: linear-gradient(45deg, #0055FF, transparent, #0055FF, transparent);
          z-index: -1; border-radius: inherit; opacity: 0; transition: opacity 0.5s ease;
        }
        .cyber-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 20px 40px rgba(0,85,255,0.4); }
        .cyber-card:hover::before { opacity: 0.8; animation: rotate-gradient 4s linear infinite; }
        @keyframes rotate-gradient { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }

        .animate-marquee { display: inline-block; white-space: nowrap; animation: marquee 20s linear infinite; }
        .animate-fade-up { animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .reveal { opacity: 0; transform: translateY(40px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-100 { transition-delay: 100ms; }
        .reveal-delay-200 { transition-delay: 200ms; }
        .reveal-delay-300 { transition-delay: 300ms; }
      `}} />

      {/* Global Background */}
      <div ref={bgRef} className="fixed inset-0 z-[1] pointer-events-none" style={{ opacity: mounted ? 0.4 : 0 }}>
        <div className="absolute inset-0 bg-[#0055FF]/10 mix-blend-color z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/40 via-[#030303]/70 to-[#030303] z-10"></div>
        <div className="blueprint-grid"></div>
        <img src="https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=2000&auto=format&fit=crop" alt="The Parthenon" className="w-full h-[120vh] object-cover opacity-40 grayscale contrast-[1.4] blur-[2px]" />
      </div>

      {mounted && <MatrixRain mousePos={mousePos} />}

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-50">
          <a href="/" className="text-2xl font-serif font-bold tracking-widest uppercase flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-all focus:outline-none">
            RENZO <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF] mt-1 group-hover:animate-ping shadow-[0_0_10px_#0055FF]"></span>
          </a>

          <div className="hidden md:flex space-x-6 lg:space-x-8 text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">
            <a href="/why-us" className="hover:text-[#0055FF] transition duration-300">Why Us</a>
            <a href="/websites" className="hover:text-[#0055FF] transition duration-300">{lang === 'EN' ? 'Website' : 'Ιστοσελιδες'}</a>
            <a href="/social-media" className="hover:text-[#0055FF] transition duration-300">Social</a>
            <a href="/learner" className="hover:text-[#0055FF] transition duration-300">{lang === 'EN' ? 'Learn' : 'Μαθηση'}</a>
            <a href="/packages" className="hover:text-[#0055FF] transition duration-300">{lang === 'EN' ? 'Prices' : 'Τιμες'}</a>
            <a href="#faq" className="hover:text-[#0055FF] transition duration-300">FAQ</a>
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
            <a href="#the-agora" className="hidden md:block border border-[#0055FF] text-[#0055FF] px-6 py-2.5 text-[10px] font-bold tracking-widest hover:bg-[#0055FF] hover:text-white transition-all duration-300 uppercase">
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
            <a href="/websites" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition duration-300">{lang === 'EN' ? 'Website' : 'Ιστοσελιδες'}</a>
            <a href="/social-media" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition duration-300">Social</a>
            <a href="/learner" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition duration-300">{lang === 'EN' ? 'Learn' : 'Μαθηση'}</a>
            <a href="/packages" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition duration-300">{lang === 'EN' ? 'Prices' : 'Τιμες'}</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition duration-300">FAQ</a>
            <a href="https://www.instagram.com/renzo.agency_/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0055FF] transition duration-300">INSTAGRAM</a>
            <a href="#the-agora" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0055FF] border border-[#0055FF] px-8 py-3 rounded-sm hover:bg-[#0055FF] hover:text-white transition duration-300 mt-4">{lang === 'EN' ? 'Start a Project' : 'Ξεκινηστε'}</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 z-10 overflow-hidden">
        <div 
          ref={heroRef}
          className="max-w-7xl mx-auto w-full relative z-10"
        >
          <div className="inline-block border border-[#0055FF] bg-[#0055FF]/20 backdrop-blur-md px-6 py-3 rounded-sm mb-10 shadow-[0_0_20px_rgba(0,85,255,0.4)] animate-pulse opacity-0" style={{animationFillMode: 'forwards'}}>
            <span className="text-[10px] font-sans font-black tracking-[0.3em] text-white uppercase flex items-center gap-3"><span className="w-2 h-2 bg-[#0055FF] rounded-full shadow-[0_0_15px_#0055FF]"></span> {lang === 'EN' ? 'WEB • CONTENT • EDUCATION' : 'WEB • ΠΕΡΙΕΧΟΜΕΝΟ • ΕΚΠΑΙΔΕΥΣΗ'}</span>
          </div>
          <h2 className="text-6xl md:text-[8rem] font-serif leading-[0.95] tracking-tight mb-8 drop-shadow-2xl animate-fade-up delay-100 opacity-0 relative z-20">
            <span className="glitch-hover" data-text={lang === 'EN' ? 'Architects of' : 'Αρχιτεκτονες του'}>{lang === 'EN' ? 'Architects of' : 'Αρχιτεκτονες του'}</span> <br /><span className="font-sans font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white via-[#0055FF] to-[#002266] glitch-hover" data-text={lang === 'EN' ? 'The Web.' : 'Ιστου.'}>{lang === 'EN' ? 'The Web.' : 'Ιστου.'}</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between w-full border-t border-zinc-700 pt-8 mt-12 relative z-20 animate-fade-up delay-200 opacity-0">
            <p className="text-xl md:text-2xl text-white font-serif tracking-tight leading-snug drop-shadow-md max-w-2xl">
              {lang === 'EN' ? 'We engineer digital ecosystems. From high-performance websites to AI-driven social media content and elite creator education.' : 'Σχεδιάζουμε ψηφιακά οικοσυστήματα. Από ιστοσελίδες υψηλής απόδοσης μέχρι AI social media περιεχόμενο και εκπαίδευση.'}
            </p>
            <div className="flex gap-4"><a href="/websites" className="bg-[#0055FF] text-white px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,85,255,0.5)] hover:scale-105">{lang === 'EN' ? 'Discover The Edge' : 'Το Πλεονεκτημα'}</a></div>
          </div>
        </div>
      </section>

      <div 
        ref={marqueeRef}
        className="w-full overflow-hidden bg-[#0055FF] py-6 border-y border-blue-400/30 z-20 relative shadow-[0_0_40px_rgba(0,85,255,0.3)]"
      >
        <div className="flex gap-16 animate-marquee whitespace-nowrap text-white font-mono text-xl tracking-widest">
          {['WEB ARCHITECTURE', 'AI CONTENT CREATION', 'MENTORSHIP', 'SOCIAL DOMINANCE', 'WEB ARCHITECTURE', 'AI CONTENT CREATION', 'MENTORSHIP', 'SOCIAL DOMINANCE'].map((item, idx) => (<React.Fragment key={idx}><span>{item}</span> {idx < 7 && <span>•</span>}</React.Fragment>))}
        </div>
      </div>

      {/* WHO WE ARE SECTION */}
      <section className="py-24 px-6 relative z-10 bg-[#030303] border-b border-zinc-900/50">
        <div className="max-w-4xl mx-auto text-center reveal">
          <p className="text-[#0055FF] font-bold tracking-widest text-[10px] uppercase mb-4">{lang === 'EN' ? 'WHO I AM' : 'ΠΟΙΟΣ ΕΙΜΑΙ'}</p>
          <h3 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-snug">
            {lang === 'EN' ? 'A 17-year-old visionary building the digital infrastructure of tomorrow.' : 'Ένας 17χρονος visionary που χτίζει την ψηφιακή υποδομή του αύριο.'}
          </h3>
          <p className="text-zinc-400 text-lg leading-relaxed mb-10">
            {lang === 'EN' ? "I am a 17-year-old website designer and engineer with an obsession for perfection. I craft premium, high-converting digital ecosystems that don't just look stunning, but dominate markets. Every line of code, every pixel, and every animation is meticulously designed to elevate your brand to the absolute top." : "Είμαι ένας 17χρονος website designer και engineer με εμμονή στην τελειότητα. Κατασκευάζω premium, υψηλής μετατρεψιμότητας ψηφιακά οικοσυστήματα που δεν είναι απλώς εντυπωσιακά, αλλά κυριαρχούν στις αγορές. Κάθε γραμμή κώδικα, κάθε pixel και κάθε animation σχεδιάζεται με απόλυτη λεπτομέρεια για να ανεβάσει το brand σας στην κορυφή."}
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-32 px-6 relative z-10 border-t border-zinc-900 bg-zinc-950/30 backdrop-blur-md">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16 text-center reveal">
            <h2 className="text-sm font-mono tracking-[0.3em] text-[#0055FF] uppercase mb-4">FAQ</h2>
            <h3 className="text-4xl md:text-6xl font-serif tracking-tight text-white mb-2">{lang === 'EN' ? 'Frequently Asked' : 'Συχνές'} <span className="italic font-light text-zinc-500">{lang === 'EN' ? 'Questions.' : 'Ερωτήσεις.'}</span></h3>
          </div>
          <div className="space-y-4 reveal reveal-delay-100">
            {faqs.map((faq, index) => (
              <div key={index} className={`border ${openFaq === index ? 'border-zinc-700 bg-zinc-900/50' : 'border-zinc-800/80 bg-black/40'} rounded-xl overflow-hidden transition-all duration-300 hover:border-zinc-700`}>
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none">
                  <span className="text-white font-medium tracking-wide pr-4">{lang === 'EN' ? faq.en.q : faq.gr.q}</span>
                  <span className={`transform transition-transform duration-300 flex-shrink-0 text-zinc-500 ${openFaq === index ? 'rotate-180 text-[#0055FF]' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </button>
                <div className={`px-6 transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">{lang === 'EN' ? faq.en.a : faq.gr.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE AGORA (Booking Form) */}
      <section id="the-agora" className="py-32 px-6 relative z-10 border-t border-zinc-900 bg-[#030303]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center reveal">
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-6"><span className="glitch-hover" data-text={lang === 'EN' ? 'The' : 'Η'}>{lang === 'EN' ? 'The' : 'Η'}</span> <span className="text-[#0055FF] italic font-light glitch-hover" data-text={lang === 'EN' ? 'Agora.' : 'Αγορά.'}>{lang === 'EN' ? 'Agora.' : 'Αγορά.'}</span></h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">{lang === 'EN' ? 'Ready to construct your digital future? Select a service and reach out to the studio.' : 'Είστε έτοιμοι να χτίσετε το ψηφιακό σας μέλλον; Επιλέξτε υπηρεσία και επικοινωνήστε.'}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            <div className="bg-zinc-950 border border-zinc-800/80 p-8 lg:p-12 relative shadow-2xl rounded-xl reveal reveal-delay-100">
              {isSent ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"><div className="w-20 h-20 rounded-full border border-[#0055FF] flex items-center justify-center mb-6 text-[#0055FF] text-4xl shadow-[0_0_30px_rgba(0,85,255,0.2)]">✓</div><h3 className="text-2xl font-serif italic mb-4">{lang === 'EN' ? 'Transmission Successful' : 'Επιτυχής Μετάδοση'}</h3><p className="text-zinc-400 font-light">{lang === 'EN' ? 'Our architects will review your request and make contact shortly.' : 'Οι συνεργάτες μας θα εξετάσουν το αίτημά σας και θα επικοινωνήσουν.'}</p></div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  <div className="flex flex-col gap-2"><label htmlFor="name" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">{lang === 'EN' ? 'Name' : 'Όνομα'}</label><input type="text" id="name" name="name" required className="bg-transparent border-b-2 border-zinc-800 px-2 py-3 text-white focus:outline-none focus:border-[#0055FF] transition-colors rounded-none placeholder:opacity-30" placeholder={lang === 'EN' ? 'Your name...' : 'Το όνομά σας...'} /></div>
                  <div className="flex flex-col gap-2"><label htmlFor="email" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">{lang === 'EN' ? 'Email' : 'Email'}</label><input type="email" id="email" name="email" required className="bg-transparent border-b-2 border-zinc-800 px-2 py-3 text-white focus:outline-none focus:border-[#0055FF] transition-colors rounded-none placeholder:opacity-30" placeholder="hello@example.com" /></div>

                  {/* 🔥 NEW PHONE INPUT 🔥 */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">
                      {lang === 'EN' ? 'Phone Number' : 'Τηλέφωνο'}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="bg-transparent border-b-2 border-zinc-800 px-2 py-3 text-white focus:outline-none focus:border-[#0055FF] transition-colors rounded-none placeholder:opacity-30"
                      placeholder={lang === 'EN' ? '+30 690 000 0000' : '+30 690 000 0000'}
                    />
                  </div>
                  {/* 🔥 END NEW PHONE INPUT 🔥 */}

                  <div className="flex flex-col gap-2">
                    <label htmlFor="project_type" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">{lang === 'EN' ? 'Service Required' : 'ΕΠΙΛΟΓΗ ΥΠΗΡΕΣΙΑΣ'}</label>
                    <div className="relative">
                      <select id="project_type" name="project_type" className="w-full bg-black border-b-2 border-zinc-800 px-2 py-3 text-white focus:outline-none focus:border-[#0055FF] transition-colors rounded-none appearance-none cursor-pointer">
                        <option value="website_simple">{lang === 'EN' ? 'Simple Website (€350)' : 'Simple Ιστοσελίδα (€350)'}</option>
                        <option value="website_premium">{lang === 'EN' ? 'Premium Website (€550)' : 'Premium Ιστοσελίδα (€550)'}</option>
                        <option value="social">{lang === 'EN' ? 'Social Media / Content Empire' : 'Παραγωγή Content / Social Media'}</option>
                        <option value="education">{lang === 'EN' ? 'AI Learning Atelier (Mentorship)' : 'AI Learning Atelier (Εκπαίδευση)'}</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-[#0055FF]"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2"><label htmlFor="message" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">{lang === 'EN' ? 'Project Details' : 'Λεπτομέρειες'}</label><textarea id="message" name="message" required rows={4} className="bg-transparent border-b-2 border-zinc-800 px-2 py-3 text-white focus:outline-none focus:border-[#0055FF] transition-colors resize-none rounded-none placeholder:opacity-30" placeholder={lang === 'EN' ? 'Tell us what we are building or learning...' : 'Πείτε μας τι θέλετε να χτίσουμε ή να μάθετε...'}></textarea></div>
                  <button type="submit" disabled={isSubmitting} className="mt-6 bg-[#0055FF] text-white px-8 py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,85,255,0.2)]">{isSubmitting ? (lang === 'EN' ? 'Transmitting...' : 'Αποστολή...') : (lang === 'EN' ? 'Send to Studio' : 'Αποστολή στο Στούντιο')}</button>
                </form>
              )}
            </div>

            <div className="flex flex-col justify-between space-y-8 reveal reveal-delay-200">
              <div className="space-y-6">
                <div className="inline-block border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 rounded-sm"><span className="text-[10px] font-mono tracking-widest text-[#0055FF] uppercase">{lang === 'EN' ? 'Coordinates' : 'Συντεταγμένες'}</span></div>
                <h4 className="text-3xl font-serif text-white leading-snug">Leof. Andrea Papandreou 179<br /><span className="text-zinc-500 font-sans font-light text-xl tracking-wide">Ilion 131 21, Athens, Greece</span></h4>
              </div>
              <div className="w-full h-full min-h-[350px] rounded-xl overflow-hidden border border-zinc-800 grayscale hover:grayscale-0 transition-all duration-700 shadow-[0_0_30px_rgba(0,85,255,0.1)] relative group">
                <div className="absolute inset-0 bg-[#0055FF]/10 pointer-events-none group-hover:bg-transparent transition duration-700 z-10"></div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.682855219438!2d23.6961445!3d38.0312061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1a367d264f331%3A0x63daab72e70e30d1!2sLeof.%20Andrea%20Papandreou%20179%2C%20Ilion%20131%2021%2C%20Greece!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0, minHeight: '350px' }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Renzo Agency Location"></iframe>
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
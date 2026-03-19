"use client";

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Language State: 'EN' for English, 'GR' for Greek
  const [lang, setLang] = useState<'EN' | 'GR'>('EN');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cubes = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.floor(Math.random() * 100)}vw`,
    size: `${Math.floor(Math.random() * 80) + 20}px`,
    duration: `${Math.floor(Math.random() * 20) + 15}s`,
    delay: `${Math.floor(Math.random() * 10)}s`,
  }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <main className="font-sans antialiased bg-[#030303] text-[#FAFAFA] min-h-screen selection:bg-[#0055FF] selection:text-white overflow-x-hidden relative">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatCube {
          0% { transform: translateY(110vh) rotateX(0deg) rotateY(0deg); opacity: 0; }
          20% { opacity: 0.1; }
          80% { opacity: 0.1; }
          100% { transform: translateY(-20vh) rotateX(360deg) rotateY(360deg); opacity: 0; }
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .cube {
          position: fixed;
          bottom: -100px;
          background: transparent;
          border: 1px solid rgba(0, 85, 255, 0.4);
          pointer-events: none;
          z-index: 0;
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 25s linear infinite;
        }
        .meander-bg {
          background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0, 85, 255, 0.03) 10px, rgba(0, 85, 255, 0.03) 20px);
        }
      `}} />

      {/* Background Effects */}
      {mounted && (
        <div 
          className="fixed inset-0 z-[1] pointer-events-none transition-transform duration-75 ease-out flex items-center justify-center"
          style={{
            transform: `translateY(${scrollY * 0.15}px) scale(${1 + scrollY * 0.0002})`,
            opacity: Math.min(0.6, 0.1 + scrollY / 1500)
          }}
        >
          <div className="absolute inset-0 bg-[#0055FF]/20 mix-blend-color z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303] z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-[#030303] z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=2000&auto=format&fit=crop" 
            alt="The Parthenon" 
            className="w-full h-[120vh] object-cover opacity-20 grayscale contrast-150"
          />
        </div>
      )}

      {mounted && cubes.map((cube) => (
        <div 
          key={cube.id} 
          className="cube backdrop-blur-sm bg-white/5"
          style={{
            left: cube.left,
            width: cube.size,
            height: cube.size,
            animation: `floatCube ${cube.duration} linear infinite`,
            animationDelay: cube.delay,
          }}
        />
      ))}

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a 
            href="/" 
            className="text-2xl font-serif font-bold tracking-widest uppercase flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-all focus:outline-none"
          >
            RENZO <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF] mt-1 group-hover:animate-ping shadow-[0_0_10px_#0055FF]"></span>
          </a>
          
          <div className="hidden md:flex space-x-10 text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">
            <a href="#services" className="hover:text-[#0055FF] transition duration-300">
              {lang === 'EN' ? 'Services' : 'Υπηρεσιες'}
            </a>
            <a href="#advantages" className="hover:text-[#0055FF] transition duration-300">
              {lang === 'EN' ? 'Advantages' : 'Πλεονεκτηματα'}
            </a>
            <a href="#the-agora" className="hover:text-[#0055FF] transition duration-300">
              {lang === 'EN' ? 'The Agora' : 'Επικοινωνια'}
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden text-[10px] font-bold tracking-widest uppercase">
              <button onClick={() => setLang('EN')} className={`px-3 py-2 transition-all ${lang === 'EN' ? 'bg-[#0055FF] text-white' : 'text-zinc-500 hover:text-white'}`}>EN</button>
              <button onClick={() => setLang('GR')} className={`px-3 py-2 transition-all ${lang === 'GR' ? 'bg-[#0055FF] text-white' : 'text-zinc-500 hover:text-white'}`}>GR</button>
            </div>

            <a href="https://www.instagram.com/renzoo.agency/" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#0055FF] transition-colors duration-300 ml-2" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="#the-agora" className="hidden md:block border border-[#0055FF] text-[#0055FF] px-6 py-2.5 text-[10px] font-bold tracking-widest hover:bg-[#0055FF] hover:text-white transition-all duration-300 uppercase">
                {lang === 'EN' ? 'Start a Project' : 'Ξεκινηστε'}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 z-10 meander-bg">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="inline-block border border-[#0055FF]/30 bg-[#0055FF]/10 backdrop-blur-md px-5 py-2 rounded-sm mb-10 shadow-[0_0_15px_rgba(0,85,255,0.15)]">
            <span className="text-[10px] font-mono tracking-widest text-blue-200 uppercase flex items-center gap-2">
              <span className="text-xl leading-none -mt-1">🏛️</span> 
              {lang === 'EN' ? 'Engineered in Hellas. Building globally.' : 'Σχεδιασμενο στην Ελλαδα. Δημιουργουμε παγκοσμιως.'}
            </span>
          </div>

          <h2 className="text-6xl md:text-[8rem] font-serif leading-[0.95] tracking-tight mb-8 drop-shadow-2xl">
            {lang === 'EN' ? 'Architects of' : 'Αρχιτεκτονες του'} <br />
            <span className="font-sans font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white via-[#0055FF] to-[#002266]">
              {lang === 'EN' ? 'The Web.' : 'Ιστου.'}
            </span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between w-full border-t border-zinc-700 pt-8 mt-12 relative z-20">
            <p className="text-xl md:text-2xl text-white font-light max-w-lg leading-relaxed drop-shadow-md">
              {lang === 'EN' 
                ? 'Renzo Agency crafts high-performance digital infrastructure, merging classical design principles with modern automation.' 
                : 'Η Renzo Agency δημιουργεί ψηφιακές υποδομές υψηλής απόδοσης, συνδυάζοντας κλασικές αρχές σχεδιασμού με σύγχρονους αυτοματισμούς.'}
            </p>
            <div className="flex gap-4">
              <a href="#services" className="bg-[#0055FF] text-white px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,85,255,0.5)] hover:scale-105">
                {lang === 'EN' ? 'Discover The Edge' : 'Το Πλεονεκτημα'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Banner */}
      <div className="w-full overflow-hidden bg-[#0055FF] text-white py-4 transform -rotate-1 scale-105 z-20 relative shadow-[0_0_40px_rgba(0,85,255,0.3)] border-y border-blue-400/30">
        <div className="animate-marquee font-serif italic text-2xl tracking-widest uppercase">
          {lang === 'EN' 
            ? 'DIGITAL ODYSSEY • UI/UX DESIGN • AUTOMATION • FRONTEND ENGINEERING • DIGITAL ODYSSEY • UI/UX DESIGN • AUTOMATION • FRONTEND ENGINEERING • ' 
            : 'ΨΗΦΙΑΚΗ ΟΔΥΣΣΕΙΑ • ΣΧΕΔΙΑΣΜΟΣ UI/UX • ΑΥΤΟΜΑΤΙΣΜΟΣ • FRONTEND ENGINEERING • ΨΗΦΙΑΚΗ ΟΔΥΣΣΕΙΑ • ΣΧΕΔΙΑΣΜΟΣ UI/UX • ΑΥΤΟΜΑΤΙΣΜΟΣ • FRONTEND ENGINEERING • '}
        </div>
      </div>

      {/* NEW SERVICES SECTION (Obsidian / Blue Greek Style) */}
      <section id="services" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-zinc-800 pb-8">
            <h3 className="text-5xl md:text-7xl font-sans font-black tracking-tighter uppercase text-white">
              {lang === 'EN' ? 'DEVELOPMENT' : 'ΑΝΑΠΤΥΞΗ'}
            </h3>
            <p className="text-[#0055FF] font-bold tracking-widest text-[10px] uppercase mt-4 md:mt-0">
              {lang === 'EN' ? 'Premium Code & Custom Solutions.' : 'PREMIUM ΚΩΔΙΚΑΣ & CUSTOM ΛΥΣΕΙΣ.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Card 1: Web Development */}
            <div className="bg-zinc-950/70 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] p-10 md:p-14 flex flex-col hover:border-[#0055FF] hover:bg-zinc-900 transition-all duration-500 shadow-2xl group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0055FF] to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              
              <div className="text-[#0055FF] mb-8 flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              </div>
              <h4 className="text-3xl md:text-4xl font-black mb-6 leading-tight tracking-tighter uppercase text-white">
                CUSTOM WEB<br/>DEVELOPMENT
              </h4>
              <p className="text-zinc-400 text-sm md:text-base mb-10 leading-relaxed font-light">
                {lang === 'EN' 
                  ? "We build modern, custom websites that load instantly. We don't use ready-made templates. We build from scratch with the latest technologies." 
                  : "Κατασκευάζουμε σύγχρονες, custom ιστοσελίδες που φορτώνουν αστραπιαία. Δεν χρησιμοποιούμε έτοιμα templates. Χτίζουμε από το μηδέν με τις πιο σύγχρονες τεχνολογίες."}
              </p>
              <ul className="space-y-4 mb-16">
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-300"><span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF]"></span> Custom UI/UX Design</li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-300"><span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF]"></span> Next.js / React Architecture</li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-300"><span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF]"></span> {lang === 'EN' ? 'Ultimate Speed & SEO-Ready Code' : 'Απόλυτη Ταχύτητα & SEO-Ready Κώδικας'}</li>
              </ul>
              <div className="mt-auto pt-6 border-t border-zinc-800/50 flex items-center justify-between cursor-pointer">
                <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 group-hover:text-[#0055FF] transition-colors duration-300">{lang === 'EN' ? 'Website Packages' : 'ΠΑΚΕΤΑ WEBSITES'}</span>
                <div className="w-10 h-10 rounded-full border border-zinc-700 text-zinc-400 flex items-center justify-center group-hover:border-[#0055FF] group-hover:text-[#0055FF] group-hover:bg-[#0055FF]/10 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </div>

            {/* Card 2: E-Shops */}
            <div className="bg-zinc-950/70 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] p-10 md:p-14 flex flex-col hover:border-[#0055FF] hover:bg-zinc-900 transition-all duration-500 shadow-2xl group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0055FF] to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="text-[#0055FF] mb-8 flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
              </div>
              <h4 className="text-3xl md:text-4xl font-black mb-6 leading-tight tracking-tighter uppercase text-white">
                HIGH-PERFORMANCE<br/>E-SHOPS
              </h4>
              <p className="text-zinc-400 text-sm md:text-base mb-10 leading-relaxed font-light">
                {lang === 'EN' 
                  ? "We design e-commerce stores built 100% around Conversion Rate. We minimize checkout friction and optimize sales processes." 
                  : "Σχεδιάζουμε ηλεκτρονικά καταστήματα στημένα 100% γύρω από το Conversion Rate. Ελαχιστοποιούμε το friction στο checkout και βελτιστοποιούμε τις διαδικασίες πώλησης."}
              </p>
              <ul className="space-y-4 mb-16">
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-300"><span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF]"></span> {lang === 'EN' ? 'Custom E-commerce Solutions' : 'Custom E-commerce Λύσεις'}</li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-300"><span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF]"></span> Conversion Rate Optimization (CRO)</li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-300"><span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF]"></span> High-Volume Traffic Handling</li>
              </ul>
              <div className="mt-auto pt-6 border-t border-zinc-800/50 flex items-center justify-between cursor-pointer">
                <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 group-hover:text-[#0055FF] transition-colors duration-300">{lang === 'EN' ? 'E-Shop Packages' : 'ΠΑΚΕΤΑ E-SHOPS'}</span>
                <div className="w-10 h-10 rounded-full border border-zinc-700 text-zinc-400 flex items-center justify-center group-hover:border-[#0055FF] group-hover:text-[#0055FF] group-hover:bg-[#0055FF]/10 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Advantage Section */}
      <section id="advantages" className="py-32 px-6 relative z-10 border-t border-zinc-900/50 bg-[#050505]/60 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-full text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-8 drop-shadow-xl">
              {lang === 'EN' ? 'The' : 'Το'} <br /><span className="text-[#0055FF] italic font-light">{lang === 'EN' ? 'Advantage.' : 'Πλεονέκτημα.'}</span>
            </h2>
            <p className="text-zinc-300 text-xl font-light leading-relaxed mb-8 max-w-2xl">
              {lang === 'EN' 
                ? 'Stop losing customers to the competition. A modern website is not just a digital flyer; it is the ultimate, high-performance employee.' 
                : 'Σταματήστε να χάνετε πελάτες από τον ανταγωνισμό. Ένας σύγχρονος ιστότοπος δεν είναι απλώς ένα ψηφιακό φυλλάδιο· είναι ο απόλυτος υπάλληλος υψηλής απόδοσης.'}
            </p>
            <div className="space-y-12 mt-12 bg-black/40 p-8 border border-zinc-800/50 rounded-lg text-left">
              <div className="relative pl-8 border-l border-zinc-800">
                <div className="absolute w-3 h-3 bg-[#0055FF] rounded-full -left-[6.5px] top-2 shadow-[0_0_10px_#0055FF]"></div>
                <h4 className="text-2xl font-bold mb-3 tracking-wide uppercase">{lang === 'EN' ? 'The Sleepless Agent' : 'Ο Άγρυπνος Αντιπρόσωπος'}</h4>
                <p className="text-zinc-400 leading-relaxed font-light">
                  {lang === 'EN' 
                    ? 'Imagine an employee who perfectly pitches your services, answers questions, and books high-paying clients at 3:00 AM. Your website never sleeps, never takes breaks, and never misses a lead.' 
                    : 'Φανταστείτε έναν υπάλληλο που παρουσιάζει τέλεια τις υπηρεσίες σας, απαντά σε ερωτήσεις και κλείνει πελάτες υψηλής αξίας στις 3:00 π.μ. Ο ιστότοπός σας δεν κοιμάται ποτέ, δεν κάνει ποτέ διαλείμματα και δεν χάνει ποτέ κανένα lead.'}
                </p>
              </div>
              <div className="relative pl-8 border-l border-zinc-800">
                <div className="absolute w-3 h-3 bg-[#0055FF] rounded-full -left-[6.5px] top-2 shadow-[0_0_10px_#0055FF]"></div>
                <h4 className="text-2xl font-bold mb-3 tracking-wide uppercase">{lang === 'EN' ? 'The Frictionless Standard' : 'Το Ανεμπόδιστο Πρότυπο'}</h4>
                <p className="text-zinc-400 leading-relaxed font-light">
                  {lang === 'EN' 
                    ? 'Modern consumers demand autonomy. Studies show a massive shift toward businesses that offer instant, frictionless online booking. People prefer tapping a button over making a phone call. We give them exactly what they want.' 
                    : 'Οι σύγχρονοι καταναλωτές απαιτούν αυτονομία. Μελέτες δείχνουν μια τεράστια στροφή προς επιχειρήσεις που προσφέρουν άμεσες online κρατήσεις. Οι άνθρωποι προτιμούν το πάτημα ενός κουμπιού παρά ένα τηλεφώνημα. Τους δίνουμε ακριβώς αυτό που θέλουν.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Agora (Contact Form) */}
      <section id="the-agora" className="py-32 px-6 relative z-10 border-t border-zinc-900 bg-[#030303]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">
              {lang === 'EN' ? 'The' : 'Η'} <span className="text-[#0055FF] italic font-light">{lang === 'EN' ? 'Agora.' : 'Αγορά.'}</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              {lang === 'EN' 
                ? 'Ready to construct your digital future? Reach out to our studio in Athens, or drop by our coordinates.' 
                : 'Είστε έτοιμοι να κατασκευάσετε το ψηφιακό σας μέλλον; Επικοινωνήστε με το στούντιο μας στην Αθήνα ή επισκεφθείτε μας.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-zinc-950 border border-zinc-800/80 p-8 lg:p-12 relative shadow-2xl">
              {isSent ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                  <div className="w-20 h-20 rounded-full border border-[#0055FF] flex items-center justify-center mb-6 text-[#0055FF] text-4xl shadow-[0_0_30px_rgba(0,85,255,0.2)]">✓</div>
                  <h3 className="text-2xl font-serif italic mb-4">{lang === 'EN' ? 'Transmission Successful' : 'Επιτυχής Μετάδοση'}</h3>
                  <p className="text-zinc-400 font-light">{lang === 'EN' ? 'Our architects will review your request and make contact shortly.' : 'Οι αρχιτέκτονες μας θα εξετάσουν το αίτημά σας και θα επικοινωνήσουν σύντομα μαζί σας.'}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">{lang === 'EN' ? 'Name' : 'Όνομα'}</label>
                    <input type="text" id="name" required className="bg-black border border-zinc-800 px-5 py-4 text-white focus:outline-none focus:border-[#0055FF] focus:bg-zinc-900 transition-all rounded-sm" placeholder={lang === 'EN' ? 'Your name...' : 'Το όνομά σας...'} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">{lang === 'EN' ? 'Email' : 'Email'}</label>
                    <input type="email" id="email" required className="bg-black border border-zinc-800 px-5 py-4 text-white focus:outline-none focus:border-[#0055FF] focus:bg-zinc-900 transition-all rounded-sm" placeholder="hello@example.com" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">{lang === 'EN' ? 'Project Details' : 'Λεπτομέρειες Έργου'}</label>
                    <textarea id="message" required rows={5} className="bg-black border border-zinc-800 px-5 py-4 text-white focus:outline-none focus:border-[#0055FF] focus:bg-zinc-900 transition-all resize-none rounded-sm" placeholder={lang === 'EN' ? 'Tell us what we are building...' : 'Πείτε μας τι χτίζουμε...'}></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="mt-6 bg-[#0055FF] text-white px-8 py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,85,255,0.2)]">
                    {isSubmitting 
                      ? (lang === 'EN' ? 'Transmitting...' : 'Αποστολή...') 
                      : (lang === 'EN' ? 'Send to Studio' : 'Αποστολή στο Στούντιο')}
                  </button>
                </form>
              )}
            </div>

            <div className="flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="inline-block border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 rounded-sm">
                  <span className="text-[10px] font-mono tracking-widest text-[#0055FF] uppercase">{lang === 'EN' ? 'Coordinates' : 'Συντεταγμένες'}</span>
                </div>
                <h4 className="text-3xl font-serif text-white leading-snug">
                  Leof. Andrea Papandreou 179<br />
                  <span className="text-zinc-500 font-sans font-light text-xl tracking-wide">Ilion 131 21, Athens, Greece</span>
                </h4>
              </div>

              <div className="w-full h-full min-h-[300px] rounded-sm overflow-hidden border border-zinc-800 grayscale hover:grayscale-0 transition-all duration-700 shadow-[0_0_30px_rgba(0,85,255,0.1)] relative group">
                <div className="absolute inset-0 bg-[#0055FF]/10 pointer-events-none group-hover:bg-transparent transition duration-700 z-10"></div>
                <iframe 
                  src="https://maps.google.com/maps?q=Leof.%20Andrea%20Papandreou%20179,%20Ilion,%20Greece&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: '350px' }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Renzo Agency Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-900 py-12 bg-black flex flex-col items-center justify-center gap-6">
        <a href="https://www.instagram.com/renzoo.agency/" target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-[#0055FF] transition-colors duration-300" aria-label="Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
        </a>
        <p className="text-zinc-600 text-[10px] font-bold tracking-[0.3em] uppercase text-center">
          <span className="text-[#0055FF] mr-2">🏛️</span> 
          © {new Date().getFullYear()} RENZO AGENCY. {lang === 'EN' ? 'DIGITAL INFRASTRUCTURE.' : 'ΨΗΦΙΑΚΗ ΥΠΟΔΟΜΗ.'}
        </p>
      </footer>
    </main>
  );
}
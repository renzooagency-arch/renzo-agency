"use client";

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [lang, setLang] = useState<'EN' | 'GR'>('EN');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

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
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
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
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        @keyframes floatCube { 0% { transform: translateY(110vh) rotateX(0deg) rotateY(0deg); opacity: 0; } 20% { opacity: 0.1; } 80% { opacity: 0.1; } 100% { transform: translateY(-20vh) rotateX(360deg) rotateY(360deg); opacity: 0; } }
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .cube { position: fixed; bottom: -100px; background: transparent; border: 1px solid rgba(0, 85, 255, 0.4); pointer-events: none; z-index: 0; }
        .animate-marquee { display: inline-block; white-space: nowrap; animation: marquee 20s linear infinite; }
      `}} />

      {/* Global Background */}
      <div className="fixed inset-0 z-[1] pointer-events-none transition-transform duration-75 ease-out" style={{ transform: `translateY(${scrollY * 0.15}px) scale(${1 + scrollY * 0.0002})`, opacity: mounted ? Math.min(0.8, 0.3 + scrollY / 1500) : 0 }}>
        <div className="absolute inset-0 bg-[#0055FF]/10 mix-blend-color z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/40 via-[#030303]/60 to-[#030303] z-10"></div>
        <img src="https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=2000&auto=format&fit=crop" alt="The Parthenon" className="w-full h-[120vh] object-cover opacity-30 grayscale contrast-125" />
      </div>

      {mounted && cubes.map((cube) => (
        <div 
          key={cube.id} 
          className="cube backdrop-blur-sm bg-white/5" 
          style={{ 
            left: cube.left, 
            width: cube.size, 
            height: cube.size, 
            animationName: 'floatCube',
            animationDuration: cube.duration,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: cube.delay 
          }} 
        />
      ))}

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-50">
          <a href="/" className="text-2xl font-serif font-bold tracking-widest uppercase flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-all focus:outline-none">
            RENZO <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF] mt-1 group-hover:animate-ping shadow-[0_0_10px_#0055FF]"></span>
          </a>
          
          <div className="hidden md:flex space-x-6 lg:space-x-8 text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">
            <a href="/why-us" className="hover:text-[#0055FF] transition duration-300">Why Us</a>
            <a href="#web" className="hover:text-[#0055FF] transition duration-300">Web</a>
            <a href="#social" className="hover:text-[#0055FF] transition duration-300">Social</a>
            <a href="#education" className="hover:text-[#0055FF] transition duration-300">{lang === 'EN' ? 'Learn' : 'Μαθηση'}</a>
            <a href="#prices" className="hover:text-[#0055FF] transition duration-300">{lang === 'EN' ? 'Prices' : 'Τιμες'}</a>
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
            <a href="#web" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition duration-300">Web</a>
            <a href="#social" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition duration-300">Social</a>
            <a href="#education" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition duration-300">{lang === 'EN' ? 'Learn' : 'Μαθηση'}</a>
            <a href="#prices" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition duration-300">{lang === 'EN' ? 'Prices' : 'Τιμες'}</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition duration-300">FAQ</a>
            <a href="https://www.instagram.com/renzo.agency_/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0055FF] transition duration-300">INSTAGRAM</a>
            <a href="#the-agora" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0055FF] border border-[#0055FF] px-8 py-3 rounded-sm hover:bg-[#0055FF] hover:text-white transition duration-300 mt-4">{lang === 'EN' ? 'Start a Project' : 'Ξεκινηστε'}</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 z-10">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="inline-block border border-[#0055FF]/30 bg-[#0055FF]/10 backdrop-blur-md px-5 py-2 rounded-sm mb-10 shadow-[0_0_15px_rgba(0,85,255,0.15)]">
            <span className="text-[10px] font-sans font-black tracking-widest text-blue-200 uppercase flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF]"></span> {lang === 'EN' ? 'WEB • CONTENT • EDUCATION' : 'WEB • ΠΕΡΙΕΧΟΜΕΝΟ • ΕΚΠΑΙΔΕΥΣΗ'}</span>
          </div>
          <h2 className="text-6xl md:text-[8rem] font-serif leading-[0.95] tracking-tight mb-8 drop-shadow-2xl">
            {lang === 'EN' ? 'Architects of' : 'Αρχιτεκτονες του'} <br /><span className="font-sans font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white via-[#0055FF] to-[#002266]">{lang === 'EN' ? 'The Web.' : 'Ιστου.'}</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between w-full border-t border-zinc-700 pt-8 mt-12 relative z-20">
            <p className="text-xl md:text-2xl text-white font-serif tracking-tight leading-snug drop-shadow-md max-w-2xl">
              {lang === 'EN' ? 'We engineer digital ecosystems. From high-performance websites to AI-driven social media content and elite creator education.' : 'Σχεδιάζουμε ψηφιακά οικοσυστήματα. Από ιστοσελίδες υψηλής απόδοσης μέχρι AI social media περιεχόμενο και εκπαίδευση.'}
            </p>
            <div className="flex gap-4"><a href="#web" className="bg-[#0055FF] text-white px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,85,255,0.5)] hover:scale-105">{lang === 'EN' ? 'Discover The Edge' : 'Το Πλεονεκτημα'}</a></div>
          </div>
        </div>
      </section>

      <div className="w-full overflow-hidden bg-[#0055FF] py-6 border-y border-blue-400/30 z-20 relative shadow-[0_0_40px_rgba(0,85,255,0.3)]">
        <div className="flex gap-16 animate-marquee whitespace-nowrap text-white font-mono text-xl tracking-widest">
          {['WEB ARCHITECTURE', 'AI CONTENT CREATION', 'MENTORSHIP', 'SOCIAL DOMINANCE', 'WEB ARCHITECTURE', 'AI CONTENT CREATION', 'MENTORSHIP', 'SOCIAL DOMINANCE'].map((item, idx) => (<React.Fragment key={idx}><span>{item}</span> {idx < 7 && <span>•</span>}</React.Fragment>))}
        </div>
      </div>

      {/* PILLAR 1: WEB ARCHITECTURE (MASSIVE SINGLE CARD) */}
      <section id="web" className="py-32 px-6 relative z-10 bg-zinc-950/70 backdrop-blur-md border-y border-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-zinc-800 pb-8">
            <div>
              <p className="text-[#0055FF] font-bold tracking-widest text-[10px] uppercase mb-2">PILLAR 01 • ENGINEERING</p>
              <h3 className="text-5xl md:text-7xl font-sans font-black tracking-tighter uppercase text-white drop-shadow-xl">{lang === 'EN' ? 'WEB ARCHITECTURE' : 'ΚΑΤΑΣΚΕΥΗ WEB'}</h3>
            </div>
            <a href="#prices" className="hidden md:block text-zinc-400 hover:text-[#0055FF] text-xs font-bold tracking-widest uppercase transition-colors">{lang === 'EN' ? 'VIEW PACKAGES →' : 'ΔΕΙΤΕ ΤΑ ΠΑΚΕΤΑ →'}</a>
          </div>
          
          {/* 🔥 THE ULTIMATE STANDOUT OFFER CARD 🔥 */}
          <div className="bg-black border-2 border-[#0055FF] rounded-[2rem] p-8 md:p-14 flex flex-col shadow-[0_0_50px_rgba(0,85,255,0.2)] relative overflow-hidden group">
            {/* Glowing background flares */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0055FF]/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#0055FF]/20 transition-all duration-700"></div>
            
            <div className="mb-8 inline-block border border-[#0055FF] text-[#0055FF] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase px-6 py-2 rounded-full shadow-[0_0_20px_rgba(0,85,255,0.4)] animate-pulse bg-[#0055FF]/10 self-start">
              {lang === 'EN' ? 'LIMITED TIME OFFER' : 'ΠΡΟΣΦΟΡΑ ΓΙΑ ΛΙΓΟ ΚΑΙΡΟ'}
            </div>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center relative z-10">
              <div className="w-full lg:w-1/2">
                <h4 className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tighter uppercase text-white">
                  {lang === 'EN' ? 'Professional Website' : 'Επαγγελματικη Ιστοσελιδα'}
                </h4>
                <div className="text-[#0055FF] text-6xl font-sans font-black mb-6">€350</div>
                <p className="text-zinc-400 text-lg leading-relaxed font-light mb-8">
                  {lang === 'EN' 
                    ? 'A high-converting, fully custom web platform engineered to dominate your market and turn visitors into paying clients instantly.' 
                    : 'Μια custom ιστοσελίδα υψηλής μετατρεψιμότητας, σχεδιασμένη να κυριαρχήσει στην αγορά σας και να φέρνει άμεσα πελάτες.'}
                </p>
                <a href="#the-agora" className="hidden lg:inline-block bg-[#0055FF] text-white px-10 py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,85,255,0.4)] rounded-sm">
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
                <a href="#the-agora" className="w-full mt-10 lg:hidden text-center block bg-[#0055FF] text-white px-10 py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,85,255,0.4)] rounded-sm">
                  {lang === 'EN' ? 'CLAIM THIS OFFER' : 'ΚΑΤΟΧΥΡΩΣΗ ΠΡΟΣΦΟΡΑΣ'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLAR 2: SOCIAL MEDIA CONTENT EMPIRE */}
      <section id="social" className="py-32 px-6 relative z-10 bg-[#030303]/90 border-b border-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[#0055FF] font-bold tracking-widest text-[10px] uppercase mb-2">PILLAR 02 • SOCIAL MEDIA</p>
            <h3 className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-white drop-shadow-xl">{lang === 'EN' ? 'THE CONTENT' : 'ΑΥΤΟΚΡΑΤΟΡΙΑ'} <span className="font-serif italic font-light text-[#0055FF]">{lang === 'EN' ? 'Empire.' : 'Περιεχομένου.'}</span></h3>
            <p className="text-zinc-400 text-lg mt-6 max-w-2xl font-light">
              {lang === 'EN' ? 'AI-powered social media content engineered for maximum reach. We produce scroll-stopping short-form videos that turn followers into paying clients.' : 'AI περιεχόμενο σχεδιασμένο για μέγιστη απήχηση. Παράγουμε short-form βίντεο που μετατρέπουν τους followers σε πελάτες.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 bg-black border border-zinc-800 rounded-2xl p-10 relative hover:border-[#0055FF]/50 transition-colors duration-500 flex flex-col">
              <h4 className="text-3xl font-serif text-white mb-2 mt-4">{lang === 'EN' ? 'Social Media Pack' : 'Πακέτο Social Media'}</h4>
              <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-8">{lang === 'EN' ? 'AI-ENHANCED VIDEO PRODUCTION' : 'ΠΑΡΑΓΩΓΗ ΒΙΝΤΕΟ ΜΕ AI'}</p>
              
              <div className="mb-8 border-b border-zinc-800 pb-8">
                <span className="text-6xl font-sans font-black tracking-tighter text-white">500€</span>
                <span className="text-zinc-500 text-sm block mt-2">{lang === 'EN' ? '10 videos — one-time investment' : '10 βίντεο — εφάπαξ επένδυση'}</span>
              </div>

              <ul className="space-y-5 flex-grow mb-10">
                {[
                  lang === 'EN' ? '10 professionally produced short-form videos' : '10 επαγγελματικά short-form βίντεο',
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

              <a href="#the-agora" className="w-full text-center border border-zinc-700 text-zinc-400 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:border-[#0055FF] hover:text-[#0055FF] hover:bg-[#0055FF]/5 transition-all duration-300 rounded-sm">
                {lang === 'EN' ? 'START YOUR CONTENT EMPIRE' : 'ΞΕΚΙΝΗΣΤΕ ΤΗΝ ΠΑΡΑΓΩΓΗ'}
              </a>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center space-y-12">
              <div>
                <h4 className="text-[10px] text-[#0055FF] font-bold tracking-[0.3em] uppercase mb-4">{lang === 'EN' ? 'WHY VIDEO DOMINATES' : 'ΓΙΑΤΙ ΤΟ ΒΙΝΤΕΟ ΚΥΡΙΑΡΧΕΙ'}</h4>
                <p className="text-zinc-300 text-lg font-light leading-relaxed">
                  {lang === 'EN' ? 'Short-form video generates up to 3× more engagement than static posts. We combine AI tools with strategic storytelling to create content that algorithms push — and audiences stop for.' : 'Το βίντεο παράγει 3× περισσότερο engagement. Συνδυάζουμε AI εργαλεία με στρατηγικό storytelling για να δημιουργήσουμε περιεχόμενο που προωθείται από τον αλγόριθμο.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-zinc-800 bg-zinc-900/30 p-8 flex flex-col items-center justify-center text-center rounded-lg">
                  <span className="text-5xl font-sans font-black text-white mb-2">3×</span>
                  <span className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase">{lang === 'EN' ? 'MORE REACH' : 'ΠΕΡΙΣΣΟΤΕΡΗ ΑΠΗΧΗΣΗ'}</span>
                </div>
                <div className="border border-zinc-800 bg-zinc-900/30 p-8 flex flex-col items-center justify-center text-center rounded-lg">
                  <span className="text-5xl font-sans font-black text-white mb-2">10</span>
                  <span className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase">{lang === 'EN' ? 'VIDEOS DELIVERED' : 'ΒΙΝΤΕΟ ΣΥΝΟΛΙΚΑ'}</span>
                </div>
                <div className="border border-zinc-800 bg-[#0055FF]/10 p-8 flex flex-col items-center justify-center text-center rounded-lg">
                  <span className="text-4xl font-serif text-[#0055FF] mb-2">AI</span>
                  <span className="text-[10px] text-[#0055FF] font-bold tracking-[0.2em] uppercase">{lang === 'EN' ? 'ENHANCED' : 'ΕΝΙΣΧΥΜΕΝΟ'}</span>
                </div>
                <div className="border border-zinc-800 bg-zinc-900/30 p-8 flex flex-col items-center justify-center text-center rounded-lg">
                  <span className="text-4xl font-sans font-black text-white mb-2">€50</span>
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

      {/* PILLAR 3: AI LEARNING ATELIER */}
      <section id="education" className="py-32 px-6 relative z-10 bg-zinc-950/40 backdrop-blur-md border-b border-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[#0055FF] font-bold tracking-widest text-[10px] uppercase mb-2">PILLAR 03 • EDUCATION</p>
            <h3 className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-white drop-shadow-xl">{lang === 'EN' ? 'AI LEARNING' : 'AI LEARNING'} <span className="font-serif italic font-light text-[#0055FF]">{lang === 'EN' ? 'Atelier.' : 'Atelier.'}</span></h3>
            <p className="text-zinc-400 text-lg mt-6 max-w-2xl font-light">
              {lang === 'EN' ? 'Master the tools shaping the future of visual content. A private, hands-on program teaching you to create professional-grade AI videos and images from zero to mastery.' : 'Μάθετε τα εργαλεία του μέλλοντος. Ένα ιδιωτικό, πρακτικό πρόγραμμα που σας μαθαίνει να δημιουργείτε επαγγελματικά AI βίντεο από το μηδέν.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 border-y border-zinc-800 bg-black py-8 px-4 mb-16">
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
            <div className="lg:col-span-4 space-y-8">
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

            <div className="lg:col-span-8 flex flex-col justify-between">
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="text-4xl font-serif text-zinc-700 italic">01</div>
                  <div>
                    <h4 className="text-lg font-bold tracking-widest uppercase text-white mb-2">{lang === 'EN' ? 'AI IMAGE MASTERY' : 'MASTERY ΕΙΚΟΝΑΣ AI'}</h4>
                    <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{lang === 'EN' ? 'Learn to prompt, generate, edit, and stylise images with professional precision. From product shots to cinematic stills.' : 'Μάθετε να δημιουργείτε και να επεξεργάζεστε εικόνες με επαγγελματική ακρίβεια.'}</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="text-4xl font-serif text-zinc-700 italic">02</div>
                  <div>
                    <h4 className="text-lg font-bold tracking-widest uppercase text-white mb-2">{lang === 'EN' ? 'AI VIDEO PRODUCTION' : 'ΠΑΡΑΓΩΓΗ AI VIDEO'}</h4>
                    <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{lang === 'EN' ? 'Generate and recreate video content using text-to-video and image-to-video workflows. Recreate viral formats exactly.' : 'Δημιουργήστε βίντεο χρησιμοποιώντας text-to-video. Αναπαράγετε ακριβώς viral formats.'}</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="text-4xl font-serif text-zinc-700 italic">03</div>
                  <div>
                    <h4 className="text-lg font-bold tracking-widest uppercase text-white mb-2">{lang === 'EN' ? 'FULL WORKFLOW & AUTOMATION' : 'ΠΛΗΡΕΣ WORKFLOW & AUTOMATION'}</h4>
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
                <a href="#the-agora" className="w-full md:w-auto bg-[#0055FF] text-white px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 text-center rounded-sm">
                  {lang === 'EN' ? 'JOIN THE ATELIER' : 'ΣΥΜΜΕΤΟΧΗ ΣΤΟ ATELIER'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION (REORDERED: WEBSITE FIRST, HIGHLIGHTED) */}
      <section id="prices" className="py-32 px-6 relative z-10 bg-[#030303] border-b border-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <p className="text-[#0055FF] font-bold tracking-widest text-[10px] uppercase mb-2">{lang === 'EN' ? 'INVESTMENT' : 'ΕΠΕΝΔΥΣΗ'}</p>
            <h3 className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-white drop-shadow-xl">
              {lang === 'EN' ? 'OUR' : 'ΤΑ'} <span className="font-serif italic font-light text-[#0055FF]">{lang === 'EN' ? 'Prices.' : 'Πακέτα.'}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* 1. Website (HIGHLIGHTED) */}
            <div className="bg-black border-2 border-[#0055FF] rounded-[2rem] p-10 flex flex-col shadow-[0_0_40px_rgba(0,85,255,0.25)] relative transform md:-translate-y-4 h-full">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0055FF] text-white px-4 py-1 text-[9px] font-black tracking-widest uppercase rounded-sm whitespace-nowrap shadow-[0_0_15px_rgba(0,85,255,0.5)]">
                {lang === 'EN' ? 'MOST POPULAR' : 'ΔΗΜΟΦΙΛΕΣΤΕΡΟ'}
              </div>
              <h4 className="text-2xl font-black mb-2 tracking-tighter uppercase text-white">{lang === 'EN' ? 'Professional Website' : 'Ιστοσελίδα'}</h4>
              <div className="text-[#0055FF] text-4xl font-sans font-black mb-8">€350<span className="text-sm text-zinc-500 font-light block mt-1">{lang === 'EN' ? 'Complete setup included' : 'Πλήρης κατασκευή'}</span></div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-300"><span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF]"></span> {lang === 'EN' ? '1 Year Free Domain & Hosting' : '1 Χρόνος Δωρεάν Hosting'}</li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-300"><span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF]"></span> {lang === 'EN' ? 'Blazing Fast Load Speeds' : 'Αστραπιαία Ταχύτητα'}</li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-300"><span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full shadow-[0_0_10px_#0055FF]"></span> {lang === 'EN' ? 'Integrated Booking System' : 'Σύστημα Κρατήσεων (Booking)'}</li>
              </ul>
              <a href="#the-agora" className="w-full mt-auto text-center bg-[#0055FF] text-white py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(0,85,255,0.4)] rounded-sm">{lang === 'EN' ? 'Get Started' : 'Ξεκινήστε'}</a>
            </div>

            {/* 2. Marketing */}
            <div className="bg-zinc-950/70 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] p-10 flex flex-col hover:border-zinc-600 transition-all duration-500 shadow-2xl relative overflow-hidden h-full">
              <h4 className="text-2xl font-black mb-2 tracking-tighter uppercase text-white">{lang === 'EN' ? 'Marketing' : 'Marketing'}</h4>
              <div className="text-white text-4xl font-sans font-black mb-8">€500<span className="text-sm text-zinc-500 font-light block mt-1">{lang === 'EN' ? 'Per project / month' : 'Ανά project / μήνα'}</span></div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-400"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> {lang === 'EN' ? 'Social Media Strategy' : 'Στρατηγική Social Media'}</li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-400"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> {lang === 'EN' ? 'Content Planning' : 'Σχεδιασμός Περιεχομένου'}</li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-400"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> {lang === 'EN' ? 'Growth Campaigns' : 'Καμπάνιες Ανάπτυξης'}</li>
              </ul>
              <a href="#the-agora" className="w-full mt-auto text-center border border-zinc-700 text-zinc-400 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:border-[#0055FF] hover:text-[#0055FF] transition-all rounded-sm">{lang === 'EN' ? 'Select Plan' : 'Επιλογή'}</a>
            </div>

            {/* 3. AI Learner */}
            <div className="bg-zinc-950/70 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] p-10 flex flex-col hover:border-zinc-600 transition-all duration-500 shadow-2xl relative overflow-hidden h-full">
              <h4 className="text-2xl font-black mb-2 tracking-tighter uppercase text-white">{lang === 'EN' ? 'AI Learner' : 'AI Learner'}</h4>
              <div className="text-white text-4xl font-sans font-black mb-8">€500<span className="text-sm text-zinc-500 font-light block mt-1">{lang === 'EN' ? 'One-time investment' : 'Εφάπαξ επένδυση'}</span></div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-400"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> {lang === 'EN' ? 'Full AI Tool Access' : 'Πλήρης πρόσβαση σε εργαλεία'}</li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-400"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> {lang === 'EN' ? 'Learn Sora, Kling, Hedra' : 'Εκμάθηση Sora, Kling, Hedra'}</li>
                <li className="flex items-center gap-4 text-sm font-medium text-zinc-400"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> {lang === 'EN' ? 'Nano Banana & Seeddream' : 'Nano Banana & Seeddream'}</li>
              </ul>
              <a href="#the-agora" className="w-full mt-auto text-center border border-zinc-700 text-zinc-400 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:border-[#0055FF] hover:text-[#0055FF] transition-all rounded-sm">{lang === 'EN' ? 'Start Learning' : 'Ξεκινήστε'}</a>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-32 px-6 relative z-10 border-t border-zinc-900 bg-zinc-950/30 backdrop-blur-md">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-sm font-mono tracking-[0.3em] text-[#0055FF] uppercase mb-4">FAQ</h2>
            <h3 className="text-4xl md:text-6xl font-serif tracking-tight text-white mb-2">{lang === 'EN' ? 'Frequently Asked' : 'Συχνές'} <span className="italic font-light text-zinc-500">{lang === 'EN' ? 'Questions.' : 'Ερωτήσεις.'}</span></h3>
          </div>
          <div className="space-y-4">
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
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">{lang === 'EN' ? 'The' : 'Η'} <span className="text-[#0055FF] italic font-light">{lang === 'EN' ? 'Agora.' : 'Αγορά.'}</span></h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">{lang === 'EN' ? 'Ready to construct your digital future? Select a service and reach out to the studio.' : 'Είστε έτοιμοι να χτίσετε το ψηφιακό σας μέλλον; Επιλέξτε υπηρεσία και επικοινωνήστε.'}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <div className="bg-zinc-950 border border-zinc-800/80 p-8 lg:p-12 relative shadow-2xl rounded-xl">
              {isSent ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"><div className="w-20 h-20 rounded-full border border-[#0055FF] flex items-center justify-center mb-6 text-[#0055FF] text-4xl shadow-[0_0_30px_rgba(0,85,255,0.2)]">✓</div><h3 className="text-2xl font-serif italic mb-4">{lang === 'EN' ? 'Transmission Successful' : 'Επιτυχής Μετάδοση'}</h3><p className="text-zinc-400 font-light">{lang === 'EN' ? 'Our architects will review your request and make contact shortly.' : 'Οι συνεργάτες μας θα εξετάσουν το αίτημά σας και θα επικοινωνήσουν.'}</p></div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  <div className="flex flex-col gap-2"><label htmlFor="name" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">{lang === 'EN' ? 'Name' : 'Όνομα'}</label><input type="text" id="name" name="name" required className="bg-black border border-zinc-800 px-5 py-4 text-white focus:outline-none focus:border-[#0055FF] focus:bg-zinc-900 transition-all rounded-sm placeholder:opacity-40" placeholder={lang === 'EN' ? 'Your name...' : 'Το όνομά σας...'} /></div>
                  <div className="flex flex-col gap-2"><label htmlFor="email" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">{lang === 'EN' ? 'Email' : 'Email'}</label><input type="email" id="email" name="email" required className="bg-black border border-zinc-800 px-5 py-4 text-white focus:outline-none focus:border-[#0055FF] focus:bg-zinc-900 transition-all rounded-sm placeholder:opacity-40" placeholder="hello@example.com" /></div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="project_type" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">{lang === 'EN' ? 'Service Required' : 'ΕΠΙΛΟΓΗ ΥΠΗΡΕΣΙΑΣ'}</label>
                    <div className="relative">
                        <select id="project_type" name="project_type" className="w-full bg-black border border-zinc-800 px-5 py-4 text-white focus:outline-none focus:border-[#0055FF] focus:bg-zinc-900 transition-all rounded-sm appearance-none cursor-pointer">
                            <option value="website">{lang === 'EN' ? 'Professional Website (€350)' : 'Επαγγελματική Ιστοσελίδα (€350)'}</option>
                            <option value="social">{lang === 'EN' ? 'Social Media / Content Empire' : 'Παραγωγή Content / Social Media'}</option>
                            <option value="education">{lang === 'EN' ? 'AI Learning Atelier (Mentorship)' : 'AI Learning Atelier (Εκπαίδευση)'}</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-5 pointer-events-none text-[#0055FF]"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2"><label htmlFor="message" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">{lang === 'EN' ? 'Project Details' : 'Λεπτομέρειες'}</label><textarea id="message" name="message" required rows={5} className="bg-black border border-zinc-800 px-5 py-4 text-white focus:outline-none focus:border-[#0055FF] focus:bg-zinc-900 transition-all resize-none rounded-sm placeholder:opacity-40" placeholder={lang === 'EN' ? 'Tell us what we are building or learning...' : 'Πείτε μας τι θέλετε να χτίσουμε ή να μάθετε...'}></textarea></div>
                  <button type="submit" disabled={isSubmitting} className="mt-6 bg-[#0055FF] text-white px-8 py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,85,255,0.2)]">{isSubmitting ? (lang === 'EN' ? 'Transmitting...' : 'Αποστολή...') : (lang === 'EN' ? 'Send to Studio' : 'Αποστολή στο Στούντιο')}</button>
                </form>
              )}
            </div>

            <div className="flex flex-col justify-between space-y-8">
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
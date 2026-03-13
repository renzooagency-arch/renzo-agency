"use client";

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
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
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-serif font-bold tracking-widest uppercase flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-all focus:outline-none"
          >
            RENZO <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF] mt-1 group-hover:animate-ping shadow-[0_0_10px_#0055FF]"></span>
          </button>
          
          <div className="hidden md:flex space-x-10 text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">
            {["Services", "Advantages", "The Agora"].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="hover:text-[#0055FF] transition duration-300">
                {link}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/renzoo.agency/" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#0055FF] transition-colors duration-300" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="#the-agora" className="hidden md:block border border-[#0055FF] text-[#0055FF] px-6 py-2.5 text-[10px] font-bold tracking-widest hover:bg-[#0055FF] hover:text-white transition-all duration-300 uppercase">
                Start a Project
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
              Engineered in Hellas. Building globally.
            </span>
          </div>

          <h2 className="text-6xl md:text-[8rem] font-serif leading-[0.95] tracking-tight mb-8 drop-shadow-2xl">
            Architects of <br />
            <span className="font-sans font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white via-[#0055FF] to-[#002266]">
              The Web.
            </span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between w-full border-t border-zinc-700 pt-8 mt-12 relative z-20">
            <p className="text-xl md:text-2xl text-white font-light max-w-lg leading-relaxed drop-shadow-md">
              Renzo Agency crafts high-performance digital infrastructure, merging classical design principles with modern automation.
            </p>
            <div className="flex gap-4">
              <a href="#advantages" className="bg-[#0055FF] text-white px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,85,255,0.5)] hover:scale-105">
                Discover The Edge
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Banner */}
      <div className="w-full overflow-hidden bg-[#0055FF] text-white py-4 transform -rotate-1 scale-105 z-20 relative shadow-[0_0_40px_rgba(0,85,255,0.3)] border-y border-blue-400/30">
        <div className="animate-marquee font-serif italic text-2xl tracking-widest uppercase">
          DIGITAL ODYSSEY • UI/UX DESIGN • AUTOMATION • FRONTEND ENGINEERING • DIGITAL ODYSSEY • UI/UX DESIGN • AUTOMATION • FRONTEND ENGINEERING • 
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 bg-[#030303]/80 backdrop-blur-xl relative z-10 mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center md:text-left border-b border-zinc-800 pb-10">
            <h3 className="text-4xl md:text-5xl font-serif tracking-wide uppercase mb-4">The Pillars</h3>
            <p className="text-[#0055FF] font-mono tracking-widest text-sm uppercase">Foundational systems for modern brands.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-950/70 backdrop-blur-md border border-zinc-800/50 p-12 hover:border-[#0055FF] hover:bg-zinc-900 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0055FF] to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="text-[#0055FF] text-4xl mb-8 font-serif italic">I.</div>
              <h4 className="text-2xl font-bold mb-4 tracking-wider uppercase">Design</h4>
              <p className="text-zinc-400 leading-relaxed font-light">
                Immersive, high-conversion user interfaces structured with the precision of classical architecture.
              </p>
            </div>
            <div className="bg-zinc-950/70 backdrop-blur-md border border-zinc-800/50 p-12 hover:border-[#0055FF] hover:bg-zinc-900 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0055FF] to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="text-[#0055FF] text-4xl mb-8 font-serif italic">II.</div>
              <h4 className="text-2xl font-bold mb-4 tracking-wider uppercase">Automation</h4>
              <p className="text-zinc-400 leading-relaxed font-light">
                Connecting APIs and workflows to build digital systems that operate flawlessly on autopilot.
              </p>
            </div>
            <div className="bg-zinc-950/70 backdrop-blur-md border border-zinc-800/50 p-12 hover:border-[#0055FF] hover:bg-zinc-900 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0055FF] to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="text-[#0055FF] text-4xl mb-8 font-serif italic">III.</div>
              <h4 className="text-2xl font-bold mb-4 tracking-wider uppercase">Engineering</h4>
              <p className="text-zinc-400 leading-relaxed font-light">
                Lightning-fast, highly scalable development using the absolute latest edge network technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Advantage Section */}
      <section id="advantages" className="py-32 px-6 relative z-10 border-t border-zinc-900/50 bg-[#050505]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-8 drop-shadow-xl">
              The <br /><span className="text-[#0055FF] italic font-light">Advantage.</span>
            </h2>
            <p className="text-zinc-300 text-xl font-light leading-relaxed mb-8">
              Stop losing customers to the competition. A modern website is not just a digital flyer; it is the ultimate, high-performance employee.
            </p>
            <div className="space-y-12 mt-12 bg-black/40 p-8 border border-zinc-800/50 rounded-lg">
              <div className="relative pl-8 border-l border-zinc-800">
                <div className="absolute w-3 h-3 bg-[#0055FF] rounded-full -left-[6.5px] top-2 shadow-[0_0_10px_#0055FF]"></div>
                <h4 className="text-2xl font-bold mb-3 tracking-wide uppercase">The Sleepless Agent</h4>
                <p className="text-zinc-400 leading-relaxed font-light">
                  Imagine an employee who perfectly pitches your services, answers questions, and books high-paying clients at 3:00 AM. Your website never sleeps, never takes breaks, and never misses a lead.
                </p>
              </div>
              <div className="relative pl-8 border-l border-zinc-800">
                <div className="absolute w-3 h-3 bg-[#0055FF] rounded-full -left-[6.5px] top-2 shadow-[0_0_10px_#0055FF]"></div>
                <h4 className="text-2xl font-bold mb-3 tracking-wide uppercase">The Frictionless Standard</h4>
                <p className="text-zinc-400 leading-relaxed font-light">
                  Modern consumers demand autonomy. Studies show a massive shift toward businesses that offer instant, frictionless online booking. People prefer tapping a button over making a phone call. We give them exactly what they want.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-square w-full max-w-md mx-auto relative group">
              <div className="absolute inset-0 border-2 border-[#0055FF]/20 rounded-full animate-[spin_20s_linear_infinite] group-hover:border-[#0055FF]/60 transition-colors duration-700"></div>
              <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-8 backdrop-blur-md bg-black/60 rounded-full border border-zinc-800/80 shadow-2xl">
                <span className="text-5xl mb-4 text-[#0055FF]">⚡</span>
                <h5 className="text-3xl font-serif italic mb-2">Always On.</h5>
                <p className="text-zinc-400 font-mono text-[10px] tracking-[0.3em] uppercase">Scale Without Limits</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="the-agora" className="py-32 px-6 relative z-10 border-t border-zinc-900 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">
              The <span className="text-[#0055FF] italic font-light">Agora.</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Ready to construct your digital future? Reach out to our studio in Athens, or drop by our coordinates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-zinc-950 border border-zinc-800/80 p-8 lg:p-12 relative shadow-2xl">
              {isSent ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                  <div className="w-20 h-20 rounded-full border border-[#0055FF] flex items-center justify-center mb-6 text-[#0055FF] text-4xl shadow-[0_0_30px_rgba(0,85,255,0.2)]">✓</div>
                  <h3 className="text-2xl font-serif italic mb-4">Transmission Successful</h3>
                  <p className="text-zinc-400 font-light">Our architects will review your request and make contact shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">Name</label>
                    <input type="text" id="name" required className="bg-black border border-zinc-800 px-5 py-4 text-white focus:outline-none focus:border-[#0055FF] focus:bg-zinc-900 transition-all rounded-sm" placeholder="Your name..." />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">Email</label>
                    <input type="email" id="email" required className="bg-black border border-zinc-800 px-5 py-4 text-white focus:outline-none focus:border-[#0055FF] focus:bg-zinc-900 transition-all rounded-sm" placeholder="hello@example.com" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">Project Details</label>
                    <textarea id="message" required rows={5} className="bg-black border border-zinc-800 px-5 py-4 text-white focus:outline-none focus:border-[#0055FF] focus:bg-zinc-900 transition-all resize-none rounded-sm" placeholder="Tell us what we are building..."></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="mt-6 bg-[#0055FF] text-white px-8 py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,85,255,0.2)]">
                    {isSubmitting ? 'Transmitting...' : 'Send to Studio'}
                  </button>
                </form>
              )}
            </div>

            <div className="flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="inline-block border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 rounded-sm">
                  <span className="text-[10px] font-mono tracking-widest text-[#0055FF] uppercase">Coordinates</span>
                </div>
                <h4 className="text-3xl font-serif text-white leading-snug">
                  Leof. Andrea Papandreou 179<br />
                  <span className="text-zinc-500 font-sans font-light text-xl tracking-wide">Ilion 131 21, Athens, Greece</span>
                </h4>
              </div>

              <div className="w-full h-full min-h-[300px] rounded-sm overflow-hidden border border-zinc-800 grayscale hover:grayscale-0 transition-all duration-700 shadow-[0_0_30px_rgba(0,85,255,0.1)] relative group">
                <div className="absolute inset-0 bg-[#0055FF]/10 pointer-events-none group-hover:bg-transparent transition duration-700 z-10"></div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.541312384976!2d23.693246712347644!3d38.0112461718041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1a3297a783789%3A0xc47e30777e0344f6!2sLeof.%20Andrea%20Papandreou%20179%2C%20Ilion%20131%2021!5e0!3m2!1sen!2sgr!4v1709400000000!5m2!1sen!2sgr"
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
          © {new Date().getFullYear()} RENZO AGENCY. DIGITAL INFRASTRUCTURE.
        </p>
      </footer>
    </main>
  );
}
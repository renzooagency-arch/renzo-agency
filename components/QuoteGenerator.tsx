"use client";

import React, { useState } from 'react';

interface QuoteGeneratorProps {
  lang: 'EN' | 'GR';
}

type ServiceType = 'landing_page' | 'eshop' | 'social' | 'education' | null;

export default function QuoteGenerator({ lang }: QuoteGeneratorProps) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceType>(null);
  const [businessType, setBusinessType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gdpr, setGdpr] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const businessTypes = lang === 'EN' 
    ? ['Beauty Salon', 'Barbershop', 'Real Estate', 'Restaurant/Cafe', 'Gym/Fitness', 'Other']
    : ['Κέντρο Ομορφιάς', 'Κουρείο', 'Real Estate / Μεσιτικό', 'Εστιατόριο / Καφέ', 'Γυμναστήριο', 'Άλλο'];

  const handleServiceSelect = (selected: ServiceType) => {
    setService(selected);
    if (selected === 'eshop' || selected === 'education') {
      setStep(3);
    } else {
      setStep(2);
    }
  };

  const handleBusinessSelect = (type: string) => {
    if (type === 'Other' || type === 'Άλλο') {
      setBusinessType('');
      document.getElementById('business-input')?.focus();
      return;
    }
    setBusinessType(type);
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const data = {
      name,
      email,
      phone,
      project_type: service,
      message: `Business Type: ${businessType}`,
      honeypot,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) { 
        setIsSent(true); 
        setStep(4);
      } else { 
        alert("Transmission failed. Please try again."); 
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEstimate = () => {
    if (service === 'landing_page') return '€350 - €500';
    if (service === 'eshop') return '€500+';
    if (service === 'social') return lang === 'EN' ? 'Custom Quote' : 'Εξατομικευμένη Προσφορά';
    if (service === 'education') return lang === 'EN' ? 'Custom Quote' : 'Εξατομικευμένη Προσφορά';
    return '';
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800/80 p-8 lg:p-12 relative shadow-2xl rounded-xl">
      {/* Step Indicator */}
      {step < 4 && (
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-[#0055FF]' : 'bg-zinc-800'}`} />
          ))}
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <div className="animate-fade-up">
          <h3 className="text-2xl font-serif text-white mb-6">
            {lang === 'EN' ? 'What do you need?' : 'Τι ακριβώς χρειάζεστε;'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={() => handleServiceSelect('landing_page')} className="text-left p-6 border border-zinc-800 hover:border-[#0055FF] bg-black hover:bg-[#0055FF]/10 transition-all rounded-sm group">
              <h4 className="text-white font-bold tracking-widest text-[10px] uppercase mb-2 group-hover:text-[#0055FF]">{lang === 'EN' ? 'Landing Page / Website' : 'Landing Page / Ιστοσελίδα'}</h4>
              <p className="text-zinc-500 text-sm">{lang === 'EN' ? 'A stunning landing page to establish your digital presence.' : 'Μια εντυπωσιακή landing page για την ψηφιακή σας παρουσία.'}</p>
            </button>
            <button onClick={() => handleServiceSelect('eshop')} className="text-left p-6 border border-zinc-800 hover:border-[#0055FF] bg-black hover:bg-[#0055FF]/10 transition-all rounded-sm group">
              <h4 className="text-white font-bold tracking-widest text-[10px] uppercase mb-2 group-hover:text-[#0055FF]">{lang === 'EN' ? 'E-Shop / E-Commerce' : 'Ηλεκτρονικό Κατάστημα (E-Shop)'}</h4>
              <p className="text-zinc-500 text-sm">{lang === 'EN' ? 'Advanced e-commerce architecture for maximum sales.' : 'Προηγμένη e-commerce αρχιτεκτονική για μέγιστες πωλήσεις.'}</p>
            </button>
            <button onClick={() => handleServiceSelect('social')} className="text-left p-6 border border-zinc-800 hover:border-[#0055FF] bg-black hover:bg-[#0055FF]/10 transition-all rounded-sm group">
              <h4 className="text-white font-bold tracking-widest text-[10px] uppercase mb-2 group-hover:text-[#0055FF]">{lang === 'EN' ? 'Social Media / Content' : 'Παραγωγή Content'}</h4>
              <p className="text-zinc-500 text-sm">{lang === 'EN' ? 'AI-driven content empire to scale your brand organically.' : 'Περιεχόμενο με βάση το AI για οργανική ανάπτυξη.'}</p>
            </button>
            <button onClick={() => handleServiceSelect('education')} className="text-left p-6 border border-zinc-800 hover:border-[#0055FF] bg-black hover:bg-[#0055FF]/10 transition-all rounded-sm group">
              <h4 className="text-white font-bold tracking-widest text-[10px] uppercase mb-2 group-hover:text-[#0055FF]">{lang === 'EN' ? 'AI Learning Mentorship' : 'AI Learning Atelier'}</h4>
              <p className="text-zinc-500 text-sm">{lang === 'EN' ? '1-on-1 private training on industry-leading AI tools.' : '1-προς-1 ιδιωτική εκπαίδευση σε κορυφαία AI εργαλεία.'}</p>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="animate-fade-up">
          <button onClick={() => setStep(1)} className="text-zinc-500 text-xs mb-4 hover:text-white flex items-center gap-1">
            ← {lang === 'EN' ? 'Back' : 'Πίσω'}
          </button>
          <h3 className="text-2xl font-serif text-white mb-6">
            {lang === 'EN' ? 'What type of business do you own?' : 'Τι είδους επιχείρηση έχετε;'}
          </h3>
          <div className="flex flex-wrap gap-3 mb-6">
            {businessTypes.map((type, idx) => (
              <button 
                key={idx} 
                onClick={() => handleBusinessSelect(type)}
                className="border border-zinc-700 bg-zinc-900 text-zinc-300 px-4 py-2 text-sm rounded-full hover:border-[#0055FF] hover:text-white hover:bg-[#0055FF]/20 transition-all"
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input 
              id="business-input"
              type="text" 
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              placeholder={lang === 'EN' ? 'Type your business here...' : 'Πληκτρολογήστε εδώ...'} 
              className="flex-1 bg-transparent border-b-2 border-zinc-800 px-2 py-3 text-white focus:outline-none focus:border-[#0055FF] transition-colors rounded-none placeholder:opacity-30"
              onKeyDown={(e) => e.key === 'Enter' && businessType && setStep(3)}
            />
            <button 
              onClick={() => businessType && setStep(3)}
              disabled={!businessType}
              className="bg-[#0055FF] text-white px-6 py-3 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
            >
              {lang === 'EN' ? 'Next' : 'Επόμενο'}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="animate-fade-up">
          <button onClick={() => setStep((service === 'eshop' || service === 'education') ? 1 : 2)} className="text-zinc-500 text-xs mb-4 hover:text-white flex items-center gap-1">
            ← {lang === 'EN' ? 'Back' : 'Πίσω'}
          </button>
          <h3 className="text-2xl font-serif text-white mb-6">
            {lang === 'EN' ? 'Where should we send the quote?' : 'Πού να στείλουμε την προσφορά;'}
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">{lang === 'EN' ? 'Name' : 'Όνομα'}</label>
              <input type="text" id="name" required value={name} onChange={(e) => setName(e.target.value)} className="bg-transparent border-b-2 border-zinc-800 px-2 py-3 text-white focus:outline-none focus:border-[#0055FF] transition-colors rounded-none placeholder:opacity-30" placeholder={lang === 'EN' ? 'Your name...' : 'Το όνομά σας...'} />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">{lang === 'EN' ? 'Email' : 'Email'}</label>
              <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent border-b-2 border-zinc-800 px-2 py-3 text-white focus:outline-none focus:border-[#0055FF] transition-colors rounded-none placeholder:opacity-30" placeholder="hello@example.com" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-[10px] font-bold tracking-[0.2em] text-[#0055FF] uppercase">{lang === 'EN' ? 'Phone Number' : 'Τηλέφωνο'}</label>
              <input type="tel" id="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-transparent border-b-2 border-zinc-800 px-2 py-3 text-white focus:outline-none focus:border-[#0055FF] transition-colors rounded-none placeholder:opacity-30" placeholder="+30 690 000 0000" />
            </div>

            <div className="flex items-start gap-3 mt-2 mb-2">
              <input type="checkbox" id="gdpr" required checked={gdpr} onChange={(e) => setGdpr(e.target.checked)} className="mt-1 cursor-pointer accent-[#0055FF]" />
              <label htmlFor="gdpr" className="text-[10px] font-light tracking-wide text-zinc-400 leading-relaxed">
                {lang === 'EN' 
                  ? <>I agree to the <a href="/privacy" className="text-[#0055FF] hover:underline" target="_blank">Privacy Policy</a> and consent to Renzo storing my data.</>
                  : <>Συμφωνώ με την <a href="/privacy" className="text-[#0055FF] hover:underline" target="_blank">Πολιτική Απορρήτου</a> και συναινώ στην αποθήκευση δεδομένων.</>}
              </label>
            </div>

            <button type="submit" disabled={isSubmitting} className="mt-2 bg-[#0055FF] text-white px-8 py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 shadow-[0_0_20px_rgba(0,85,255,0.2)]">
              {isSubmitting ? (lang === 'EN' ? 'Generating Quote...' : 'Δημιουργία...') : (lang === 'EN' ? 'Get Instant Quote' : 'Λήψη Προσφοράς')}
            </button>
          </form>
        </div>
      )}

      {/* STEP 4: SUCCESS / QUOTE */}
      {step === 4 && (
        <div className="animate-fade-up flex flex-col items-center justify-center text-center py-8">
          <div className="w-20 h-20 rounded-full border border-[#0055FF] flex items-center justify-center mb-6 text-[#0055FF] text-4xl shadow-[0_0_30px_rgba(0,85,255,0.2)]">
            ✓
          </div>
          <h3 className="text-2xl font-serif text-white mb-2">
            {lang === 'EN' ? 'Your Estimate Is Ready' : 'Η Εκτίμηση Είναι Έτοιμη'}
          </h3>
          <div className="bg-black border border-zinc-800 rounded-lg px-8 py-6 my-6 w-full max-w-sm">
            <p className="text-zinc-500 text-[10px] tracking-widest uppercase mb-2">
              {lang === 'EN' ? 'Estimated Investment' : 'Εκτιμώμενη Επένδυση'}
            </p>
            <p className="text-4xl font-serif text-[#0055FF]">{getEstimate()}</p>
          </div>
          <p className="text-zinc-400 font-light mb-8 max-w-md">
            {lang === 'EN' 
              ? 'Transmission successful. Our architects will review your request and call you in the next few hours to discuss the details.' 
              : 'Επιτυχής μετάδοση. Οι συνεργάτες μας θα σας καλέσουν τις επόμενες ώρες για να συζητήσουμε τις λεπτομέρειες.'}
          </p>
          <button onClick={() => setStep(1)} className="text-zinc-500 text-sm hover:text-white underline">
            {lang === 'EN' ? 'Start a new quote' : 'Νέα προσφορά'}
          </button>
        </div>
      )}
    </div>
  );
}

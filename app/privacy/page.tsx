"use client";

import React, { useState } from 'react';

export default function PrivacyPolicy() {
  const [lang, setLang] = useState<'EN' | 'GR'>('GR');

  return (
    <main className="font-sans antialiased bg-[#030303] text-[#FAFAFA] min-h-screen selection:bg-[#0055FF] selection:text-white px-6 py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        
        <div className="flex justify-between items-center mb-16 border-b border-zinc-900 pb-8">
          <a href="/" className="text-xl font-serif font-bold tracking-widest uppercase flex items-center gap-2 group hover:opacity-80 transition-all">
            ← RENZO
          </a>
          <div className="flex bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden text-[10px] font-bold tracking-widest uppercase">
            <button onClick={() => setLang('EN')} className={`px-3 py-2 transition-all ${lang === 'EN' ? 'bg-[#0055FF] text-white' : 'text-zinc-500 hover:text-white'}`}>EN</button>
            <button onClick={() => setLang('GR')} className={`px-3 py-2 transition-all ${lang === 'GR' ? 'bg-[#0055FF] text-white' : 'text-zinc-500 hover:text-white'}`}>GR</button>
          </div>
        </div>

        {lang === 'EN' ? (
          <div className="space-y-8 text-zinc-400 leading-relaxed font-light">
            <h1 className="text-4xl font-serif text-white mb-8 tracking-tight">Privacy Policy</h1>
            <p className="text-xs uppercase tracking-widest text-[#0055FF] font-bold">Last Updated: {new Date().toLocaleDateString('en-US')}</p>
            
            <h2 className="text-xl font-serif text-white mt-12 mb-4">1. What data we collect</h2>
            <p>When you use our contact form ("The Agora"), we collect your Name, Email, Phone Number, and Project Details.</p>

            <h2 className="text-xl font-serif text-white mt-8 mb-4">2. Why we collect it</h2>
            <p>We use this information strictly to respond to your inquiry, discuss your digital infrastructure needs, and provide pricing estimates.</p>

            <h2 className="text-xl font-serif text-white mt-8 mb-4">3. How we protect your data</h2>
            <p>Your data is securely transmitted and stored in our locked database (Google Firebase). We use advanced security rules to ensure that only authorized Renzo administrators can access this information.</p>

            <h2 className="text-xl font-serif text-white mt-8 mb-4">4. Sharing your data</h2>
            <p>We do not sell, rent, or share your personal information with any third parties or marketing agencies.</p>

            <h2 className="text-xl font-serif text-white mt-8 mb-4">5. Your rights</h2>
            <p>Under GDPR, you have the right to request access to the data we have about you, or request that we delete it completely. To do so, simply contact us through our website.</p>
          </div>
        ) : (
          <div className="space-y-8 text-zinc-400 leading-relaxed font-light">
            <h1 className="text-4xl font-serif text-white mb-8 tracking-tight">Πολιτική Απορρήτου</h1>
            <p className="text-xs uppercase tracking-widest text-[#0055FF] font-bold">Τελευταία Ενημέρωση: {new Date().toLocaleDateString('el-GR')}</p>
            
            <h2 className="text-xl font-serif text-white mt-12 mb-4">1. Ποια δεδομένα συλλέγουμε</h2>
            <p>Όταν χρησιμοποιείτε τη φόρμα επικοινωνίας μας ("The Agora"), συλλέγουμε το Όνομα, το Email, το Τηλέφωνο και τις Λεπτομέρειες του project σας.</p>

            <h2 className="text-xl font-serif text-white mt-8 mb-4">2. Γιατί τα συλλέγουμε</h2>
            <p>Χρησιμοποιούμε αυτές τις πληροφορίες αποκλειστικά για να απαντήσουμε στο αίτημά σας, να συζητήσουμε τις ανάγκες της ψηφιακής σας υποδομής και να σας παρέχουμε μια εκτίμηση κόστους.</p>

            <h2 className="text-xl font-serif text-white mt-8 mb-4">3. Πώς προστατεύουμε τα δεδομένα σας</h2>
            <p>Τα δεδομένα σας μεταδίδονται και αποθηκεύονται με απόλυτη ασφάλεια στην κλειδωμένη βάση δεδομένων μας (Google Firebase). Χρησιμοποιούμε αυστηρούς κανόνες ασφαλείας ώστε μόνο οι εξουσιοδοτημένοι διαχειριστές της Renzo να έχουν πρόσβαση.</p>

            <h2 className="text-xl font-serif text-white mt-8 mb-4">4. Κοινοποίηση δεδομένων</h2>
            <p>Δεν πουλάμε, δεν νοικιάζουμε και δεν μοιραζόμαστε τα προσωπικά σας στοιχεία με τρίτους ή διαφημιστικές εταιρείες.</p>

            <h2 className="text-xl font-serif text-white mt-8 mb-4">5. Τα δικαιώματά σας</h2>
            <p>Σύμφωνα με τον κανονισμό GDPR, έχετε το δικαίωμα να ζητήσετε πρόσβαση στα δεδομένα που διατηρούμε για εσάς, ή να ζητήσετε την πλήρη διαγραφή τους. Για να το κάνετε αυτό, απλώς επικοινωνήστε μαζί μας μέσω της ιστοσελίδας μας.</p>
          </div>
        )}
      </div>
    </main>
  );
}
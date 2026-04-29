import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar, Hero } from './components/Core';
import { BraiderCard, CategoryCard } from './components/Cards';
import { MapOverlay } from './components/MapOverlay';
import { BRAIDING_STYLES, MOCK_BRAIDERS } from './constants';
import { Filter, X } from 'lucide-react';

export default function App() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <main className="relative min-h-screen selection:bg-luxury-gold selection:text-luxury-onyx overflow-x-hidden">
      <div className="mesh-bg" />
      
      <Navbar />
      
      <div className="relative pt-10">
        <Hero onOpenMap={() => setIsMapOpen(true)} />

        {/* Styles Circle Navigation */}
        <section className="px-6 md:px-12 py-20 lg:py-32 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="grid grid-cols-12 gap-8 mb-32"
            >
              <div className="col-span-12 lg:col-span-4 mb-12 lg:mb-0">
                <h2 className="font-display text-[10px] uppercase tracking-[0.4em] mb-6 text-luxury-gold">Our Techniques</h2>
                <p className="text-3xl font-extralight tracking-tight max-w-sm">Architectural precision meets cultural heritage.</p>
              </div>
              <div className="col-span-12 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8">
                {BRAIDING_STYLES.map((style) => (
                  <div key={style.id} className="flex flex-col items-center gap-4">
                    <CategoryCard category={style} />
                    <span className="font-sans text-[10px] md:text-[11px] tracking-wide opacity-50 font-medium">{style.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Artisans Grid */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tighter mb-2">The artisans</h2>
                <p className="font-sans text-[12px] opacity-40 font-medium italic capitalize md:normal-case">Elite practitioners across the European capitals</p>
              </div>
              
              <div className="flex gap-4 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-3 border border-white/10 px-8 py-3 rounded-full font-sans text-[11px] tracking-wider hover:border-luxury-gold transition-colors duration-500 font-medium glass">
                  <Filter size={12} /> Filter selection
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {MOCK_BRAIDERS.map((braider) => (
                <BraiderCard key={braider.id} braider={braider} />
              ))}
            </div>
          </div>
        </section>

        {/* Membership Section */}
        <section className="px-12 py-32 bg-black/20 border-t border-white/5">
           <div className="max-w-7xl mx-auto grid grid-cols-12 gap-12 items-center">
              <div className="col-span-12 lg:col-span-6">
                 <h2 className="font-display text-5xl uppercase tracking-tighter mb-8 italic opacity-80">Reserved for the <br /> Connoisseur.</h2>
                 <p className="text-[17px] font-medium text-neutral-300 mb-12 leading-relaxed max-w-md">
                    Join an exclusive circle of clients and artisans. Access priority bookings, private sessions, and bespoke hair design consultations.
                 </p>
                 <button className="glass py-5 px-12 text-[11px] uppercase tracking-[0.5em] hover:bg-luxury-silk hover:text-luxury-onyx transition-all duration-700 font-bold">
                    Apply for Membership
                 </button>
              </div>
              <div className="col-span-12 lg:col-span-6 flex justify-end gap-16">
                 <div className="flex flex-col items-end">
                    <span className="text-[9px] uppercase tracking-widest opacity-40 mb-1 font-secondary">Active Members</span>
                    <span className="text-4xl font-extralight tracking-tighter">1,240</span>
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[9px] uppercase tracking-widest opacity-40 mb-1 font-secondary">Verified Artisans</span>
                    <span className="text-4xl font-extralight tracking-tighter">88</span>
                 </div>
              </div>
           </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-32 px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
            <div className="flex flex-col">
              <span className="font-display uppercase text-3xl tracking-[0.8em] font-extralight text-white">KOUVIA</span>
              <span className="font-secondary uppercase text-[10px] tracking-[0.4em] opacity-20 mt-2">by Ebys Place</span>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24">
              <div>
                <h4 className="font-display text-[9px] uppercase tracking-[0.3em] mb-8 text-luxury-gold opacity-80 font-bold">Maison</h4>
                <ul className="space-y-4 font-sans text-[11px] opacity-40 font-medium">
                  <li><a href="#" className="hover:opacity-100 transition-opacity">Our Story</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-opacity">Ethics</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-opacity">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-[9px] uppercase tracking-[0.3em] mb-8 text-luxury-gold opacity-80 font-bold">Clientèle</h4>
                <ul className="space-y-4 font-sans text-[11px] opacity-40 font-medium">
                  <li><a href="#" className="hover:opacity-100 transition-opacity">Artisans</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-opacity">Search</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-opacity">Gift</a></li>
                </ul>
              </div>
              <div className="col-span-2 lg:col-span-1 hidden lg:block">
                 <p className="font-sans text-[11px] opacity-30 leading-relaxed text-right font-medium">
                    Kouvia is the bridge between cultural artistry and modern luxury. Serving London, Paris, and Milan.
                 </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 gap-6">
            <div className="opacity-20 font-sans text-[10px] font-medium tracking-wide">
              © 2026 Kouvia Maison • Refined Braiding
            </div>
            <div className="flex gap-8 opacity-40 font-sans text-[10px] font-medium tracking-wide">
              <a href="#" className="hover:text-luxury-gold transition-colors">Privacy</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      <MapOverlay isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
    </main>
  );
}


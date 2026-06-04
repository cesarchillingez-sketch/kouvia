import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar, Hero } from './components/Core';
import { BraiderCard, CategoryCard } from './components/Cards';
import { MapOverlay } from './components/MapOverlay';
import { Dashboards } from './components/Dashboards';
import { BRAIDING_STYLES, MOCK_BRAIDERS } from './constants';
import { Filter, X, Check, MapPin, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Braider } from './types';

export default function App() {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'braider' | 'client' | null>(null);
  
  // Real-time roster management starting with our pristine mock artisans list
  const [braidersList, setBraidersList] = useState<Braider[]>(MOCK_BRAIDERS);
  
  // Filters state
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedStyle, setSelectedStyle] = useState<string>('All');

  // Callback to add a braider from admin workflow
  const handleAddBraider = (newBraider: Braider) => {
    setBraidersList(prev => [newBraider, ...prev]);
  };

  // Callback to remove a braider from admin workflow
  const handleRemoveBraider = (id: string) => {
    setBraidersList(prev => prev.filter(b => b.id !== id));
  };

  // Apply filters to list
  const filteredBraiders = braidersList.filter(braider => {
    const matchesLocation = selectedLocation === 'All' || braider.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesStyle = selectedStyle === 'All' || braider.styles.some(s => s.toLowerCase().includes(selectedStyle.toLowerCase()));
    return matchesLocation && matchesStyle;
  });

  return (
    <main className="relative min-h-screen selection:bg-luxury-gold selection:text-luxury-onyx overflow-x-hidden pb-12">
      <div className="mesh-bg" />
      
      {/* High-fidelity Navbar */}
      <Navbar 
        onOpenSignIn={() => setIsSignInOpen(true)} 
        userRole={userRole} 
        onLogout={() => setUserRole(null)} 
      />
      
      <div className="relative pt-10">
        <Hero onOpenMap={() => setIsMapOpen(true)} />

        {/* Styles/Techniques Section with proper Anchor */}
        <section id="techniques" className="px-6 md:px-12 py-20 lg:py-32 border-t border-white/5 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="grid grid-cols-12 gap-8 mb-32"
            >
              <div className="col-span-12 lg:col-span-4 mb-12 lg:mb-0">
                <span className="font-secondary text-[10px] uppercase tracking-[0.4em] mb-4 text-luxury-gold block font-bold">Featured Portfolios</span>
                <h2 className="font-display text-[10px] uppercase tracking-[0.4em] mb-6 text-luxury-gold">Our Techniques</h2>
                <p className="text-3xl font-extralight tracking-tight max-w-sm">Architectural precision meets cultural heritage.</p>
              </div>
              <div className="col-span-12 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8">
                {BRAIDING_STYLES.map((style) => (
                  <div key={style.id} className="flex flex-col items-center gap-4 text-center">
                    <CategoryCard category={style} />
                    <span className="font-sans text-[10px] md:text-[11px] tracking-wide opacity-70 font-bold">{style.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Artisans Grid Headings & Advanced Filtering Section */}
            <div id="artisans" className="scroll-mt-28 mb-16">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-6">
                <div>
                  <span className="font-secondary text-[10px] uppercase tracking-[0.4em] mb-2 text-luxury-gold block font-bold">Roster directory</span>
                  <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tighter mb-2">The artisans</h2>
                  <p className="font-sans text-[12px] opacity-40 font-medium italic capitalize md:normal-case">Elite practitioners across the European capitals</p>
                </div>
                
                <div className="flex gap-4 w-full md:w-auto">
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex-1 md:flex-none flex items-center justify-center gap-3 border px-8 py-3.5 rounded-full font-sans text-[11px] tracking-wider transition-colors duration-500 font-bold glass cursor-pointer ${showFilters ? 'border-luxury-gold text-luxury-gold bg-luxury-gold/5' : 'border-white/10 hover:border-luxury-gold'}`}
                  >
                    <SlidersHorizontal size={12} /> Filter selection
                  </button>
                </div>
              </div>

              {/* Advanced Filter Expansion Dock */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden bg-white/[0.02] border border-white/5 rounded-2xl p-6 mb-12 glass flex flex-col md:flex-row gap-8 justify-between"
                  >
                    {/* Location filters */}
                    <div className="flex-1 space-y-3">
                      <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold block">Region Search</span>
                      <div className="flex flex-wrap gap-2">
                        {['All', 'Paris', 'London', 'Milan'].map(loc => (
                          <button 
                            key={loc}
                            onClick={() => setSelectedLocation(loc)}
                            className={`px-4 py-2 text-[10px] uppercase tracking-wider font-bold rounded-lg transition-all cursor-pointer ${selectedLocation === loc ? 'bg-luxury-gold text-luxury-onyx' : 'bg-white/5 hover:bg-white/10 text-white'}`}
                          >
                            {loc === 'All' ? 'All Capitols' : loc}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Technique filtration */}
                    <div className="flex-1 space-y-3">
                      <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold block">Technique Filter</span>
                      <div className="flex flex-wrap gap-2">
                        {['All', 'Goddess Braids', 'Boho Braids', 'Cornrows', 'Knotless'].map(style => (
                          <button 
                            key={style}
                            onClick={() => setSelectedStyle(style)}
                            className={`px-4 py-2 text-[10px] uppercase tracking-wider font-bold rounded-lg transition-all cursor-pointer ${selectedStyle === style ? 'bg-luxury-gold text-luxury-onyx' : 'bg-white/5 hover:bg-white/10 text-white'}`}
                          >
                            {style === 'All' ? 'All Techniques' : style}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Artisans Grid container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredBraiders.map((braider) => (
                <BraiderCard key={braider.id} braider={braider} />
              ))}
              {filteredBraiders.length === 0 && (
                <div className="col-span-12 py-24 text-center glass border border-white/5 rounded-3xl">
                  <p className="text-sm opacity-55 font-medium mb-2">No master artisans match current filter selection.</p>
                  <button 
                    onClick={() => {
                      setSelectedLocation('All');
                      setSelectedStyle('All');
                    }}
                    className="text-[10px] uppercase tracking-widest text-luxury-gold border-b border-luxury-gold/20 pb-0.5 hover:border-luxury-gold font-bold transition-all"
                  >
                    Reset Active Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Membership Section with proper Anchor */}
        <section id="membership" className="px-6 md:px-12 py-20 lg:py-32 bg-black/20 border-t border-white/5 scroll-mt-24">
           <div className="max-w-7xl mx-auto grid grid-cols-12 gap-12 items-center">
              <div className="col-span-12 lg:col-span-6">
                 <h2 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter mb-8 italic opacity-85 text-white leading-tight">Reserved for the <br /> Connoisseur.</h2>
                 <p className="text-[16px] md:text-[17px] font-medium text-neutral-300 mb-12 leading-relaxed max-w-md">
                    Join an exclusive circle of clients and artisans. Access priority bookings, private sessions, and bespoke hair design consultations.
                 </p>
                 <button className="glass py-5 px-12 text-[11px] uppercase tracking-[0.5em] hover:bg-luxury-silk hover:text-luxury-onyx transition-all duration-700 font-bold cursor-pointer w-full sm:w-auto text-center">
                    Apply for Membership
                 </button>
              </div>
              <div className="col-span-12 lg:col-span-6 flex justify-start lg:justify-end gap-12 lg:gap-16 pt-8 lg:pt-0">
                 <div className="flex flex-col items-start lg:items-end">
                    <span className="text-[9px] uppercase tracking-widest opacity-40 mb-1 font-secondary">Active Members</span>
                    <span className="text-3xl md:text-4xl font-extralight tracking-tighter text-white">1,240</span>
                 </div>
                 <div className="flex flex-col items-start lg:items-end">
                    <span className="text-[9px] uppercase tracking-widest opacity-40 mb-1 font-secondary">Verified Artisans</span>
                    <span className="text-3xl md:text-4xl font-extralight tracking-tighter text-white">{braidersList.length}</span>
                 </div>
              </div>
           </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-24 md:py-32 px-6 md:px-12">
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

      {/* Popups & Drawer Overlay Managers */}
      <MapOverlay isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
      
      <AnimatePresence>
        {isSignInOpen && (
          <Dashboards 
            braiders={braidersList}
            onAddBraider={handleAddBraider}
            onRemoveBraider={handleRemoveBraider}
            userRole={userRole}
            onSetUserRole={setUserRole}
            onClose={() => setIsSignInOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Calendar, ArrowRight, X, Navigation, Menu, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  onOpenSignIn: () => void;
  userRole: 'admin' | 'braider' | 'client' | null;
  onLogout: () => void;
}

export const Navbar = ({ onOpenSignIn, userRole, onLogout }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={cn(
        "fixed top-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500",
        scrolled ? "nav-glass py-4 shadow-xl" : "bg-transparent py-8 md:py-10"
      )}>
        {/* Logo and signature */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="font-display uppercase text-xl md:text-2xl tracking-logo font-extralight text-white">
            KOUV<span className="accent-i text-luxury-gold">I</span>A
          </span>
          <span className="font-secondary text-white uppercase text-[8px] md:text-[9px] tracking-[0.3em] opacity-50 mt-1 font-medium text-left">
            by Ebys Place
          </span>
        </motion.div>
        
        {/* Desktop Navigation Link Cluster */}
        <motion.nav 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="hidden lg:flex items-center gap-10 font-secondary uppercase text-[10px] tracking-[0.3em] font-medium"
        >
          <a href="#artisans" className="hover:text-luxury-gold transition-colors duration-300">Artisans</a>
          <a href="#techniques" className="hover:text-luxury-gold transition-colors duration-300">Techniques</a>
          <a href="#membership" className="hover:text-luxury-gold transition-colors duration-300">Membership</a>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2 text-luxury-silk/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] lowercase tracking-normal">Direct Connection Live</span>
          </div>
        </motion.nav>

        {/* Action Button cluster */}
        <div className="hidden lg:flex items-center gap-4">
          {userRole ? (
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest bg-luxury-gold/15 border border-luxury-gold/35 text-luxury-gold px-4 py-2 rounded-full font-bold flex items-center gap-1.5">
                <ShieldCheck size={12} /> {userRole}
              </span>
              <button 
                onClick={onOpenSignIn}
                className="bg-white/5 border border-white/10 text-white rounded-full px-5 py-2 hover:bg-white/10 text-[10px] uppercase font-bold tracking-widest transition-all"
              >
                Dashboard
              </button>
              <button 
                onClick={onLogout}
                className="text-red-400 hover:text-white text-[10px] uppercase font-bold tracking-widest transition-colors py-2 px-3"
              >
                Log Out
              </button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={onOpenSignIn}
              className="glass px-6 md:px-8 py-3 text-[9px] uppercase tracking-[0.4em] font-secondary hover:bg-luxury-silk hover:text-luxury-onyx transition-all duration-500 font-bold"
            >
              Sign In
            </motion.button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-3">
          {userRole && (
            <span className="text-[9px] uppercase tracking-wider bg-luxury-gold/20 text-luxury-gold px-3 py-1.5 rounded-full font-bold">
              {userRole}
            </span>
          )}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-3 bg-white/5 border border-white/5 text-white hover:bg-white/10 transition-colors rounded-full"
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>

      {/* iOS styled Drawer sliding menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-luxury-onyx/98 backdrop-blur-2xl flex flex-col justify-between p-8"
          >
            {/* Top header on mobile */}
            <div className="flex justify-between items-center border-b border-white/5 pb-6">
              <div className="flex flex-col">
                <span className="font-display uppercase text-lg tracking-logo font-extralight text-white">
                  KOUV<span className="accent-i text-luxury-gold">I</span>A
                </span>
                <span className="font-secondary text-white uppercase text-[8px] tracking-[0.3em] opacity-40 mt-1">
                  by Ebys Place
                </span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Middle body menu links */}
            <div className="flex flex-col gap-8 text-left py-12">
              <a 
                href="#artisans" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-display uppercase text-2xl tracking-[0.1em] hover:text-luxury-gold transition-colors"
              >
                Artisans
              </a>
              <a 
                href="#techniques" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-display uppercase text-2xl tracking-[0.1em] hover:text-luxury-gold transition-colors"
              >
                Techniques
              </a>
              <a 
                href="#membership" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-display uppercase text-2xl tracking-[0.1em] hover:text-luxury-gold transition-colors"
              >
                Membership
              </a>
              <div className="border-t border-white/5 my-4" />
              {userRole ? (
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenSignIn();
                    }}
                    className="w-full bg-luxury-gold text-luxury-onyx font-bold text-xs py-4 rounded-xl uppercase tracking-widest"
                  >
                    Go To {userRole} Dashboard
                  </button>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full text-center text-red-400 font-bold text-xs py-4 hover:bg-red-500/10 rounded-xl transition-colors uppercase tracking-widest"
                  >
                    Log Out Accounts
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSignIn();
                  }}
                  className="w-full bg-luxury-silk text-luxury-onyx font-bold text-xs py-4 rounded-xl uppercase tracking-widest"
                >
                  Sign In to Workspace
                </button>
              )}
            </div>

            {/* Bottom metadata drawer */}
            <div className="border-t border-white/5 pt-6 text-center">
              <p className="text-[10px] opacity-30 tracking-wider uppercase">Authentic Cultural Hair-styling Connect</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Hero = ({ onOpenMap }: { onOpenMap: () => void }) => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-[85vh] flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center pt-32 px-6 md:px-12 overflow-hidden">
      <div className="col-span-12 lg:col-span-5 flex flex-col justify-center lg:pr-8 z-10 text-center lg:text-left mt-8 lg:mt-0">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl lg:text-6.5xl font-sans text-white font-medium leading-[1.15] mb-8 tracking-tight normal-case"
        >
          Redefining the sculptural art of braiding.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[15px] md:text-[16px] font-medium text-neutral-300 mb-12 leading-relaxed max-w-sm mx-auto lg:mx-0"
        >
          Connecting the European elite with the world's most sophisticated architectural hair stylists.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col gap-6 max-w-xs mx-auto lg:mx-0 w-full"
        >
          <div className="flex flex-col">
            <label className="font-secondary text-[8px] uppercase tracking-[0.3em] mb-2 opacity-50 text-left">Location</label>
            <input type="text" placeholder="Paris, France" className="search-input pb-2 text-[15px] font-medium placeholder:opacity-20 text-white" />
          </div>
          <div className="flex flex-col">
            <label className="font-secondary text-[8px] uppercase tracking-[0.3em] mb-2 opacity-50 text-left">Technique</label>
            <input type="text" placeholder="Goddess Braids / Boho Braids" className="search-input pb-2 text-[15px] font-medium placeholder:opacity-20 text-white" />
          </div>
          <button 
            onClick={onOpenMap}
            className="mt-4 glass py-4 px-10 text-[10px] uppercase tracking-[0.5em] self-center lg:self-start hover:bg-luxury-silk hover:text-luxury-onyx transition-all duration-500 font-bold flex items-center justify-center gap-2 group cursor-pointer w-full sm:w-auto"
          >
            Find Artisan <Navigation size={12} className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      <div className="col-span-12 lg:col-span-7 relative h-full flex items-center justify-center p-4 lg:p-12 mb-12 lg:mb-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full aspect-square md:aspect-[4/3] bg-neutral-900 glass overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl rounded-2xl md:rounded-3xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&q=80&w=1200" 
            alt="Sculptural Braiding" 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[3s]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </section>
  );
};

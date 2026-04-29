import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Calendar, ArrowRight, X, Navigation } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 px-6 md:px-12 py-6 transition-all duration-500",
      scrolled ? "nav-glass py-4" : "bg-transparent py-8 md:py-10"
    )}>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col"
      >
        <span className="font-display uppercase text-xl md:text-2xl tracking-logo font-extralight text-white">
          KOUV<span className="accent-i text-luxury-gold">I</span>A
        </span>
        <span className="font-secondary uppercase text-[8px] md:text-[9px] tracking-[0.3em] opacity-50 mt-1 font-medium text-white text-left">by Ebys Place</span>
      </motion.div>
      
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="hidden lg:flex gap-10 font-secondary uppercase text-[10px] tracking-[0.3em] font-light mt-1"
      >
        <a href="#" className="hover:text-luxury-gold transition-colors duration-300">Artisans</a>
        <a href="#" className="hover:text-luxury-gold transition-colors duration-300">Journal</a>
        <a href="#" className="hover:text-luxury-gold transition-colors duration-300">Membership</a>
        <a href="#" className="text-luxury-silk border-b border-luxury-silk/30 pb-1">Search</a>
      </motion.nav>

      <motion.button
        whileHover={{ scale: 1.02 }}
        className="glass px-6 md:px-8 py-2 md:py-3 text-[9px] uppercase tracking-[0.4em] font-secondary hover:bg-luxury-silk hover:text-luxury-onyx transition-all duration-500"
      >
        Sign In
      </motion.button>
    </nav>
  );
};

export const Hero = ({ onOpenMap }: { onOpenMap: () => void }) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center pt-32 px-6 md:px-12 overflow-hidden">
      <div className="col-span-12 lg:col-span-5 flex flex-col justify-center lg:pr-8 z-10 text-center lg:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-8 tracking-tight font-sans text-white normal-case"
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
            <input type="text" placeholder="Paris, France" className="search-input pb-2 text-[15px] font-medium placeholder:opacity-20" />
          </div>
          <div className="flex flex-col">
            <label className="font-secondary text-[8px] uppercase tracking-[0.3em] mb-2 opacity-50 text-left">Technique</label>
            <input type="text" placeholder="Silk-Press Feed-in" className="search-input pb-2 text-[15px] font-medium placeholder:opacity-20" />
          </div>
          <button 
            onClick={onOpenMap}
            className="mt-4 glass py-4 px-10 text-[10px] uppercase tracking-[0.5em] self-center lg:self-start hover:bg-luxury-silk hover:text-luxury-onyx transition-all duration-500 font-bold flex items-center gap-2 group"
          >
            Find Artisan <Navigation size={12} className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      <div className="col-span-12 lg:col-span-7 relative h-full flex items-center justify-center p-4 lg:p-12 mb-12 lg:mb-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
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

import React from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, ArrowUpRight } from 'lucide-react';
import { Braider } from '../types';

export const BraiderCard = ({ braider }: { braider: Braider; key?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass p-6 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div className="relative overflow-hidden aspect-[4/5] mb-6 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
        <img 
          src={braider.imageUrl} 
          alt={braider.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transform scale-100 group-hover:scale-110 transition-all duration-[1s]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-4 left-4 z-20">
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-70 font-secondary text-luxury-gold">Master Artisan</p>
          <h3 className="text-xl font-extralight mt-1 tracking-tight">{braider.name}</h3>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 opacity-50 font-sans text-[11px] font-medium italic">
            <MapPin size={10} className="mb-0.5" /> {braider.location}
          </div>
          <div className="flex items-center gap-2">
             <span className="text-[11px] font-sans opacity-60 font-medium">{braider.priceRange}</span>
             <span className="text-[11px] font-sans opacity-20 font-medium">|</span>
             <span className="text-[11px] font-sans opacity-50 font-medium">{braider.rating} ★</span>
          </div>
        </div>
        
        <div className="text-[11px] font-sans font-bold opacity-60 hover:opacity-100 flex items-center gap-2 group/link cursor-pointer">
          Details <ArrowUpRight size={12} className="transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export const CategoryCard = ({ category }: { category: any; key?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative aspect-square rounded-full overflow-hidden group cursor-pointer border border-luxury-silk/10 p-1"
    >
      <div className="w-full h-full rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
        <img 
          src={category.imageUrl} 
          alt={category.name}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-125 transition-transform duration-[2s]"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-luxury-onyx/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="font-display uppercase text-[10px] tracking-[0.3em]">{category.name}</span>
      </div>
    </motion.div>
  );
};

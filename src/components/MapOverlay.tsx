import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Navigation, MapPin, Star, Search } from 'lucide-react';
import { MOCK_BRAIDERS } from '../constants';
import { cn } from '../lib/utils';

export const MapOverlay = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleTrack = () => {
    setTracking(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        setTracking(false);
      }, (error) => {
        console.error("Error getting location", error);
        setTracking(false);
      });
    } else {
      setTracking(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-luxury-onyx overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-white/5 bg-luxury-onyx/80 backdrop-blur-xl z-20">
            <div className="flex flex-col">
              <span className="font-display uppercase text-lg tracking-logo font-extralight text-white">
                KOUVIA <span className="text-[10px] opacity-40 ml-2 tracking-widest">MAP</span>
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 relative flex flex-col md:flex-row">
            {/* List Sidebar */}
            <div className="w-full md:w-96 bg-luxury-onyx/50 backdrop-blur-2xl border-r border-white/5 z-10 overflow-y-auto p-6 flex flex-col gap-6">
              <div className="relative">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
                <input 
                  type="text" 
                  placeholder="Search regions..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-10 text-[12px] font-sans placeholder:opacity-20 focus:outline-none focus:border-luxury-gold transition-colors"
                />
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="font-display text-[9px] uppercase tracking-[0.3em] text-luxury-gold px-1 opacity-80">Nearby Artisans</h4>
                {MOCK_BRAIDERS.map((braider) => (
                  <div 
                    key={braider.id}
                    className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-pointer group"
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                        <img src={braider.imageUrl} alt={braider.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 py-1">
                        <h5 className="font-sans text-[14px] font-bold tracking-tight mb-1">{braider.name}</h5>
                        <div className="flex items-center gap-1 opacity-50 text-[10px] font-medium italic">
                          <MapPin size={10} /> {braider.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stylized Map Placeholder */}
            <div className="flex-1 relative bg-neutral-900 overflow-hidden">
               {/* Grid Background */}
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
               
               {/* Location Markers */}
               {MOCK_BRAIDERS.map((braider, idx) => (
                 <motion.div
                   key={braider.id}
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: 0.5 + (idx * 0.1) }}
                   className="absolute group"
                   style={{ 
                     top: `${20 + (idx * 15)}%`, 
                     left: `${30 + (idx * 12)}%` 
                   }}
                 >
                    <div className="relative">
                      <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center p-1 backdrop-blur-md border border-luxury-gold/50 cursor-pointer hover:scale-110 transition-transform">
                        <div className="w-full h-full bg-luxury-gold rounded-full flex items-center justify-center">
                          <MapPin size={16} className="text-luxury-onyx" />
                        </div>
                      </div>
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-luxury-onyx/90 border border-white/10 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <p className="text-[10px] font-bold">{braider.name}</p>
                        <p className="text-[8px] opacity-50">{braider.location}</p>
                      </div>
                    </div>
                 </motion.div>
               ))}

               {/* User Pin */}
               {userLocation && (
                 <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                 >
                    <div className="relative">
                      <div className="w-20 h-20 bg-blue-500/20 rounded-full animate-ping" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                    </div>
                 </motion.div>
               )}

               {/* Controls */}
               <div className="absolute bottom-8 right-8 flex flex-col gap-4 z-20">
                 <button 
                   onClick={handleTrack}
                   disabled={tracking}
                   className="p-4 bg-white text-luxury-onyx rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50"
                 >
                   <Navigation size={20} className={cn(tracking && "animate-spin")} />
                 </button>
                 <div className="flex flex-col bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                    <button className="p-4 hover:bg-white/10 transition-colors border-b border-white/5">+</button>
                    <button className="p-4 hover:bg-white/10 transition-colors">-</button>
                 </div>
               </div>

               {/* Legend / Status */}
               <div className="absolute bottom-8 left-8 bg-luxury-onyx/80 backdrop-blur-lg border border-white/10 px-4 py-2 rounded-full hidden md:block">
                  <p className="text-[10px] font-medium tracking-wide">
                    {userLocation ? "Location active: Paris District" : "Standby • Click Navigation to Sync"}
                  </p>
               </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

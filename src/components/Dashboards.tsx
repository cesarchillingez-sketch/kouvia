import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Calendar, FileText, Check, X, Sparkles, User, UserCheck, ShieldAlert, Award, Star, Bell, PlusCircle, CheckCircle } from 'lucide-react';
import { Braider } from '../types';

interface DashboardsProps {
  braiders: Braider[];
  onAddBraider: (newBraider: Braider) => void;
  onRemoveBraider: (id: string) => void;
  userRole: 'admin' | 'braider' | 'client' | null;
  onSetUserRole: (role: 'admin' | 'braider' | 'client' | null) => void;
  onClose: () => void;
}

// Global simulated bookings and notifications state (for visual reactivity on this tour)
export const BOOKINGS_MOCK = [
  { id: 'b1', clientName: 'Gabrielle Chanel', style: 'Goddess Braids', date: 'June 08, 2026', time: '10:00 AM', status: 'pending', total: '€280' },
  { id: 'b2', clientName: 'Camille Claudel', style: 'Boho Braids', date: 'June 10, 2026', time: '02:30 PM', status: 'confirmed', total: '€350' },
  { id: 'b3', clientName: 'Léa Seydoux', style: 'Knotless', date: 'June 12, 2026', time: '11:00 AM', status: 'completed', total: '€180' }
];

export const NOTIFICATIONS_MOCK = [
  { id: 'n1', title: 'New Booking request', message: 'Gabrielle Chanel requested Goddess Braids on June 08.', time: '2 mins ago', unread: true },
  { id: 'n2', title: 'Bespoke Inquiry', message: 'Maison concierge requested custom fibers matching.', time: '1 hour ago', unread: true },
  { id: 'n3', title: 'Sponsorship offer', message: 'Milan Fashion Week Hair Team invite accepted.', time: '1 day ago', unread: false }
];

export const Dashboards = ({
  braiders,
  onAddBraider,
  onRemoveBraider,
  userRole,
  onSetUserRole,
  onClose
}: DashboardsProps) => {

  const [activeTab, setActiveTab] = useState<'signin' | 'admin' | 'braider'>('signin');
  
  // Sign in form state
  const [typedEmail, setTypedEmail] = useState('');
  const [selectedRoleSignup, setSelectedRoleSignup] = useState<'admin' | 'braider'>('braider');

  // Add Braider form state
  const [newAwesomeBraider, setNewAwesomeBraider] = useState({
    name: '',
    location: 'Paris, France',
    priceRange: '€€€',
    description: '',
    styles: 'Goddess Braids, Boho Braids',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  });

  const [localBookings, setLocalBookings] = useState(BOOKINGS_MOCK);
  const [localNotifs, setLocalNotifs] = useState(NOTIFICATIONS_MOCK);

  const handleCreateBraider = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAwesomeBraider.name || !newAwesomeBraider.description) return;

    const created: Braider = {
      id: String(Date.now()),
      name: newAwesomeBraider.name,
      location: newAwesomeBraider.location,
      rating: 5.0,
      priceRange: newAwesomeAwesomePrice(),
      availability: ['Mon', 'Tue', 'Thu', 'Fri'],
      styles: newAwesomeBraider.styles.split(',').map(s => s.trim()),
      imageUrl: newAwesomeBraider.imageUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      description: newAwesomeBraider.description
    };

    onAddBraider(created);
    setNewAwesomeBraider({
      name: '',
      location: 'Paris, France',
      priceRange: '€€€',
      description: '',
      styles: 'Goddess Braids, Boho Braids',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
    });
  };

  const newAwesomeAwesomePrice = () => {
    return newAwesomeBraider.priceRange;
  };

  const handleLogin = (role: 'admin' | 'braider') => {
    onSetUserRole(role);
    setActiveTab(role);
  };

  const handleLogout = () => {
    onSetUserRole(null);
    setActiveTab('signin');
  };

  const updateBookingStatus = (id: string, newStatus: 'confirmed' | 'cancelled') => {
    setLocalBookings(prev => prev.map(booking => booking.id === id ? { ...booking, status: newStatus } : booking));
    
    // Auto insert dynamic success notification
    if (newStatus === 'confirmed') {
      const targetB = localBookings.find(b => b.id === id);
      setLocalNotifs(prev => [
        {
          id: String(Date.now()),
          title: 'Booking Confirmed',
          message: `The styling appointment for ${targetB?.clientName} is officially booked.`,
          time: 'Just now',
          unread: true
        },
        ...prev
      ]);
    }
  };

  const clearAllNotifs = () => {
    setLocalNotifs([]);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/9y bg-luxury-onyx/95 backdrop-blur-3xl overflow-y-auto px-6 py-20 md:p-12">
      <div className="max-w-6xl mx-auto premium-entrance">
        
        {/* Header toolbar */}
        <div className="flex justify-between items-center mb-16 border-b border-white/5 pb-8">
          <div>
            <span className="font-display uppercase text-lg tracking-logo font-extralight text-white">
              KOUVIA <span className="text-[10px] text-luxury-gold tracking-widest ml-1 opacity-70">workspace</span>
            </span>
            <p className="text-[11px] opacity-40 uppercase tracking-widest mt-1">Simulated portal and user account environment</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors flex items-center justify-center cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {activeTab === 'signin' && !userRole && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left intro panel */}
            <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left">
              <span className="text-[10px] uppercase tracking-[0.4em] mb-4 text-luxury-gold font-bold">Maison Portal</span>
              <h1 className="font-display text-4xl md:text-5xl uppercase leading-tight mb-8 font-light text-white tracking-tighter">
                Elegance in the <br />
                <span className="italic font-serif opacity-70">Workspace.</span>
              </h1>
              <p className="text-[15px] text-neutral-400 font-medium leading-relaxed max-w-sm mx-auto lg:mx-0 mb-8">
                Sign in to manage reservations, orchestrate luxury master braiders, or synchronize notifications.
              </p>
              <div className="hidden lg:block border-t border-white/5 pt-8">
                <p className="text-[11px] opacity-30 uppercase tracking-[0.2em]">Kouvia Maison Suite v1.4</p>
              </div>
            </div>

            {/* Right form container */}
            <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-3xl glass max-w-lg mx-auto w-full">
              <h2 className="text-2xl font-light font-display uppercase tracking-tight mb-4 text-white text-center">Stakeholder Gate</h2>
              <p className="text-[13px] opacity-40 tracking-wide text-center mb-8">Select simulated identity to gain workspace privilege</p>

              <div className="flex bg-white/5 p-1 rounded-2xl mb-8">
                <button 
                  onClick={() => setSelectedRoleSignup('braider')}
                  className={`flex-1 py-3 text-[11px] uppercase tracking-[0.2em] font-bold rounded-xl transition-all ${selectedRoleSignup === 'braider' ? 'bg-luxury-gold text-luxury-onyx' : 'text-neutral-400 hover:text-white'}`}
                >
                  <Sparkles size={12} className="inline mr-1 mb-0.5" /> Artisan (Braider)
                </button>
                <button 
                  onClick={() => setSelectedRoleSignup('admin')}
                  className={`flex-1 py-3 text-[11px] uppercase tracking-[0.2em] font-bold rounded-xl transition-all ${selectedRoleSignup === 'admin' ? 'bg-luxury-gold text-luxury-onyx' : 'text-neutral-400 hover:text-white'}`}
                >
                  <UserCheck size={12} className="inline mr-1 mb-0.5" /> Maison Admin
                </button>
              </div>

              <div className="flex flex-col gap-6 mb-8">
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Simulated Email</label>
                  <input 
                    type="email" 
                    value={typedEmail}
                    onChange={(e) => setTypedEmail(e.target.value)}
                    placeholder={selectedRoleSignup === 'admin' ? 'director@kouvia.com' : 'artisan@kouvia.com'}
                    className="w-full bg-white/5 border border-white/10 p-3.5 text-sm rounded-xl focus:border-luxury-gold focus:outline-none transition-all placeholder:opacity-30"
                  />
                  <p className="text-[10px] opacity-30 mt-1.5 italic">No real authentication needed. Click login below to preview roles immediately.</p>
                </div>
              </div>

              <button 
                onClick={() => handleLogin(selectedRoleSignup)}
                className="w-full bg-luxury-silk text-luxury-onyx font-bold text-[11px] py-4 rounded-xl uppercase tracking-[0.3em] hover:bg-luxury-gold transition-colors duration-500 cursor-pointer"
              >
                Sign In to Workspace
              </button>
            </div>
          </div>
        )}

        {/* ADMIN WORKPLACE */}
        {activeTab === 'admin' && userRole === 'admin' && (
          <div className="space-y-12">
            
            {/* Quick Stats banner */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              <div className="glass p-6 rounded-2xl flex flex-col justify-between">
                <span className="text-[10px] uppercase tracking-widest opacity-40">Maison Director</span>
                <span className="text-3xl font-extralight tracking-tighter mt-2 text-white">Active Access</span>
              </div>
              <div className="glass p-6 rounded-2xl flex flex-col justify-between">
                <span className="text-[10px] uppercase tracking-widest opacity-40">Total Artisans</span>
                <span className="text-3xl font-extralight tracking-tighter mt-2 text-white">{braiders.length}</span>
              </div>
              <div className="glass p-6 rounded-2xl flex flex-col justify-between">
                <span className="text-[10px] uppercase tracking-widest opacity-40">Active Techniques</span>
                <span className="text-3xl font-extralight tracking-tighter mt-2 text-white">4 Certified</span>
              </div>
              <div className="glass p-6 rounded-2xl flex flex-col justify-between bg-luxury-gold/10 border-luxury-gold/20">
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Role Privilege</span>
                <button 
                  onClick={handleLogout}
                  className="text-[10px] py-1 px-3 mt-2 bg-white/10 border border-white/20 hover:bg-white/20 hover:text-white transition-colors uppercase font-bold text-center self-start rounded-full"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form addition space */}
              <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-3xl glass">
                <h3 className="text-xl font-light font-display uppercase tracking-tight mb-6 text-white flex items-center gap-2">
                  <PlusCircle size={18} className="text-luxury-gold" /> Add New Artisan
                </h3>

                <form onSubmit={handleCreateBraider} className="space-y-5">
                  <div className="flex flex-col">
                    <label className="text-[9px] uppercase tracking-widest opacity-40 mb-1.5 font-bold">Artisan Name</label>
                    <input 
                      type="text" 
                      required
                      value={newAwesomeBraider.name}
                      onChange={(e) => setNewAwesomeBraider({...newAwesomeBraider, name: e.target.value})}
                      placeholder="e.g. Vanessa Lawson"
                      className="w-full bg-white/5 border border-white/10 p-3 text-sm rounded-xl focus:border-luxury-gold focus:outline-none transition-all placeholder:opacity-20 font-sans font-medium text-white"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[9px] uppercase tracking-widest opacity-40 mb-1.5 font-bold">HQ Capital Region</label>
                    <select 
                      value={newAwesomeBraider.location}
                      onChange={(e) => setNewAwesomeBraider({...newAwesomeBraider, location: e.target.value})}
                      className="w-full bg-luxury-onyx border border-white/10 p-3 text-sm rounded-xl focus:border-luxury-gold focus:outline-none text-white font-sans font-medium"
                    >
                      <option value="Paris, France">Paris, France</option>
                      <option value="London, UK">London, UK</option>
                      <option value="Milan, Italy">Milan, Italy</option>
                      <option value="Stockholm, Sweden">Stockholm, Sweden</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[9px] uppercase tracking-widest opacity-40 mb-1.5 font-bold">Price Tier Indicator</label>
                    <select 
                      value={newAwesomeBraider.priceRange}
                      onChange={(e) => setNewAwesomeBraider({...newAwesomeBraider, priceRange: e.target.value})}
                      className="w-full bg-luxury-onyx border border-white/10 p-3 text-sm rounded-xl focus:border-luxury-gold focus:outline-none text-white font-sans font-medium"
                    >
                      <option value="€€">€€ - Moderate Premium</option>
                      <option value="€€€">€€€ - Luxury Reserve</option>
                      <option value="€€€€">€€€€ - Absolute Elite</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[9px] uppercase tracking-widest opacity-40 mb-1.5 font-bold">Specialty Styling Tag</label>
                    <input 
                      type="text" 
                      value={newAwesomeBraider.styles}
                      onChange={(e) => setNewAwesomeBraider({...newAwesomeBraider, styles: e.target.value})}
                      placeholder="Goddess Braids, Boho Braids, Knotless"
                      className="w-full bg-white/5 border border-white/10 p-3 text-sm rounded-xl focus:border-luxury-gold focus:outline-none transition-all placeholder:opacity-20 font-sans font-medium text-white"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[9px] uppercase tracking-widest opacity-40 mb-1.5 font-bold">Artisan Image Portrait (Unsplash)</label>
                    <input 
                      type="url" 
                      value={newAwesomeBraider.imageUrl}
                      onChange={(e) => setNewAwesomeBraider({...newAwesomeBraider, imageUrl: e.target.value})}
                      placeholder="Paste Unsplash or direct URL"
                      className="w-full bg-white/5 border border-white/10 p-3 text-sm rounded-xl focus:border-luxury-gold focus:outline-none transition-all placeholder:opacity-20 font-sans font-medium text-white"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[9px] uppercase tracking-widest opacity-40 mb-1.5 font-bold">Signature Biography</label>
                    <textarea 
                      required
                      value={newAwesomeBraider.description}
                      onChange={(e) => setNewAwesomeBraider({...newAwesomeBraider, description: e.target.value})}
                      placeholder="Write brief creative expertise review representing the brand..."
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 p-3 text-sm rounded-xl focus:border-luxury-gold focus:outline-none transition-all placeholder:opacity-20 font-sans font-medium text-white resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-luxury-gold text-luxury-onyx font-bold text-[10px] py-3 rounded-xl uppercase tracking-[0.3em] hover:bg-white transition-colors duration-500 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus size={14} /> Add Artisan To Roster
                  </button>
                </form>
              </div>

              {/* Roster database management block */}
              <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-3xl glass flex flex-col">
                <h3 className="text-xl font-light font-display uppercase tracking-tight mb-6 text-white flex items-center justify-between">
                  <span>Elite Roster Database</span>
                  <span className="text-[10px] font-sans font-medium py-1 px-3 bg-white/5 rounded-full border border-white/10 opacity-60 normal-case">{braiders.length} registered</span>
                </h3>

                <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
                  {braiders.map(braider => (
                    <div 
                      key={braider.id}
                      className="p-4 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-between transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-white/10">
                          <img src={braider.imageUrl} alt={braider.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="font-sans text-sm font-bold text-white tracking-tight">{braider.name}</h4>
                          <span className="text-[10px] opacity-40 font-medium italic">{braider.location} • {braider.priceRange}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => onRemoveBraider(braider.id)}
                        className="p-3 bg-red-950/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all flex items-center justify-center cursor-pointer border border-red-500/10 group-hover:border-red-500/30"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  {braiders.length === 0 && (
                    <div className="py-12 text-center text-neutral-500 text-sm">
                      Roster is currently empty. Add luxury artisans to publish portfolio columns.
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* BRAIDER WORKPLACE */}
        {activeTab === 'braider' && userRole === 'braider' && (
          <div className="space-y-12">
            
            {/* Quick Metrics banner */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              <div className="glass p-6 rounded-2xl flex flex-col justify-between">
                <span className="text-[10px] uppercase tracking-widest opacity-40">Active Artisan</span>
                <span className="text-2xl font-extralight tracking-tighter mt-2 text-white flex items-center gap-1.5">
                  Amara Okafor <Award size={16} className="text-luxury-gold" />
                </span>
              </div>
              <div className="glass p-6 rounded-2xl flex flex-col justify-between">
                <span className="text-[10px] uppercase tracking-widest opacity-40">Bespoke Rating</span>
                <span className="text-3xl font-extralight tracking-tighter mt-2 text-white flex items-center gap-1">5.0 ★ <Star size={16} className="text-luxury-gold" fill="currentColor" /></span>
              </div>
              <div className="glass p-6 rounded-2xl flex flex-col justify-between">
                <span className="text-[10px] uppercase tracking-widest opacity-40">Monthly Revenue</span>
                <span className="text-3xl font-extralight tracking-tighter mt-2 text-white">€3,840</span>
              </div>
              <div className="glass p-6 rounded-2xl flex flex-col justify-between bg-luxury-gold/10 border-luxury-gold/20">
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Artisan Portal</span>
                <button 
                  onClick={handleLogout}
                  className="text-[10px] py-1 px-3 mt-2 bg-white/10 border border-white/20 hover:bg-white/20 hover:text-white transition-colors uppercase font-bold text-center self-start rounded-full"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Dynamic Notification center */}
              <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 p-6 rounded-3xl glass flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-light font-display uppercase tracking-tight text-white flex items-center gap-2">
                    <Bell size={16} className="text-luxury-gold" /> Notifications
                  </h3>
                  {localNotifs.length > 0 && (
                    <button 
                      onClick={clearAllNotifs}
                      className="text-[9px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity font-bold"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto max-h-[400px]">
                  {localNotifs.map(notif => (
                    <div 
                      key={notif.id}
                      className={`p-3.5 border rounded-xl transition-all ${notif.unread ? 'bg-luxury-gold/5 border-luxury-gold/20' : 'bg-white/[0.01] border-white/5'}`}
                    >
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <h4 className="font-sans text-xs font-bold text-white tracking-tight">{notif.title}</h4>
                        <span className="text-[8px] opacity-40 font-sans">{notif.time}</span>
                      </div>
                      <p className="font-sans text-[11px] opacity-60 leading-relaxed font-medium">{notif.message}</p>
                    </div>
                  ))}
                  {localNotifs.length === 0 && (
                    <div className="py-12 text-center text-neutral-500 text-xs font-sans">
                      All quiet. Notifications from incoming bookings will appear.
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Action / Management column */}
              <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-3xl glass flex flex-col">
                <h3 className="text-xl font-light font-display uppercase tracking-tight mb-6 text-white flex items-center justify-between">
                  <span>Incoming Hair Appointments</span>
                  <span className="text-[10px] font-sans font-medium py-1 px-3 bg-white/5 rounded-full border border-white/10 opacity-60 capitalize">{localBookings.filter(b => b.status === 'pending').length} pending</span>
                </h3>

                <div className="space-y-4">
                  {localBookings.map(booking => (
                    <div 
                      key={booking.id}
                      className="p-5 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-white/5 rounded-xl text-luxury-gold flex items-center justify-center">
                          <Calendar size={18} />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                             <h4 className="font-sans text-sm font-bold text-white">{booking.clientName}</h4>
                             <span className="text-[9px] uppercase tracking-widest py-0.5 px-2 rounded-full font-bold bg-white/5 border border-white/10 opacity-70">{booking.style}</span>
                          </div>
                          <p className="text-[12px] opacity-40 font-medium font-sans">
                             Scheduled: {booking.date} at {booking.time}
                          </p>
                          <div className="flex items-center gap-1.5 pt-1">
                            {booking.status === 'pending' && <span className="inline-block w-2 bg-yellow-400 rounded-full h-2 animate-pulse" />}
                            {booking.status === 'confirmed' && <span className="inline-block w-2 bg-green-500 rounded-full h-2" />}
                            {booking.status === 'cancelled' && <span className="inline-block w-2 bg-red-500 rounded-full h-2" />}
                            <span className="text-[10px] uppercase font-bold tracking-wider opacity-60 font-sans capitalize">{booking.status}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-center">
                        {booking.status === 'pending' ? (
                          <>
                            <button 
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                              className="px-4 py-2 bg-luxury-gold text-luxury-onyx hover:bg-white text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <Check size={12} /> Accept Book
                            </button>
                            <button 
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              className="p-2.5 bg-white/5 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-all cursor-pointer border border-white/5"
                            >
                              <X size={14} />
                            </button>
                          </>
                        ) : booking.status === 'confirmed' ? (
                          <div className="flex items-center gap-1.5 text-green-400 text-[10px] font-sans font-bold uppercase tracking-widest py-1.5 px-3 bg-green-500/10 rounded-lg border border-green-500/20">
                            <CheckCircle size={12} /> Confirmed
                          </div>
                        ) : (
                          <span className="text-[10px] font-sans font-medium opacity-30 uppercase tracking-widest">Cancelled</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

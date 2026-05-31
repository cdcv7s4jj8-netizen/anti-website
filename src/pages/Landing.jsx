import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radar, 
  Brain, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  ArrowRight, 
  Sparkles,
  CheckCircle,
  XCircle,
  Clock,
  Maximize2,
  Lock
} from 'lucide-react';

// 3D Tilt Wrapper Component
const TiltCard = ({ children, className = "", style = {} }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card rounded-xl p-8 md:p-10 transition-all duration-300 ease-out cursor-pointer ${className}`}
      style={{ ...style, transformStyle: 'preserve-3d' }}
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </div>
  );
};

export default function Landing({ onNavigate, user }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [countdown, setCountdown] = useState({ hours: 14, minutes: 32, seconds: 45 });

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to 24 hours
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Growth analytics screenshots files in public/results
  const resultImages = [
    { src: '/results/IMG_0337.jpg', title: 'Instagram Insights Growth Chart' },
    { src: '/results/Screenshot_20260531_163807_Instagram.jpg', title: 'Viral Account Growth Metrics' },
    { src: '/results/Screenshot_20260531_163943_Instagram.jpg', title: 'Reel Impression Analysis' },
    { src: '/results/Screenshot_20250503_120707_Instagram.JPEG', title: 'Viral Traffic Distribution' },
    { src: '/results/Screenshot_20260531_164005_Instagram.jpg', title: 'Audience Penetration Statistics' },
    { src: '/results/Screenshot_20260531_164043_Instagram.jpg', title: 'Video View retention graph' },
    { src: '/results/Screenshot_20260531_164219_Instagram.jpg', title: 'Engagement Demographics' },
    { src: '/results/Screenshot_20260531_165048_Video Player.jpg', title: 'Direct Monetization Feed' }
  ];

  return (
    <div className="pt-24 relative overflow-hidden select-none">
      
      {/* Dynamic Ambient Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary-container/5 rounded-full blur-[140px] -z-10 animate-pulse-subtle" />
      <div className="absolute top-[60%] right-10 w-[500px] h-[500px] bg-secondary-container/5 rounded-full blur-[160px] -z-10 animate-pulse" />

      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center py-20 px-6 md:px-16 text-center max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full backdrop-blur-md"
        >
          <span className="w-2.5 h-2.5 bg-primary-container rounded-full animate-ping"></span>
          <span className="font-label text-[10px] md:text-[11px] text-on-surface uppercase tracking-[0.3em] font-bold">
            Status: Digital Economy Active
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-display text-[48px] md:text-[96px] lg:text-[120px] leading-[0.9] uppercase mb-8 tracking-tighter italic font-black text-white"
        >
          ESCAPE THE <span className="text-primary-container text-glow">MATRIX</span><br />
          <span className="text-[36px] md:text-[76px] lg:text-[96px] opacity-80">MONETIZE ATTENTION</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-body text-base md:text-lg text-on-surface-variant max-w-3xl mx-auto mb-12 opacity-80 leading-relaxed"
        >
          The algorithm is a weapon of mass distraction. We teach you how to turn it into a monetization engine. 
          Stop consuming. Start weaponizing through the <strong className="text-white border-b border-primary-container/50 pb-0.5">Clipper's Edge</strong> methodology.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-xl mx-auto"
        >
          <button 
            onClick={() => onNavigate(user ? 'dashboard' : 'auth')}
            className="bg-primary-container text-on-primary-container px-10 py-5 font-display text-[18px] md:text-[20px] font-black tracking-tighter uppercase bloom-primary transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
          >
            {user ? 'ACCESS MEMBER PORTAL' : 'JOIN THE EMPIRE'}
            <ArrowRight size={20} className="stroke-[3]" />
          </button>
          
          <button 
            onClick={() => {
              document.getElementById('methodology').scrollIntoView({ behavior: 'smooth' });
            }}
            className="border border-white/20 glass-card text-white px-10 py-5 font-display text-[18px] md:text-[20px] font-black tracking-tighter uppercase hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            THE METHODOLOGY
          </button>
        </motion.div>
      </section>

      {/* The Methodology Grid */}
      <section className="py-32 px-6 md:px-16 bg-surface-container-lowest border-y border-white/5" id="methodology">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-24 grid md:grid-cols-2 items-end gap-10">
            <div>
              <span className="font-label text-xs text-primary-container uppercase tracking-[0.5em] mb-4 block font-bold">WEAPONRY CORE</span>
              <h2 className="font-display text-[42px] md:text-[72px] uppercase leading-[0.9] font-black italic tracking-tighter text-white">THE CLIPPER'S EDGE</h2>
            </div>
            <p className="font-body text-base md:text-lg text-on-surface-variant opacity-75 leading-relaxed border-l-2 border-primary-container/30 pl-6 md:pl-8">
              A ruthless, step-by-step path designed to bypass algorithmic suppression and maximize viewer retention through high-intensity psychological editing. This isn't art. It's digital warfare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phase 01 */}
            <TiltCard>
              <div className="text-primary-container mb-6">
                <Radar size={48} className="stroke-[1.5]" />
              </div>
              <span className="font-label text-[10px] opacity-40 block mb-3 tracking-widest font-bold">PHASE 01 // INFILTRATION</span>
              <h3 className="font-display text-2xl uppercase font-black mb-4 italic text-white">Digital Infiltration</h3>
              <p className="font-body text-on-surface-variant opacity-70 mb-8 text-sm leading-relaxed">
                Master the "Hook-Gap" framework. Learn how to leverage your expertise to bypass filters and force the algorithm to serve your content to millions.
              </p>
              <ul className="space-y-2.5 font-label text-[10px] uppercase tracking-widest text-primary-container font-bold">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-container rounded-full"></span> Scroll-Stop Logic
                </li>
                <li class="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-container rounded-full"></span> Metadata Hijacking
                </li>
              </ul>
            </TiltCard>

            {/* Phase 02 (Highlighted) */}
            <TiltCard className="border-t-2 border-primary-container md:scale-[1.05] z-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary-container text-on-primary-container font-label text-[9px] font-bold tracking-widest px-3 py-1 uppercase rounded-bl">
                MOST INTENSE
              </div>
              <div className="text-primary-container mb-6">
                <Brain size={48} className="stroke-[1.5]" />
              </div>
              <span className="font-label text-[10px] text-primary-container block mb-3 tracking-widest font-bold">PHASE 02 // DOMINANCE</span>
              <h3 className="font-display text-2xl uppercase font-black mb-4 italic text-white">Dopamine Splicing</h3>
              <p className="font-body text-on-surface-variant opacity-90 mb-8 text-sm leading-relaxed">
                The most aggressive editing methodology ever conceived. Every millisecond of silence is a lost dollar. We teach you to keep viewers trapped in a cycle of attention.
              </p>
              <ul className="space-y-2.5 font-label text-[10px] uppercase tracking-widest text-primary-container font-bold">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-container rounded-full"></span> Retention Lock System
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-container rounded-full"></span> Subconscious Anchoring
                </li>
              </ul>
            </TiltCard>

            {/* Phase 03 */}
            <TiltCard>
              <div className="text-primary-container mb-6">
                <DollarSign size={48} className="stroke-[1.5]" />
              </div>
              <span className="font-label text-[10px] opacity-40 block mb-3 tracking-widest font-bold">PHASE 03 // EXTRACTION</span>
              <h3 className="font-display text-2xl uppercase font-black mb-4 italic text-white">Monetization Engine</h3>
              <p className="font-body text-on-surface-variant opacity-70 mb-8 text-sm leading-relaxed">
                Extraction is the only metric. Transform vanity views into cold, hard capital. Build the systems that allow you to monetize the digital economy 24/7.
              </p>
              <ul className="space-y-2.5 font-label text-[10px] uppercase tracking-widest text-primary-container font-bold">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-container rounded-full"></span> High-Ticket Bridging
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-container rounded-full"></span> Referral Architecting
                </li>
              </ul>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Verified Results Section */}
      <section className="py-32 overflow-hidden bg-background" id="results">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-24">
            <span className="font-label text-xs text-secondary-container uppercase tracking-[0.6em] mb-4 block font-bold">RAW INTELLIGENCE</span>
            <h2 className="font-display text-[48px] md:text-[80px] uppercase leading-[0.9] mb-8 tracking-tighter font-black italic text-white">VERIFIED RESULTS</h2>
            <p className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto opacity-70">
              Numbers don't lie. Below are actual results extracted directly from the system dashboard, showing viral reach, growth logs, and digital extractions. Click any screen to analyze raw data.
            </p>
          </div>
        </div>

        {/* Dynamic Image Marquee */}
        <div className="relative w-full overflow-hidden mb-24 py-4 border-y border-white/5 bg-black/10">
          <div className="flex gap-6 animate-marquee-slow whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer">
            {/* Repeat list twice to create infinite marquee loop */}
            {[...resultImages, ...resultImages].map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedImage(img)}
                className="inline-block relative h-[380px] w-[260px] flex-shrink-0 group overflow-hidden glass-card rounded-xl border border-white/10 hover:border-primary-container/40 transition-all duration-300"
              >
                <img 
                  alt={img.title} 
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                  src={img.src} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />
                
                <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center z-10">
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap pr-2">
                    <p className="font-label text-[9px] text-primary-container uppercase font-bold tracking-widest">Growth Proof</p>
                    <p className="font-display text-xs text-white font-bold tracking-tight truncate">{img.title}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur group-hover:bg-primary-container group-hover:text-black transition-colors">
                    <Maximize2 size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aggregated Quick Metrics */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-10 flex flex-col items-center justify-center text-center">
            <span className="font-label text-[11px] text-secondary-container uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
              <DollarSign size={14} /> AVERAGE EXTRACTION
            </span>
            <div className="font-display text-[54px] md:text-[72px] font-black italic text-white tracking-tighter text-glow-yellow">
              $1,119.23
            </div>
            <p className="font-label text-[9px] opacity-40 uppercase tracking-widest mt-2">
              Single Account / Weekly Clip Yield
            </p>
          </div>
          
          <div className="glass-card p-10 flex flex-col items-center justify-center text-center border-primary-container/20">
            <span className="font-label text-[11px] text-primary-container uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
              <Activity size={14} /> PEAK REACH
            </span>
            <div className="font-display text-[54px] md:text-[72px] font-black italic text-white tracking-tighter text-glow">
              2.45M+
            </div>
            <p className="font-label text-[9px] opacity-40 uppercase tracking-widest mt-2">
              Total Impressions / 90 Day Window
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-surface-container-low rounded-2xl border border-white/10 p-4 flex flex-col cursor-default shadow-2xl"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white/50 hover:text-white flex items-center gap-2 font-label text-xs uppercase tracking-widest font-bold"
              >
                Close <XCircle size={18} />
              </button>
              <div className="overflow-hidden rounded-xl bg-black/45 border border-white/5 h-[70vh] flex items-center justify-center">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="mt-4 px-2">
                <p className="font-label text-[10px] text-primary-container uppercase font-bold tracking-widest mb-1">
                  Verified Screenshot Evidence
                </p>
                <h4 className="font-display text-sm text-white font-bold uppercase tracking-tight">
                  {selectedImage.title}
                </h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Comparative Path Section */}
      <section className="py-32 px-6 md:px-16 border-t border-white/5 relative overflow-hidden" id="path">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-24">
            <span className="font-label text-xs text-primary-container uppercase tracking-[0.4em] mb-4 block font-bold">TWO PATHS LIE BEFORE YOU</span>
            <h2 className="font-display text-[42px] md:text-[72px] uppercase leading-[1] font-black italic tracking-tighter text-white">THE CHOICE IS YOURS</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch max-w-5xl mx-auto">
            {/* Settle for less */}
            <div className="glass-card p-10 md:p-12 opacity-50 hover:opacity-100 transition-all duration-500 flex flex-col">
              <h3 className="font-display text-3xl uppercase font-black italic mb-8 flex items-center gap-3">
                SETTLE FOR LESS <XCircle className="text-red-500" />
              </h3>
              <ul className="space-y-6 mb-12 flex-grow">
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-red-500 mt-0.5">cancel</span>
                  <p className="font-body text-on-surface-variant text-sm">Stay unfulfilled in a unrewarding 9-5 job working for someone else.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-red-500 mt-0.5">cancel</span>
                  <p className="font-body text-on-surface-variant text-sm">Waste 8+ hours a day on unmonetized distraction (Netflix, Gaming).</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-red-500 mt-0.5">cancel</span>
                  <p className="font-body text-on-surface-variant text-sm">Remain stagnant in an obsolete economic model.</p>
                </li>
              </ul>
              <div className="pt-6 border-t border-white/10 font-label text-[10px] tracking-widest text-on-surface-variant uppercase font-bold">
                Cost: Your Freedom
              </div>
            </div>

            {/* Ascend to Empire */}
            <div className="glass-card p-10 md:p-12 border-primary-container/30 bg-primary-container/[0.02] shadow-[0_0_50px_rgba(0,255,65,0.05)] flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <h3 className="font-display text-3xl uppercase font-black italic text-primary-container flex items-center gap-3">
                  ASCEND TO EMPIRE <CheckCircle className="text-primary-container" />
                </h3>
                <span className="bg-primary-container text-on-primary-container px-3 py-1 text-[9px] font-black tracking-widest uppercase rounded">
                  ELITE ACCESS
                </span>
              </div>
              <ul className="space-y-6 mb-12 flex-grow">
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container mt-0.5">check_circle</span>
                  <p className="font-body text-white font-semibold text-sm">Master the Clipper's Edge methodology through a step-by-step path.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container mt-0.5">check_circle</span>
                  <p className="font-body text-white font-semibold text-sm">Access cutting-edge digital tools and hourly-updated intel.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container mt-0.5">check_circle</span>
                  <p className="font-body text-white font-semibold text-sm">Network with elite strategists focused solely on growth.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container mt-0.5">check_circle</span>
                  <p className="font-body text-white font-semibold text-sm">Monetize the digital economy at scale from anywhere on Earth.</p>
                </li>
              </ul>
              <button 
                onClick={() => onNavigate(user ? 'dashboard' : 'auth')}
                className="w-full bg-primary-container text-on-primary-container py-5 font-display text-[18px] md:text-[20px] font-black uppercase bloom-primary transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                LOCK IN ACCESS <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Timer Widget & Countdown CTA */}
      <section className="py-44 px-6 md:px-16 relative text-center overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,65,0.08),transparent_70%)] opacity-55 -z-10" />
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 inline-flex items-center gap-2 bg-red-950/20 border border-red-500/20 px-5 py-2.5 rounded-full text-red-400 font-label text-xs uppercase tracking-widest font-bold">
            <Clock size={14} className="animate-spin-slow" /> Price Increasing shortly: 
            <span className="text-white ml-2 font-mono">
              {String(countdown.hours).padStart(2, '0')}:{String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
            </span>
          </div>

          <h2 className="font-display text-[48px] md:text-[100px] lg:text-[130px] uppercase leading-[0.8] tracking-tighter mb-10 italic font-black text-white">
            EMPIRE <br /> <span class="text-primary-container text-glow">AWAITS</span>
          </h2>
          
          <p className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-14 opacity-80 leading-relaxed px-4">
            Registration for the Elite Tier is strictly restricted. The price of entry increases upon countdown expiration. Secure your position before the next algorithmic shift locks the door forever.
          </p>

          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={() => onNavigate(user ? 'dashboard' : 'auth')}
              className="bg-primary-container text-on-primary-container px-20 py-8 font-display text-[24px] md:text-[30px] font-black tracking-tighter uppercase bloom-primary transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              ASCEND NOW
              <Sparkles size={24} className="fill-current" />
            </button>
            <p className="font-label text-[11px] uppercase tracking-[0.3em] text-secondary-container font-bold animate-pulse flex items-center gap-1.5">
              <Lock size={12} /> SECURE CRYPTO & CARD ENCRYPTION ACTIVE
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-16 px-6 md:px-16 border-t border-white/5 glass-nav relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 w-full max-w-[1440px] mx-auto">
          <div className="font-display text-[24px] text-primary-container font-black italic tracking-tighter uppercase text-glow">
            CLIPEMPIRE
          </div>
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 font-label text-[11px] tracking-[0.3em] uppercase font-bold text-on-surface-variant">
            <a className="hover:text-primary transition-colors" href="#methodology" onClick={(e) => handleLinkClick(e, 'methodology')}>Methodology</a>
            <a className="hover:text-primary transition-colors" href="#results" onClick={(e) => handleLinkClick(e, 'results')}>Results</a>
            <a className="hover:text-primary transition-colors" href="#path" onClick={(e) => handleLinkClick(e, 'path')}>Path</a>
            <a className="hover:text-primary transition-colors" href="/portal" onClick={(e) => { e.preventDefault(); onNavigate('auth'); }}>Portal</a>
          </div>
          <div className="font-label text-[9px] tracking-[0.2em] text-on-surface-variant opacity-40 uppercase">
            © 2026 CLIPEMPIRE. DATA ENCRYPTED. AES-256.
          </div>
        </div>
      </footer>
    </div>
  );
}

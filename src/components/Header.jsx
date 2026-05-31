import React, { useEffect, useState } from 'react';
import { Menu, X, ShieldAlert, LogOut, LayoutDashboard } from 'lucide-react';

export default function Header({ user, onLogout, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Background glass opacity change
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide/Show navbar on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // Check if we are currently in landing page view
    // If not, we trigger navigate to Landing and then scroll
    onNavigate('landing');
    
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 transform ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled ? 'py-3.5 glass-nav shadow-lg' : 'py-6 bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-16 max-w-[1440px] mx-auto">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('landing')}
          className="font-display text-[22px] md:text-[28px] text-primary-container font-black tracking-tighter uppercase italic cursor-pointer flex items-center gap-2 select-none text-glow"
        >
          <span className="material-symbols-outlined text-3xl font-black">radar</span>
          CLIPEMPIRE
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-10">
          <a 
            href="#methodology" 
            onClick={(e) => handleLinkClick(e, 'methodology')}
            className="text-on-surface-variant font-bold hover:text-primary transition-all duration-300 font-label text-[11px] uppercase tracking-[0.25em]"
          >
            Methodology
          </a>
          <a 
            href="#results" 
            onClick={(e) => handleLinkClick(e, 'results')}
            className="text-on-surface-variant font-bold hover:text-primary transition-all duration-300 font-label text-[11px] uppercase tracking-[0.25em]"
          >
            Verified Results
          </a>
          <a 
            href="#path" 
            onClick={(e) => handleLinkClick(e, 'path')}
            className="text-on-surface-variant font-bold hover:text-primary transition-all duration-300 font-label text-[11px] uppercase tracking-[0.25em]"
          >
            The Path
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="hidden md:flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.2em] font-bold text-primary hover:text-white transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
              </button>
              <button 
                onClick={onLogout}
                className="hidden md:flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.2em] font-bold text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" /> Log Out
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onNavigate('auth')}
              className="hidden md:block font-label text-[11px] uppercase tracking-[0.2em] font-bold text-on-surface-variant hover:text-white transition-colors"
            >
              Log In
            </button>
          )}

          <button 
            onClick={() => onNavigate(user ? 'dashboard' : 'auth')}
            className="bg-primary-container text-on-primary-container px-6 py-2.5 font-display text-[15px] md:text-[17px] font-black tracking-tighter uppercase bloom-primary transition-all duration-300 active:scale-95 flex items-center gap-1.5"
          >
            {user ? 'PORTAL' : 'ASCEND'}
            <span className="material-symbols-outlined text-lg font-black">bolt</span>
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white hover:text-primary-container transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-full glass-nav flex flex-col py-6 px-8 gap-6 border-b border-white/5 animate-fade-in">
          <a 
            href="#methodology" 
            onClick={(e) => handleLinkClick(e, 'methodology')}
            className="text-on-surface-variant font-bold hover:text-primary transition-all duration-300 font-label text-[12px] uppercase tracking-[0.2em] py-2"
          >
            Methodology
          </a>
          <a 
            href="#results" 
            onClick={(e) => handleLinkClick(e, 'results')}
            className="text-on-surface-variant font-bold hover:text-primary transition-all duration-300 font-label text-[12px] uppercase tracking-[0.2em] py-2"
          >
            Verified Results
          </a>
          <a 
            href="#path" 
            onClick={(e) => handleLinkClick(e, 'path')}
            className="text-on-surface-variant font-bold hover:text-primary transition-all duration-300 font-label text-[12px] uppercase tracking-[0.2em] py-2"
          >
            The Path
          </a>
          <hr className="border-white/10" />
          {user ? (
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => { setMobileMenuOpen(false); onNavigate('dashboard'); }}
                className="flex items-center gap-2 font-label text-[12px] uppercase tracking-[0.2em] font-bold text-primary text-left py-2"
              >
                <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                className="flex items-center gap-2 font-label text-[12px] uppercase tracking-[0.2em] font-bold text-red-400 text-left py-2"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>
          ) : (
            <button 
              onClick={() => { setMobileMenuOpen(false); onNavigate('auth'); }}
              className="font-label text-[12px] uppercase tracking-[0.2em] font-bold text-on-surface-variant hover:text-white transition-colors text-left py-2"
            >
              Log In / Register
            </button>
          )}
        </div>
      )}
    </header>
  );
}

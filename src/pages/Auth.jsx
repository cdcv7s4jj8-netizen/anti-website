import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, User, ShieldAlert, ArrowRight, CornerDownRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Auth({ onLoginSuccess, onNavigate }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Required fields are missing.');
      return;
    }
    if (!isLogin && !username) {
      setError('Please provide a codename.');
      return;
    }
    if (password.length < 6) {
      setError('Key sequence must contain at least 6 components.');
      return;
    }

    setLoading(true);

    // Simulate cyber auth encryption delay
    setTimeout(() => {
      setLoading(false);
      const codename = isLogin ? email.split('@')[0] : username;
      
      const sessionUser = {
        email,
        username: codename,
        joinedAt: new Date().toLocaleDateString(),
        tier: 'Elite Operative',
        token: 'cyber-token-' + Math.random().toString(36).substring(2)
      };

      // Store in localStorage
      localStorage.setItem('clipempire_user', JSON.stringify(sessionUser));
      
      // Trigger confetti on successful signup/login!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00ff41', '#ffffff', '#72ff70']
      });

      onLoginSuccess(sessionUser);
      onNavigate('dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-[90vh] pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden">
      
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-container/5 rounded-full blur-[160px] -z-10 animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md glass-card rounded-2xl p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden"
      >
        {/* Glow border line on top */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary-container to-transparent text-glow" />

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="font-display text-[22px] text-primary-container font-black tracking-tighter uppercase italic mb-2 select-none flex items-center justify-center gap-1.5 text-glow">
            <span className="material-symbols-outlined font-black">radar</span>
            CLIPEMPIRE
          </div>
          <h2 className="font-display text-xl text-white font-bold uppercase tracking-tight">
            {isLogin ? 'INFILTRATE INTERFACE' : 'RECRUIT ENROLLMENT'}
          </h2>
          <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">
            {isLogin ? 'Enter decryption sequence' : 'Initiate operative credentials'}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/10 mb-8 font-label text-xs uppercase tracking-widest font-bold">
          <button 
            type="button"
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 pb-3 text-center transition-colors relative ${
              isLogin ? 'text-primary-container' : 'text-on-surface-variant hover:text-white'
            }`}
          >
            Decrypt LogIn
            {isLogin && (
              <motion.div 
                layoutId="activeTabLine"
                className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-container"
              />
            )}
          </button>
          
          <button 
            type="button"
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 pb-3 text-center transition-colors relative ${
              !isLogin ? 'text-primary-container' : 'text-on-surface-variant hover:text-white'
            }`}
          >
            Enlist SignUp
            {!isLogin && (
              <motion.div 
                layoutId="activeTabLine"
                className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-container"
              />
            )}
          </button>
        </div>

        {/* Error notification */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-950/20 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 font-label text-[11px] uppercase tracking-wider font-bold"
          >
            <ShieldAlert size={16} className="flex-shrink-0" />
            <span>ERROR: {error}</span>
          </motion.div>
        )}

        {/* Form elements */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
                Operative Codename
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                <input 
                  type="text"
                  placeholder="e.g. FREEDOMSIPS"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 pl-12 pr-4 text-white placeholder-white/20 font-mono text-sm focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors uppercase"
                  disabled={loading}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
              Communication Terminal (Email)
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
              <input 
                type="email"
                placeholder="operative@empire.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 pl-12 pr-4 text-white placeholder-white/20 font-mono text-sm focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
              Access Decryption Key (Password)
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
              <input 
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 pl-12 pr-4 text-white placeholder-white/20 font-mono text-sm focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors"
                disabled={loading}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary-container text-on-primary-container py-4 rounded font-display text-base font-black uppercase tracking-wider flex items-center justify-center gap-2 bloom-primary transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                RUNNING DECRYPTION CYCLES...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {isLogin ? 'SECURE INFILTRATION' : 'SECURE ASCENSION'} 
                <ArrowRight size={16} />
              </span>
            )}
          </button>
        </form>

        {/* Cyber bottom decoration */}
        <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[9px] font-label uppercase tracking-widest text-on-surface-variant font-bold">
          <span className="flex items-center gap-1.5"><CornerDownRight size={10} /> ENCRYPTED PROTOCOL</span>
          <span>SSL // TLS v1.3</span>
        </div>
      </motion.div>
    </div>
  );
}

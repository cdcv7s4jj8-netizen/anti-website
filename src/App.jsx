import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Cursor from './components/Cursor.jsx';
import MatrixBackground from './components/MatrixBackground.jsx';
import Landing from './pages/Landing.jsx';
import Auth from './pages/Auth.jsx';
import Dashboard from './pages/Dashboard.jsx';

export default function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);

  // Check user session on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('clipempire_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem('clipempire_user');
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('clipempire_user');
    setUser(null);
    setView('landing');
  };

  const handleNavigate = (targetView) => {
    // If attempting to go to dashboard but not authenticated, send to auth
    if (targetView === 'dashboard' && !user) {
      setView('auth');
    } else {
      setView(targetView);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-on-background selection:bg-primary-container selection:text-on-primary-container font-body cinematic-bg">
      {/* 1. Global Custom Trailing Cursor */}
      <Cursor />

      {/* 2. Global Matrix Plexus Particles Background */}
      <MatrixBackground />

      {/* 3. Global Noise Texture overlay */}
      <div className="noise-overlay" />

      {/* 4. Global Navigation Header */}
      <Header 
        user={user} 
        onLogout={handleLogout} 
        onNavigate={handleNavigate} 
      />

      {/* 5. Main Component Page Routing */}
      <main>
        {view === 'landing' && (
          <Landing onNavigate={handleNavigate} user={user} />
        )}
        {view === 'auth' && (
          <Auth onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />
        )}
        {view === 'dashboard' && user && (
          <Dashboard user={user} />
        )}
      </main>
    </div>
  );
}

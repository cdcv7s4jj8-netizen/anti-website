import React, { useEffect, useState, useRef } from 'react';

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      // Update dot instantly
      setDotPosition({ x, y });
      
      // Background glow effect variables
      const percentX = (x / window.innerWidth) * 100;
      const percentY = (y / window.innerHeight) * 100;
      document.body.style.setProperty('--mouse-x', `${percentX}%`);
      document.body.style.setProperty('--mouse-y', `${percentY}%`);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Track mouse move
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Setup hover triggers on buttons/links
    const addHoverListeners = () => {
      const clickables = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    // Initial setup and polling for dynamic content changes
    addHoverListeners();
    const interval = setInterval(addHoverListeners, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(interval);
    };
  }, []);

  // Smooth lerp for trailing ring
  useEffect(() => {
    let currentX = position.x;
    let currentY = position.y;
    let requestRef;

    const updateRing = () => {
      const targetX = dotPosition.x;
      const targetY = dotPosition.y;

      // Ring lag interpolation (lerp factor: 0.15)
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      setPosition({ x: currentX, y: currentY });
      requestRef = requestAnimationFrame(updateRing);
    };

    requestRef = requestAnimationFrame(updateRing);
    return () => cancelAnimationFrame(requestRef);
  }, [dotPosition]);

  return (
    <>
      {/* Trailing Ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none rounded-full z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen filter blur-[6px] transition-all duration-200 ease-out hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: clicked ? '56px' : hovered ? '64px' : '38px',
          height: clicked ? '56px' : hovered ? '64px' : '38px',
          backgroundColor: clicked 
            ? 'rgba(0, 255, 65, 0.45)' 
            : hovered 
              ? 'rgba(0, 255, 65, 0.15)' 
              : 'rgba(0, 255, 65, 0.25)',
          border: hovered ? '1.5px solid rgba(0, 255, 65, 0.6)' : 'none',
        }}
      />
      {/* Central Cursor Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none rounded-full z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: `${dotPosition.x}px`,
          top: `${dotPosition.y}px`,
          width: hovered ? '8px' : '6px',
          height: hovered ? '8px' : '6px',
          backgroundColor: hovered ? '#ffffff' : '#00ff41',
          boxShadow: '0 0 10px #00ff41',
          transition: 'width 0.15s, height 0.15s, background-color 0.15s',
        }}
      />
    </>
  );
}

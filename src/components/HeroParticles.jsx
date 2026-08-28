import React, { useEffect, useState } from 'react';

const HeroParticles = () => {
  const [particles, setParticles] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Deep cinematic organic particles with extreme depth of field
    const colors = ['#ffffff', '#e0e0e0', '#a0a0a0', '#ffffff']; 
    const newParticles = Array.from({ length: 100 }).map((_, i) => {
      const isGlowParticle = i % 3 === 0; // ~33% soft blurry glowing particles
      const color = colors[i % colors.length];
      const size = Math.random() * (isGlowParticle ? 1.5 : 1) + 1.0; // Smaller particles
      const blur = isGlowParticle ? (Math.random() * 2 + 1) : 0;
      
      return {
        id: i,
        left: Math.random() * 100, 
        top: Math.random() * 100, 
        size: size, 
        delay: Math.random() * 6, 
        duration: Math.random() * 5 + 3.5, // Ethereal 3.5s - 8.5s float cycle
        color: color,
        tx: (Math.random() - 0.5) * 120, 
        ty: -(Math.random() * 140 + 40), // Upward floating movement like lantern embers
        blur: blur,
        peakOpacity: isGlowParticle ? (Math.random() * 0.35 + 0.45) : (Math.random() * 0.3 + 0.3)
      };
    });
    setParticles(newParticles);
    
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden transition-opacity duration-[4000ms] ease-in-out ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full opacity-0 animate-magicalParticle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            filter: `blur(${p.blur}px)`,
            boxShadow: `0 0 ${p.size * 3.5}px ${p.size * 0.8}px ${p.color}`,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            '--peak-opacity': p.peakOpacity,
          }}
        />
      ))}
    </div>
  );
};

export default HeroParticles;

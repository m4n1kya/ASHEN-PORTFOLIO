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
      
      // Truly omnidirectional magical wandering (no upward bias)
      const tx1 = (Math.random() - 0.5) * 100;
      const ty1 = (Math.random() - 0.5) * 100;
      const tx2 = tx1 + (Math.random() - 0.5) * 120;
      const ty2 = ty1 + (Math.random() - 0.5) * 120;
      const tx3 = tx2 + (Math.random() - 0.5) * 140;
      const ty3 = ty2 + (Math.random() - 0.5) * 140;

      return {
        id: i,
        left: Math.random() * 100, 
        top: Math.random() * 100, 
        size: size, 
        delay: Math.random() * 15, 
        duration: Math.random() * 15 + 18, // Even slower & more peaceful (18s - 33s cycle)
        color: color,
        tx1: tx1, ty1: ty1,
        tx2: tx2, ty2: ty2,
        tx3: tx3, ty3: ty3,
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
            '--tx1': `${p.tx1}px`, '--ty1': `${p.ty1}px`,
            '--tx2': `${p.tx2}px`, '--ty2': `${p.ty2}px`,
            '--tx3': `${p.tx3}px`, '--ty3': `${p.ty3}px`,
            '--peak-opacity': p.peakOpacity,
          }}
        />
      ))}
    </div>
  );
};

export default HeroParticles;

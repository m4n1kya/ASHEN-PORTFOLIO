import React, { useEffect, useState } from 'react';

const HeroParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Sparse magical particles distributed across the whole screen
    const newParticles = Array.from({ length: 300 }).map((_, i) => {
      const colors = ['#ffffff', '#e0e0e0', '#a0a0a0', '#737373']; 
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return {
        id: i,
        left: Math.random() * 100, 
        top: Math.random() * 100, 
        size: Math.random() * 2 + 1, 
        delay: Math.random() * 5, 
        duration: Math.random() * 6 + 4,
        color: color,
        tx: (Math.random() - 0.5) * 50, 
        ty: - (Math.random() * 100 + 50), 
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full opacity-0 animate-faintParticle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            boxShadow: `0 0 ${p.size * 2}px ${p.size * 0.5}px ${p.color}`,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
          }}
        />
      ))}
    </div>
  );
};

export default HeroParticles;

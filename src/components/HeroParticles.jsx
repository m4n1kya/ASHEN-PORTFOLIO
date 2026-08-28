import React, { useEffect, useState } from 'react';

const HeroParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Deep cinematic organic particles with extreme depth of field
    const newParticles = Array.from({ length: 150 }).map((_, i) => {
      // Delicate, fine particle size distribution
      const sizePower = Math.pow(Math.random(), 3);
      const isForeground = sizePower > 0.8;
      const size = sizePower * 1.5 + 1; // Max size ~2.5px
      
      // Soft, subtle blur
      const blur = isForeground ? 0 : Math.random() * 1.5 + 0.5;
      
      return {
        id: i,
        left: Math.random() * 100, 
        top: Math.random() * 100, 
        size: size, 
        delay: Math.random() * 15, 
        duration: Math.random() * 20 + 20, 
        color: '#ffffff',
        tx: (Math.random() - 0.5) * 350, 
        ty: (Math.random() - 0.5) * 350, 
        blur: blur,
        peakOpacity: isForeground ? (Math.random() * 0.3 + 0.3) : (Math.random() * 0.15 + 0.1)
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
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
            boxShadow: `0 0 ${p.size * 1.5}px 0px ${p.color}`,
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

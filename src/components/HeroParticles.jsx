import React, { useEffect, useState } from 'react';

const HeroParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Deep cinematic organic particles with extreme depth of field
    const newParticles = Array.from({ length: 240 }).map((_, i) => {
      // Fine-tuned particle size distribution with rich glow
      const sizePower = Math.pow(Math.random(), 3);
      const isForeground = sizePower > 0.8;
      const size = sizePower * 2 + 1.2; // Max size ~3.2px
      
      // Soft, subtle depth blur
      const blur = isForeground ? 0 : Math.random() * 1.0 + 0.2;
      
      return {
        id: i,
        left: Math.random() * 100, 
        top: Math.random() * 100, 
        size: size, 
        delay: Math.random() * 10, 
        duration: Math.random() * 8 + 7, // Active shimmering cycle (7s to 15s)
        color: '#ffffff',
        tx: (Math.random() - 0.5) * 300, 
        ty: (Math.random() - 0.5) * 300, 
        blur: blur,
        peakOpacity: isForeground ? (Math.random() * 0.2 + 0.8) : (Math.random() * 0.3 + 0.45)
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
            boxShadow: `0 0 ${p.size * 3}px rgba(255, 255, 255, 1), 0 0 ${p.size * 7}px rgba(255, 255, 255, 0.6)`,
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

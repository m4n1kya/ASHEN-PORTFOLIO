import React, { useEffect, useState } from 'react';

const HeroParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Deep cinematic organic particles with extreme depth of field
    const newParticles = Array.from({ length: 240 }).map((_, i) => {
      // Fine-tuned delicate particle size distribution
      const sizePower = Math.pow(Math.random(), 3);
      const isForeground = sizePower > 0.8;
      const size = sizePower * 1.8 + 1; // Max size ~2.8px
      
      // Soft, subtle depth blur
      const blur = isForeground ? 0 : Math.random() * 1.2 + 0.3;
      
      return {
        id: i,
        left: Math.random() * 100, 
        top: Math.random() * 100, 
        size: size, 
        delay: Math.random() * 12, 
        duration: Math.random() * 10 + 8, // Faster, active twinkling (8s to 18s)
        color: '#ffffff',
        tx: (Math.random() - 0.5) * 320, 
        ty: (Math.random() - 0.5) * 320, 
        blur: blur,
        peakOpacity: isForeground ? (Math.random() * 0.35 + 0.55) : (Math.random() * 0.25 + 0.25)
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
            boxShadow: `0 0 ${p.size * 2}px rgba(255, 255, 255, 0.9)`,
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

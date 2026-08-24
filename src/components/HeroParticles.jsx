import React, { useEffect, useState } from 'react';

const HeroParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Deep cinematic organic particles with extreme depth of field
    const newParticles = Array.from({ length: 150 }).map((_, i) => {
      // Create a non-linear size distribution (lots of tiny ones, few big ones)
      const sizePower = Math.pow(Math.random(), 3);
      const isForeground = sizePower > 0.8;
      const size = sizePower * 4 + 1;
      
      // Foreground particles are sharp, background particles are heavily blurred
      const blur = isForeground ? Math.random() * 1 : Math.random() * 5 + 1;
      
      return {
        id: i,
        left: Math.random() * 100, 
        top: Math.random() * 100, 
        size: size, 
        delay: Math.random() * 15, 
        duration: Math.random() * 15 + 10, // Very slow drift (10s to 25s)
        color: '#ffffff',
        tx: (Math.random() - 0.5) * 150, // Drift omnidirectionally
        ty: (Math.random() - 0.5) * 150, 
        blur: blur,
        peakOpacity: isForeground ? (Math.random() * 0.4 + 0.4) : (Math.random() * 0.2 + 0.1)
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
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${p.color}`,
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

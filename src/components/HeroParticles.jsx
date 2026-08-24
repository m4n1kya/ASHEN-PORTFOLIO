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
        duration: Math.random() * 20 + 20, // Very slow twinkle (20s to 40s cycle)
        color: '#ffffff',
        tx: (Math.random() - 0.5) * 350, // More movement distance to compensate for longer duration
        ty: (Math.random() - 0.5) * 350, 
        blur: blur,
        peakOpacity: isForeground ? (Math.random() * 0.3 + 0.3) : (Math.random() * 0.15 + 0.1) // Slightly softer peak brightness
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-magicalParticle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            filter: `blur(${p.blur}px)`, // Depth of field
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${p.color}`, // Glow
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

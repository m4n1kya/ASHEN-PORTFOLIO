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
        <svg
          key={p.id}
          className="absolute animate-magicalParticle"
          viewBox="0 0 24 24"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size * 4}px`, // Scaled up because star is thinner than a circle
            height: `${p.size * 4}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            filter: `blur(${p.blur}px) drop-shadow(0 0 ${p.size}px ${p.color})`, // Depth of field + glow
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            '--peak-opacity': p.peakOpacity,
          }}
        >
          <path 
            d="M12 0 C 12 9, 15 12, 24 12 C 15 12, 12 15, 12 24 C 12 15, 9 12, 0 12 C 9 12, 12 9, 12 0 Z" 
            fill={p.color} 
          />
        </svg>
      ))}
    </div>
  );
};

export default HeroParticles;

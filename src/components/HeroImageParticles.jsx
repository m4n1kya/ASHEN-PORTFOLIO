import React, { useEffect, useState } from 'react';

const HeroImageParticles = ({ isHovered }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Helper to generate a center-weighted random number (0 to 1)
    const randomGaussian = () => (Math.random() + Math.random() + Math.random()) / 3;

    // Generate 145 particles (75 ambient, 70 hover-only)
    const newParticles = Array.from({ length: 145 }).map((_, i) => {
      const colors = ['#ffffff', '#e0e0e0', '#a0a0a0', '#737373']; 
      const color = colors[Math.floor(Math.random() * colors.length)];
      const isAmbient = i < 75;
      
      return {
        id: i,
        isAmbient: isAmbient,
        left: randomGaussian() * 100, 
        top: randomGaussian() * 100, 
        size: Math.random() * (isAmbient ? 3 : 5) + (isAmbient ? 2 : 1.5), 
        delay: Math.random() * 5, 
        duration: Math.random() * 4 + 2,
        color: color,
        tx: (Math.random() - 0.5) * 80, 
        ty: - (Math.random() * 100 + 50), 
      };
    });
    setParticles(newParticles);
  }, []);

  const ambientParticles = particles.filter(p => p.isAmbient);
  const hoverParticles = particles.filter(p => !p.isAmbient);

  const renderParticle = (p) => (
    <svg
      key={p.id}
      className="absolute animate-magicalParticle"
      viewBox="0 0 24 24"
      style={{
        left: `${p.left}%`,
        top: `${p.top}%`,
        width: `${p.size * 4}px`, // Scaled up slightly because the star is thinner than a solid circle
        height: `${p.size * 4}px`,
        animationDelay: `${p.delay}s`,
        animationDuration: `${p.duration}s`,
        '--tx': `${p.tx}px`,
        '--ty': `${p.ty}px`,
        '--peak-opacity': 0.8,
      }}
    >
      <defs>
        <filter id={`glow-${p.id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path 
        d="M12 0 C 12 9, 15 12, 24 12 C 15 12, 12 15, 12 24 C 12 15, 9 12, 0 12 C 9 12, 12 9, 12 0 Z" 
        fill={p.color} 
        filter={`url(#glow-${p.id})`}
      />
    </svg>
  );

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] pointer-events-none z-20">
      {/* Original 75 Ambient Particles (Always visible) */}
      <div className="w-full h-full absolute inset-0">
        {ambientParticles.map(renderParticle)}
      </div>

      {/* 150 Hover Particles (Only fade in on hover/touch) */}
      <div className={`w-full h-full absolute inset-0 transition-opacity duration-1000 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        {hoverParticles.map(renderParticle)}
      </div>
    </div>
  );
};

export default HeroImageParticles;

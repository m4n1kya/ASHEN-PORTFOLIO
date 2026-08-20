import React, { useEffect, useState } from 'react';

const HeroImageParticles = ({ isHovered }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Helper to generate a center-weighted random number (0 to 1)
    const randomGaussian = () => (Math.random() + Math.random() + Math.random()) / 3;

    // Generate 175 particles (75 ambient, 100 hover-only)
    const newParticles = Array.from({ length: 175 }).map((_, i) => {
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
        boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${p.color}`,
        '--tx': `${p.tx}px`,
        '--ty': `${p.ty}px`,
      }}
    />
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

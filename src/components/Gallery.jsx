import { useEffect } from 'react';
import gsap from 'gsap';

const Gallery = ({ onBack }) => {
  useEffect(() => {
    // Entrance animation for the gallery content
    window.scrollTo(0, 0);
    
    // Slowly make the background visible again after the transition
    const overlay = document.getElementById('transition-overlay');
    if (overlay) {
      gsap.to(overlay, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => overlay.remove()
      });
    }

    gsap.fromTo(
      ".gallery-content",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 } // delay slightly for overlay fade
    );
  }, []);

  const handleBack = () => {
    // Slowly turn dark again before going back
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background-color:black;opacity:0;z-index:999998;pointer-events:none;';
    overlay.id = 'transition-overlay';
    document.body.appendChild(overlay);

    // Create fixed wrapper for the downward particle swipe
    const particleWrapper = document.createElement('div');
    particleWrapper.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:999999;contain:strict;';
    document.body.appendChild(particleWrapper);

    // Pre-compute all data before touching the DOM
    const colors = ['#ffffff', '#e0e0e0', '#a0a0a0', '#737373'];
    const W = window.innerWidth;
    const H = window.innerHeight;
    const count = 200;
    let longestAnimation = 0;

    // Build all particles into a fragment — single DOM write
    const fragment = document.createDocumentFragment();
    const particleData = [];

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 5 + 1.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const startX = Math.random() * W;
      const startY = -Math.random() * 300 - 50; // Spawn above the screen
      const delay = Math.random() * 0.8;
      const duration = Math.random() * 1.5 + 1.2;
      const endY = H + 200 + Math.random() * 500; // Fly past the bottom
      const endX = startX + (Math.random() - 0.5) * 200;
      const opacity = Math.random() * 0.5 + 0.3;
      const scale = Math.random() * 1.2 + 0.8;

      const p = document.createElement('div');
      p.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background-color:${color};box-shadow:0 0 ${size * 3}px ${size}px ${color};will-change:transform,opacity;transform:translate(${startX}px,${startY}px) scale(0.5);opacity:0;`;

      if (delay + duration > longestAnimation) longestAnimation = delay + duration;

      fragment.appendChild(p);
      particleData.push({ p, startX, startY, endX, endY, opacity, scale, delay, duration });
    }

    // Single DOM append
    particleWrapper.appendChild(fragment);

    // Start all animations after the single DOM append
    particleData.forEach(({ p, startX, startY, endX, endY, opacity, scale, delay, duration }) => {
      gsap.fromTo(p,
        { x: startX, y: startY, opacity: 0, scale: 0.5 },
        {
          x: endX, y: endY, opacity, scale,
          duration, delay,
          ease: 'power2.out',
          force3D: true,
          onComplete: () => p.remove()
        }
      );
    });

    setTimeout(() => {
      if (document.body.contains(particleWrapper)) particleWrapper.remove();
    }, longestAnimation * 1000 + 500);

    gsap.to(overlay, {
      opacity: 1,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(".gallery-container", {
          opacity: 0,
          duration: 0.5,
          onComplete: onBack
        });
      }
    });
  };

  return (
    <div className="gallery-container min-h-screen w-full bg-transparent relative z-[200] flex flex-col pt-20 px-5 md:px-20">
      
      {/* Sleek Back Button */}
      <button 
        onClick={handleBack}
        className="group relative z-10 w-fit flex items-center gap-3 px-6 py-3 bg-transparent border border-white-50/20 text-white-50 rounded-full hover:border-white hover:text-white transition-all duration-300"
      >
        <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
        <span className="text-sm uppercase tracking-widest font-semibold">Back to Portfolio</span>
      </button>

      {/* Main Content Area */}
      <div className="gallery-content flex-1 flex flex-col justify-center items-center h-full pb-20">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-widest text-center">
          SCREENSHOT LIBRARY
        </h1>
        <p className="text-white-50 md:text-lg tracking-widest uppercase opacity-70">
          (Coming Soon)
        </p>
      </div>

    </div>
  );
};

export default Gallery;

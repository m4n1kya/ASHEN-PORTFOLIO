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
    overlay.id = 'transition-overlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.backgroundColor = 'black';
    overlay.style.opacity = '0';
    overlay.style.zIndex = '999998';
    overlay.style.pointerEvents = 'none';
    document.body.appendChild(overlay);

    // Create a temporary fixed wrapper for the massive particle swipe (top to bottom)
    const particleWrapper = document.createElement('div');
    particleWrapper.style.position = 'fixed';
    particleWrapper.style.top = '0';
    particleWrapper.style.left = '0';
    particleWrapper.style.width = '100vw';
    particleWrapper.style.height = '100vh';
    particleWrapper.style.pointerEvents = 'none';
    particleWrapper.style.zIndex = '999999';
    document.body.appendChild(particleWrapper);

    const colors = ['#ffffff', '#e0e0e0', '#a0a0a0', '#737373']; 
    let longestAnimation = 0;

    for (let i = 0; i < 200; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 5 + 1.5; 
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      p.style.position = 'absolute';
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.backgroundColor = color;
      p.style.borderRadius = '50%';
      p.style.boxShadow = `0 0 ${size * 3}px ${size * 1}px ${color}`;
      
      // Spawn ABOVE the screen
      const startX = Math.random() * window.innerWidth;
      const startY = -Math.random() * 300 - 50; 
      
      gsap.set(p, { x: startX, y: startY, opacity: 0, scale: 0.5 });
      particleWrapper.appendChild(p);
      
      // Animate aggressively towards the bottom
      const delay = Math.random() * 0.8; 
      const duration = Math.random() * 1.5 + 1.2; 
      const endY = window.innerHeight + 200 + Math.random() * 500; // Fly well past the bottom
      const endX = startX + (Math.random() - 0.5) * 200; // Slight horizontal drift
      
      if (delay + duration > longestAnimation) {
        longestAnimation = delay + duration;
      }

      gsap.to(p, {
        y: endY,
        x: endX,
        opacity: Math.random() * 0.5 + 0.3,
        scale: Math.random() * 1.2 + 0.8, 
        duration: duration,
        delay: delay,
        ease: "power3.in", // Accelerate massively downwards
        onComplete: () => p.remove()
      });
    }

    // Cleanup the wrapper once the absolute longest particle finishes flying
    setTimeout(() => {
      if (document.body.contains(particleWrapper)) {
        document.body.removeChild(particleWrapper);
      }
    }, longestAnimation * 1000 + 500);

    gsap.to(overlay, {
      opacity: 1,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        // Fade out gallery content
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

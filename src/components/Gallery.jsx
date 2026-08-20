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

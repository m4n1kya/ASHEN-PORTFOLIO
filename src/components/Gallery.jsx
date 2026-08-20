import { useEffect } from 'react';
import gsap from 'gsap';

const Gallery = ({ onBack }) => {
  useEffect(() => {
    // Entrance animation for the gallery content
    window.scrollTo(0, 0);
    
    gsap.fromTo(
      ".gallery-content",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const handleBack = () => {
    // Fade out gallery before returning home
    gsap.to(".gallery-container", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: onBack
    });
  };

  return (
    <div className="gallery-container min-h-screen w-full bg-black relative z-[200] flex flex-col pt-20 px-5 md:px-20">
      
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

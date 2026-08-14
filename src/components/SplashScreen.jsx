import { useState, useEffect } from 'react';

const SplashScreen = () => {
  const [isEntered, setIsEntered] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!isEntered) {
      document.body.style.overflow = 'hidden'; // Lock scrolling
    } else {
      document.body.style.overflow = ''; // Unlock scrolling
    }
  }, [isEntered]);

  const handleEnter = () => {
    // Start fade out animation
    setIsFading(true);
    
    // Wait for the CSS transition to finish before completely unmounting
    setTimeout(() => {
      setIsEntered(true);
    }, 800);
  };

  if (isEntered) return null;

  return (
    <div 
      className={`fixed inset-0 z-[99999] bg-black flex flex-col justify-center items-center transition-opacity duration-700 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Subtle radial glow in the background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none" />
      
      {/* Logo/Brand Name */}
      <h1 className="text-white-50 text-2xl md:text-4xl font-bold tracking-[0.2em] mb-12">
        ASHEN
      </h1>
      
      {/* Animated Enter Button */}
      <button 
        onClick={handleEnter}
        className="group relative px-8 py-3 bg-transparent border border-white-50/30 text-white-50 rounded-full overflow-hidden transition-all duration-500 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
      >
        {/* Fill effect on hover */}
        <div className="absolute inset-0 bg-white-50 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
        
        {/* Text */}
        <span className="relative z-10 text-sm md:text-base font-semibold tracking-widest uppercase group-hover:text-black transition-colors duration-500">
          Enter Experience
        </span>
      </button>
      
      {/* Disclaimer */}
      <p className="absolute bottom-10 text-xs md:text-sm text-white-50/50 tracking-widest uppercase">
        Sound Required
      </p>
    </div>
  );
};

export default SplashScreen;

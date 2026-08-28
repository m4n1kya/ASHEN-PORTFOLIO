import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IntroScreen = () => {
  const introRef = useRef(null);

  useEffect(() => {
    // Parallax fade-out effect as the main content scrolls up over this screen
    gsap.to(introRef.current, {
      yPercent: 20, // Moves down slightly to create depth
      opacity: 0,
      scale: 0.95,
      ease: 'none',
      scrollTrigger: {
        trigger: '.home-container', // The sliding element that comes up from the bottom
        start: 'top bottom', // When the top of home-container hits the bottom of the viewport
        end: 'top top', // When the top of home-container hits the top of the viewport
        scrub: true,
      }
    });
  }, []);

  return (
    <div 
      ref={introRef}
      className="fixed inset-0 w-screen h-screen z-0 overflow-hidden flex items-center justify-center bg-[#0c0c0e]"
    >
      {/* Fallback gradient if video fails/loads slowly */}
      <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent" />
      
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 grayscale brightness-150 contrast-125 mix-blend-screen"
        src="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-in-slow-motion-11883-large.mp4"
      />

      {/* SVG Mask Layer */}
      <svg width="100%" height="100%" className="absolute inset-0 z-10 pointer-events-none">
        <defs>
          <mask id="cutout-text">
            {/* White makes the overlay rect visible */}
            <rect width="100%" height="100%" fill="white" />
            {/* Black makes the overlay rect transparent, revealing the video beneath! */}
            <text 
              x="50%" 
              y="50%" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              fill="black" 
              className="font-black text-[16vw] md:text-[18vw] uppercase tracking-tighter"
              style={{ fontFamily: '"Mona Sans", sans-serif' }}
            >
              MANIKYA
            </text>
          </mask>
        </defs>

        {/* The solid background that covers the video, with a hole cut in the shape of the text */}
        <rect width="100%" height="100%" fill="#0c0c0e" mask="url(#cutout-text)" />
      </svg>

      {/* UI Elements (Sit on top of the mask) */}
      <div className="absolute inset-0 z-20 pointer-events-none p-6 md:p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="text-white-50 font-medium text-sm md:text-base leading-relaxed max-w-xs drop-shadow-md">
            Not a style, a perspective.<br />
            Because Manikya is everything.
          </div>
          <div className="text-white-50 text-xs md:text-sm uppercase tracking-widest font-bold border border-white-50/20 px-4 py-2 rounded-full backdrop-blur-sm bg-black/20">
            Scroll to explore
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="text-white-50 text-xs md:text-sm font-medium drop-shadow-md">
            Creative Engineer
          </div>
          <div className="text-white-50 text-xs md:text-sm font-medium uppercase tracking-widest flex gap-4 drop-shadow-md">
            <span>Engineering</span>
            <span>/</span>
            <span>Realities</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;

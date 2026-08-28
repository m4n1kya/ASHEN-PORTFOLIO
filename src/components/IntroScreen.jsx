import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaskedHeading from './reactbits/MaskedHeading';

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
      
      {/* Masked Heading Component from React Bits */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <MaskedHeading
          text="MANIKYA"
          mediaType="image"
          src="/images/bermuda-triangle-event.jpg"
          fillScale={1.4}
          parallax={120}
          reveal="none"
          trigger="view"
          textScale={0.16}
          className="w-full font-black uppercase tracking-tighter text-center"
          style={{ fontFamily: '"Mona Sans", sans-serif' }}
        />
      </div>

      {/* UI Elements (Sit on top of the mask) */}
      <div className="absolute inset-0 z-20 pointer-events-none p-6 md:p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="text-white-50 font-medium text-sm md:text-base leading-relaxed max-w-xs drop-shadow-md">
            DESIGNED WITH INTENT
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

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
          src="/images/rocky-coastal-landscape.jpg"
          fillScale={1.8}
          parallax={120}
          reveal="none"
          trigger="view"
          textScale={0.15}
          className="w-full font-black uppercase tracking-tighter text-center"
          style={{ fontFamily: '"Syne", sans-serif' }}
        />
      </div>

    </div>
  );
};

export default IntroScreen;

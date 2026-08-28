import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaskedHeading from './reactbits/MaskedHeading';
import HeroParticles from './HeroParticles';

gsap.registerPlugin(ScrollTrigger);

const IntroScreen = () => {
  const introRef = useRef(null);

  useEffect(() => {
    // Zoom and fade out effect to reveal the Hero area underneath
    gsap.to(introRef.current, {
      scale: 30, // massive zoom to go through the text
      autoAlpha: 0,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.hero-pin-wrapper',
        pin: true,
        start: 'top top',
        end: '+=150%', // Scroll 1.5x screen height to complete zoom
        scrub: true,
      }
    });
  }, []);

  return (
    <div 
      ref={introRef}
      className="absolute inset-0 w-full h-full z-0 overflow-hidden flex items-center justify-center bg-[#0c0c0e] will-change-transform"
    >
      
      <HeroParticles containerClassName="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" />
      
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
          textScale={0.16}
          className="w-full font-black uppercase text-center"
          style={{ fontFamily: '"Mona Sans", sans-serif' }}
        />
      </div>

    </div>
  );
};

export default IntroScreen;

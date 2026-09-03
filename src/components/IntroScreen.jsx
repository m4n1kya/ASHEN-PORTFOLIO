import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroParticles from './HeroParticles';

gsap.registerPlugin(ScrollTrigger);

const CSSMaskedHeading = ({ text, src, parallax = 120 }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetX = nx * -parallax;
      targetY = ny * -parallax;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      setOffset({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', onMove);
    rafId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, [parallax]);

  return (
    <h1 
      className="w-full font-black uppercase text-center"
      style={{ 
        fontFamily: '"Mona Sans", sans-serif',
        fontSize: '18vw',
        lineHeight: '0.85',
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: `calc(50% + ${offset.x}px) calc(50% + ${offset.y}px)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {text}
    </h1>
  );
};

const IntroScreen = () => {
  const introRef = useRef(null);

  useEffect(() => {
    // Zoom and fade out effect to reveal the Hero area underneath
    gsap.to(introRef.current, {
      scale: 10, // Safe zoom level
      autoAlpha: 0,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.hero-pin-wrapper',
        pin: true,
        start: 'top top',
        end: '+=150%', // Scroll 1.5x screen height to complete zoom
        scrub: true,
        onUpdate: (self) => {
          if (introRef.current) {
            if (self.progress > 0.8) {
              introRef.current.style.pointerEvents = 'none';
            } else {
              introRef.current.style.pointerEvents = 'auto';
            }
          }
        }
      }
    });
  }, []);

  return (
    <div 
      ref={introRef}
      className="absolute inset-0 w-full h-full z-0 overflow-hidden flex items-center justify-center bg-[#0c0c0e] pointer-events-auto"
    >
      
      <HeroParticles containerClassName="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" />
      
      {/* CSS-based Masked Heading (100% immune to GSAP scaling crashes) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <CSSMaskedHeading
          text="MANIKYA"
          src="/images/rocky-coastal-landscape.webp"
          parallax={120}
        />
      </div>
    </div>
  );
};

export default IntroScreen;

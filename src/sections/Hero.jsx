import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AnimatedCounter from "../components/AnimatedCounter";
import { words } from "../constants";
import HeroImageParticles from "../components/HeroImageParticles";
import HeroParticles from "../components/HeroParticles";
import ShinyText from "../components/reactbits/ShinyText";
import FoldText from "../components/reactbits/FoldText";

gsap.registerPlugin(ScrollTrigger);

const CSSMaskedHeading = ({ text, src, parallax = 120, fontSize = '18vw', className = '' }) => {
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
      className={`w-full font-black uppercase text-center ${className}`}
      style={{ 
        fontFamily: '"Mona Sans", sans-serif',
        fontSize: fontSize,
        lineHeight: '0.85',
        backgroundImage: `url(${src})`,
        backgroundSize: '120%',
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



const Hero = ({ onNavigateToGallery, hasLoadedOnce, setShowNav }) => {
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const lanternImgRef = useRef(null);
  const [isLanternHovered, setIsLanternHovered] = useState(false);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );

    // MASTER SEQUENCE TIMELINE
    // No pin — after animation completes, user scrolls naturally into Overview
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2000",
        scrub: true, // changed from 1 to true to remove the 1-second catchup lag
        pin: true,
        invalidateOnRefresh: true, // recalculate window.innerWidth on resize
        onUpdate: (self) => {
          if (self.progress > 0.35) {
            if (setShowNav) setShowNav(true);
          } else {
            if (setShowNav) setShowNav(false);
          }
        }
      }
    });

    // 1. ZOOM IN AND FADE OUT INTRO (0% to ~40% of scroll)
    tl.to(introRef.current, {
      scale: 10,
      autoAlpha: 0,
      ease: "power2.inOut",
      onUpdate: function() {
        if (this.progress() > 0.8) {
          if (introRef.current) introRef.current.style.pointerEvents = 'none';
        } else {
          if (introRef.current) introRef.current.style.pointerEvents = 'auto';
        }
      }
    }, 0);

    // Add a small pause where the hero is perfectly visible before scrolling horizontally
    tl.to({}, { duration: 0.2 }); 

    // 2. HORIZONTAL SCROLL: MOVE LEFT TEXT OUT AND LANTERN TO CENTER (~50% to 100% of scroll)
    tl.to(".hero-left-content", {
      x: () => -window.innerWidth,
      opacity: 0,
      ease: "power2.inOut"
    }, ">")
    .to(".hero-right-visual", {
      x: () => window.innerWidth < 1024 ? 0 : -window.innerWidth * 0.25,
      y: () => window.innerWidth < 1024 ? -window.innerHeight * 0.2 : 0,
      scale: 1.25,
      ease: "power2.inOut"
    }, "<")
    .to(".scroll-indicator", {
      opacity: 0,
      ease: "power2.inOut"
    }, "<");

    gsap.fromTo(
      ".scroll-mouse-dot",
      { y: 0, opacity: 1 },
      { y: 10, opacity: 0, duration: 1.5, repeat: -1, ease: "power2.inOut" }
    );
  }, []);



  return (
    <div className="hero-pin-wrapper relative w-full h-screen overflow-hidden" ref={containerRef}>
      
      {/* ── UNDERNEATH: MAIN HERO (TEXT + LANTERN) ── */}
      <section id="hero" className="absolute inset-0 z-0 overflow-hidden w-full h-full">

        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-5 md:px-20 pt-20 lg:pt-0">
          
          {/* LEFT: Hero Content */}
          <header className="flex flex-col justify-center items-center lg:items-start w-full lg:w-[70%] h-[45%] lg:h-full hero-left-content">
            <div className="flex flex-col gap-4 lg:gap-6 w-full items-center lg:items-start">
              <div className="hero-text flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                <div className="mb-2 md:mb-6 w-full flex justify-center lg:justify-start">
                  <CSSMaskedHeading
                    text="MANIKYA"
                    src="/images/rocky-coastal-landscape.webp"
                    parallax={40}
                    className="text-center lg:text-left"
                    fontSize="clamp(4rem, 12vw, 8rem)"
                  />
                </div>
                
                <h1 className="text-white/40 text-[4.5vw] md:text-[24px] lg:text-[32px] font-bold mb-8 tracking-tight mt-2 hidden md:grid grid-cols-2 lg:flex items-center justify-center lg:justify-start whitespace-nowrap leading-none uppercase w-full">
                  <span className="text-white text-right lg:text-left pr-1.5 lg:pr-0">SOFTWARE</span>
                  <span className="slide text-white/40 h-[6vw] md:h-[32px] lg:h-[40px] text-left justify-self-start lg:justify-self-auto lg:ml-2">
                    <span className="wrapper">
                      {words.map((word, index) => (
                        <span
                          key={index}
                          className="flex items-center md:gap-3 gap-2 h-[6vw] md:h-[32px] lg:h-[40px]"
                        >
                          <img
                            src={word.imgPath}
                            alt="icon"
                            className="w-4 h-4 md:w-6 md:h-6 p-[2px] rounded-full bg-white-50"
                          />
                          <span className="text-[4.5vw] md:text-[24px] lg:text-[32px] leading-none">{word.text}</span>
                        </span>
                      ))}
                    </span>
                  </span>
                </h1>
              </div>
            </div>
          </header>

          {/* RIGHT: Visual (Lantern) — click opens Screenshot Gallery */}
          <figure className="w-full lg:w-1/2 flex justify-center items-center relative h-[55%] lg:h-full z-50 hero-right-visual">
            <div 
              className="relative w-full flex justify-center items-center group transition-all duration-300 cursor-pointer"
              onClick={onNavigateToGallery}
              onMouseEnter={() => setIsLanternHovered(true)}
              onMouseLeave={() => setIsLanternHovered(false)}
              title="View Screenshot Library"
            >
              <HeroImageParticles isHovered={isLanternHovered} />
              
              <div className={`absolute inset-0 bg-white/5 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none ${isLanternHovered ? 'opacity-40' : 'opacity-0'}`} />
              
              <img 
                ref={lanternImgRef}
                src="/images/hero-lantern.png" 
                alt="Lantern" 
                className={`h-[300px] md:h-[450px] lg:h-[550px] object-contain relative z-10 transition-all duration-700 animate-floatHover
                  ${isLanternHovered ? 'drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] scale-[1.02]' : 'drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]'}
                `}
              />
            </div>
          </figure>
        </div>

        <div className="absolute bottom-10 lg:top-[90vh] lg:bottom-auto left-1/2 -translate-x-1/2 scroll-indicator z-[999] pointer-events-none opacity-60 mix-blend-screen">
          <div className="w-[16px] h-[28px] rounded-full border-[1.5px] border-white flex justify-center p-1 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            <div className="w-1 h-1 bg-white rounded-full scroll-mouse-dot shadow-[0_0_4px_rgba(255,255,255,1)]"></div>
          </div>
        </div>

        <AnimatedCounter />
      </section>

      {/* ── ON TOP: INTRO SCREEN (GIANT MANIKYA) ── */}
      <div 
        ref={introRef}
        className="absolute inset-0 w-full h-full z-[100] overflow-hidden flex items-center justify-center bg-[#0c0c0e] pointer-events-auto"
      >
        <HeroParticles containerClassName="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" />
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <CSSMaskedHeading
            text="MANIKYA"
            src="/images/rocky-coastal-landscape.webp"
            parallax={120}
          />
        </div>
      </div>

    </div>
  );
};

export default Hero;


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

const FloatingTab = ({ tab, index, side }) => {
   const containerRef = useRef(null);
   const tabRef = useRef(null);
   const yPos = index % 3 === 0 ? '-140px' : index % 3 === 1 ? '0px' : '140px';
   const xPos = side === 'left' ? '-280px' : '280px';

   useGSAP(() => {
     gsap.fromTo(containerRef.current, {
       scale: 0, opacity: 0
     }, {
       scale: 1, opacity: 1, duration: 0.6, delay: (index % 3) * 0.1, ease: "back.out(1.5)"
     });

     // Random bubble floating animation
     const floatTween = () => {
       if (!tabRef.current) return;
       gsap.to(tabRef.current, {
         x: gsap.utils.random(-10, 10),
         y: gsap.utils.random(-10, 10),
         rotation: gsap.utils.random(-3, 3),
         duration: gsap.utils.random(2.5, 4),
         ease: "sine.inOut",
         onComplete: floatTween
       });
     };
     
     // Start floating after entrance animation
     setTimeout(floatTween, 600 + ((index % 3) * 100));
   }, []);

   return (
     <div 
       ref={containerRef}
       className="absolute pointer-events-auto cursor-pointer flex items-center justify-center"
       style={{
         transform: `translate(${xPos}, ${yPos})`,
         zIndex: 100
       }}
       onClick={(e) => {
         e.stopPropagation();
         tab.action();
       }}
     >
        <div ref={tabRef} className="px-7 py-3 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-full text-white font-medium uppercase tracking-[0.2em] text-xs hover:bg-white/15 hover:border-white/40 hover:scale-105 transition-all duration-300 shadow-[0_8px_32px_rgba(255,255,255,0.05),inset_0_1px_2px_rgba(255,255,255,0.2)] whitespace-nowrap">
          {tab.label}
        </div>
      </div>
    );
};

const Hero = ({ onNavigateToOverview, onNavigateToContact, onNavigateToGallery, hasLoadedOnce, setShowNav }) => {
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const lanternImgRef = useRef(null);
  const [isLanternHovered, setIsLanternHovered] = useState(false);
  const [isCentered, setIsCentered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );

    // MASTER SEQUENCE TIMELINE
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3500", // 3500px total scroll distance for the whole sequence
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          if (self.progress > 0.35) {
            if (setShowNav) setShowNav(true);
          } else {
            if (setShowNav) setShowNav(false);
          }

          if (self.progress >= 0.99) {
            setIsCentered(true);
          } else {
            setIsCentered(false);
            setIsMenuOpen(false); // Close menu if user scrolls back up
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

  const handleLanternClick = () => {
    if (!isCentered) return;
    setIsMenuOpen(prev => !prev);
  };

  const tabs = [
    { label: "Overview", action: () => onNavigateToOverview(), side: "left" },
    { label: "Experience", action: () => onNavigateToOverview('experience'), side: "left" },
    { label: "Projects", action: () => {}, side: "left" },
    { label: "Technical Skills", action: () => onNavigateToOverview('skills'), side: "right" },
    { label: "Certifications", action: () => onNavigateToOverview('achievements'), side: "right" },
    { label: "Contact", action: onNavigateToContact, side: "right" },
  ];

  return (
    <div className="hero-pin-wrapper relative w-full h-screen overflow-hidden" ref={containerRef}>
      
      {/* ── UNDERNEATH: MAIN HERO (TEXT + LANTERN) ── */}
      <section id="hero" className="absolute inset-0 z-0 overflow-hidden w-full h-full">
        <HeroParticles />
        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-5 md:px-20 pt-20 lg:pt-0">
          
          {/* LEFT: Hero Content */}
          <header className="flex flex-col justify-center lg:justify-center w-full lg:w-[60%] h-[45%] lg:h-full hero-left-content">
            <div className="flex flex-col gap-4 lg:gap-6">
              <div className="hero-text">
                <h1 className="text-white text-[12vw] md:text-[50px] lg:text-[80px] font-black tracking-tighter leading-[0.85] mb-2 md:mb-6 uppercase">
                  <FoldText
                    text="Manikya"
                    splitBy="char"
                    hinge="top"
                    trigger="mount"
                    duration={0.8}
                    stagger={0.06}
                    delay={hasLoadedOnce ? 0 : 1}
                    ease="power3.out"
                    perspective={700}
                    creaseShading={0.55}
                    fontSize="inherit"
                    fontWeight="inherit"
                    color="inherit"
                  />
                </h1>
                
                <h1 className="text-white-50 text-[4.5vw] md:text-[24px] lg:text-[32px] font-bold mb-8 tracking-tight mt-2 flex items-center whitespace-nowrap leading-none uppercase">
                  SOFTWARE&nbsp;
                  <span className="slide text-white h-[6vw] md:h-[32px] lg:h-[40px]">
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

          {/* RIGHT: Visual (Lantern) */}
          <figure className="w-full lg:w-1/2 flex justify-center items-center relative h-[55%] lg:h-full z-50 hero-right-visual">
            <div 
              className={`relative w-full flex justify-center items-center group transition-all duration-300 ${isCentered ? 'cursor-pointer scale-[1.15] lg:scale-110' : ''}`}
              onClick={handleLanternClick}
              onMouseEnter={() => setIsLanternHovered(true)}
              onMouseLeave={() => setIsLanternHovered(false)}
            >
              <HeroImageParticles isHovered={isLanternHovered} />
              
              <div className={`absolute inset-0 bg-white/5 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none ${isCentered && isLanternHovered ? 'opacity-40' : 'opacity-0'}`} />
              
              <img 
                ref={lanternImgRef}
                src="/images/hero-lantern.png" 
                alt="Lantern" 
                className={`h-[300px] md:h-[450px] lg:h-[550px] object-contain relative z-10 transition-all duration-700
                  ${isCentered && isLanternHovered ? 'drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] scale-[1.02]' : 'animate-floatHover drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]'}
                `}
              />

              {/* Floating Tabs */}
              {isMenuOpen && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[60]">
                  {tabs.map((tab, i) => (
                    <FloatingTab key={tab.label} tab={tab} index={i} side={tab.side} />
                  ))}
                </div>
              )}
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
            src="/images/rocky-coastal-landscape.jpg"
            parallax={120}
          />
        </div>
      </div>

    </div>
  );
};

export default Hero;

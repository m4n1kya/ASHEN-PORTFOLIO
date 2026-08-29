import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import { words } from "../constants";
import HeroImageParticles from "../components/HeroImageParticles";
import ShinyText from "../components/reactbits/ShinyText";
import FoldText from "../components/reactbits/FoldText";

const FloatingTab = ({ tab, index, side }) => {
   const tabRef = useRef(null);
   const yPos = index % 3 === 0 ? '-140px' : index % 3 === 1 ? '0px' : '140px';
   const xPos = side === 'left' ? '-280px' : '280px';

   useGSAP(() => {
     gsap.fromTo(tabRef.current, {
       scale: 0, opacity: 0
     }, {
       scale: 1, opacity: 1, duration: 0.6, delay: (index % 3) * 0.1, ease: "back.out(1.5)"
     });

     gsap.to(tabRef.current, {
       y: "+=15",
       x: "+=10",
       rotation: (Math.random() - 0.5) * 5,
       duration: 2 + Math.random(),
       repeat: -1,
       yoyo: true,
       ease: "sine.inOut"
     });
   }, []);

   return (
     <div 
       ref={tabRef}
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
       <div className="px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full text-white font-medium hover:bg-white/10 hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] whitespace-nowrap">
         {tab.label}
       </div>
     </div>
   );
};

const Hero = ({ onNavigateToOverview, onNavigateToContact, hasLoadedOnce }) => {
  const containerRef = useRef(null);
  const lanternImgRef = useRef(null);
  const [isLanternHovered, setIsLanternHovered] = useState(false);
  const [isCentered, setIsCentered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(() => {
    if (!hasLoadedOnce) {
      gsap.fromTo(
        ".hero-text h1",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
      );
    } else {
      gsap.set(".hero-text h1", { y: 0, opacity: 1 });
    }

    // GSAP Timeline for horizontal scroll lock
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1500", // 1500px of scrolling
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          if (self.progress >= 0.99) {
            setIsCentered(true);
          } else {
            setIsCentered(false);
            setIsMenuOpen(false); // Close menu if user scrolls back up
          }
        }
      }
    });

    // Move left content out and fade it
    tl.to(".hero-left-content", {
      x: () => -window.innerWidth * 0.5,
      opacity: 0,
      ease: "power2.inOut"
    }, 0);

    // Right visual is currently taking the right half of the screen on desktop.
    // To center it exactly, we shift it left by 25vw on desktop.
    tl.to(".hero-right-visual", {
      x: () => -window.innerWidth * 0.25,
      ease: "power2.inOut"
    }, 0);

    gsap.fromTo(".scroll-indicator",
      { opacity: 0.6 },
      {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300", 
          scrub: true,
        },
      }
    );

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
    { label: "Overview", action: onNavigateToOverview, side: "left" },
    { label: "Experience", action: () => {}, side: "left" },
    { label: "Projects", action: () => {}, side: "left" },
    { label: "Technical Skills", action: () => {}, side: "right" },
    { label: "Certifications", action: () => {}, side: "right" },
    { label: "Contact", action: onNavigateToContact, side: "right" },
  ];

  return (
    <section id="hero" className="relative overflow-hidden w-full h-screen" ref={containerRef}>
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-between px-5 md:px-20">
        
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center w-full lg:w-[60%] h-full hero-left-content">
          <div className="flex flex-col gap-6">
            <div className="hero-text">
              <h1 className="text-white text-[12vw] md:text-[50px] lg:text-[80px] font-black tracking-tighter leading-[0.85] mb-4 md:mb-6 uppercase">
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

            <p className="text-white-50 md:text-lg lg:text-xl relative z-10 pointer-events-none mt-4 font-medium max-w-2xl leading-relaxed">
              Turning <ShinyText text="impossible ideas" className="text-white font-bold" speed={3.5} /> into engineered <ShinyText text="realities" className="text-white font-bold" speed={3.5} />.
            </p>
          </div>
        </header>

        {/* RIGHT: Visual */}
        <figure className="w-full lg:w-1/2 flex justify-center items-center relative h-full z-50 hero-right-visual">
          <div 
            className={`relative w-full flex justify-center items-center group transition-all duration-300 ${isCentered ? 'cursor-pointer scale-110' : ''}`}
            onClick={handleLanternClick}
            onMouseEnter={() => isCentered && setIsLanternHovered(true)}
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

      <div className="absolute top-[90vh] left-1/2 -translate-x-1/2 scroll-indicator z-[999] pointer-events-none opacity-60 mix-blend-screen">
        <div className="w-[16px] h-[28px] rounded-full border-[1.5px] border-white flex justify-center p-1 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          <div className="w-1 h-1 bg-white rounded-full scroll-mouse-dot shadow-[0_0_4px_rgba(255,255,255,1)]"></div>
        </div>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;

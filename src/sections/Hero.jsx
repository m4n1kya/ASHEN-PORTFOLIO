import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import HeroImageParticles from "../components/HeroImageParticles";

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

const Hero = ({ onNavigateToOverview, onNavigateToContact }) => {
  const [isLanternHovered, setIsLanternHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLanternClick = () => {
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
    <section id="hero" className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div 
        className="relative flex justify-center items-center group transition-all duration-300 cursor-pointer scale-110"
        onClick={handleLanternClick}
        onMouseEnter={() => setIsLanternHovered(true)}
        onMouseLeave={() => setIsLanternHovered(false)}
      >
        <HeroImageParticles isHovered={isLanternHovered} />
        
        <div className={`absolute inset-0 bg-white/5 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none ${isLanternHovered ? 'opacity-40' : 'opacity-0'}`} />
        
        <img 
          src="/images/hero-lantern.png" 
          alt="Lantern" 
          className={`h-[300px] md:h-[450px] lg:h-[550px] object-contain relative z-10 transition-all duration-700
            ${isLanternHovered ? 'drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] scale-[1.02]' : 'animate-floatHover drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]'}
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
    </section>
  );
};

export default Hero;

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { expCards } from "../constants";
import SpotlightCard from "./reactbits/SpotlightCard";
import Magnet from "./reactbits/Magnet";
import ShinyText from "./reactbits/ShinyText";
import Galaxy from "./reactbits/Galaxy";
import BlobTextReveal from "./reactbits/BlobTextReveal";
import TickerScroll from "./reactbits/TickerScroll";
import AccordionGallery from "./reactbits/AccordionGallery";
import InfiniteSpiral from "./reactbits/InfiniteSpiral";

gsap.registerPlugin(ScrollTrigger);

const spiralImages = [
  { src: '/images/spiral/Screenshot 2026-08-23 155500.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-23 155333.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-23 155311.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-23 155258.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-23 155233.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-23 155209.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-23 155159.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-23 155130.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-23 155110.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-23 155012.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-23 154953.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-24 144308.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-24 144322.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-24 144339.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-24 144423.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-24 144443.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-24 144536.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-28 105348.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-28 105409.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-28 105421.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-28 105439.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-28 105457.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-28 105509.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-28 105522.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-28 104912.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-28 104924.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-28 104948.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-28 105004.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-28 105012.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-28 105025.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-28 105036.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-28 105048.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-28 105058.png', alt: 'Spiral image' },
  { src: '/images/spiral/Screenshot 2026-08-28 105121.png', alt: 'Spiral image' }
];

const galleryItems = [
  { image: '/images/experience/17618539952862.jpg', label: 'BSNL WORKSHOP' },
  { image: '/images/experience/1761853995146.jpg', label: 'C-DAC WORKSHOP' },
  { image: '/images/experience/1761853995774.jpg', label: 'INDUSTRY WORKSHOP' },
  { image: '/images/experience/1761853993904.jpg', label: 'TECH SUMMIT' }
];

const ExperienceWindow = ({ onBack }) => {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  useGSAP(() => {
    // Reveal window content
    gsap.fromTo(
      ".exp-window-fade-up",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    );



  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-[1000] bg-black flex flex-col w-full h-full overflow-hidden">
      {/* Galaxy Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.2}
          glowIntensity={0.2}
          saturation={0.0}
          twinkleIntensity={0.4}
        />
      </div>

      {/* Infinite Spiral Background */}
      <div className="absolute inset-0 z-[1] overflow-hidden opacity-70 flex items-center justify-center pointer-events-none">
        <InfiniteSpiral
          items={spiralImages}
          animationMode="auto"
          speed={0.2}
          radius={350}
          cardWidth={400}
          cardHeight={225}
          verticalSpacing={120}
          perspective={1000}
          cardRadius={10}
          centerScale={1.2}
          edgeBlur={6}
          cardsPerTurn={7}
          pauseOnHover={false}
          imageFit="contain"
        />
      </div>

      {/* Header / Back Button */}
      <div className="absolute top-0 left-0 w-full p-4 md:p-6 z-[50] pointer-events-auto">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-1 md:gap-2 px-3 py-1.5 md:px-5 md:py-2 rounded-full text-white/40 hover:text-white transition-all duration-300 group bg-transparent"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-semibold uppercase text-xs md:text-sm tracking-wider">Back</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="exp-window-scroll flex-1 overflow-y-auto overflow-x-hidden relative z-10 w-full h-full pt-20 pb-40 px-5 md:px-20 xl:px-40">
        
        <div className="w-full mb-16 md:mb-32 flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 exp-window-fade-up">
          <div className="flex-[1.8] text-left w-full flex flex-col relative z-10">
            <BlobTextReveal 
              text="WORK" 
              className="text-white text-[12vw] md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none"
              duration={1.5}
            />
            <BlobTextReveal 
              text="EXPERIENCE" 
              className="text-white/40 text-[12vw] md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none"
              delay={0.2}
              duration={1.5}
            />
          </div>
        </div>

        {/* Vertical Timeline Section */}
        <div className="w-full flex flex-col gap-10 mb-32 pt-10 relative max-w-[1400px] mx-auto">
            {expCards.map((card, index) => (
              <div key={index} className="w-full flex flex-col xl:flex-row gap-10 exp-window-fade-up">
                <div className="w-full">
                  <SpotlightCard
                    className="w-full rounded-2xl p-8 md:p-10 border border-white/10 bg-black/20 backdrop-blur-sm flex flex-col justify-between shadow-2xl"
                    spotlightColor="rgba(217, 236, 255, 0.08)"
                    borderColor="rgba(217, 236, 255, 0.25)"
                  >
                    <div className="flex items-center gap-6 mb-8">
                      <Magnet padding={20} magnetStrength={3}>
                        <div className="w-20 h-20 rounded-2xl shadow-lg border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center shrink-0">
                          <span className="text-white text-3xl font-bold">{card.company.charAt(0)}</span>
                        </div>
                      </Magnet>
                      <div>
                        <h2 className="text-blue-200 text-xl font-bold uppercase tracking-widest">{card.company}</h2>
                        <h1 className="font-semibold text-2xl md:text-3xl text-white tracking-tight">{card.title}</h1>
                      </div>
                    </div>
                    
                    <p className="text-white-50 font-medium text-lg mb-6">{card.date}</p>
                    
                    <div className="w-full pr-4">
                      <ul className="list-disc ms-5 flex flex-col gap-4 text-white/70">
                        {card.responsibilities.map((r, i) => (
                          <li key={i} className="text-lg leading-relaxed">{r}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2">
                      {card.leftContent.map((item, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/60 text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </div>
              </div>
            ))}
        </div>

        {/* Industrial Exposure Section */}
        <div className="mt-40 mb-20 flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 exp-window-fade-up">
          <div className="flex-[1.8] text-left w-full flex flex-col relative z-10">
            <BlobTextReveal 
              text="INDUSTRIAL" 
              className="text-white text-[10vw] md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none"
            />
            <BlobTextReveal 
              text="EXPOSURE" 
              className="text-white/40 text-[10vw] md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none"
              delay={0.1}
            />
          </div>
        </div>

        <div className="relative max-w-[1400px] mx-auto exp-window-fade-up z-10">
           <SpotlightCard
              className="rounded-xl p-8 md:p-12 border border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden relative"
              spotlightColor="rgba(217, 236, 255, 0.08)"
              borderColor="rgba(217, 236, 255, 0.25)"
            >
              {/* Ticker Scroll Background Effect */}
              <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-5 pointer-events-none rotate-3">
                 <TickerScroll speed={30} direction="left" className="text-7xl font-black uppercase tracking-widest text-white">
                    SYSTEM DESIGN • AGILE • CI/CD • WEB3 • 
                 </TickerScroll>
                 <TickerScroll speed={25} direction="right" className="text-7xl font-black uppercase tracking-widest text-white mt-4">
                    CLOUD ARCHITECTURE • STARTUPS • OPEN SOURCE • 
                 </TickerScroll>
              </div>

              <div className="flex flex-col gap-6 relative z-10">
                <h3 className="text-white text-2xl md:text-3xl font-bold tracking-wider uppercase">
                  <ShinyText text="Industry Training & Workshops" className="font-bold" speed={4} />
                </h3>
                <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                  Engaged in multiple industry-level training sessions and technical workshops focused on modern software engineering practices, system design, and emerging technologies.
                </p>
                <ul className="list-disc ms-6 mt-2 flex flex-col gap-4 text-white/70">
                  <li className="text-lg leading-relaxed">Participated in tech-talks and open-source contribution summits.</li>
                  <li className="text-lg leading-relaxed">Exposure to enterprise agile workflows, CI/CD pipeline structures, and team collaboration protocols.</li>
                  <li className="text-lg leading-relaxed">Gained insights into scalability and performance optimization directly from senior industry professionals.</li>
                </ul>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <AccordionGallery
                    items={galleryItems}
                    defaultIndex={1}
                    expandRatio={0.52}
                    trigger="hover"
                  />
                </div>
              </div>
          </SpotlightCard>
        </div>

      </div>
    </div>
  );
};

export default ExperienceWindow;

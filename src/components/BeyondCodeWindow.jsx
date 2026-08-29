import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Galaxy from "./reactbits/Galaxy";
import BlobTextReveal from "./reactbits/BlobTextReveal";
import FlowingMenu from "./reactbits/FlowingMenu";

gsap.registerPlugin(ScrollTrigger);

const beyondItems = [
  { link: '#', text: 'ESCAPE', image: 'https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=600&h=400&fit=crop&sat=-100&auto=format' },
  { link: '#', text: 'LIFESTYLE', image: 'https://images.unsplash.com/photo-1781499455083-6ccc3beb20cd?q=80&w=600&h=400&fit=crop&sat=-100&auto=format' },
  { link: '#', text: 'RESONANCE', image: 'https://images.unsplash.com/photo-1776394254711-4a0d7345269a?q=80&w=600&h=400&fit=crop&sat=-100&auto=format' },
  { link: '#', text: 'ATHLETICS', image: 'https://images.unsplash.com/photo-1781242629922-6f39cc3671cd?q=80&w=600&h=400&fit=crop&sat=-100&auto=format' },
  { link: '#', text: 'PIXELS', image: 'https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=600&h=400&fit=crop&sat=-100&auto=format' }
];

const BeyondCodeWindow = ({ onBack }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Reveal window content
    gsap.fromTo(
      ".beyond-window-fade-up",
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
      <div className="beyond-window-scroll flex-1 overflow-y-auto overflow-x-hidden relative z-10 w-full h-full pt-20 pb-40 px-5 md:px-20 xl:px-40">
        
        <div className="w-full mb-16 md:mb-32 flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 beyond-window-fade-up">
          <div className="flex-[1.8] text-left w-full flex flex-col relative z-10">
            <BlobTextReveal 
              text="BEYOND" 
              className="text-white text-[10vw] md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none"
              duration={1.5}
            />
            <BlobTextReveal 
              text="CODE" 
              className="text-white/40 text-[10vw] md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none"
              delay={0.2}
              duration={1.5}
            />
          </div>
        </div>

        <div className="w-full mb-32 max-w-[1200px] mx-auto beyond-window-fade-up">
           <div style={{ height: '600px', position: 'relative' }} className="rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
              <FlowingMenu 
                items={beyondItems} 
                bgColor="rgba(0,0,0,0.5)" 
                marqueeBgColor="rgba(255,255,255,0.1)"
                marqueeTextColor="#ffffff"
                textColor="rgba(255,255,255,0.7)"
                borderColor="rgba(255,255,255,0.1)"
              />
           </div>
        </div>

      </div>
    </div>
  );
};

export default BeyondCodeWindow;

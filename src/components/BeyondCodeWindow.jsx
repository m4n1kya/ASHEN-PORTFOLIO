import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Hyperspeed from "./reactbits/Hyperspeed";
import BlobTextReveal from "./reactbits/BlobTextReveal";
import FlowingMenu from "./reactbits/FlowingMenu";

gsap.registerPlugin(ScrollTrigger);

const beyondItems = [
  { link: '#', text: 'ESCAPE', image: 'https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=600&h=400&fit=crop&sat=-100&auto=format' },
  { link: '#', text: 'LIFESTYLE', image: 'https://images.unsplash.com/photo-1781499455083-6ccc3beb20cd?q=80&w=600&h=400&fit=crop&sat=-100&auto=format' },
  { link: '#', text: 'ATHLETICS', image: 'https://images.unsplash.com/photo-1781242629922-6f39cc3671cd?q=80&w=600&h=400&fit=crop&sat=-100&auto=format' },
  { link: '#', text: 'RESONANCE', image: 'https://images.unsplash.com/photo-1776394254711-4a0d7345269a?q=80&w=600&h=400&fit=crop&sat=-100&auto=format' },
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
      {/* Hyperspeed Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
        <Hyperspeed 
          effectOptions={{
            "distortion": "turbulentDistortion",
            "length": 400,
            "roadWidth": 10,
            "islandWidth": 2,
            "lanesPerRoad": 3,
            "fov": 90,
            "fovSpeedUp": 150,
            "speedUp": 2,
            "carLightsFade": 0.4,
            "totalSideLightSticks": 20,
            "lightPairsPerRoadWay": 40,
            "shoulderLinesWidthPercentage": 0.05,
            "brokenLinesWidthPercentage": 0.1,
            "brokenLinesLengthPercentage": 0.5,
            "lightStickWidth": [0.12, 0.5],
            "lightStickHeight": [1.3, 1.7],
            "movingAwaySpeed": [60, 80],
            "movingCloserSpeed": [-120, -160],
            "carLightsLength": [12, 80],
            "carLightsRadius": [0.05, 0.14],
            "carWidthPercentage": [0.3, 0.5],
            "carShiftX": [-0.8, 0.8],
            "carFloorSeparation": [0, 5],
            "colors": {
              "roadColor": 526344,
              "islandColor": 657930,
              "background": 0,
              "shoulderLines": 1250072,
              "brokenLines": 1250072,
              "leftCars": [14177983, 6770850, 12732332],
              "rightCars": [242627, 941733, 3294549],
              "sticks": 242627
            }
          }}
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
      <div className="beyond-window-scroll flex-1 overflow-y-auto overflow-x-hidden relative z-10 w-full h-full pt-16 pb-10 px-5 md:px-20 xl:px-40 flex flex-col justify-center">
        
        <div className="w-full mb-8 md:mb-12 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 beyond-window-fade-up">
          <div className="text-center w-full flex flex-row flex-nowrap whitespace-nowrap justify-center gap-x-3 md:gap-x-6 relative z-10">
            <BlobTextReveal 
              text="BEYOND" 
              className="text-white text-[12vw] md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none"
              duration={1.5}
            />
            <BlobTextReveal 
              text="CODE" 
              className="text-white/40 text-[12vw] md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none"
              delay={0.2}
              duration={1.5}
            />
          </div>
        </div>

        <div className="w-full mb-10 max-w-[1200px] mx-auto beyond-window-fade-up">
           <div style={{ height: '450px', position: 'relative' }} className="rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
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

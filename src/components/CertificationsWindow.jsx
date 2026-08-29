import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Galaxy from "./reactbits/Galaxy";
import SpotlightCard from "./reactbits/SpotlightCard";
import BlobTextReveal from "./reactbits/BlobTextReveal";

gsap.registerPlugin(ScrollTrigger);

const CertificationsWindow = ({ onBack }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Reveal window content
    gsap.fromTo(
      ".cert-window-fade-up",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    );

    // Achievements items slide in from left
    gsap.fromTo(
      ".achievement-item-window",
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.5,
        scrollTrigger: {
          trigger: ".achievement-list-window",
          scroller: ".cert-window-scroll",
          start: "top 90%",
          once: true,
        },
      }
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
      <div className="cert-window-scroll flex-1 overflow-y-auto overflow-x-hidden relative z-10 w-full h-full pt-20 pb-40 px-5 md:px-20 xl:px-40">
        
        <div className="w-full mb-16 md:mb-32 flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 cert-window-fade-up">
          <div className="flex-[1.8] text-left w-full flex flex-col">
            <BlobTextReveal 
              text="CERTIFICATIONS" 
              className="text-white text-[10vw] md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none"
              duration={1.5}
            />
            <BlobTextReveal 
              text="& ACHIEVEMENTS" 
              className="text-white/40 text-[10vw] md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none"
              delay={0.2}
              duration={1.5}
            />
          </div>
        </div>

        <div className="w-full mb-32 max-w-[1200px] mx-auto cert-window-fade-up achievement-list-window">
           <SpotlightCard
              className="rounded-xl p-8 md:p-12 border border-white/10 bg-black/40 backdrop-blur-md"
              spotlightColor="rgba(217, 236, 255, 0.08)"
              borderColor="rgba(217, 236, 255, 0.25)"
            >
              <ul className="flex flex-col gap-6 w-full">
                {[
                  <><strong className="text-white">NPTEL Gold Elite (Top 5%)</strong> in Marketing Analytics and Machine Learning certification (May 2025).</>,
                  <>Completed <strong className="text-white">100-day Java coding challenge</strong> focused on DSA with 200+ practice problems solved.</>,
                  <>Earned MERN Stack certification from Ethnus and Blockchain Specialization from University at Buffalo (Oct 2025).</>,
                  <>Served as <strong className="text-white">Disciplinary In-Charge</strong> at Winter Fest 2025, coordinating 15+ team members for a 2000+ attendee event.</>,
                ].map((item, i) => (
                  <li key={i} className="achievement-item-window text-white-50 text-lg md:text-xl flex items-start gap-5 p-6 border border-white/5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors shadow-lg">
                    <span className="text-blue-200 mt-1 text-2xl drop-shadow-[0_0_10px_rgba(191,219,254,0.5)]">✦</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
        </div>

      </div>
    </div>
  );
};

export default CertificationsWindow;

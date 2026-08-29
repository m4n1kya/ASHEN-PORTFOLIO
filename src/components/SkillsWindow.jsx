import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TechIconCardExperience from "./models/tech_logos/TechIconCardExperience";
import SpotlightCard from "./reactbits/SpotlightCard";
import Magnet from "./reactbits/Magnet";
import ShinyText from "./reactbits/ShinyText";
import Galaxy from "./reactbits/Galaxy";
import BlobTextReveal from "./reactbits/BlobTextReveal";
import { techStackIcons, techStackImgs } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const SkillsWindow = ({ onBack }) => {
  const containerRef = useRef(null);
  const pillsRef = useRef(null);

  useGSAP(() => {
    // Reveal window content
    gsap.fromTo(
      ".skills-window-fade-up",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    );

    // 3D tech cards: stagger in from below
    gsap.fromTo(
      ".tech-card-window",
      { y: 60, opacity: 0, scale: 0.92 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.5,
      }
    );

    // Skill category cards: slide up one-by-one
    gsap.fromTo(
      ".skill-category-window",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".skill-category-window",
          scroller: ".skills-window-scroll",
          start: "top 90%",
          once: true,
        },
      }
    );

    // Continuous section wipe effect for categories
    const categories = gsap.utils.toArray(".skill-category-window");
    categories.forEach((cat, i) => {
      if (i === 0) return; // Skip first
      gsap.fromTo(cat, 
        { yPercent: 20, scale: 0.95 },
        {
          yPercent: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: cat,
            scroller: ".skills-window-scroll",
            start: "top bottom",
            end: "top 60%",
            scrub: true,
          }
        }
      );
    });

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
      <div className="skills-window-scroll flex-1 overflow-y-auto overflow-x-hidden relative z-10 w-full h-full pt-20 pb-40 px-5 md:px-20 xl:px-40">
        
        <div className="w-full mb-16 md:mb-32 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 skills-window-fade-up">
          <div className="flex-[1.8] text-left w-full flex flex-col relative z-10">
            <BlobTextReveal 
              text="TECHNICAL" 
              className="text-white text-[12vw] md:text-8xl xl:text-9xl font-black uppercase tracking-tighter leading-none"
              duration={1.5}
            />
            <BlobTextReveal 
              text="ARSENAL" 
              className="text-white/40 text-[12vw] md:text-8xl xl:text-9xl font-black uppercase tracking-tighter leading-none"
              delay={0.2}
              duration={1.5}
            />
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto">

          {/* 3D Tech Icons */}
          <div className="tech-grid mb-32">
            {techStackIcons.map((techStackIcon) => (
              <div
                key={techStackIcon.name}
                className="card-border tech-card-window overflow-hidden group xl:rounded-full rounded-lg bg-black/40 backdrop-blur-md"
              >
                <div className="tech-card-animated-bg" />
                <div className="tech-card-content">
                  <div className="tech-icon-wrapper">
                    <TechIconCardExperience model={techStackIcon} />
                  </div>
                  <div className="padding-x w-full text-center">
                    <p className="font-semibold text-white tracking-widest uppercase">{techStackIcon.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Skill Category Cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
            ref={pillsRef}
          >
            {techStackImgs.map((categoryObj, index) => (
              <SpotlightCard
                key={index}
                className="skill-category-window rounded-xl p-8 relative border border-white/10 hover:border-white/20 transition-all duration-300 bg-black/40 backdrop-blur-md"
                spotlightColor="rgba(217, 236, 255, 0.08)"
                borderColor="rgba(217, 236, 255, 0.25)"
              >
                <h3 className="text-xl md:text-2xl font-bold mb-6 uppercase tracking-wider">
                  <ShinyText text={categoryObj.category} className="text-white font-bold" speed={4} />
                </h3>
                <div className="flex flex-wrap gap-3 relative z-20">
                  {categoryObj.skills.map((skill, i) => (
                    <Magnet key={i} padding={12} magnetStrength={4}>
                      <span className="inline-block px-4 py-2 bg-white/[0.05] text-white-50 text-sm md:text-base font-medium rounded-full border border-white/10 hover:border-white/40 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-default backdrop-blur-sm shadow-xl">
                        {skill}
                      </span>
                    </Magnet>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsWindow;

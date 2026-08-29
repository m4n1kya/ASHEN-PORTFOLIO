import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import SpotlightCard from "../components/reactbits/SpotlightCard";
import Magnet from "../components/reactbits/Magnet";
import ShinyText from "../components/reactbits/ShinyText";
import GlitchText from "../components/GlitchText";
import { techStackIcons, techStackImgs } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const pillsRef = useRef(null);

  useGSAP(() => {
    // 3D tech cards: stagger in from below
    gsap.fromTo(
      ".tech-card",
      { y: 60, opacity: 0, scale: 0.92 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: "#skills",
          start: "top 75%",
          once: true,
        },
      }
    );

    // Skill category cards: slide up one-by-one
    gsap.fromTo(
      ".skill-category",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".skill-category",
          start: "top 85%",
          once: true,
        },
      }
    );

    // Skill pills scatter in from random directions
    gsap.utils.toArray(".skill-pill", pillsRef.current).forEach((pill, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const dist = 60 + Math.random() * 40;
      gsap.fromTo(
        pill,
        {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          opacity: 0,
          scale: 0.5,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          delay: i * 0.04,
          scrollTrigger: {
            trigger: pill,
            start: "top 90%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
      <div id="skills" className="flex-center section-padding">
        <div className="w-full h-full md:px-10 px-5">
          {/* Glitch-text section title */}
          <div className="flex flex-col items-center gap-5 mb-16">
            <div className="hero-badge">
              <p>What I Work With</p>
            </div>
            <GlitchText
              text="TECHNICAL ARSENAL"
              tag="h2"
              className="font-semibold md:text-5xl text-3xl text-center w-full"
              triggerStart="top 82%"
              speed={25}
              settleFactor={0.32}
            />
          </div>

          {/* 3D Tech Icons */}
          <div className="tech-grid mb-20">
            {techStackIcons.map((techStackIcon) => (
              <div
                key={techStackIcon.name}
                className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
              >
                <div className="tech-card-animated-bg" />
                <div className="tech-card-content">
                  <div className="tech-icon-wrapper">
                    <TechIconCardExperience model={techStackIcon} />
                  </div>
                  <div className="padding-x w-full">
                    <p className="font-semibold">{techStackIcon.name}</p>
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
                className="skill-category rounded-xl p-6 relative border border-white/10 hover:border-white/20 transition-all duration-300"
                spotlightColor="rgba(217, 236, 255, 0.08)"
                borderColor="rgba(217, 236, 255, 0.25)"
              >
                <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">
                  <ShinyText text={categoryObj.category} className="text-white font-bold" speed={4} />
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categoryObj.skills.map((skill, i) => (
                    <Magnet key={i} padding={12} magnetStrength={4}>
                      <span className="skill-pill inline-block px-3 py-1 bg-black-200 text-white-50 text-sm font-medium rounded-full border border-white-50/10 hover:border-white-50/40 hover:text-white transition-colors cursor-default">
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
  );
};

export default TechStack;

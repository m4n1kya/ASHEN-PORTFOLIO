import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { abilities } from "../constants";
import SpotlightCard from "../components/reactbits/SpotlightCard";
import ShinyText from "../components/reactbits/ShinyText";
import ScrollFloat from "../components/reactbits/ScrollFloat";
import SplitText from "../components/reactbits/SplitText";

gsap.registerPlugin(ScrollTrigger);

const FeatureCards = () => {
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards reveal with clip-path from left (like a horizontal door opening)
      gsap.utils.toArray(".ability-card", cardsRef.current).forEach((card, i) => {
        gsap.fromTo(
          card,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 0.85,
            ease: "expo.inOut",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // Paragraph fade-up
      gsap.fromTo(
        ".summary-para",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".summary-para",
            start: "top 88%",
            once: true,
          },
        }
      );

      // Profile Image animation
      gsap.fromTo(
        ".profile-img",
        { x: 150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".profile-img",
            start: "top 88%",
            once: true,
          },
        }
      );
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative pb-24 overflow-hidden pt-32 lg:pt-40" ref={cardsRef}>
      {/* ── Section Title ── */}
      <div className="w-full h-full md:px-20 px-5 mb-16 md:mb-24 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* Left Side: Text */}
        <div className="flex-[1.8] text-left w-full">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="top bottom"
            scrollEnd="bottom center"
            stagger={0.02}
            containerClassName="text-white text-[10vw] md:text-7xl lg:text-8xl font-black w-full uppercase tracking-tighter leading-none"
          >
            PROFESSIONAL
          </ScrollFloat>
          <ScrollFloat
            animationDuration={1.2}
            ease="back.inOut(2)"
            scrollStart="top bottom"
            scrollEnd="bottom center"
            stagger={0.02}
            containerClassName="text-white text-[10vw] md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-white/40 mt-2"
          >
            SUMMARY
          </ScrollFloat>
          <p className="summary-para text-white-50 mt-10 md:text-2xl w-full leading-relaxed font-medium text-left">
            Computer Science undergraduate (B.Tech in CSE @ VIT Bhopal,{" "}
            <ShinyText text="CGPA 9.21" className="text-white font-bold" speed={3} />) with
            hands-on experience developing full-stack and AI-based applications. Familiar with
            modern web engineering, <ShinyText text="REST APIs" className="text-white font-bold" speed={3} />, and
            authentication architectures. Strong foundation in Data Structures &amp; Algorithms,
            OOP, DBMS, Operating Systems, and Computer Networks.
          </p>
        </div>

        <div className="flex-1 w-full flex justify-center">
          <img 
            src="/images/profile.jpg" 
            alt="Manikya" 
            data-magnetic="true"
            className="profile-img w-full max-w-sm lg:max-w-md h-auto rounded-2xl object-cover shadow-2xl border border-white/10" 
          />
        </div>

      </div>

      {/* ── Ability Cards ── */}
      <div className="mx-auto w-full md:px-20 px-5 grid-4-cols">
        {abilities.map(({ imgPath, title, desc }) => (
          <SpotlightCard
            key={title}
            className="ability-card flex flex-col gap-4 relative transition-all duration-300 hover:border-white/30"
            spotlightColor="rgba(217, 236, 255, 0.08)"
            borderColor="rgba(217, 236, 255, 0.3)"
          >
            <div className="size-14 flex items-center justify-center rounded-full bg-black-200 border border-white/10 shadow-inner">
              <img src={imgPath} alt={title} className="w-8 h-8 object-contain" />
            </div>
            <h3 className="text-white text-2xl font-semibold mt-2">{title}</h3>
            <SplitText
              text={desc}
              className="text-white-50 text-base leading-relaxed"
              delay={20}
              duration={0.8}
              splitType="words"
              textAlign="left"
            />
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
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

      // Achievements and Exposure items slide in from left
      gsap.fromTo(
        ".achievement-item",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".achievement-item",
            start: "top 88%",
            once: true,
          },
        }
      );
      // Profile Image animation
      gsap.fromTo(
        ".profile-img",
        { scale: 0, opacity: 0, rotation: -45 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.5)",
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
    <section id="about" className="relative pb-24 overflow-hidden pt-10" ref={cardsRef}>
      {/* ── Section Title ── */}
      <div className="w-full text-left mb-16 md:mb-24">
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
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-10">
          <ScrollFloat
            animationDuration={1.2}
            ease="back.inOut(2)"
            scrollStart="top bottom"
            scrollEnd="bottom center"
            stagger={0.02}
            containerClassName="text-white text-[10vw] md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-white/40"
          >
            SUMMARY
          </ScrollFloat>
          <img 
            src="/images/profile.jpg" 
            alt="Manikya" 
            className="profile-img w-28 h-28 md:w-32 md:h-32 rounded-full object-cover filter grayscale contrast-125 brightness-[0.85] border-2 border-white/20 mb-2 md:mb-5 shadow-2xl" 
          />
        </div>
        <p className="summary-para text-white-50 mt-10 md:text-2xl max-w-4xl leading-relaxed font-medium text-left">
          Computer Science undergraduate (B.Tech in CSE @ VIT Bhopal,{" "}
          <ShinyText text="CGPA 9.21" className="text-white font-bold" speed={3} />) with
          hands-on experience developing full-stack and AI-based applications. Familiar with
          modern web engineering, <ShinyText text="REST APIs" className="text-white font-bold" speed={3} />, and
          authentication architectures. Strong foundation in Data Structures &amp; Algorithms,
          OOP, DBMS, Operating Systems, and Computer Networks.
        </p>
      </div>

      {/* ── Ability Cards ── */}
      <div className="mx-auto grid-4-cols">
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

      {/* ── Achievements & Exposure ── */}
      <div className="mt-20 max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <h3 className="text-white text-2xl font-bold mb-6 border-b border-white-50/20 pb-2">
            Achievements &amp; Certifications
          </h3>
          <ul className="flex flex-col gap-4">
            {[
              <><strong className="text-white">NPTEL Gold Elite (Top 5%)</strong> in Marketing Analytics and Machine Learning certification (May 2025).</>,
              <>Completed <strong className="text-white">100-day Java coding challenge</strong> focused on DSA with 200+ practice problems solved.</>,
              <>Earned MERN Stack certification from Ethnus and Blockchain Specialization from University at Buffalo (Oct 2025).</>,
              <>Served as <strong className="text-white">Disciplinary In-Charge</strong> at Winter Fest 2025, coordinating 15+ team members for a 2000+ attendee event.</>,
            ].map((item, i) => (
              <li key={i} className="achievement-item text-white-50 text-base flex items-start gap-3">
                <span className="text-blue-50 mt-1">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <h3 className="text-white text-2xl font-bold mb-6 border-b border-white-50/20 pb-2">
            Industrial Exposure
          </h3>
          <ul className="flex flex-col gap-6">
            {[
              {
                org: "C-DAC Bangalore",
                date: "Sep 2025",
                desc: "Explored high-performance computing environments, supercomputer architecture, parallel computing, and distributed systems through practical demonstrations.",
              },
              {
                org: "BSNL RGMTTC Chennai",
                date: "Oct 2025",
                desc: "Studied telecom infrastructure, routing, switching, network protocols, optical fiber communication, and network architecture through technical sessions.",
              },
            ].map(({ org, date, desc }) => (
              <li key={org} className="achievement-item flex flex-col gap-2">
                <span className="text-white font-bold text-lg">
                  {org} <span className="text-blue-50 text-sm font-normal ml-2">{date}</span>
                </span>
                <span className="text-white-50 text-base leading-relaxed">{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
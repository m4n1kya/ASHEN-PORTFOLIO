import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ScrollFloat from "../components/reactbits/ScrollFloat";

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
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
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section id="achievements" className="relative pb-24 overflow-hidden pt-10" ref={containerRef}>
      <div className="w-full mb-16 md:mb-24 px-5 md:px-20 lg:px-24 flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
        <div className="flex-[1.8] text-left w-full">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="top bottom"
            scrollEnd="bottom center"
            stagger={0.02}
            containerClassName="text-white text-[10vw] md:text-7xl lg:text-8xl font-black w-full uppercase tracking-tighter leading-none"
          >
            CERTIFICATIONS
          </ScrollFloat>
          <ScrollFloat
            animationDuration={1.2}
            ease="back.inOut(2)"
            scrollStart="top bottom"
            scrollEnd="bottom center"
            stagger={0.02}
            containerClassName="text-white text-[10vw] md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-white/40 mt-2"
          >
            & ACHIEVEMENTS
          </ScrollFloat>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-5 lg:px-0 flex flex-col md:flex-row gap-10">
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

export default Achievements;

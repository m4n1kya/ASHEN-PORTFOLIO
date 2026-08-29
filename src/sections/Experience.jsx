import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { expCards } from "../constants";
import SpotlightCard from "../components/reactbits/SpotlightCard";
import Magnet from "../components/reactbits/Magnet";
import ShinyText from "../components/reactbits/ShinyText";

gsap.registerPlugin(ScrollTrigger);

// ── Animated section title: chars rise from clip-path ────────────────────────
const CharRevealTitle = ({ text, sub }) => {
  const titleRef = useRef(null);
  const subRef = useRef(null);

  useGSAP(() => {
    const el = titleRef.current;
    const subEl = subRef.current;
    if (!el) return;

    // Wrap each char in a clip-path container
    const original = el.textContent;
    el.innerHTML = original
      .split("")
      .map((c) =>
        c === " "
          ? '<span style="display:inline-block;width:0.3em"> </span>'
          : `<span class="cr-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="cr-char" style="display:inline-block">${c}</span></span>`
      )
      .join("");

    gsap.fromTo(
      el.querySelectorAll(".cr-char"),
      { y: "105%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.035,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          once: true,
        },
      }
    );

    if (subEl) {
      gsap.fromTo(
        subEl,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subEl,
            start: "top 88%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="hero-badge" ref={subRef}>
        <p>{sub}</p>
      </div>
      <div
        ref={titleRef}
        className="font-semibold md:text-5xl text-3xl text-center w-full"
      >
        {text}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const Experience = () => {
  useGSAP(() => {
    // Timeline cards slide from left with a stronger overshoot
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.fromTo(
        card,
        { xPercent: -100, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    // Timeline line shrinks as you scroll past
    gsap.to(".timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "70% center",
        onUpdate: (self) => {
          gsap.to(".timeline", { scaleY: 1 - self.progress });
        },
      },
    });

    // Experience text blocks fade-in with slight upward drift
    gsap.utils.toArray(".expText").forEach((text) => {
      gsap.fromTo(
        text,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 65%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section id="experience" className="flex-center md:mt-40 mt-20 section-padding xl:px-0">
        <div className="w-full h-full md:px-20 px-5">
          <CharRevealTitle
            title="Professional Work Experience"
            sub="My Career Overview"
          />

          <div className="mt-32 relative">
            <div className="relative z-50 xl:space-y-32 space-y-10">
              {expCards.map((card) => (
                <div key={card.title} className="exp-card-wrapper">
                  <div className="xl:w-2/6">
                    <SpotlightCard
                      className="timeline-card rounded-xl p-8 mb-5 break-inside-avoid-column border border-white/10"
                      spotlightColor="rgba(217, 236, 255, 0.08)"
                      borderColor="rgba(217, 236, 255, 0.25)"
                    >
                      <div className="flex flex-col gap-4">
                        <h3 className="text-white text-xl md:text-2xl font-bold tracking-wider uppercase">
                          <ShinyText text={card.leftTitle} className="font-bold" speed={4} />
                        </h3>
                        <ul className="flex flex-col gap-3 mt-4">
                          {card.leftContent.map((item, index) => (
                            <li
                              key={index}
                              className="text-white-50 text-base md:text-lg font-medium flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-white-50/60 inline-block" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </SpotlightCard>
                  </div>

                  <div className="xl:w-4/6">
                    <div className="flex items-start">
                      <div className="timeline-wrapper">
                        <div className="timeline" />
                        <div className="gradient-line w-1 h-full" />
                      </div>
                      <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                        <Magnet padding={20} magnetStrength={3}>
                          <div className="timeline-logo shadow-lg border border-white/10 bg-black-100">
                            <span className="text-white text-xl md:text-2xl font-bold">M</span>
                          </div>
                        </Magnet>
                        <div>
                          <h2 className="text-blue-50 text-lg md:text-xl font-bold mb-2 uppercase tracking-widest">
                            {card.company}
                          </h2>
                          <h1 className="font-semibold text-2xl md:text-3xl text-white">
                            {card.title}
                          </h1>
                          <p className="my-5 text-white-50 font-medium">{card.date}</p>
                          <p className="text-[#839CB5] italic">Responsibilities</p>
                          <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                            {card.responsibilities.map((r, i) => (
                              <li key={i} className="text-lg leading-relaxed">
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

export default Experience;

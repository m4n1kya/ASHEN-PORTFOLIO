import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import SpotlightCard from "../components/reactbits/SpotlightCard";
import Magnet from "../components/reactbits/Magnet";
import ShinyText from "../components/reactbits/ShinyText";
import SplitText from "../components/reactbits/SplitText";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  useGSAP(() => {
    // Loop through each timeline card and animate them in
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.from(card, {
        xPercent: -100,
        opacity: 0,
        transformOrigin: "left left",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });

    // Animate the timeline height
    gsap.to(".timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "70% center",
        onUpdate: (self) => {
          gsap.to(".timeline", {
            scaleY: 1 - self.progress,
          });
        },
      },
    });

    // Loop through each expText element
    gsap.utils.toArray(".expText").forEach((text) => {
      gsap.from(text, {
        opacity: 0,
        xPercent: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 60%",
        },
      });
    }, "<");
  }, []);

  return (
    <section
      id="experience"
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader
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
                          <li key={index} className="text-white-50 text-base md:text-lg font-medium flex items-center gap-2">
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
                        <h2 className="text-blue-50 text-lg md:text-xl font-bold mb-2 uppercase tracking-widest">{card.company}</h2>
                        <h1 className="font-semibold text-2xl md:text-3xl text-white">{card.title}</h1>
                        <p className="my-5 text-white-50 font-medium">
                          {card.date}
                        </p>
                        <p className="text-[#839CB5] italic">
                          Responsibilities
                        </p>
                        <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                          {card.responsibilities.map(
                            (responsibility, index) => (
                              <li key={index} className="text-lg leading-relaxed">
                                <SplitText
                                  text={responsibility}
                                  tag="span"
                                  className=""
                                  delay={10}
                                  duration={0.6}
                                  splitType="words"
                                  textAlign="left"
                                />
                              </li>
                            )
                          )}
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

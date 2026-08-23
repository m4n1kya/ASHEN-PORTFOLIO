import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import SpotlightCard from "../components/reactbits/SpotlightCard";
import Magnet from "../components/reactbits/Magnet";
import ShinyText from "../components/reactbits/ShinyText";
import { techStackIcons, techStackImgs } from "../constants";

const TechStack = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".tech-card",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
        },
      }
    );
  });

  return (
    <div id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Technical Arsenal"
          sub="What I Work With"
        />
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

        {/* 2D Tech Stack Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {techStackImgs.map((categoryObj, index) => (
            <SpotlightCard 
              key={index} 
              className="rounded-xl p-6 relative border border-white/10 hover:border-white/20 transition-all duration-300"
              spotlightColor="rgba(217, 236, 255, 0.08)"
              borderColor="rgba(217, 236, 255, 0.25)"
            >
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">
                <ShinyText text={categoryObj.category} className="text-white font-bold" speed={4} />
              </h3>
              <div className="flex flex-wrap gap-2">
                {categoryObj.skills.map((skill, i) => (
                  <Magnet key={i} padding={12} magnetStrength={4}>
                    <span className="inline-block px-3 py-1 bg-black-200 text-white-50 text-sm font-medium rounded-full border border-white-50/10 hover:border-white-50/40 hover:text-white transition-colors cursor-default">
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

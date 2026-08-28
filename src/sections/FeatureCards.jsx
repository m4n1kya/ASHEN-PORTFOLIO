import { abilities } from "../constants";
import SpotlightCard from "../components/reactbits/SpotlightCard";
import ShinyText from "../components/reactbits/ShinyText";
import ScrollFloat from "../components/reactbits/ScrollFloat";
import SplitText from "../components/reactbits/SplitText";

const FeatureCards = () => (
  <div id="about" className="w-full section-padding">
    <div className="w-full text-left mb-16 md:mb-24">
      <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='top bottom'
        scrollEnd='bottom center'
        stagger={0.02}
        containerClassName="text-white text-[10vw] md:text-7xl lg:text-8xl font-black w-full uppercase tracking-tighter leading-none"
      >
        PROFESSIONAL
      </ScrollFloat>
      <ScrollFloat
        animationDuration={1.2}
        ease='back.inOut(2)'
        scrollStart='top bottom'
        scrollEnd='bottom center'
        stagger={0.02}
        containerClassName="text-white text-[10vw] md:text-7xl lg:text-8xl font-black w-full uppercase tracking-tighter leading-none text-white/40"
      >
        SUMMARY
      </ScrollFloat>
      <p className="text-white-50 mt-10 md:text-2xl max-w-4xl leading-relaxed font-medium text-left">
        Computer Science undergraduate (B.Tech in CSE @ VIT Bhopal, <ShinyText text="CGPA 9.21" className="text-white font-bold" speed={3} />) with hands-on experience developing full-stack and AI-based applications. Familiar with modern web engineering, <ShinyText text="REST APIs" className="text-white font-bold" speed={3} />, and authentication architectures. Strong foundation in Data Structures & Algorithms, OOP, DBMS, Operating Systems, and Computer Networks.
      </p>
    </div>
    <div className="mx-auto grid-4-cols">
      {abilities.map(({ imgPath, title, desc }) => (
        <SpotlightCard
          key={title}
          className="flex flex-col gap-4 relative transition-all duration-300 hover:border-white/30"
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

    <div className="mt-20 max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
      <div className="flex-1">
        <h3 className="text-white text-2xl font-bold mb-6 border-b border-white-50/20 pb-2">Achievements & Certifications</h3>
        <ul className="flex flex-col gap-4">
          <li className="text-white-50 text-base flex items-start gap-3">
            <span className="text-blue-50 mt-1">✦</span>
            <span><strong className="text-white">NPTEL Gold Elite (Top 5%)</strong> in Marketing Analytics and Machine Learning certification (May 2025).</span>
          </li>
          <li className="text-white-50 text-base flex items-start gap-3">
            <span className="text-blue-50 mt-1">✦</span>
            <span>Completed <strong className="text-white">100-day Java coding challenge</strong> focused on DSA with 200+ practice problems solved.</span>
          </li>
          <li className="text-white-50 text-base flex items-start gap-3">
            <span className="text-blue-50 mt-1">✦</span>
            <span>Earned MERN Stack certification from Ethnus and Blockchain Specialization from University at Buffalo (Oct 2025).</span>
          </li>
          <li className="text-white-50 text-base flex items-start gap-3">
            <span className="text-blue-50 mt-1">✦</span>
            <span>Served as <strong className="text-white">Disciplinary In-Charge</strong> at Winter Fest 2025, coordinating 15+ team members for a 2000+ attendee event.</span>
          </li>
        </ul>
      </div>

      <div className="flex-1">
        <h3 className="text-white text-2xl font-bold mb-6 border-b border-white-50/20 pb-2">Industrial Exposure</h3>
        <ul className="flex flex-col gap-6">
          <li className="flex flex-col gap-2">
            <span className="text-white font-bold text-lg">C-DAC Bangalore <span className="text-blue-50 text-sm font-normal ml-2">Sep 2025</span></span>
            <span className="text-white-50 text-base leading-relaxed">Explored high-performance computing environments, supercomputer architecture, parallel computing, and distributed systems through practical demonstrations.</span>
          </li>
          <li className="flex flex-col gap-2">
            <span className="text-white font-bold text-lg">BSNL RGMTTC Chennai <span className="text-blue-50 text-sm font-normal ml-2">Oct 2025</span></span>
            <span className="text-white-50 text-base leading-relaxed">Studied telecom infrastructure, routing, switching, network protocols, optical fiber communication, and network architecture through technical sessions.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default FeatureCards;
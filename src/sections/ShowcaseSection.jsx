import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TiltedCard from "../components/reactbits/TiltedCard";
import Magnet from "../components/reactbits/Magnet";
import ShinyText from "../components/reactbits/ShinyText";
import SplitText from "../components/reactbits/SplitText";
import ScrollFloat from "../components/reactbits/ScrollFloat";

gsap.registerPlugin(ScrollTrigger);

// ── Big diagonal title (Awwwards style) ──────────────────────────────────────
const ProjectsTitle = () => {
  const lineRef = useRef(null);
  const subRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      lineRef.current,
      { y: 80, opacity: 0, skewY: 3 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: lineRef.current, start: "top 85%", once: true },
      }
    );
    gsap.fromTo(
      subRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: { trigger: subRef.current, start: "top 90%", once: true },
      }
    );
  }, []);

  return (
    <div className="w-full mb-16 md:mb-24 flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
      <div className="flex-[1.8] text-left w-full flex flex-wrap items-center gap-x-4 md:gap-x-6 gap-y-2">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="top bottom"
          scrollEnd="bottom center"
          stagger={0.02}
          containerClassName="text-white text-[10vw] md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none"
        >
          SELECTED
        </ScrollFloat>
        <ScrollFloat
          animationDuration={1.2}
          ease="back.inOut(2)"
          scrollStart="top bottom"
          scrollEnd="bottom center"
          stagger={0.02}
          containerClassName="text-white text-[10vw] md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-white/40"
        >
          PROJECTS
        </ScrollFloat>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const AppShowcase = ({ onNavigateToProjects }) => {
  const sectionRef = useRef(null);
  const featuredRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);

  useGSAP(() => {
    // Featured project: slides in from bottom-right
    gsap.fromTo(
      featuredRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );

    // Secondary projects: stagger up from below
    const cards = [project1Ref.current, project2Ref.current, project3Ref.current];
    gsap.fromTo(
      cards,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: cards[0],
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  return (
      <div id="projects" ref={sectionRef} className="app-showcase">
        <div className="w-full">
          <ProjectsTitle />

          {/* ── ASHENRITUAL Featured ── */}
          <div
            ref={featuredRef}
            className="flex flex-col xl:flex-row gap-10 group transition-all duration-500"
          >
            <div className="xl:w-[55%] w-full">
              <TiltedCard maxTilt={10} scale={1} className="border border-white/10 shadow-2xl bg-black-100">
                <img
                  src="/images/ashenritual.png"
                  alt="ASHENRITUAL"
                  className="object-cover w-full h-full rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => onNavigateToProjects && onNavigateToProjects("ashenritual")}
                />
              </TiltedCard>
            </div>
            <div className="xl:w-[45%] w-full flex flex-col justify-center">
              <h2
                className="text-white text-3xl md:text-5xl font-bold leading-tight cursor-pointer hover:text-white-50 transition-colors"
                onClick={() => onNavigateToProjects && onNavigateToProjects("ashenritual")}
              >
                ASHENRITUAL
              </h2>
              <p className="text-blue-50 font-semibold md:text-lg mt-2">
                <ShinyText text="AI-powered menswear e-commerce platform" className="font-semibold" speed={4} />
              </p>
              <SplitText
                text="Combining modern full-stack architecture with intelligent shopping experiences. Features a Next.js / TypeScript frontend with an integrated VESPER AI assistant for virtual try-ons and sizing."
                className="text-white-50 md:text-xl mt-4 max-w-xl leading-relaxed"
                delay={15}
                duration={0.7}
                splitType="words"
                textAlign="left"
              />
              <div className="flex flex-wrap gap-2 mt-6">
                {["Next.js", "TypeScript", "Tailwind CSS", "AI Integration"].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-black-200 text-sm rounded-full text-white-50 border border-white-50/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <Magnet padding={25} magnetStrength={3}>
                  <a
                    href="https://github.com/m4n1kya/ASHENRITUAL"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white-50 transition-colors"
                  >
                    GitHub
                  </a>
                </Magnet>
                <Magnet padding={25} magnetStrength={3}>
                  <a
                    href="https://ashenritual-e2ql.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-6 py-3 rounded-lg border border-white-50 text-white hover:bg-white-50 hover:text-black transition-colors font-semibold"
                  >
                    Live Demo
                  </a>
                </Magnet>
              </div>
            </div>
          </div>

          {/* ── Secondary Projects Grid ── */}
          <div className="mt-10 xl:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="project flex flex-col gap-3" ref={project1Ref}>
              <TiltedCard maxTilt={12} scale={1.03} className="border border-white/10 shadow-xl bg-black-100">
                <img
                  src="/images/uniease.png"
                  alt="UNI-VERSE"
                  className="object-contain w-full h-auto block rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => onNavigateToProjects && onNavigateToProjects("uni-verse")}
                />
              </TiltedCard>
              <div className="flex justify-between items-center mt-2">
                <h2
                  className="text-xl font-bold m-0 cursor-pointer hover:text-white-50 transition-colors"
                  onClick={() => onNavigateToProjects && onNavigateToProjects("uni-verse")}
                >
                  UNI-VERSE
                </h2>
                <div className="flex gap-4">
                  <a href="https://uni-verse-swart.vercel.app/" target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-50 hover:text-white underline">Live</a>
                  <a href="https://github.com/m4n1kya/Uni-Verse" target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-50 hover:text-white underline">GitHub</a>
                </div>
              </div>
              <SplitText
                text="Campus Resource Optimization Ecosystem with AI/NLP interface, MERN stack, and AWS/Firebase architecture."
                className="text-sm text-white-50 leading-relaxed"
                delay={10}
                duration={0.6}
                splitType="words"
                textAlign="left"
              />
            </div>

            <div className="project flex flex-col gap-3" ref={project2Ref}>
              <TiltedCard maxTilt={12} scale={1.03} className="border border-white/10 shadow-xl bg-black-100">
                <img
                  src="/images/ecoloop.png"
                  alt="BEACON"
                  className="object-contain w-full h-auto block rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => onNavigateToProjects && onNavigateToProjects("beacon")}
                />
              </TiltedCard>
              <div className="flex justify-between items-center mt-2">
                <h2
                  className="text-xl font-bold m-0 cursor-pointer hover:text-white-50 transition-colors"
                  onClick={() => onNavigateToProjects && onNavigateToProjects("beacon")}
                >
                  BEACON
                </h2>
                <div className="flex gap-4">
                  <a href="https://beacon-fuqtpoomdhrfdzhksccvvu.streamlit.app/" target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-50 hover:text-white underline">Live</a>
                  <a href="https://github.com/m4n1kya/Beacon" target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-50 hover:text-white underline">GitHub</a>
                </div>
              </div>
              <SplitText
                text="A sustainable platform designed for environmental tracking and resource optimization."
                className="text-sm text-white-50 leading-relaxed"
                delay={10}
                duration={0.6}
                splitType="words"
                textAlign="left"
              />
            </div>

            <div className="project flex flex-col gap-3" ref={project3Ref}>
              <TiltedCard maxTilt={12} scale={1.03} className="border border-white/10 shadow-xl bg-black-100">
                <img
                  src="/images/ashen-vector.png"
                  alt="ASHEN-VECTOR"
                  className="object-contain w-full h-auto block rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => onNavigateToProjects && onNavigateToProjects("ashen-vector")}
                />
              </TiltedCard>
              <div className="flex justify-between items-center mt-2">
                <h2
                  className="text-xl font-bold m-0 cursor-pointer hover:text-white-50 transition-colors"
                  onClick={() => onNavigateToProjects && onNavigateToProjects("ashen-vector")}
                >
                  ASHEN-VECTOR
                </h2>
                <div className="flex gap-4">
                  <a href="https://github.com/m4n1kya/ASHEN-VECTOR" target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-50 hover:text-white underline">GitHub</a>
                </div>
              </div>
              <SplitText
                text="An advanced AI-powered vector search interface and autonomous agent integration ecosystem."
                className="text-sm text-white-50 leading-relaxed"
                delay={10}
                duration={0.6}
                splitType="words"
                textAlign="left"
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default AppShowcase;


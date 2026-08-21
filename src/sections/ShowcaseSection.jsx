import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const featuredRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [featuredRef.current, project1Ref.current, project3Ref.current, project2Ref.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="projects" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        {/* ASHENRITUAL Full Width Featured (Top) */}
        <div ref={featuredRef} className="flex flex-col xl:flex-row gap-10 group transition-all duration-500">
          <GlowCard className="xl:w-[55%] w-full rounded-xl relative flex items-center justify-center">
             <img src="/images/ashenritual.png" alt="ASHENRITUAL" className="object-cover w-full h-full rounded-xl" />
          </GlowCard>
          <div className="xl:w-[45%] w-full flex flex-col justify-center">
            <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">
              ASHENRITUAL
            </h2>
            <p className="text-blue-50 font-semibold md:text-lg mt-2">AI-powered menswear e-commerce platform</p>
            <p className="text-white-50 md:text-xl mt-4 max-w-xl leading-relaxed">
              Combining modern full-stack architecture with intelligent shopping experiences. Features a Next.js / TypeScript frontend with an integrated VESPER AI assistant for virtual try-ons and sizing.
            </p>
            
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="px-3 py-1 bg-black text-sm rounded-full text-white-50 border border-white-50/10">Next.js</span>
              <span className="px-3 py-1 bg-black text-sm rounded-full text-white-50 border border-white-50/10">TypeScript</span>
              <span className="px-3 py-1 bg-black text-sm rounded-full text-white-50 border border-white-50/10">Tailwind CSS</span>
              <span className="px-3 py-1 bg-black text-sm rounded-full text-white-50 border border-white-50/10">AI Integration</span>
            </div>

            <div className="flex gap-4 mt-8">
              <a href="https://github.com/m4n1kya/ASHENRITUAL" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white-50 transition-colors">
                GitHub
              </a>
              <a href="https://ashenritual-e2ql.vercel.app/" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-white-50 text-white hover:bg-white-50 hover:text-black transition-colors font-semibold">
                Live Demo
              </a>
            </div>
          </div>
        </div>

        {/* Secondary Projects Grid */}
        <div className="mt-10 xl:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="project flex flex-col gap-3" ref={project1Ref}>
              <GlowCard className="image-wrapper rounded-xl relative flex items-center justify-center">
                <img
                  src="/images/uniease.png"
                  alt="UNI-EASE"
                  className="object-contain w-full h-auto block rounded-xl"
                />
              </GlowCard>
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-xl font-bold m-0">UNI-EASE</h2>
                <div className="flex gap-4">
                  <a href="https://github.com/m4n1kya/Epics-UniEase" target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-50 hover:text-white underline">GitHub</a>
                </div>
              </div>
              <p className="text-sm text-white-50">Campus Resource Optimization Ecosystem with AI/NLP interface, MERN stack, and AWS/Firebase architecture.</p>
            </div>

            <div className="project flex flex-col gap-3" ref={project3Ref}>
              <GlowCard className="image-wrapper rounded-xl relative flex items-center justify-center">
                <img src="/images/ashen-vector.png" alt="ASHEN-VECTOR" className="object-contain w-full h-auto block rounded-xl" />
              </GlowCard>
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-xl font-bold m-0">ASHEN-VECTOR</h2>
                <div className="flex gap-4">
                  <a href="#" className="text-sm font-semibold text-blue-50 hover:text-white underline">GitHub</a>
                </div>
              </div>
              <p className="text-sm text-white-50">An advanced AI-powered vector search interface and autonomous agent integration ecosystem.</p>
            </div>

            <div className="project flex flex-col gap-3" ref={project2Ref}>
              <GlowCard className="image-wrapper rounded-xl relative flex items-center justify-center">
                <img src="/images/ecoloop.png" alt="ECO-LOOP" className="object-contain w-full h-auto block rounded-xl" />
              </GlowCard>
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-xl font-bold m-0">ECO-LOOP</h2>
                <div className="flex gap-4">
                  <a href="https://github.com/m4n1kya/eco-loop" target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-50 hover:text-white underline">GitHub</a>
                </div>
              </div>
              <p className="text-sm text-white-50">A sustainable platform designed for environmental tracking and resource optimization.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;

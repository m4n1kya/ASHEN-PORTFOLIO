import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
    const cards = [featuredRef.current, project1Ref.current, project2Ref.current, project3Ref.current];

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
        <div className="showcaselayout">
          <div ref={featuredRef} className="first-project-wrapper">
            <div className="image-wrapper group overflow-hidden">
              <img src="/images/ashenritual.png" alt="ASHENRITUAL" className="group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="text-content mt-8">
              <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">
                ASHENRITUAL
              </h2>
              <p className="text-blue-50 font-semibold md:text-lg mt-2">AI-powered menswear e-commerce platform</p>
              <p className="text-white-50 md:text-xl mt-4 max-w-xl">
                Combining modern full-stack architecture with intelligent shopping experiences. Features a Next.js / TypeScript frontend with an integrated VESPER AI assistant for virtual try-ons and sizing.
              </p>
              
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-3 py-1 bg-black-200 text-sm rounded-full text-white-50">Next.js</span>
                <span className="px-3 py-1 bg-black-200 text-sm rounded-full text-white-50">TypeScript</span>
                <span className="px-3 py-1 bg-black-200 text-sm rounded-full text-white-50">Tailwind CSS</span>
                <span className="px-3 py-1 bg-black-200 text-sm rounded-full text-white-50">AI Integration</span>
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

          <div className="project-list-wrapper overflow-hidden flex flex-col gap-10">
            <div className="project flex flex-col gap-3" ref={project1Ref}>
              <div className="image-wrapper bg-[#2d2d38] group overflow-hidden">
                <img
                  src="/images/uniease.png"
                  alt="UNI-EASE"
                  className="group-hover:scale-105 transition-transform duration-500 object-contain"
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-xl font-bold m-0">UNI-EASE</h2>
                <div className="flex gap-4">
                  <a href="https://github.com/m4n1kya/Epics-UniEase" target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-50 hover:text-white underline">GitHub</a>
                </div>
              </div>
              <p className="text-sm text-white-50">Campus Resource Optimization Ecosystem with AI/NLP interface, MERN stack, and AWS/Firebase architecture.</p>
            </div>

            <div className="project flex flex-col gap-3" ref={project2Ref}>
              <div className="image-wrapper bg-[#1c1c21] group overflow-hidden">
                <img src="/images/ecoloop.png" alt="ECO-LOOP" className="group-hover:scale-105 transition-transform duration-500 object-contain" />
              </div>
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

        {/* ASHEN-VECTOR Full Width Featured */}
        <div ref={project3Ref} className="mt-10 xl:mt-20 flex flex-col xl:flex-row gap-10 bg-[#1a1a24]/80 p-5 md:p-10 rounded-2xl border border-white-50/10 group overflow-hidden hover:border-white-50/30 transition-all duration-500">
          <div className="xl:w-[45%] w-full order-2 xl:order-1 flex flex-col justify-center">
            <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
              ASHEN-VECTOR
            </h2>
            <p className="text-blue-50 font-semibold md:text-lg mt-2">Autonomous AI & Vector Search Ecosystem</p>
            <p className="text-white-50 md:text-lg mt-4 max-w-xl leading-relaxed">
              An advanced AI-powered vector search interface integrated with autonomous agents. Engineered to handle complex multi-step reasoning, semantic document retrieval, and contextual data analysis.
            </p>
            
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="px-3 py-1 bg-black text-sm rounded-full text-white-50 border border-white-50/10">Vector DB</span>
              <span className="px-3 py-1 bg-black text-sm rounded-full text-white-50 border border-white-50/10">AI Agents</span>
              <span className="px-3 py-1 bg-black text-sm rounded-full text-white-50 border border-white-50/10">Semantic Search</span>
            </div>

            <div className="flex gap-4 mt-8">
              <a href="#" className="px-6 py-3 rounded-lg border border-white-50 text-white hover:bg-white-50 hover:text-black transition-colors font-semibold">
                GitHub
              </a>
            </div>
          </div>
          <div className="xl:w-[55%] w-full order-1 xl:order-2 rounded-xl overflow-hidden relative flex items-center justify-center">
             <img src="/images/ashen-vector.png" alt="ASHEN-VECTOR" className="group-hover:scale-105 transition-transform duration-700 object-cover w-full h-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;

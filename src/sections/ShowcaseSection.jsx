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
              <img src="/images/project1.png" alt="ASHENRITUAL" className="group-hover:scale-105 transition-transform duration-500" />
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
                <a href="https://github.com/m4n1kya" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white-50 transition-colors">
                  GitHub
                </a>
                <a href="#" className="px-6 py-3 rounded-lg border border-white-50 text-white hover:bg-white-50 hover:text-black transition-colors font-semibold">
                  Live Demo
                </a>
              </div>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden flex flex-col gap-10">
            <div className="project flex flex-col gap-3" ref={project1Ref}>
              <div className="image-wrapper bg-[#2d2d38] group overflow-hidden">
                <img
                  src="/images/project2.png"
                  alt="UNI-EASE"
                  className="group-hover:scale-105 transition-transform duration-500 object-cover"
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-xl font-bold m-0">UNI-EASE</h2>
                <div className="flex gap-4">
                  <a href="https://github.com/m4n1kya" target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-50 hover:text-white underline">GitHub</a>
                  <a href="#" className="text-sm font-semibold text-blue-50 hover:text-white underline">Live</a>
                </div>
              </div>
              <p className="text-sm text-white-50">Campus Resource Optimization Ecosystem with AI/NLP interface, MERN stack, and AWS/Firebase architecture.</p>
            </div>

            <div className="project flex flex-col gap-3" ref={project2Ref}>
              <div className="image-wrapper bg-[#1c1c21] group overflow-hidden">
                <img src="/images/project3.png" alt="Decentralized Application" className="group-hover:scale-105 transition-transform duration-500 object-cover" />
              </div>
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-xl font-bold m-0">Web3 DApp</h2>
                <div className="flex gap-4">
                  <a href="https://github.com/m4n1kya" target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-50 hover:text-white underline">GitHub</a>
                </div>
              </div>
              <p className="text-sm text-white-50">Smart contract architecture using Solidity, Ethereum, Hardhat, and Ganache.</p>
            </div>
            
            <div className="project flex flex-col gap-3" ref={project3Ref}>
              <div className="image-wrapper bg-[#282732] group overflow-hidden">
                <img src="/images/project1.png" alt="Predictive Breast Cancer" className="group-hover:scale-105 transition-transform duration-500 object-cover opacity-70" />
              </div>
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-xl font-bold m-0">Predictive ML System</h2>
                <div className="flex gap-4">
                  <a href="https://github.com/m4n1kya" target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-50 hover:text-white underline">GitHub</a>
                </div>
              </div>
              <p className="text-sm text-white-50">Machine learning pipeline for predictive breast cancer detection.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;

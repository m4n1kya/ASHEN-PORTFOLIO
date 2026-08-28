import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import HeroImageParticles from "../components/HeroImageParticles";
import ShinyText from "../components/reactbits/ShinyText";

const Hero = ({ onNavigateToGallery, hasLoadedOnce }) => {
  const lanternContainerRef = useRef(null);
  const lanternImgRef = useRef(null);
  const [isLanternHovered, setIsLanternHovered] = useState(false);

  useGSAP(() => {
    if (!hasLoadedOnce) {
      gsap.fromTo(
        ".hero-text h1",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
      );
    } else {
      // If we've already loaded once, just ensure they are visible
      gsap.set(".hero-text h1", { y: 0, opacity: 1 });
    }

    gsap.fromTo(".scroll-indicator",
      { opacity: 0.6 },
      {
        opacity: 0,
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "+=300", 
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".scroll-mouse-dot",
      { y: 0, opacity: 1 },
      { y: 10, opacity: 0, duration: 1.5, repeat: -1, ease: "power2.inOut" }
    );
  }, []);

  const handleLanternClick = () => {
    if (!lanternContainerRef.current) return;
    
    // Stop the CSS float animation so GSAP can take over smoothly
    if (lanternImgRef.current) {
      lanternImgRef.current.classList.remove("animate-floatHover");
    }

    // Trigger navigation transition
    if (onNavigateToGallery) {
      onNavigateToGallery();
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="relative z-10 w-full min-h-[80vh] md:min-h-screen flex flex-col lg:flex-row items-center justify-between px-5 md:px-20 pt-32 lg:pt-20 pb-20 lg:pb-32 gap-10 lg:gap-0">
        
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center lg:w-1/2 w-full">
          <div className="flex flex-col gap-6">
            <div className="hero-text">
              <h1 className="text-white text-[8vw] md:text-5xl lg:text-6xl font-bold tracking-tight leading-none mb-2 md:mb-4">
                Manikya
              </h1>
              
              <h1 className="text-blue-50 text-[4vw] md:text-[24px] lg:text-[30px] font-semibold mb-6 tracking-wide mt-2 md:mt-4 flex items-center whitespace-nowrap leading-none">
                SOFTWARE&nbsp;
                <span className="slide text-white h-[6vw] md:h-[32px] lg:h-[40px]">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-2 h-[6vw] md:h-[32px] lg:h-[40px]"
                      >
                        <img
                          src={word.imgPath}
                          alt="icon"
                          className="w-4 h-4 md:w-6 md:h-6 p-1 rounded-full bg-white-50"
                        />
                        <span className="text-[4vw] md:text-[24px] lg:text-[30px] leading-none">{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none mt-2 font-medium max-w-2xl leading-relaxed">
              Turning <ShinyText text="impossible ideas" className="text-white font-semibold" speed={3.5} /> into engineered <ShinyText text="realities" className="text-white font-semibold" speed={3.5} />.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 relative z-10 mt-6 pointer-events-auto">
              <Button
                text="View Projects"
                className="md:w-72 w-full h-14"
                id="projects"
              />
              <a 
                href="/Manikya_N_Resume.pdf" 
                download="Manikya_N_Resume.pdf"
                className="flex items-center justify-center md:w-72 w-full h-14 rounded-lg border border-white-50 text-white-50 hover:bg-white-50 hover:text-black transition-colors duration-300 font-medium uppercase tracking-wider text-sm md:text-base"
              >
                Download Resume
              </a>
            </div>
          </div>
        </header>

        {/* RIGHT: Visual */}
        <figure className="lg:w-1/2 w-full flex justify-center items-center relative mt-24 lg:mt-0 pb-10 lg:pb-0 z-50">
          <div 
            ref={lanternContainerRef} 
            className="relative w-full flex justify-center items-center group cursor-pointer" 
            onClick={handleLanternClick}
            onMouseEnter={() => setIsLanternHovered(true)}
            onMouseLeave={() => setIsLanternHovered(false)}
            onTouchStart={() => setIsLanternHovered(true)}
            onTouchEnd={() => setIsLanternHovered(false)}
            onTouchCancel={() => setIsLanternHovered(false)}
          >
            <HeroImageParticles isHovered={isLanternHovered} />
            
            {/* Added a subtle glow behind the lantern to indicate it is clickable */}
            <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none" />
            
            <img 
              ref={lanternImgRef}
              src="/images/hero-lantern.png" 
              alt="Enter Gallery" 
              title="Click to enter the screenshot gallery"
              className="h-[300px] md:h-[450px] lg:h-[550px] object-contain animate-floatHover relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300"
            />
          </div>
        </figure>
      </div>

      {/* Aesthetic Animated Scroll Indicator (No Text) */}
      <div className="absolute top-[90vh] left-1/2 -translate-x-1/2 scroll-indicator z-[999] pointer-events-none opacity-60 mix-blend-screen">
        <div className="w-[16px] h-[28px] rounded-full border-[1.5px] border-white flex justify-center p-1 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          <div className="w-1 h-1 bg-white rounded-full scroll-mouse-dot shadow-[0_0_4px_rgba(255,255,255,1)]"></div>
        </div>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import HeroParticles from "../components/HeroParticles";
import HeroImageParticles from "../components/HeroImageParticles";

const Hero = ({ onNavigateToGallery, hasLoadedOnce }) => {
  const lanternContainerRef = useRef(null);
  const lanternImgRef = useRef(null);

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

    gsap.to(".scroll-indicator", {
      opacity: 0,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "+=300", 
        scrub: true,
      },
    });

    gsap.fromTo(
      ".scroll-mouse-dot",
      { y: 0, opacity: 1 },
      { y: 10, opacity: 0, duration: 1.5, repeat: -1, ease: "power2.inOut" }
    );
  });

  const handleLanternClick = () => {
    if (!lanternContainerRef.current) return;
    
    // Stop the CSS float animation so GSAP can take over smoothly
    if (lanternImgRef.current) {
      lanternImgRef.current.classList.remove("animate-floatHover");
    }
    
    // Calculate absolute center for the ENTIRE container (image + particles)
    const rect = lanternContainerRef.current.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const containerCenterX = rect.left + rect.width / 2;
    const containerCenterY = rect.top + rect.height / 2;
    const deltaX = centerX - containerCenterX;
    const deltaY = centerY - containerCenterY;
    
    const tl = gsap.timeline({
      onComplete: () => {
        if (onNavigateToGallery) onNavigateToGallery();
      }
    });

    // Make container render above absolutely everything
    gsap.set(lanternContainerRef.current, { zIndex: 99999, position: "relative" });

    // Phase 1: Bring image WITH particles to the exact center of screen
    tl.to(lanternContainerRef.current, {
      x: deltaX,
      y: deltaY,
      duration: 1, // Smooth smooth travel
      ease: "power3.inOut"
    });

    // Phase 2: A little delay (we add a subtle glow/charge up during the delay)
    tl.to(lanternContainerRef.current, {
      scale: 1.15,
      filter: "brightness(1.5)",
      duration: 0.4,
      ease: "power1.inOut"
    }, "+=0.3"); // 0.3s delay before it charges up

    // Phase 3: Zoom past camera
    tl.to(lanternContainerRef.current, {
      scale: 40, // Massive zoom
      opacity: 0,
      duration: 0.8,
      ease: "power4.in"
    });

    // Crossfade the entire home container to black simultaneously with the zoom
    tl.to(".home-container", {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut"
    }, "<"); 
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      <HeroParticles />

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
              Turning <span className="text-white">impossible ideas</span> into engineered <span className="text-white">realities</span>.
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
        <figure className="lg:w-1/2 w-full flex justify-center items-center relative pb-20 lg:pb-0 z-50">
          <div ref={lanternContainerRef} className="relative w-full flex justify-center items-center group cursor-pointer" onClick={handleLanternClick}>
            <HeroImageParticles />
            
            {/* Added a subtle glow behind the lantern to indicate it is clickable */}
            <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <img 
              ref={lanternImgRef}
              src="/images/hero-lantern.png" 
              alt="Enter Gallery" 
              title="Click to enter the screenshot gallery"
              className="h-[300px] md:h-[450px] lg:h-[550px] object-contain animate-floatHover relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300"
            />
          </div>
        </figure>
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 scroll-indicator z-[50] pointer-events-none opacity-50 mix-blend-screen">
        <div className="w-[16px] h-[28px] rounded-full border-[1.5px] border-white flex justify-center p-1 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          <div className="w-1 h-1 bg-white rounded-full scroll-mouse-dot shadow-[0_0_4px_rgba(255,255,255,1)]"></div>
        </div>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;

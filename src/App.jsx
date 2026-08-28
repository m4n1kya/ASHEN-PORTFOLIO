import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroParticles from "./components/HeroParticles";

gsap.registerPlugin(ScrollTrigger);
import Hero from "./sections/Hero";
import Navbar from "./components/NavBar";
import Loader from "./components/Loader";
import ParticleCursor from "./components/ParticleCursor";
import XRayCursor from "./components/XRayCursor";
import GradualBlur from "./components/reactbits/GradualBlur";

// Lazy Loaded Sections
const FeatureCards = React.lazy(() => import("./sections/FeatureCards"));
const Experience = React.lazy(() => import("./sections/Experience"));
const ShowcaseSection = React.lazy(() => import("./sections/ShowcaseSection"));
const LogoShowcase = React.lazy(() => import("./sections/LogoShowcase"));
const TechStack = React.lazy(() => import("./sections/TechStack"));
const Contact = React.lazy(() => import("./sections/Contact"));
const Footer = React.lazy(() => import("./sections/Footer"));
const ProjectsWindow = React.lazy(() => import("./components/ProjectsWindow"));
const Gallery = React.lazy(() => import("./components/Gallery"));

const App = () => {
  const [view, setView] = useState('home');
  const [activeProject, setActiveProject] = useState("ashenritual");
  const [galleryMounted, setGalleryMounted] = useState(false);
  const [projectsMounted, setProjectsMounted] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(() => {
    return sessionStorage.getItem('ashen_has_loaded') === 'true';
  });
  const overlayRef = useRef(null);
  const isTransitioning = useRef(false);
  const scrollPositionRef = useRef(0);

  // Silently preload all the massive Gallery images in the background
  // so that they are instantly available from cache when the user opens the Gallery.
  useEffect(() => {
    const preloadGalleryImages = () => {
      for (let i = 1; i <= 13; i++) {
        const img = new Image();
        img.src = `/images/gallery/screen-${i}.png`;
      }
    };
    // Wait a couple of seconds so we don't impact initial page load, then fetch
    setTimeout(preloadGalleryImages, 2000);
  }, []);

  useEffect(() => {
    if (!hasLoadedOnce) {
      sessionStorage.setItem('ashen_has_loaded', 'true');
    }
  }, [hasLoadedOnce]);

  // Navigate to gallery — True Crossfade
  const navigateToGallery = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    
    // Save scroll position before hiding home container
    scrollPositionRef.current = window.scrollY;

    // Immediately mount the gallery.
    flushSync(() => {
      setHasLoadedOnce(true);
      setGalleryMounted(true);
      setView('gallery');
    });
    sessionStorage.setItem('ashen_has_loaded', 'true');

    // Fade IN the gallery while simultaneously fading OUT the home container
    gsap.fromTo('.gallery-window', 
      { opacity: 0 }, 
      { opacity: 1, duration: 1.5, ease: 'power2.inOut' }
    );

    // Simultaneously fade out the home container
    gsap.to('.home-container', {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      onComplete: () => {
        isTransitioning.current = false;
        const hc = document.querySelector('.home-container');
        if (hc) hc.style.display = 'none';
      },
    });
  }, []);

  // Navigate to Projects Window
  const navigateToProjects = useCallback((projectId) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    // Save scroll position before hiding home container
    scrollPositionRef.current = window.scrollY;

    flushSync(() => {
      setHasLoadedOnce(true);
      setActiveProject(projectId);
      setProjectsMounted(true);
      setView('projects');
    });
    sessionStorage.setItem('ashen_has_loaded', 'true');

    // Fade IN the projects window while fading OUT the home container
    gsap.fromTo('.projects-window', 
      { opacity: 0 }, 
      { opacity: 1, duration: 1.5, ease: 'power2.inOut' }
    );

    gsap.to('.home-container', {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      onComplete: () => {
        isTransitioning.current = false;
        const hc = document.querySelector('.home-container');
        if (hc) hc.style.display = 'none';
      },
    });
  }, []);

  // Navigate back to home
  const navigateToHome = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    const hc = document.querySelector('.home-container');
    if (hc) {
      hc.style.display = 'block';
      // Force ScrollTrigger to recalculate all positions now that display is block
      ScrollTrigger.refresh();
    }

    // Force synchronous layout recalculation so scrolling works flawlessly
    const isFromProjects = document.querySelector('.projects-window') !== null;
    const showcase = document.getElementById('projects');

    if (isFromProjects && showcase) {
      window.scrollTo(0, showcase.offsetTop - 80);
    } else {
      window.scrollTo(0, scrollPositionRef.current);
    }

    // Fade IN the home container
    gsap.fromTo('.home-container', 
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power3.inOut' }
    );

    // Simultaneously fade OUT the active window
    gsap.to('.projects-window, .gallery-window', {
      opacity: 0,
      duration: 1.5,
      ease: 'power3.inOut',
      onComplete: () => {
        // Only unmount AFTER the fade out is fully complete
        flushSync(() => {
          setView('home');
        });
        isTransitioning.current = false;
      }
    });
  }, []);

  return (
    <>
      {/* PERMANENT transition overlay — always in the DOM, controlled via ref.
          This can NEVER be lost, unlike document.createElement overlays. */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'black',
          opacity: 0,
          zIndex: 999999,
          pointerEvents: 'none',
        }}
      />

      <ParticleCursor />
      <XRayCursor isVisible={view === 'home'} />
      
      {/* Home page is ALWAYS mounted — never destroyed/recreated.
          Hidden with display:none ONLY when viewing gallery AND not transitioning. */}
      <div 
        className="home-container relative bg-transparent"
        style={{ display: (view === 'home' || isTransitioning.current) ? 'block' : 'none' }}
      >
        <HeroParticles />
        <Loader hasLoadedOnce={hasLoadedOnce} />
        <Navbar />
        <Hero onNavigateToGallery={navigateToGallery} hasLoadedOnce={hasLoadedOnce} />
        <Suspense fallback={null}>
          <FeatureCards />
          <Experience />
          <ShowcaseSection onNavigateToProjects={navigateToProjects} />
          <LogoShowcase />
          <TechStack />
          <Contact />
          <Footer />
        </Suspense>

        {/* Global Page Blur for scrolling UI */}
        <GradualBlur
          target="page"
          position="bottom"
          height="8rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential={true}
          opacity={1}
          zIndex={900}
        />
        <GradualBlur
          target="page"
          position="top"
          height="4rem"
          strength={1}
          divCount={3}
          curve="bezier"
          exponential={true}
          opacity={0.8}
          zIndex={900}
        />
      </div>

      <Suspense fallback={null}>
        {galleryMounted && view === 'gallery' && (
          <Gallery onBack={navigateToHome} />
        )}

        {projectsMounted && view === 'projects' && (
          <ProjectsWindow onBack={navigateToHome} initialProject={activeProject} />
        )}
      </Suspense>
    </>
  );
};

export default App;

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroParticles from "./components/HeroParticles";

gsap.registerPlugin(ScrollTrigger);
import Hero from "./sections/Hero";
import Loader from "./components/Loader";
import ParticleCursor from "./components/ParticleCursor";
import XRayCursor from "./components/XRayCursor";
import IntroScreen from "./components/IntroScreen";

import FeatureCards from "./sections/FeatureCards";
import Experience from "./sections/Experience";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import TechStack from "./sections/TechStack";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { StaggeredMenu } from "./components/reactbits/StaggeredMenu";

// XRay blob that expands to fullscreen between TechStack and Contact
const BlobExpand = () => {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#contact',
        start: 'top 65%',
        once: true,
        onEnter: () => {
          gsap.timeline()
            .to(ref.current, {
              scale: 70,
              duration: 0.9,
              ease: 'power3.in',
              willChange: 'transform',
            })
            .to(ref.current, {
              opacity: 0,
              duration: 0.35,
              ease: 'power2.out',
            })
            .set(ref.current, { display: 'none' });
        },
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) scale(0)',
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: 'white',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 99998,
        willChange: 'transform',
      }}
    />
  );
};

// Lazy Loaded Windows (Only loaded when opened by user)
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
      // Eagerly preload first 8 images visible in the viewport
      for (let i = 1; i <= 8; i++) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = `/images/gallery/screen-${i}.webp`;
        document.head.appendChild(link);
      }
      // Lazily preload the rest via Image() so they cache without blocking
      for (let i = 9; i <= 34; i++) {
        const img = new Image();
        img.src = `/images/gallery/screen-${i}.webp`;
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
          backgroundColor: '#0c0c0e',
          opacity: 0,
          zIndex: 999999,
          pointerEvents: 'none',
        }}
      />

      <ParticleCursor />
      <XRayCursor isVisible={view === 'home'} />

      {/* ── StaggeredMenu Navigation (fixed, top-left) ── */}
      <div style={{ opacity: hasLoadedOnce ? 1 : 0, transition: 'opacity 1s ease 1.5s', pointerEvents: hasLoadedOnce ? 'auto' : 'none' }}>
        <StaggeredMenu
          position="left"
          isFixed={true}
          displayItemNumbering={true}
          displaySocials={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#000000"
          changeMenuColorOnOpen={true}
          colors={['#1c1c21', '#282732']}
          accentColor="#839cb5"
          items={[
            { label: 'Home',       ariaLabel: 'Back to top',             link: '#', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
            { label: 'About',      ariaLabel: 'Professional Summary',    link: '#about', onClick: () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) },
            { label: 'Experience', ariaLabel: 'Work Experience',         link: '#experience', onClick: () => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' }) },
            { label: 'Projects',   ariaLabel: 'Selected Projects',       link: '#projects', onClick: () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) },
            { label: 'Skills',     ariaLabel: 'Technical Stack',         link: '#skills', onClick: () => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' }) },
            { label: 'Contact',    ariaLabel: 'Get in touch',            link: '#contact', onClick: () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) },
          ]}
          socialItems={[
            { label: 'GitHub',   link: 'https://github.com/m4n1kya' },
            { label: 'LinkedIn', link: 'https://www.linkedin.com/in/manikya-nariyapara' },
          ]}
        />
      </div>

      <Loader hasLoadedOnce={hasLoadedOnce} />
      <div 
        className="home-container relative bg-transparent mt-0 z-10"
        style={{ display: (view === 'home' || isTransitioning.current) ? 'block' : 'none' }}
      >
        <div className="hero-pin-wrapper relative w-full h-screen overflow-hidden">
          {/* Main Hero Content - Sits underneath the IntroScreen */}
          <div className="absolute inset-0 z-0">
            <HeroParticles />
            <Hero onNavigateToGallery={navigateToGallery} hasLoadedOnce={hasLoadedOnce} />
          </div>
          
          {/* Intro Screen - Sits on top and zooms/fades out to reveal Hero */}
          <div className="absolute inset-0 z-[100] pointer-events-none">
            <IntroScreen />
          </div>
        </div>
        
        <FeatureCards />
        
        <Experience />
        <ShowcaseSection onNavigateToProjects={navigateToProjects} />
        <LogoShowcase />
        <TechStack />
        <BlobExpand />
        <Contact />
        <Footer />
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

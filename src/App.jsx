import { useState, useEffect, useRef, useCallback } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import Loader from "./components/Loader";
import ParticleCursor from "./components/ParticleCursor";
import XRayCursor from "./components/XRayCursor";
import ProjectsWindow from "./components/ProjectsWindow";
import Gallery from "./components/Gallery";

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
    if (hc) hc.style.display = 'block';

    // Restore the scroll position instead of jumping to the top
    window.scrollTo(0, scrollPositionRef.current);

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
        <Loader hasLoadedOnce={hasLoadedOnce} />
        <Navbar />
        <Hero onNavigateToGallery={navigateToGallery} hasLoadedOnce={hasLoadedOnce} />
        <FeatureCards />
        <Experience />
        <ShowcaseSection onNavigateToProjects={navigateToProjects} />
        <LogoShowcase />
        <TechStack />
        <Contact />
        <Footer />
      </div>

      {galleryMounted && view === 'gallery' && (
        <Gallery onBack={navigateToHome} />
      )}

      {projectsMounted && view === 'projects' && (
        <ProjectsWindow onBack={navigateToHome} initialProject={activeProject} />
      )}
    </>
  );
};

export default App;

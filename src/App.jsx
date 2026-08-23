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
import Gallery from "./components/Gallery";

const App = () => {
  const [view, setView] = useState('home');
  const [galleryMounted, setGalleryMounted] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(() => {
    return sessionStorage.getItem('ashen_has_loaded') === 'true';
  });
  const overlayRef = useRef(null);
  const isTransitioning = useRef(false);

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

  // Navigate to gallery — Simple smooth fade out
  const navigateToGallery = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    // Fade out the home container
    gsap.to('.home-container', {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        flushSync(() => {
          setHasLoadedOnce(true);
          setGalleryMounted(true);
          setView('gallery');
        });
        sessionStorage.setItem('ashen_has_loaded', 'true');
        isTransitioning.current = false;
      },
    });
  }, []);

  // Navigate back to home
  const navigateToHome = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    flushSync(() => {
      setView('home');
    });

    window.scrollTo(0, 0);

    // Fade the home container back in gently
    gsap.fromTo('.home-container', 
      { opacity: 0 },
      { opacity: 1, duration: 1.0, ease: 'power2.inOut', onComplete: () => {
        isTransitioning.current = false;
      }}
    );
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
          Hidden with display:none when viewing gallery. */}
      <div 
        className="home-container relative bg-transparent"
        style={{ display: view === 'home' ? 'block' : 'none' }}
      >
        <Loader hasLoadedOnce={hasLoadedOnce} />
        <Navbar />
        <Hero onNavigateToGallery={navigateToGallery} hasLoadedOnce={hasLoadedOnce} />
        <FeatureCards />
        <Experience />
        <ShowcaseSection />
        <LogoShowcase />
        <TechStack />
        <Contact />
        <Footer />
      </div>

      {galleryMounted && view === 'gallery' && (
        <Gallery onBack={navigateToHome} />
      )}
    </>
  );
};

export default App;

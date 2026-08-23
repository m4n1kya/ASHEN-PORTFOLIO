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
import AmbientSound from "./components/AmbientSound";
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

  useEffect(() => {
    if (!hasLoadedOnce) {
      sessionStorage.setItem('ashen_has_loaded', 'true');
    }
  }, [hasLoadedOnce]);

  // Navigate to gallery — App owns the overlay, so it ALWAYS works
  const navigateToGallery = useCallback(() => {
    if (isTransitioning.current || !overlayRef.current) return;
    isTransitioning.current = true;

    // Fade overlay to black (particles created by Hero are behind it)
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 1.0,
      ease: 'power2.in',
      onComplete: () => {
        // Screen is now fully black — safe to swap content
        document.querySelectorAll('#particle-wrapper').forEach(el => el.remove());

        // flushSync forces React to synchronously render the Gallery
        // into the DOM BEFORE we try to animate it. No race condition possible.
        flushSync(() => {
          setHasLoadedOnce(true);
          setGalleryMounted(true);
          setView('gallery');
        });
        sessionStorage.setItem('ashen_has_loaded', 'true');

        // Gallery is NOW guaranteed to be in the DOM
        gsap.set('.gallery-container', { opacity: 1 });
        gsap.to('.gallery-content', {
          opacity: 1, y: 0,
          duration: 0.9, ease: 'power3.out', delay: 0.3,
        });

        // Reveal by fading overlay to transparent
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
          onComplete: () => {
            isTransitioning.current = false;
          },
        });
      },
    });
  }, []);

  // Navigate back to home
  const navigateToHome = useCallback(() => {
    if (isTransitioning.current || !overlayRef.current) return;
    isTransitioning.current = true;

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 1.0,
      ease: 'power2.in',
      onComplete: () => {
        document.querySelectorAll('#particle-wrapper').forEach(el => el.remove());

        flushSync(() => {
          setView('home');
        });

        window.scrollTo(0, 0);
        gsap.set('.home-container', { opacity: 1 });

        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 1.4,
          ease: 'power2.out',
          onComplete: () => {
            isTransitioning.current = false;
          },
        });
      },
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
      <XRayCursor />
      <AmbientSound />
      
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

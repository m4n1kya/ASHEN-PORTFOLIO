import { useState, useEffect } from "react";
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
import Gallery from "./components/Gallery";

const App = () => {
  const [view, setView] = useState('home');
  const [galleryMounted, setGalleryMounted] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(() => {
    return sessionStorage.getItem('ashen_has_loaded') === 'true';
  });

  useEffect(() => {
    if (!hasLoadedOnce) {
      sessionStorage.setItem('ashen_has_loaded', 'true');
    }
  }, [hasLoadedOnce]);

  // Handle view transitions — App.jsx owns ALL overlay cleanup
  useEffect(() => {
    if (view === 'gallery') {
      setHasLoadedOnce(true);
      setGalleryMounted(true);
      sessionStorage.setItem('ashen_has_loaded', 'true');

      // Fade out the overlay that Hero.jsx created.
      // 200ms delay gives React time to mount Gallery before we reveal it.
      const revealTimer = setTimeout(() => {
        const overlays = document.querySelectorAll('#transition-overlay');
        overlays.forEach(overlay => {
          gsap.to(overlay, {
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out',
            onComplete: () => overlay.remove()
          });
        });
        // Ensure gallery is visible
        gsap.set('.gallery-container', { opacity: 1 });
        gsap.to('.gallery-content', {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.3,
        });
      }, 200);

      // FAILSAFE: If anything goes wrong, nuke the overlay after 2.5s
      const failsafe = setTimeout(() => {
        document.querySelectorAll('#transition-overlay').forEach(el => el.remove());
        document.querySelectorAll('#particle-wrapper').forEach(el => el.remove());
        gsap.set('.gallery-container', { opacity: 1 });
        gsap.set('.gallery-content', { opacity: 1, y: 0 });
      }, 2500);

      return () => {
        clearTimeout(revealTimer);
        clearTimeout(failsafe);
      };
    }

    if (view === 'home') {
      // Scroll home to top while it's hidden behind the overlay
      window.scrollTo(0, 0);
      gsap.set('.home-container', { opacity: 1 });

      // Fade out the overlay that Gallery's handleBack created
      const revealTimer = setTimeout(() => {
        const overlays = document.querySelectorAll('#transition-overlay');
        overlays.forEach(overlay => {
          gsap.to(overlay, {
            opacity: 0,
            duration: 1.4,
            ease: 'power2.out',
            onComplete: () => overlay.remove()
          });
        });
      }, 150);

      // FAILSAFE: Nuke overlay after 2.5s no matter what
      const failsafe = setTimeout(() => {
        document.querySelectorAll('#transition-overlay').forEach(el => el.remove());
        document.querySelectorAll('#particle-wrapper').forEach(el => el.remove());
        gsap.set('.home-container', { opacity: 1 });
      }, 2500);

      return () => {
        clearTimeout(revealTimer);
        clearTimeout(failsafe);
      };
    }
  }, [view]);

  return (
    <>
      <ParticleCursor />
      <AmbientSound />
      
      {/* Home page is ALWAYS mounted — never destroyed/recreated.
          Hidden with display:none when viewing gallery. */}
      <div 
        className="home-container relative bg-transparent"
        style={{ display: view === 'home' ? 'block' : 'none' }}
      >
        <Loader hasLoadedOnce={hasLoadedOnce} />
        <Navbar />
        <Hero onNavigateToGallery={() => setView('gallery')} hasLoadedOnce={hasLoadedOnce} />
        <FeatureCards />
        <Experience />
        <ShowcaseSection />
        <LogoShowcase />
        <TechStack />
        <Contact />
        <Footer />
      </div>

      {galleryMounted && view === 'gallery' && (
        <Gallery onBack={() => setView('home')} />
      )}
    </>
  );
};

export default App;

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

  // Handle view transitions
  useEffect(() => {
    if (view === 'gallery') {
      setHasLoadedOnce(true);
      setGalleryMounted(true);
      sessionStorage.setItem('ashen_has_loaded', 'true');
    }
    if (view === 'home') {
      // Scroll home to top while it's hidden behind the overlay
      window.scrollTo(0, 0);

      const overlay = document.getElementById('transition-overlay');
      if (overlay) {
        gsap.set('.home-container', { opacity: 1 });

        // 150ms timeout gives the browser time to re-layout the home page
        // after switching from display:none to display:block.
        // This is more reliable than double rAF for heavy pages.
        setTimeout(() => {
          gsap.to(overlay, {
            opacity: 0,
            duration: 1.4,
            ease: 'power2.out',
            onComplete: () => overlay.remove()
          });
        }, 150);
      } else {
        gsap.set('.home-container', { opacity: 1 });
      }
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

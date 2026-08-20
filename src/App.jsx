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
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  // Entrance animation when returning to home from gallery
  useEffect(() => {
    if (view === 'gallery') {
      setHasLoadedOnce(true);
    }
    if (view === 'home') {
      gsap.fromTo(
        ".home-container",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, [view]);

  return (
    <>
      <ParticleCursor />
      <AmbientSound />
      
      {view === 'home' && (
        <div className="home-container relative bg-transparent">
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
      )}

      {view === 'gallery' && (
        <Gallery onBack={() => setView('home')} />
      )}
    </>
  );
};

export default App;

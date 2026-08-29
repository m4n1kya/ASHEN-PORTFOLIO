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

import FeatureCards from "./sections/FeatureCards";
import Experience from "./sections/Experience";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import TechStack from "./sections/TechStack";
import Achievements from "./sections/Achievements";
import ContactWindow from "./components/ContactWindow";
import Footer from "./sections/Footer";
import { StaggeredMenu } from "./components/reactbits/StaggeredMenu";
import GlobalCurtain from "./components/GlobalCurtain";

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
  const [contactMounted, setContactMounted] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const overlayRef = useRef(null);
  const curtainRef = useRef(null);
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

  const handleNav = (selector, curtainConfig) => {
    if (curtainRef.current) {
      curtainRef.current.cover(curtainConfig, () => {
        if (selector === '#') {
          window.scrollTo({ top: 0, behavior: 'instant' });
        } else {
          const el = document.querySelector(selector);
          if (el) el.scrollIntoView({ behavior: 'instant' });
        }
        setTimeout(() => {
          curtainRef.current.reveal();
          ScrollTrigger.refresh();
        }, 150);
      });
    } else {
      if (selector === '#') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navigate to Overview
  const navigateToOverview = useCallback((targetId = null) => {
    if (isTransitioning.current) return;
    const tid = typeof targetId === 'string' ? targetId : null;
    
    const oc = document.querySelector('.overview-container');
    const targetEl = tid ? document.getElementById(tid) : null;

    if (oc && oc.style.display !== 'none' && getComputedStyle(oc).opacity === '1') {
      if (targetEl) {
        window.scrollTo({ top: targetEl.offsetTop - 50, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    isTransitioning.current = true;
    scrollPositionRef.current = window.scrollY;

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        flushSync(() => {
          setHasLoadedOnce(true);
          setView('overview');
        });
        sessionStorage.setItem('ashen_has_loaded', 'true');
        
        // Wait a tiny bit for the browser to render the newly displayed overview-container
        setTimeout(() => {
            const newTargetEl = tid ? document.getElementById(tid) : null;
            if (newTargetEl) {
              window.scrollTo(0, newTargetEl.offsetTop - 50);
            } else {
              window.scrollTo(0, 0);
            }
        }, 0);

        const hc = document.querySelector('.home-container');
        if (hc) hc.style.display = 'none';

        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            isTransitioning.current = false;
            ScrollTrigger.refresh();
            setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
          }
        });
      }
    });
  }, []);

  // Navigate to Contact
  const navigateToContact = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setContactMounted(true);
    scrollPositionRef.current = window.scrollY;

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        flushSync(() => {
          setHasLoadedOnce(true);
          setView('contact');
        });
        sessionStorage.setItem('ashen_has_loaded', 'true');
        window.scrollTo(0, 0);

        const hc = document.querySelector('.home-container');
        if (hc) hc.style.display = 'none';

        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            isTransitioning.current = false;
          }
        });
      }
    });
  }, []);

  // Navigate to gallery
  const navigateToGallery = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    
    // Save scroll position before hiding home container
    scrollPositionRef.current = window.scrollY;

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        flushSync(() => {
          setHasLoadedOnce(true);
          setGalleryMounted(true);
          setView('gallery');
        });
        sessionStorage.setItem('ashen_has_loaded', 'true');
        
        window.scrollTo(0, 0);
        const hc = document.querySelector('.home-container');
        if (hc) hc.style.display = 'none';

        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            isTransitioning.current = false;
          }
        });
      }
    });
  }, []);

  // Navigate to Projects Window
  const navigateToProjects = useCallback((projectId) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    // Save scroll position before hiding home container
    scrollPositionRef.current = window.scrollY;

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        flushSync(() => {
          setHasLoadedOnce(true);
          setActiveProject(projectId);
          setProjectsMounted(true);
          setView('projects');
        });
        sessionStorage.setItem('ashen_has_loaded', 'true');
        
        window.scrollTo(0, 0);
        const hc = document.querySelector('.home-container');
        if (hc) hc.style.display = 'none';

        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            isTransitioning.current = false;
          }
        });
      }
    });
  }, []);

  // Navigate back to home
  const navigateToHome = useCallback(() => {
    if (isTransitioning.current) return;

    const hc = document.querySelector('.home-container');
    if (hc && hc.style.display !== 'none' && getComputedStyle(hc).opacity === '1') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      return;
    }

    isTransitioning.current = true;

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        if (hc) {
          hc.style.display = 'block';
          // Force ScrollTrigger to recalculate all positions now that display is block
          ScrollTrigger.refresh();
        }

        const isFromProjects = document.querySelector('.projects-window') !== null;
        const showcase = document.getElementById('projects');

        if (isFromProjects && showcase) {
          window.scrollTo(0, showcase.offsetTop - 80);
        } else {
          // As requested, always scroll to the topmost area like refreshing the site
          window.scrollTo(0, 0);
        }

        flushSync(() => {
          setView('home');
        });

        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            isTransitioning.current = false;
          }
        });
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

      {/* ── Fixed UI Elements ── */}
      <div style={{ opacity: ((view !== 'home' || showNav) && view !== 'gallery' && view !== 'projects') ? 1 : 0, transition: 'opacity 1s ease', pointerEvents: ((view !== 'home' || showNav) && view !== 'gallery' && view !== 'projects') ? 'auto' : 'none', zIndex: 9999, position: 'relative' }}>
        {/* Top Left Menu */}
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
            { label: 'Home',       ariaLabel: 'Back to Home',            link: '#', onClick: navigateToHome },
            { label: 'Overview',   ariaLabel: 'Professional Summary',    link: '#', onClick: () => navigateToOverview() },
            { label: 'Experience', ariaLabel: 'Work Experience',         link: '#', onClick: () => navigateToOverview('experience') },
            { label: 'Projects',   ariaLabel: 'Selected Projects',       link: '#', onClick: () => {} },
            { label: 'Skills',     ariaLabel: 'Technical Stack',         link: '#', onClick: () => navigateToOverview('skills') },
            { label: 'Certifications', ariaLabel: 'Certifications',      link: '#', onClick: () => navigateToOverview('achievements') },
            { label: 'Contact',    ariaLabel: 'Get in touch',            link: '#', onClick: navigateToContact },
          ]}
          socialItems={[
            { label: 'GitHub',   link: 'https://github.com/m4n1kya' },
            { label: 'LinkedIn', link: 'https://www.linkedin.com/in/manikya-nariyapara' },
          ]}
        />

        {/* Top Right Resume Button */}
        <a 
          href="/resume.pdf" 
          download="Manikya_Resume.pdf"
          className="fixed top-5 right-5 z-[9999] px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-semibold flex items-center gap-2 hover:bg-white/10 hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          style={{ fontFamily: '"Mona Sans", sans-serif' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          RESUME
        </a>
      </div>

      <Loader hasLoadedOnce={hasLoadedOnce} />
      
      {/* ── Global Curtain for Section Navigation ── */}
      <GlobalCurtain ref={curtainRef} />

      <div 
        className="home-container relative bg-transparent mt-0 z-10"
        style={{ display: (view === 'home' || isTransitioning.current) ? 'block' : 'none' }}
      >
        <Hero 
          onNavigateToOverview={navigateToOverview}
          onNavigateToContact={navigateToContact}
          onNavigateToGallery={navigateToGallery} 
          hasLoadedOnce={hasLoadedOnce} 
          setShowNav={setShowNav}
        />
      </div>

      <div 
        className="overview-container relative bg-transparent mt-0 z-10"
        style={{ display: (view === 'overview' || isTransitioning.current) ? 'block' : 'none' }}
      >
        <FeatureCards />
        <Experience />
        <ShowcaseSection onNavigateToProjects={navigateToProjects} />
        <LogoShowcase />
        <TechStack />
        <Achievements />
        <Footer />
      </div>

      {/* Contact view is now handled via Suspense */}

      <Suspense fallback={null}>
        {galleryMounted && view === 'gallery' && (
          <Gallery onBack={navigateToHome} />
        )}

        {projectsMounted && view === 'projects' && (
          <ProjectsWindow onBack={navigateToHome} initialProject={activeProject} />
        )}

        {contactMounted && view === 'contact' && (
          <ContactWindow onBack={navigateToHome} />
        )}
      </Suspense>
    </>
  );
};

export default App;

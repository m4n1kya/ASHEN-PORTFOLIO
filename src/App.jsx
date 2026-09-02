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

// Lazy Loaded Windows (Only loaded when opened by user)
const ProjectsWindow = React.lazy(() => import("./components/ProjectsWindow"));
const Gallery = React.lazy(() => import("./components/Gallery"));
const ExperienceWindow = React.lazy(() => import("./components/ExperienceWindow"));
const SkillsWindow = React.lazy(() => import("./components/SkillsWindow"));
const CertificationsWindow = React.lazy(() => import("./components/CertificationsWindow"));
const BeyondCodeWindow = React.lazy(() => import("./components/BeyondCodeWindow"));

// Valid view states: 'home' | 'overview' | 'gallery' | 'projects' | 'contact' | 'experience' | 'skills' | 'certifications' | 'beyondcode'
const OVERLAY_VIEWS = ['gallery', 'projects', 'contact', 'experience', 'skills', 'certifications', 'beyondcode'];

const App = () => {
  const [view, setView] = useState('home');
  const [activeProject, setActiveProject] = useState("ashenritual");
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [showNav, setShowNav] = useState(false);

  // Track which windows have been mounted (so lazy components aren't re-mounted on every open)
  const mounted = useRef({ gallery: false, projects: false, contact: false, experience: false, skills: false, certifications: false, beyondcode: false });

  const overlayRef = useRef(null);
  const curtainRef = useRef(null);
  const isTransitioning = useRef(false);
  const viewRef = useRef('home'); // Always in sync with view state for use inside callbacks

  // Keep viewRef in sync
  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  // Preload gallery images silently
  useEffect(() => {
    const timer = setTimeout(() => {
      for (let i = 1; i <= 8; i++) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = `/images/gallery/screen-${i}.webp`;
        document.head.appendChild(link);
      }
      for (let i = 9; i <= 34; i++) {
        const img = new Image();
        img.src = `/images/gallery/screen-${i}.webp`;
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasLoadedOnce) {
      sessionStorage.setItem('ashen_has_loaded', 'true');
    }
  }, [hasLoadedOnce]);

  // ── Core transition engine ──────────────────────────────────────────────────
  // Fades to black, applies view change, scrolls to top, fades back in.
  const transitionTo = useCallback((newView, options = {}) => {
    if (isTransitioning.current) return;
    if (viewRef.current === newView) return;
    isTransitioning.current = true;

    // Safety net: if something goes wrong, always unlock after 3s
    const safetyTimer = setTimeout(() => {
      isTransitioning.current = false;
    }, 3000);

    const { mountKey, projectId, targetId } = options;

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        flushSync(() => {
          if (mountKey) mounted.current[mountKey] = true;
          if (projectId) setActiveProject(projectId);
          setHasLoadedOnce(true);
          setView(newView);
        });
        sessionStorage.setItem('ashen_has_loaded', 'true');

        // Scroll WHILE overlay is opaque — user sees nothing
        if (targetId) {
          const el = document.getElementById(targetId);
          window.scrollTo(0, el ? el.offsetTop - 50 : 0);
        } else {
          window.scrollTo(0, 0);
        }

        // Fade back in — reveal the new view
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            clearTimeout(safetyTimer);
            isTransitioning.current = false;
            // Refresh AFTER overlay is gone so GSAP pin recalculates cleanly
            ScrollTrigger.refresh();
          }
        });
      }
    });
  }, []);

  // ── Navigation helpers ──────────────────────────────────────────────────────
  const navigateToHome = useCallback(() => {
    if (isTransitioning.current) return;
    if (viewRef.current === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    transitionTo('home');
  }, [transitionTo]);

  const navigateToOverview = useCallback((targetId = null) => {
    if (isTransitioning.current) return;
    const tid = typeof targetId === 'string' ? targetId : null;

    if (viewRef.current === 'overview') {
      // Already in overview — just scroll to section
      const el = tid ? document.getElementById(tid) : null;
      window.scrollTo({ top: el ? el.offsetTop - 50 : 0, behavior: 'smooth' });
      return;
    }

    if (viewRef.current === 'home') {
      // Overview is already in DOM below the Hero — just scroll down to it
      const overviewEl = document.querySelector('.overview-container');
      const targetEl = tid ? document.getElementById(tid) : overviewEl;
      window.scrollTo({ top: targetEl ? targetEl.offsetTop : 0, behavior: 'smooth' });
      return;
    }

    // Coming from a different overlay window — full wipe transition
    transitionTo('overview', { targetId: tid });
  }, [transitionTo]);

  const navigateToGallery = useCallback(() => {
    transitionTo('gallery', { mountKey: 'gallery' });
  }, [transitionTo]);

  const navigateToProjects = useCallback((projectId = 'ashenritual') => {
    transitionTo('projects', { mountKey: 'projects', projectId });
  }, [transitionTo]);

  const navigateToContact = useCallback(() => {
    transitionTo('contact', { mountKey: 'contact' });
  }, [transitionTo]);

  const navigateToExperience = useCallback(() => {
    transitionTo('experience', { mountKey: 'experience' });
  }, [transitionTo]);

  const navigateToSkills = useCallback(() => {
    transitionTo('skills', { mountKey: 'skills' });
  }, [transitionTo]);

  const navigateToCertifications = useCallback(() => {
    transitionTo('certifications', { mountKey: 'certifications' });
  }, [transitionTo]);

  const navigateToBeyondCode = useCallback(() => {
    transitionTo('beyondcode', { mountKey: 'beyondcode' });
  }, [transitionTo]);

  const isOverlayView = OVERLAY_VIEWS.includes(view);

  // Menu is hidden only during gallery (pure fullscreen visual) and on home before scroll
  const menuVisible = view !== 'gallery' && (view !== 'home' || showNav);

  return (
    <>
      {/* Permanent black transition overlay */}
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
      <XRayCursor isVisible={true} />
      <HeroParticles containerClassName="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" />

      {/* ── Fixed UI: Menu + Resume ── */}
      <div
        style={{
          opacity: menuVisible ? 1 : 0,
          visibility: menuVisible ? 'visible' : 'hidden',
          transition: `opacity 1s ease, visibility 0s linear ${menuVisible ? '0s' : '1s'}`,
          zIndex: 9999,
          position: 'relative',
        }}
      >
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
            { label: 'Home',           ariaLabel: 'Back to Home',         link: '#', onClick: navigateToHome },
            { label: 'Overview',       ariaLabel: 'Professional Summary', link: '#', onClick: () => navigateToOverview() },
            { label: 'Experience',     ariaLabel: 'Work Experience',      link: '#', onClick: navigateToExperience },
            { label: 'Projects',       ariaLabel: 'Selected Projects',    link: '#', onClick: () => navigateToProjects('ashenritual') },
            { label: 'Skills',         ariaLabel: 'Technical Stack',      link: '#', onClick: navigateToSkills },
            { label: 'Certifications', ariaLabel: 'Certifications',       link: '#', onClick: navigateToCertifications },
            { label: 'Beyond Code',    ariaLabel: 'Beyond Code',          link: '#', onClick: navigateToBeyondCode },
            { label: 'Contact',        ariaLabel: 'Get in touch',         link: '#', onClick: navigateToContact },
          ]}
          socialItems={[
            { label: 'GitHub',   link: 'https://github.com/m4n1kya/' },
            { label: 'LinkedIn', link: 'https://www.linkedin.com/in/m4n1kya/' },
            { label: 'X',        link: 'https://x.com/m4n1kya' },
            { label: 'Email',    link: 'mailto:m4n1kya2005@gmail.com' },
          ]}
        />

        <a
          href="/resume.pdf"
          download="Manikya_Resume.pdf"
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            margin: '1.6em 2em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(0,0,0,0.25)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '4px',
            padding: '0.75em 1em',
            color: '#ffffff',
            fontFamily: '"Mona Sans", sans-serif',
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            lineHeight: 1,
            textDecoration: 'none',
            transition: 'background 0.3s ease, border-color 0.3s ease',
            zIndex: 20,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.25)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
        >
          {/* Download icon — always visible */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {/* Label — hidden on very small screens */}
          <span style={{ display: 'var(--resume-label-display, inline)' }}>Resume</span>
        </a>
        <style>{`
          @media (max-width: 480px) {
            :root { --resume-label-display: none; }
            .staggered-menu-header { padding: 1.2em 1.2em; }
          }
        `}</style>
      </div>

      <Loader hasLoadedOnce={hasLoadedOnce} />
      <GlobalCurtain ref={curtainRef} />

      {/* ── Hero (always mounted, hidden when in overlay views) ── */}
      <div
        className="home-container relative bg-transparent mt-0 z-10"
        style={{ display: view === 'home' ? 'block' : 'none' }}
      >
        <Hero
          onNavigateToGallery={navigateToGallery}
          hasLoadedOnce={hasLoadedOnce}
          setShowNav={setShowNav}
        />
      </div>

      {/* ── Overview (scrollable sections — also rendered below Hero so scrolling flows naturally) ── */}
      <div
        className="overview-container relative bg-transparent mt-0 z-10"
        style={{ display: (view === 'home' || view === 'overview') ? 'block' : 'none' }}
      >
        <FeatureCards />
        <Experience />
        <ShowcaseSection onNavigateToProjects={navigateToProjects} />
        <LogoShowcase />
        <TechStack />
        <Achievements />
        <Footer />
      </div>

      {/* ── Overlay Windows (lazy-loaded, only rendered when mounted) ── */}
      <Suspense fallback={null}>
        {mounted.current.gallery && view === 'gallery' && (
          <Gallery onBack={navigateToHome} />
        )}
        {mounted.current.projects && view === 'projects' && (
          <ProjectsWindow onBack={navigateToHome} initialProject={activeProject} />
        )}
        {mounted.current.contact && view === 'contact' && (
          <ContactWindow onBack={navigateToHome} />
        )}
        {mounted.current.experience && view === 'experience' && (
          <ExperienceWindow onBack={navigateToHome} />
        )}
        {mounted.current.skills && view === 'skills' && (
          <SkillsWindow onBack={navigateToHome} />
        )}
        {mounted.current.certifications && view === 'certifications' && (
          <CertificationsWindow onBack={navigateToHome} />
        )}
        {mounted.current.beyondcode && view === 'beyondcode' && (
          <BeyondCodeWindow onBack={navigateToHome} />
        )}
      </Suspense>
    </>
  );
};

export default App;

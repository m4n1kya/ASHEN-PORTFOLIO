import sys
import re

def update_app_jsx():
    with open('src/App.jsx', 'r') as f:
        content = f.read()

    # 1. Update the rendering of home-container and overview-container
    content = content.replace(
        '''      <div 
        className="overview-container relative bg-transparent mt-0 z-10"
        style={{ display: (view === 'overview' || isTransitioning.current) ? 'block' : 'none' }}
      >''',
        '''      <div 
        className="overview-container relative bg-transparent mt-0 z-10"
        style={{ display: (view === 'home' || view === 'overview' || isTransitioning.current) ? 'block' : 'none' }}
      >'''
    )

    # 2. Modify navigateToOverview to just scroll smoothly
    new_navigate_to_overview = """  // Navigate to Overview
  const navigateToOverview = useCallback((targetId = null) => {
    if (isTransitioning.current) return;
    const tid = typeof targetId === 'string' ? targetId : null;
    
    // We are now always rendering overview-container when in home view.
    // Just scroll to it!
    const targetEl = tid ? document.getElementById(tid) : document.querySelector('.overview-container');

    if (view === 'home' || view === 'overview') {
      if (targetEl) {
        window.scrollTo({ top: targetEl.offsetTop, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: document.querySelector('.overview-container')?.offsetTop || 0, behavior: 'smooth' });
      }
      return;
    }

    // If coming from another window (like contact or experience), do the wipe transition
    isTransitioning.current = true;
    scrollPositionRef.current = window.scrollY;

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        flushSync(() => {
          setHasLoadedOnce(true);
          setView('home');
        });
        sessionStorage.setItem('ashen_has_loaded', 'true');
        
        setTimeout(() => {
            const newTargetEl = tid ? document.getElementById(tid) : document.querySelector('.overview-container');
            if (newTargetEl) {
              window.scrollTo(0, newTargetEl.offsetTop);
            } else {
              window.scrollTo(0, 0);
            }
        }, 0);

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
  }, [view]);"""

    # Find navigateToOverview and replace it
    content = re.sub(
        r'  // Navigate to Overview\n  const navigateToOverview = useCallback\(\(targetId = null\) => \{.*?(?=  // Navigate to Contact)', 
        new_navigate_to_overview + '\n\n', 
        content, 
        flags=re.DOTALL
    )

    # 3. Modify navigateToHome to scroll to the top of the home-container (Hero)
    new_navigate_to_home = """  // Navigate back to home
  const navigateToHome = useCallback(() => {
    if (isTransitioning.current) return;

    if (view === 'home' || view === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    isTransitioning.current = true;

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        flushSync(() => {
          setView('home');
        });
        window.scrollTo(0, 0);

        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            isTransitioning.current = false;
            ScrollTrigger.refresh();
          }
        });
      }
    });
  }, [view]);"""

    content = re.sub(
        r'  // Navigate back to home\n  const navigateToHome = useCallback\(\(\) => \{.*?(?=  return \()', 
        new_navigate_to_home + '\n\n', 
        content, 
        flags=re.DOTALL
    )
    
    # 4. Also need to ensure the home-container display block covers 'overview'
    content = content.replace(
        '''      <div 
        className="home-container relative bg-transparent mt-0 z-10"
        style={{ display: (view === 'home' || isTransitioning.current) ? 'block' : 'none' }}
      >''',
        '''      <div 
        className="home-container relative bg-transparent mt-0 z-10"
        style={{ display: (view === 'home' || view === 'overview' || isTransitioning.current) ? 'block' : 'none' }}
      >'''
    )

    with open('src/App.jsx', 'w') as f:
        f.write(content)

update_app_jsx()

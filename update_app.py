import sys

def process_app_jsx():
    with open('src/App.jsx', 'r') as f:
        content = f.read()

    # 1. Update imports
    content = content.replace(
        'const Gallery = React.lazy(() => import("./components/Gallery"));',
        'const Gallery = React.lazy(() => import("./components/Gallery"));\nconst ExperienceWindow = React.lazy(() => import("./components/ExperienceWindow"));\nconst SkillsWindow = React.lazy(() => import("./components/SkillsWindow"));\nconst CertificationsWindow = React.lazy(() => import("./components/CertificationsWindow"));'
    )

    # 2. Update state variables
    content = content.replace(
        'const [contactMounted, setContactMounted] = useState(false);',
        'const [contactMounted, setContactMounted] = useState(false);\n  const [experienceMounted, setExperienceMounted] = useState(false);\n  const [skillsMounted, setSkillsMounted] = useState(false);\n  const [certificationsMounted, setCertificationsMounted] = useState(false);'
    )

    # 3. Add navigate functions
    navigate_funcs = """
  // Navigate to Experience Window
  const navigateToExperience = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setExperienceMounted(true);
    scrollPositionRef.current = window.scrollY;

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        flushSync(() => {
          setHasLoadedOnce(true);
          setView('experience');
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

  // Navigate to Skills Window
  const navigateToSkills = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setSkillsMounted(true);
    scrollPositionRef.current = window.scrollY;

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        flushSync(() => {
          setHasLoadedOnce(true);
          setView('skills');
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

  // Navigate to Certifications Window
  const navigateToCertifications = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCertificationsMounted(true);
    scrollPositionRef.current = window.scrollY;

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        flushSync(() => {
          setHasLoadedOnce(true);
          setView('certifications');
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
"""
    content = content.replace('  const navigateToContact = useCallback(() => {', navigate_funcs + '\n  const navigateToContact = useCallback(() => {')

    # 4. Update StaggeredMenu
    content = content.replace(
        "            { label: 'Experience', ariaLabel: 'Work Experience',         link: '#', onClick: () => navigateToOverview('experience') },\n            { label: 'Projects',   ariaLabel: 'Selected Projects',       link: '#', onClick: () => {} },\n            { label: 'Skills',     ariaLabel: 'Technical Stack',         link: '#', onClick: () => navigateToOverview('skills') },\n            { label: 'Certifications', ariaLabel: 'Certifications',      link: '#', onClick: () => navigateToOverview('achievements') },",
        "            { label: 'Experience', ariaLabel: 'Work Experience',         link: '#', onClick: navigateToExperience },\n            { label: 'Projects',   ariaLabel: 'Selected Projects',       link: '#', onClick: () => {} },\n            { label: 'Skills',     ariaLabel: 'Technical Stack',         link: '#', onClick: navigateToSkills },\n            { label: 'Certifications', ariaLabel: 'Certifications',      link: '#', onClick: navigateToCertifications },"
    )
    
    # 5. Add Hero prop drilling
    content = content.replace(
        "          onNavigateToOverview={navigateToOverview}\n          onNavigateToContact={navigateToContact}\n          onNavigateToGallery={navigateToGallery} \n          hasLoadedOnce={hasLoadedOnce} \n          setShowNav={setShowNav}",
        "          onNavigateToOverview={navigateToOverview}\n          onNavigateToContact={navigateToContact}\n          onNavigateToGallery={navigateToGallery}\n          onNavigateToExperience={navigateToExperience}\n          onNavigateToSkills={navigateToSkills}\n          onNavigateToCertifications={navigateToCertifications}\n          hasLoadedOnce={hasLoadedOnce} \n          setShowNav={setShowNav}"
    )

    # 6. Add Suspense boundaries
    suspense_additions = """
        {experienceMounted && view === 'experience' && (
          <ExperienceWindow onBack={navigateToHome} />
        )}

        {skillsMounted && view === 'skills' && (
          <SkillsWindow onBack={navigateToHome} />
        )}

        {certificationsMounted && view === 'certifications' && (
          <CertificationsWindow onBack={navigateToHome} />
        )}
"""
    content = content.replace(
        "        {contactMounted && view === 'contact' && (\n          <ContactWindow onBack={navigateToHome} />\n        )}",
        "        {contactMounted && view === 'contact' && (\n          <ContactWindow onBack={navigateToHome} />\n        )}" + suspense_additions
    )

    with open('src/App.jsx', 'w') as f:
        f.write(content)

process_app_jsx()

import sys

def process_hero_jsx():
    with open('src/sections/Hero.jsx', 'r') as f:
        content = f.read()

    # Update props
    content = content.replace(
        'const Hero = ({ onNavigateToOverview, onNavigateToContact, onNavigateToGallery, hasLoadedOnce, setShowNav }) => {',
        'const Hero = ({ onNavigateToOverview, onNavigateToContact, onNavigateToGallery, onNavigateToExperience, onNavigateToSkills, onNavigateToCertifications, hasLoadedOnce, setShowNav }) => {'
    )

    # Update tabs array
    content = content.replace(
        """  const tabs = [
    { label: "Overview", action: () => onNavigateToOverview(), side: "left" },
    { label: "Experience", action: () => onNavigateToOverview('experience'), side: "left" },
    { label: "Projects", action: () => {}, side: "left" },
    { label: "Technical Skills", action: () => onNavigateToOverview('skills'), side: "right" },
    { label: "Certifications", action: () => onNavigateToOverview('achievements'), side: "right" },
    { label: "Contact", action: onNavigateToContact, side: "right" },
  ];""",
        """  const tabs = [
    { label: "Overview", action: () => onNavigateToOverview(), side: "left" },
    { label: "Experience", action: onNavigateToExperience, side: "left" },
    { label: "Projects", action: () => {}, side: "left" },
    { label: "Technical Skills", action: onNavigateToSkills, side: "right" },
    { label: "Certifications", action: onNavigateToCertifications, side: "right" },
    { label: "Contact", action: onNavigateToContact, side: "right" },
  ];"""
    )

    with open('src/sections/Hero.jsx', 'w') as f:
        f.write(content)

process_hero_jsx()

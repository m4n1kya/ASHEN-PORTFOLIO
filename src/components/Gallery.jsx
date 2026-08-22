import { useEffect } from 'react';
import gsap from 'gsap';

const Gallery = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Start fully invisible to prevent any flicker before animation
    gsap.set('.gallery-container', { opacity: 0 });
    gsap.set('.gallery-content', { opacity: 0, y: 30 });

    const overlays = document.querySelectorAll('#transition-overlay');
    if (overlays.length > 0) {
      // 100ms timeout is much more reliable than double rAF when navigating away
      // from a heavy 3D canvas context, ensuring the fade always fires.
      setTimeout(() => {
        gsap.set('.gallery-container', { opacity: 1 });

        overlays.forEach(overlay => {
          gsap.to(overlay, {
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out',
            onComplete: () => overlay.remove()
          });
        });

        // Content slides up right as the overlay clears
        gsap.to('.gallery-content', {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.4,
        });
      }, 100);
    } else {
      gsap.set('.gallery-container', { opacity: 1 });
      gsap.to('.gallery-content', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
    }
  }, []);

  const handleBack = () => {
    // Prevent rapid clicks from firing multiple transitions
    if (document.getElementById('transition-overlay')) return;

    // Dark overlay — ON TOP of particles so mount stutter is hidden
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background-color:black;opacity:0;z-index:999999;pointer-events:none;';
    overlay.id = 'transition-overlay';
    document.body.appendChild(overlay);

    // Create fixed wrapper for the downward particle swipe — BELOW overlay
    const particleWrapper = document.createElement('div');
    particleWrapper.id = 'particle-wrapper';
    particleWrapper.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:999997;contain:layout size;';
    document.body.appendChild(particleWrapper);

    const colors = ['#ffffff', '#e0e0e0', '#a0a0a0', '#737373'];
    const W = window.innerWidth;
    const H = window.innerHeight;
    const count = 150;
    let longestAnimation = 0;

    const fragment = document.createDocumentFragment();
    const particleData = [];

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 4 + 1.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const startX = Math.random() * W;
      const startY = -Math.random() * 300 - 50;
      const delay = Math.random() * 0.6;
      const duration = Math.random() * 1.2 + 1.0;
      const endY = H + 200 + Math.random() * 400;
      const endX = startX + (Math.random() - 0.5) * 150;
      const targetOpacity = Math.random() * 0.6 + 0.3;
      const glowSize = size * 3;

      const p = document.createElement('div');
      // Radial gradient glow instead of box-shadow — zero blur compositing cost
      p.style.cssText = `position:absolute;width:${glowSize}px;height:${glowSize}px;border-radius:50%;background:radial-gradient(circle,${color} 30%,transparent 70%);will-change:transform,opacity;backface-visibility:hidden;transform:translate3d(${startX}px,${startY}px,0) scale(0.5);opacity:0;`;

      if (delay + duration > longestAnimation) longestAnimation = delay + duration;

      fragment.appendChild(p);
      particleData.push({ p, startX, startY, endX, endY, targetOpacity, delay, duration });
    }

    particleWrapper.appendChild(fragment);

    // Store all tweens so we can kill them before navigating
    const particleTweens = [];

    particleData.forEach(({ p, startX, startY, endX, endY, targetOpacity, delay, duration }) => {
      const tween = gsap.fromTo(p,
        { x: startX, y: startY, opacity: 0, scale: 0.5 },
        {
          x: endX, y: endY, opacity: targetOpacity, scale: 1,
          duration, delay,
          ease: 'power2.out',
          force3D: true,
        }
      );
      particleTweens.push(tween);
    });

    const cleanupTimer = setTimeout(() => {
      if (document.body.contains(particleWrapper)) particleWrapper.remove();
    }, (longestAnimation + 0.3) * 1000);

    gsap.to(overlay, {
      opacity: 1,
      duration: 1.0,
      ease: "power2.in",
      onComplete: () => {
        // CRITICAL: Kill ALL 150 particle tweens BEFORE mounting the home page.
        // Without this, 150 GSAP tweens compete with 145 hero particles for GPU time.
        clearTimeout(cleanupTimer);
        particleTweens.forEach(t => t.kill());
        particleWrapper.remove();

        onBack();
      }
    });
  };

  return (
    <div className="gallery-container min-h-screen w-full bg-transparent relative z-[200] flex flex-col pt-20 px-5 md:px-20">
      
      {/* Sleek Back Button */}
      <button 
        onClick={handleBack}
        className="group relative z-10 w-fit flex items-center gap-3 px-6 py-3 bg-transparent border border-white-50/20 text-white-50 rounded-full hover:border-white hover:text-white transition-all duration-300"
      >
        <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
        <span className="text-sm uppercase tracking-widest font-semibold">Back to Portfolio</span>
      </button>

      {/* Main Content Area */}
      <div className="gallery-content flex-1 flex flex-col justify-center items-center h-full pb-20">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-widest text-center">
          SCREENSHOT LIBRARY
        </h1>
        <p className="text-white-50 md:text-lg tracking-widest uppercase opacity-70">
          (Coming Soon)
        </p>
      </div>

    </div>
  );
};

export default Gallery;

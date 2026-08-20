import { useEffect } from 'react';
import gsap from 'gsap';

const Gallery = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Start fully invisible to prevent any flicker before animation
    gsap.set('.gallery-container', { opacity: 0 });
    gsap.set('.gallery-content', { opacity: 0, y: 30 });

    const overlay = document.getElementById('transition-overlay');
    if (overlay) {
      // Fade overlay out and simultaneously reveal the gallery
      gsap.to(overlay, {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        onComplete: () => overlay.remove()
      });
      // Fade container in in sync with overlay
      gsap.to('.gallery-container', {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
      });
      // Content slides up right as the overlay clears
      gsap.to('.gallery-content', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.4,
      });
    } else {
      gsap.set('.gallery-container', { opacity: 1 });
      gsap.to('.gallery-content', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
    }
  }, []);

  const handleBack = () => {
    // Dark overlay — ON TOP of everything so React mount stutter is invisible
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background-color:black;opacity:0;z-index:999999;pointer-events:none;';
    overlay.id = 'transition-overlay';
    document.body.appendChild(overlay);

    // Canvas BELOW the overlay — visible while overlay is semi-transparent,
    // then fully hidden once overlay hits black. Any end-of-animation lag is invisible.
    const canvas = document.createElement('canvas');
    const W = window.innerWidth;
    const H = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.cssText = `position:fixed;top:0;left:0;width:${W}px;height:${H}px;pointer-events:none;z-index:999997;`;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Pre-generate all particle data
    const colors = ['#ffffff', '#e0e0e0', '#a0a0a0', '#737373'];
    const count = 120;
    const particles = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 2.5 + 1;
      particles.push({
        x: Math.random() * W,
        y: -Math.random() * 300 - 30,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 400 + 300, // pixels per second
        speedX: (Math.random() - 0.5) * 80,
        opacity: 0,
        targetOpacity: Math.random() * 0.7 + 0.3,
        delay: Math.random() * 0.5,
      });
    }

    const startTime = performance.now();
    let animId;

    const animate = (now) => {
      const elapsed = (now - startTime) / 1000; // seconds
      ctx.clearRect(0, 0, W, H);

      let allDone = true;
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        if (elapsed < p.delay) { allDone = false; continue; }
        const t = elapsed - p.delay;

        // Ease-in movement (accelerating downward)
        const progress = Math.min(t / 2.0, 1);
        const easedProgress = progress * progress; // quadratic ease-in

        p.x += p.speedX * (1 / 60) * 0.3;
        const currentY = p.y + p.speedY * easedProgress * 2.0;

        // Fade in then out
        if (progress < 0.3) {
          p.opacity = p.targetOpacity * (progress / 0.3);
        } else if (progress > 0.7) {
          p.opacity = p.targetOpacity * (1 - (progress - 0.7) / 0.3);
        } else {
          p.opacity = p.targetOpacity;
        }

        if (currentY < H + 100) {
          allDone = false;
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, currentY, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!allDone && elapsed < 3) {
        animId = requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    };

    animId = requestAnimationFrame(animate);

    // Fade to black then navigate
    gsap.to(overlay, {
      opacity: 1,
      duration: 1.0,
      ease: 'power2.in',
      onComplete: () => {
        cancelAnimationFrame(animId);
        canvas.remove();
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

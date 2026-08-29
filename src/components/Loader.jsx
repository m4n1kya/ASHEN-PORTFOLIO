import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// ── Masked Number Component ───────────────────────────────────────────────────
// Same design as the "MANIKYA" hover text in Hero.jsx
const CSSMaskedNumber = ({ number, src, parallax = 120 }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetX = nx * -parallax;
      targetY = ny * -parallax;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      setOffset({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', onMove);
    rafId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, [parallax]);

  return (
    <div 
      className="font-black uppercase tabular-nums"
      style={{ 
        fontFamily: '"Mona Sans", sans-serif',
        fontSize: 'clamp(80px, 15vw, 250px)',
        lineHeight: '0.85',
        backgroundColor: '#ffffff',
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: `calc(50% + ${offset.x}px) calc(50% + ${offset.y}px)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {number}
    </div>
  );
};

// ── Main Loader Component ─────────────────────────────────────────────────────
const Loader = ({ hasLoadedOnce }) => {
  const containerRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (hasLoadedOnce) return;

    // Immediately fade out the HTML blocker so the React loader is visible
    gsap.to("#pre-loader-blocker", { opacity: 0, duration: 0.1, delay: 0.05 });

    let currentVal = 0;
    const durationMs = 2200; // 2.2 seconds minimum
    const intervalMs = 20; // 50fps updates
    const steps = durationMs / intervalMs;
    const increment = 100 / steps;

    const interval = setInterval(() => {
      currentVal += increment;
      if (currentVal >= 100) {
        currentVal = 100;
        clearInterval(interval);
        
        // Complete loading animation
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.4,
          ease: "power4.inOut",
          delay: 0.2,
          onComplete: () => {
            sessionStorage.setItem('ashen_has_loaded', 'true');
            if (containerRef.current) containerRef.current.style.display = 'none';
            const blocker = document.getElementById('pre-loader-blocker');
            if (blocker) blocker.remove();
          }
        });
      }
      setDisplayValue(Math.floor(currentVal));
    }, intervalMs);

    return () => clearInterval(interval);
  }, [hasLoadedOnce]);

  if (hasLoadedOnce) {
    const blocker = document.getElementById('pre-loader-blocker');
    if (blocker) blocker.remove();
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#0c0c0e] flex flex-col justify-start p-10 md:p-20 overflow-hidden"
    >
      <div className="absolute top-10 md:top-20 left-10 md:left-20">
        <CSSMaskedNumber 
          number={displayValue} 
          src="/images/rocky-coastal-landscape.jpg" 
        />
      </div>
    </div>
  );
};

export default Loader;

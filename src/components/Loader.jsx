import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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

  useGSAP(() => {
    if (hasLoadedOnce) return;

    // Track critical images for the site
    const imagesToPreload = [
      '/images/hero-lantern.png',
      '/images/rocky-coastal-landscape.jpg',
      '/images/ashenritual.png',
      '/images/uniease.png',
      '/images/ecoloop.png'
    ];

    let loadedAssets = 0;
    const totalAssets = imagesToPreload.length;
    
    // We use two proxies: one for strict time (minimum 2s), one for actual assets.
    // The displayed value will follow the SLOWER of the two.
    const timeProxy = { val: 0 };
    const assetProxy = { val: 0 };
    let hasCompleted = false;

    // 1. Force a strict minimum 2.2 second animation
    gsap.to(timeProxy, {
      val: 100,
      duration: 2.2,
      ease: "power2.inOut"
    });

    // 2. Update loop to pick the lowest progress
    const tickerFunc = () => {
      const currentVal = Math.min(timeProxy.val, assetProxy.val);
      setDisplayValue(Math.floor(currentVal));
      
      if (currentVal >= 99.9 && !hasCompleted) {
        hasCompleted = true;
        completeLoading();
      }
    };
    gsap.ticker.add(tickerFunc);

    let currentAssetTarget = 0;
    const updateProgress = (percentage) => {
      if (percentage > currentAssetTarget) {
        currentAssetTarget = percentage;
        gsap.to(assetProxy, {
          val: currentAssetTarget,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    };

    const completeLoading = () => {
      // Slide up animation to reveal the site
      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 1.4,
        ease: "power4.inOut",
        delay: 0.2, // Small pause at 100 before sliding
        onComplete: () => {
          // Hide blocker and trigger state update
          const blocker = document.getElementById('pre-loader-blocker');
          if (blocker) blocker.style.opacity = '0';
          
          sessionStorage.setItem('ashen_has_loaded', 'true');
          // We use a custom event to notify App.jsx if needed, 
          // but App.jsx already listens to sessionStorage or can just wait for React to mount.
          // Since hasLoadedOnce is managed by App.jsx, we can dispatch an event or just hide ourselves.
          if (containerRef.current) containerRef.current.style.display = 'none';
          if (blocker) blocker.remove();
        }
      });
    };

    // 1. Check document readyState
    if (document.readyState === 'complete') {
      updateProgress(20);
    } else {
      window.addEventListener('load', () => updateProgress(20));
    }

    // 2. Preload images
    let loadedImages = 0;
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loadedImages++;
        // The remaining 80% is divided among images
        const imageProgress = (loadedImages / totalAssets) * 80;
        updateProgress(20 + imageProgress);
      };
      img.src = src;
    });

    // 3. Fallback timeout to guarantee it finishes (max 5 seconds)
    const fallback = setTimeout(() => {
      updateProgress(100);
    }, 5000);

    return () => {
      clearTimeout(fallback);
      gsap.ticker.remove(tickerFunc);
    };

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

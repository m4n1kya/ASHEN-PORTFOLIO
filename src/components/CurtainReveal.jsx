import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * CurtainReveal — full-viewport, scroll-triggered ONE-SHOT curtain.
 *
 * The curtain is position:fixed so it always fills the entire browser window.
 * It is invisible by default, snaps visible on trigger, then the bars animate
 * away to reveal the content underneath. Scroll position never scrubs it.
 *
 * types (each with a distinct color palette):
 *   'blinds'  — vertical panels collapse from left  → color: near-white #f5f5f7
 *   'slash'   — skewed strips slide right            → color: light-blue  #d9ecff
 *   'bars'    — random horizontal bars               → color: silver-gray #e8e8ee
 *   'split'   — top/bottom fly apart                 → color: steel-blue  #839cb5
 *   'radial'  — circle iris closes from center       → color: pure-white  #ffffff
 */

// Map each curtain type to a site-palette color
const TYPE_COLORS = {
  blinds: '#111827', // dark navy
  slash:  '#1e1b2e', // dark violet
  bars:   '#0c0c0e', // site background
  split:  '#111827', // dark navy
  radial: '#1e1b2e', // dark violet
};

const CurtainReveal = ({
  children,
  type = 'bars',
  triggerStart = 'top 72%',
  className = '',
}) => {
  const wrapperRef = useRef(null);
  const overlayRef = useRef(null);
  const color = TYPE_COLORS[type] ?? '#f5f5f7';

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const overlay = overlayRef.current;
    if (!wrapper || !overlay) return;

    // Reduced motion: just hide overlay immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(overlay, { display: 'none' });
      return;
    }

    // Start fully hidden (bars are in covering position but overlay is invisible)
    gsap.set(overlay, { autoAlpha: 0 });

    // Pre-set bars to their "closed" (covering) state
    const bars = gsap.utils.toArray('.cb', overlay);
    if (type === 'blinds')      gsap.set(bars, { scaleX: 1, transformOrigin: 'left center' });
    else if (type === 'bars')   gsap.set(bars, { scaleY: 1, transformOrigin: 'center top' });
    else if (type === 'slash')  gsap.set(bars, { xPercent: 0 });
    else if (type === 'split')  gsap.set(bars, { yPercent: 0 });
    // radial: clipPath handled on overlay itself

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: triggerStart,
        once: true,
        onEnter: () => {
          // 1. Snap overlay visible — curtain now covers the whole viewport
          gsap.set(overlay, { autoAlpha: 1 });

          const tl = gsap.timeline({
            defaults: { ease: 'expo.inOut' },
            onComplete: () => {
              // Remove from render after animation to free GPU memory
              gsap.set(overlay, { display: 'none' });
            },
          });

          if (type === 'blinds') {
            // Vertical slabs collapse toward left
            tl.to(bars, {
              scaleX: 0,
              duration: 0.9,
              stagger: { each: 0.075, from: 'start' },
            });

          } else if (type === 'bars') {
            // Horizontal bars disappear in random order
            tl.to(bars, {
              scaleY: 0,
              duration: 0.72,
              stagger: { each: 0.06, from: 'random' },
            });

          } else if (type === 'slash') {
            // Skewed strips race off-screen to the right
            tl.to(bars, {
              xPercent: 112,
              duration: 0.82,
              stagger: { each: 0.042, from: 'start' },
            });

          } else if (type === 'split') {
            // Top half flies up, bottom half flies down — simultaneously
            const mid = Math.ceil(bars.length / 2);
            const topBars = bars.slice(0, mid);
            const botBars = bars.slice(mid);
            tl.to(topBars, { yPercent: -112, duration: 0.9 }, 0)
              .to(botBars, { yPercent: 112, duration: 0.9 }, 0);

          } else if (type === 'radial') {
            // Circular iris closes inward to 0 (panel appears to shrink away)
            tl.to(overlay, {
              clipPath: 'circle(0% at 50% 50%)',
              duration: 1.05,
              ease: 'expo.inOut',
            });
          }
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, [type, triggerStart]);

  // ─── Render bar elements based on curtain type ──────────────────────────────
  const renderBars = () => {
    if (type === 'radial') {
      return <div className="cb" style={{ position: 'absolute', inset: 0, background: color }} />;
    }

    if (type === 'blinds') {
      const N = 10;
      return Array.from({ length: N }, (_, i) => (
        <div
          key={i}
          className="cb"
          style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: `${(i / N) * 100}%`,
            width: `${(1 / N) * 100 + 0.2}%`,
            background: color,
          }}
        />
      ));
    }

    if (type === 'bars') {
      const N = 9;
      return Array.from({ length: N }, (_, i) => (
        <div
          key={i}
          className="cb"
          style={{
            position: 'absolute',
            left: 0, right: 0,
            top: `${(i / N) * 100}%`,
            height: `${(1 / N) * 100 + 0.2}%`,
            background: color,
          }}
        />
      ));
    }

    if (type === 'slash') {
      const N = 8;
      return Array.from({ length: N }, (_, i) => (
        <div
          key={i}
          className="cb"
          style={{
            position: 'absolute',
            left: '-6%', right: '-6%',
            top: `${(i / N) * 100}%`,
            height: `${(1 / N) * 100 + 0.3}%`,
            background: color,
            transform: 'skewX(-4deg)',
            transformOrigin: 'right center',
          }}
        />
      ));
    }

    if (type === 'split') {
      const N = 8;
      return Array.from({ length: N }, (_, i) => (
        <div
          key={i}
          className="cb"
          style={{
            position: 'absolute',
            left: 0, right: 0,
            top: `${(i / N) * 100}%`,
            height: `${(1 / N) * 100 + 0.2}%`,
            background: color,
          }}
        />
      ));
    }

    return null;
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {children}

      {/*
        Full-viewport fixed overlay.
        position:fixed ignores parent transforms/layout — always fills the browser window.
        z-index 9999: above all content, below StaggeredMenu (10000) and Loader (99999).
      */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          overflow: 'hidden',
          // radial starts as full circle
          clipPath: type === 'radial' ? 'circle(150% at 50% 50%)' : undefined,
        }}
      >
        {renderBars()}
      </div>
    </div>
  );
};

export default CurtainReveal;

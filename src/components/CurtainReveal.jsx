import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * CurtainReveal — wraps any section with a cinematic curtain wipe on scroll entry.
 *
 * types:
 *   'blinds'  — vertical panels swing open left-to-right (Venetian blinds)
 *   'bars'    — horizontal bars peel off with random stagger
 *   'slash'   — skewed horizontal strips slide out to the right
 *   'split'   — top half flies up, bottom half flies down simultaneously
 *   'radial'  — circular iris opens from the center outward
 */
const CurtainReveal = ({
  children,
  type = 'bars',
  color = '#0c0c0e',
  triggerStart = 'top 88%',
  className = '',
}) => {
  const wrapperRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const overlay = overlayRef.current;
    if (!wrapper || !overlay) return;

    // Each bar is a child with class .cb
    const bars = gsap.utils.toArray('.cb', overlay);

    const ctx = gsap.context(() => {
      // Don't animate if user prefers reduced motion
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      ScrollTrigger.create({
        trigger: wrapper,
        start: triggerStart,
        once: true,
        onEnter: () => {
          if (reduced) {
            overlay.style.display = 'none';
            return;
          }

          const tl = gsap.timeline({
            defaults: { ease: 'expo.inOut' },
            onComplete: () => {
              // Remove from DOM after animation to free memory and allow interactions
              if (overlay) overlay.style.display = 'none';
            },
          });

          if (type === 'blinds') {
            // Venetian blinds: vertical bars collapse from right to left
            gsap.set(bars, { transformOrigin: 'left center', scaleX: 1 });
            tl.to(bars, {
              scaleX: 0,
              duration: 0.85,
              stagger: { each: 0.07, from: 'start' },
            });
          } else if (type === 'bars') {
            // Horizontal bars peel off in a random order
            gsap.set(bars, { transformOrigin: 'center top', scaleY: 1 });
            tl.to(bars, {
              scaleY: 0,
              duration: 0.7,
              stagger: { each: 0.055, from: 'random' },
            });
          } else if (type === 'slash') {
            // Skewed strips slide right like a diagonal wipe
            tl.to(bars, {
              xPercent: 110,
              duration: 0.8,
              stagger: { each: 0.04, from: 'start' },
            });
          } else if (type === 'split') {
            // Top half goes up, bottom half goes down simultaneously
            const mid = Math.ceil(bars.length / 2);
            const topBars = bars.slice(0, mid);
            const botBars = bars.slice(mid);
            tl.to(topBars, { yPercent: -110, duration: 0.9 }, 0)
              .to(botBars, { yPercent: 110, duration: 0.9 }, 0);
          } else if (type === 'radial') {
            // Circular iris closes inward to 0
            tl.to(overlay, {
              clipPath: 'circle(0% at 50% 50%)',
              duration: 1.1,
              ease: 'expo.inOut',
            });
          }
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, [type, triggerStart]);

  // ─── Bar renderers per type ─────────────────────────────────────────────────
  const renderBars = () => {
    if (type === 'radial') {
      // Single full-screen panel; clip-path is animated on the overlay itself
      return (
        <div
          className="cb absolute inset-0"
          style={{ background: color }}
        />
      );
    }

    if (type === 'blinds') {
      const N = 9;
      return Array.from({ length: N }, (_, i) => (
        <div
          key={i}
          className="cb absolute top-0 bottom-0"
          style={{
            left: `${(i / N) * 100}%`,
            width: `${(1 / N) * 100 + 0.3}%`,
            background: color,
          }}
        />
      ));
    }

    if (type === 'bars') {
      const N = 8;
      return Array.from({ length: N }, (_, i) => (
        <div
          key={i}
          className="cb absolute left-0 right-0"
          style={{
            top: `${(i / N) * 100}%`,
            height: `${(1 / N) * 100 + 0.3}%`,
            background: color,
          }}
        />
      ));
    }

    if (type === 'slash') {
      const N = 7;
      return Array.from({ length: N }, (_, i) => (
        <div
          key={i}
          className="cb absolute left-[-5%] right-[-5%]"
          style={{
            top: `${(i / N) * 100}%`,
            height: `${(1 / N) * 100 + 0.5}%`,
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
          className="cb absolute left-0 right-0"
          style={{
            top: `${(i / N) * 100}%`,
            height: `${(1 / N) * 100 + 0.3}%`,
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
      {/* Curtain overlay — sits on top of content, animates away on scroll entry */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 45,
          pointerEvents: 'none',
          overflow: 'hidden',
          // For radial, start with full circle clip-path
          clipPath: type === 'radial' ? 'circle(100% at 50% 50%)' : undefined,
        }}
      >
        {renderBars()}
      </div>
    </div>
  );
};

export default CurtainReveal;

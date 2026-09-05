import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * GlobalCurtain — full-viewport, imperative-API, replayable curtain.
 *
 * Use cover(config, callback) to slam curtain closed.
 * Use reveal(callback) to open curtain and reveal content.
 */
const GlobalCurtain = forwardRef((props, ref) => {
  const overlayRef = useRef(null);
  const [activeConfig, setActiveConfig] = useState({ type: 'bars', color: '#111827' });

  useImperativeHandle(ref, () => ({
    cover: (config, onComplete) => {
      if (!overlayRef.current) {
        if (onComplete) onComplete();
        return;
      }

      setActiveConfig({
        type: config.type || 'bars',
        color: config.color || '#111827',
      });

      // Quick flush to ensure bars render correctly
      setTimeout(() => {
        const overlay = overlayRef.current;
        gsap.set(overlay, { autoAlpha: 1, display: 'block' });

        const bars = gsap.utils.toArray('.gcb', overlay);
        const { type } = config;

        // Reset positions based on type
        if (type === 'blinds') gsap.set(bars, { scaleX: 0, transformOrigin: 'left center' });
        else if (type === 'bars') gsap.set(bars, { scaleY: 0, transformOrigin: 'center top' });
        else if (type === 'slash') gsap.set(bars, { xPercent: 112 });
        else if (type === 'split') {
          const mid = Math.ceil(bars.length / 2);
          gsap.set(bars.slice(0, mid), { yPercent: -112 });
          gsap.set(bars.slice(mid), { yPercent: 112 });
        } else if (type === 'radial') {
          gsap.set(overlay, { clipPath: 'circle(0% at 50% 50%)' });
        }

        const tl = gsap.timeline({
          defaults: { ease: 'expo.inOut' },
          onComplete,
        });

        if (type === 'blinds') {
          tl.to(bars, { scaleX: 1, duration: 0.7, stagger: { each: 0.05, from: 'start' } });
        } else if (type === 'bars') {
          tl.to(bars, { scaleY: 1, duration: 0.6, stagger: { each: 0.04, from: 'random' } });
        } else if (type === 'slash') {
          tl.to(bars, { xPercent: 0, duration: 0.7, stagger: { each: 0.04, from: 'start' } });
        } else if (type === 'split') {
          tl.to(bars, { yPercent: 0, duration: 0.8 });
        } else if (type === 'radial') {
          tl.to(overlay, { clipPath: 'circle(150% at 50% 50%)', duration: 0.9 });
        }
      }, 0);
    },

    reveal: (onComplete) => {
      if (!overlayRef.current) return;
      const overlay = overlayRef.current;
      const bars = gsap.utils.toArray('.gcb', overlay);
      const { type } = activeConfig;

      const tl = gsap.timeline({
        defaults: { ease: 'expo.inOut' },
        onComplete: () => {
          gsap.set(overlay, { autoAlpha: 0, display: 'none' });
          if (onComplete) onComplete();
        },
      });

      if (type === 'blinds') {
        tl.to(bars, { scaleX: 0, transformOrigin: 'right center', duration: 0.7, stagger: { each: 0.05, from: 'start' } });
      } else if (type === 'bars') {
        tl.to(bars, { scaleY: 0, transformOrigin: 'center bottom', duration: 0.6, stagger: { each: 0.04, from: 'random' } });
      } else if (type === 'slash') {
        tl.to(bars, { xPercent: -112, duration: 0.7, stagger: { each: 0.04, from: 'start' } });
      } else if (type === 'split') {
        const mid = Math.ceil(bars.length / 2);
        tl.to(bars.slice(0, mid), { yPercent: -112, duration: 0.8 }, 0)
          .to(bars.slice(mid), { yPercent: 112, duration: 0.8 }, 0);
      } else if (type === 'radial') {
        tl.to(overlay, { clipPath: 'circle(0% at 50% 50%)', duration: 0.9 });
      }
    },
  }));

  const renderBars = () => {
    const { type, color } = activeConfig;

    if (type === 'radial') {
      return <div className="gcb" style={{ position: 'absolute', inset: 0, background: color }} />;
    }

    if (type === 'blinds') {
      const N = 10;
      return Array.from({ length: N }, (_, i) => (
        <div
          key={i}
          className="gcb"
          style={{
            position: 'absolute', top: 0, bottom: 0,
            left: `${(i / N) * 100}%`, width: `${(1 / N) * 100 + 0.2}%`, background: color,
          }}
        />
      ));
    }

    if (type === 'bars') {
      const N = 9;
      return Array.from({ length: N }, (_, i) => (
        <div
          key={i}
          className="gcb"
          style={{
            position: 'absolute', left: 0, right: 0,
            top: `${(i / N) * 100}%`, height: `${(1 / N) * 100 + 0.2}%`, background: color,
          }}
        />
      ));
    }

    if (type === 'slash') {
      const N = 8;
      return Array.from({ length: N }, (_, i) => (
        <div
          key={i}
          className="gcb"
          style={{
            position: 'absolute', left: '-6%', right: '-6%',
            top: `${(i / N) * 100}%`, height: `${(1 / N) * 100 + 0.3}%`, background: color,
            transform: 'skewX(-4deg)', transformOrigin: 'right center',
          }}
        />
      ));
    }

    if (type === 'split') {
      const N = 8;
      return Array.from({ length: N }, (_, i) => (
        <div
          key={i}
          className="gcb"
          style={{
            position: 'absolute', left: 0, right: 0,
            top: `${(i / N) * 100}%`, height: `${(1 / N) * 100 + 0.2}%`, background: color,
          }}
        />
      ));
    }
    return null;
  };

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999, // Above everything except StaggeredMenu (100000)
        pointerEvents: 'none',
        overflow: 'hidden',
        display: 'none',
        autoAlpha: 0,
      }}
    >
      {renderBars()}
    </div>
  );
});

export default GlobalCurtain;


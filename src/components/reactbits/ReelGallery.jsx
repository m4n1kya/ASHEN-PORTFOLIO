import React, { useRef, useMemo, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Observer } from 'gsap/Observer';
import './ReelGallery.css';

gsap.registerPlugin(Observer, useGSAP);

const ReelGallery = ({
  items = [],
  rows = 4,
  gap = 24,
  speed = 1,
}) => {
  const containerRef = useRef(null);
  const trackRefs = useRef([]);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  
  // Distribute items into rows
  const rowItems = useMemo(() => {
    // Pad items to ensure each row gets the exact same number of items
    const paddedItems = [...items];
    let i = 0;
    while (paddedItems.length % rows !== 0) {
      paddedItems.push(items[i % items.length]);
      i++;
    }

    const rs = Array.from({ length: rows }, () => []);
    paddedItems.forEach((item, index) => rs[index % rows].push(item));
    // Repeat items so they wrap seamlessly horizontally
    return rs.map(r => {
      return [...r, ...r, ...r, ...r, ...r, ...r]; 
    });
  }, [items, rows]);

  useGSAP(() => {
    Observer.create({
      target: containerRef.current,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => { velocityRef.current = 0; },
      onUp: () => { velocityRef.current = 0; },
      onChangeY: (self) => {
        // We still listen to Y for mouse wheel, but map it to horizontal velocity
        velocityRef.current += self.deltaY * 0.05 * speed;
      },
      onChangeX: (self) => {
        // Also listen to X for trackpads
        velocityRef.current += self.deltaX * 0.05 * speed;
      },
      tolerance: 10,
      preventDefault: true
    });

    const ticker = gsap.ticker.add(() => {
      velocityRef.current *= 0.92;
      offsetRef.current += velocityRef.current + (0.5 * speed);

      trackRefs.current.forEach((track, i) => {
        if (!track) return;
        const dir = i % 2 === 0 ? 1 : -1;
        const parallaxSpeed = 1 + (i % 3) * 0.2; 
        
        const x = offsetRef.current * dir * parallaxSpeed;
        
        // Mathematically perfect cycle width: (itemWidth + gap) * baseItems
        // We know we repeated 6 times, so track.children.length / 6 is the base item count
        const baseItemCount = track.children.length / 6;
        const itemWidth = track.children[0].offsetWidth;
        const cycleWidth = baseItemCount * (itemWidth + gap);
        
        const wrappedX = gsap.utils.wrap(0, -cycleWidth, -x);
        
        gsap.set(track, { x: wrappedX });
      });
    });

    return () => {
      gsap.ticker.remove(ticker);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="reel-gallery">
      <div className="reel-gallery__plane">
        {rowItems.map((row, r) => (
          <div className="reel-gallery__row" key={r} style={{ gap: `${gap}px` }}>
            <div 
              className="reel-gallery__track" 
              ref={el => trackRefs.current[r] = el}
              style={{ gap: `${gap}px` }}
            >
              {row.map((item, i) => (
                <div 
                  key={`${r}-${i}`} 
                  className="reel-gallery__tile"
                >
                  <img src={item.image} alt={item.title} loading="eager" fetchpriority="high" decoding="sync" />
                  <div className="reel-gallery__tile-overlay" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelGallery;

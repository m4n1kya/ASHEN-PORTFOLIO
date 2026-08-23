import React, { useRef, useMemo, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Observer } from 'gsap/Observer';
import './ReelGallery.css';

gsap.registerPlugin(Observer, useGSAP);

const ReelGallery = ({
  items = [],
  columns = 4,
  gap = 24,
  speed = 1,
}) => {
  const containerRef = useRef(null);
  const trackRefs = useRef([]);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  
  // Distribute items into columns
  const columnItems = useMemo(() => {
    const cols = Array.from({ length: columns }, () => []);
    items.forEach((item, i) => cols[i % columns].push(item));
    // To ensure smooth infinite scrolling, we need to duplicate the items in each column 
    // so there's enough content to wrap around
    return cols.map(col => {
      // Repeat the items a few times to fill a massive vertical space
      return [...col, ...col, ...col, ...col, ...col, ...col]; 
    });
  }, [items, columns]);

  useGSAP(() => {
    // We use GSAP Observer to catch scroll/wheel/touch drag events 
    // and translate them into velocity, just like the premium component!
    Observer.create({
      target: containerRef.current,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => { velocityRef.current = 0; },
      onUp: () => { velocityRef.current = 0; },
      onChangeY: (self) => {
        // Add velocity based on wheel delta or drag delta
        velocityRef.current += self.deltaY * 0.05 * speed;
      },
      tolerance: 10,
      preventDefault: true
    });

    // Animate loop to apply velocity and friction
    const ticker = gsap.ticker.add(() => {
      // Apply friction
      velocityRef.current *= 0.92;
      
      // Auto-drift slightly even if not scrolling
      offsetRef.current += velocityRef.current + (0.5 * speed);

      // Apply the offset to each column with a parallax multiplier
      trackRefs.current.forEach((track, i) => {
        if (!track) return;
        // Alternate directions or speeds based on index
        const dir = i % 2 === 0 ? 1 : -1;
        const parallaxSpeed = 1 + (i % 3) * 0.2; // 1.0, 1.2, 1.4
        
        const y = offsetRef.current * dir * parallaxSpeed;
        
        // Wrap logic: we modulo it against the track's scroll height
        // We know we repeated the items 6 times, so 1/6th of the height is one cycle
        const cycleHeight = track.scrollHeight / 6;
        const wrappedY = gsap.utils.wrap(0, -cycleHeight, -y);
        
        gsap.set(track, { y: wrappedY });
      });
    });

    return () => {
      gsap.ticker.remove(ticker);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="reel-gallery">
      <div className="reel-gallery__plane">
        {columnItems.map((col, c) => (
          <div className="reel-gallery__col" key={c} style={{ gap: `${gap}px` }}>
            <div 
              className="reel-gallery__track" 
              ref={el => trackRefs.current[c] = el}
              style={{ gap: `${gap}px` }}
            >
              {col.map((item, i) => (
                <div 
                  key={`${c}-${i}`} 
                  className="reel-gallery__tile"
                >
                  <img src={item.image} alt={item.title} />
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

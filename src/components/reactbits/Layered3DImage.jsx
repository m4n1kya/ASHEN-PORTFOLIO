import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Layered3DImage.css';

const Layered3DImage = ({ 
  imageSrc, 
  layersCount = 5,
  className = "" 
}) => {
  const containerRef = useRef(null);
  const stackRef = useRef(null);
  const layersRef = useRef([]);
  
  // Cache for configuration
  const config = useRef({
    depthStep: 36,
    scale3D: 0.07,
    tiltMax: 35,
    panMax: 40,
    opacityFalloff: 0.15,
    moveAmplify: 0.6,
    tiltBoost: 1.25,
    panBoost: 1.25,
    duration: 0.8,
    ease: "power2.inOut",
    stagger: 0.05,
    blurSeq: [0, 0.1, 0.2, 0.3, 0.4, 0.6, 0.8, 1.0, 1.3, 1.6]
  });

  const state = useRef({
    isHovered: false,
    rafId: null,
    pendingMouseEvent: null
  });

  const compute3DOpacity = (i) => {
    return Math.max(1 - config.current.opacityFalloff * i, 0.1);
  };

  const getBlur = (i) => {
    if (i === 0) return 0;
    return config.current.blurSeq[Math.min(i, config.current.blurSeq.length - 1)];
  };

  const layout3D = (depthFactor = 1, animate = false) => {
    const depth = config.current.depthStep * depthFactor;
    layersRef.current.forEach((l, i) => {
      const z = Math.round(i * depth) + i * 0.1;
      const s = Math.max(1 - i * config.current.scale3D, 0.35);
      const o = compute3DOpacity(i);
      const b = getBlur(i);
      
      if (animate) {
        gsap.to(l, {
          z: z,
          scale: s,
          opacity: o,
          duration: config.current.duration,
          ease: config.current.ease,
          stagger: config.current.stagger,
          filter: `blur(${b}px)`
        });
      } else {
        gsap.set(l, {
          z: z,
          scale: s,
          opacity: o,
          filter: `blur(${b}px)`
        });
      }
    });
  };

  const tiltPan = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    const d = Math.min(1, Math.hypot(nx, ny));
    const depthFactor = 0.9 + d * 0.2;
    
    layout3D(depthFactor, false);

    const tilt = config.current.tiltMax * config.current.tiltBoost * config.current.moveAmplify;
    const pan = config.current.panMax * config.current.panBoost * config.current.moveAmplify;

    gsap.to(stackRef.current, {
      rotationY: nx * tilt,
      rotationX: -ny * tilt,
      x: nx * pan,
      y: ny * pan,
      scale: 1,
      duration: 0.18,
      ease: "power2.out"
    });
  };

  const center3D = (animate = true) => {
    if (animate) {
      gsap.to(stackRef.current, {
        rotationX: 0,
        rotationY: 0,
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    } else {
      gsap.set(stackRef.current, { rotationX: 0, rotationY: 0, x: 0, y: 0 });
    }
  };

  const collapse2D = () => {
    gsap.killTweensOf(stackRef.current);
    gsap.to(stackRef.current, {
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      x: 0,
      y: 0,
      z: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
    
    const rev = [...layersRef.current].reverse();
    gsap.to(rev, {
      z: 0,
      scale: (i, t) => {
        const idx = layersRef.current.indexOf(t);
        return idx === 0 ? 1 : 0.95;
      },
      opacity: (i, t) => {
        const idx = layersRef.current.indexOf(t);
        return idx === 0 ? 1 : 0;
      },
      filter: "blur(0px)",
      duration: config.current.duration * 0.8,
      ease: config.current.ease,
      stagger: -config.current.stagger,
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.classList.remove("is-3d");
        }
      }
    });
  };

  const expand3D = () => {
    if (containerRef.current) {
      containerRef.current.classList.add("is-3d");
    }
    const rev = [...layersRef.current].reverse();
    gsap.to(rev, {
      scale: (i, t) => {
        const idx = layersRef.current.indexOf(t);
        return idx === 0 ? 1 : Math.max(1 - idx * config.current.scale3D, 0.35);
      },
      opacity: (i, t) => {
        const idx = layersRef.current.indexOf(t);
        return idx === 0 ? 1 : compute3DOpacity(idx);
      },
      duration: config.current.duration,
      ease: config.current.ease,
      stagger: config.current.stagger,
      onComplete: () => {
        if (state.current.isHovered) {
          layout3D(1, true);
        }
      }
    });
  };

  const onEnter = () => {
    state.current.isHovered = true;
    expand3D();
  };

  const onLeave = () => {
    state.current.isHovered = false;
    center3D(true);
    collapse2D();
  };

  const processMouseMove = () => {
    if (!state.current.pendingMouseEvent) {
      state.current.rafId = null;
      return;
    }

    const e = state.current.pendingMouseEvent;
    state.current.pendingMouseEvent = null;
    state.current.rafId = null;

    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const isInsideCanvas =
      e.clientX >= rect.left &&
      e.clientX <= rect.left + rect.width &&
      e.clientY >= rect.top &&
      e.clientY <= rect.top + rect.height;

    if (state.current.isHovered && isInsideCanvas) {
      tiltPan(e);
    }
  };

  const onMove = (e) => {
    state.current.pendingMouseEvent = e;
    if (!state.current.rafId) {
      state.current.rafId = requestAnimationFrame(processMouseMove);
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      if (state.current.rafId) {
        cancelAnimationFrame(state.current.rafId);
      }
    };
  }, []);

  return (
    <div 
      className={`image-container-3d ${className}`} 
      ref={containerRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="image-stack" ref={stackRef}>
        {Array.from({ length: layersCount }).map((_, i) => (
          <div
            key={i}
            className={`image-layer ${i === 0 ? 'rectangle' : ''}`}
            ref={el => layersRef.current[i] = el}
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Layered3DImage;

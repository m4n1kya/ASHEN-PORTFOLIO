import { useEffect, useRef, useState } from "react";

const XRayCursor = () => {
  const cursorRef = useRef(null);
  const turbRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const cursor = cursorRef.current;
    const turb = turbRef.current;
    if (!cursor || !turb) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let isHovering = false;
    let animationFrameId;
    let time = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button"
      ) {
        isHovering = true;
      }
    };

    const handleMouseOut = () => {
      isHovering = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    const animate = () => {
      const vx = mouseX - cursorX;
      const vy = mouseY - cursorY;

      cursorX += vx * 0.12;
      cursorY += vy * 0.12;

      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx);

      // Extreme jelly stretch on movement
      const scaleX = 1 + Math.min(speed / 60, 0.9);
      const scaleY = 1 - Math.min(speed / 60, 0.45);

      const size = isHovering ? 110 : 65;

      cursor.style.transform = `translate3d(${cursorX - size / 2}px, ${cursorY - size / 2}px, 0) rotate(${angle}rad) scale(${scaleX}, ${scaleY})`;
      cursor.style.width = `${size}px`;
      cursor.style.height = `${size}px`;

      // Animate SVG turbulence only when moving!
      // This causes the cursor to freeze into an undefined, organic splat when stationary.
      if (speed > 0.1) {
        time += speed * 0.0008;
      }
      
      const freqX = 0.02 + Math.sin(time) * 0.015;
      const freqY = 0.025 + Math.cos(time * 0.8) * 0.015;
      // Use absolute values to prevent SVG errors with negative frequencies
      turb.setAttribute("baseFrequency", `${Math.abs(freqX).toFixed(4)} ${Math.abs(freqY).toFixed(4)}`);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* SVG filter that warps the blob into a living organic shape */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="jelly-warp" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.025 0.03"
              numOctaves="3"
              seed="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "65px",
          height: "65px",
          borderRadius: "50%",
          backgroundColor: "white",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform, width, height",
          transition: "width 0.3s ease-out, height 0.3s ease-out",
          filter: "url(#jelly-warp)",
          transformOrigin: "center center",
        }}
      />
    </>
  );
};

export default XRayCursor;

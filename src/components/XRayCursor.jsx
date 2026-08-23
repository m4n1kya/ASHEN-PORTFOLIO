import { useEffect, useRef, useState } from "react";

const styleContent = `
@keyframes jellyBlob {
  0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
  25% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
  75% { border-radius: 70% 30% 50% 50% / 50% 70% 30% 50%; }
  100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
}
`;

const XRayCursor = ({ isVisible = true }) => {
  const cursorRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;
    let smoothedVx = 0;
    let smoothedVy = 0;
    let isHovering = false;
    let animationFrameId;

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
      // Calculate raw velocity
      const rawVx = mouseX - lastMouseX;
      const rawVy = mouseY - lastMouseY;
      lastMouseX = mouseX;
      lastMouseY = mouseY;

      // Smooth the velocity so the stretch effect doesn't jitter
      smoothedVx += (rawVx - smoothedVx) * 0.15;
      smoothedVy += (rawVy - smoothedVy) * 0.15;

      // Calculate speed and angle for the liquid stretch effect using smoothed velocity
      const speed = Math.sqrt(smoothedVx * smoothedVx + smoothedVy * smoothedVy);
      const angle = Math.atan2(smoothedVy, smoothedVx);
      
      // Very little, subtle stretch on moving
      const scaleX = 1 + Math.min(speed / 150, 0.25);
      const scaleY = 1 - Math.min(speed / 150, 0.15);

      const size = isHovering ? 120 : 70;
      
      // Cursor perfectly instantly centers on mouseX/mouseY
      cursor.style.transform = `translate3d(${mouseX - size / 2}px, ${mouseY - size / 2}px, 0) rotate(${angle}rad) scale(${scaleX}, ${scaleY})`;
      cursor.style.width = `${size}px`;
      cursor.style.height = `${size}px`;

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
      <style>{styleContent}</style>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "60px",
          height: "60px",
          backgroundColor: "white",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform, width, height, opacity",
          opacity: isVisible ? 1 : 0,
          transition: "width 0.3s ease-out, height 0.3s ease-out, opacity 0.4s ease-out",
          animation: "jellyBlob 2.5s infinite linear",
          transformOrigin: "center center",
        }}
      />
    </>
  );
};

export default XRayCursor;

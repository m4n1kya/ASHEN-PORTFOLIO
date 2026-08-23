import { useEffect, useRef, useState } from "react";

const styleContent = `
@keyframes jellyBlob {
  0% { border-radius: 30% 70% 30% 70% / 60% 30% 70% 40%; }
  25% { border-radius: 70% 30% 60% 40% / 30% 70% 40% 60%; }
  50% { border-radius: 40% 60% 70% 30% / 70% 40% 60% 30%; }
  75% { border-radius: 60% 40% 30% 70% / 40% 60% 30% 70%; }
  100% { border-radius: 30% 70% 30% 70% / 60% 30% 70% 40%; }
}
`;

const XRayCursor = () => {
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
    let cursorX = mouseX;
    let cursorY = mouseY;
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
      // Calculate velocity and apply spring-like lag
      const vx = mouseX - cursorX;
      const vy = mouseY - cursorY;
      
      cursorX += vx * 0.15;
      cursorY += vy * 0.15;

      // Calculate speed and angle for the jelly stretch effect
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx);
      
      // More extreme stretch and squish for a highly liquid effect
      const scaleX = 1 + Math.min(speed / 50, 1.5);
      const scaleY = 1 - Math.min(speed / 50, 0.7);

      const size = isHovering ? 100 : 60;
      
      cursor.style.transform = `translate3d(${cursorX - size / 2}px, ${cursorY - size / 2}px, 0) rotate(${angle}rad) scale(${scaleX}, ${scaleY})`;
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
          willChange: "transform, width, height",
          transition: "width 0.3s ease-out, height 0.3s ease-out",
          animation: "jellyBlob 2.5s infinite linear",
          transformOrigin: "center center",
        }}
      />
    </>
  );
};

export default XRayCursor;

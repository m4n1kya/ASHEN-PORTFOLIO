import { useEffect, useRef, useState } from "react";

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
      // Lerp for smooth spring-like lag
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      const size = isHovering ? 100 : 60;
      
      cursor.style.transform = `translate3d(${cursorX - size / 2}px, ${cursorY - size / 2}px, 0)`;
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
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "white",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform, width, height",
        transition: "width 0.3s ease-out, height 0.3s ease-out",
      }}
    />
  );
};

export default XRayCursor;

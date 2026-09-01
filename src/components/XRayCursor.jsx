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
  const [isWindowHovered, setIsWindowHovered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = -9999;
    let mouseY = -9999;
    let lastMouseX = -9999;
    let lastMouseY = -9999;
    let smoothedVx = 0;
    let smoothedVy = 0;
    let isHovering = false;
    let isImageHovering = false;
    let isWindowHoveredRaw = false;
    let windowScale = 0;
    let currentSize = 80;
    let animationFrameId;

    const handleMouseMove = (e) => {
      if (!isWindowHoveredRaw) {
        setIsWindowHovered(true);
        isWindowHoveredRaw = true;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.classList && target.classList.contains("profile-img")) {
        isImageHovering = true;
      } else if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button"
      ) {
        if (target.closest && target.closest(".no-cursor-hover")) return;
        isHovering = true;
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (target.classList && target.classList.contains("profile-img")) {
        isImageHovering = false;
      } else {
        isHovering = false;
      }
    };

    const handleWindowLeave = () => {
      setIsWindowHovered(false);
      isWindowHoveredRaw = false;
    };
    const handleWindowEnter = () => {
      setIsWindowHovered(true);
      isWindowHoveredRaw = true;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleWindowLeave);
    document.addEventListener("mouseenter", handleWindowEnter);

    const animate = () => {
      // Calculate raw velocity
      const rawVx = mouseX - lastMouseX;
      const rawVy = mouseY - lastMouseY;
      lastMouseX = mouseX;
      lastMouseY = mouseY;

      // Use a much faster smoothing factor (0.4) so the rotation angle doesn't lag wildly when drawing circles
      smoothedVx += (rawVx - smoothedVx) * 0.4;
      smoothedVy += (rawVy - smoothedVy) * 0.4;

      // Calculate speed and angle for the liquid stretch effect using smoothed velocity
      const speed = Math.sqrt(smoothedVx * smoothedVx + smoothedVy * smoothedVy);
      const angle = Math.atan2(smoothedVy, smoothedVx);
      
      // Balanced liquid stretch
      const baseScaleX = 1 + Math.min(speed / 80, 0.40);
      const baseScaleY = 1 - Math.min(speed / 120, 0.25);

      // Smooth suck-in/expand animation
      const targetWindowScale = isWindowHoveredRaw ? 1 : 0;
      windowScale += (targetWindowScale - windowScale) * 0.15;
      
      const finalScaleX = baseScaleX * windowScale;
      const finalScaleY = baseScaleY * windowScale;

      // Calculate target size and dynamic smoothing speed
      let targetSize = 80;
      let lerpSpeed = 0.15; // Snappy default

      if (isImageHovering) {
        targetSize = 180;
        lerpSpeed = 0.025; // Slower and elegant for the profile image
      } else if (isHovering) {
        targetSize = 140;
        lerpSpeed = 0.15; // Snappy for buttons/links
      } else {
        lerpSpeed = 0.08; // Smooth shrink when leaving
      }
      
      currentSize += (targetSize - currentSize) * lerpSpeed;
      
      // Cursor perfectly instantly centers on mouseX/mouseY
      cursor.style.transform = `translate3d(${mouseX - currentSize / 2}px, ${mouseY - currentSize / 2}px, 0) rotate(${angle}rad) scale(${finalScaleX}, ${finalScaleY})`;
      cursor.style.width = `${currentSize}px`;
      cursor.style.height = `${currentSize}px`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleWindowLeave);
      document.removeEventListener("mouseenter", handleWindowEnter);
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
          width: "80px",
          height: "80px",
          backgroundColor: "white",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 999998,
          willChange: "transform, width, height, opacity",
          opacity: isVisible && isWindowHovered ? 1 : 0,
          transition: "opacity 0.4s ease-out",
          animation: "jellyBlob 2.5s infinite linear",
          transformOrigin: "center center",
        }}
      />
    </>
  );
};

export default XRayCursor;

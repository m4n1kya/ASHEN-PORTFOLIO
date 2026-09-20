import { useEffect, useRef } from "react";

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
  // Detect touch device once at construction — no re-render needed
  const isTouchRef = useRef(
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
  );

  useEffect(() => {
    if (isTouchRef.current) return;

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

    // Directly mutate DOM opacity — bypasses the React re-render queue so the
    // blob appears on the exact same frame as the first mouse move event,
    // eliminating the 100–300 ms lag from setState → re-render → paint.
    const setOpacity = (val) => {
      cursor.style.opacity = val;
    };

    const handleMouseMove = (e) => {
      if (!isWindowHoveredRaw) {
        isWindowHoveredRaw = true;
        if (isVisible) setOpacity("1");
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
      isWindowHoveredRaw = false;
      setOpacity("0");
    };
    const handleWindowEnter = () => {
      isWindowHoveredRaw = true;
      if (isVisible) setOpacity("1");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleWindowLeave);
    document.addEventListener("mouseenter", handleWindowEnter);

    const animate = () => {
      const rawVx = mouseX - lastMouseX;
      const rawVy = mouseY - lastMouseY;
      lastMouseX = mouseX;
      lastMouseY = mouseY;

      // Faster smoothing factor so rotation doesn't lag when drawing circles
      smoothedVx += (rawVx - smoothedVx) * 0.4;
      smoothedVy += (rawVy - smoothedVy) * 0.4;

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

      let targetSize = 80;
      let lerpSpeed = 0.15;

      if (isImageHovering) {
        targetSize = 170;
        lerpSpeed = 0.025;
      } else if (isHovering) {
        targetSize = 140;
        lerpSpeed = 0.15;
      } else {
        lerpSpeed = 0.08;
      }

      currentSize += (targetSize - currentSize) * lerpSpeed;

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
  }, [isVisible]);

  if (isTouchRef.current) return null;

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
          // Start fully transparent — opacity is driven directly via DOM mutations
          // in the effect above, bypassing React re-renders entirely.
          opacity: 0,
          transition: "opacity 0.4s ease-out",
          animation: "jellyBlob 2.5s infinite linear",
          transformOrigin: "center center",
        }}
      />
    </>
  );
};

export default XRayCursor;

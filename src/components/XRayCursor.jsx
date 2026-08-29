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
    
    // For smooth magnetic lerping
    let currentX = -9999;
    let currentY = -9999;
    let currentWidth = 80;
    let currentHeight = 80;
    let currentBr = 40; // border radius in px
    
    let lastMouseX = -9999;
    let lastMouseY = -9999;
    let smoothedVx = 0;
    let smoothedVy = 0;
    let isHovering = false;
    let isWindowHoveredRaw = false;
    let windowScale = 0;
    let animationFrameId;
    let magneticTarget = null;

    const handleMouseMove = (e) => {
      if (!isWindowHoveredRaw) {
        setIsWindowHovered(true);
        isWindowHoveredRaw = true;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (currentX === -9999) {
        currentX = mouseX;
        currentY = mouseY;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      const mag = target.closest && target.closest('[data-magnetic="true"]');
      if (mag) {
        magneticTarget = mag;
        return;
      }
      
      if (
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
      if (target.closest && target.closest('[data-magnetic="true"]')) {
        magneticTarget = null;
      }
      isHovering = false;
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
      const rawVx = mouseX - lastMouseX;
      const rawVy = mouseY - lastMouseY;
      lastMouseX = mouseX;
      lastMouseY = mouseY;

      smoothedVx += (rawVx - smoothedVx) * 0.4;
      smoothedVy += (rawVy - smoothedVy) * 0.4;

      const speed = Math.sqrt(smoothedVx * smoothedVx + smoothedVy * smoothedVy);
      const angle = Math.atan2(smoothedVy, smoothedVx);
      
      const targetWindowScale = isWindowHoveredRaw ? 1 : 0;
      windowScale += (targetWindowScale - windowScale) * 0.15;

      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;
        const targetWidth = rect.width;
        const targetHeight = rect.height;
        const targetBr = 16; 
        
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        currentWidth += (targetWidth - currentWidth) * 0.18;
        currentHeight += (targetHeight - currentHeight) * 0.18;
        currentBr += (targetBr - currentBr) * 0.18;

        cursor.style.transform = `translate3d(${currentX - currentWidth / 2}px, ${currentY - currentHeight / 2}px, 0) scale(${windowScale})`;
        cursor.style.width = `${currentWidth}px`;
        cursor.style.height = `${currentHeight}px`;
        cursor.style.borderRadius = `${currentBr}px`;
        cursor.style.animation = "none";
      } else {
        const baseScaleX = 1 + Math.min(speed / 80, 0.40);
        const baseScaleY = 1 - Math.min(speed / 120, 0.25);
        
        const finalScaleX = baseScaleX * windowScale;
        const finalScaleY = baseScaleY * windowScale;

        const targetSize = isHovering ? 140 : 80;
        
        // Snap back to mouse quickly when leaving magnetic
        currentX += (mouseX - currentX) * 0.4;
        currentY += (mouseY - currentY) * 0.4;
        currentWidth += (targetSize - currentWidth) * 0.2;
        currentHeight += (targetSize - currentHeight) * 0.2;
        currentBr += (targetSize / 2 - currentBr) * 0.2;

        cursor.style.transform = `translate3d(${currentX - currentWidth / 2}px, ${currentY - currentHeight / 2}px, 0) rotate(${angle}rad) scale(${finalScaleX}, ${finalScaleY})`;
        cursor.style.width = `${currentWidth}px`;
        cursor.style.height = `${currentHeight}px`;
        
        if (Math.abs(currentBr - targetSize / 2) < 2 && Math.abs(currentWidth - targetSize) < 2) {
           cursor.style.borderRadius = "50%";
           cursor.style.animation = "jellyBlob 2.5s infinite linear";
        } else {
           cursor.style.borderRadius = `${currentBr}px`;
           cursor.style.animation = "none";
        }
      }

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
          zIndex: 9999,
          willChange: "transform, width, height, opacity, border-radius",
          opacity: isVisible && isWindowHovered ? 1 : 0,
          transition: "opacity 0.4s ease-out",
          transformOrigin: "center center",
        }}
      />
    </>
  );
};

export default XRayCursor;

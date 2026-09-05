import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

/**
 * TiltedCard
 * Implements 3D card tilt perspective with spring physics and glare overlay.
 */
export default function TiltedCard({
  children,
  className = "",
  maxTilt = 15,
  scale = 1.02,
  glare = true,
}) {
  const ref = useRef(null);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(0, springValues);
  const rotateY = useSpring(0, springValues);
  const cardScale = useSpring(1, springValues);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;

    rotateX.set(-yPct * maxTilt);
    rotateY.set(xPct * maxTilt);

    setGlarePosition({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    cardScale.set(scale);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    cardScale.set(1);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="relative flex items-center justify-center"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale: cardScale,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full rounded-xl overflow-hidden ${className}`}
      >
        {children}

        {glare && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-xl"
            style={{
              opacity: isHovered ? 0.25 : 0,
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}


import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };

/**
 * Magnet
 * Wraps interactive elements to physically pull towards the cursor when hovered.
 */
export default function Magnet({
  children,
  padding = 60,
  disabled = false,
  magnetStrength = 2.5,
  activeTransition = "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
  inactiveTransition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
  className = "",
}) {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (disabled || !ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distX = Math.abs(centerX - e.clientX);
    const distY = Math.abs(centerY - e.clientY);

    if (distX < width / 2 + padding && distY < height / 2 + padding) {
      setIsActive(true);
      const offsetX = (e.clientX - centerX) / magnetStrength;
      const offsetY = (e.clientY - centerY) / magnetStrength;
      x.set(offsetX);
      y.set(offsetY);
    } else {
      setIsActive(false);
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

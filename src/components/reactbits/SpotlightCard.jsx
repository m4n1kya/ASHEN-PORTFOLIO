import { useRef, useState } from 'react';

/**
 * SpotlightCard
 * Creates a dynamic radial light gradient following the user's cursor across the card.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.08)',
  borderColor = 'rgba(255, 255, 255, 0.2)',
  ...props
}) {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl border border-black-50 bg-black-100 p-8 ${className}`}
      {...props}
    >
      {/* Background Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-xl"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
        }}
      />
      {/* Border Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-xl"
        style={{
          opacity,
          border: `1px solid ${borderColor}`,
          maskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black 45%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black 45%, transparent 100%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

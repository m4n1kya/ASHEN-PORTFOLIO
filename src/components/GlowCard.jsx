import { forwardRef } from "react";

const GlowCard = forwardRef(({ children, className = "" }, ref) => {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;

    card.style.setProperty("--start", angle + 60);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`card ${className}`}
    >
      <div className="glow"></div>
      {children}
    </div>
  );
});

export default GlowCard;

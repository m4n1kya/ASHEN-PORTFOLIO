import React from "react";
import { motion } from "framer-motion";

/**
 * BlobTextReveal creates a liquid-like reveal animation for text.
 * It uses framer-motion to animate a clip-path polygon to simulate a blob expanding over the text.
 */
const BlobTextReveal = ({ text, className = "", delay = 0, duration = 1.2 }) => {
  // We use a complex clip-path polygon that starts as a tiny wavy blob and expands to cover the whole text.
  const blobVariants = {
    hidden: {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      opacity: 0,
    },
    visible: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 0% 0%, 0% 0%, 0% 0%)",
      opacity: 1,
      transition: {
        duration: duration,
        ease: [0.76, 0, 0.24, 1], // Custom cinematic easing
        delay: delay,
      }
    }
  };

  return (
    <div className={`relative overflow-hidden inline-block ${className}`}>
      {/* Background shadow text for subtle depth before reveal */}
      <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none">
        {text}
      </div>
      
      {/* The actual revealed text */}
      <motion.div
        variants={blobVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {text}
      </motion.div>
    </div>
  );
};

export default BlobTextReveal;

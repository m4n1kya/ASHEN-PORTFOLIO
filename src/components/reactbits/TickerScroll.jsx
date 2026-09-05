import React from "react";
import { motion } from "framer-motion";

/**
 * TickerScroll creates an infinite scrolling marquee effect for its children.
 * It duplicates the children to ensure seamless looping.
 */
const TickerScroll = ({
  children,
  speed = 20,
  direction = "left",
  className = "",
}) => {
  return (
    <div
      className={`overflow-hidden whitespace-nowrap flex relative ${className}`}
    >
      <motion.div
        className="flex whitespace-nowrap shrink-0"
        initial={{ x: direction === "left" ? "0%" : "-100%" }}
        animate={{ x: direction === "left" ? "-100%" : "0%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        }}
      >
        <div className="flex shrink-0 items-center justify-around pr-4 gap-4">
          {children}
        </div>
      </motion.div>
      <motion.div
        className="flex whitespace-nowrap shrink-0"
        initial={{ x: direction === "left" ? "0%" : "-100%" }}
        animate={{ x: direction === "left" ? "-100%" : "0%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        }}
      >
        <div className="flex shrink-0 items-center justify-around pr-4 gap-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default TickerScroll;

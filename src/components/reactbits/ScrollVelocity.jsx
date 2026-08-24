import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'framer-motion';
import { wrap } from 'framer-motion';

function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // change direction if scrolling up or down
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // Wrap the offset from 0 to -50% (assuming 2 copies of content)
  const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`);

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap w-full">
      <motion.div
        className="flex whitespace-nowrap flex-nowrap flex-none w-max"
        style={{ x }}
      >
        <div className="flex gap-12 md:gap-24 px-6 md:px-12 items-center flex-none w-max">
          {children}
        </div>
        <div className="flex gap-12 md:gap-24 px-6 md:px-12 items-center flex-none w-max">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

const ScrollVelocity = ({
  texts = [],
  items = [],
  velocity = 5,
  className = '',
  children
}) => {
  // If no children provided, render texts or items
  const content = children ? (
    children
  ) : items.length > 0 ? (
    items.map((item, i) => <span key={i}>{item}</span>)
  ) : (
    texts.map((text, i) => <span key={i} className="text-4xl md:text-6xl font-bold uppercase">{text}</span>)
  );

  return (
    <div className={`relative flex flex-col gap-16 md:gap-24 ${className}`}>
      <ParallaxText baseVelocity={velocity}>{content}</ParallaxText>
      <ParallaxText baseVelocity={-velocity}>{content}</ParallaxText>
    </div>
  );
};

export default ScrollVelocity;

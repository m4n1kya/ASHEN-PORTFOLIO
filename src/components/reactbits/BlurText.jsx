import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * BlurText
 * Animates text elements word-by-word or letter-by-letter with a blur-to-sharp transition.
 */
export default function BlurText({
  text = '',
  delay = 100,
  className = '',
  animateBy = 'words', // 'words' | 'letters'
  direction = 'top', // 'top' | 'bottom'
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = 'easeOut',
  onAnimationComplete,
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-25px,0)' }
      : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,25px,0)' };

  const defaultTo = [
    {
      filter: 'blur(5px)',
      opacity: 0.5,
      transform:
        direction === 'top'
          ? 'translate3d(0,5px,0)'
          : 'translate3d(0,-5px,0)',
    },
    { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' },
  ];

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          initial={animationFrom || defaultFrom}
          animate={inView ? animationTo || defaultTo : animationFrom || defaultFrom}
          transition={{
            duration: 0.8,
            delay: (index * delay) / 1000,
            ease: easing,
          }}
          onAnimationComplete={
            index === elements.length - 1 ? onAnimationComplete : undefined
          }
          className="inline-block"
        >
          {element === ' ' ? '\u00A0' : element}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </p>
  );
}

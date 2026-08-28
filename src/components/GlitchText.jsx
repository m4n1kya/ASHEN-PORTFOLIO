import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%*<>';

/**
 * GlitchText — scrambles random characters and settles letter-by-letter 
 * as the element scrolls into view. Great for section headings.
 */
const GlitchText = ({
  text,
  className = '',
  tag: Tag = 'span',
  triggerStart = 'top 80%',
  speed = 28,         // ms per frame
  settleFactor = 0.35, // how quickly letters lock in (0–1, lower = faster)
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let interval = null;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: triggerStart,
      once: true,
      onEnter: () => {
        let frame = 0;
        const totalFrames = Math.ceil(text.length / settleFactor);

        interval = setInterval(() => {
          el.textContent = text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              // Once enough frames have passed for this letter index, lock it
              if (i <= frame * settleFactor) return text[i];
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            })
            .join('');

          frame++;
          if (frame > totalFrames) {
            el.textContent = text; // guarantee final correct text
            clearInterval(interval);
          }
        }, speed);
      },
    });

    return () => {
      trigger.kill();
      if (interval) clearInterval(interval);
    };
  }, [text, triggerStart, speed, settleFactor]);

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
};

export default GlitchText;

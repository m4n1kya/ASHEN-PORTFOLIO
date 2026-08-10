import { useState, useEffect, useRef } from 'react';

const AmbientSound = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Initialize audio
    const audio = new Audio('/audio/ambience.mp3');
    audio.loop = true;
    audio.volume = 1.0; // Maximized volume (100%) for maximum thunder impact
    audioRef.current = audio;

    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        // Start playing after the user interacts with the page (fixes browser autoplay block)
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(err => console.log("Audio play blocked by browser:", err));
      }
    };

    // Listen for the first click, keypress, or scroll to unlock ambient playback
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });
    window.addEventListener('scroll', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [hasInteracted]);

  return null;
};

export default AmbientSound;

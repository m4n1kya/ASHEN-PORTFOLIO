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

    let isAttempting = false;

    const handleInteraction = () => {
      if (!hasInteracted && !isAttempting) {
        isAttempting = true;
        // Attempt to play audio
        audio.play().then(() => {
          setHasInteracted(true);
          setIsPlaying(true);
          // Once successful, remove all listeners to save memory
          window.removeEventListener('click', handleInteraction);
          window.removeEventListener('keydown', handleInteraction);
          window.removeEventListener('scroll', handleInteraction);
          window.removeEventListener('mousemove', handleInteraction);
          window.removeEventListener('touchstart', handleInteraction);
        }).catch(err => {
          // Playback failed (browser strict autoplay policy blocked mousemove/scroll).
          // We silently catch this and throttle the next attempt to prevent crashing the browser.
          setTimeout(() => { isAttempting = false; }, 500);
        });
      }
    };

    // Listen to every possible interaction, including cursor movement!
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [hasInteracted]);

  return null;
};

export default AmbientSound;

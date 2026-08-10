import { useEffect, useRef } from 'react';

const AmbientSound = () => {
  const audioRef = useRef(null);
  const isAttemptingRef = useRef(false);

  useEffect(() => {
    // Initialize audio only once
    const audio = new Audio('/audio/ambience.mp3');
    audio.loop = true;
    audio.volume = 1.0; // Maximized volume (100%) for maximum thunder impact
    audioRef.current = audio;

    const handleInteraction = () => {
      if (isAttemptingRef.current) return;
      
      isAttemptingRef.current = true;
      
      // Attempt to play audio
      audio.play().then(() => {
        // Once successful, remove all listeners immediately to save memory
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('keydown', handleInteraction);
        window.removeEventListener('scroll', handleInteraction);
        window.removeEventListener('mousemove', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
      }).catch(err => {
        // Playback failed (browser strict autoplay policy blocked mousemove/scroll).
        // Throttle the next attempt to prevent crashing the browser.
        setTimeout(() => { isAttemptingRef.current = false; }, 500);
      });
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
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []); // Empty dependency array guarantees this only runs ONCE!

  return null;
};

export default AmbientSound;

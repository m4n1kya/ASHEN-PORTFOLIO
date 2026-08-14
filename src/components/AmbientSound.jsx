import { useState, useEffect, useRef } from 'react';

const AmbientSound = () => {
  const audioRef = useRef(null);
  const isPlayingRef = useRef(false);
  const isManuallyMutedRef = useRef(false);
  const lastAttemptRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false); // UI state

  useEffect(() => {
    // Initialize audio only once
    const audio = new Audio('/audio/ambience.mp3');
    audio.loop = true;
    audio.volume = 1.0; 
    audioRef.current = audio;

    const handleInteraction = (e) => {
      if (isPlayingRef.current || isManuallyMutedRef.current) return;
      
      const now = Date.now();
      // Browsers require a strict user gesture (click/touch/key) to allow audio.
      // If the event is a passive movement (scroll/mousemove), we throttle it to 1 attempt per second 
      // so we don't crash the browser. If it's a direct click, we try IMMEDIATELY.
      const isExplicitGesture = e.type === 'click' || e.type === 'touchstart' || e.type === 'keydown';
      
      if (!isExplicitGesture && now - lastAttemptRef.current < 1000) return;
      
      lastAttemptRef.current = now;
      
      audio.play().then(() => {
        isPlayingRef.current = true;
        setIsPlaying(true); 
        
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('keydown', handleInteraction);
        window.removeEventListener('scroll', handleInteraction);
        window.removeEventListener('mousemove', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
      }).catch(() => {
        // Playback blocked by browser autoplay policy. 
        // We silently catch this. The user MUST click the page to unlock audio.
      });
    };

    const handleVisibilityChange = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        audioRef.current.pause();
      } else {
        if (!isManuallyMutedRef.current && isPlayingRef.current) {
          audioRef.current.play().catch(() => {});
        }
      }
    };

    // Listen to every possible interaction, including cursor movement!
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []); // Empty dependency array guarantees this only runs ONCE!

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        isManuallyMutedRef.current = true;
      } else {
        audioRef.current.play();
        isManuallyMutedRef.current = false;
        isPlayingRef.current = true;
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button 
      onClick={toggleSound}
      className="fixed bottom-10 right-5 md:right-10 z-[100] flex items-center justify-center size-10 rounded-full bg-black/50 border border-white-50/20 backdrop-blur-md hover:bg-white-50/20 transition-all duration-300 group shadow-[0_0_15px_rgba(255,255,255,0.05)]"
      title="Toggle Ambient Sound"
    >
      {isPlaying ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 md:size-5 text-white-50 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 md:size-5 text-white-50 group-hover:text-white transition-colors opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      )}
    </button>
  );
};

export default AmbientSound;

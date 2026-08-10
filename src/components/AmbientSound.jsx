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

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
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

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ReelGallery from './reactbits/ReelGallery';

const Gallery = ({ onBack }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // The App.jsx black overlay handles the fade-in of the entire page.
    // We only need to animate the content sliding up for a nice entrance effect.
    gsap.fromTo('.gallery-content', 
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power3.inOut' }
    );
  }, { scope: containerRef });

  const galleryItems = Array.from({ length: 34 }, (_, i) => ({
    image: `/images/gallery/screen-${i + 1}.webp`,
    title: `Screenshot ${i + 1}`,
  }));

  return (
    <div ref={containerRef} className="gallery-window gallery-container no-cursor-hover h-screen w-screen bg-black fixed inset-0 z-[200] overflow-hidden">
      
      {/* Return Button — styled to match Menu button, large click target */}
      <div className="absolute top-0 left-0 z-[300]" style={{ margin: '1.6em 2em' }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '4px',
            padding: '0.75em 1em',
            color: '#ffffff',
            fontFamily: '"Mona Sans", sans-serif',
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            lineHeight: 1,
            cursor: 'pointer',
            transition: 'background 0.3s ease, border-color 0.3s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.65)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
        >
          <span style={{ fontSize: '1rem', lineHeight: 1 }}>←</span>
          Return
        </button>
      </div>

      {/* Main Content Area - Full screen ReelGallery */}
      <div className="gallery-content absolute inset-0 w-full h-full z-10">
        <ReelGallery 
          items={galleryItems}
          rows={4} 
          gap={32}
          speed={2}
        />
      </div>
    </div>
  );
};

export default Gallery;

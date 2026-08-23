import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Magnet from './reactbits/Magnet';
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

  const galleryItems = Array.from({ length: 13 }, (_, i) => ({
    image: `/images/gallery/screen-${i + 1}.png`,
    title: `Screenshot ${i + 1}`,
  }));

  return (
    <div ref={containerRef} className="gallery-container h-screen w-screen bg-black fixed inset-0 z-[200] overflow-hidden">
      
      {/* Minimal Back Button with Magnetic effect - Positioned absolutely as an overlay */}
      <div className="absolute top-10 left-5 md:left-10 z-[300]">
        <Magnet padding={30} magnetStrength={2} className="w-fit">
          <button 
            onClick={onBack}
            className="group relative flex items-center gap-2 px-4 py-2 text-white/40 hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300 text-lg">←</span>
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Return</span>
          </button>
        </Magnet>
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

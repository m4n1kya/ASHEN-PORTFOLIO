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
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.3 }
    );
  }, { scope: containerRef });

  const handleBack = () => {
    // Create decorative falling particles (App.jsx handles the overlay + navigation)
    const particleWrapper = document.createElement('div');
    particleWrapper.id = 'particle-wrapper';
    particleWrapper.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:999997;contain:layout size;';
    document.body.appendChild(particleWrapper);

    const colors = ['#ffffff', '#e0e0e0', '#a0a0a0', '#737373'];
    const W = window.innerWidth;
    const H = window.innerHeight;
    const count = 150;

    const fragment = document.createDocumentFragment();
    const particleData = [];

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 4 + 1.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const startX = W + Math.random() * 200 + 50; // starts off-screen right
      const startY = Math.random() * H;
      const delay = Math.random() * 0.6;
      const duration = Math.random() * 1.2 + 1.0;
      const endX = -200 - Math.random() * 400; // ends off-screen left
      const endY = startY + (Math.random() - 0.5) * 150;
      const targetOpacity = Math.random() * 0.6 + 0.3;
      const glowSize = size * 3;

      const p = document.createElement('div');
      p.style.cssText = `position:absolute;width:${glowSize}px;height:${glowSize}px;border-radius:50%;background:radial-gradient(circle,${color} 30%,transparent 70%);will-change:transform,opacity;backface-visibility:hidden;transform:translate3d(${startX}px,${startY}px,0) scale(0.5);opacity:0;`;

      fragment.appendChild(p);
      particleData.push({ p, startX, startY, endX, endY, targetOpacity, delay, duration });
    }

    particleWrapper.appendChild(fragment);

    particleData.forEach(({ p, startX, startY, endX, endY, targetOpacity, delay, duration }) => {
      gsap.fromTo(p,
        { x: startX, y: startY, opacity: 0, scale: 0.5 },
        {
          x: endX, y: endY, opacity: targetOpacity, scale: 1,
          duration, delay,
          ease: 'power2.out',
          force3D: true,
        }
      );
    });

    // Navigate back to the home page smoothly
    onBack();
  };

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
            onClick={handleBack}
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

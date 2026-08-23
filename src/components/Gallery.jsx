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
      const startX = Math.random() * W;
      const startY = -Math.random() * 300 - 50;
      const delay = Math.random() * 0.6;
      const duration = Math.random() * 1.2 + 1.0;
      const endY = H + 200 + Math.random() * 400;
      const endX = startX + (Math.random() - 0.5) * 150;
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

  const galleryItems = Array.from({ length: 14 }, (_, i) => ({
    image: `/images/gallery/screen-${i + 1}.png`,
    title: `Screenshot ${i + 1}`,
  }));

  return (
    <div ref={containerRef} className="gallery-container h-screen w-full bg-black relative z-[200] flex flex-col pt-10 px-5 md:px-20 overflow-hidden">
      
      {/* Sleek Back Button with Magnetic effect */}
      <Magnet padding={50} magnetStrength={3} className="z-50 w-fit">
        <button 
          onClick={handleBack}
          className="group relative flex items-center gap-3 px-6 py-3 bg-black-100/60 backdrop-blur-md border border-white-50/20 text-white-50 rounded-full hover:border-white hover:text-white transition-all duration-300 shadow-lg cursor-pointer"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
          <span className="text-sm uppercase tracking-widest font-semibold">Back to Portfolio</span>
        </button>
      </Magnet>

      {/* Main Content Area */}
      <div className="gallery-content flex-1 w-full h-full relative mt-8 flex flex-col">
      {/* Custom ReelGallery */}
      <div className="absolute inset-0 z-10">
        <ReelGallery 
          items={galleryItems}
          rows={4} 
          gap={32}
          speed={2}
        />
      </div>
      </div>
    </div>
  );
};

export default Gallery;

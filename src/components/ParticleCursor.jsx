import { useEffect, useRef } from 'react';

const ParticleCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Only run on desktop
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

      class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1; // Small white dots
        // Drift slowly downwards/backwards to emphasize a trail being left behind
        this.vx = (Math.random() - 0.5) * 0.4; 
        this.vy = (Math.random() * 0.5) + 0.2; 
        this.life = 1.0; 
        this.decay = Math.random() * 0.02 + 0.02; // Fast decay so they don't linger
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
      }
      
      draw() {
        if (this.size <= 0 || this.life <= 0) return;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${this.life})`;
        
        // Optional: Add a subtle glow
        ctx.shadowBlur = 5;
        ctx.shadowColor = `rgba(255, 255, 255, ${this.life})`;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset shadow to prevent it applying to other things
        ctx.shadowBlur = 0;
      }
    }

    const handleMouseMove = (e) => {
      // Offset spawn coordinates strictly to the bottom-back base of the CSS arrow cursor
      // The tip is at (e.clientX, e.clientY). We push it down and slightly right.
      mouse.x = e.clientX + 6;
      mouse.y = e.clientY + 20;
      
      // Sparse spawning to keep it minimalistic
      if (Math.random() > 0.80) {
        particles.push(new Particle(mouse.x, mouse.y));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Remove dead particles
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]"
    />
  );
};

export default ParticleCursor;

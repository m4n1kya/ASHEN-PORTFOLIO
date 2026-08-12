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
        // Lock horizontal drift and force them to fall strictly downwards
        this.vx = (Math.random() - 0.5) * 0.1; 
        this.vy = (Math.random() * 0.8) + 0.4; 
        this.life = 1.0; 
        this.decay = Math.random() * 0.02 + 0.02; // Fast decay
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
      }
      
      draw() {
        if (this.size <= 0 || this.life <= 0) return;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${this.life})`;
        
        ctx.shadowBlur = 5;
        ctx.shadowColor = `rgba(255, 255, 255, ${this.life})`;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
      }
    }

    const handleMouseMove = (e) => {
      // Adjust offset slightly upwards and to the right as requested
      mouse.x = e.clientX + 16;
      mouse.y = e.clientY + 15;
      
      // Sparse spawning
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

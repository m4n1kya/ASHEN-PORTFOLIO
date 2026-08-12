import { useEffect, useRef } from 'react';

const SmokeCursor = () => {
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
        // Smoke physics
        this.size = Math.random() * 12 + 4; 
        this.vx = (Math.random() - 0.5) * 1.2; 
        this.vy = (Math.random() - 0.5) * 1.2 - 0.8; // Drift upwards like real smoke
        this.life = 1.0; 
        this.decay = Math.random() * 0.02 + 0.01; 
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.size += 0.6; // Plume expands rapidly as it dissipates
        this.life -= this.decay;
      }
      
      draw() {
        if (this.size <= 0) return;
        
        // Use a radial gradient to make the smoke look like a soft cloud instead of a hard circle
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        
        // Darker, less visible smoke
        const baseOpacity = this.life * 0.08; 
        gradient.addColorStop(0, `rgba(80, 80, 85, ${baseOpacity})`);
        gradient.addColorStop(0.6, `rgba(40, 40, 45, ${baseOpacity * 0.4})`);
        gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const handleMouseMove = (e) => {
      // Offset slightly so it looks like it's coming from the tail area of the arrow
      mouse.x = e.clientX + 2;
      mouse.y = e.clientY + 8;
      
      // Spawn particles on movement
      for (let i = 0; i < 2; i++) {
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

export default SmokeCursor;

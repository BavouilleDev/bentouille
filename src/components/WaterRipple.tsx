import { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  timestamp: number;
}

const WaterRipple = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const animationRef = useRef<number>();
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Only create ripple if mouse moved enough
      if (distance > 30) {
        ripplesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          opacity: 0.15,
          timestamp: Date.now(),
        });
        
        // Limit ripples
        if (ripplesRef.current.length > 8) {
          ripplesRef.current.shift();
        }
        
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const now = Date.now();
      
      ripplesRef.current = ripplesRef.current.filter(ripple => {
        const age = now - ripple.timestamp;
        const progress = age / 1500; // 1.5 second lifespan
        
        if (progress >= 1) return false;
        
        ripple.radius = progress * 150;
        ripple.opacity = 0.12 * (1 - progress);
        
        // Draw ripple with gradient
        const gradient = ctx.createRadialGradient(
          ripple.x, ripple.y, ripple.radius * 0.5,
          ripple.x, ripple.y, ripple.radius
        );
        
        gradient.addColorStop(0, `hsla(280, 60%, 65%, 0)`);
        gradient.addColorStop(0.5, `hsla(280, 60%, 65%, ${ripple.opacity})`);
        gradient.addColorStop(1, `hsla(320, 70%, 60%, 0)`);
        
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Second ring for more depth
        const gradient2 = ctx.createRadialGradient(
          ripple.x, ripple.y, ripple.radius * 0.8,
          ripple.x, ripple.y, ripple.radius * 1.2
        );
        
        gradient2.addColorStop(0, `hsla(280, 60%, 65%, 0)`);
        gradient2.addColorStop(0.5, `hsla(280, 60%, 65%, ${ripple.opacity * 0.3})`);
        gradient2.addColorStop(1, `hsla(280, 60%, 65%, 0)`);
        
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 1.1, 0, Math.PI * 2);
        ctx.fillStyle = gradient2;
        ctx.fill();
        
        return true;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default WaterRipple;

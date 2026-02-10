import { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  createdAt: number;
  isClick?: boolean;
}

const BUBBLE_LIFE_MS = 500;
const MIN_RADIUS = 5;
const MAX_RADIUS = 24;
const MIN_DISTANCE = 28; // moins de bulles : distance plus grande
const MAX_BUBBLES = 35;

const WaterRipple = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const bubblesRef = useRef<Bubble[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

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
      const x = e.clientX;
      const y = e.clientY;

      const last = lastPosRef.current;
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < MIN_DISTANCE) return;

        // Une seule bulle interpolée pour garder une légère chenille sans en abuser
        const steps = Math.min(Math.floor(distance / MIN_DISTANCE), 1);
        for (let i = 1; i <= steps; i++) {
          const t = i / (steps + 1);
          bubblesRef.current.push({
            x: last.x + dx * t,
            y: last.y + dy * t,
            createdAt: Date.now() - (steps - i) * 20,
          });
        }
      }

      bubblesRef.current.push({
        x,
        y,
        createdAt: Date.now(),
      });
      lastPosRef.current = { x, y };

      if (bubblesRef.current.length > MAX_BUBBLES) {
        bubblesRef.current = bubblesRef.current.slice(-MAX_BUBBLES);
      }
    };

    const handleClick = (e: MouseEvent) => {
      bubblesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        createdAt: Date.now(),
        isClick: true,
      });
    };

    const animate = () => {
      const now = Date.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const clickLife = BUBBLE_LIFE_MS * 1.2;

      bubblesRef.current = bubblesRef.current.filter((b) => {
        const life = b.isClick ? clickLife : BUBBLE_LIFE_MS;
        const age = now - b.createdAt;
        if (age > life) return false;

        const t = age / life; // 0 -> 1
        const radiusScale = b.isClick ? 1.25 : 1;
        const radius = (MIN_RADIUS + t * (MAX_RADIUS - MIN_RADIUS)) * radiusScale;
        const baseOpacity = b.isClick ? 0.7 : 0.35;
        const opacity = baseOpacity * (1 - t);

        // Glow (plus marqué pour le clic)
        ctx.save();
        ctx.shadowBlur = b.isClick ? 12 : 6;
        ctx.shadowColor = `rgba(180, 130, 220, ${opacity * (b.isClick ? 0.9 : 0.5)})`;

        ctx.beginPath();
        ctx.arc(b.x, b.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(160, 100, 200, ${opacity * (b.isClick ? 0.9 : 0.6)})`;
        ctx.lineWidth = b.isClick ? 2.5 : 1.5;
        ctx.stroke();

        ctx.globalAlpha = 1;

        ctx.restore();
        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden
    />
  );
};

export default WaterRipple;

import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  createdAt: number;
}

interface ClickPop {
  x: number;
  y: number;
  createdAt: number;
}

const WaterRipple = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const pointsRef = useRef<TrailPoint[]>([]);
  const popsRef = useRef<ClickPop[]>([]);

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
      const now = Date.now();

      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        createdAt: now,
      });

      // Garder une petite traîne de points pour faire le "ver de terre"
      if (pointsRef.current.length > 80) {
        pointsRef.current.splice(0, pointsRef.current.length - 80);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const now = Date.now();
      popsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        createdAt: now,
      });
    };

    const animate = () => {
      const now = Date.now();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.filter = 'blur(6px)';

      const life = 700; // durée de vie d'un point en ms

      // Ne garder que les points encore "vivants"
      pointsRef.current = pointsRef.current.filter(
        (point) => now - point.createdAt <= life
      );

      const points = pointsRef.current;

      if (points.length > 1) {
        // Tracé continu type "ver de terre"
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {
          const current = points[i];
          const next = points[i + 1];
          const cx = (current.x + next.x) / 2;
          const cy = (current.y + next.y) / 2;
          ctx.quadraticCurveTo(current.x, current.y, cx, cy);
        }

        const last = points[points.length - 1];
        ctx.lineTo(last.x, last.y);

        // Opacité globale plus faible pour que ce soit moins lumineux
        const headAge = now - last.createdAt;
        const headT = Math.min(headAge / life, 1);
        const baseOpacity = 0.16 * (1 - headT * 0.3);

        // Dégradé le long du ver, plus lumineux au centre
        const gradient = ctx.createLinearGradient(
          points[0].x,
          points[0].y,
          last.x,
          last.y
        );
        gradient.addColorStop(0, 'hsla(320, 70%, 60%, 0)');
        gradient.addColorStop(0.2, `hsla(300, 70%, 65%, ${baseOpacity * 0.4})`);
        gradient.addColorStop(0.5, `hsla(320, 70%, 60%, ${baseOpacity})`);
        gradient.addColorStop(0.8, `hsla(280, 60%, 65%, ${baseOpacity * 0.45})`);
        gradient.addColorStop(1, 'hsla(280, 60%, 65%, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 22;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      // Pops de clic
      const popLife = 480;
      popsRef.current = popsRef.current.filter((pop) => {
        const age = now - pop.createdAt;
        if (age > popLife) return false;

        const t = age / popLife;
        const radius = 12 + t * 60;
        const opacity = 0.3 * (1 - t);

        const gradient = ctx.createRadialGradient(
          pop.x,
          pop.y,
          0,
          pop.x,
          pop.y,
          radius
        );

        gradient.addColorStop(0, `hsla(320, 70%, 60%, ${opacity})`);
        gradient.addColorStop(0.4, `hsla(300, 70%, 65%, ${opacity * 0.6})`);
        gradient.addColorStop(1, 'hsla(280, 60%, 65%, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pop.x, pop.y, radius, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      ctx.restore();

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
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default WaterRipple;

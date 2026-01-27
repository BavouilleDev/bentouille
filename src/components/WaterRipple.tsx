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
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

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

    const life = 500; // durée de vie réduite pour plus de fluidité

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const newPoint = { x: e.clientX, y: e.clientY };

      if (lastPointRef.current) {
        const dx = newPoint.x - lastPointRef.current.x;
        const dy = newPoint.y - lastPointRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Skip si trop proche
        if (distance < 2) {
          return;
        }

        // Interpolation simple et efficace pour les mouvements rapides
        if (distance > 8) {
          const steps = Math.ceil(distance / 6);
          const timeStep = life / (steps + 1);
          for (let i = 1; i <= steps; i++) {
            const t = i / (steps + 1);
            pointsRef.current.push({
              x: lastPointRef.current.x + dx * t,
              y: lastPointRef.current.y + dy * t,
              createdAt: now - (steps + 1 - i) * timeStep,
            });
          }
        }
      }

      pointsRef.current.push({
        x: newPoint.x,
        y: newPoint.y,
        createdAt: now,
      });

      lastPointRef.current = newPoint;

      // Limiter le nombre de points
      if (pointsRef.current.length > 150) {
        pointsRef.current.splice(0, pointsRef.current.length - 150);
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
      ctx.globalAlpha = 0.85; // Réduire légèrement l'opacité globale pour éviter les superpositions trop lumineuses
      ctx.filter = 'blur(8px)';

      // Ne garder que les points encore "vivants"
      pointsRef.current = pointsRef.current.filter(
        (point) => now - point.createdAt <= life
      );

      const points = pointsRef.current;

      if (points.length > 1) {
        // Dessiner segment par segment pour éviter les bugs de croisement
        // Chaque segment est dessiné indépendamment avec sa propre opacité
        for (let i = 0; i < points.length - 1; i++) {
          const current = points[i];
          const next = points[i + 1];
          
          const currentAge = now - current.createdAt;
          const nextAge = now - next.createdAt;
          
          if (currentAge > life || nextAge > life) continue;
          
          const currentT = currentAge / life;
          const nextT = nextAge / life;
          
          // Opacité qui fade progressivement (légèrement réduite pour éviter les superpositions)
          const currentOpacity = 0.14 * (1 - currentT);
          const nextOpacity = 0.14 * (1 - nextT);
          
          // Gradient pour ce segment
          const gradient = ctx.createLinearGradient(
            current.x,
            current.y,
            next.x,
            next.y
          );
          
          gradient.addColorStop(0, `hsla(320, 70%, 60%, ${currentOpacity})`);
          gradient.addColorStop(0.5, `hsla(300, 70%, 65%, ${(currentOpacity + nextOpacity) / 2})`);
          gradient.addColorStop(1, `hsla(280, 60%, 65%, ${nextOpacity})`);
          
          ctx.beginPath();
          ctx.moveTo(current.x, current.y);
          
          if (i === 0 || points.length === 2) {
            ctx.lineTo(next.x, next.y);
          } else {
            const midX = (current.x + next.x) / 2;
            const midY = (current.y + next.y) / 2;
            ctx.quadraticCurveTo(current.x, current.y, midX, midY);
            ctx.lineTo(next.x, next.y);
          }
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 24;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      }

      // Réinitialiser l'opacité globale pour les pops
      ctx.globalAlpha = 1.0;

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

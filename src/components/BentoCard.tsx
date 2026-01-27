import { ReactNode, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  style?: React.CSSProperties;
}

const BentoCard = ({ children, className, href, style }: BentoCardProps) => {
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      target.style.setProperty('--glow-x', `${x}%`);
      target.style.setProperty('--glow-y', `${y}%`);
    },
    []
  );

  const cardContent = (
    <div
      className={cn(
        'card-base card-hover glow-effect relative overflow-hidden',
        className
      )}
      style={style}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
};

export default BentoCard;

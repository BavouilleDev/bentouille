import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  style?: React.CSSProperties;
}

const BentoCard = ({ children, className, href, style }: BentoCardProps) => {
  const cardContent = (
    <div
      className={cn(
        'card-base card-hover glow-effect relative overflow-hidden',
        className
      )}
      style={style}
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

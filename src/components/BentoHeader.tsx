import profileAvatar from '@/assets/profile-avatar.png';
import { Emoji } from 'react-apple-emojis';
import { useYouTubeStats } from '@/hooks/useYouTubeStats';
import { useState } from 'react';

const ConfettiExplosion = ({ trigger }: { trigger: number }) => {
  if (!trigger) return null;

  const pieces = Array.from({ length: 14 });

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-visible"
      aria-hidden="true"
    >
      {pieces.map((_, index) => {
        const angle = (index / pieces.length) * Math.PI * 2;
        const distance = 26;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        return (
          <span
            key={`${trigger}-${index}`}
            className="confetti-piece"
            style={
              {
                '--tx': `${tx}px`,
                '--ty': `${ty}px`,
                '--delay': `${index * 15}ms`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
};

const BentoHeader = () => {
  const { formattedSubscribers } = useYouTubeStats();
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  const handleStarClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setConfettiTrigger((prev) => prev + 1);
  };

  return (
    <header className="flex flex-col items-center text-center mb-8 animate-fade-in">
      {/* Avatar avec glow effect */}
      <div className="relative mb-4 emoji-no-selection">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50 animate-pulse-glow" />
        <img
          src={profileAvatar}
          alt="Bavouille"
          className="emoji-no-selection relative w-28 h-28 rounded-full object-cover border-4 border-card"
        />
      </div>

      {/* Nom */}
      <h1 className="text-3xl font-bold mb-4 gradient-text">Bavouille</h1>

      {/* Bio formatée - une compétence par ligne */}
      <div className="text-muted-foreground max-w-md leading-relaxed space-y-1">
        <p>
          <Emoji name="movie-camera" width={18} className="emoji-no-selection inline-block align-middle mr-1" />
          Monteur vidéo (Premiere Pro et After Effect)
        </p>
        <p>
          <Emoji name="artist-palette" width={18} className="emoji-no-selection inline-block align-middle mr-1" />
          Miniamaker en herbe (mais je ne touche pas d'herbe)
        </p>
        <p className="text-foreground/90 pt-2">
          <Emoji name="television" width={18} className="emoji-no-selection inline-block align-middle mr-1" />
          Créateur de contenu (
          <span className="text-primary font-semibold">
            {formattedSubscribers || '14k'}
          </span>
          {' '}sur ytb{' '}
          <button
            type="button"
            onClick={handleStarClick}
            className="relative inline-flex items-center justify-center align-middle cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-full"
            aria-label="Petit feu d'artifice de confettis"
          >
            <span className="relative emoji-no-selection inline-flex items-center justify-center">
              <Emoji
                name="star"
                width={18}
                className="emoji-no-selection inline-block align-middle"
              />
              <ConfettiExplosion trigger={confettiTrigger} />
            </span>
          </button>
          )
        </p>
      </div>
    </header>
  );
};

export default BentoHeader;

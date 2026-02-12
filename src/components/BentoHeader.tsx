import profileAvatar from '@/assets/profile-avatar.png';
import { Emoji } from 'react-apple-emojis';
import { useYouTubeStats } from '@/hooks/useYouTubeStats';
import { useState } from 'react';
import type React from 'react';

const ConfettiBurst = () => {
  const pieceCount = 14;
  const pieces = Array.from({ length: pieceCount });

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-visible"
      aria-hidden="true"
    >
      {pieces.map((_, index) => {
        const baseAngle = (index / pieceCount) * Math.PI * 2;
        const angleJitter = (Math.random() - 0.5) * (Math.PI / 6); // +/- 15°
        const angle = baseAngle + angleJitter;

        const baseDistance = 26;
        const distance = baseDistance + Math.random() * 10; // 26 à 36 px

        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        const delay = index * 15 + Math.random() * 80; // léger jitter dans le timing

        return (
          <span
            key={index}
            className="confetti-piece"
            style={
              {
                '--tx': `${tx}px`,
                '--ty': `${ty}px`,
                '--delay': `${delay}ms`,
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
  const [confettiBursts, setConfettiBursts] = useState<number[]>([]);

  const handleStarClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setConfettiBursts((prev) => {
      const nextId = Date.now();
      const trimmed = prev.slice(-5); // éviter l'accumulation infinie dans le DOM
      return [...trimmed, nextId];
    });
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
        <p className="flex items-center justify-center gap-2">
          <Emoji name="movie-camera" width={18} className="emoji-no-selection" />
          <span>Monteur vidéo (Premiere Pro et After Effect)</span>
        </p>
        <p className="flex items-center justify-center gap-2">
          <Emoji name="artist-palette" width={18} className="emoji-no-selection" />
          <span>Miniamaker en herbe (mais je ne touche pas d'herbe)</span>
        </p>
        <p className="text-foreground/90 pt-2 flex items-center justify-center gap-2">
          <Emoji name="television" width={18} className="emoji-no-selection" />
          <span>
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
                className="emoji-no-selection"
              />
              {confettiBursts.map((id) => (
                <ConfettiBurst key={id} />
              ))}
            </span>
          </button>
          )
          </span>
        </p>
      </div>
    </header>
  );
};

export default BentoHeader;

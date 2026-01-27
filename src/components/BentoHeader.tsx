import profileAvatar from '@/assets/profile-avatar.png';
import { Emoji } from 'react-apple-emojis';

const BentoHeader = () => {
  return (
    <header className="flex flex-col items-center text-center mb-8 animate-fade-in">
      {/* Avatar avec glow effect */}
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50 animate-pulse-glow" />
        <img
          src={profileAvatar}
          alt="Bavouille"
          className="relative w-28 h-28 rounded-full object-cover border-4 border-card"
        />
      </div>

      {/* Nom */}
      <h1 className="text-3xl font-bold mb-4 gradient-text">Bavouille</h1>

      {/* Bio formatée - une compétence par ligne */}
      <div className="text-muted-foreground max-w-md leading-relaxed space-y-1">
        <p>
          <Emoji name="movie-camera" width={18} className="inline-block align-middle mr-1" />
          Monteur vidéo (Premiere Pro et After Effect)
        </p>
        <p>
          <Emoji name="artist-palette" width={18} className="inline-block align-middle mr-1" />
          Miniamaker en herbe (mais je ne touche pas d'herbe)
        </p>
        <p className="text-foreground/90 pt-2">
          <Emoji name="television" width={18} className="inline-block align-middle mr-1" />
          Créateur de contenu (
          <span className="text-primary font-semibold">
            14k
          </span>
          {' '}sur ytb{' '}
          <Emoji name="star" width={18} className="inline-block align-middle" />)
        </p>
      </div>
    </header>
  );
};

export default BentoHeader;

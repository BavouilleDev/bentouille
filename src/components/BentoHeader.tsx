import profileAvatar from '@/assets/profile-avatar.png';
import { useYouTubeStats } from '@/hooks/useYouTubeStats';

const BentoHeader = () => {
  const { subscriberCountRounded, isLoading } = useYouTubeStats('bavouille');

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
        <p>🎬 Monteur vidéo (Premiere Pro et After Effect)</p>
        <p>🎨 Miniamaker en herbe (mais je ne touche pas d'herbe)</p>
        <p className="text-foreground/90 pt-2">
          📺 Créateur de contenu (
          <span className="text-primary font-semibold">
            {isLoading ? '...' : subscriberCountRounded}
          </span>
          {' '}sur ytb 🤩)
        </p>
      </div>
    </header>
  );
};

export default BentoHeader;

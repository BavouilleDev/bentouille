import { Youtube, Play, ExternalLink } from 'lucide-react';
import BentoCard from '@/components/BentoCard';
import { useYouTubeStats } from '@/hooks/useYouTubeStats';
import { useLatestVideo } from '@/hooks/useLatestVideo';

const YouTubeCard = () => {
  const { subscriberCountFormatted, isLoading: statsLoading } = useYouTubeStats('bavouille');
  const { title, thumbnail, link, isLoading: videoLoading } = useLatestVideo();

  return (
    <BentoCard
      href="https://youtube.com/@bavouille"
      className="col-span-full flex flex-col md:flex-row gap-4 min-h-[200px] md:min-h-[180px]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-youtube/10 via-youtube/5 to-transparent pointer-events-none" />
      
      {/* Thumbnail de la dernière vidéo */}
      <div className="relative z-10 w-full md:w-2/5 flex-shrink-0">
        <a 
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative aspect-video rounded-2xl overflow-hidden group"
          onClick={(e) => e.stopPropagation()}
        >
          {!videoLoading && thumbnail && (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {videoLoading && (
            <div className="w-full h-full bg-secondary animate-pulse flex items-center justify-center">
              <Youtube className="w-10 h-10 text-muted-foreground" />
            </div>
          )}
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-youtube flex items-center justify-center">
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>
          </div>
        </a>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-youtube/20">
              <Youtube className="w-6 h-6 text-youtube" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">YouTube</span>
          </div>
          
          <h2 className="text-xl font-bold mb-2">Ma chaîne principale !!!</h2>
          
          {/* Latest video title */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
            <span className="text-xs px-2 py-0.5 bg-youtube/20 text-youtube rounded-full">Dernière vidéo</span>
            <span className="line-clamp-1">
              {videoLoading ? 'Chargement...' : title}
            </span>
          </div>
        </div>

        {/* Subscribe button avec stats */}
        <div className="flex flex-wrap gap-3">
          <button className="btn-platform bg-youtube text-white">
            <Youtube className="w-4 h-4" />
            <span>Subscribe</span>
            <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-lg text-xs">
              {statsLoading ? '...' : subscriberCountFormatted}
            </span>
          </button>
          
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-platform bg-secondary/50 hover:bg-secondary text-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4" />
            <span>Voir la vidéo</span>
          </a>
        </div>
      </div>
    </BentoCard>
  );
};

export default YouTubeCard;

import { Twitch } from 'lucide-react';
import BentoCard from '@/components/BentoCard';

const TwitchCard = () => {
  return (
    <BentoCard
      href="https://twitch.tv/bavouille"
      className="h-full flex flex-col justify-between min-h-[160px]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-twitch/10 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-xl bg-twitch/20">
            <Twitch className="w-5 h-5 text-twitch" />
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-1">Twitch</h3>
        <p className="text-muted-foreground text-sm">Ma super chaîne Twitch 🎥</p>
      </div>

      <button className="btn-platform bg-twitch text-white mt-3 text-xs w-fit relative z-10">
        <Twitch className="w-3 h-3" />
        Suivre
      </button>
    </BentoCard>
  );
};

export default TwitchCard;

import { Twitch } from 'lucide-react';
import BentoCard from '@/components/BentoCard';

const TwitchCard = () => {
  return (
    <BentoCard
      href="https://twitch.tv/bavouille"
      className="h-full flex flex-col min-h-[180px] !p-6 glow-twitch"
    >
      {/* Background gradient - more vibrant */}
      <div className="absolute inset-0 bg-gradient-to-br from-twitch/15 via-twitch/8 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-twitch/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-twitch/30 to-twitch/15 ring-2 ring-twitch/20">
            <Twitch className="w-5 h-5 text-twitch" />
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-foreground">Twitch</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Pour s'amuser en live
        </p>
        
        {/* Spacer to push button down */}
        <div className="flex-1" />
        
        <button className="btn-platform bg-gradient-to-r from-twitch to-twitch/90 text-white mt-4 text-xs w-full relative z-10 shadow-lg shadow-twitch/30 hover:shadow-twitch/50 transition-all duration-300">
          <Twitch className="w-3 h-3" />
          Suivre
        </button>
      </div>
    </BentoCard>
  );
};

export default TwitchCard;

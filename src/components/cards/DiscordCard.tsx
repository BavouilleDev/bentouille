import { MessageCircle } from 'lucide-react';
import BentoCard from '@/components/BentoCard';

const DiscordCard = () => {
  return (
    <BentoCard
      href="https://discord.gg/qzsNCamvSJ"
      className="h-full flex flex-col min-h-[180px] !p-6"
    >
      {/* Background gradient - more vibrant */}
      <div className="absolute inset-0 bg-gradient-to-br from-discord/15 via-discord/8 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-discord/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-discord/30 to-discord/15 ring-2 ring-discord/20">
            <MessageCircle className="w-5 h-5 text-discord" />
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-foreground">Discord</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Pour discuter avec moi
        </p>
        
        {/* Spacer to push button down */}
        <div className="flex-1" />
        
        <button className="btn-platform bg-gradient-to-r from-discord to-discord/90 text-white mt-4 text-xs w-full relative z-10 shadow-lg shadow-discord/30 hover:shadow-discord/50 transition-all duration-300">
          <MessageCircle className="w-3 h-3" />
          Rejoindre
        </button>
      </div>
    </BentoCard>
  );
};

export default DiscordCard;

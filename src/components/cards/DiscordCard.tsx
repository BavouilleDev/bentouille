import { MessageCircle } from 'lucide-react';
import BentoCard from '@/components/BentoCard';

const DiscordCard = () => {
  return (
    <BentoCard
      href="https://discord.gg/qzsNCamvSJ"
      className="h-full flex flex-col justify-between min-h-[160px]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-discord/10 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-xl bg-discord/20">
            <MessageCircle className="w-5 h-5 text-discord" />
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-1">Discord</h3>
        <p className="text-muted-foreground text-sm">Mon discord du sheitan 😈</p>
      </div>

      <button className="btn-platform bg-discord text-white mt-3 text-xs w-fit relative z-10">
        <MessageCircle className="w-3 h-3" />
        Rejoindre
      </button>
    </BentoCard>
  );
};

export default DiscordCard;

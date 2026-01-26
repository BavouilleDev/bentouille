import { Instagram } from 'lucide-react';
import BentoCard from '@/components/BentoCard';

const InstagramCard = () => {
  return (
    <BentoCard
      href="https://instagram.com/bavouille"
      className="h-full flex flex-col min-h-[180px] !p-6"
    >
      {/* Background gradient - more vibrant with holi colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-instagram/15 via-instagram/8 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-instagram/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-instagram/30 to-instagram/15 ring-2 ring-instagram/20">
            <Instagram className="w-5 h-5 text-instagram" />
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-foreground">Instagram</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Là où je raconte ma vie
        </p>
        
        {/* Spacer to push button down */}
        <div className="flex-1" />
        
        <button className="btn-platform bg-gradient-to-r from-instagram to-instagram/90 text-white mt-4 text-xs w-full relative z-10 shadow-lg shadow-instagram/30 hover:shadow-instagram/50 transition-all duration-300">
          <Instagram className="w-3 h-3" />
          Follow
        </button>
      </div>
    </BentoCard>
  );
};

export default InstagramCard;

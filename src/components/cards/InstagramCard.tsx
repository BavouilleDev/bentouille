import { Instagram } from 'lucide-react';
import BentoCard from '@/components/BentoCard';

const InstagramCard = () => {
  return (
    <BentoCard
      href="https://instagram.com/bavouille"
      className="h-full flex flex-col justify-between min-h-[160px]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-instagram/10 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-xl bg-instagram/20">
            <Instagram className="w-5 h-5 text-instagram" />
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-1">Instagram</h3>
        <p className="text-muted-foreground text-sm">Mon compte Insta 📸</p>
      </div>

      <button className="btn-platform bg-instagram text-white mt-3 text-xs w-fit relative z-10">
        <Instagram className="w-3 h-3" />
        Follow
      </button>
    </BentoCard>
  );
};

export default InstagramCard;

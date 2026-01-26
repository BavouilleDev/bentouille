import BentoCard from '@/components/BentoCard';

const RedditIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-reddit ${className}`}>
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);

const RedditCard = () => {
  return (
    <BentoCard
      href="https://reddit.com/r/bavouille"
      className="h-full flex flex-col min-h-[180px]"
    >
      {/* Background gradient - more vibrant */}
      <div className="absolute inset-0 bg-gradient-to-br from-reddit/15 via-reddit/8 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-reddit/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-reddit/30 to-reddit/15 ring-2 ring-reddit/20">
            <RedditIcon />
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-foreground">Reddit</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">Mon sub reddit ! 🔥</p>
        
        {/* Spacer to push button down */}
        <div className="flex-1" />
        
        <button className="btn-platform bg-gradient-to-r from-reddit to-reddit/90 text-white mt-auto text-xs w-full relative z-10 shadow-lg shadow-reddit/30 hover:shadow-reddit/50 transition-all duration-300">
          <RedditIcon className="w-3 h-3" />
          Rejoindre
        </button>
      </div>
    </BentoCard>
  );
};

export default RedditCard;

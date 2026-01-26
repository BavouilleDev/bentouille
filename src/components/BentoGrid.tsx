import BentoHeader from './BentoHeader';
import YouTubeCard from './cards/YouTubeCard';
import DiscordCard from './cards/DiscordCard';
import InstagramCard from './cards/InstagramCard';
import RedditCard from './cards/RedditCard';
import TwitchCard from './cards/TwitchCard';
import PortfolioSection from './PortfolioSection';
import WaterRipple from './WaterRipple';

const BentoGrid = () => {
  return (
    <>
      <WaterRipple />
      <div className="relative z-10 min-h-screen py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <BentoHeader />

          {/* YouTube - Full Width */}
          <div className="mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <YouTubeCard />
          </div>

          {/* Social Grid - 4 widgets in one row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Discord */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <DiscordCard />
            </div>

            {/* Twitch */}
            <div className="animate-fade-in" style={{ animationDelay: '0.25s' }}>
              <TwitchCard />
            </div>

            {/* Instagram */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <InstagramCard />
            </div>

            {/* Reddit */}
            <div className="animate-fade-in" style={{ animationDelay: '0.35s' }}>
              <RedditCard />
            </div>
          </div>

          {/* Portfolio Section */}
          <PortfolioSection />

          {/* Footer */}
          <footer className="text-center mt-12 text-muted-foreground text-sm animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <p>
              Made with 💜 by{' '}
              <span className="gradient-text font-semibold">Bavouille</span>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default BentoGrid;

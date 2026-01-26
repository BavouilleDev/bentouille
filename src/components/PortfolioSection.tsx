import thumbnail1 from '@/assets/thumbnails/exploitation.png';
import thumbnail2 from '@/assets/thumbnails/temple-azteque.png';
import thumbnail3 from '@/assets/thumbnails/base-parfaite.png';
import thumbnail4 from '@/assets/thumbnails/nourriture-infinie.png';
import thumbnail5 from '@/assets/thumbnails/blocks.png';
import thumbnail6 from '@/assets/thumbnails/world-record.png';
import thumbnail7 from '@/assets/thumbnails/jour-100.png';

const thumbnails = [
  { id: 1, src: thumbnail1, alt: 'Exploitation' },
  { id: 2, src: thumbnail2, alt: 'Temple Aztèque' },
  { id: 3, src: thumbnail3, alt: 'Base Parfaite' },
  { id: 4, src: thumbnail4, alt: 'Nourriture Infinie' },
  { id: 5, src: thumbnail5, alt: '253,258 Blocks' },
  { id: 6, src: thumbnail6, alt: 'World Record' },
  { id: 7, src: thumbnail7, alt: 'Jour 1 → Jour 100' },
];

const PortfolioSection = () => {
  return (
    <section className="mt-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
        <span className="gradient-text">Mes minias dont je suis fier</span>
        <span className="block text-sm text-muted-foreground mt-2 font-normal">
          (et promis je les ai pas recopiées)
        </span>
      </h2>

      {/* First row - 4 thumbnails */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {thumbnails.slice(0, 4).map((thumb, index) => (
          <div
            key={thumb.id}
            className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer animate-fade-in"
            style={{ animationDelay: `${0.6 + index * 0.1}s` }}
          >
            <img
              src={thumb.src}
              alt={thumb.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-sm font-semibold text-foreground">{thumb.alt}</span>
            </div>
            <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-hover:ring-primary/50 transition-all duration-300" />
          </div>
        ))}
      </div>

      {/* Second row - 3 thumbnails centered */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {thumbnails.slice(4).map((thumb, index) => (
          <div
            key={thumb.id}
            className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer animate-fade-in"
            style={{ animationDelay: `${1.0 + index * 0.1}s` }}
          >
            <img
              src={thumb.src}
              alt={thumb.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-sm font-semibold text-foreground">{thumb.alt}</span>
            </div>
            <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-hover:ring-primary/50 transition-all duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;

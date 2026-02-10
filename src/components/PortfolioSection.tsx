import thumbnail1 from '@/assets/thumbnails/exploitation.png';
import thumbnail2 from '@/assets/thumbnails/temple-azteque.png';
import thumbnail3 from '@/assets/thumbnails/base-parfaite.png';
import thumbnail4 from '@/assets/thumbnails/nourriture-infinie.png';
import thumbnail5 from '@/assets/thumbnails/blocks.png';
import thumbnail6 from '@/assets/thumbnails/world-record.png';
import thumbnail7 from '@/assets/thumbnails/jour-100.png';

const thumbnails = [
  {
    id: 1,
    src: thumbnail1,
    alt: 'Exploitation',
    title: "J'ai Exploité 246.869 Golems de Cuvire ..",
    href: 'https://youtu.be/EJsj_4Es8mg?si=9v5tdr_Jv36inBNj',
  },
  {
    id: 2,
    src: thumbnail2,
    alt: 'Temple Aztèque',
    title: "J'ai Transformé le Temple de la Jungle en Hardcore",
    href: 'https://youtu.be/iSTRaqj2cHE?si=1I3IgwBXUpkG1mfI',
  },
  {
    id: 3,
    src: thumbnail3,
    alt: 'Base Parfaite',
    title: "J'ai CRÉÉ la Base Parfaite sur Minecraft Hardcore",
    href: 'https://youtu.be/eTmGSyjyUVA?si=eqrgF3cODdw8ENWB',
  },
  {
    id: 4,
    src: thumbnail4,
    alt: 'Nourriture Infinie',
    title: "j'ai farmé toutes les nourritures de Minecraft",
    href: 'https://youtu.be/kCOLD3GLxM4?si=4mDaDAit7xQfGFMz',
  },
  {
    id: 5,
    src: thumbnail5,
    alt: '253,258 Blocks',
    title: "J'ai miné 253.258 blocs pour ce build ...",
    href: 'https://youtu.be/L6tbcVMwHkk?si=A2bYL32eRO2BkIAe',
  },
  {
    id: 6,
    src: thumbnail6,
    alt: 'World Record',
    title: "J'ai construit le plus grand temple du monde",
    href: 'https://youtu.be/LIdLIU2-iAM?si=pfgM7wuy3sQtPkq3',
  },
  {
    id: 7,
    src: thumbnail7,
    alt: 'Jour 1 → Jour 100',
    title: "J'ai passé 100 jours sur une île déserte",
    href: 'https://youtu.be/warEaRGVfqM?si=EEaYhdQ73WvkerfI',
  },
];

const PortfolioSection = () => {
  return (
    <section className="mt-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        <span className="gradient-text">Mes minias dont je suis fier</span>
        <span className="block text-base md:text-lg text-muted-foreground mt-2 font-normal">
          (et promis je les ai pas recopiées)
        </span>
      </h2>

      {/* Thumbnails - 2 par 2 sur plusieurs lignes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {thumbnails.map((thumb, index) => (
          <a
            key={thumb.id}
            href={thumb.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`emoji-no-selection group relative aspect-video rounded-2xl overflow-hidden cursor-pointer animate-fade-in ${index === 6 ? 'sm:col-span-2 sm:max-w-[calc((100%-1rem)/2)] sm:mx-auto' : ''}`}
            style={{ animationDelay: `${0.6 + index * 0.1}s` }}
          >
            <img
              src={thumb.src}
              alt={thumb.alt}
              className="emoji-no-selection w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-sm font-semibold text-foreground line-clamp-2">
                {thumb.title}
              </span>
            </div>
            <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-hover:ring-primary/50 transition-all duration-300" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;

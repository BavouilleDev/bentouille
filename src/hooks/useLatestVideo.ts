import { useState, useEffect } from 'react';

interface LatestVideo {
  title: string;
  videoId: string;
  link: string;
  thumbnail: string;
  published: string;
  isLoading: boolean;
  error: string | null;
}

// Nouveau Channel ID pour Bavouille
const CHANNEL_ID = 'UCcOsFB2AcE-QDDX7bixmaiA';
const CORS_PROXY = 'https://corsproxy.io/?';

export const useLatestVideo = (): LatestVideo => {
  const [video, setVideo] = useState<LatestVideo>({
    title: '',
    videoId: '',
    link: '',
    thumbnail: '',
    published: '',
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
        const response = await fetch(`${CORS_PROXY}${encodeURIComponent(rssUrl)}`);
        
        if (!response.ok) {
          throw new Error('RSS feed non disponible');
        }
        
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Récupérer la première vraie vidéo (pas un Short)
        const entries = Array.from(xmlDoc.querySelectorAll('entry'));

        const validEntry = entries.find((entry) => {
          const linkHref = entry.querySelector('link')?.getAttribute('href') || '';
          // On ignore les Shorts qui ont une URL de type /shorts/...
          return !linkHref.includes('/shorts/');
        });

        const entry = validEntry ?? entries[0];

        if (!entry) {
          throw new Error('Aucune vidéo trouvée');
        }

        const title = entry.querySelector('title')?.textContent || 'Dernière vidéo';
        const videoId = entry.querySelector('yt\\:videoId, videoId')?.textContent || '';
        const link =
          entry.querySelector('link')?.getAttribute('href') ||
          `https://youtube.com/watch?v=${videoId}`;
        const published = entry.querySelector('published')?.textContent || '';
        const thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

        setVideo({
          title,
          videoId,
          link,
          thumbnail,
          published,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setVideo({
          title: '',
          videoId: '',
          link: '',
          thumbnail: '',
          published: '',
          isLoading: false,
          error: 'Impossible de charger la dernière vidéo',
        });
      }
    };

    fetchLatestVideo();
    
    // Rafraîchir toutes les 10 minutes
    const interval = setInterval(fetchLatestVideo, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return video;
};

export default useLatestVideo;

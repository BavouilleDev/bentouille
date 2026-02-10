import { useEffect, useState } from 'react';
import { getYouTubeDataWithCache } from './youtubeApiClient';

interface LatestVideoState {
  title: string;
  videoId: string;
  link: string;
  thumbnail: string;
  published: string;
  isLoading: boolean;
  error: string | null;
}

export const useLatestVideo = (): LatestVideoState => {
  const [state, setState] = useState<LatestVideoState>({
    title: '',
    videoId: '',
    link: '',
    thumbnail: '',
    published: '',
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await getYouTubeDataWithCache();

        if (cancelled) return;

        if (!data.latestVideo) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: 'Aucune vidéo trouvée',
          }));
          return;
        }

        setState({
          title: data.latestVideo.title,
          videoId: data.latestVideo.videoId,
          link: data.latestVideo.link,
          thumbnail: data.latestVideo.thumbnail,
          published: data.latestVideo.published,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        if (cancelled) return;

        const message =
          error instanceof Error
            ? error.message
            : 'Impossible de charger la dernière vidéo';

        setState({
          title: '',
          videoId: '',
          link: '',
          thumbnail: '',
          published: '',
          isLoading: false,
          error: message,
        });
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
};

export default useLatestVideo;


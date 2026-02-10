import { useEffect, useState } from 'react';
import { formatSubscribers, getYouTubeDataWithCache } from './youtubeApiClient';

interface YouTubeStatsState {
  subscriberCount: number | null;
  formattedSubscribers: string;
  isLoading: boolean;
  error: string | null;
}

export const useYouTubeStats = (): YouTubeStatsState => {
  const [state, setState] = useState<YouTubeStatsState>({
    subscriberCount: null,
    formattedSubscribers: '',
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await getYouTubeDataWithCache();
        if (cancelled) return;

        const formatted = formatSubscribers(data.subscriberCount);

        setState({
          subscriberCount: data.subscriberCount,
          formattedSubscribers: formatted,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        if (cancelled) return;

        const message =
          error instanceof Error
            ? error.message
            : "Impossible de charger les statistiques YouTube";

        setState({
          subscriberCount: null,
          formattedSubscribers: '',
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

export default useYouTubeStats;


interface YouTubeLatestVideo {
  title: string;
  videoId: string;
  link: string;
  thumbnail: string;
  published: string;
}

export interface YouTubeData {
  subscriberCount: number | null;
  latestVideo: YouTubeLatestVideo | null;
  fetchedAt: number;
}

const API_KEY = 'AIzaSyDTwzQymyfida5ztaV3L_mkZq6LCxErjtg';
const CHANNEL_ID = 'UCcOsFB2AcE-QDDX7bixmaiA';

const CACHE_KEY = 'yt_bavouille_data_v1';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

let inFlightPromise: Promise<YouTubeData> | null = null;

const isBrowser = typeof window !== 'undefined';

function readCache(): YouTubeData | null {
  if (!isBrowser) return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as YouTubeData;
    if (!parsed || typeof parsed.fetchedAt !== 'number') return null;
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(data: YouTubeData) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // fail silently, cache is just an optimization
  }
}

function formatThumbnailFromId(videoId: string): string {
  if (!videoId) return '';
  // maxresdefault peut ne pas exister pour toutes les vidéos, mais c'est OK pour un usage front.
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}

/** Décode les entités HTML et normalise les apostrophes dans le titre (ex. &#39; → ', ʼ → ') */
function decodeHtmlEntities(str: string): string {
  if (!str) return str;
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;|&#x27;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(parseInt(code, 16))
    )
    .replace(/[\u2018\u2019\u201A\u2032\u2035]/g, "'"); // typographic apostrophes → ASCII
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  let body: any = null;

  try {
    body = await response.json();
  } catch {
    // ignore JSON parsing error here, handled below
  }

  if (!response.ok) {
    const message =
      body?.error?.message ||
      body?.error?.errors?.[0]?.message ||
      `Erreur API YouTube (${response.status})`;
    throw new Error(message);
  }

  return body as T;
}

// Convertit une durée ISO 8601 YouTube (ex: PT1H2M3S, PT9M10S, PT45S) en secondes
function parseYouTubeDurationToSeconds(isoDuration: string | undefined): number {
  if (!isoDuration) return 0;

  const match = isoDuration.match(
    /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/
  );

  if (!match) return 0;

  const [, h, m, s] = match;
  const hours = h ? Number(h) : 0;
  const minutes = m ? Number(m) : 0;
  const seconds = s ? Number(s) : 0;

  if (!Number.isFinite(hours) || !Number.isFinite(minutes) || !Number.isFinite(seconds)) {
    return 0;
  }

  return hours * 3600 + minutes * 60 + seconds;
}

async function fetchYouTubeDataFromApi(): Promise<YouTubeData> {
  // 1) Récupérer les stats de la chaîne (abonnés)
  const channelsUrl = new URL('https://www.googleapis.com/youtube/v3/channels');
  channelsUrl.searchParams.set('key', API_KEY);
  channelsUrl.searchParams.set('id', CHANNEL_ID);
  channelsUrl.searchParams.set('part', 'statistics');

  // 2) Récupérer les dernières vidéos via search
  const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
  searchUrl.searchParams.set('key', API_KEY);
  searchUrl.searchParams.set('channelId', CHANNEL_ID);
  searchUrl.searchParams.set('part', 'snippet,id');
  searchUrl.searchParams.set('order', 'date');
  // On prend plusieurs résultats pour pouvoir filtrer ensuite par durée
  searchUrl.searchParams.set('maxResults', '15');
  searchUrl.searchParams.set('type', 'video');

  const [channelsData, searchData] = await Promise.all([
    fetchJson<{
      items: Array<{ statistics?: { subscriberCount?: string } }>;
    }>(channelsUrl.toString()),
    fetchJson<{
      items: Array<{
        id?: { videoId?: string };
        snippet?: {
          title?: string;
          publishedAt?: string;
        };
      }>;
    }>(searchUrl.toString()),
  ]);

  const subscriberCountRaw =
    channelsData.items?.[0]?.statistics?.subscriberCount ?? null;
  const subscriberCount = subscriberCountRaw
    ? Number(subscriberCountRaw)
    : null;

  let latestVideo: YouTubeLatestVideo | null = null;

  // 3) Filtrer côté code pour garder la première vidéo avec une durée >= 8 minutes
  const searchItems = searchData.items ?? [];
  const videoIds = searchItems
    .map((item) => item.id?.videoId)
    .filter((id): id is string => Boolean(id));

  if (videoIds.length > 0) {
    const videosUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
    videosUrl.searchParams.set('key', API_KEY);
    videosUrl.searchParams.set('id', videoIds.join(','));
    videosUrl.searchParams.set('part', 'contentDetails,snippet');

    const videosData = await fetchJson<{
      items: Array<{
        id?: string;
        contentDetails?: { duration?: string };
        snippet?: {
          title?: string;
          publishedAt?: string;
        };
      }>;
    }>(videosUrl.toString());

    const MIN_DURATION_SECONDS = 8 * 60; // 8 minutes

    const longVideo = videosData.items.find((video) => {
      const durationSeconds = parseYouTubeDurationToSeconds(
        video.contentDetails?.duration
      );
      return durationSeconds >= MIN_DURATION_SECONDS;
    });

    if (longVideo && longVideo.id) {
      const matchingSearchItem = searchItems.find(
        (item) => item.id?.videoId === longVideo.id
      );

      const rawTitle =
        longVideo.snippet?.title ||
        matchingSearchItem?.snippet?.title ||
        'Dernière vidéo';

      const published =
        longVideo.snippet?.publishedAt ||
        matchingSearchItem?.snippet?.publishedAt ||
        '';

      const videoId = longVideo.id;

      latestVideo = {
        title: decodeHtmlEntities(rawTitle),
        videoId,
        link: `https://youtube.com/watch?v=${videoId}`,
        thumbnail: formatThumbnailFromId(videoId),
        published,
      };
    }
  }

  const result: YouTubeData = {
    subscriberCount,
    latestVideo,
    fetchedAt: Date.now(),
  };

  writeCache(result);
  return result;
}

export async function getYouTubeDataWithCache(): Promise<YouTubeData> {
  // 1) Essayer le cache
  const cached = readCache();
  if (cached) {
    // Toujours décoder le titre au retour (corrige ancien cache ou encodage API)
    if (cached.latestVideo?.title) {
      return {
        ...cached,
        latestVideo: {
          ...cached.latestVideo,
          title: decodeHtmlEntities(cached.latestVideo.title),
        },
      };
    }
    return cached;
  }

  // 2) Dédupliquer les appels réseau en cours
  if (inFlightPromise) {
    return inFlightPromise;
  }

  inFlightPromise = fetchYouTubeDataFromApi()
    .catch((error) => {
      // En cas d'erreur, on laisse remonter pour que les hooks gèrent le message
      throw error;
    })
    .finally(() => {
      inFlightPromise = null;
    });

  return inFlightPromise;
}

export function formatSubscribers(count: number | null): string {
  if (count == null || !Number.isFinite(count)) return '';

  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\\.0$/, '')}M`;
  }

  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\\.0$/, '')}k`;
  }

  return count.toString();
}


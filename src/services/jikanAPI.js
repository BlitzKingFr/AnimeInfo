const BASE_URL = "https://api.jikan.moe/v4";
const CACHE_TTL_MS = 5 * 60 * 1000;
const responseCache = new Map();
const inFlightRequests = new Map();

async function requestWithDedupe(endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  const now = Date.now();
  const cached = responseCache.get(url);

  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  if (inFlightRequests.has(url)) {
    return inFlightRequests.get(url);
  }

  const requestPromise = (async () => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed (${response.status})`);
    }

    const data = await response.json();
    responseCache.set(url, { data, timestamp: Date.now() });
    return data;
  })();

  inFlightRequests.set(url, requestPromise);

  try {
    return await requestPromise;
  } finally {
    inFlightRequests.delete(url);
  }
}

export async function fetchAnimeByName(query) {
  const normalizedQuery = query.trim();
  const data = await requestWithDedupe(`/anime?q=${encodeURIComponent(normalizedQuery)}`);
  return data.data; 
}

export async function fetchTopAnime() {
  const data = await requestWithDedupe("/top/anime?limit=24");
  return data.data;
}


export async function fetchAnimeById(id) {
  const data = await requestWithDedupe(`/anime/${id}`);
  return data.data; 
}

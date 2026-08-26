const CACHE_DURATION = 60 * 60 * 1000;

export function saveCache(key, data) {
  const cacheData = {
    data,
    timestamp: Date.now(),
  };

  localStorage.setItem(key, JSON.stringify(cacheData));
}

export function getCache(key) {
  const cached = localStorage.getItem(key);

  if (!cached) {
    return null;
  }

  const parsedCache = JSON.parse(cached);

  const hasExpired =
    Date.now() - parsedCache.timestamp > CACHE_DURATION;

  if (hasExpired) {
    localStorage.removeItem(key);
    return null;
  }

  return parsedCache.data;
}
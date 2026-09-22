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

  try {
    const parsedCache = JSON.parse(cached);

    if (
      typeof parsedCache !== "object" ||
      parsedCache === null ||
      typeof parsedCache.timestamp !== "number" ||
      !("data" in parsedCache)
    ) {
      localStorage.removeItem(key);
      return null;
    }

    const hasExpired =
      Date.now() - parsedCache.timestamp > CACHE_DURATION;

    if (hasExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return parsedCache.data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}
const cache: Record<string, any> = {};

export const useCache = <T>() => {
  const getCachedData = (key: string): T | undefined => {
    return cache[key];
  };

  const setCachedData = (key: string, data: T) => {
    cache[key] = data;
  };

  return { getCachedData, setCachedData };
};

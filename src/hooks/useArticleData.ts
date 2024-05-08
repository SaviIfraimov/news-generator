import { useState, useEffect } from 'react';

import { Article } from '../types/Article';
import { getArticles, getArticlesByCategory } from '../services/articlesService';
import { useCache } from '../utils/cache';

interface UseArticleDataProps {
  filterText: string;
  category: string;
}

// A custom hook used to get the data with a caching mechanism - whether by default search or by category
export const useArticleData = ({ filterText, category }: UseArticleDataProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  
  const { getCachedData, setCachedData } = useCache<Article[]>();

  useEffect(() => {
    const fetchArticles = async () => {
      const cacheKey = category || 'default'; // Use category as part of the cache key or a default key
      const cachedArticles = getCachedData(cacheKey);
      if (cachedArticles) {
        setArticles(cachedArticles);
      } else {
        try {
          const fetchedArticles = category ? await getArticlesByCategory(category) : await getArticles(filterText);
          setArticles(fetchedArticles);
          setCachedData(cacheKey, fetchedArticles);
        } catch (error) {
          console.error('Error fetching articles:', error);
        }
      }
    };

    fetchArticles();
  }, [category, filterText, getCachedData, setCachedData]);

  return { articles };
};

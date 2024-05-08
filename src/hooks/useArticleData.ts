import { useState, useEffect } from 'react';

import { Article } from '../types/Article';
import { getArticlesPage, getArticlesByCategoryPage } from '../services/articlesService';

import { useSearchParams } from 'react-router-dom';

interface UseArticleDataPageProps {
  filterText: string;
  category: string;
  page: number;
}

// A custom hook used to get the data - whether by default search or by category
export const useArticleDataPage = ({ filterText, category, page }: UseArticleDataPageProps) => {
  const [searchParams] = useSearchParams();
  const searchParamCategory = searchParams.get('category');
  const searchParamQ = searchParams.get('q');

  const [articles, setArticles] = useState<Article[]>([]);
  const debounceDelayInSeconds = 2;

  useEffect(() => {
    const timeoutId = setTimeout(() => { // Debounce the API call
      const fetchArticles = async () => {
        try {
          const fetchedArticles = searchParamCategory ? await getArticlesByCategoryPage(searchParamCategory, page) : await getArticlesPage(searchParamQ, page);
          setArticles(fetchedArticles);
        } catch (error) {
          console.error('Error fetching articles:', error);
        }
      };

      fetchArticles();
    }, debounceDelayInSeconds * 1000);

    return () => clearTimeout(timeoutId); // Cleanup the timeout

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, filterText, page]);

  return { articles };
};

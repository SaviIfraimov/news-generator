import axios from 'axios';
import { Article } from '../types/Article';

//NOT RECOMMENDED IN PROD: hardcoded so that a developer will not have to deal with the env files' secrets.
const NEWS_API_KEY = //process.env.REACT_APP_NEWS_API_KEY ||
  'e6d860f1becb40bf87197822953e1050'; 

export const getArticlesPage = async (filter: string | null, page: number): Promise<Article[]> => {
  const specificDataFilter = 'madrid';
  const NEWS_API_URL = `https://newsapi.org/v2/everything?q=${filter || specificDataFilter}&sortBy=popularity&pageSize=10&page=${page}&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await axios.get(NEWS_API_URL);
    return response.data.articles;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
};

export const getArticlesByCategoryPage = async (category: string, page: number): Promise<Article[]> => {
  const NEWS_BY_CATEGORY_API_URL = `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=10&page=${page}&apiKey=${NEWS_API_KEY}`;
  
  try {
    const response = await axios.get(NEWS_BY_CATEGORY_API_URL);
    return response.data.articles;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
};

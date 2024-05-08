import axios from 'axios';
import { Article } from '../types/Article';

//NOT RECOMMENDED IN PROD: hardcoded so that a developer will not have to deal with the env files' secrets.

//TODO
const NEWS_API_KEY = //process.env.REACT_APP_NEWS_API_KEY ||
  'd734197b23d4423ebc04da51dec784ec'; 

export const getArticles = async (filter: string): Promise<Article[]> => {
  const specificDataFilter = 'madrid';
  const NEWS_API_URL = `https://newsapi.org/v2/everything?q=${filter || specificDataFilter}&sortBy=popularity&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await axios.get(NEWS_API_URL);
    return response.data.articles;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
};

export const getArticlesByCategory = async (category: string): Promise<Article[]> => {
  const NEWS_BY_CATEGORY_API_URL = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${NEWS_API_KEY}`;
  
  try {
    const response = await axios.get(NEWS_BY_CATEGORY_API_URL);
    return response.data.articles;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
};

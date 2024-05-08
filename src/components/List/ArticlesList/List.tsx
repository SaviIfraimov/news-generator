import React, { useState } from 'react';
import './List.css';

import { useLocation, useNavigate } from 'react-router-dom';

import { useArticleData } from '../../../hooks/useArticleData';
import { Article } from '../../../types/Article';

import ResponsiveLayout from '../../ResponsiveLayout';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

import ListFilterInput from './ListFilterInput';

import { useCache } from '../../../utils/cache';
import ListFilterButtons from './ListFilterButtons';

const ArticleList: React.FC = () => {
  const [filterText, setFilterText] = useState('');
  const [category, setCategory] = useState('');
  const location = useLocation();
  
  
  const prevArticleCategory: string = category || location.state?.category;
  const { getCachedData } = useCache<Article[]>();
  const prevStateArticles = prevArticleCategory && getCachedData(prevArticleCategory);
  const data = useArticleData({ filterText, category }) || [];
  const articles = prevStateArticles || data.articles;
  
  const filteredArticles = articles?.filter((article) =>
    article.title?.toLowerCase().includes(filterText.toLowerCase()) ||
    article.description?.toLowerCase().includes(filterText.toLowerCase())
  ); // todo TODO add the type from api

  const navigate = useNavigate();

  // Generates a numeric id given a unique string of 'title' (for redirection/url purposes)
  const hashCode = (title: string) => {
    let hash = 0;
    if (title.length === 0) return hash;
    for (let i = 0; i < title.length; i++) {
      const char = title.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  const handleFilterChange = (newFilterText: string) => {
    setFilterText(newFilterText);
  };

  const imageNotFoundUrl = 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';
  
  const handleImageError = (e: any) => {
    e.target.src = imageNotFoundUrl;
  };

  const handleChosenArticle = (article: Article) => {
    // Routes (redirects) to the chosen article view
    navigate(`/articles/${hashCode(article.title)}`, {state: {article, category: category || prevArticleCategory}})
  };

  return articles.length === 0 ? <></> : (
      <ResponsiveLayout>
        {articles.length === 0 && <LoadingSpinner />}
        <ListFilterInput onFilterChange={handleFilterChange} />
        <ListFilterButtons setCategory={setCategory}/>

        <ul className="list">
          {filteredArticles.map((article) => (
          <li key={article.title} className="listItem" onClick={() => handleChosenArticle(article)}>
            <div className="itemContent">
              <p>
                <span><strong>{article.title}</strong></span>
              </p>
              <p>
                <span><em>{article.publishedAt.replace('T', ' ').slice(0, -4)}</em></span>
              </p>
                <img className="articleImage" 
                  src={article.urlToImage || imageNotFoundUrl}
                  alt="Article"
                  onError={handleImageError} />
              <p>
                <span>{article.description?.slice(0,79)} <strong>{'...Read more'}</strong></span>
              </p>
            </div>
          </li>
          ))}
        </ul>
      </ResponsiveLayout>
  );
};

export default ArticleList;

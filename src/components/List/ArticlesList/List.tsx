import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './List.css';
import { BottomScrollListener } from 'react-bottom-scroll-listener'
import { useArticleDataPage } from '../../../hooks/useArticleData';
import { Article } from '../../../types/Article';

import ResponsiveLayout from '../../ResponsiveLayout';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

import ListFilterInput from './ListFilterInput';
import ListFilterButtons from './ListFilterButtons';

const ArticleList: React.FC = () => {
  const navigate = useNavigate();

  const [filterText, setFilterText] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([])
  const { articles: fetchedArticles } = useArticleDataPage({ filterText, category, page }) || [];
  
  useEffect(() => {
    setArticles([...articles, ...fetchedArticles])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedArticles])

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
    setArticles([])
    setFilterText(newFilterText);
  };

  const handleCategoryChange = (category: string) => {
    setArticles([])
    setCategory(category)
  };

  const imageNotFoundUrl = 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';
  
  const handleImageError = (e: any) => {
    e.target.src = imageNotFoundUrl;
  };

  const handleChosenArticle = (article: Article) => {
    // Routes (redirects) to the chosen article view
    navigate(`/articles/${hashCode(article.title)}`, {state: {article, articles, category, filterText}})
  };

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
      <ResponsiveLayout>
        <ListFilterInput onFilterChange={handleFilterChange} />
        <ListFilterButtons setCategory={handleCategoryChange}/>
          <BottomScrollListener onBottom={() => setPage(page + 1)}>
          <ul className="list">
            {articles.length === 0 ?
            <LoadingSpinner />
            :
            articles.map((article: Article) => (
              <>
            <li key={hashCode(article.title)+getRandomNumber(1,10000)} className="listItem" onClick={() => handleChosenArticle(article)}>
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
            </>
            ))}
          </ul>
          </BottomScrollListener>
      </ResponsiveLayout>
  );
};

export default ArticleList;

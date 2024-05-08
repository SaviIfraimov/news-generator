import React from 'react';
import './ArticlePage.css';
import { Article } from "../../types/Article";

import SmallBackButton from "../../components/Button/SmallBackButton";
import ResponsiveLayout from "../../components/ResponsiveLayout";

import { useLocation, useNavigate } from 'react-router-dom';

const ArticlePage: React.FC = () => {
  const location = useLocation();
  const article: Article = location.state?.article;

  const {title, author, description, content, publishedAt, urlToImage} = article;
  
  const navigate = useNavigate();

  const defaultImage = 'https://media.istockphoto.com/id/1309699912/vector/vector-illustration-daily-news-paper-template-with-text-and-picture-placeholder.jpg?s=1024x1024&w=is&k=20&c=H-sG8enS-3H7cFcJaLY883g4UbUBN0zNxrQkl2OzjYM=';
  
  const handleImageError = (e: any) => {
    e.target.src = defaultImage;
  };

  return (
    <ResponsiveLayout>
      <SmallBackButton text={'⬅'} onClick={()=> navigate(-1)}/>
      <div className="article">
        <div className="itemContent">
          <h3>{title}</h3>
          <p>
            <span className="published_date"><em>{publishedAt.replace('T', ' ').slice(0, -4)}</em></span>
          </p>
          <p>
            <span className="author">{author} </span>
          </p>
          <br/>
          <p>
            <img src={urlToImage || defaultImage} 
              alt="Article"
              style={{ width: urlToImage ? '50%' : '40%', height: urlToImage ? '50%' : '40%' }} 
              onError={handleImageError}/>
          </p>
          <br/>
          <span>{description}</span>
          <br/>
          <br/>
          <article>{content}</article>
        </div>
      </div>
    </ResponsiveLayout>
  );
};
  
export default ArticlePage;
    
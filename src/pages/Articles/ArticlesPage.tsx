import React from 'react';
import './ArticlesPage.css';

import ArticleList from '../../components/List/ArticlesList/List';

const ArticlesPage = () => {
    return (
        <div>        
            <div className="articlesSection">
                <ArticleList/>
            </div>
        </div>
    );
};

export default ArticlesPage;
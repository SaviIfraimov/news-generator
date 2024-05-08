import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ArticlesPage from './pages/Articles/ArticlesPage';
import ArticlePage from './pages/Articles/ArticlePage';

function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/articles" />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:articleId" element={<ArticlePage />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ArticleList from '../components/List/ArticlesList/List';

// useArticleData is a hook used in your ArticleList component for fetching data
jest.mock('../hooks/useArticleData', () => ({
  useArticleData: () => ({
    articles: [
      {
        title: "Article about Madrid",
        description: "Madrid is a great city. Madrid is a great city. Madrid is a great city. Madrid is a great city.",
        publishedAt: "2024-09-09T12:00:00Z",
        urlToImage: "https://example.com/image.jpg"
      }
    ]
  }),
  useArticleDataPage: jest.fn().mockReturnValue({
    articles: [
      {
        title: "Article about Madrid",
        description: "Madrid is a great city. Madrid is a great city. Madrid is a great city. Madrid is a great city.",
        publishedAt: "2024-09-09T12:00:00Z",
        urlToImage: "https://example.com/image.jpg"
      }
    ]
  })
}));


describe('ArticleList', () => {
  test('renders article with title, date, truncated description', async () => {
    render(<Router><ArticleList /></Router>);
    
    // Await the rendering to ensure the component has loaded
    await waitFor(() => {
      // Attempt to find an element with text that includes 'Article about Madrid' (title)
      const title = screen.getByText(/Article about Madrid/);
      expect(title).toBeInTheDocument();
    });

    // Attempt to find an element with text that includes '2024-09-09' (date)
    const date = screen.getByText(/2024-09-09/);
    expect(date).toBeInTheDocument();

    // Attempt to find the 'Madrid...' string (longer than 80) in the truncated-to-80-chars description
    const text = screen.queryByText(/Madrid is a great city. Madrid is a great city. Madrid is a great city. Madrid is a great city./);
    expect(text).not.toBeInTheDocument();
  
    // Attempt to find 'Madrid is a great city.' in the truncated-to-80-chars description
    const textShort = screen.getByText(/Madrid is a great city./);
    expect(textShort).toBeInTheDocument();
  });

  // Attempt to find the buttons and input
  test('renders article list with filter buttons and input', async () => {
    render(<Router><ArticleList /></Router>);
    

    // Await the rendering to ensure the component has loaded
    await waitFor(() => {
      const entertainment = screen.getByText(/entertainment/);
      expect(entertainment).toBeInTheDocument();
    });

    const general = screen.getByText(/general/);
    expect(general).toBeInTheDocument();
    const business = screen.getByText(/business/);
    expect(business).toBeInTheDocument();
    const health = screen.getByText(/health/);
    expect(health).toBeInTheDocument();
    const sport = screen.getByText(/sport/);
    expect(sport).toBeInTheDocument();
    const technology = screen.getByText(/technology/);
    expect(technology).toBeInTheDocument();
    const science = screen.getByText(/science/);
    expect(science).toBeInTheDocument();
    const input = screen.getByPlaceholderText(/search text/);
    expect(input).toBeInTheDocument();
  });
});

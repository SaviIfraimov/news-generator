import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ArticlePage from '../pages/Articles/ArticlePage';

const articleDetails = {
  title: "Detailed Article",
  publishedAt: "2021-05-01T12:00:00Z",
  author: "Author Name",
  urlToImage: "https://example.com/image.jpg",
  description: "Detailed description of the article.",
  content: "Full content of the detailed article."
};

describe('ArticlePage', () => {
  test('displays full article, author, description and content', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/article', state: { article: articleDetails } }]}>
        <Routes>
          <Route path="/article" element={<ArticlePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Await the rendering of the title to ensure the component has loaded
    await waitFor(() => {
      expect(screen.getByText(articleDetails.title)).toBeInTheDocument();
    }, { timeout: 1000 }); // Increase timeout if necessary

    // Check all other elements
    expect(screen.getByText(articleDetails.author)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(articleDetails.publishedAt.slice(0, 10)))).toBeInTheDocument(); // Check only date part
    expect(screen.getByText(articleDetails.description)).toBeInTheDocument();
    expect(screen.getByText(articleDetails.content)).toBeInTheDocument();
  });
});

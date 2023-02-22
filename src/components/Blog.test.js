import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Blog from './Blog';

describe('Blog component', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://testurl.com',
    likes: 10
  };

  test('renders title and author but not URL or number of likes', () => {
    render(<Blog blog={blog} />);

    expect(screen.getByText(new RegExp(`${blog.title}\\s+${blog.author}`))).toBeInTheDocument();
    expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
    expect(screen.queryByText(blog.likes)).not.toBeInTheDocument();
  });
});
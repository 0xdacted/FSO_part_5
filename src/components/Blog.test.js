import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Blog from './Blog';
import Togglable from'./Togglable'
import userEvent from '@testing-library/user-event'


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

  test('clicking the view button shows blog URL and likes', () => {
    render(
      <div>
      <Blog blog={blog}/>
        <Togglable buttonLabel="view">
          <div>
            <div>{blog.url}</div>
            <div>likes {blog.likes}</div>
          </div>
        </Togglable>
      </div>
    );
    
    const viewButton = screen.getByText('view');
    userEvent.click(viewButton);
  
    const url = screen.getByText(blog.url);
    expect(url).toBeInTheDocument();
  
    const likes = screen.getByText(`likes ${blog.likes}`);
    expect(likes).toBeInTheDocument();
    });
  });
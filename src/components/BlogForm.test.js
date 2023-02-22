import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('form calls createBlog function with correct details when a new blog is created', async () => {
  const createBlog = jest.fn();
  const user = { username: 'testuser', name: 'Test User' };
  render(<BlogForm createBlog={createBlog} user={user} />);

  const titleInput = screen.getByLabelText('title:');
  const authorInput = screen.getByLabelText('author:');
  const urlInput = screen.getByLabelText('url:');
  const submitButton = screen.getByRole('button', { name: /create/ });

  await userEvent.type(titleInput, 'Test Blog Title');
  await userEvent.type(authorInput, 'Test Blog Author');
  await userEvent.type(urlInput, 'http://testblog.com');
  await userEvent.click(submitButton);

  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog).toHaveBeenCalledWith(
    {
      title: 'Test Blog Title',
      author: 'Test Blog Author',
      url: 'http://testblog.com',
    },
    user
  );
});

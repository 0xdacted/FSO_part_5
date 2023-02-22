import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  test('clicking like button twice calls event handler twice', async () => {
    const blog = {
      id: 1,
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://www.testblog.com',
      likes: 0,
      
    };
    const mockHandleClick = jest.fn() 
    render(
      <div>
        <div>
          <button onClick={() => mockHandleClick(blog)}>like</button>
        </div>
      </div>
    );
    const user = userEvent.setup()

    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockHandleClick.mock.calls).toHaveLength(2);
  });
});

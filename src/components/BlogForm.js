import { useState } from 'react';

const BlogForm = ({ createBlog, user }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleBlogSubmit = (event) => {
    event.preventDefault();
    createBlog(newBlog, user)
    setNewBlog({ title: '', author: '', url: ''})
  }



  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={handleBlogSubmit}>
        <div>
          title:
          <input type="text" value={newBlog.title} name="title" onChange={handleBlogChange} />
        </div>
        <div>
          author:
          <input type="text" value={newBlog.author} name="author" onChange={handleBlogChange} />
        </div>
        <div>
          url:
          <input type="text" value={newBlog.url} name="url" onChange={handleBlogChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;

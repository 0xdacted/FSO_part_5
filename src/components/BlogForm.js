import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const returnedBlog = await createBlog(newBlog);
      setNewBlog({ title: '', author: '', url: '' });
      console.log(`New blog "${returnedBlog.title}" added!`);
    } catch (error) {
      console.log('Error adding blog.');
    }
  };

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
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

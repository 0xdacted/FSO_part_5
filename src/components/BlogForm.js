import { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleBlogSubmit = (event) => {
    event.preventDefault()
    createBlog(newBlog, user)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={handleBlogSubmit}>
        <div>
          <label htmlFor="title-input">title:</label>
          <input
            id="title-input"
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <label htmlFor="author-input">author:</label>
          <input
            id="author-input"
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <label htmlFor="url-input">url:</label>
          <input
            id="url-input"
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleBlogChange}
          />
        </div>
        <button id="create-blog" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm

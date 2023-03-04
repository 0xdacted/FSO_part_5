import { useDispatch, useSelector, useState } from "react-redux"
import { updateBlogInStore, deleteBlogFromStore, addComment } from '../reducers/blogReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'


const BlogView = ({ blog, currUser }) => {
  const dispatch = useDispatch()
  const [commentText, setCommentText] = useState('')

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    dispatch(addComment(blog.id, commentText))
    setCommentText('')

  const handleLikeClick = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(updateBlogInStore(updatedBlog))
  }

  const handleDeleteClick = async (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlogFromStore(blog.id))
        dispatch(setNotification({ message: `Blog "${blog.title}" removed!`, isSuccess: true }))
        setTimeout(() => {
         dispatch(clearNotification())
        }, 5000)
      } catch (error) {
        dispatch(setNotification({ message: 'Failed to remove the blog.', isSuccess: false }))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      }
    }
  }
  return (
    <div>
      <h2>{blog.title}</h2>
                <div>
                  <div>
                    <a href={blog.url}>{blog.url}</a>
                    </div>
                  <div>
                    likes {blog.likes}{' '}
                    <button
                      id="like-click"
                      onClick={() => handleLikeClick(blog)}
                    >
                      like
                    </button>
                  </div>
                  <div>{blog.user.username}</div>
                  { currUser && blog.user.username === currUser.username && (
                    <button
                      id="remove-click"
                      onClick={() => handleDeleteClick(blog)}
                    >
                      remove
                    </button>
                  )}
                </div>
      <h3>comments</h3>
        <form onSubmit={handleCommentSubmit}>
          <input type="text" value={commentText} onChange={(event) => setCommentText(event.target.value)} />
          <button type="submit">add comment</button>
        </form>
    </div>
  )
}}

export default BlogView
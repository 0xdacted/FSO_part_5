import { useDispatch, useSelector } from "react-redux"
import { updateBlogInStore, deleteBlogFromStore } from '../reducers/blogReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const BlogView = ({ blog }) => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.logins)

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
                  <div>{blog.url}</div>
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
                  { loggedUser && blog.user.username === loggedUser.username && (
                    <button
                      id="remove-click"
                      onClick={() => handleDeleteClick(blog)}
                    >
                      remove
                    </button>
                  )}
                </div>
    </div>
  )
}

export default BlogView
import { Link } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addCommment } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [commentText, setCommentText] = useState('')
  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    dispatch(addComment(blog.id, commentText))
    setCommentText('')
  }
  return (
    <div>
    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}
    <h3>comments</h3>
    <form onSubmit={handleCommentSubmit}>
      <input type="text" value={commentText} onChange={(event) => setCommentText(event.target.value)} />
      <button type="submit">add comment</button>
    </form>
    </div>
  )
  }

export default Blog

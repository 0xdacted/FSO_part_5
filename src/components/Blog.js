import { Link } from "react-router-dom"

const Blog = ({ blog }) => (
    <div>
    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}
    </div>
  )
  

export default Blog

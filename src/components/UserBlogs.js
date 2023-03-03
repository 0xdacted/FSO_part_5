import React from 'react'

const UserBlogs = ({ user }) => {
  return (
    <div>
      <h2>{user.username}'s blog posts</h2>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlogs
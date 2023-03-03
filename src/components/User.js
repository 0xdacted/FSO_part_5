import { Link } from 'react-router-dom'
import React from 'react'

const User = ({ user }) => {
  return (
    <div>
        <Link to={`/users/${user.id}`}>{user.username}</Link>has created {user.blogs.length} blog(s)
    </div>
  )
}

export default User
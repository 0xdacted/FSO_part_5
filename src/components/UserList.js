import React from 'react'
import User from './User'
import { useSelector } from 'react-redux'

const UserList = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
    <h2>Users</h2>         <em>blogs created</em>
      {users.map((user) => (
      <User key={user.id} user={user} />
      ))}
    </div>
  )
}

export default UserList
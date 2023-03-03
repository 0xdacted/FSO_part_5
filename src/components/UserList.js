import React from 'react'
import User from './User'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../reducers/userReducer'
import { useEffect } from 'react'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch, users])


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
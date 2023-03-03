import React from 'react'
import User from './User'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../reducers/userReducer'
import { useEffect } from 'react'


const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  console.log(users)
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])


  return (
    <div>
    <h2>Users</h2>         
      {users && users.map((user) => (
      <div key={user.id}>
      <User key={user.id} user={user} />
      </div>
       ))}
    </div>

  )
}

export default UserList
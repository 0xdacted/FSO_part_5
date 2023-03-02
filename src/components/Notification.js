import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, isSuccess } = useSelector(state => state.notification || {})

  if (!message) {
    return null
  }
  const className = isSuccess ? 'success' : 'failure'
  return <div className={`notification ${className}`}>{message} </div>
}



export default Notification
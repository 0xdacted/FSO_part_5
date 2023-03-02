import React from 'react'

const Notification = ({ message, isSuccess }) => {
  if (message === null) {
    return null
  }
  const className = isSuccess ? 'success' : 'failure'
  return <div className={`notification ${className}`}>{message} </div>
}



export default Notification
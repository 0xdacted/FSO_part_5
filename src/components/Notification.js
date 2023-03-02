import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ message, isSuccess }) => {
  if (message === null) {
    return null
  }
  const className = isSuccess ? 'success' : 'failure'
  return <div className={`notification ${className}`}>{message} </div>
}



export default Notification
import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ message, isSuccess }) => {
  if (message === null) {
    return null
  }
  const className = isSuccess ? 'success' : 'failure'
  return <div className={`notification ${className}`}>{message} </div>
}

const mapStateToProps = (state) => ({
  message: state.notification.message,
  isSuccess: state.notification.isSuccess,
})

export default connect(mapStateToProps)(Notification)
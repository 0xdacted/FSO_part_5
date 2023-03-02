export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const CLEAR_NOTIFICATION = 'CLEAR NOTIFICATION'

export const setNotification = (message, isSuccess) => ({
  type: SET_NOTIFICATION,
  payload: {
    message,
    isSuccess
  }
})

export const clearNotification = () => ({
  type: CLEAR_NOTIFICATION
})
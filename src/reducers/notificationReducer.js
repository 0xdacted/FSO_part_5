import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from '../actions/actions/notificationActions'
const initialState = {
  message: null,
  isSuccess: false
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_NOTIFICATION:
      return {
        message: action.payload.message,
        isSuccess: action.payload.isSuccess,
      };
    case CLEAR_NOTIFICATION:
      return initialState
    default:
      return state
  }
}

export default notificationReducer
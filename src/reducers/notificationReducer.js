import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  isSuccess: false,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message
      state.isSuccess = action.payload.isSuccess
    },
    clearNotification: (state) => {
      state.message = null
      state.isSuccess = false
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
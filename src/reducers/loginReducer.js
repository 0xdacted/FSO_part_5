import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    loginUser: (state, action) => action.payload
  }
})

export const { loginUser } = loginSlice.actions

export default loginSlice.reducer

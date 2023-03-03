import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload
  }
})

export const { setUser } = loginSlice.actions


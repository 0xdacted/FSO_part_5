import { createSlice } from "@reduxjs/toolkit";
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, action) => action.payload
  }
})

export const { setUsers } = userSlice.actions



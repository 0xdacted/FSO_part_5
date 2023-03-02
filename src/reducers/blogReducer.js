import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog: (state, action) => [...state, action.payload],
    updateBlog: (state, action) => state.map(blog => blog.id === action.payload.id ? action.payload : blog),
    removeBlog: (state, action) =>  state.filter(blog => blog.id !== action.payload)
  }
})


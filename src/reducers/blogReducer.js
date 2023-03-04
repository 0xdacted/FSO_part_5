import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog: (state, action) => [...state, action.payload],
    updateBlog: (state, action) => state.map(blog => blog.id === action.payload.id ? action.payload : blog),
    removeBlog: (state, action) =>  state.filter(blog => blog.id !== action.payload),
    addComment: (state, action) => state.map(blog => {
      if (blog.id === action.payload.blogId) {
        return {
          ...blog,
          comments: [...blog.comments, action.payload.comment]
        }
      } else {
        return blog
      }
    })
  }
})

export const { setBlogs, addBlog, updateBlog, removeBlog, addComment } = blogSlice.actions

export const fetchBlogs = () => async dispatch => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const createBlog = (blogData) => async dispatch => {
  const newBlog = await blogService.create(blogData)
  dispatch(addBlog(newBlog))
}

export const updateBlogInStore = (blogData) => async dispatch => {
  const updatedBlog = await blogService.update(blogData.id, blogData)
  dispatch(updateBlog(updatedBlog))
}

export const deleteBlogFromStore = (blogId) => async dispatch => {
  await blogService.remove(blogId)
  dispatch(removeBlog(blogId))
}

export const addCommentToBlog = (blogId, commentText) => async (dispatch) => {
  const newComment = await blogService.addComment(blogId, commentText)
  dispatch(addComment({ blogId, comment: newComment}))
}

export default blogSlice.reducer
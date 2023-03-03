import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import UserList from './components/UserList'
import { fetchBlogs, updateBlogInStore, deleteBlogFromStore, createBlog} from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from './actions/notificationActions'
import { loginUser } from './reducers/loginReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.logins)
  const dispatch = useDispatch()
  const [sortedBlogs, setSortedBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    user: null,
  })

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch, blogs])

  useEffect(() => {
    const sorted = [...blogs].sort((a, b) => b.likes - a.likes)
    setSortedBlogs(sorted)
  }, [blogs])

  useEffect(() => {
    console.log(loggedUser)
      if (loggedUser) {
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      }
  }, [loggedUser])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(loginUser(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch({ 
        type: SET_NOTIFICATION,
        payload: {
          message: `Welcome ${user.name}.`,
          isSuccess: true 
        }
        })
      setTimeout(() => {
        dispatch({type: CLEAR_NOTIFICATION})
      }, 5000)
    } catch (exception) {
      dispatch({ 
        type: SET_NOTIFICATION,
        payload: {
          message: 'Wrong credentials.',
          isSuccess: false 
        }
        })
      setTimeout(() => {
        dispatch({type: CLEAR_NOTIFICATION})
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const loginForm = () => {
    return (
      <form id="login-form" onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username-input"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password-input"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <button id="login-button" type="submit">
            login
          </button>
        </div>
      </form>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const logoutButton = () => {
    return (
      <button id="logout-button" onClick={handleLogout}>
        Log out
      </button>
    )
  }

  const addBlog = async (blogObject, user) => {
    try {
      dispatch(createBlog(blogObject))
      setNewBlog({
        title: '',
        author: '',
        url: '',
        user: null,
      })
      dispatch({ 
        type: SET_NOTIFICATION,
        payload: {
          message: `New blog "${blogObject.title}" added!`,
          isSuccess: true 
        }
        })
      setTimeout(() => {
        dispatch({type: CLEAR_NOTIFICATION})
      }, 5000)
      return blogObject
    } catch (error) {
      dispatch({ 
        type: SET_NOTIFICATION,
        payload: {
          message: `Error adding blog`,
          isSuccess: false 
        }
        })
      setTimeout(() => {
        dispatch({type: CLEAR_NOTIFICATION})
      }, 5000)
    }
  }

  const handleLikeClick = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(updateBlogInStore(updatedBlog))
  }

  const handleDeleteClick = async (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlogFromStore(blog.id))
        dispatch({ 
          type: SET_NOTIFICATION,
          payload: {
            message: `Blog "${blog.title}" removed!`,
            isSuccess: true 
          }
          })
        setTimeout(() => {
          dispatch({type: CLEAR_NOTIFICATION})
        }, 5000)
      } catch (error) {
        dispatch({ 
          type: SET_NOTIFICATION,
          payload: {
            message: 'Failed to remove the blog.',
            isSuccess: false 
          }
          })
        setTimeout(() => {
          dispatch({type: CLEAR_NOTIFICATION})
        }, 5000)
      }
    }
  }

  return (
    <div>
      <div>
      <Notification />
      </div>

      <h2>log in to application</h2>
      {!user && loginForm()}
      <h2>blogs</h2>
      {user && (
        <div>
          <p>
            {user.username} logged in {logoutButton()}
          </p>
          <Togglable id="new-blog" buttonLabel="new blog">
            <BlogForm createBlog={addBlog} user={user} />
          </Togglable>

          {sortedBlogs.map((blog) => (
            <div key={blog.id} className="blog">
              <Blog blog={blog} />
              <Togglable
                id={`togglable-${Math.floor(Math.random() * 100000)}`}
                buttonLabel="view"
              >
                <div>
                  <div>{blog.url}</div>
                  <div>
                    likes {blog.likes}{' '}
                    <button
                      id="like-click"
                      onClick={() => handleLikeClick(blog)}
                    >
                      like
                    </button>
                  </div>
                  <div>{blog.user.username}</div>
                  {blog.user.username === user.username && (
                    <button
                      id="remove-click"
                      onClick={() => handleDeleteClick(blog)}
                    >
                      remove
                    </button>
                  )}
                </div>
              </Togglable>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default App

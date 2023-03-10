import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogView from './components/BlogView'
import Navbar from './components/Navbar'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import UserList from './components/UserList'
import UserBlogs from './components/UserBlogs'
import { fetchBlogs, updateBlogInStore, deleteBlogFromStore, createBlog} from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from './reducers/loginReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link, Outlet
} from 'react-router-dom'
import users from './services/users'

const App = () => {
  const users = useSelector(state => state.users)

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
  }, [])

  useEffect(() => {
    const sorted = [...blogs].sort((a, b) => b.likes - a.likes)
    setSortedBlogs(sorted)
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  

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
      dispatch(setNotification({ message:`Welcome ${user.username}`, isSuccess: true }))
      setTimeout( async () => {
        dispatch(clearNotification())
      }, 5000)
    } catch (exception) {
      dispatch(setNotification({ message: 'Wrong Credentials', isSuccess: false }))
      setTimeout(() => {
        dispatch(clearNotification())
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
      await dispatch(createBlog(blogObject))
      setNewBlog({
        title: '',
        author: '',
        url: '',
        user: null,
      })
      dispatch(setNotification({ message: `New blog "${blogObject.title}" added!`, isSuccess: true }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
      dispatch(fetchBlogs())
      return blogObject
    } catch (error) {
      dispatch(setNotification({ message: `Error adding blog`, isSuccess: false }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  return (
    
    <Router>
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
      </div>
      {!user && <h2>log in to application</h2>}
      {!user && loginForm()}
      {user && <Navbar user={user} handleLogout={handleLogout}/>}
      
    </div>
      <Routes>
        <Route path='/users' element={<UserList/>} />
        {users && users.map(user => (
          <Route key={user.id} path={`/users/${user.id}`} element={<UserBlogs user={user} />} />
        ))}
        {blogs && blogs.map(blog => (
          <Route key={blog.id} path={`/blogs/${blog.id}`} element={<BlogView blog={blog} user={user} />} />
        ))}
        <Route path='/new-blog' element={ <BlogForm createBlog={addBlog} currUser={user} />}/>
        <Route path='/' element={
        <div>
          
             {user && ( 
        <div>
          <p>
          {user.username} logged in {logoutButton()}
          </p>
         
          {sortedBlogs.map((blog) => (
            <div key={blog.id} className="blog">
              <Blog blog={blog} />
            </div>
            
          ))}
        </div>
      )}
        </div>
        }
        />
      </Routes>
    </Router>
  )
}
export default App

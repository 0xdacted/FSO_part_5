import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const loginForm = () => {
    return (
    <form onSubmit={handleLogin}>
        <div>
          username
          <input type='text' value={username} name='Username' 
          onChange={({ target }) => setUsername(target.value)} 
          />
        </div>
        <div>
          password
          <input type='password' value={password} name='Password'
          onChange={({ target }) => setPassword(target.value)}
          />
          <button type="submit">login</button>
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
    <button onClick={handleLogout}>Log out</button>
    )
  }


  return (
    <div>
      <h2>log in to application</h2>
      {!user && loginForm()}
      
      <h2>blogs</h2>
      {user && <div>
        <p>{user.name} logged in {logoutButton()}</p>      
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    }
    </div>
  )
}

export default App
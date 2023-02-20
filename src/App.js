import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState('')
  const [isNotificationSuccess, setIsNotificationSuccess] = useState('')
  const [blogs, setBlogs] = useState([])
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
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setNotificationMessage(`Welcome ${user.name}!`)
      setIsNotificationSuccess(true);
      setTimeout(() => {
        setNotificationMessage(null);
        setIsNotificationSuccess(false);
      }, 5000);
    } catch (exception) {
      setNotificationMessage('Wrong credentials');
      setIsNotificationSuccess(false);
      setTimeout(() => {
        setNotificationMessage(null);
        setIsNotificationSuccess(false);
      }, 5000)
    }
    console.log('logging in with', username, password);
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

  const addBlog = async (event) => {
    event.preventDefault();
  
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      user: user._id
    };
  
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog({ 
        title: '',
        author: '',
        url: '',
        user: null, 
      })
      setNotificationMessage(`New blog "${returnedBlog.title}" added!`)
      setIsNotificationSuccess(true)
      setTimeout(() => {
        setNotificationMessage(null);
        setIsNotificationSuccess(false);
      }, 5000)
    } catch (error) {
      setNotificationMessage('Error adding blog.')
      setIsNotificationSuccess(false)
      setTimeout(() => {
        setNotificationMessage(null);
        setIsNotificationSuccess(false);
      }, 5000)
    }
  }
  
  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const blogForm = () => {
    return (
    <div>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      <div>title: <input type='text' value={newBlog.title} name='title' onChange={handleBlogChange}/></div>
      <div>author: <input type='text' value={newBlog.author} name='author' onChange={handleBlogChange}/></div>
      <div>url: <input type='text' value={newBlog.url} name='url' onChange={handleBlogChange}/></div>
      <button type="submit">create</button>
    </form>
    </div>
    )
  }

  const Notification = ({ message, isSuccess }) => {
    const className = isSuccess ? 'success' : 'failure'
    return (
      <div className={`notification ${className}`}>
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>log in to application</h2>
      {!user && loginForm()}
      <h2>blogs</h2>

      {user && <div>
        <p>{user.name} logged in {logoutButton()}</p>
        <div>{blogForm()}</div>      
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    }
    </div>
  )
  }
export default App
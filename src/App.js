import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState('')
  const [isNotificationSuccess, setIsNotificationSuccess] = useState('')
  const [blogs, setBlogs] = useState([])
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
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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

  const addBlog = async (blogObject, user) => {
    try {
      blogObject.user = user;
      const returnedBlog = await blogService.create(blogObject);
      returnedBlog.user = user
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog({ 
        title: '',
        author: '',
        url: '',
        user: null,
      });
      setNotificationMessage(`New blog "${returnedBlog.title}" added!`);
      setIsNotificationSuccess(true);
      setTimeout(() => {
        setNotificationMessage(null);
        setIsNotificationSuccess(false);
      }, 5000);
      return returnedBlog;
    } catch (error) {
      setNotificationMessage('Error adding blog.');
      setIsNotificationSuccess(false);
      setTimeout(() => {
        setNotificationMessage(null);
        setIsNotificationSuccess(false);
      }, 5000);
    }
  }

  const handleLikeClick = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    const response = await blogService.update(updatedBlog.id, updatedBlog)
    setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? response : b)))
  }

  const handleDeleteClick = async (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        setNotificationMessage(`Blog "${blog.title}" removed!`);
        setIsNotificationSuccess(true);
        setTimeout(() => {
          setNotificationMessage(null);
          setIsNotificationSuccess(false);
        }, 5000);
      } catch (error) {
        setNotificationMessage('Failed to remove the blog.');
        setIsNotificationSuccess(false);
        setTimeout(() => {
          setNotificationMessage(null);
          setIsNotificationSuccess(false);
        }, 5000);
      }
    }
  }
  

  const Notification = ({ message, isSuccess }) => {
    if (message === null) {
      return null
    }
    const className = isSuccess ? 'success' : 'failure'
    return (
      <div className={`notification ${className}`}>
        {message}
      </div>
    )
  }

  return (
    <div>
      <div>{Notification({ message: notificationMessage, isSuccess: isNotificationSuccess })}</div>
  
      <h2>log in to application</h2>
      {!user && loginForm()}
      <h2>blogs</h2>
      {user && (
        <div>
          <p>
            {user.username} logged in {logoutButton()}
          </p>
          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={addBlog} user={user} />
          </Togglable>
          
          {sortedBlogs.map((blog) => (
           <div key={blog.id}>
           <Blog blog={blog} />
           <Togglable buttonLabel="view">
             <div>
               <div>{blog.url}</div>
               <div>
                 likes {blog.likes} <button onClick = {() => handleLikeClick(blog)}>like</button>
               </div>
               <div>{blog.user.username}</div> 
               {blog.user.username === user.username &&
               <div><button onClick = {() => handleDeleteClick(blog)}>remove</button></div>
               }
             </div>
           </Togglable>
         </div>
          ))}
          
        </div>
      )}
    </div>
  );
  }
export default App
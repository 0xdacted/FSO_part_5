import { Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Blogs</Link></li>
        <li><Link to="/users">Users</Link></li>
        {user ?
          <>
            <li><Link to="/new-blog">New Blog</Link></li>
          </>
          :
          <li><Link to="/login">Login</Link></li>
        }
      </ul>
    </nav>
  );
};

export default Navbar;
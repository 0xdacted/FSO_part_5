const User = ({ user }) => {

  return (
    <div>
        {user.username} has created {user.blogs.length} blog(s)
    </div>
  )
}

export default User
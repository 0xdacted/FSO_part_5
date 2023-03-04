import Comment from './Comment'

const CommentsList = ( {comments} ) => {
  console.log(comments)
  return (
    <div>
    {comments.map(comment => (
     
      <div key={comment.id}>
        <Comment comment={comment} />
      </div>
    ))}
    </div>
  )
}

export default CommentsList
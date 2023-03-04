import Comment from './Comment'

const CommentsList = ( {comments} ) => {
  return (
    <div>
    {comments.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ))}
    </div>
  )
}

export default CommentsList
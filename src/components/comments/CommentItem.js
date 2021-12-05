import classes from "./CommentItem.module.css"

const CommentItem = (props) => {
  console.log(props)
  return (
    <li className={classes.item}>
      <p>{props.text}</p>
    </li>
  )
}

export default CommentItem

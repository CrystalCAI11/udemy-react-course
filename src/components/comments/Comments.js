import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router"

import classes from "./Comments.module.css"
import NewCommentForm from "./NewCommentForm"
import useHttp from "../../hooks/use-http"
import { getAllComments } from "../../lib/api"
import LoadingSpinner from "../UI/LoadingSpinner"
import CommentsList from "../comments/CommentsList"

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false)
  const params = useParams()

  const { quoteId } = params

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments)

  useEffect(() => {
    sendRequest(quoteId)
  }, [quoteId, sendRequest])

  const startAddCommentHandler = () => {
    setIsAddingComment(true)
  }

  const addCommentHandler = useCallback(() => {
    sendRequest(quoteId)
  }, [quoteId, sendRequest])

  let comments

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    )
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No Coments Yet!</p>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm quoteId={quoteId} onAddComment={addCommentHandler} />
      )}
      {comments}
    </section>
  )
}

export default Comments

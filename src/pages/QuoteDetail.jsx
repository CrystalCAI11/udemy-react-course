import { Fragment, useEffect } from "react"
import { useParams, useLocation, Link, Outlet } from "react-router-dom"

import LoadingSpinner from "../components/UI/LoadingSpinner"
import HighlightedQuote from "../components/quotes/HighlightedQuote"
import useHttp from "../hooks/use-http"
import { getSingleQuote } from "../lib/api"

const QuoteDetail = () => {
  const params = useParams()
  const location = useLocation()

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true)

  useEffect(() => {
    sendRequest(params.quoteId)
  }, [params.quoteId, sendRequest])

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <p className="centered">{error}</p>
  }

  if (!loadedQuote.text) {
    return <p className="centered">No quote found!</p>
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      {!location.pathname.includes("comments") && (
        <div className="centered">
          <Link className="btn--flat" to="comments">
            Load Comments
          </Link>
        </div>
      )}
      <Outlet />
    </Fragment>
  )
}

export default QuoteDetail

import { Fragment } from "react"
import { useNavigate, useLocation } from "react-router"

import QuoteItem from "./QuoteItem"
import classes from "./QuoteList.module.css"

const sortQuotes = (quotes, asc) => {
  return quotes.sort((quoteA, quoteB) => {
    if (asc) {
      return quoteA.id > quoteB.id ? 1 : -1
    } else {
      return quoteA.id < quoteB.id ? 1 : -1
    }
  })
}

const QuoteList = (props) => {
  const navigate = useNavigate()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const isSortAsc = queryParams.get("sort") === "asc"

  const sortedQuotes = sortQuotes(props.quotes, isSortAsc)

  const sortingHandler = () => {
    navigate(`${location.pathname}?sort=${isSortAsc ? "desc" : "asc"}`)
  }

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortingHandler}>
          Sort {isSortAsc ? "desc" : "asc"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  )
}

export default QuoteList

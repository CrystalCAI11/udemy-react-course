import { ExpenseItem } from "./ExpenseItem"
import "./ExpensesList.css"

export const ExpensesList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">No expenses found.</h2>
  }

  return (
    <ul className="expenses-list">
      {props.items.map((expense) => (
        <ExpenseItem
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          key={expense.id} // key让react精准render你修改的item，不然全表重新render
        />
      ))}
    </ul>
  )
}

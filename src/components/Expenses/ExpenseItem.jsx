// 这个叫state less component 没有state，只用作展示
import { Card } from "../UI/Card"
import { ExpenseDate } from "./ExpenseDate"
import "./ExpenseItem.css"

export const ExpenseItem = (props) => {
  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2> {props.title} </h2>
          <div className="expense-item__price"> $ {props.amount} </div>
        </div>
      </Card>
    </li>
  )
}

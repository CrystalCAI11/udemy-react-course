import { useState } from "react"
import "./ExpenseForm.css"

export const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("")
  const [enteredAmount, setEnteredAmount] = useState("")
  const [enteredDate, setEnteredDate] = useState("")

  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value)
  }

  const amountChangeHandler = (e) => {
    setEnteredAmount(e.target.value)
  }

  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault() // 阻止点submit的时候页面reload
    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount, // 前面加上+格式就是number了
      date: new Date(enteredDate),
    }
    props.onSaveExpenseData(expenseData) // 执行父组件里的方法
    setEnteredTitle("")
    setEnteredAmount("")
    setEnteredDate("")
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle} // 双向绑定，不加这个value就不好submit之后清空它
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div className="new-expense__actions">
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
        </div>
        <div className="new-expense__actions">
          <button type="submit">Add Expense</button>
        </div>
      </div>
    </form>
  )
}

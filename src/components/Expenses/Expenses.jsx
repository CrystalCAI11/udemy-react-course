import { useState } from "react"
import { Card } from "../UI/Card"
import { ExpensesFilter } from "./ExpensesFilter"
import { ExpensesList } from "./ExpensesList"
import { ExpensesChart } from "./ExpensesChart"
import "./Expenses.css"

export const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020")
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear)
  }
  // filteredExpenses可以直接render，切记component里已经有的数据只改变展示结果时，不需要重新setState()
  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear
  })

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      <ExpensesChart expenses={filteredExpenses} />
      <ExpensesList items={filteredExpenses} />
    </Card>
  )
}

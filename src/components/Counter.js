import { useSelector, useDispatch } from "react-redux"

import classes from "./Counter.module.css"

const Counter = () => {
  const counter = useSelector((state) => state.counter) // 自动获取最新的store
  const show = useSelector((state) => state.showCounter)
  const dispatch = useDispatch()

  const incrementHandler = () => {
    dispatch({ type: "increment" })
  }

  const increaseHandler = () => {
    dispatch({ type: "increase", payload: 5 }) // reducer里的action.payload可以接收payload参数，命名随意但是通常写成payload
  }

  const decrementHandler = () => {
    dispatch({ type: "decrement" })
  }

  const toggleCounterHandler = () => {
    dispatch({ type: "toggle" })
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <button onClick={incrementHandler}>+</button>
      <button onClick={increaseHandler}>+ 5</button>
      <button onClick={decrementHandler}>-</button>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  )
}

export default Counter

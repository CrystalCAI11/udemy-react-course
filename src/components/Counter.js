import { useSelector, useDispatch } from "react-redux"

import classes from "./Counter.module.css"
import { counterActions } from "../store/counter"

const Counter = () => {
  const counter = useSelector((state) => state.counter.counter) // 自动获取最新的store
  const show = useSelector((state) => state.counter.showCounter)
  const dispatch = useDispatch()

  const incrementHandler = () => {
    dispatch(counterActions.increment())
  }

  const increaseHandler = () => {
    dispatch(counterActions.increase(5)) // dispatch({type:"increase",payload:5})
  }

  const decrementHandler = () => {
    dispatch(counterActions.decrement())
  }

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle())
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

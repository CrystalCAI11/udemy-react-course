// 注意：1、type命名不能重复 2、要加...state保留没有被改变的state 3、不能mutate state一定要return new object
// 这些问题用Redux Toolkit都能被自动解决所以我们下一章改用它！

import { createStore } from "redux"

const initialState = { counter: 0, showCounter: true }

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, counter: state.counter + 1 }
    case "increase":
      return { ...state, counter: state.counter + action.payload }
    case "decrement":
      return { ...state, counter: state.counter - 1 }
    case "toggle":
      return { ...state, showCounter: !state.showCounter }
    default:
      return state
  }
}

const store = createStore(counterReducer)

export default store

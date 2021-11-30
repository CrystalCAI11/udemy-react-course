import { createSlice } from "@reduxjs/toolkit"

const initialState = { counter: 0, showCounter: true }

// createSlice reducer会自动return new object，随便你怎么mutate
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.counter++
    },
    increase(state, action) {
      state.counter = state.counter + action.payload
    },
    decrement(state) {
      state.counter--
    },
    toggle(state) {
      state.showCounter = !state.showCounter
    },
  },
})

export const counterActions = counterSlice.actions // createSlice自动创建了actions
// counterSlice.actions.increase() 就是 {type:"increate"}

export default counterSlice.reducer

import { createSlice } from "@reduxjs/toolkit"

import { fetchCartData } from "./cart-actions"

const initialState = { items: [], totalQty: 0 }

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      state.totalQty++
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)
      if (existingItem) {
        existingItem.quantity++
        existingItem.totalPrice = existingItem.totalPrice + newItem.price
      } else {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          title: newItem.title,
          totalPrice: newItem.price,
        })
      }
    },
    removeItemFromCart(state, action) {
      state.totalQty--
      const id = action.payload
      const existingItem = state.items.find((item) => item.id === id)
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id)
      } else {
        existingItem.quantity--
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price
      }
    },
  },
  extraReducers: {
    [fetchCartData.fulfilled]: (state, action) => {
      state.totalQuantity = action.payload.totalQuantity
      state.items = action.payload.items
    },
  },
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer

import { useDispatch, useSelector } from "react-redux"

import classes from "./CartButton.module.css"
import { uiActions } from "../../store/ui-slice"

const CartButton = (props) => {
  const dispatch = useDispatch()
  const cartQty = useSelector((state) => state.cart.totalQty)

  const clickCartHandler = () => {
    dispatch(uiActions.showHideCart())
  }

  return (
    <button onClick={clickCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQty}</span>
    </button>
  )
}

export default CartButton

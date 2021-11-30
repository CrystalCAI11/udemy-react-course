// useReducer用于update的state base on other state，比如这个case里的isValid base on value
import React, { useState, useReducer, useEffect, useContext } from "react"
import Card from "../UI/Card/Card"
import classes from "./Login.module.css"
import Button from "../UI/Button/Button"
import Input from "../UI/Input/Input"
import AuthContext from "../../store/auth-context"

//reducerFn可以放到function component外面
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    // 接收dispatchEmail action
    return { value: action.value, isValid: action.value.includes("@") }
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") } // value state取的是latest state
  }
  return { value: "", isValid: false }
}

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 6 }
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: "", isValid: false }
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false)

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  })

  const authCtx = useContext(AuthContext)

  const { isValid: emailIsValid } = emailState // 把emailState里的isValid解构出来，命名为emailIsValid
  const { isValid: passwordIsValid } = passwordState

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid)
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value }) //dispatchFn()里面的格式一定要全局统一
    setFormIsValid(
      event.target.value.includes("@") && passwordState.value.trim().length > 6
    )
  }

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", value: event.target.value })
    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6)
  }

  const emailBlurHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" })
  }

  const passwordBlurHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    authCtx.onLogin(emailState.value, passwordState.value)
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login

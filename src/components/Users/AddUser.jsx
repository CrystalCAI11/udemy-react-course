import { useState, useRef } from "react"
import { Card } from "../UI/Card"
import { Button } from "../UI/Button"
import { ErrorModal } from "../UI/ErrorModal"
import "./AddUser.css"

export const AddUser = (props) => {
  const nameInputRef = useRef() // 创建一个ref
  const ageInputRef = useRef()

  // const [enteredUsername, setEnteredUsername] = useState("")
  // const [enteredAge, setEnteredAge] = useState("")
  const [error, setError] = useState()

  // const usernameChangeHandler = (e) => {
  //   setEnteredUsername(e.target.value)
  // }
  // const userAgeChangeHandler = (e) => {
  //   setEnteredAge(e.target.value)
  // }

  const addUserHandler = (e) => {
    e.preventDefault()
    const enteredUsername = nameInputRef.current.value // useRef获取current props, 不用setState了
    const enteredAge = ageInputRef.current.value
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({ title: "Invalid input", message: "Input can't be empty" })
      return
    }
    if (+enteredAge < 1) {
      setError({ title: "Invalid age", message: "Age can't be minus" })
      return
    }
    props.onAddUser(enteredUsername, enteredAge)
    // setEnteredUsername("")
    // setEnteredAge("")
    nameInputRef.current.value = "" // 清空ref。数据只读的情况下用useRef比useState好，这个case二者皆可
    ageInputRef.current.value = ""
  }

  const errorHandler = () => {
    setError(null)
  }

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className="input">
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            // onChange={usernameChangeHandler}
            // value={enteredUsername}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            // onChange={userAgeChangeHandler}
            // value={enteredAge}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  )
}

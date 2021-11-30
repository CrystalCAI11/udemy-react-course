import React, { useState } from "react"
import { AddUser } from "./components/Users/AddUser"
import { UsersList } from "./components/Users/UsersList"

function App() {
  const [usersList, setUsersList] = useState([])
  const addUserHandler = (name, age) => {
    setUsersList((prevState) => [
      {
        name: name,
        age: age,
        id: Math.random().toString(),
      },
      ...prevState,
    ])
  }
  return (
    <React.Fragment>
      <AddUser onAddUser={addUserHandler} /> <UsersList users={usersList} />
    </React.Fragment>
  )
}

export default App

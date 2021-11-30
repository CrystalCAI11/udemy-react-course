import React, { useContext } from "react"
import AuthContext from "../../store/auth-context"
import classes from "./Navigation.module.css"

const Navigation = () => {
  const ctx = useContext(AuthContext) // useContext hook引用声明好的AuthContext
  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navigation

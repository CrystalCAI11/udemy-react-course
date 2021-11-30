// 什么时候用context：要把props从一个组件传递n个组件最后才用的情况下context更合适，比如登录状态
import React, { useContext } from "react"
import Login from "./components/Login/Login"
import Home from "./components/Home/Home"
import MainHeader from "./components/MainHeader/MainHeader"
import AuthContext from "./store/auth-context"

function App() {
  const ctx = useContext(AuthContext)
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  )
}

export default App

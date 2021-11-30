import React, { useState, useEffect } from "react"

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
})

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // useEffect在function component里是最后run的
  useEffect(() => {
    // 把这段放到useEffect里，只有[]里的dependency改变他才会run([]为空时只run第一次)，不然每次state改变整个组件重新run重新setIsLoggedIn(true)陷入死循环
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn")
    if (storedIsLoggedIn) {
      setIsLoggedIn(true)
    }
  }, [])
  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", true)
    setIsLoggedIn(true)
  }
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext

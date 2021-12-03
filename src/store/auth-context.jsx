import React, { useState, useEffect, useCallback } from "react"
import jwt from "jsonwebtoken"

let logoutTimer

const AuthContext = React.createContext({
  // 这块只是为了在组件引用context的时候有输入自动联想，不需要的话直接React.createContext()也是一样的
  token: "",
  isLoggedIn: false,
  onLogin: (token, expTime) => {},
  onLogout: () => {},
})

const calculateRemainDuration = (expTime) => {
  const currentTime = new Date().getTime() // timestamp in ms
  const formatedExp = new Date(expTime).getTime()
  const remainDuration = formatedExp - currentTime
  return remainDuration
}

const getLocalToken = () => {
  const localToken = localStorage.getItem("token")
  const localExp = localStorage.getItem("expTime")
  const remainDuration = calculateRemainDuration(localExp)
  if (remainDuration <= 0) {
    localStorage.removeItem("token")
    localStorage.removeItem("expTime")
    localStorage.removeItem("userInfo")
    return null
  }
  return { token: localToken, duration: remainDuration }
}

export const AuthContextProvider = (props) => {
  const tokenInfo = getLocalToken()
  let initialToken
  if (tokenInfo) {
    initialToken = tokenInfo.token
  }
  const [token, setToken] = useState(initialToken)
  const isLoggedIn = !!token // 两次!!把它变成boolean格式

  const loginHandler = (token, expTime) => {
    const userInfo = JSON.stringify(jwt.decode(token))
    localStorage.setItem("token", token)
    localStorage.setItem("expTime", expTime)
    localStorage.setItem("userInfo", userInfo)
    setToken(token)
    const remainDuration = calculateRemainDuration(expTime)
    logoutTimer = setTimeout(logoutHandler, remainDuration) // 自动登出
  }

  const logoutHandler = useCallback(() => {
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("expTime")
    localStorage.removeItem("userInfo")
    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }, [])

  useEffect(() => {
    if (tokenInfo) {
      logoutTimer = setTimeout(logoutHandler, tokenInfo.duration)
    }
  }, [tokenInfo, logoutHandler])

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext

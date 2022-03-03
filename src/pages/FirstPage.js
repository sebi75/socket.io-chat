import React, { useState } from "react"
import Login from "../components/Authentication/Login"
import Signup from "../components/Authentication/Signup"

export const FirstPage = () => {
  const [loadComponent, setLoadComponent] = useState("login")

  const componentLoader = {
    login: <Login setLoadComponent={setLoadComponent} />,
    signup: <Signup setLoadComponent={setLoadComponent} />,
  }

  let content = componentLoader[loadComponent]

  return <Layout>{content}</Layout>
}

const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center gradient-bg dark:bg-gray-700">
      <div className="w-[80%] md:w-[50%] h-[65%] rounded-xl shadow-xl flex justify-center items-center bg-white dark:bg-gray-700">
        {children}
      </div>
    </div>
  )
}

import { useEffect, useContext, useState } from "react"
import { GlobalState } from "./context/Context"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { PrivateRoute } from "./components/PrivateRoute"
import useDarkMode from "./hooks/useDarkMode"

//import pages
import { FirstPage } from "./pages"
import Loader from "./components/Loader/Loader"
import { Chat } from "./pages"
import { SocketContext } from "./context/SocketContext/SocketContext"

//todo: clear state when users signOut

const App = () => {
  const { getAuthStateHandler, user, usersData, getUsersDataHandler } =
    useContext(GlobalState)
  const { socket } = useContext(SocketContext)
  const [isLoading, setIsLoading] = useState(false)
  const [darkTheme, setDarkTheme] = useDarkMode()

  useEffect(() => {
    if (user === null) {
      getAuthStateHandler(setIsLoading)
    }

    if (usersData === null && user !== null) {
      getUsersDataHandler()
    }
  }, [user, usersData])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<FirstPage />} />

            <Route path={"/chat"} element={<PrivateRoute component={Chat} />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}

export default App

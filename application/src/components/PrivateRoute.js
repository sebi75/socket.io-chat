import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { GlobalState } from "../context/Context"

export const PrivateRoute = ({ component: RouteComponent }) => {
  const { user } = useContext(GlobalState)

  if (user) {
    return <RouteComponent />
  } else {
    return <Navigate replace to={"/"} />
  }
}

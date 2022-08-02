import { auth } from "../firebase"

export const signOut = (setUser) => {
  auth
    .signOut()
    .then(() => {
      setUser(null)
    })
    .catch((error) => {
      console.log("Couldn't sign out")
    })
}

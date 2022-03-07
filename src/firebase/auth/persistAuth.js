import { auth } from "../firebase"

export const getAuthState = (setUser, setIsLoading) => {
  setIsLoading(true)
  auth.onAuthStateChanged((user) => {
    if (user) {
      if (!user.displayName) {
        const nameToDisplay = extractDisplayName(user.email)

        const finalUser = {
          displayName: nameToDisplay,
          email: user.email,
          photoURL: user.photoURL,
          id: user.uid,
        }

        setUser(finalUser)
        setIsLoading(false)
      } else {
        const finalUser = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          id: user.uid,
        }

        setUser(finalUser)
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  })
}

const extractDisplayName = (email) => {
  const aroundIndex = email.indexOf("@")

  const displayName = email.substring(0, aroundIndex)

  return displayName
}

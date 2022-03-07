import { auth } from "../firebase"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"

import { createUser } from "../"

export const createAccountWithEmail = async (
  email,
  password,
  setUser,
  setError,
  setIsLoading
) => {
  setIsLoading(true)
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user

      const displayName = extractDisplayName(user.email)

      const finalUser = {
        displayName: displayName,
        email: user.email,
        photoURL: user.photoURL,
        id: user.uid,
      }

      createUser(user.uid, displayName)

      setUser(finalUser)
      setIsLoading(false)
    })
    .catch((error) => {
      setError("Password or email invalid")
      setIsLoading(false)
    })
}

export const signWithEmail = async (
  email,
  password,
  setUser,
  setError,
  setIsLoading
) => {
  setIsLoading(true)
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user

      const displayName = extractDisplayName(user.email)

      const finalUser = {
        displayName: displayName,
        email: user.email,
        photoURL: user.photoURL,
        id: user.uid,
      }

      setUser(finalUser)
      setIsLoading(false)
    })

    .catch((error) => {
      console.log(error.message)
      setError("Password or email invalid")
      setIsLoading(false)
    })
}

const extractDisplayName = (email) => {
  const aroundIndex = email.indexOf("@")

  const displayName = email.substring(0, aroundIndex)

  return displayName
}

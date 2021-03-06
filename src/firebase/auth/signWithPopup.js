import { auth } from "../firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { provider } from "./auth"

import { createUser } from "../"

import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"

export const signUpWithPopup = async (setUser) => {
  await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken

      if (token) {
        localStorage.setItem("token", token)
      }

      const user = {
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        id: result.user.uid,
        authToken: token,
      }

      createUser(user.id, user.displayName)

      setUser(user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message

      const email = error.email

      const credential = GoogleAuthProvider.credentialFromError(error)
    })
}

export const signInWithGooglePopup = async (setUser) => {
  await signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = {
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        id: result.user.uid,
      }

      //check if the user that connects has the prerequisites
      const docRef = doc(db, "users", user.id)
      const getUserDoc = await getDoc(docRef)

      if (!getUserDoc.exists()) {
        createUser(user.id, user.displayName)
      }

      setUser(user)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message

      const email = error.email

      const credential = GoogleAuthProvider.credentialFromError(error)
    })
}

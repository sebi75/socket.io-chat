import { db } from "../firebase"

import { doc, getDoc, setDoc } from "firebase/firestore"

export const getUserData = async (uid, addUsersData, setIsLoading) => {
  setIsLoading(true)
  const docRef = doc(db, "users", uid)

  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const docData = docSnap.data()

    addUsersData(docData)
    setIsLoading(false)
  }
}

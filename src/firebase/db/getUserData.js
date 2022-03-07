import { db } from "../firebase"

import { doc, getDoc } from "firebase/firestore"

const defaultData = {
  friends: [],
  friendRequests: [],
  sentRequests: [],
  usersUnique: null,
}

export const getUserData = async (uid, addUsersData, setIsLoading) => {
  setIsLoading(true)
  const docRef = doc(db, "users", uid)

  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const docData = docSnap.data()

    addUsersData(docData)
    setIsLoading(false)
  } else {
    addUsersData(defaultData)
    setIsLoading(false)
  }
}

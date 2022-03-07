import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore"

import { db } from "../firebase"

export const saveMessage = async (channelID, message) => {
  const docRef = doc(db, "chats", channelID)

  console.log("funtion")
  console.log(message)
  console.log(channelID)

  try {
    const saveMessages = await updateDoc(docRef, {
      messages: arrayUnion(message),
    })
  } catch (error) {
    console.log(error)
  }
}

import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"

import { db } from "../firebase"

export const saveConversation = async (channelID, messages) => {
  const docRef = doc(db, "chats", channelID)

  console.log("entered here")

  console.log(messages)

  try {
    const saveMessages = await updateDoc(docRef, {
      messages: messages,
    })
  } catch (error) {
    console.log(error)
  }
}

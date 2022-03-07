import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"

import { db } from "../firebase"

export const loadMessages = async (channelID, setIsLoading, setMessages) => {
  setIsLoading(true)

  const docRef = doc(db, "chats", channelID)

  try {
    const docSnapshot = await getDoc(docRef)

    const docData = docSnapshot.data() //messages[]

    setMessages(docData.messages)

    setIsLoading(false)
  } catch (error) {
    console.log("error in getting the document")

    setIsLoading(false)
  }
}

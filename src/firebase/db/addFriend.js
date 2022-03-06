import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore"

import { db } from "../firebase"

export const addFriend = async (
  usersUnique,
  currentUser,
  setIsModalOpen,
  setIsLoading
) => {
  setIsLoading(true)

  const docRef = doc(db, "usersUniques", usersUnique)

  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const docData = docSnap.data() //contains users uid

    const targetedUserdocSnap = await getDoc(doc(db, "users", docData.uid))
    const data = targetedUserdocSnap.data()

    //need to add request to usersUnique user sent

    const targetUserRef = doc(db, "users", docData.uid) //the user targeted
    const usersDocRef = doc(db, "users", currentUser.id) //the user sending the request

    const userDataRequest = {
      uid: currentUser.id,
      photoUrl: currentUser.photoURL !== null ? currentUser.photoURL : null,
      displayName: currentUser.displayName,
      timestamp: new Date(),
    }

    const targetUsersData = {
      displayName: data.displayName,
      uid: docData.uid,
      timestamp: new Date(),
    }

    try {
      const updateRequesterSentRequests = await updateDoc(usersDocRef, {
        sentRequests: arrayUnion(targetUsersData),
      })
    } catch (error) {
      console.log(error)
    }

    try {
      const updateTargetUserFriendListRequests = await updateDoc(
        targetUserRef,
        {
          friendRequests: arrayUnion(userDataRequest),
        }
      )

      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  } else {
    setIsModalOpen({
      isOpen: true,
      header: "User non existent",
      message: "User with that id doesn't exist. Check that again!",
    })
    setIsLoading(false)
  }
}

/* 



*/

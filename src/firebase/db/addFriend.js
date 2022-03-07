import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore"

import { db } from "../firebase"

export const addFriend = async (
  usersUnique,
  currentUser,
  setIsModalOpen,
  setIsLoading
) => {
  setIsLoading(true)
  let targetIndex

  const docRef = doc(db, "usersUniques", usersUnique)

  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const docData = docSnap.data() //contains users uid
    targetIndex = docData.uid

    const targetedUserdocSnap = await getDoc(doc(db, "users", docData.uid))
    const data = targetedUserdocSnap.data()

    //ref to the currents user document
    const usersDocRef = doc(db, "users", currentUser.id) //the user sending the request

    //check if there isn't already request sent or in friends
    try {
      const usersDocSnapshot = await getDoc(usersDocRef)
      const usersDocData = usersDocSnapshot.data()

      const checkFriends = usersDocData.friends.find(
        (friend) => friend.uid === targetIndex
      )

      console.log("checkFriends", checkFriends)

      const checkSentRequests = usersDocData.sentRequests.find(
        (request) => request.uid === targetIndex
      )

      console.log("checkSentRequests", checkSentRequests)

      let condition = checkFriends == null && checkSentRequests == null

      if (!condition) {
        setIsModalOpen({
          isOpen: true,
          header: "Already friend",
          message: "User with that id is already in your friends list!",
        })
        setIsLoading(false)
      } else {
        const targetUserRef = doc(db, "users", docData.uid) //the user targeted

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
      }
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

import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"

import { db } from "../firebase"

export const removeFriend = async (uid, friendUid) => {
  const friendDocRef = doc(db, "users", friendUid)
  const userDocRef = doc(db, "users", uid)

  //get docs
  const getFriendDoc = await getDoc(friendDocRef)
  const friendDocData = getFriendDoc.data()

  /* const channelID = friendDocData.friends.find(
    (friend) => friend.uid === uid
  ).channelID

  const channelIDDocRef = doc(db, "chats", channelID)

  //clean their conversation
  try {
    const deleteChannel = await deleteDoc(channelIDDocRef)
  } catch (error) {
    console.log("error in deleting the channelID")
  } */

  const friendDocFilteredFriends = friendDocData.friends.filter(
    (friend) => friend.uid !== uid
  )

  const getUsersDoc = await getDoc(userDocRef)
  const usersDocData = getUsersDoc.data()

  const usersDocFilteredFriends = usersDocData.friends.filter(
    (friend) => friend.uid !== friendUid
  )

  //remove from friends friend list
  try {
    const updateFriendsDoc = await updateDoc(friendDocRef, {
      friends: friendDocFilteredFriends,
    })

    const updateUsersDoc = await updateDoc(userDocRef, {
      friends: usersDocFilteredFriends,
    })
  } catch (error) {
    console.log(error)
  }

  //remove from the users own list of friends
}

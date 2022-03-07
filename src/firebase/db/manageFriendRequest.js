import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"

import { db } from "../firebase"

export const acceptFriendRequest = async (currentUid, uid) => {
  const currentUserDocRef = doc(db, "users", currentUid)

  //handle the user that received the friend request:
  const generateChannel = generateRandomChannelId()

  try {
    const currentUserDoc = await getDoc(currentUserDocRef)
    const currentUserDocData = currentUserDoc.data()

    const allRequests = currentUserDocData.friendRequests

    //save the friend request in friends list:
    let newFriend = allRequests.find((request) => request.uid === uid)
    newFriend.channelID = generateChannel

    //filter the requests to exclude only the accepted request
    const filteredRequests = allRequests.filter(
      (request) => request.uid !== uid
    )

    //update the doc with new data:
    const updateDocInit = await updateDoc(currentUserDocRef, {
      friendRequests: filteredRequests,
      friends: arrayUnion(newFriend),
    })
  } catch (error) {
    console.log("error in handling the receiver logic")
    console.log(error)
  }

  //handle the user that sent the friend request
  try {
    const senderUserDocRef = doc(db, "users", uid)

    const senderUserDoc = await getDoc(senderUserDocRef)
    const senderUserDocData = senderUserDoc.data()

    const allSentRequests = senderUserDocData.sentRequests
    //filter the requests sent
    const filteredSentRequests = allSentRequests.filter(
      (request) => request.uid !== currentUid
    )

    //create the new friend
    const newFriend2 = allSentRequests.find(
      (request) => request.uid === currentUid
    )
    newFriend2.channelID = generateChannel

    //update the doc with new data:
    const updateDocInit2 = await updateDoc(senderUserDocRef, {
      sentRequests: filteredSentRequests,
      friends: arrayUnion(newFriend2),
    })
  } catch (error) {
    console.log("error in handling the sender logic")
    console.log(error)
  }

  //create chat with the generated channelID:
  try {
    const chatChannelRef = doc(db, "chats", generateChannel)
    const createChatChannel = setDoc(chatChannelRef, {
      botMessage: "Helo chats",
    })
  } catch (error) {
    console.log(error)
  }
}

const generateRandomChannelId = () => {
  return Math.random().toString(36).slice(2, 11)
}

export const denyFriendRequest = async (currentUid, uid) => {
  const currentUserDocRef = doc(db, "users", currentUid)

  //handle the user that received the friend request:
  try {
    const currentUserDoc = await getDoc(currentUserDocRef)
    const currentUserDocData = currentUserDoc.data()

    const allRequests = currentUserDocData.friendRequests

    //filter the requests to exclude only the accepted request
    const filteredRequests = allRequests.filter(
      (request) => request.uid !== uid
    )

    //update the doc with new data:
    const updateDocInit = await updateDoc(currentUserDocRef, {
      friendRequests: filteredRequests,
    })
  } catch (error) {
    console.log("error in handling the receiver logic")
    console.log(error)
  }

  //handle the user that sent the friend request
  try {
    const senderUserDocRef = doc(db, "users", uid)

    const senderUserDoc = await getDoc(senderUserDocRef)
    const senderUserDocData = senderUserDoc.data()

    const allSentRequests = senderUserDocData.sentRequests
    //filter the requests sent
    const filteredSentRequests = allSentRequests.filter(
      (request) => request.uid !== currentUid
    )

    //update the doc with new data:
    const updateDocInit2 = await updateDoc(senderUserDocRef, {
      sentRequests: filteredSentRequests,
    })
  } catch (error) {
    console.log("error in handling the sender logic")
    console.log(error)
  }
}

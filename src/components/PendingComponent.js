import React, { useContext, useEffect } from "react"
import Men from "../assets/men.svg"
import { GlobalState } from "../context/Context"
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"
import {
  acceptFriendRequest,
  denyFriendRequest,
} from "../firebase/db/manageFriendRequest"

const PendingComponent = () => {
  const { usersData, user } = useContext(GlobalState)

  return (
    <MainLayout>
      {usersData.friendRequests < 1 ? (
        <p className="dark:text-white text-gray-700 font-bold text-xl">
          No pending requests
        </p>
      ) : (
        <div className="w-full flex flex-col items-center">
          <h1 className="font-bold text-xl text-gray-700 dark:text-white mt-[1rem]">
            Pending friend requests:
          </h1>
          {usersData.friendRequests.map((friendRequest) => {
            const { displayName, timestamp, photoURL, uid } = friendRequest
            let date = timestamp.toDate().toLocaleString()
            return (
              <FriendRequestComponent
                key={uid}
                uid={uid}
                currentUid={user.id}
                timestamp={date}
                displayName={displayName}
                photoURL={photoURL}
                friendRequest={friendRequest}
              />
            )
          })}
        </div>
      )}
    </MainLayout>
  )
}

const FriendRequestComponent = ({
  friendRequest,
  displayName,
  timestamp,
  currentUid,
  uid,
}) => {
  return (
    <Layout>
      <MessageContentLayout>
        <img src={Men} alt="" className="w-[5rem]" />
        <div className="flex items-center">
          <NameComponent name={displayName} />
          <DateComponent timestamp={timestamp} />
        </div>
        <div className="flex items-center"></div>
      </MessageContentLayout>

      <HandleRequestsButton
        uid={uid}
        currentUid={currentUid}
        friendRequest={friendRequest}
      />
    </Layout>
  )
}

const HandleRequestsButton = ({ uid, currentUid, friendRequest }) => {
  const { acceptFriendRequestState, denyFriendRequestState } =
    useContext(GlobalState)

  const handleAcceptRequest = () => {
    const randomGeneratedChannelID = generateRandomChannelId()

    friendRequest.channelID = randomGeneratedChannelID

    acceptFriendRequest(currentUid, uid, randomGeneratedChannelID)
    acceptFriendRequestState(uid, friendRequest)
  }

  const denyRequest = () => {
    denyFriendRequest(currentUid, uid)
    denyFriendRequestState(uid, friendRequest)
  }

  return (
    <div className="dark:text-white">
      <button
        className="btn btn-outline btn-error dark:bg-gray-600"
        onClick={denyRequest}
      >
        <AiOutlineClose size={25} />
      </button>

      <button
        className="btn btn-accent dark:bg-gray-600 ml-[0.7rem]"
        onClick={handleAcceptRequest}
      >
        <AiOutlineCheck size={25} />
      </button>
    </div>
  )
}

const MessageContentLayout = ({ children }) => {
  return <div className="flex justify-between">{children}</div>
}

const NameComponent = ({ name }) => {
  return <h1 className="dark:text-white text-gray-700 text-[1.2rem]">{name}</h1>
}
const DateComponent = ({ timestamp }) => {
  return <p className="ml-[0.5rem] text-gray-500">{timestamp}</p>
}

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center w-[90%] h-[10rem] lg:h-[5rem] p-[0.5rem] my-[0.8rem] rounded-lg shadow-lg duration-150 hover:bg-gray-300 dark:hover:bg-gray-800 dark:bg-gray-700 justify-between cursor-pointer">
      {children}
    </div>
  )
}

const MainLayout = ({ children }) => {
  return (
    <div className="flex justify-center w-[100%] md:w-[70%] lg:w-[75%] h-full">
      {children}
    </div>
  )
}

const generateRandomChannelId = () => {
  return Math.random().toString(36).slice(2, 11)
}

export default PendingComponent

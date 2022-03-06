import React, { useContext } from "react"
import Men from "../assets/men.svg"
import { GlobalState } from "../context/Context"
import { AiOutlineCheck } from "react-icons/ai"
import { acceptFriendRequest } from "../firebase/db/manageFriendRequest"

const PendingComponent = () => {
  const { usersData, user } = useContext(GlobalState)

  console.log(usersData)
  return (
    <MainLayout>
      {usersData.friendRequests < 1 ? (
        <p className="dark:text-white text-gray-700 font-bold text-xl">
          No pending requests
        </p>
      ) : (
        <>
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
        </>
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
      <img src={Men} alt="" className="w-[5rem]" />

      <MessageContentLayout>
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
  const { acceptFriendRequestState } = useContext(GlobalState)

  const handleAcceptRequest = () => {
    acceptFriendRequest(currentUid, uid)
    acceptFriendRequestState(uid, friendRequest)
  }

  return (
    <div className="dark:text-white">
      <button
        className="btn btn-accent dark:bg-gray-600"
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
  return <h1 className="dark:text-white text-[1.2rem]">{name}</h1>
}
const DateComponent = ({ timestamp }) => {
  return <p className="ml-[0.5rem] text-gray-500">{timestamp}</p>
}

const Layout = ({ children }) => {
  return (
    <div className="flex items-center w-[90%] h-[7rem] md:h-[5rem] p-[0.5rem] my-[0.8rem] rounded-lg shadow-lg duration-150 hover:bg-gray-300 dark:hover:bg-gray-800 dark:bg-gray-700">
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
export default PendingComponent

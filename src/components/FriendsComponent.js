import React, { useContext, useEffect } from "react"
import Men from "../assets/men.svg"
import { GlobalState } from "../context/Context"
import { AiOutlineClose } from "react-icons/ai"

const FriendsComponent = () => {
  const { usersData, user } = useContext(GlobalState)
  return (
    <MainLayout>
      {usersData.friends.length < 1 ? (
        <p className="dark:text-white text-gray-700 font-bold text-xl w-[80%] flex justify-center">
          You don't have any friends in your list currently
        </p>
      ) : (
        <div className="w-full flex flex-col items-center">
          <h1 className="font-bold text-xl text-gray-700 dark:text-white mt-[1rem]">
            All your added friends:
          </h1>
          {usersData.friends.map((friend) => {
            const { displayName, photoURL, uid } = friend
            return (
              <FriendRequestComponent
                key={uid}
                uid={uid}
                currentUid={user.id}
                displayName={displayName}
                photoURL={photoURL}
              />
            )
          })}
        </div>
      )}
    </MainLayout>
  )
}

const FriendRequestComponent = ({
  displayName,
  timestamp,
  currentUid,
  uid,
}) => {
  return (
    <Layout>
      <MessageContentLayout>
        <img src={Men} alt="avatar" className="w-[5rem]" />
        <div className="flex items-center">
          <NameComponent name={displayName} />
          <DateComponent timestamp={timestamp} />
        </div>
      </MessageContentLayout>
      <HandleRequestsButton
        uid={uid}
        currentUid={currentUid}
        displayName={displayName}
      />
    </Layout>
  )
}

const HandleRequestsButton = ({
  uid,
  currentUid,
  friendRequest,
  displayName,
}) => {
  const { setIsModalOpen, isModalOpen } = useContext(GlobalState)

  const handleRemoveFriend = () => {
    setIsModalOpen({
      isOpen: true,
      header: `Remove ${displayName} ?`,
      message: "This action cannot be undone",
      hasButton: true,
      friendToRemoveId: uid,
    })
  }

  return (
    <div className="dark:text-white">
      <button
        className="btn btn-outline btn-error dark:bg-gray-600"
        onClick={handleRemoveFriend}
      >
        <AiOutlineClose size={25} />
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
    <div className="flex items-center w-[90%] h-[7rem] md:h-[5rem] p-[0.5rem] my-[0.8rem] rounded-lg shadow-lg dark:hover:bg-gray-800 dark:bg-gray-700 duration-150 hover:bg-gray-300 justify-between cursor-pointer">
      {children}
    </div>
  )
}

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col items-center w-[100%] md:w-[70%] lg:w-[75%] h-full">
      {children}
    </div>
  )
}

export default FriendsComponent

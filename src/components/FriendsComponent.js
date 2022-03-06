import React, { useContext } from "react"
import Men from "../assets/men.svg"
import { GlobalState } from "../context/Context"

const FriendsComponent = () => {
  const { usersData, user } = useContext(GlobalState)

  console.log(usersData)
  return (
    <MainLayout>
      {usersData.friends.length < 1 ? (
        <p className="dark:text-white text-gray-700 font-bold text-xl">
          You don't have any friends in your list currently
        </p>
      ) : (
        <>
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
        </>
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
        <img src={Men} alt="" className="w-[5rem]" />
        <div className="flex items-center">
          <NameComponent name={displayName} />
          <DateComponent timestamp={timestamp} />
        </div>
      </MessageContentLayout>
      {/* <HandleRequestsButton uid={uid} currentUid={currentUid} /> */}
    </Layout>
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

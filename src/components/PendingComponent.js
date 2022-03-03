import React, { useContext } from "react"
import Men from "../assets/men.svg"
import { GlobalState } from "../context/Context"

const PendingComponent = ({ message, timestamp, displayName }) => {
  const { usersData } = useContext(GlobalState)

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
                displayName={displayName}
                timestamp={date}
                photoURL={photoURL}
              />
            )
          })}
        </>
      )}
    </MainLayout>
  )
}

const FriendRequestComponent = ({ displayName, timestamp, photoURL }) => {
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
    <div className="flex items-center w-[90%] h-[7rem] md:h-[5rem] p-[0.5rem] my-[0.8rem] rounded-lg shadow-lg duration-150 hover:bg-gray-300 dark:hover:bg-gray-800 dark:bg-gray-700 duration-150 ">
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

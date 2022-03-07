import React, { useContext } from "react"
import Men from "../../assets/men.svg"
import { GlobalState } from "../../context/Context"

import {
  MessageContentLayout,
  NameComponent,
  DateComponent,
  Layout,
  MainLayout,
} from "./Layouts"

import HandleRequestsButton from "./HandleRequestButton"

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
        <div className="flex">
          <img src={Men} alt="" className="w-[5rem] max-w-[3.5rem]" />
          <div className="flex items-center ml-[0.7rem]">
            <NameComponent name={displayName} />
            <DateComponent timestamp={timestamp} />
          </div>
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

export default PendingComponent

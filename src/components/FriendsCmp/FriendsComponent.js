import React, { useContext } from "react"
import Men from "../../assets/men.svg"
import { GlobalState } from "../../context/Context"

/* Styled componetns import */
import {
  MessageContentLayout,
  NameComponent,
  DateComponent,
  Layout,
  MainLayout,
} from "./Layouts"

import HandleRequestsButton from "./HandleRequestsButton"

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
        <img src={Men} alt="avatar" className="w-[5rem] max-w-[4rem]" />
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

export default FriendsComponent

import React, { useContext } from "react"
import Men from "../../assets/men.svg"
import Wilderness from "../../assets/wilderness.svg"

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
        <img
          src={Wilderness}
          alt="wilderness"
          className="w-[80%] lg:w-[50%] mt-[25%]"
        />
      ) : (
        <div className="w-full flex flex-col items-center">
          <h1 className="font-bold text-xl text-gray-700 dark:text-white mt-[1rem]">
            All your added friends:
          </h1>
          {usersData.friends.map((friend) => {
            const { displayName, photoUrl, uid } = friend
            return (
              <FriendRequestComponent
                key={uid}
                uid={uid}
                currentUid={user.id}
                displayName={displayName}
                photoUrl={photoUrl}
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
  photoUrl,
  uid,
}) => {
  let loadPhoto = photoUrl == null ? Men : photoUrl
  return (
    <Layout>
      <MessageContentLayout>
        <img src={loadPhoto} alt="avatar" className="w-[5rem] max-w-[4rem]" />
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

import React from "react"

import Friend from "./Friend"

import { ChatsLayout } from "../Layouts"

export const Chats = ({ data }) => {
  return (
    <ChatsLayout>
      {data.map((object) => {
        return (
          <Friend
            key={Math.random().toString(36)}
            name={object.displayName}
            photoURL={object.photoUrl}
            currentChannelID={object.channelID}
          />
        )
      })}
    </ChatsLayout>
  )
}

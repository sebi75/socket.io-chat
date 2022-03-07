import React from "react"
import Men from "../../../assets/men.svg"

import {
  MessageContentLayout,
  NameComponent,
  DateComponent,
  Layout,
} from "../Layouts"

const ChatMessage = ({ message, timestamp, displayName, photoURL }) => {
  let loadImage = photoURL == null ? Men : photoURL

  return (
    <Layout>
      <img src={loadImage} alt="avatar" className="w-[3.5rem] mr-[1rem]" />

      <MessageContentLayout>
        <div className="flex items-center">
          <NameComponent name={displayName} />
          <DateComponent timestamp={timestamp} />
        </div>
        <p className="dark:text-white text-gray-700">{message}</p>
      </MessageContentLayout>
    </Layout>
  )
}

export default ChatMessage

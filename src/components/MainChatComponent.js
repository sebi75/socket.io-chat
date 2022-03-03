import React, { useState, useContext } from "react"
import InputEmoji from "react-input-emoji"

import { GlobalState } from "../context/Context"
import ChatMessage from "./Chat/ChatMessage"

export const MainChatComponent = () => {
  const { user } = useContext(GlobalState)
  return (
    <Layout>
      {/* <div>
          <p>hello {user.displayName}</p>
          <p>photoURL: {user.photoURL}</p>
          <p>uid: {user.id}</p>
        </div> */}
      <MessagesDisplayLayout>
        {chatMessages.map((messageContent) => {
          const { message, timestamp, displayName } = messageContent
          return (
            <ChatMessage
              key={Math.random().toString(36)}
              displayName={displayName}
              timestamp={timestamp}
              message={message}
            />
          )
        })}
      </MessagesDisplayLayout>

      {/* Input messages component */}

      <FooterInputComponent />
    </Layout>
  )
}

const FooterInputComponent = () => {
  const [text, setText] = useState("")

  const handleOnEnter = () => {
    console.log("send message")
    console.log(text)
  }
  return (
    <div className="flex justify-center items-center h-[15%]">
      <InputEmoji
        value={text}
        height={65}
        onChange={setText}
        cleanOnEnter
        onEnter={handleOnEnter}
        placeholder="Type a message"
      />
    </div>
  )
}

const MessagesDisplayLayout = ({ children }) => {
  return <div className="w-full h-[85%]">{children}</div>
}

const Layout = ({ children }) => {
  return <div className="w-[100%] md:w-[70%] lg:w-[75%] h-full">{children}</div>
}

const chatMessages = [
  {
    displayName: "Sebastian",
    message: "Hello violeta",
    timestamp: "Today 13:40",
  },
  {
    displayName: "Violeta",
    message: "Heyy",
    timestamp: "Today 13:40",
  },
  {
    displayName: "Violeta",
    message: "How are you?",
    timestamp: "Today 13:40",
  },
  {
    displayName: "Sebastian",
    message: "I'm fine, just chilling watching some netflix",
    timestamp: "Today 13:40",
  },
  {
    displayName: "Violeta",
    message: "Are you down going out?",
    timestamp: "Today 13:40",
  },
]

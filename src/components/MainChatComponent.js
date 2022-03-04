import React, { useState, useContext, useEffect } from "react"
import InputEmoji from "react-input-emoji"

import { GlobalState } from "../context/Context"
import { SocketContext } from "../context/SocketContext/SocketContext"
import ChatMessage from "./Chat/ChatMessage"

export const MainChatComponent = ({ channelID }) => {
  const { user } = useContext(GlobalState)
  const { socket } = useContext(SocketContext)

  console.log(channelID)

  const [messages, setMessages] = useState([])

  const [text, setText] = useState("")

  const sendMessage = () => {
    const messageData = {
      displayName: user.displayName,
      channelID: channelID,
      uid: user.uid,
      message: text,
      photoURL: user.photoURL,
      timestamp:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    }

    socket.emit("send_message", messageData)
  }

  useEffect(() => {
    socket.on("users", (users) => {
      users.forEach((user) => {
        console.log(user)
      })
    })
    return () => {}
  }, [socket])

  return (
    <Layout>
      <Header />
      <MessagesDisplayLayout>
        {messages.map((messageContent) => {
          const { message, timestamp, displayName, photoURL } = messageContent
          return (
            <ChatMessage
              key={Math.random().toString(36)}
              displayName={displayName}
              timestamp={timestamp}
              message={message}
              photoURL={photoURL}
            />
          )
        })}
      </MessagesDisplayLayout>

      {/* Input messages component */}

      <FooterInputComponent
        setText={setText}
        text={text}
        sendMessage={sendMessage}
      />
    </Layout>
  )
}

const Header = () => {
  const { chatData } = useContext(GlobalState)

  return (
    <div className="w-full bg-gray-400 h-[5%] shadow-lg flex items-center">
      <h1 className="dark:text-white text-gray-700 text-2xl font-bold ml-[2rem]">
        {chatData.displayName}
      </h1>
    </div>
  )
}

const FooterInputComponent = ({ setText, text, sendMessage }) => {
  const handleOnEnter = () => {
    sendMessage()
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
  return <div className="w-full h-[80%]">{children}</div>
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

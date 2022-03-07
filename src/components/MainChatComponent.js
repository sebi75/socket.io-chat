import React, { useState, useContext, useEffect } from "react"
import InputEmoji from "react-input-emoji"

import ScrollToBottom from "react-scroll-to-bottom"
import { GlobalState } from "../context/Context"
import { SocketContext } from "../context/SocketContext/SocketContext"
import ChatMessage from "./Chat/ChatMessage"
import io from "socket.io-client"

const SERVER = "http://localhost:8080"
let socket

export const MainChatComponent = () => {
  const { user } = useContext(GlobalState)
  const [text, setText] = useState("")
  const { messages, setMessages, channelID } = useContext(SocketContext)

  useEffect(() => {
    socket = io.connect(SERVER)

    socket.emit("join_room", { channelID })

    socket.on("receive_message", (message) => {
      console.log(message)
      if (message.channelID === channelID) {
        setMessages((curr) => [...curr, message])
      }
    })

    return () => {
      socket.disconnect()
      socket.off()
    }
  }, [SERVER, channelID])

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

    if (messageData.message !== "") {
      socket.emit("send_message", messageData)
    }
  }

  return (
    <Layout>
      <Header />

      <ScrollToBottom className="w-full h-[80%]">
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
      </ScrollToBottom>

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
    <div className="w-full h-[5%] shadow-xl flex items-center">
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

const Layout = ({ children }) => {
  return <div className="w-[100%] md:w-[70%] lg:w-[75%] h-full">{children}</div>
}

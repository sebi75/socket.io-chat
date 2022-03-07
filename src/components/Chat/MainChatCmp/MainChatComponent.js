import React, { useState, useContext, useEffect } from "react"

import { saveMessage } from "../../../firebase/db/saveConversation"
import { loadMessages } from "../../../firebase/db/loadMessages"

import ScrollToBottom from "react-scroll-to-bottom"
import { GlobalState } from "../../../context/Context"
import { SocketContext } from "../../../context/SocketContext/SocketContext"
import ChatMessage from "./ChatMessage"
import io from "socket.io-client"

import Header from "./Header"
import FooterInputComponent from "./FooterInput"

import Loader from "../../Loader/Loader"

const SERVER = "https://realtime-chatify.herokuapp.com"
let socket

export const MainChatComponent = () => {
  const { user } = useContext(GlobalState)
  const [text, setText] = useState("")
  const { messages, setMessages, channelID } = useContext(SocketContext)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    socket = io.connect(SERVER)

    socket.emit("join_room", { channelID })

    socket.on("receive_message", (message) => {
      if (message.channelID === channelID) {
        setMessages((curr) => [...curr, message])
      }
    })

    return () => {
      socket.disconnect()
      socket.off()
    }
  }, [SERVER, channelID])

  useEffect(() => {
    loadMessages(channelID, setIsLoading, setMessages)
  }, [channelID])

  const sendMessage = () => {
    const messageData = {
      displayName: user.displayName,
      channelID: channelID,
      message: text,
      photoURL: user.photoURL,
      timestamp:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    }

    if (messageData.message !== "") {
      socket.emit("send_message", messageData)

      let messageToBeSaved = {
        displayName: user.displayName,
        uid: user.id,
        message: text,
        photoURL: user.photoURL,
        timestamp:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      }

      saveMessage(channelID, messageToBeSaved)
    }
  }

  return (
    <Layout>
      <Header />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ScrollToBottom className="w-full h-[80%]">
            {messages.map((messageContent) => {
              const { message, timestamp, displayName, photoURL } =
                messageContent
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
        </>
      )}
    </Layout>
  )
}

const Layout = ({ children }) => {
  return <div className="w-[100%] md:w-[70%] lg:w-[75%] h-full">{children}</div>
}

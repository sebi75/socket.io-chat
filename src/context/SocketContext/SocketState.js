import { SocketContext } from "./SocketContext"
import { useState } from "react"

import io from "socket.io-client"

const SERVER = "http://localhost:8080"
const socket = io.connect(SERVER)

socket.onAny((event, ...args) => {
  console.log(event, args)
})

socket.on("connect_error", (err) => {
  if (err.message === "Invalid uid") {
    console.log("error at socket connection")
  }
})

const SocketProvider = ({ children }) => {
  const [channelID, setChannelID] = useState("")
  const [messages, setMessages] = useState([])

  const socketStateSample = {
    socket,
    setChannelID,
    channelID,
    setMessages,
    messages,
  }
  return (
    <SocketContext.Provider value={socketStateSample}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider

import { SocketContext } from "./SocketContext"
import { useState } from "react"

/* import io from "socket.io-client" */

/* const SERVER = "http://localhost:8080" */
/* const socket = io.connect(SERVER) */

const SocketProvider = ({ children }) => {
  const [channelID, setChannelID] = useState("")
  const [messages, setMessages] = useState([])

  const socketStateSample = {
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

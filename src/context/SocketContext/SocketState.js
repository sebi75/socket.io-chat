import { SocketContext } from "./SocketContext"

import io from "socket.io-client"

const SERVER = "http://localhost:8080"
const socket = io.connect(SERVER)

const SocketProvider = ({ children }) => {
  const socketStateSample = {
    socket,
  }
  return (
    <SocketContext.Provider value={socketStateSample}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider

import { SocketContext } from "./SocketContext"

import io from "socket.io-client"

const SERVER = "http://localhost:8080"
const socket = io.connect(SERVER, { autoConnect: false })

socket.onAny((event, ...args) => {
  console.log(event, args)
})

socket.on("connect_error", (err) => {
  if (err.message === "Invalid uid") {
    console.log("error at socket connection")
  }
})

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

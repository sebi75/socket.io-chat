const express = require("express")
const http = require("http")

const cors = require("cors")
const { Server } = require("socket.io")

require("dotenv").config()
const PORT = process.env.PORT

const app = express()
app.use(cors())

app.get("/hello", (req, res) => {
  res.json({ message: "server up and running" })
})

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_END === "development"
        ? "http://localhost:3000"
        : "https://realtime-chat-32a39.web.app",
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  },
})

io.on("connection", (socket) => {
  socket.removeAllListeners()

  //join individual chat by the channelID sent to the server
  socket.on("join_room", ({ channelID }) => {
    socket.join(channelID)
    console.log(`Joined ${channelID} successfully`)
  })

  //catch the sent messages from client and broadcast to every other
  // user connected to the room (in this case only other one)
  // (1o1 convos)
  socket.on("send_message", (messageData) => {
    if (messageData.channelID != null) {
      console.log(messageData)
      io.to(messageData.channelID).emit("receive_message", messageData)
    }
  })

  socket.on("leave_room", ({ channelID }) => {
    socket.leave(channelID)
    console.log("left room", channelID)
  })

  //handle disconnections
  socket.on("disconnect", (data) => {
    console.log("user disconnected.")
  })
})

server.listen(PORT, () => {
  console.log("Server Listening on port", PORT, "...")
})

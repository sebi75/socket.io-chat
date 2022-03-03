import React, { useEffect, useState } from "react"
import ScrollToBottom from "react-scroll-to-bottom"

const Chat = ({ socket, username, room }) => {
  const [chatMessage, setChatMessage] = useState("")
  const [messageList, setMessageList] = useState([])

  const sendMessage = async () => {
    if (chatMessage !== "undefined") {
      const messageData = {
        room: room,
        author: username,
        message: chatMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      }

      await socket.emit("send_message", messageData)
      setMessageList((curr) => [...curr, messageData])
      setChatMessage("")
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((curr) => [...curr, data])
      console.log(messageList)
    })
  }, [socket])

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Realtime chat</p>
      </div>

      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageData) => {
            const { message, author, time } = messageData
            return (
              <div
                key={Math.random().toString(36)}
                className="message"
                id={username === author ? "other" : "you"}
              >
                <div className="">
                  <div className="message-content">
                    <p>{message}</p>
                  </div>

                  <div className="message-meta">
                    <p id={"time"}>{time}</p>
                    <p id={"author"}>{author}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </ScrollToBottom>
      </div>

      <div className="chat-footer">
        <input
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage()
          }}
          type="text"
          placeholder="type your message..."
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat

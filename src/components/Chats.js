import React, { useContext } from "react"

import Men from "../assets/men.svg"

import { GlobalState } from "../context/Context"
import { SocketContext } from "../context/SocketContext/SocketContext"

export const Chats = ({ data }) => {
  return (
    <Layout>
      {data.map((object) => {
        return (
          <ChatItem
            key={Math.random().toString(36)}
            name={object.displayName}
            photoURL={object.photoUrl}
            currentChannelID={object.channelID}
            uid={object.uid}
          />
        )
      })}
    </Layout>
  )
}

const ChatItem = ({ name, photoURL, currentChannelID }) => {
  const { setLoadComponent, setChatData, user } = useContext(GlobalState)
  const { socket, setMessages, setChannelID, channelID } =
    useContext(SocketContext)

  let loadPhoto = typeof photoURL === "undefined" ? Men : photoURL

  const handleChangeChat = () => {
    socket.emit("leave_room", {
      // emit event for leaving previous room f it was one
      channelID: channelID,
    })

    setChannelID(currentChannelID) // set channel id to the current displayed

    socket.emit("join_room", { channelID: currentChannelID })

    setLoadComponent("chat") // load the chat component

    console.log(currentChannelID)

    //for header displayName
    setChatData({
      displayName: name,
      photoURL: photoURL,
    })
    setMessages([])
  }

  return (
    <div
      className="w-[90%] max-h-[5rem] mt-[0.7rem] cursor-pointer duration-150 hover:bg-gray-300 rounded-lg shadow-lg flex items-center dark:hover:bg-gray-800 dark:bg-gray-700 overflow-hidden py-[0.7rem]"
      onClick={handleChangeChat}
    >
      <div className="tooltip w-[100%] md:hidden" data-tip={name}>
        <img src={loadPhoto} alt="avatar" className="w-[100%] md:w-[35%]" />
      </div>

      <img
        src={loadPhoto}
        alt="avatar"
        className="hidden md:flex md:w-[35%] max-w-[3rem] ml-[0.5rem]"
      />

      <div className="hidden md:flex flex-col">
        <p className="font-bold text-gray-700 text-[1.1rem] dark:text-white ml-[0.5rem]">
          {name}
        </p>
      </div>
    </div>
  )
}

const Layout = ({ children }) => {
  return (
    <div className="flex w-full h-full flex-col items-center">{children}</div>
  )
}

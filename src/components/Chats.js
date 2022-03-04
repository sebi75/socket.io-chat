import React, { useContext } from "react"

import Men from "../assets/men.svg"
import { GlobalState } from "../context/Context"

export const Chats = ({ data }) => {
  console.log("data:", data)

  return (
    <Layout>
      {data.map((object) => {
        console.log(object)

        console.log("possible:")
        console.log(object)
        return (
          <ChatItem
            key={Math.random().toString(36)}
            name={object.displayName}
            photoURL={object.photoUrl}
          />
        )
      })}
    </Layout>
  )
}

const ChatItem = ({ name, photoURL }) => {
  const { setLoadComponent, setCurrentChatUserId } = useContext(GlobalState)

  return (
    <div
      className="w-[90%] max-h-[5rem] mt-[0.7rem] cursor-pointer duration-150 hover:bg-gray-300 rounded-lg shadow-lg flex items-center dark:hover:bg-gray-800 dark:bg-gray-700 overflow-hidden py-[0.7rem]"
      onClick={() => {
        setLoadComponent("chat")
        setCurrentChatUserId("86876876")
      }}
    >
      <div className="tooltip w-[100%] md:hidden" data-tip={name}>
        <img src={photoURL} alt="avatar" className="w-[100%] md:w-[35%]" />
      </div>

      <img
        src={photoURL}
        alt="avatar"
        className="hidden md:flex md:w-[35%] max-w-[5rem]"
      />

      <div className="hidden md:flex flex-col">
        <p className="font-bold text-gray-700 text-[1.1rem] dark:text-white">
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

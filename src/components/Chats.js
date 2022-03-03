import React, { useContext } from "react"

import Men from "../assets/men.svg"
import { GlobalState } from "../context/Context"

export const Chats = ({ data }) => {
  return (
    <Layout>
      {data.map((object) => {
        return <ChatItem key={Math.random().toString(36)} name={object.name} />
      })}
    </Layout>
  )
}

const ChatItem = ({ name }) => {
  const { setLoadComponent, setCurrentChatUserId } = useContext(GlobalState)
  return (
    <div
      className="w-[90%] max-h-[5rem] mt-[0.7rem] cursor-pointer duration-150 hover:bg-gray-300 rounded-lg shadow-lg flex items-center dark:hover:bg-gray-800 dark:bg-gray-700 overflow-hidden"
      onClick={() => {
        setLoadComponent("chat")
        setCurrentChatUserId("86876876")
      }}
    >
      <div className="tooltip w-[100%] md:hidden" data-tip={name}>
        <img src={Men} alt="avatar" className="w-[100%] md:w-[35%]" />
      </div>

      <img
        src={Men}
        alt="avatar"
        className="hidden md:flex md:w-[35%] max-w-[5rem]"
      />

      <div className="hidden md:flex flex-col">
        <p className="font-bold text-gray-700 text-[1.2rem] dark:text-white">
          {name}
        </p>
        <p className="dark:text-white text-[14px]">
          {"last message was this..."}
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

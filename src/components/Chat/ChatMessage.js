import React from "react"
import Men from "../../assets/men.svg"

const ChatMessage = ({ message, timestamp, displayName, photoURL }) => {
  let loadImage = typeof photoURL === "null" ? Men : photoURL

  return (
    <Layout>
      <img src={loadImage} alt="" className="w-[3.5rem] mr-[1rem]" />

      <MessageContentLayout>
        <div className="flex items-center">
          <NameComponent name={displayName} />
          <DateComponent timestamp={timestamp} />
        </div>
        <p className="dark:text-white">{message}</p>
      </MessageContentLayout>
    </Layout>
  )
}

const MessageContentLayout = ({ children }) => {
  return <div className="flex flex-col">{children}</div>
}

const NameComponent = ({ name }) => {
  return <h1 className="dark:text-white text-[1.2rem]">{name}</h1>
}
const DateComponent = ({ timestamp }) => {
  return <p className="ml-[0.5rem] text-gray-500">{timestamp}</p>
}

const Layout = ({ children }) => {
  return (
    <div className="flex items-center w-[90%] ml-[1.5rem] h-[7rem] md:h-[5rem] p-[0.5rem] my-[0.8rem] rounded-lg shadow-sm">
      {children}
    </div>
  )
}

export default ChatMessage

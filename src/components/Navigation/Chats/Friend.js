import { useContext } from "react"
import { SocketContext } from "../../../context/SocketContext/SocketContext"
import { GlobalState } from "../../../context/Context"

import Men from "../../../assets/men.svg"

const Friend = ({ name, photoURL, currentChannelID }) => {
  const { setLoadComponent, setChatData } = useContext(GlobalState)
  const { setMessages, setChannelID } = useContext(SocketContext)

  let loadPhoto = photoURL == null ? Men : photoURL

  const handleChangeChat = () => {
    setChannelID(currentChannelID) // set channel id to the current displayed

    setLoadComponent("chat") // load the chat component

    //for header displayName
    setChatData({
      displayName: name,
      photoURL: photoURL,
    })

    setMessages([])
  }

  return (
    <Layout handleChangeChat={handleChangeChat}>
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
    </Layout>
  )
}

const Layout = ({ children, handleChangeChat }) => {
  return (
    <div
      className="w-[90%] max-h-[5rem] mt-[0.7rem] cursor-pointer duration-150 hover:bg-gray-300 rounded-lg shadow-lg flex items-center dark:hover:bg-gray-800 dark:bg-gray-700 overflow-hidden py-[0.7rem]"
      onClick={handleChangeChat}
    >
      {children}
    </div>
  )
}

export default Friend

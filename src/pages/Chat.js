import React, { useContext, useState, useEffect } from "react"

import { Navigation } from "../components/"
import { MainChatComponent } from "../components"
import { Header } from "../components"
import { GlobalState } from "../context/Context"

import PendingComponent from "../components/PendingComponent"
import FriendsComponent from "../components/FriendsComponent"
import Loader from "../components/Loader/Loader"
import Modal from "../components/Modal"
import { SocketContext } from "../context/SocketContext/SocketContext"

export const Chat = () => {
  const { loadComponent, isLoading, isModalOpen, user } =
    useContext(GlobalState)
  const { socket } = useContext(SocketContext)
  const [navigateChannel, setNavigateChannel] = useState("")

  const loadComponentType = {
    chat: <MainChatComponent channelID={navigateChannel} />,
    friends: <FriendsComponent />,
    pending: <PendingComponent />,
  }

  let content = loadComponentType[loadComponent]

  useEffect(() => {
    if (!isLoading) {
      const uid = user.id
      socket.auth = { uid }
      socket.connect()
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Layout>
            <div className={styles1}>
              <div className="w-full h-[72px]">
                <Header />
              </div>

              <div className={styles2}>
                <Navigation setNavigateChannel={setNavigateChannel} />
                {content}
              </div>
            </div>

            {isModalOpen.isOpen && (
              <Modal
                isOpen={isModalOpen.isOpen}
                message={isModalOpen.message}
                header={isModalOpen.header}
              />
            )}
          </Layout>
        </>
      )}
    </>
  )
}

const styles1 = "h-full w-full bg-white duration-150 dark:bg-gray-700"
const styles2 = "w-full calculated-height flex flex-row"

const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center duration-150 dark:bg-gray-700 gradient-bg">
      <div className="flex w-full  md:w-[85%] h-full md:h-[95%] rounded-xl shadow-lg flex-col justify-center items-center overflow-hidden border-[1px] border-gray-700 dark:border-white">
        {children}
      </div>
    </div>
  )
}

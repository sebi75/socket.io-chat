import React, { useContext } from "react"

import { Navigation } from "../components/"
import { MainChatComponent } from "../components"
import { Header } from "../components"
import { GlobalState } from "../context/Context"

import PendingComponent from "../components/PendingCmp/PendingComponent"
import FriendsComponent from "../components/FriendsCmp/FriendsComponent"
import Loader from "../components/Loader/Loader"
import Modal from "../components/Modal/Modal"

export const Chat = () => {
  const { loadComponent, isLoading, isModalOpen } = useContext(GlobalState)

  const loadComponentType = {
    chat: <MainChatComponent />,
    friends: <FriendsComponent />,
    pending: <PendingComponent />,
  }

  let content = loadComponentType[loadComponent]

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
                <Navigation />
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

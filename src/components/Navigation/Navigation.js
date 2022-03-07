import React, { useContext } from "react"
import { GlobalState } from "../../context/Context"
import Men from "../../assets/men.svg"
import { Chats } from "../Chats"

export const Navigation = ({}) => {
  const { usersData } = useContext(GlobalState)

  return (
    <>
      <MainLayout>
        <InterLayout>
          <Label label={"Chats"} />
          <div className="w-full">
            <div className="w-full flex justify-center">
              {usersData.friends.length <= 0 && (
                <p className="w-full font-bold text-base dark:text-white mt-[2rem] ml-[1.5rem]">
                  There is no chat to display
                </p>
              )}
              <Chats data={usersData.friends} />
            </div>
          </div>
        </InterLayout>
        <NavigationFooter />
      </MainLayout>
      <PhoneNav />
    </>
  )
}

const PhoneNav = () => {
  const { usersData } = useContext(GlobalState)

  return (
    <div className="w-[5rem] md:hidden shadow-lg flex flex-col items-center mt-[1rem] z-50">
      {usersData.friends.length <= 0 && (
        <p className="flex items-center justify-center font-bold text-base text-gray-700 dark:text-white ml-[0.5rem]">
          There is no chat to display
        </p>
      )}
      <Chats data={usersData.friends} />
    </div>
  )
}

const NavigationFooter = () => {
  const { user, usersData } = useContext(GlobalState)

  let loadImage = user.photoURL ? user.photoURL : Men

  return (
    <div className="w-full h-[13%] border-[1px] border-gray-400 dark:white-glassmorphism rounded-md flex items-center justify-center">
      <div className="h-[75%] w-full flex items-center ml-[1.5rem]">
        <div className="avatar online max-w-[4rem] w-[30%] max-h-[4rem] ml-[0.5rem]">
          <div className="rounded-full">
            <img src={loadImage} alt="image" className="max-w-[3rem]" />
          </div>
        </div>
        <div className="flex flex-col ml-[0.7rem]">
          <h1 className="text-[1.3rem] text-gray-800 dark:text-white font-bold">
            {user.displayName}
          </h1>
          <h1 className="text-lg text-gray-400 font-bold">
            {usersData === null ? "loading id..." : usersData.usersUnique}
          </h1>
        </div>
      </div>
    </div>
  )
}

const InterLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-[87%] w-full min-w-[5rem] items-center overflow-y-scroll">
      {children}
    </div>
  )
}

const MainLayout = ({ children }) => {
  return (
    <div className="hidden md:w-[30%] lg:w-[25%] h-full shadow-lg rounded-lg md:flex items-center flex-col justify-between">
      {children}
    </div>
  )
}

const Label = ({ label }) => {
  return (
    <h1 className="text-3xl text-gray-700 font-bold dark:text-white">
      {label}
    </h1>
  )
}

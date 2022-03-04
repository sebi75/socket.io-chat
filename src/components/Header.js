import React, { useContext, useState } from "react"
import useDarkMode from "../hooks/useDarkMode"

import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs"
import { GiHamburgerMenu } from "react-icons/gi"
import { AiOutlinePlus } from "react-icons/ai"
import { GlobalState } from "../context/Context"
import { addFriend } from "../firebase"

export const Header = () => {
  const [darkTheme, setDarkTheme] = useDarkMode()
  const handleMode = () => setDarkTheme(!darkTheme)
  return (
    <Layout>
      <div className="flex">
        <Label label={"Chatify"} />
        <AddFriendComponent />
      </div>
      <FriendsComponent />
      <SignOut handleMode={handleMode} darkTheme={darkTheme} />
      <PhoneResponsive />
    </Layout>
  )
}

const SignOut = ({ handleMode, darkTheme, styles }) => {
  const { signOutHandler } = useContext(GlobalState)

  return (
    <div className={styles ? `${styles}` : "mr-[1rem] hidden lg:flex"}>
      <button className="mr-[0.7rem] p-[10px] rounded-lg dark:text-white">
        {darkTheme ? (
          <BsFillSunFill size={23} onClick={handleMode} />
        ) : (
          <BsFillMoonFill size={23} onClick={handleMode} />
        )}
      </button>
      <button
        className={styles ? "btn btn-accent mt-[0.5rem]" : "btn btn-accent"}
        onClick={signOutHandler}
      >
        Sign Out
      </button>
    </div>
  )
}

const PhoneResponsive = () => {
  return (
    <div className="dropdown dropdown-end lg:hidden">
      <div className="flex justify-center">
        <label tabIndex="0" className="m-1 btn btn-ghost">
          <GiHamburgerMenu size={25} />
        </label>
        <ul
          tabIndex="0"
          className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
        >
          <FriendsComponent styles={"flex flex-col"} />
        </ul>
      </div>
    </div>
  )
}

const FriendsComponent = ({ styles }) => {
  const { setLoadComponent } = useContext(GlobalState)

  return (
    <div className={styles ? `${styles}` : "hidden lg:flex"}>
      <button
        className={styles ? "btn btn-accent mb-[0.5rem]" : "btn btn-accent"}
        onClick={() => setLoadComponent("friends")}
      >
        All Friends
      </button>
      <button
        className="btn btn-accent ml-[1rem]"
        onClick={() => setLoadComponent("pending")}
      >
        Pending
      </button>
    </div>
  )
}

const Label = ({ label }) => {
  return (
    <h1 className="font-bold text-3xl text-gray-700 ml-[1rem] flex items-center dark:text-white">
      {label}
    </h1>
  )
}

const AddFriendComponent = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [usersUnique, setUsersUnique] = useState("")
  const { user, setIsModalOpen, isModalOpen } = useContext(GlobalState)

  const addFriendHandler = () => {
    if (usersUnique.length < 6)
      return setIsModalOpen({
        isOpen: true,
        header: "Invalid Id",
        message: "The Identifier you searched for is not in our database",
      })

    addFriend(usersUnique, user, setIsModalOpen, setIsLoading)
  }

  return (
    <div className="flex">
      <input
        type="text"
        onChange={(e) => setUsersUnique(e.target.value)}
        className="ml-[1rem] input input-bordered w-full max-w-xs text-gray-700"
        placeholder={"friend's id"}
      />
      <button
        className={
          isLoading
            ? "btn btn-accent btn-square loading ml-[0.7rem]"
            : "btn btn-accent btn-square ml-[0.7rem]"
        }
        onClick={addFriendHandler}
      >
        {!isLoading && <AiOutlinePlus size={25} />}
      </button>
    </div>
  )
}

const Layout = ({ children }) => {
  return (
    <div className="h-[4.5rem] w-full flex items-center justify-between white-glassmorphism">
      {children}
    </div>
  )
}

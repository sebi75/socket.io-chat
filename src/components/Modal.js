import React, { useRef, useEffect, useContext } from "react"
import { GlobalState } from "../context/Context"

import { removeFriend } from "../firebase/db/removeFriend"

const Modal = ({ header, message }) => {
  const { setIsModalOpen, isModalOpen, removeFriendState, user } =
    useContext(GlobalState)

  const node = useRef()

  const handleOutsideClick = (e) => {
    if (!node.current.contains(e.target))
      setIsModalOpen({ isOpen: false, message: "", header: "" })
  }

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, false)

    return () => {
      document.removeEventListener("click", handleOutsideClick, false)
    }
  })

  const removeFriendHandler = (e) => {
    e.preventDefault()

    removeFriendState(isModalOpen.friendToRemoveId)

    removeFriend(user.id, isModalOpen.friendToRemoveId)

    setIsModalOpen({
      ...isModalOpen,
      confirmed: true,
      isOpen: false,
      friendToRemoveId: undefined,
    })
  }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-trans dark:bg-[rgba(255,255,255,0.3)] fixed duration-1000">
      <div
        ref={node}
        className="w-[35%] h-[20vh] bg-white dark:bg-gray-700 rounded-md shadow-lg flex flex-col justify-center items-center"
      >
        <div className="w-[90%] h-[35%] flex items-center justify-center">
          <h1 className="dark:text-white font-bold text-xl">{header}</h1>
        </div>
        <div className="w-[90%] h-[65%] flex items-center justify-center">
          <h1 className="dark:text-white text-base font-bold">{message}</h1>
        </div>
        {isModalOpen.hasButton && (
          <button
            className="btn btn-error mb-[0.7rem] text-white"
            onClick={removeFriendHandler}
          >
            Confirm
          </button>
        )}
      </div>
    </div>
  )
}

const Layout = ({ children }) => {
  return <div>{children}</div>
}

export default Modal

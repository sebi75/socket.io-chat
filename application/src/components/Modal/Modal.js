import React, { useRef, useEffect, useContext } from "react"
import { GlobalState } from "../../context/Context"

import { removeFriend } from "../../firebase/db/removeFriend"

//import components from same directory
import {
  ModalContainer,
  ModalHeaderContainer,
  ModalMessageContainer,
  Layout,
} from "./Components"
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
    <Layout className="flex items-center justify-center w-full h-screen bg-gray-trans dark:bg-[rgba(255,255,255,0.3)] fixed duration-1000">
      <ModalContainer node={node}>
        <ModalHeaderContainer text={header} />

        <ModalMessageContainer text={message} />

        {isModalOpen.hasButton && (
          <button
            className="btn btn-error mb-[0.7rem] text-white"
            onClick={removeFriendHandler}
          >
            Confirm
          </button>
        )}
      </ModalContainer>
    </Layout>
  )
}

export default Modal

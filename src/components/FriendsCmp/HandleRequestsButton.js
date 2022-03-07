import { useContext } from "react"
import { GlobalState } from "../../context/Context"

import { AiOutlineClose } from "react-icons/ai"

const HandleRequestsButton = ({ uid, displayName }) => {
  const { setIsModalOpen } = useContext(GlobalState)

  const handleRemoveFriend = () => {
    setIsModalOpen({
      isOpen: true,
      header: `Remove ${displayName} ?`,
      message: "This action cannot be undone",
      hasButton: true,
      friendToRemoveId: uid,
    })
  }

  return (
    <div className="dark:text-white">
      <button
        className="btn btn-outline btn-error dark:bg-gray-600"
        onClick={handleRemoveFriend}
      >
        <AiOutlineClose size={25} />
      </button>
    </div>
  )
}

export default HandleRequestsButton

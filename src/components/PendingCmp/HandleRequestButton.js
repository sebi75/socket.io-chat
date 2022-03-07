import { useContext } from "react"
import { GlobalState } from "../../context/Context"

import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"
import {
  acceptFriendRequest,
  denyFriendRequest,
} from "../../firebase/db/manageFriendRequest"

const HandleRequestsButton = ({ uid, currentUid, friendRequest }) => {
  const { acceptFriendRequestState, denyFriendRequestState } =
    useContext(GlobalState)

  const handleAcceptRequest = () => {
    const randomGeneratedChannelID = generateRandomChannelId()

    friendRequest.channelID = randomGeneratedChannelID

    acceptFriendRequest(currentUid, uid, randomGeneratedChannelID)
    acceptFriendRequestState(uid, friendRequest)
  }

  const denyRequest = () => {
    denyFriendRequest(currentUid, uid)
    denyFriendRequestState(uid, friendRequest)
  }

  return (
    <div className="dark:text-white">
      <button
        className="btn btn-outline btn-error dark:bg-gray-600"
        onClick={denyRequest}
      >
        <AiOutlineClose size={25} />
      </button>

      <button
        className="btn btn-accent dark:bg-gray-600 ml-[0.7rem]"
        onClick={handleAcceptRequest}
      >
        <AiOutlineCheck size={25} />
      </button>
    </div>
  )
}

const generateRandomChannelId = () => {
  return Math.random().toString(36).slice(2, 11)
}

export default HandleRequestsButton

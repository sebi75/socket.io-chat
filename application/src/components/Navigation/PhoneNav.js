import { useContext } from "react"
import { GlobalState } from "../../context/Context"
import { Chats } from "./Chats/Chats"

const PhoneNav = () => {
  const { usersData } = useContext(GlobalState)

  return (
    <div className="w-[5rem] md:hidden shadow-lg flex flex-col items-center mt-[1rem] z-50">
      {usersData.friends.length <= 0 && (
        <p className="flex items-center justify-center font-bold text-base text-gray-700 dark:text-white ml-[0.5rem]">
          No chats
        </p>
      )}
      <Chats data={usersData.friends} />
    </div>
  )
}

export default PhoneNav

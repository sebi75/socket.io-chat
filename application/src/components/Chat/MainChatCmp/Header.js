import { useContext } from "react"
import { GlobalState } from "../../../context/Context"

const Header = () => {
  const { chatData } = useContext(GlobalState)

  return (
    <div className="w-full h-[5%] shadow-xl flex items-center">
      <h1 className="dark:text-white text-gray-700 text-2xl font-bold ml-[2rem]">
        {chatData.displayName}
      </h1>
    </div>
  )
}

export default Header

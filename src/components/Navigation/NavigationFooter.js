import { useContext } from "react"
import { GlobalState } from "../../context/Context"

import Men from "../../assets/men.svg"

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

export default NavigationFooter

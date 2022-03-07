import React, { useContext } from "react"
import { GlobalState } from "../../context/Context"
import { Chats } from "./Chats/Chats"

import PhoneNav from "./PhoneNav"
import NavigationFooter from "./NavigationFooter"
import { InterLayout, MainLayout, Label } from "./Layouts"

export const Navigation = () => {
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

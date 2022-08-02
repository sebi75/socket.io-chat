export const InterLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-[87%] w-full min-w-[5rem] items-center overflow-y-scroll">
      {children}
    </div>
  )
}

export const MainLayout = ({ children }) => {
  return (
    <div className="hidden md:w-[30%] lg:w-[25%] h-full shadow-lg rounded-lg md:flex items-center flex-col justify-between">
      {children}
    </div>
  )
}

export const Label = ({ label }) => {
  return (
    <h1 className="text-3xl text-gray-700 font-bold dark:text-white">
      {label}
    </h1>
  )
}

/* CHATS component layouts */
export const ChatsLayout = ({ children }) => {
  return (
    <div className="flex w-full h-full flex-col items-center">{children}</div>
  )
}

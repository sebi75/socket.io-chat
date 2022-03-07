export const MessageContentLayout = ({ children }) => {
  return <div className="flex justify-between">{children}</div>
}

export const NameComponent = ({ name }) => {
  return <h1 className="dark:text-white text-gray-700 text-[1.2rem]">{name}</h1>
}
export const DateComponent = ({ timestamp }) => {
  return <p className="ml-[0.5rem] text-gray-500">{timestamp}</p>
}

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center w-[90%] h-[10rem] lg:h-[5rem] p-[0.5rem] my-[0.8rem] rounded-lg shadow-lg duration-150 hover:bg-gray-300 dark:hover:bg-gray-800 dark:bg-gray-700 justify-between cursor-pointer">
      {children}
    </div>
  )
}

export const MainLayout = ({ children }) => {
  return (
    <div className="flex justify-center w-[100%] md:w-[70%] lg:w-[75%] h-full">
      {children}
    </div>
  )
}

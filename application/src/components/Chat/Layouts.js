export const MessageContentLayout = ({ children }) => {
  return <div className="flex flex-col">{children}</div>
}

export const NameComponent = ({ name }) => {
  return <h1 className="dark:text-white text-gray-700 text-[1.2rem]">{name}</h1>
}
export const DateComponent = ({ timestamp }) => {
  return <p className="ml-[0.5rem] text-gray-500">{timestamp}</p>
}

export const Layout = ({ children }) => {
  return (
    <div className="flex items-center w-[90%] ml-[1.5rem] h-[7rem] md:h-[5rem] p-[0.5rem] my-[0.8rem] rounded-lg shadow-sm">
      {children}
    </div>
  )
}

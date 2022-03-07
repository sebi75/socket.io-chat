export const ModalContainer = ({ children, node }) => {
  return (
    <div
      className="w-[35%] h-[20vh] bg-white dark:bg-gray-700 rounded-md shadow-lg flex flex-col justify-center items-center"
      ref={node}
    >
      {children}
    </div>
  )
}

export const ModalHeaderContainer = ({ text }) => {
  return (
    <div className="w-[90%] h-[35%] flex items-center justify-center">
      <h1 className="dark:text-white text-gray-700 font-bold text-xl">
        {text}
      </h1>
    </div>
  )
}

export const ModalMessageContainer = ({ text }) => {
  return (
    <div className="w-[90%] h-[65%] text-gray-700 flex items-center justify-center">
      <h1 className="dark:text-white text-base font-bold">{text}</h1>
    </div>
  )
}

export const Layout = ({ children }) => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-trans dark:bg-[rgba(255,255,255,0.3)] fixed duration-1000">
      {children}
    </div>
  )
}

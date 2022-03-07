export const Layout = ({ children }) => {
  return (
    <div className="w-[80%] h-[80%]">
      <div className="w-full h-full flex flex-col items-center">{children}</div>
    </div>
  )
}

export const StyledText = ({ children }) => {
  return <p className="text-[2rem] font-bold dark:text-white">{children}</p>
}

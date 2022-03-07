import InputEmoji from "react-input-emoji"

const FooterInputComponent = ({ setText, text, sendMessage }) => {
  const handleOnEnter = () => {
    sendMessage()
  }

  return (
    <div className="flex justify-center items-center h-[15%]">
      <InputEmoji
        value={text}
        height={65}
        onChange={setText}
        cleanOnEnter
        onEnter={handleOnEnter}
        placeholder="Type a message"
      />
    </div>
  )
}

export default FooterInputComponent

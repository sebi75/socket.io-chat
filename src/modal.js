import { useState, useRef } from "react"

const Modal = () => {
  const [showModal, setShowModal] = useState(false)
  const node = useRef()

  const handleClick = () => {
    if (!showModal) {
      document.addEventListener("click", handleOutsideClick, false)
    } else {
      document.removeEventListener("click", handleOutsideClick, false)
    }

    setShowModal(!showModal)
  }

  const handleOutsideClick = (e) => {
    if (!node.current.contains(e.target)) setShowModal(false)
  }

  return (
    <div ref={node}>
      <button onClick={() => handleClick()}>Open modal</button>
      <div>
        {showModal && (
          <div
            style={{ backgroundColor: "red", width: "100%", height: "20rem" }}
          >
            <h1>Modal here</h1>
          </div>
        )}
      </div>
    </div>
  )
}

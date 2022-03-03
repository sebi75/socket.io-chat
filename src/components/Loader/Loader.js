import React from "react"
import "./loader.css"

const Loader = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader

import React, { useState, useContext } from "react"
import { GlobalState } from "../../context/Context"

import { Navigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import Loader from "../Loader/Loader"

const Signup = ({ setLoadComponent }) => {
  const {
    signupWithEmail,
    isLoading,
    signUpWithGooglePopup,
    user,
    error,
    setError,
  } = useContext(GlobalState)

  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const onChangePassword = (e) => {
    setError("")
    setPassword(e.target.value)
  }
  const onChangeEmail = (e) => {
    setError("")
    setEmail(e.target.value)
  }

  const submitHandler = () => {
    signupWithEmail(email, password)
  }

  return (
    <>
      {user && <Navigate replace to={"/chat"} />}
      <Layout>
        <StyledText>Sign Up</StyledText>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-[2rem]">
            <InputField
              label={"Email"}
              type={"text"}
              onChangeEmail={onChangeEmail}
              placeholder={"type your email..."}
            />

            <div className="mt-[1rem]">
              <InputField
                label={"Password"}
                type={"password"}
                onChangePassword={onChangePassword}
                placeholder={"type password..."}
              />
            </div>

            <button
              className={
                isLoading
                  ? "btn btn-accent loading w-full mt-[1.5rem]"
                  : "btn btn-accent w-full mt-[1.5rem]"
              }
              onClick={submitHandler}
            >
              Sign Up
            </button>

            <LinkToSignInComponent
              message={"Already have an account?"}
              setLoadComponent={setLoadComponent}
              type={"SignIn"}
            />

            <SignGoogleButton signWithGooglePopup={signUpWithGooglePopup} />

            <DisplayErrorComponent error={error} />
          </div>
        )}
      </Layout>
    </>
  )
}

const Layout = ({ children }) => {
  return (
    <div className="w-[80%] h-[80%]">
      <div className="w-full h-full flex flex-col items-center">{children}</div>
    </div>
  )
}

const StyledText = ({ children }) => {
  return <p className="text-[2rem] font-bold dark:text-white">{children}</p>
}

const LinkToSignInComponent = ({ message, type, setLoadComponent }) => {
  return (
    <div className="flex">
      <p className="dark:text-white">{message}</p>
      <div className="ml-[0.5rem]">
        <p
          className="font-bold text-gray-800 dark:text-white cursor-pointer"
          onClick={() => setLoadComponent("login")}
        >
          {type}
        </p>
      </div>
    </div>
  )
}

const DisplayErrorComponent = ({ error }) => {
  return (
    <div
      className={
        error
          ? "flex items-center justify-center min-h-[2.5rem] bg-[#b52643] rounded-lg shadow-lg mt-[0.5rem] duration-150"
          : "flex items-center justify-center min-h-[2.5rem] rounded-lg mt-[0.5rem] duration-150"
      }
    >
      {error.length > 1 && (
        <h1 className="font-bold text-base text-white">{error}</h1>
      )}
    </div>
  )
}

export const SignGoogleButton = ({ signWithGooglePopup }) => {
  return (
    <button
      className="btn flex items-center justify-center text-white mt-[1rem] w-full border-1 bg-gray-500 border-gray-500"
      onClick={() => signWithGooglePopup()}
    >
      <FcGoogle size={24} className="mr-2" />
      Sign In With Google
    </button>
  )
}

const InputField = ({
  label,
  placeholder,
  type,
  onChangeEmail,
  onChangePassword,
}) => {
  return (
    <>
      <label className="text-base text-gray-700 dark:text-white">
        {label}:
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={label === "Email" ? onChangeEmail : onChangePassword}
        className="input input-bordered w-full max-w-xs mt-[0.5rem]"
      />
    </>
  )
}

export default Signup

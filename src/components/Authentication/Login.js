import React, { useState, useContext } from "react"
import { GlobalState } from "../../context/Context"

import { Navigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import Loader from "../Loader/Loader"

import { Layout, StyledText } from "./Layouts"

const Login = ({ setLoadComponent }) => {
  const {
    signInWithEmail,
    isLoading,
    user,
    signWithGooglePopup,
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
    signInWithEmail(email, password)
  }

  return (
    <>
      {user && !isLoading && <Navigate replace to={"/chat"} />}
      <Layout>
        <StyledText>Login</StyledText>

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
              Sign In
            </button>
            <LinkToSignUpComponent
              message={"Don't have an account?"}
              setLoadComponent={setLoadComponent}
              type={"SignUp"}
            />
            <SignGoogleButton signWithGooglePopup={signWithGooglePopup} />

            <DisplayErrorComponent error={error} />
          </div>
        )}
      </Layout>
    </>
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

const LinkToSignUpComponent = ({ message, type, setLoadComponent }) => {
  return (
    <div className="flex">
      <p className="text-gray-800 dark:text-white">{message}</p>
      <div className="ml-[0.5rem]">
        <p
          className="font-bold text-gray-800 dark:text-white cursor-pointer"
          onClick={() => setLoadComponent("signup")}
        >
          {type}
        </p>
      </div>
    </div>
  )
}

export const SignGoogleButton = ({ signWithGooglePopup }) => {
  return (
    <button
      className="btn bg-gray-500 flex items-center justify-center text-white mt-[1rem] w-full border-1 border-gray-500"
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

export default Login

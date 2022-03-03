import { GlobalState } from "./Context"
import { useState, useReducer } from "react"
import { reducer } from "./reducer/reducer"

import {
  createAccountWithEmail,
  signWithEmail,
  getAuthState,
  signOut,
  getUserData,
  signInWithGooglePopup,
  signUpWithPopup,
} from "../firebase/"

/* IMPORT ACTION CREATORS */
import {
  addUsersDataFromDb,
  setUserAction,
  clearStateWhenSignout,
} from "./action-creators"

const initialState = {
  usersData: null,
  user: null,
}

const Provider = ({ children }) => {
  const [loadComponent, setLoadComponent] = useState("chat")
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    header: "",
    message: "",
  })
  const [currentChatUserId, setCurrentChatUserId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  /*   console.log("user simply:")
  console.log(state.user)

  console.log("usersData:")
  console.log(state.usersData) */

  const setUser = (user) => {
    dispatch(setUserAction(user))
  }

  const addUsersData = (usersData) => {
    dispatch(addUsersDataFromDb(usersData))
  }

  const signupWithEmail = (email, password) => {
    createAccountWithEmail(email, password, setUser, setError, setIsLoading)
  }
  const signInWithEmail = (email, password) => {
    signWithEmail(email, password, setUser, setError, setIsLoading)
  }

  /* GOOGLE PROVIDED AUTHENTICATION */
  const signUpWithGooglePopup = () => {
    signUpWithPopup(setUser)
  }

  const signWithGooglePopup = () => {
    signInWithGooglePopup(setUser)
  }

  const getAuthStateHandler = (setIsLoading) => {
    getAuthState(setUser, setIsLoading)
  }

  const getUsersDataHandler = () => {
    getUserData(state.user.id, addUsersData, setIsLoading)
  }

  const signOutHandler = () => {
    signOut(setUser)
    dispatch(clearStateWhenSignout())
  }

  const sampleValueObject = {
    setCurrentChatUserId,
    setIsModalOpen,
    isModalOpen,
    signUpWithGooglePopup,
    signWithGooglePopup,
    getUsersDataHandler,
    getAuthStateHandler,
    signOutHandler,
    setLoadComponent,
    signupWithEmail,
    signInWithEmail,
    isLoading,
    setError,
    error,
    loadComponent,
    usersData: state.usersData,
    user: state.user,
  }

  return (
    <GlobalState.Provider value={sampleValueObject}>
      {children}
    </GlobalState.Provider>
  )
}

export default Provider

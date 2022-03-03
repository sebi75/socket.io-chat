import { useEffect, useState } from "react"

const useLocalStorage = (key, initialValue) => {
  //check for already existent item and what it is for dark theme in the local storage and return what it is there
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  //modify local storage with new value when given
  const setValue = (value) => {
    setStoredValue(value)
    //actualizare tema de fiecare data in local storage
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  return [storedValue, setValue]
}

const useDarkMode = () => {
  const [enabled, setEnabled] = useLocalStorage("dark-theme")
  const isEnabled = enabled

  useEffect(() => {
    const className = "dark"
    const bodyClass = window.document.body.classList

    isEnabled ? bodyClass.add(className) : bodyClass.remove(className)
  }, [enabled, isEnabled])

  return [enabled, setEnabled]
}

export default useDarkMode

/* 

usage of setDarktheme:
 const [darkTheme, setDarkTheme] = useDarkMode()
  const handleMode = () => setDarkTheme(!darkTheme)

*/

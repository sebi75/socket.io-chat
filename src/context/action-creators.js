import { ActionType } from "./action-types"

export const setUserAction = (user) => {
  return {
    type: ActionType.ADD_USER,
    payload: user,
  }
}

export const addUsersDataFromDb = (usersData) => {
  return {
    type: ActionType.POPULATE_USERS_DATA,
    payload: usersData,
  }
}

export const clearStateWhenSignout = () => {
  return {
    type: ActionType.CLEAR_STATE,
  }
}
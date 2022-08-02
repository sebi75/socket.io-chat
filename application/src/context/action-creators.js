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

export const acceptRequest = (uid, newFriend) => {
  return {
    type: ActionType.ACCEPT_REQUEST,
    payload: {
      uid: uid,
      newFriend: newFriend,
    },
  }
}

export const removeFriend = (uid) => {
  return {
    type: ActionType.REMOVE_FRIEND,
    payload: uid,
  }
}

export const denyRequest = (uid) => {
  return {
    type: ActionType.DENY_REQUEST,
    payload: uid,
  }
}

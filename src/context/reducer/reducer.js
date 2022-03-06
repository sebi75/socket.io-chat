import { ActionType } from "../action-types"

export const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.ADD_USER:
      return {
        ...state,
        user: action.payload,
      }

    case ActionType.ACCEPT_REQUEST:
      console.log(state)
      return {
        ...state,
        usersData: {
          ...state.usersData,
          friendRequests: state.usersData.friendRequests.filter(
            (request) => request.uid !== action.payload.uid
          ),
          friends: [...state.usersData.friends, action.payload.newFriend],
        },
      }

    case ActionType.POPULATE_USERS_DATA:
      return {
        ...state,
        usersData: action.payload,
      }

    case ActionType.CLEAR_STATE:
      return {
        ...state,
        usersData: null,
        user: null,
      }

    default:
      return state
  }
}

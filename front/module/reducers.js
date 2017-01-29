import { combineReducers } from 'redux'
import { SET_NAME } from './actions'

const userInfoInitialState = { name: '' }
const userInfo = (state = userInfoInitialState, { type, payload }) => {
  switch (type) {
    case SET_NAME:
      return {
        ...state,
        name: payload.name
      }
    default:
      return state
  }
}

export default combineReducers({
  userInfo
})

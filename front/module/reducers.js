import { combineReducers } from 'redux'
import { SET_NAME, RECEIVE_TASK, SET_CODE, REQUEST_START_TASK, REQUEST_TASK } from './actions'

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

const activeTaskInitialState = { loading: false }
const activeTask = (state = activeTaskInitialState, { type, payload }) => {
  switch (type) {
    case REQUEST_START_TASK:
    case REQUEST_TASK:
      return {
        ...state,
        loading: true
      }
    case RECEIVE_TASK:
      return {
        ...state,
        ...payload,
        code: state.id === payload.id ? state.code || payload.initialCode : payload.initialCode,
        loading: false
      }
    case SET_CODE:
      return {
        ...state,
        code: payload.code
      }
    default:
      return state
  }
}

export default combineReducers({
  userInfo,
  activeTask
})

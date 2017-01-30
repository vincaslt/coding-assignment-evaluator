import { combineReducers } from 'redux'
import { SET_NAME, RECEIVE_TASK, SET_CODE, REQUEST_START_TASK, REQUEST_TASK, TIMER_TICK, END_TASK } from './actions'

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
        loading: false
      }
    case TIMER_TICK:
      return {
        ...state,
        remainingTime: state.remainingTime > 1000 ? state.remainingTime - 1000 : 0
      }
    default:
      return state
  }
}

const codeInitialState = ''
const code = (state = codeInitialState, { type, payload }) => {
  switch (type) {
    case END_TASK:
      return codeInitialState
    case RECEIVE_TASK:
      return !state ? payload.initialCode.slice() : state
    case SET_CODE:
      return payload.code.slice()
    default:
      return state
  }
}

export default combineReducers({
  userInfo,
  activeTask,
  code
})

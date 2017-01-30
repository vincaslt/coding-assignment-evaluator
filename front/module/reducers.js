import { combineReducers } from 'redux'
import {
  SET_NAME,
  RECEIVE_TASK,
  SET_CODE,
  REQUEST_START_TASK,
  REQUEST_TASK,
  TIMER_TICK,
  END_TASK,
  ADMIN_CHANGE_EXEC,
  ADMIN_CHANGE_DESCRIPTION,
  ADMIN_CHANGE_CODE,
  ADMIN_CHANGE_TIME_LIMIT,
  ADMIN_CHANGE_TESTS,
  ADMIN_CHANGE_PASSWORD,
  LOAD_LATEST_TASK_INFO,
  RECEIVE_LATEST_TASK_INFO
} from './actions'

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

const taskFormInitialState = {}
const taskForm = (state = taskFormInitialState, { type, payload }) => {
  switch (type) {
    case ADMIN_CHANGE_DESCRIPTION:
      return {
        ...state,
        description: payload.description
      }
    case ADMIN_CHANGE_CODE:
      return {
        ...state,
        code: payload.code
      }
    case ADMIN_CHANGE_EXEC:
      return {
        ...state,
        execName: payload.execName
      }
    case ADMIN_CHANGE_TIME_LIMIT:
      return {
        ...state,
        timeLimit: payload.timeLimit
      }
    case ADMIN_CHANGE_TESTS:
      return {
        ...state,
        tests: payload.tests
      }
    case ADMIN_CHANGE_PASSWORD:
      return {
        ...state,
        password: payload.password
      }
    case LOAD_LATEST_TASK_INFO:
      return {
        ...state,
        loading: true
      }
    case RECEIVE_LATEST_TASK_INFO:
      return {
        ...state,
        ...payload,
        loading: false
      }
    default:
      return state
  }
}

export default combineReducers({
  userInfo,
  activeTask,
  code,
  taskForm
})

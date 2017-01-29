export const REQUEST_START_TASK = 'REQUEST_START_TASK'
export const requestStartTask = () => ({ type: REQUEST_START_TASK })

export const SET_NAME = 'SET_NAME'
export const setName = name => ({ type: SET_NAME, payload: { name } })

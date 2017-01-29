export const REQUEST_START_TASK = 'REQUEST_START_TASK'
export const requestStartTask = () => ({ type: REQUEST_START_TASK })

export const REQUEST_TASK = 'REQUEST_TASK'
export const requestTask = taskId => ({ type: REQUEST_TASK, payload: { taskId } })

export const SET_NAME = 'SET_NAME'
export const setName = name => ({ type: SET_NAME, payload: { name } })

export const RECEIVE_TASK = 'RECEIVE_TASK'
export const receiveTask = (({
  id, description, initialCode, remainingTime, results, solutionAuthor
}) => ({
  type: RECEIVE_TASK,
  payload: {
    id,
    description,
    initialCode,
    remainingTime,
    results,
    solutionAuthor
  }
}))

export const SET_CODE = 'SET_CODE'
export const setCode = code => ({ type: SET_CODE, payload: { code } })

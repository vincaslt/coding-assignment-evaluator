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

export const SUBMIT_SOLUTION = 'SUBMIT_SOLUTION'
export const submitSolution = () => ({ type: SUBMIT_SOLUTION })

export const START_TASK_TIMER = 'START_TASK_TIMER'
export const startTaskTimer = () => ({ type: START_TASK_TIMER })

export const STOP_TASK_TIMER = 'STOP_TASK_TIMER'
export const stopTaskTimer = () => ({ type: STOP_TASK_TIMER })

export const TIMER_TICK = 'TIMER_TICK'
export const timerTick = () => ({ type: TIMER_TICK })

export const END_TASK = 'END_TASK'
export const endTask = () => ({ type: END_TASK })

/* Admin Form Actions */
export const ADMIN_SUBMIT_FORM = 'ADMIN_SUBMIT_FORM'
export const adminSubmitForm = () => ({ type: ADMIN_SUBMIT_FORM })

export const LOAD_LATEST_TASK_INFO = 'LOAD_LATEST_TASK_INFO'
export const loadLatestTaskInfo = () => ({ type: LOAD_LATEST_TASK_INFO })

export const REQUEST_LATEST_SOLUTIONS = 'REQUEST_LATEST_SOLUTIONS'
export const requestLatestSolutions = () => ({ type: REQUEST_LATEST_SOLUTIONS })

export const FAILED_LOAD_LATEST_TASK_INFO = 'FAILED_LOAD_LATEST_TASK_INFO'
export const failedLoadLatestTaskInfo = () => ({ type: FAILED_LOAD_LATEST_TASK_INFO })

export const RECEIVE_LATEST_TASK_INFO = 'RECEIVE_LATEST_TASK_INFO'
export const receiveLatestTaskInfo = ({
  description, initialCode, execName, timeLimit, tests
}) => ({
  type: RECEIVE_LATEST_TASK_INFO,
  payload: {
    description,
    code: initialCode,
    execName,
    timeLimit,
    tests: JSON.stringify(tests)
  }
})

export const RECEIVE_LATEST_SOLUTIONS = 'RECEIVE_LATEST_SOLUTIONS'
export const receiveLatestSolutions = (solutions) => ({
  type: RECEIVE_LATEST_SOLUTIONS,
  payload: solutions.map(({ id, name, submittedAt }) => ({
    id,
    name,
    submittedAt
  }))
})

export const ADMIN_CHANGE_DESCRIPTION = 'ADMIN_CHANGE_DESCRIPTION'
export const adminChangeDescription = description => ({
  type: ADMIN_CHANGE_DESCRIPTION,
  payload: { description }
})

export const ADMIN_CHANGE_CODE = 'ADMIN_CHANGE_CODE'
export const adminChangeCode = code => ({
  type: ADMIN_CHANGE_CODE,
  payload: { code }
})

export const ADMIN_CHANGE_EXEC = 'ADMIN_CHANGE_EXEC'
export const adminChangeExec = execName => ({
  type: ADMIN_CHANGE_EXEC,
  payload: { execName }
})

export const ADMIN_CHANGE_TIME_LIMIT = 'ADMIN_CHANGE_TIME_LIMIT'
export const adminChangeTimeLimit = timeLimit => ({
  type: ADMIN_CHANGE_TIME_LIMIT,
  payload: { timeLimit }
})

export const ADMIN_CHANGE_TESTS = 'ADMIN_CHANGE_TESTS'
export const adminChangeTests = tests => ({
  type: ADMIN_CHANGE_TESTS,
  payload: { tests }
})

export const ADMIN_CHANGE_PASSWORD = 'ADMIN_CHANGE_PASSWORD'
export const adminChangePassword = password => ({
  type: ADMIN_CHANGE_PASSWORD,
  payload: { password }
})

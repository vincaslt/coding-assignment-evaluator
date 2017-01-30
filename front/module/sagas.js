import { select, call, takeEvery, put, take, cancel, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { push } from 'react-router-redux'
import {
  REQUEST_START_TASK,
  REQUEST_TASK,
  SUBMIT_SOLUTION,
  START_TASK_TIMER,
  STOP_TASK_TIMER,
  RECEIVE_TASK,
  END_TASK,
  ADMIN_SUBMIT_FORM,
  LOAD_LATEST_TASK_INFO,
  receiveLatestTaskInfo,
  receiveTask,
  timerTick,
  stopTaskTimer,
  failedLoadLatestTaskInfo,
  endTask
} from './actions'
import api from './api'
import { userInfo, activeTask, taskForm, code as codeSelector } from './selectors'

function* saveTaskData(data) {
  yield put(receiveTask({
    id: data.id,
    description: data.description,
    initialCode: data.code,
    remainingTime: data.remainingTime,
    solutionAuthor: data.name,
    results: data.results
  }))
}

function* requestStartTaskSaga() {
  const { name } = yield select(userInfo)
  const { data } = yield call(api.fetchActiveTask, name)
  yield call(saveTaskData, data)
  yield put(push(`/task/${data.id}`))
}

function* requestTaskSaga({ payload }) {
  const { data } = yield call(api.fetchTaskById, payload.taskId)
  yield call(saveTaskData, data)
  if (data.remainingTime === 0 || data.results.length > 0) {
    yield put(endTask())
  }
}

function* submitSolutionSaga() {
  const { id } = yield select(activeTask)
  const code = yield select(codeSelector)
  yield call(api.submitSolution, id, code)
  yield put(endTask())
}

function* timerTickSaga() {
  try {
    let remainingTime = (yield select(activeTask)).remainingTime
    while (remainingTime !== 0) {
      yield call(delay, 1000)
      yield put(timerTick())
      remainingTime = (yield select(activeTask)).remainingTime
    }
    yield put(stopTaskTimer())
  } finally { /* timer is stopped */ }
}

function* watchStartTaskSaga() {
  yield takeEvery(REQUEST_START_TASK, requestStartTaskSaga)
}

function* watchRequestTaskSaga() {
  yield takeEvery(REQUEST_TASK, requestTaskSaga)
}

function* watchSubmitSolutionSaga() {
  yield takeEvery(SUBMIT_SOLUTION, submitSolutionSaga)
}

function* watchEndTaskSaga() {
  while (yield take(END_TASK)) {
    const { id } = yield select(activeTask)
    yield put(push(`/task/${id}/results`))
  }
}

function* watchSubmitAdminFormSaga() {
  while (yield take(ADMIN_SUBMIT_FORM)) {
    const form = yield select(taskForm)
    try {
      yield call(api.submitTaskForm, form)
      yield put(push('/'))
    } catch (e) {
      console.error('invalid parameters')
    }
  }
}

function* watchLoadAdminFormSaga() {
  while (yield take(LOAD_LATEST_TASK_INFO)) {
    try {
      const { data } = yield call(api.fetchLatestTask)
      yield put(receiveLatestTaskInfo(data))
    } catch (r) {
      yield put(failedLoadLatestTaskInfo())
    }
  }
}

function* watchStartTaskTimerSaga() {
  while (yield take(START_TASK_TIMER)) {
    let task = yield select(activeTask)
    if (task.loading) {
      task = (yield take(RECEIVE_TASK)).payload
    }
    if (task.results.length === 0 && task.remainingTime > 0) {
      const timerRunner = yield fork(timerTickSaga)
      yield take(STOP_TASK_TIMER)
      yield cancel(timerRunner)
      yield put(endTask())
    }
  }
}

// Register watcher sagas for running
const sagas = [
  watchStartTaskSaga,
  watchRequestTaskSaga,
  watchSubmitSolutionSaga,
  watchStartTaskTimerSaga,
  watchEndTaskSaga,
  watchSubmitAdminFormSaga,
  watchLoadAdminFormSaga
]

export default function runSagas(sagaMiddleware) {
  sagas.forEach(sagaMiddleware.run)
}

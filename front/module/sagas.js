import { select, call, takeEvery, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { REQUEST_START_TASK, REQUEST_TASK, receiveTask } from './actions'
import { fetchActiveTask, fetchTaskById } from './api'
import { userInfo } from './selectors'

function* saveTaskData(data) {
  yield put(receiveTask({
    id: data._id,
    description: data.description,
    initialCode: data.code,
    remainingTime: data.remainingTime,
    solutionAuthor: data.name,
    results: data.results
  }))
}

function* requestStartTaskSaga() {
  const { name } = yield select(userInfo)
  const { data } = yield call(fetchActiveTask, name)
  yield call(saveTaskData, data)
  yield put(push(`/task/${data._id}`))
}

function* requestTaskSaga({ payload }) {
  const { data } = yield call(fetchTaskById, payload.taskId)
  yield call(saveTaskData, data)
  // TODO: redirect to results if it's not active
}

function* watchStartTaskSaga() {
  yield takeEvery(REQUEST_START_TASK, requestStartTaskSaga)
}

function* watchRequestTaskSaga() {
  yield takeEvery(REQUEST_TASK, requestTaskSaga)
}

// Register sagas for running
const sagas = [
  watchStartTaskSaga,
  watchRequestTaskSaga
]

export default function runSagas(sagaMiddleware) {
  sagas.forEach(sagaMiddleware.run)
}

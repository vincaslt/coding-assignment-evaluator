import { select, call, takeEvery, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { REQUEST_START_TASK, REQUEST_TASK, SUBMIT_SOLUTION, receiveTask } from './actions'
import api from './api'
import { userInfo, activeTask } from './selectors'

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
  const { data } = yield call(api.fetchActiveTask, name)
  yield call(saveTaskData, data)
  yield put(push(`/task/${data._id}`))
}

function* requestTaskSaga({ payload }) {
  const { data } = yield call(api.fetchTaskById, payload.taskId)
  yield call(saveTaskData, data)
  // TODO: redirect to results if it's not active
}

function* submitSolutionSaga() {
  const { code, id } = yield select(activeTask)
  yield call(api.submitSolution, id, code)
  yield put(push(`/task/${id}/results`))
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

// Register watcher sagas for running
const sagas = [
  watchStartTaskSaga,
  watchRequestTaskSaga,
  watchSubmitSolutionSaga
]

export default function runSagas(sagaMiddleware) {
  sagas.forEach(sagaMiddleware.run)
}

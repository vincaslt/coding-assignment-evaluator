import { take, select, call } from 'redux-saga/effects'
import { REQUEST_START_TASK } from './actions'
import { fetchActiveTask } from './api'
import { userInfo } from './selectors'

function* requestStartTaskSaga() {
  yield take(REQUEST_START_TASK)
  const { name } = yield select(userInfo)
  const { data } = yield call(fetchActiveTask, name)
  console.log(data)
}

// Register sagas for running
const sagas = [
  requestStartTaskSaga
]

export default function runSagas(sagaMiddleware) {
  sagas.forEach(sagaMiddleware.run)
}

// Register sagas for running
const sagas = []

export function runSagas(sagaMiddleware) {
  sagas.forEach(sagaMiddleware.run)
}

import 'sanitize.css/sanitize.css'
import 'react-select/dist/react-select.css'
import React from 'react'
import 'babel-polyfill'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import persistState from 'redux-localstorage'
import { routerMiddleware } from 'react-router-redux'

import reducers from './module/reducers'
import runSagas from './module/sagas'
import routes from './module/routes'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, compose(
  applyMiddleware(
    sagaMiddleware,
    routerMiddleware(browserHistory)
  ),
  persistState('userInfo', { key: 'coding-assignment-evaluator.userInfo' }),
  persistState('code', { key: 'coding-assignment-evaluator.code' }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
runSagas(sagaMiddleware)

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.body
)

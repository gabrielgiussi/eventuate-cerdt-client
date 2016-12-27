import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'
import { apologyReceived, LOGIN, ACCEPT_APOLOGY } from './actions'


const wsMiddleware = ws => store => next => action => {
  switch (action.type) {
    case LOGIN:
      let player = action.player
      ws = new WebSocket("ws://"+window.location.host+"/apologiesWS?name=" + player)
      ws.onmessage = (event) => {
        store.dispatch(apologyReceived(JSON.parse(event.data)))
      }
      return next(action)
    case ACCEPT_APOLOGY:
      ws.send(JSON.stringify({ matchId: action.matchId, player: action.player }))
      return next(action)
    default:
      return next(action)
  }
}

const middleware = [ thunk, wsMiddleware(null) ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

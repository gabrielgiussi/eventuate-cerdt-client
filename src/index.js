import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'
import { apologyReceived,matchReceived,playerReceived, LOGIN, ACCEPT_APOLOGY } from './actions'


const wsMiddleware = ws => store => next => action => {
  switch (action.type) {
    case LOGIN:
      let player = action.player
      ws = new WebSocket("ws://"+window.location.host+"/notificationsWS?name=" + player)
      ws.onmessage = (event) => {
        let data = JSON.parse(event.data)
        console.log(data)
        switch (data.type){
          case "match":
            store.dispatch(matchReceived(data))
            break
          case "apology":
            store.dispatch(apologyReceived(data))
            break
          case "player":
            store.dispatch(playerReceived(data))
          default:
            break
        }

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

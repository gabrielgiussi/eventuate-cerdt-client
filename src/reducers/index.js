import { combineReducers } from 'redux'
import {
  REQUEST_MATCHS, RECEIVE_MATCHS, LOGIN, MATCH_CREATED, CREATE_MATCH, MATCH_NOT_CREATED,
  APOLOGY_RECEIVED, PLAY_MATCH_SUCCESS, PLAY_MATCH, ACCEPT_APOLOGY
} from '../actions'

const match = (state, action) => {
  switch (action.type) {
    case PLAY_MATCH_SUCCESS:
      if (action.matchId.localeCompare(state.matchId) === 0){
        return Object.assign({},state,{players:[...state.players,action.player]})
      }
      return state
    default:
      return state
  }
}

/*
const apologies = (state = ["1","2"], action) => {
  switch (action.type) {
    case APOLOGY_RECEIVED:
      console.log(action.msg.matchId)
      return {
        ...state,
        items: state.items.push({matchId: action.msg.matchId})
      }
    default:
      return state

  }
}
*/


const matchs = (state = {
  isFetching: false,
  didInvalidate: false,
  creatingMatch: false,
  creatingMatchFailed: false,
  requestForPlay: false,
  items: []
}, action) => {
  switch (action.type) {
    case PLAY_MATCH:
      return {
        ...state,
        requestForPlay: true
      }
    case PLAY_MATCH_SUCCESS:
      return {
        ...state,
        requestForPlay: false,
        items: state.items.map(m => match(m,action))
      }
    case APOLOGY_RECEIVED:
        return {
          ...state,
          items: state.items.map(m => {
            if (m.matchId === action.msg.matchId){
              return {
                ...m,
                notification: {apology: true, read: false}
              }
            }
            return m
          })
    }
    case ACCEPT_APOLOGY:
      return {
        ...state,
        items: state.items.map(m => {
          if (action.matchId.localeCompare(m.matchId) === 0){
            return Object.assign({},m,{notification:{apology: false, read: true}})
          }
          return m
        })
      }
    case MATCH_CREATED:
      let newMatch = Object.assign({},action.match,{notification:{apology: false, read: false}})
      console.log(newMatch)
      return {
        ...state,
        creatingMatch: false,
        items: [...state.items, newMatch]
      }
      case MATCH_NOT_CREATED:
        return {
          ...state,
          creatingMatchFailed: true,
          creatingMatch: false
        }
    case CREATE_MATCH:
      return {
        ...state,
        creatingMatchFailed: false,
        creatingMatch: true
      }
    case REQUEST_MATCHS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_MATCHS: {
      let ms = action.matchs.map(m => Object.assign(m,{notification:{apology:false,read:false}}))
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: ms,
        lastUpdated: action.receivedAt
      }
    }
    default:
      return state
  }
}

const login = (state = '', action) => {
  switch (action.type) {
    case LOGIN:
      return action.player
    default:
      return state
  }
}

const rootReducer = combineReducers({
  matchs,
  login
})

export default rootReducer

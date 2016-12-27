export const REQUEST_MATCHS = 'REQUEST_MATCHS'
export const RECEIVE_MATCHS = 'RECEIVE_MATCHS'
export const LOGIN = 'LOGIN'
export const CREATE_MATCH = 'CREATE_MATCH'
export const MATCH_CREATED = 'MATCH_CREATED'
export const MATCH_NOT_CREATED = 'MATCH_NOT_CREATED'
export const PLAY_MATCH = 'PLAY_MATCH'
export const PLAY_MATCH_SUCCESS = 'PLAY_MATCH_SUCCESS'
export const PLAY_MATCH_FAILURE = 'PLAY_MATCH_FAILURE'
export const APOLOGY_RECEIVED = 'APOLOGY_RECEIVED'
export const OPEN_WS = 'OPEN_WS'
export const ACCEPT_APOLOGY = 'ACCEPT_APOLOGY'




export const apologyReceived = (msg) => ({
  type: APOLOGY_RECEIVED,
  msg
})

export const playMatchSuccess = (matchId,player) => ({
  type: PLAY_MATCH_SUCCESS,
  player,
  matchId
})

export const playMatchFailure = (matchId,player,err) => ({
  type: PLAY_MATCH_FAILURE,
  matchId,
  player,
  err
})

export const createMatch = (player,date,place) => ({
  type: CREATE_MATCH,
  date,
  place
})

export const playMatch = (matchId,player) => ({
  type: PLAY_MATCH,
  player,
  matchId
})

export const matchNotCreated = (err) => ({
  type: MATCH_NOT_CREATED,
  err
})

export const matchCreated = (match) => ({
  type: MATCH_CREATED,
  match
})

export const requestMatchs = player => ({
  type: REQUEST_MATCHS,
  player
})

export const receiveMatchs = json => ({
  type: RECEIVE_MATCHS,
  matchs: json,
  receivedAt: Date.now()
})

const listOfMatchs = [{
  "players": [],
  "creator": "Gabriel",
  "date": "10/10/2016",
  "place": "ayunta",
  "matchId": "a2edbf00-dfd0-4da8-96e3-f335fa34f106"
}, {
  "players": [],
  "creator": "gabriel",
  "date": "10/10/2016",
  "place": "La POSTA",
  "matchId": "4bd46f34-62fa-4d88-b723-f8c54b662c74"
}, {
  "players": [],
  "creator": "A",
  "date": "10/10/2016",
  "place": "A",
  "matchId": "ee33dd40-fa3d-4a2a-afdb-be03d8e9d48b"
}, {
  "players": ["Hernan", "Guillermo", "Delpo"],
  "creator": "gabi",
  "date": "10/10/2016",
  "place": "La POSTA",
  "matchId": "561ca980-7375-4162-b31e-be88e8ed1201"
}, {
  "players": [],
  "creator": "gabriel",
  "date": "10/10/2016",
  "place": "La POSTA",
  "matchId": "d80f0258-3dbd-4e6b-b23b-fa7af9bd8268"
}, {
  "players": [],
  "creator": "Ga",
  "date": "10/10/2016",
  "place": "Ayunta",
  "matchId": "ba1911e0-3d9a-42db-9437-06edf2a87043"
}, {
  "players": [],
  "creator": "Hernan",
  "date": "10/10/2016",
  "place": "La POSTA",
  "matchId": "ac9841d3-e5b1-4305-9ac0-c8a6773b0ae2"
}]

export const acceptApology = (matchId,player) => ({
  type: ACCEPT_APOLOGY,
  matchId,
  player
})

export const playMatchRequest = matchId => (dispatch, getState) => {
  let player = getState().login
  dispatch(playMatch(matchId,player))
  return fetch('/match/'+matchId+'/player',{method: 'POST', body: JSON.stringify({player}), headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              }})
              .then(json => dispatch(playMatchSuccess(matchId,player)))
              .catch(err => dispatch(playMatchFailure(matchId,player,err)))
              //return playMock(matchId,player)

}

const playMock = (matchId,player) => {
  return new Promise(function(resolve,reject) {
    setTimeout(() => { resolve("OK") }, 3000);


  })
}

const postMatchMock = () => {
  let mock = {
  "players": [],
  "creator": "Lalalal",
  "date": "10/10/2016",
  "place": "asdasd",
  "matchId": "c8cde375-e9d5-4684-b6f6-a17283b5f711"
 }
  return new Promise(function(resolve,reject) {
      setTimeout(() => { resolve(mock) }, 3000);
  })
}

export const postMatch = (creator,date,place) => dispatch => {
  dispatch(createMatch(creator,date,place))
  let match = {matchId: "",creator, players: [], date: "10/10/2016", place}
  return fetch('/match',{method: 'POST', body: JSON.stringify(match), headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              }})
              //.then(response => response.json())
//  return postMatchMock()
              .then(response => response.json())
              .then(json => dispatch(matchCreated(json)))
              .catch(err => dispatch(matchNotCreated(err)))
}

export const fetchMatchs = player => dispatch => {
  dispatch(requestMatchs(player))
  return fetch('/match')
    .then(response => response.json())
    .then(json => dispatch(receiveMatchs(json)))
    .catch(err => dispatch(receiveMatchs(listOfMatchs)))
}

export const login = player => ({
  type: LOGIN,
  player
})

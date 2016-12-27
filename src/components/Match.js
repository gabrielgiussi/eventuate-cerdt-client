import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { playMatchRequest, acceptApology } from '../actions'

// TODO la logica de que no se pinte el Play si ya esta en el partido deberia estar en los reducers? Lo que pasa es que no se si los reducers pueden contener logica para rechazar los comandos/actions

let Match = ({ creator, players, date, place, onPlayClick,onDismissClick, login, requestForPlay, notification }) => (
  <span>
    <h1>Creator: {creator}</h1>
    <h3>{place} - {date}</h3>
    <ul>
       {players.map(player =>
         <li key={player}> {player} </li>
       )}
    </ul>
    {notification.apology && <div>You have been kicked out. Sorry! <button onClick={onDismissClick}>Dismiss</button></div> }
    {requestForPlay ? 'Playing...' : (!players.find(x => x === login) && <button type="button" onClick={onPlayClick} > Play! </button>)}


  </span>
)

Match.propTypes = {
  creator: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  date: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  requestForPlay: PropTypes.bool.isRequired,
  notification: PropTypes.object.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onDismissClick: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPlayClick: () => {
    dispatch(playMatchRequest(ownProps.matchId))
  },
  onDismissClick: () => {
    dispatch(acceptApology(ownProps.matchId,ownProps.login))
  }
})

Match = connect(mapStateToProps,mapDispatchToProps)(Match)

export default Match

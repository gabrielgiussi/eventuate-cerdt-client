import React, { PropTypes } from 'react'
import Match from '../components/Match'

const MatchList = ({ matchs, login, requestForPlay }) => (
  <ul>
    {matchs.map(match =>
      <Match
        key={match.matchId}
        {...match}
        login={login}
        requestForPlay={requestForPlay}
      />
    )}
  </ul>
)

MatchList.propTypes = {
  matchs: PropTypes.arrayOf(PropTypes.shape({
    matchId: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    players: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    place: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    notification: PropTypes.object.isRequired
  }).isRequired).isRequired,
  login: PropTypes.string.isRequired,
  requestForPlay: PropTypes.bool.isRequired
}

export default MatchList

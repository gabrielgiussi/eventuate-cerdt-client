import React from 'react'
import { postMatch } from '../actions'
import { connect } from 'react-redux'

let MatchForm = ({ dispatch, player }) => {
  let date
  let place

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!date.value.trim() || !place.value.trim()) {
          return
        }
        dispatch(postMatch(player,date.value,place.value))
        place.value = ''
        date.value = ''
      }}>
        <input ref={node => {date = node}} type="date" />
        <input ref={node => {place = node}} />
        <button type="submit">
          Create!
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  player: state.login
})

MatchForm = connect(mapStateToProps)(MatchForm)

export default MatchForm

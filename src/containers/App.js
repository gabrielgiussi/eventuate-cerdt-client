import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchMatchs } from '../actions'
import MatchList from '../components/MatchList'
import Login from './Login'
import MatchForm from './MatchForm'

class App extends Component {
  static propTypes = {
    matchs: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, login } = this.props
    //dispatch(fetchMatchsIfNeeded("Nothing for now"))
    dispatch(fetchMatchs(login))
  }
/*
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }
  }
  */

/*
  handleChange = nextReddit => {
    this.props.dispatch(selectReddit(nextReddit))
  }
*/
  render() {
    //const { selectedReddit, posts, isFetching, lastUpdated } = this.props
    const { matchs, isFetching, lastUpdated, login, creatingMatch, creatingMatchFailed, requestForPlay  } = this.props
    //const isEmpty = posts.length === 0
    let show = null;
    if (login)
      show = <div> Welcome {login} <MatchList matchs={matchs} login={login} requestForPlay={requestForPlay} /> {creatingMatch ? 'Creating Match...' : <MatchForm />} {creatingMatchFailed && 'Creation failed'} </div>
    else
      show = <Login />
    return (
      <div> {show} </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    matchs: state.matchs.items,
    isFetching: state.matchs.isFetching,
    lastUpdated: state.matchs.lastUpdated,
    login: state.login,
    creatingMatch: state.matchs.creatingMatch,
    creatingMatchFailed: state.matchs.creatingMatchFailed,
    requestForPlay: state.matchs.requestForPlay

  }
}

export default connect(mapStateToProps)(App)

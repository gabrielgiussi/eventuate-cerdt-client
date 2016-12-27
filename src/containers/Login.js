import React from 'react'
import { login } from '../actions'
import { connect } from 'react-redux'


let Login = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(login(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

Login = connect()(Login)

export default Login

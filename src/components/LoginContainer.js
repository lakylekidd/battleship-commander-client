import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addNewUser } from '../actions/userActions'

import './css/loginContainer.css'

class Login extends Component {
  state = {
    userName: '',
    submitted: false
  }

  handleChange = (event) => {
    this.setState({ userName: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ submitted: true })

    this.props.addNewUser(this.state.userName)
  }

  render() {
    return (
      <div className="login">
        {this.state.submitted
          ? <h2>Welcome {this.state.userName}</h2>
          : <form onSubmit={this.handleSubmit}>
            <h2> Select your User Name: </h2>
            <input
              type="text"
              name="login"
              value={this.state.userName}
              onChange={this.handleChange}
            />
            <br />
            <button>Submit</button>
          </form>
        }
      </div>
    )
  }
}

export default connect(null, { addNewUser })(Login)

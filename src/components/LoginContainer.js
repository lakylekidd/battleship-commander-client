import React, { Component } from 'react'
import { connect } from 'react-redux';
import { newUser } from '../actions/userActions'

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
    this.setState({submitted: true})
    this.props.newUser(this.state.userName)
  }

  render() {
    return (
      <div className="loginContainer">
        {this.state.submitted 
          ? <h2>Welcome {this.state.userName}</h2>
          : <form>
              <p> Introduce your name: </p>      
              <input 
                type="text" 
                name="login" 
                value={this.state.userName}
                onChange={this.handleChange}
              />
              <button onClick={this.handleSubmit}>Submit</button>
            </form>
        }
      </div>
    )
  }
}

export default connect(null, { newUser })(Login)

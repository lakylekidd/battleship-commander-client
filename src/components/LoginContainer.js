import React, { Component } from 'react'

export default class Login extends Component {
  state = {
    userName: '',
    submitted: false
  }

  handleChange = (event) => {
    this.setState({ userName: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log('Submitting')
    this.setState({submitted: true})
    //send it to the store
  }

  render() {
    return (
      <div>
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

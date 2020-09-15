import React, { Component } from 'react'
 import "./Auth.css"
 import {connect} from 'react-redux';
 import home from "../../assets/helo_logo.png"
import axios from 'axios';
// import image from './image'
class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      signedIn: false
    }
  }
  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  handleLogin = () => {
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    }).then(res => {
      this.handleRedirect()
    }).catch(err => { console.log('could not login') })

  }
  handleRegister = async () => {
    let result = await axios.post('/register', {
      username: this.state.username,
      password: this.state.password
    })
    console.log(result)
    if (result) {
      axios.post('/login', {
        username: this.state.username,
        password: this.state.password
      }).then(res => {
        this.handleRedirect();
      }).catch(err => console.log('could not login after registering'))
    }
  }
  handleRedirect = () => {
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div className='Auth'>
        <div className='Modal'>
            {/* <img src={Image} className="helo_logo.png"></img> */}
            <a href="/"><img src={home} className="helo_logo.png"/></a>
          <h1>Helo</h1>
          <div className='inputs'>
            <p>Username :  </p>
            <input type='text' onChange={this.handleUsernameChange} />
          </div>
          <div className='inputs'>
            <p>Password : </p>
            <input type='password' onChange={this.handlePasswordChange} />
          </div>
          <div className='buttons'>
            <button onClick={this.handleLogin}> Login</button>
            <button onClick={this.handleRegister}> Register</button>
          </div>
        </div>
      </div>
    )
  }
}
export default Auth
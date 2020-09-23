import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import home from '../../assets/home_logo.png'
import profile from '../../assets/robot.png'
import newPost from '../../assets/new_logo.png'
import power from '../../assets/shut_down.png'
import './Nav.css'
import axios from 'axios'

const Nav = props => {
  return (
    <div className='Nav'>
      <div className="nav_profile_container">
         <img className="nav_profile_pic" src={profile} alt="user"/>  
        <p>1</p>
      </div>
      <div className="nav_links">
        <Link to='/dashboard'><img alt="dash" src={home} /></Link> 
         <Link to='/new'><img alt="new" src={newPost} /></Link> 
        <img src={power} style={{ cursor: "pointer" }} alt="Shut Down" onClick={() => { 
          axios.get('/logout').then(props.history.push('/')).catch(err => console.log(err))
        }} />
      </div>
    </div>)
}


function mapStateToProps(state){
  return {
      user: state.user
  }
}



 export default withRouter(connect(mapStateToProps, {getUser})(Nav))

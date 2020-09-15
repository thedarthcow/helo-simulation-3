import React, { Component } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { GET_USER } from '../../ducks/reducer';
import {connect} from 'react-redux';
import axios from 'axios';
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: []
    }
  }

  componentDidMount() {
    axios('/favorites').then(res => {
      console.log(res)
      this.setState({ favorites: res.data })
    }).catch(err => console.log(err))
  }
  render() {
    let favorites
    this.state.favorites.length ?
      favorites = this.state.favorites.map((favorite, i) => {
        return (
          <Link to={`/post/${favorite.id}`}>
            <div className="individual" key={i}>
              <p># {favorite.username}'s favorite band is {favorite.favorite_band}</p>
            </div>
          </Link>
        )
      }) : favorites = null

    return (
      <div className='dashboard'>
        <div className="favorites-holder">
          {this.state.favorites ? favorites : null}
        </div>
      </div>
    )
  }
}
export default Dashboard
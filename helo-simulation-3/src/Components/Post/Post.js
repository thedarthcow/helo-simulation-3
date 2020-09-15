import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import './Post.css'
import axios from 'axios'
class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: []
    }
  }
  componentDidMount() {
    console.log(this.props.match.params)
    axios.get('/posts?id=' + (this.props.match.params.id))
      .then(res =>
        // console.log(res.data[0])
        this.setState({
          post: res.data[0]
        })
      )
      .catch(err => console.log(err))

  }
  render() {
    console.log(this.state.post)
    let post
    this.state.post ? post = < div >
      <p>This is the post for post # {this.state.post.id}</p>
      <p>Their favorite band is {this.state.post.favorite_band}</p>
    </div > : post = null
    return (
      <div className="Post">
        {post || null}
      </div>
      // Post
    )
  }
}
export default withRouter(Post)